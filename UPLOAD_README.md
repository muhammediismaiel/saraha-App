# File Upload System

This project includes a comprehensive file upload system using Multer with advanced validation and error handling.

## Features

- **Single file upload**
- **Multiple file upload**
- **Field-based file upload**
- **File type validation** (images, videos, documents, audio)
- **File size limits**
- **Error handling**
- **File management** (delete, get info)
- **Authentication protection** for sensitive operations

## API Endpoints

### Upload Endpoints

#### Single File Upload
```
POST /upload/single
Content-Type: multipart/form-data

Body:
- file: (file)
```

#### Multiple Files Upload
```
POST /upload/multiple
Content-Type: multipart/form-data

Body:
- files: (file1)
- files: (file2)
- files: (file3)
```

#### Field-based Upload
```
POST /upload/fields
Content-Type: multipart/form-data

Body:
- images: (image files, max 3)
- documents: (document files, max 2)
- videos: (video files, max 1)
```

### File Management (Requires Authentication)

#### Get File Info
```
GET /upload/:filename
Headers:
- Authorization: Bearer <token>
```

#### Delete File
```
DELETE /upload/:filename
Headers:
- Authorization: Bearer <token>
```

## Supported File Types

### Images
- MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml`
- Extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- Max size: 5MB

### Videos
- MIME types: `video/mp4`, `video/mpeg`, `video/quicktime`, `video/x-msvideo`
- Extensions: `.mp4`, `.mpeg`, `.mov`, `.avi`
- Max size: 50MB

### Documents
- MIME types: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `text/plain`
- Extensions: `.pdf`, `.doc`, `.docx`, `.txt`
- Max size: 10MB

### Audio
- MIME types: `audio/mpeg`, `audio/wav`, `audio/ogg`
- Extensions: `.mp3`, `.wav`, `.ogg`
- Max size: 20MB

## File Storage

- Files are stored in the `uploads/` directory
- Filenames are automatically generated with timestamp and random suffix
- Format: `{fieldname}-{timestamp}-{random}{extension}`

## Error Handling

The system includes comprehensive error handling for:
- Invalid file types
- File size limits
- Missing files
- File not found
- Authentication errors
- Multer-specific errors

## Usage Examples

### Using Postman

1. Set request type to POST
2. Set URL to `http://localhost:3000/upload/single`
3. Set body type to `form-data`
4. Add a key named `file` with type `file`
5. Select your file and send the request

### Using JavaScript (Frontend)

```javascript
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/upload/single', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Using cURL

```bash
# Single file upload
curl -X POST -F "file=@/path/to/file.jpg" http://localhost:3000/upload/single

# Multiple files upload
curl -X POST -F "files=@/path/to/file1.jpg" -F "files=@/path/to/file2.jpg" http://localhost:3000/upload/multiple
```

## Security Features

- File type validation based on MIME type and extension
- File size limits to prevent abuse
- Authentication required for file management operations
- Automatic cleanup of invalid uploads
- Sanitized filenames to prevent directory traversal

## Configuration

The upload system can be configured by modifying:
- `src/middleware/multer.middleware.js` - Storage and upload settings
- `src/common/fileValidation.utils.js` - File type and size validation
- `src/middleware/fileUploadError.middleware.js` - Error handling

## Testing

Run the application and test the endpoints using:
- Postman
- cURL commands
- Frontend application
- The test examples in `src/modules/upload/upload.test.js`
