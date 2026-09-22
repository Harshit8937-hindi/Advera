import os
import sys

def process():
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print("Error: Pillow library not found. Please install it using 'pip install Pillow'.")
        sys.exit(1)

    # Use relative path based on script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(script_dir, "advera-logo.png")
    
    if not os.path.exists(input_path):
        print(f"Error: Could not find '{input_path}'")
        sys.exit(1)

    # Open image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Use floodfill to remove background starting from corners (top-left, top-right, bottom-left, bottom-right)
    # This prevents eating into the white parts of the logo itself
    
    # We create a mask for the background
    # A simple threshold is still used but we only target connected regions from corners
    mask = Image.new("L", (width, height), 0)
    for x, y in [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]:
        ImageDraw.floodfill(img, (x, y), (255, 255, 255, 0), thresh=20)
    
    # Re-crop to bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Save optimized logo
    img.save(input_path, "PNG")
    print(f"[SUCCESS] Logo polished and saved to {input_path}")

if __name__ == "__main__":
    process()
