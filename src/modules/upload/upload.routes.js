import { Router } from 'express';
import { uploadSingleFile, uploadMultipleFiles, uploadFieldsFiles, deleteFile, getFileInfo } from './upload.controller.js';
import { uploadSingle, uploadMultiple, uploadFields } from '../../middleware/multer.middleware.js';
import { isAuth } from '../../middleware/authmiddleware.js';

const router = Router();

// Single file upload
router.post('/single', uploadSingle('file'), uploadSingleFile);

// Multiple files upload
router.post('/multiple', uploadMultiple('files', 5), uploadMultipleFiles);

// Upload files with different field names
router.post('/fields', uploadFields([
  { name: 'images', maxCount: 3 },
  { name: 'documents', maxCount: 2 },
  { name: 'videos', maxCount: 1 }
]), uploadFieldsFiles);

// Protected routes (require authentication)
router.delete('/:filename', isAuth, deleteFile);
router.get('/:filename', isAuth, getFileInfo);

export { router as uploadRouter };
