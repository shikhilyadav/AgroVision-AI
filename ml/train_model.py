import os
import json
import tensorflow as tf
import matplotlib.pyplot as plt

from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau


# ============================================================
# 1. CONFIGURATION
# ============================================================

TRAIN_DIR = "dataset/train"
VAL_DIR = "dataset/validation"
TEST_DIR = "dataset/test"

MODEL_DIR = "models"

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 15
SEED = 42

os.makedirs(MODEL_DIR, exist_ok=True)


# ============================================================
# 2. CHECK DATASET
# ============================================================

if not os.path.exists(TRAIN_DIR):
    raise FileNotFoundError(f"Training directory not found: {TRAIN_DIR}")

if not os.path.exists(VAL_DIR):
    raise FileNotFoundError(f"Validation directory not found: {VAL_DIR}")

if not os.path.exists(TEST_DIR):
    raise FileNotFoundError(f"Test directory not found: {TEST_DIR}")


print("=" * 60)
print("AGROVISION AI - MODEL TRAINING")
print("=" * 60)


# ============================================================
# 3. LOAD TRAINING DATA
# ============================================================

print("\nLoading training dataset...")

train_dataset = tf.keras.utils.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True,
    seed=SEED
)


# ============================================================
# 4. LOAD VALIDATION DATA
# ============================================================

print("\nLoading validation dataset...")

validation_dataset = tf.keras.utils.image_dataset_from_directory(
    VAL_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)


# ============================================================
# 5. LOAD TEST DATA
# ============================================================

print("\nLoading test dataset...")

test_dataset = tf.keras.utils.image_dataset_from_directory(
    TEST_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)


# ============================================================
# 6. GET CLASS NAMES
# ============================================================

class_names = train_dataset.class_names
num_classes = len(class_names)

print("\nNumber of classes:", num_classes)

print("\nClasses:")

for index, class_name in enumerate(class_names):
    print(f"{index}: {class_name}")


# Save class names
class_names_path = os.path.join(MODEL_DIR, "class_names.json")

with open(class_names_path, "w", encoding="utf-8") as file:
    json.dump(class_names, file, indent=4)


print(f"\nClass names saved to: {class_names_path}")


# ============================================================
# 7. PERFORMANCE OPTIMIZATION
# ============================================================

AUTOTUNE = tf.data.AUTOTUNE

train_dataset = train_dataset.prefetch(AUTOTUNE)
validation_dataset = validation_dataset.prefetch(AUTOTUNE)
test_dataset = test_dataset.prefetch(AUTOTUNE)


# ============================================================
# 8. DATA AUGMENTATION
# ============================================================

data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.10),
    layers.RandomZoom(0.10),
    layers.RandomContrast(0.10),
], name="data_augmentation")


# ============================================================
# 9. LOAD MOBILENETV2
# ============================================================

print("\nLoading MobileNetV2...")

base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)


# Freeze pretrained layers
base_model.trainable = False


# ============================================================
# 10. BUILD MODEL
# ============================================================

inputs = layers.Input(shape=(224, 224, 3))

x = data_augmentation(inputs)

# MobileNetV2 expects pixels in [-1, 1]
x = layers.Rescaling(1.0 / 127.5, offset=-1)(x)

x = base_model(x, training=False)

x = layers.GlobalAveragePooling2D()(x)

x = layers.Dropout(0.30)(x)

outputs = layers.Dense(
    num_classes,
    activation="softmax"
)(x)

model = models.Model(inputs, outputs)


# ============================================================
# 11. COMPILE MODEL
# ============================================================

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)


# ============================================================
# 12. DISPLAY MODEL
# ============================================================

print("\nModel Summary:")
model.summary()


# ============================================================
# 13. CALLBACKS
# ============================================================

best_model_path = os.path.join(
    MODEL_DIR,
    "agrovision_best.keras"
)

callbacks = [

    ModelCheckpoint(
        best_model_path,
        monitor="val_accuracy",
        save_best_only=True,
        mode="max",
        verbose=1
    ),

    EarlyStopping(
        monitor="val_loss",
        patience=4,
        restore_best_weights=True,
        verbose=1
    ),

    ReduceLROnPlateau(
        monitor="val_loss",
        factor=0.3,
        patience=2,
        min_lr=0.00001,
        verbose=1
    )
]


# ============================================================
# 14. TRAIN MODEL
# ============================================================

print("\n")
print("=" * 60)
print("STARTING TRAINING")
print("=" * 60)

history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=EPOCHS,
    callbacks=callbacks
)


# ============================================================
# 15. SAVE FINAL MODEL
# ============================================================

final_model_path = os.path.join(
    MODEL_DIR,
    "agrovision_final.keras"
)

model.save(final_model_path)

print("\nFinal model saved to:")
print(final_model_path)


# ============================================================
# 16. EVALUATE ON TEST DATA
# ============================================================

print("\n")
print("=" * 60)
print("TESTING MODEL")
print("=" * 60)

test_loss, test_accuracy = model.evaluate(
    test_dataset,
    verbose=1
)

print("\nTest Loss:", test_loss)
print("Test Accuracy:", test_accuracy)


# ============================================================
# 17. SAVE TRAINING HISTORY
# ============================================================

history_path = os.path.join(
    MODEL_DIR,
    "training_history.json"
)

history_data = {
    key: [float(value) for value in values]
    for key, values in history.history.items()
}

with open(history_path, "w", encoding="utf-8") as file:
    json.dump(history_data, file, indent=4)


# ============================================================
# 18. CREATE ACCURACY GRAPH
# ============================================================

plt.figure(figsize=(10, 6))

plt.plot(
    history.history["accuracy"],
    label="Training Accuracy"
)

plt.plot(
    history.history["val_accuracy"],
    label="Validation Accuracy"
)

plt.title("AgroVision AI - Training Accuracy")

plt.xlabel("Epoch")

plt.ylabel("Accuracy")

plt.legend()

plt.grid(True)

plt.savefig(
    os.path.join(MODEL_DIR, "accuracy_graph.png"),
    dpi=150,
    bbox_inches="tight"
)

plt.close()


# ============================================================
# 19. CREATE LOSS GRAPH
# ============================================================

plt.figure(figsize=(10, 6))

plt.plot(
    history.history["loss"],
    label="Training Loss"
)

plt.plot(
    history.history["val_loss"],
    label="Validation Loss"
)

plt.title("AgroVision AI - Training Loss")

plt.xlabel("Epoch")

plt.ylabel("Loss")

plt.legend()

plt.grid(True)

plt.savefig(
    os.path.join(MODEL_DIR, "loss_graph.png"),
    dpi=150,
    bbox_inches="tight"
)

plt.close()


# ============================================================
# 20. FINAL INFORMATION
# ============================================================

print("\n")
print("=" * 60)
print("TRAINING COMPLETE")
print("=" * 60)

print(f"Number of classes: {num_classes}")
print(f"Test accuracy: {test_accuracy:.4f}")

print("\nFiles created:")

print("1.", best_model_path)
print("2.", final_model_path)
print("3.", class_names_path)
print("4.", history_path)
print("5.", os.path.join(MODEL_DIR, "accuracy_graph.png"))
print("6.", os.path.join(MODEL_DIR, "loss_graph.png"))

print("\nAgroVision AI ML model is ready!")
print("=" * 60)