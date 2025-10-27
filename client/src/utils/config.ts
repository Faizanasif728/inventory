export const config = {
  baseUrl: import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_PRODUCTION_BACKEND_URL 
    : import.meta.env.VITE_LOCAL_BACKEND_URL,
  
  // Cloudinary Config
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  }
};

// Minimal runtime diagnostics for environment resolution
if (typeof window !== 'undefined') {
  try {
    // Do not log secrets; only show mode and resolved API URL
    // Helps detect wrong env var names like VITE_PRODUCTION_BACKEND_URL
    // or missing values on Render
    // eslint-disable-next-line no-console
    console.log('[IMS][CONFIG] MODE:', import.meta.env.MODE, 'BaseURL:', config.baseUrl);
    if (!config.baseUrl) {
      // eslint-disable-next-line no-console
      console.error('[IMS][CONFIG] baseUrl is empty. Set VITE_PRODUCTION_BACKEND_URL or VITE_LOCAL_BACKEND_URL.');
    }
  } catch {}
}