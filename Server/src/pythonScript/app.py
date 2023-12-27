import sys
import os
from PIL import Image, ImageDraw, ImageFont
import face_recognition
from io import BytesIO
import base64
import re

# Get the absolute path to the script's directory
script_directory = os.path.dirname(os.path.abspath(__file__))

# Use the absolute path to the 'images/' directory
IMAGE_DIRECTORY = os.path.join(script_directory, "images/")

# Dictionary to store information about known faces
known_faces = {}

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

                    # Load the image and generate face encodings
                    known_image = face_recognition.load_image_file(image_path)
                    face_encoding = face_recognition.face_encodings(known_image)

                    # Check if a face was detected in the image
                    if face_encoding:
                        known_faces[person_name]['encodings'].append(face_encoding[0])
                    else:
                        print("No face detected in the image.")

print("before accessing reco")

# Function to recognize faces in an input image
def recognize_faces(base64_image):
    print("after accessing reco")

    # Decode base64-encoded image
    image_bytes = base64.b64decode(base64_image)
    print(f"Decoded image size: {len(image_bytes)} bytes")

    # Load the image and perform face recognition
    image = face_recognition.load_image_file(BytesIO(image_bytes))

    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)

    pil_image = Image.fromarray(image)
    draw = ImageDraw.Draw(pil_image)
    font = ImageFont.load_default()

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        name = "Unknown"

        for known_name, known_data in known_faces.items():
            for known_encoding in known_data['encodings']:
                match = face_recognition.compare_faces([known_encoding], face_encoding, tolerance=0.6)

                # Check if there is a match with a known face
                if match[0]:
                    name = known_name
                    print(f"Match found! Name: {name}")
                    break

            if name != "Unknown":
                break

        # Annotate the image with rectangles and names
        draw.rectangle(((left, top), (right, bottom)), outline=(0, 255, 0), width=3)
        draw.text((left, top - 20), name, fill=(0, 255, 0), font=font)

        # Extract student_id from the directory name
        match_result = re.match(r'(\d+)_', known_name)
        if match_result:
            student_id = int(match_result.group(1))
            print(f"Student ID: {student_id}")

            # Here, you can call the endpoint to create the attendance record
            # Assuming you have a function createAttendance(student_id) in AttendanceController
            # AttendanceController.createAttendance(student_id)

    # Save the processed image
    output_path = "output88.jpg"
    pil_image.save(output_path, format='JPEG')
    print(f"Processed image saved: {output_path}")

# Load known faces on startup
load_known_faces()
print("before recognizing faces")

# Check if a command-line argument is provided
if len(sys.argv) > 1:
    # The first command-line argument is the base64-encoded image
    base64_image = sys.argv[1]
    recognize_faces(base64_image)
else:
    print("No input image provided")

print("after recognizing faces")
