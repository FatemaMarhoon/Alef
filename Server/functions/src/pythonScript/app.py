import os
from PIL import Image, ImageDraw
import face_recognition
from io import BytesIO
import sys
import json

# Dictionary to store information about known faces
known_faces = {}

# Directory where images of known faces are stored
IMAGE_DIRECTORY = "images/"

def load_known_faces():
    # Iterate through subdirectories in IMAGE_DIRECTORY
    for person_name in os.listdir(IMAGE_DIRECTORY):
        person_dir = os.path.join(IMAGE_DIRECTORY, person_name)

        # Check if the item in IMAGE_DIRECTORY is a directory
        if os.path.isdir(person_dir):
            known_faces[person_name] = {'encodings': []}

            # Iterate through image files in the subdirectory
            for file_name in os.listdir(person_dir):
                if file_name.endswith((".jpg", ".jpeg", ".png")):
                    image_path = os.path.join(person_dir, file_name)
                    print(f"Processing image: {image_path}")

                    # Load the image and generate face encodings
                    known_image = face_recognition.load_image_file(image_path)
                    face_encoding = face_recognition.face_encodings(known_image)

                    # Check if a face was detected in the image
                    if face_encoding:
                        known_faces[person_name]['encodings'].append(face_encoding[0])
                        print(f"Face encoding generated: {face_encoding[0]}")
                    else:
                        print("No face detected in the image.")

            print(f"Loaded known faces for {person_name}: {known_faces[person_name]}")

# Function to recognize faces in an input image
def recognize_faces(input_image):
    image = face_recognition.load_image_file(input_image)
    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)

    pil_image = Image.fromarray(image)
    draw = ImageDraw.Draw(pil_image)

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        name = "Unknown"

        for known_name, known_data in known_faces.items():
            for known_encoding in known_data['encodings']:
                match = face_recognition.compare_faces([known_encoding], face_encoding, tolerance=0.6)

                # Check if there is a match with a known face
                if match[0]:
                    name = known_name
                    break

            if name != "Unknown":
                break

        # Annotate the image with rectangles and names
        draw.rectangle(((left, top), (right, bottom)), outline=(0, 255, 0), width=3)
        draw.text((left, top - 20), name, fill=(0, 255, 0), font=None)

    # Save the processed image
    output_path = "output.jpg"
    pil_image.save(output_path, format='JPEG')
    print(f"Processed image saved: {output_path}")

# Load known faces on startup
load_known_faces()

if __name__ == "__main__":
    # Read the input image path from the command line arguments
    input_image_path = json.loads(sys.argv[1])
    
    # Recognize faces in the input image
    recognize_faces(input_image_path)
