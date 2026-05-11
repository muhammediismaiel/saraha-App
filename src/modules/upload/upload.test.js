// Test file for upload functionality
// This file contains example requests to test the upload endpoints

/*
POST /upload/single
Content-Type: multipart/form-data

Body:
- file: (file)

Response:
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "filename": "file-1234567890-123456789.jpg",
    "originalName": "test.jpg",
    "mimetype": "image/jpeg",
    "size": 1024000,
    "path": "uploads/file-1234567890-123456789.jpg",
    "type": "images"
  }
}

POST /upload/multiple
Content-Type: multipart/form-data

Body:
- files: (file1)
- files: (file2)
- files: (file3)

Response:
{
  "success": true,
  "message": "3 file(s) uploaded successfully",
  "data": [
    {
      "filename": "files-1234567890-123456789.jpg",
      "originalName": "test1.jpg",
      "mimetype": "image/jpeg",
      "size": 1024000,
      "path": "uploads/files-1234567890-123456789.jpg",
      "type": "images"
    }
  ]
}

POST /upload/fields
Content-Type: multipart/form-data

Body:
- images: (image file)
- images: (another image)
- documents: (pdf file)
- videos: (video file)

Response:
{
  "success": true,
  "message": "Files uploaded successfully",
  "data": {
    "images": [
      {
        "filename": "images-1234567890-123456789.jpg",
        "originalName": "image1.jpg",
        "mimetype": "image/jpeg",
        "size": 1024000,
        "path": "uploads/images-1234567890-123456789.jpg",
        "type": "images"
      }
    ],
    "documents": [
      {
        "filename": "documents-1234567890-123456789.pdf",
        "originalName": "document.pdf",
        "mimetype": "application/pdf",
        "size": 512000,
        "path": "uploads/documents-1234567890-123456789.pdf",
        "type": "documents"
      }
    ]
  }
}

GET /upload/:filename (requires authentication)
Headers:
- Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "filename": "file-1234567890-123456789.jpg",
    "size": 1024000,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "modifiedAt": "2024-01-01T00:00:00.000Z",
    "extension": ".jpg",
    "path": "/uploads/file-1234567890-123456789.jpg"
  }
}

DELETE /upload/:filename (requires authentication)
Headers:
- Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "File deleted successfully"
}
*/

export const testUploadEndpoints = () => {
  console.log('Upload endpoints are ready for testing!');
  console.log('Available endpoints:');
  console.log('POST /upload/single - Upload single file');
  console.log('POST /upload/multiple - Upload multiple files');
  console.log('POST /upload/fields - Upload files with different field names');
  console.log('GET /upload/:filename - Get file info (requires auth)');
  console.log('DELETE /upload/:filename - Delete file (requires auth)');
};
