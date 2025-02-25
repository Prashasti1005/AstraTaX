from google.cloud import storage
import os

BUCKET_NAME = "your-bucket-name"

def upload_to_gcs(file):
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)
    blob = bucket.blob(file.filename)
    blob.upload_from_file(file.file, content_type=file.content_type)
    return f"https://storage.googleapis.com/{BUCKET_NAME}/{file.filename}"
