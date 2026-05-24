import { Link } from 'react-router-dom'
import { useProducts } from '../../context/ProductContext'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import './Dashboard.css'

const Dashboard = () => {
  const { products } = useProducts()

  const totalProducts = products.length
  const averageRating =
    totalProducts > 0
      ? products.reduce((sum, product) => sum + product.rating, 0) / totalProducts
      : 0
  const totalReviews = products.reduce((sum, product) => sum + product.reviews, 0)
  const discountedProducts = products.filter(
    (product) => Number(product.oldPrice) > Number(product.price) || Number(product.save) > 0,
  ).length

  const kpiCards = [
    {
      title: 'Total Products',
      value: totalProducts.toLocaleString(),
      tone: 'primary',
    },
    {
      title: 'Average Rating',
      value: averageRating.toFixed(2),
      tone: 'neutral',
    },
    {
      title: 'Total Reviews',
      value: totalReviews.toLocaleString(),
      tone: 'neutral',
    },
    {
      title: 'Discounted Items',
      value: discountedProducts.toLocaleString(),
      tone: 'success',
    },
  ]

  return (
    <AdminLayout>
      <main className="admin-dashboard-page">
        <section className="admin-dashboard-hero">
          <div className="dashboard-hero-content" style={{width: '100%'}}>
            <h1 style={{fontSize: '2rem', marginBottom: '1.5rem', color: '#1a1a1a'}}>System Overview</h1>
            <section className="dashboard-grid dashboard-grid-hero" aria-label="Admin stats">
              {kpiCards.map((card) => (
                <article key={card.title} className={`dashboard-card dashboard-card-${card.tone}`}>
                  <h2>{card.title}</h2>
                  <p>{card.value}</p>
                </article>
              ))}
            </section>
          </div>
        </section>

        <section className="dashboard-action-grid" aria-label="Admin workflows">
          <article className="dashboard-actions" aria-label="Admin actions">
            <h2>Catalog Management</h2>
            <p style={{marginBottom: '1rem'}}>Add, update, or remove products in your catalog.</p>
            <Link className="admin-primary-link" to="/admin/products">
              Manage Products
            </Link>
          </article>

          <article className="dashboard-actions" aria-label="Order actions">
            <h2>Order Management</h2>
            <p style={{marginBottom: '1rem'}}>Track customer orders and update shipping status.</p>
            <Link className="admin-primary-link" to="/admin/orders">
              View Order List
            </Link>
          </article>

          <article className="dashboard-actions" aria-label="Chat analytics actions">
            <h2>Agent X Analytics</h2>
            <p style={{marginBottom: '1rem'}}>Review AI assistant conversation history.</p>
            <Link className="admin-primary-link" to="/admin/chat-history">
              View Chat History
            </Link>
          </article>
        </section>

        <section className="dashboard-footnote" aria-label="System status">
          <p>System Status: All core admin tools are available and online.</p>
        </section>
      </main>
    </AdminLayout>
  )
}

export default Dashboard
