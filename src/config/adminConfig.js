/**
 * Admin Configuration
 * ===================
 * Centralized configuration for admin panel settings.
 * Update these values to customize admin functionality.
 * 
 * Usage:
 *   import { ADMIN_CONFIG } from '@/config/adminConfig'
 *   console.log(ADMIN_CONFIG.CREDENTIALS.USERNAME)
 */

/**
 * Admin Panel Configuration Object
 * Contains all configurable settings for the admin panel
 */
export const ADMIN_CONFIG = {
  /**
   * Authentication credentials
   * ⚠️ SECURITY WARNING: Only for development
   * In production, use proper authentication system
   */
  CREDENTIALS: {
    USERNAME: 'admin1971',
    PASSWORD: 'admin1971',
    // Session expiry time in milliseconds (24 hours)
    SESSION_EXPIRY: 24 * 60 * 60 * 1000,
  },

  /**
   * Service categories
   * Used in the service management dropdown
   */
  SERVICE_CATEGORIES: [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Cloud Services',
    'Consulting',
    'Support',
    'Custom',
  ],

  /**
   * Pagination settings
   */
  PAGINATION: {
    ITEMS_PER_PAGE: 10,
  },

  /**
   * Default service icon
   */
  DEFAULT_SERVICE_ICON: '🔧',

  /**
   * API timeout in milliseconds
   */
  API_TIMEOUT: 30000,

  /**
   * Feature toggles
   */
  FEATURES: {
    ENABLE_SERVICE_SEARCH: true,
    ENABLE_SERVICE_EXPORT: false,
    ENABLE_SERVICE_IMPORT: false,
    ENABLE_BULK_OPERATIONS: false,
  },

  /**
   * Messages
   */
  MESSAGES: {
    LOGIN_INVALID: 'Invalid username or password',
    LOGIN_SUCCESS: 'Login successful!',
    SERVICE_CREATED: 'Service created successfully!',
    SERVICE_UPDATED: 'Service updated successfully!',
    SERVICE_DELETED: 'Service deleted successfully!',
    DELETE_CONFIRMATION: 'Are you sure you want to delete this service?',
    LOADING: 'Loading...',
    ERROR_DEFAULT: 'An error occurred. Please try again.',
  },

  /**
   * API endpoints (relative to Supabase)
   */
  API: {
    TABLES: {
      SERVICES: 'services',
      USERS: 'users',
      LOGS: 'admin_logs',
    },
  },

  /**
   * UI Configuration
   */
  UI: {
    SIDEBAR_WIDTH: '250px',
    HEADER_HEIGHT: '60px',
    // Color theme
    COLORS: {
      PRIMARY: '#667eea',
      SECONDARY: '#764ba2',
      SUCCESS: '#4caf50',
      ERROR: '#ff6b6b',
      WARNING: '#ffc107',
    },
  },
}

/**
 * Utility function to get category options for select dropdowns
 * @returns {Array} Category options
 */
export const getCategoryOptions = () => {
  return ADMIN_CONFIG.SERVICE_CATEGORIES.map((category) => ({
    label: category,
    value: category,
  }))
}

/**
 * Utility function to validate credentials
 * @param {string} username - Username to validate
 * @param {string} password - Password to validate
 * @returns {boolean} True if credentials match
 */
export const validateCredentials = (username, password) => {
  return (
    username === ADMIN_CONFIG.CREDENTIALS.USERNAME &&
    password === ADMIN_CONFIG.CREDENTIALS.PASSWORD
  )
}

/**
 * Utility function to check if session is expired
 * @param {number} timestamp - Session timestamp
 * @returns {boolean} True if session is expired
 */
export const isSessionExpired = (timestamp) => {
  const age = Date.now() - timestamp
  return age > ADMIN_CONFIG.CREDENTIALS.SESSION_EXPIRY
}
