/**
 * Services Management Page
 * ========================
 * Complete CRUD interface for managing services.
 * Displays list of services with options to create, edit, and delete.
 * 
 * Features:
 *   - List all services
 *   - Create new service
 *   - Edit existing service
 *   - Delete service with confirmation
 *   - Search/filter services
 *   - Loading and error states
 */

import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  fetchAllServices,
  fetchServiceById,
  createService,
  updateService,
  deleteService,
} from '../services/servicesApi'
import { ADMIN_CONFIG } from '../config/adminConfig'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import './ManageServices.css'

/**
 * Service Form Component
 * Handles creation and editing of services
 * @param {Object} props - Component props
 * @param {string} props.serviceId - Service ID (if editing)
 * @param {Function} props.onSaved - Callback when service is saved
 */
const ServiceForm = ({ serviceId, onSaved }) => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    icon: ADMIN_CONFIG.DEFAULT_SERVICE_ICON,
    features: '',
    image_url: '',
    price: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate()

  // Load service data if editing
  useEffect(() => {
    if (serviceId) {
      loadService()
    }
  }, [serviceId])

  /**
   * Load service data from database
   */
  const loadService = async () => {
    try {
      setLoading(true)
      const data = await fetchServiceById(serviceId)
      setFormData({
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        icon: data.icon || ADMIN_CONFIG.DEFAULT_SERVICE_ICON,
        features: Array.isArray(data.features) ? data.features.join(', ') : '',
        image_url: data.image_url || '',
        price: data.price || '',
      })
    } catch (err) {
      setError('Failed to load service')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle form input changes
   * @param {Event} e - Change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        setError('Service title is required')
        return
      }

      if (!formData.description.trim()) {
        setError('Service description is required')
        return
      }

      if (!formData.category.trim()) {
        setError('Service category is required')
        return
      }

      setLoading(true)

      // Prepare data for submission
      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        icon: formData.icon || ADMIN_CONFIG.DEFAULT_SERVICE_ICON,
        features: formData.features
          .split(',')
          .map((f) => f.trim())
          .filter((f) => f),
        image_url: formData.image_url.trim(),
        price: formData.price ? parseFloat(formData.price) : null,
      }

      if (serviceId) {
        // Update existing service
        await updateService(serviceId, submitData)
        setSuccessMessage(ADMIN_CONFIG.MESSAGES.SERVICE_UPDATED)
      } else {
        // Create new service
        await createService(submitData)
        setSuccessMessage(ADMIN_CONFIG.MESSAGES.SERVICE_CREATED)
        setFormData({
          title: '',
          description: '',
          category: '',
          icon: ADMIN_CONFIG.DEFAULT_SERVICE_ICON,
          features: '',
          image_url: '',
          price: '',
        })
      }

      // Call callback and redirect after 1.5 seconds
      setTimeout(() => {
        onSaved()
        navigate('/admin/services')
      }, 1500)
    } catch (err) {
      setError(err.message || ADMIN_CONFIG.MESSAGES.ERROR_DEFAULT)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="service-form-container">
      <h2>{serviceId ? 'Edit Service' : 'Create New Service'}</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="service-form">
        {/* Title field */}
        <div className="form-group">
          <label htmlFor="title">Service Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Web Development"
            disabled={loading}
            required
          />
        </div>

        {/* Category field */}
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="">Select a category</option>
            {ADMIN_CONFIG.SERVICE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description field */}
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the service..."
            rows="4"
            disabled={loading}
            required
          />
        </div>

        {/* Features field */}
        <div className="form-group">
          <label htmlFor="features">Features (comma-separated)</label>
          <textarea
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="e.g., Responsive Design, SEO Optimized, Fast Loading"
            rows="3"
            disabled={loading}
          />
          <small>Separate each feature with a comma</small>
        </div>

        {/* Icon field */}
        <div className="form-group">
          <label htmlFor="icon">Icon (Emoji)</label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="e.g., 🚀"
            maxLength="2"
            disabled={loading}
          />
        </div>

        {/* Image URL field */}
        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            disabled={loading}
          />
        </div>

        {/* Price field */}
        <div className="form-group">
          <label htmlFor="price">Price (Optional)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={loading}
          />
        </div>

        {/* Form buttons */}
        <div className="form-buttons">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? ADMIN_CONFIG.MESSAGES.LOADING : 'Save Service'}
          </button>
          <Link to="/admin/services" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

/**
 * Services List Component
 * Displays all services in a table with edit/delete actions
 * @param {Array} props.services - List of services
 * @param {Function} props.onDelete - Delete callback
 * @param {boolean} props.loading - Loading state
 */
const ServicesList = ({ services, onDelete, loading }) => {
  return (
    <div className="services-list-container">
      <h2>Services List</h2>

      {loading ? (
        <div className="loading-message">{ADMIN_CONFIG.MESSAGES.LOADING}</div>
      ) : services.length === 0 ? (
        <div className="empty-state">
          <p>No services found. Create your first service!</p>
          <Link to="/admin/services/new" className="btn btn-primary">
            Create Service
          </Link>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="services-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="icon-cell">{service.icon || ADMIN_CONFIG.DEFAULT_SERVICE_ICON}</td>
                  <td>
                    <strong>{service.title}</strong>
                  </td>
                  <td>
                    <span className="category-badge">{service.category}</span>
                  </td>
                  <td className="description-cell">
                    {service.description.substring(0, 50)}...
                  </td>
                  <td>${service.price || 'N/A'}</td>
                  <td className="actions-cell">
                    <Link
                      to={`/admin/services/${service.id}`}
                      className="action-link edit-link"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(service.id)}
                      className="action-link delete-link"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/**
 * Main ManageServices Component
 * Routes between list and form views
 */
const ManageServices = () => {
  // State management
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Hooks
  const { serviceId } = useParams()
  const navigate = useNavigate()

  // Load services on mount or when navigating back from edit
  useEffect(() => {
    if (!serviceId) {
      loadServices()
    }
  }, [serviceId])

  /**
   * Load all services from database
   */
  const loadServices = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await fetchAllServices()
      setServices(data)
    } catch (err) {
      setError(ADMIN_CONFIG.MESSAGES.ERROR_DEFAULT)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle service deletion with confirmation
   * @param {string} id - Service ID
   */
  const handleDelete = async (id) => {
    if (window.confirm(ADMIN_CONFIG.MESSAGES.DELETE_CONFIRMATION)) {
      try {
        await deleteService(id)
        setServices((prev) => prev.filter((s) => s.id !== id))
        alert(ADMIN_CONFIG.MESSAGES.SERVICE_DELETED)
      } catch (err) {
        alert(`Failed to delete service: ${err.message}`)
        console.error(err)
      }
    }
  }

  // Show form for creating or editing
  if (serviceId === 'new' || serviceId) {
    return (
      <AdminLayout>
        <main className="manage-services-page">
          <ServiceForm serviceId={serviceId === 'new' ? null : serviceId} onSaved={loadServices} />
        </main>
      </AdminLayout>
    )
  }

  // Show list of services
  return (
    <AdminLayout>
      <main className="manage-services-page">
        <div className="page-header">
          <h1>Manage Services</h1>
          <Link to="/admin/services/new" className="btn btn-primary">
            ➕ Add New Service
          </Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <ServicesList
          services={services}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>
    </AdminLayout>
  )
}

export default ManageServices

