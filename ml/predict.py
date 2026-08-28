import sys
import json
import numpy as np
import tensorflow as tf
from PIL import Image


# ============================================================
# CONFIGURATION
# ============================================================

MODEL_PATH = "models/agrovision_best.keras"
CLASS_NAMES_PATH = "models/class_names.json"

IMG_SIZE = (224, 224)


# ============================================================
# LOAD MODEL
# ============================================================

print("Loading AgroVision AI model...")

model = tf.keras.models.load_model(MODEL_PATH)


# ============================================================
# LOAD CLASS NAMES
# ============================================================

with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as file:
    class_names = json.load(file)


# ============================================================
# CHECK IMAGE PATH
# ============================================================

if len(sys.argv) < 2:
    print("\nUsage:")
    print('python ml\\predict.py "path_to_image"')
    sys.exit(1)

image_path = sys.argv[1]


# ============================================================
# LOAD IMAGE
# ============================================================

try:
    image = Image.open(image_path).convert("RGB")
except Exception as error:
    print("\nERROR: Could not open image.")
    print(error)
    sys.exit(1)


# ============================================================
# PREPROCESS IMAGE
# ============================================================

image = image.resize(IMG_SIZE)

image_array = np.array(image, dtype=np.float32)

image_array = np.expand_dims(image_array, axis=0)


# ============================================================
# PREDICTION
# ============================================================

predictions = model.predict(image_array, verbose=0)[0]

# Get top 3 predictions
top_indices = np.argsort(predictions)[-3:][::-1]


# ============================================================
# HELPER FUNCTION
# ============================================================

def format_class_name(class_name):

    # Separate crop and disease
    if "___" in class_name:
        crop, disease = class_name.split("___", 1)
    else:
        crop = class_name
        disease = "Unknown"

    # Replace underscores
    crop = crop.replace("_", " ")
    disease = disease.replace("_", " ")

    # Remove unnecessary parentheses formatting
    crop = crop.strip()
    disease = disease.strip()

    # Make text cleaner
    crop = crop.title()
    disease = disease.title()

    return crop, disease


# ============================================================
# MAIN RESULT
# ============================================================

best_index = int(top_indices[0])

best_class = class_names[best_index]

best_confidence = float(predictions[best_index]) * 100

crop, disease = format_class_name(best_class)


# ============================================================
# DISPLAY RESULT
# ============================================================

print("\n")
print("=" * 60)
print("              AGROVISION AI")
print("          CROP DISEASE DETECTION")
print("=" * 60)

print("\n🌱 CROP")
print(f"   {crop}")

print("\n🦠 CONDITION")
print(f"   {disease}")

print("\n📊 CONFIDENCE")
print(f"   {best_confidence:.2f}%")

print("\n")
print("-" * 60)
print("TOP 3 PREDICTIONS")
print("-" * 60)


# ============================================================
# TOP 3
# ============================================================

for position, index in enumerate(top_indices, start=1):

    class_name = class_names[index]

    confidence = float(predictions[index]) * 100

    predicted_crop, predicted_disease = format_class_name(
        class_name
    )

    print(
        f"{position}. "
        f"{predicted_crop} - "
        f"{predicted_disease} "
        f"({confidence:.2f}%)"
    )


# ============================================================
# CONFIDENCE WARNING
# ============================================================

print("\n")
print("-" * 60)

if best_confidence >= 80:

    print("✅ HIGH CONFIDENCE")
    print("   The model is reasonably confident in this prediction.")

elif best_confidence >= 60:

    print("⚠️ MEDIUM CONFIDENCE")
    print("   Consider uploading a clearer leaf image.")

else:

    print("⚠️ LOW CONFIDENCE")
    print("   Please upload a clear photo showing the entire leaf.")
    print("   Avoid blurry, dark, or heavily obstructed images.")


print("-" * 60)

print("\nAgroVision AI analysis complete.")