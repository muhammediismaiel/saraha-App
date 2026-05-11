import express from 'express';
import { validateFile, getFileType } from '../../common/utils/fileValidation.utils.js';
import fs from 'fs';
import path from 'path';

// Upload single file
export const uploadSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const validation = validateFile(req.file, ['images', 'documents', 'videos', 'audio']);
    
    if (!validation.isValid) {
      // Delete the uploaded file if validation fails
      if (req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      return res.status(400).json({
        success: false,
        message: validation.error,
        allowedTypes: validation.allowedTypes,
        maxSize: validation.maxSize
      });
    }

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        type: validation.type
      }
    });
  } catch (error) {
    next(error);
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadedFiles = [];
    const errors = [];

    for (const file of req.files) {
      const validation = validateFile(file, ['images', 'documents', 'videos', 'audio']);
      
      if (validation.isValid) {
        uploadedFiles.push({
          filename: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
          type: validation.type
        });
      } else {
        // Delete invalid file
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
        errors.push({
          filename: file.originalname,
          error: validation.error
        });
      }
    }

    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid files were uploaded',
        errors: errors
      });
    }

    res.status(200).json({
      success: true,
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      data: uploadedFiles,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    next(error);
  }
};

// Upload files with specific fields
export const uploadFieldsFiles = async (req, res, next) => {
  try {
    if (!req.files && Object.keys(req.files || {}).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const result = {};
    const errors = [];

    for (const [fieldName, files] of Object.entries(req.files)) {
      const validFiles = [];
      
      for (const file of files) {
        const validation = validateFile(file, ['images', 'documents', 'videos', 'audio']);
        
        if (validation.isValid) {
          validFiles.push({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
            type: validation.type
          });
        } else {
          // Delete invalid file
          if (file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          errors.push({
            field: fieldName,
            filename: file.originalname,
            error: validation.error
          });
        }
      }
      
      if (validFiles.length > 0) {
        result[fieldName] = validFiles;
      }
    }

    if (Object.keys(result).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid files were uploaded',
        errors: errors
      });
    }

    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      data: result,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    next(error);
  }
};

// Delete file
export const deleteFile = async (req, res, next) => {
  try {
    const { filename } = req.params;
    
    if (!filename) {
      return res.status(400).json({
        success: false,
        message: 'Filename is required'
      });
    }

    const filePath = path.join(process.cwd(), 'uploads', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get file info
export const getFileInfo = async (req, res, next) => {
  try {
    const { filename } = req.params;
    
    if (!filename) {
      return res.status(400).json({
        success: false,
        message: 'Filename is required'
      });
    }

    const filePath = path.join(process.cwd(), 'uploads', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    const stats = fs.statSync(filePath);
    const fileExtension = path.extname(filename);
    
    res.status(200).json({
      success: true,
      data: {
        filename: filename,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        extension: fileExtension,
        path: filePath
      }
    });
  } catch (error) {
    next(error);
  }
};
