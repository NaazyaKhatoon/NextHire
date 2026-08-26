export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
};

export const validateResumeFile = (file) => {
  if (!file) return { valid: false, message: 'Please select a file' };
  
  const allowedExtensions = ['pdf', 'docx', 'txt'];
  const ext = file.name.split('.').pop().toLowerCase();
  
  if (!allowedExtensions.includes(ext)) {
    return {
      valid: false,
      message: 'Please upload a PDF, DOCX, or TXT file.',
    };
  }

  // Max 10MB
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      message: 'Your resume exceeds the supported file size of 10MB.',
    };
  }

  return { valid: true, extension: ext };
};
