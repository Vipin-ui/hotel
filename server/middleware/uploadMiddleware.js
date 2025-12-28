import multer from "multer";

// Maximum file size: 10MB (Cloudinary free tier limit)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const upload = multer({ 
  storage: multer.diskStorage({}),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

// Wrapper function to handle multer errors
export const uploadWithErrorHandling = (fieldName, maxCount) => {
  const uploadMiddleware = upload.array(fieldName, maxCount);
  
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ 
            success: false, 
            message: `File size too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` 
          });
        }
        return res.status(400).json({ 
          success: false, 
          message: `Upload error: ${err.message}` 
        });
      }
      if (err) {
        return res.status(400).json({ 
          success: false, 
          message: err.message || "File upload error" 
        });
      }
      next();
    });
  };
};

export default upload;
