export const config = {
  baseUrl: import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_PRODUCTION_BACKEND_URL 
    : import.meta.env.VITE_BASE_URL,
  
  // Cloudinary Config
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  }
};