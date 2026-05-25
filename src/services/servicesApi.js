/**
 * Services API Module
 * ===================
 * Handles all CRUD operations for services using Supabase.
 * Provides functions to create, read, update, and delete services.
 * 
 * Database table name: 'services'
 * 
 * Service object structure:
 * {
 *   id: string (UUID),
 *   title: string - Service name
 *   description: string - Detailed description
 *   icon: string - Icon URL or emoji
 *   features: string[] - Array of service features
 *   price: number - Service price (optional)
 *   category: string - Service category
 *   image_url: string - Service image URL
 *   created_at: timestamp
 *   updated_at: timestamp
 * }
 */

import supabase from './supabaseClient'

/**
 * Fetch all services from the database
 * @returns {Promise<Array>} Array of service objects
 * @throws {Error} If database query fails
 */
export const fetchAllServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching services:', error.message)
    throw error
  }
}

/**
 * Fetch a single service by ID
 * @param {string} id - Service ID
 * @returns {Promise<Object>} Service object
 * @throws {Error} If service not found or query fails
 */
export const fetchServiceById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error(`Error fetching service ${id}:`, error.message)
    throw error
  }
}

/**
 * Create a new service
 * @param {Object} serviceData - Service data object
 * @param {string} serviceData.title - Service name
 * @param {string} serviceData.description - Service description
 * @param {string} serviceData.icon - Icon URL or emoji
 * @param {Array} serviceData.features - Array of features
 * @param {string} serviceData.category - Service category
 * @param {string} serviceData.image_url - Service image URL
 * @param {number} serviceData.price - Service price (optional)
 * @returns {Promise<Object>} Created service object
 * @throws {Error} If service creation fails
 */
export const createService = async (serviceData) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'description', 'category']
    const missingFields = requiredFields.filter((field) => !serviceData[field])

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }

    const { data, error } = await supabase
      .from('services')
      .insert([
        {
          title: serviceData.title,
          description: serviceData.description,
          icon: serviceData.icon || '🔧',
          features: serviceData.features || [],
          category: serviceData.category,
          image_url: serviceData.image_url || '',
          price: serviceData.price || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating service:', error.message)
    throw error
  }
}

/**
 * Update an existing service
 * @param {string} id - Service ID
 * @param {Object} updates - Service data updates
 * @returns {Promise<Object>} Updated service object
 * @throws {Error} If update fails
 */
export const updateService = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error(`Error updating service ${id}:`, error.message)
    throw error
  }
}

/**
 * Delete a service by ID
 * @param {string} id - Service ID
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
export const deleteService = async (id) => {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error(`Error deleting service ${id}:`, error.message)
    throw error
  }
}

/**
 * Search services by title or description
 * @param {string} searchTerm - Search query
 * @returns {Promise<Array>} Array of matching services
 * @throws {Error} If search fails
 */
export const searchServices = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error searching services:', error.message)
    throw error
  }
}
