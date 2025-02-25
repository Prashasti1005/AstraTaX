from google.cloud import vision

def extract_text_from_gcs():
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = "gs://your-bucket-name/example.jpg"
    
    response = client.text_detection(image=image)
    texts = response.text_annotations
    return texts[0].description if texts else "No text found"
