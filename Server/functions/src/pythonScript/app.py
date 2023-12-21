import os
from flask import Flask, request, jsonify, make_response, send_file
from PIL import Image, ImageDraw
import face_recognition
from io import BytesIO

known_faces = {}
IMAGE_DIRECTORY = "images/"

def load_known_faces():
    for person_name in os.listdir(IMAGE_DIRECTORY):
        person_dir = os.path.join(IMAGE_DIRECTORY, person_name)
        
        if os.path.isdir(person_dir):
            known_faces[person_name] = {'encodings': []}

            for file_name in os.listdir(person_dir):
                if file_name.endswith((".jpg", ".jpeg", ".png")):
                    image_path = os.path.join(person_dir, file_name)
                    print(f"Processing image: {image_path}")

                    known_image = face_recognition.load_image_file(image_path)
                    face_encoding = face_recognition.face_encodings(known_image)

                    if face_encoding:
                        known_faces[person_name]['encodings'].append(face_encoding[0])
                        print(f"Face encoding generated: {face_encoding[0]}")
                    else:
                        print("No face detected in the image.")

            print(f"Loaded known faces for {person_name}: {known_faces[person_name]}")

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
                print(f"Name: {known_name}, Match: {match[0]}")

                if match[0]:
                    name = known_name
                    break

            if name != "Unknown":
                break

        draw.rectangle(((left, top), (right, bottom)), outline=(0, 255, 0), width=3)
        draw.text((left, top - 20), name, fill=(0, 255, 0), font=None)

    img_byte_array = BytesIO()
    pil_image.save(img_byte_array, format='JPEG')
    img_byte_array = img_byte_array.getvalue()

    return img_byte_array

load_known_faces()

app = Flask(_name_)

@app.route('/detect_faces', methods=['POST'])
def detect_faces():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    img_byte_array = recognize_faces(file)
    response = make_response(send_file(BytesIO(img_byte_array), mimetype='image/jpeg'))
    response.headers['Content-Disposition'] = 'inline; filename=result.jpg'    
    return response

if _name_ == '_main_':
    app.run(debug=True)