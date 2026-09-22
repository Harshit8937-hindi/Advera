import sys
import os

def verify():
    print(f"Python Executable: {sys.executable}")
    print(f"Python Version: {sys.version}")
    
    try:
        from PIL import Image
        print(f"Pillow Version: {Image.__version__ if hasattr(Image, '__version__') else 'unknown'}")
        print("[SUCCESS] Pillow is correctly installed and accessible.")
    except ImportError:
        print("[FAILURE] Pillow is NOT found in this environment.")
        print("Try running: pip install Pillow")

if __name__ == "__main__":
    verify()
