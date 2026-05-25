import { useEffect, useState } from 'react'
import ClientPageLayout from '../components/ClientPageLayout/ClientPageLayout'
import CatalogProductCard from '../components/CatalogProductCard/CatalogProductCard'
import { fetchAllServices } from '../services/api'
import './ServicesPage.css'

const ServicesPage = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const data = await fetchAllServices()
        if (active) setServices(data || [])
      } catch (err) {
        if (active) setError(err.message || 'Failed to load services')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <ClientPageLayout
      title="Services"
      subtitle="Browse our available services and solutions — updated live from the admin panel."
    >
      {loading && (
        <div className="client-page__status-wrap">
          <p className="client-page__status">Loading services...</p>
        </div>
      )}
      {error && (
        <div className="client-page__status-wrap">
          <p className="client-page__status client-page__status--error">{error}</p>
        </div>
      )}
      {!loading && !error && services.length === 0 && (
        <div className="client-page__status-wrap">
          <p className="client-page__status">No services published yet. Add services in the admin panel.</p>
        </div>
      )}
      {!loading && !error && services.length > 0 && (
        <div className="services-catalog-grid">
          {services.map((service) => (
            <CatalogProductCard key={service.id} product={service} />
          ))}
        </div>
      )}
    </ClientPageLayout>
  )
}

export default ServicesPage
