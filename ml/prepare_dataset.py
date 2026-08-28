import os
import shutil
import random
from pathlib import Path

SOURCE_DIR = Path("PlantVillage-Dataset/raw/color")
OUTPUT_DIR = Path("dataset")

TRAIN_RATIO = 0.70
VAL_RATIO = 0.15
TEST_RATIO = 0.15

SEED = 42

random.seed(SEED)

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}


def get_images(folder):
    return [
        file for file in folder.iterdir()
        if file.is_file() and file.suffix in IMAGE_EXTENSIONS
    ]


def main():

    if not SOURCE_DIR.exists():
        print(f"ERROR: Source directory not found: {SOURCE_DIR}")
        return

    classes = [
        folder for folder in SOURCE_DIR.iterdir()
        if folder.is_dir()
    ]

    if not classes:
        print("ERROR: No class folders found.")
        return

    print(f"Found {len(classes)} classes.")

    # Create output directories
    for split in ["train", "validation", "test"]:
        split_dir = OUTPUT_DIR / split
        split_dir.mkdir(parents=True, exist_ok=True)

    total_images = 0

    for class_dir in sorted(classes):

        images = get_images(class_dir)

        if not images:
            print(f"WARNING: No images found in {class_dir.name}")
            continue

        random.shuffle(images)

        total = len(images)

        train_end = int(total * TRAIN_RATIO)
        val_end = train_end + int(total * VAL_RATIO)

        train_images = images[:train_end]
        val_images = images[train_end:val_end]
        test_images = images[val_end:]

        print(
            f"{class_dir.name}: "
            f"{len(train_images)} train | "
            f"{len(val_images)} validation | "
            f"{len(test_images)} test"
        )

        for split_name, split_images in [
            ("train", train_images),
            ("validation", val_images),
            ("test", test_images),
        ]:

            destination = OUTPUT_DIR / split_name / class_dir.name
            destination.mkdir(parents=True, exist_ok=True)

            for image in split_images:
                shutil.copy2(image, destination / image.name)

        total_images += total

    print("\n===================================")
    print("DATASET PREPARATION COMPLETE")
    print("===================================")
    print(f"Total images: {total_images}")
    print(f"Train ratio: {TRAIN_RATIO}")
    print(f"Validation ratio: {VAL_RATIO}")
    print(f"Test ratio: {TEST_RATIO}")
    print("===================================")


if __name__ == "__main__":
    main()