import path from 'path';

// Allowed file types and their MIME types
const ALLOWED_FILE_TYPES = {
  images: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    maxSize: 5 * 1024 * 1024 // 5MB
  },
  videos: {
    mimeTypes: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'],
    extensions: ['.mp4', '.mpeg', '.mov', '.avi'],
    maxSize: 50 * 1024 * 1024 // 50MB
  },
  documents: {
    mimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
    extensions: ['.pdf', '.doc', '.docx', '.txt'],
    maxSize: 10 * 1024 * 1024 // 10MB
  },
  audio: {
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    extensions: ['.mp3', '.wav', '.ogg'],
    maxSize: 20 * 1024 * 1024 // 20MB
  }
};

// Validate file type and size
export const validateFile = (file, allowedTypes = ['images', 'documents']) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const fileMimeType = file.mimetype;
  const fileSize = file.size;

  for (const type of allowedTypes) {
    const fileTypeConfig = ALLOWED_FILE_TYPES[type];
    
    if (!fileTypeConfig) continue;

    const isMimeTypeValid = fileTypeConfig.mimeTypes.includes(fileMimeType);
    const isExtensionValid = fileTypeConfig.extensions.includes(fileExtension);
    const isSizeValid = fileSize <= fileTypeConfig.maxSize;

    if (isMimeTypeValid && isExtensionValid && isSizeValid) {
      return {
        isValid: true,
        type: type,
        maxSize: fileTypeConfig.maxSize
      };
    }
  }

  return {
    isValid: false,
    error: 'Invalid file type, extension, or size',
    allowedTypes: allowedTypes,
    maxSize: Math.max(...allowedTypes.map(type => ALLOWED_FILE_TYPES[type]?.maxSize || 0))
  };
};

// Get file type category
export const getFileType = (mimeType) => {
  if (mimeType.startsWith('image/')) return 'images';
  if (mimeType.startsWith('video/')) return 'videos';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'documents';
  return 'unknown';
};

// Generate safe filename
export const generateSafeFilename = (originalname) => {
  const extension = path.extname(originalname);
  const name = path.basename(originalname, extension);
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1E9);
  
  // Sanitize filename
  const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
  
  return `${sanitizedName}_${timestamp}_${random}${extension}`;
};

// Check if file exists and generate unique name if needed
export const generateUniqueFilename = (filename, existingFiles = []) => {
  if (!existingFiles.includes(filename)) {
    return filename;
  }

  const extension = path.extname(filename);
  const name = path.basename(filename, extension);
  let counter = 1;
  let newFilename;

  do {
    newFilename = `${name}_${counter}${extension}`;
    counter++;
  } while (existingFiles.includes(newFilename));

  return newFilename;
};
