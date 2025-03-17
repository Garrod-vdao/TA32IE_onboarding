// src/components/SecurityUtils.jsx
/**
 * Security utility functions for the SunSmartAussie application
 */

// Sanitize user input to prevent XSS
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  // Remove potentially dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
};

// Validate city name input
export const validateCityName = (cityName) => {
  if (!cityName || cityName.trim() === '') {
    return { valid: false, message: 'Please enter a city name' };
  }
  
  // City name pattern: letters, spaces, hyphens, apostrophes
  const cityPattern = /^[a-zA-Z\s\-'.]{1,50}$/;
  if (!cityPattern.test(cityName)) {
    return { valid: false, message: 'Please enter a valid city name' };
  }
  
  return { valid: true };
};

// Safely encode parameters for URLs
export const encodeParam = (param) => {
  if (!param) return '';
  return encodeURIComponent(sanitizeInput(param));
};
