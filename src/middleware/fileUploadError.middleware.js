import express from 'express';
import multer from 'multer';

// Multer error handler
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          message: 'File size too large',
          maxSize: '10MB'
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          success: false,
          message: 'Too many files uploaded',
          maxFiles: error.limit
        });
      case 'LIMIT_FIELD_KEY':
        return res.status(400).json({
          success: false,
          message: 'Field name too long'
        });
      case 'LIMIT_FIELD_VALUE':
        return res.status(400).json({
          success: false,
          message: 'Field value too long'
        });
      case 'LIMIT_FIELD_COUNT':
        return res.status(400).json({
          success: false,
          message: 'Too many fields'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          success: false,
          message: 'Unexpected file field',
          field: error.field
        });
      default:
        return res.status(400).json({
          success: false,
          message: 'File upload error',
          error: error.message
        });
    }
  }
  
  // Handle custom file filter errors
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message,
      allowedTypes: ['images', 'videos', 'documents', 'audio']
    });
  }
  
  // Pass other errors to the main error handler
  next(error);
};

// File size validation middleware
export const validateFileSize = (maxSize = 10 * 1024 * 1024) => {
  return (req, res, next) => {
    if (req.file && req.file.size > maxSize) {
      // Delete the oversized file
      const fs = require('fs');
      if (req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      return res.status(400).json({
        success: false,
        message: `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`
      });
    }
    
    if (req.files) {
      for (const files of Object.values(req.files)) {
        for (const file of files) {
          if (file.size > maxSize) {
            const fs = require('fs');
            if (file.path && fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
            
            return res.status(400).json({
              success: false,
              message: `File ${file.originalname} exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`
            });
          }
        }
      }
    }
    
    next();
  };
};

// File type validation middleware
export const validateFileType = (allowedTypes = ['images', 'documents']) => {
  return (req, res, next) => {
    const { validateFile } = require('../common/utils/fileValidation.utils.js');
    
    if (req.file) {
      const validation = validateFile(req.file, allowedTypes);
      if (!validation.isValid) {
        const fs = require('fs');
        if (req.file.path && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        
        return res.status(400).json({
          success: false,
          message: validation.error,
          allowedTypes: allowedTypes
        });
      }
    }
    
    if (req.files) {
      for (const files of Object.values(req.files)) {
        for (const file of files) {
          const validation = validateFile(file, allowedTypes);
          if (!validation.isValid) {
            const fs = require('fs');
            if (file.path && fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
            
            return res.status(400).json({
              success: false,
              message: `File ${file.originalname}: ${validation.error}`,
              allowedTypes: allowedTypes
            });
          }
        }
      }
    }
    
    next();
  };
};
