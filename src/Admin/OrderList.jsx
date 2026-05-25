import { useState, useEffect } from 'react'
import { fetchOrders, updateOrderStatus } from '../services/api'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import './OrderList.css'

const OrderList = () => {
  const [ordersList, setOrdersList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await fetchOrders()
      setOrdersList(data.orders || [])
    } catch (error) {
      console.error('Failed to load orders', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrdersList(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order))
    } catch (error) {
      alert('Failed to update order status')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleString()
  }

  return (
    <AdminLayout>
      <main className="order-list-page">
        <section className="order-header">
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Placed Orders</h1>
            <p>Review customer orders, see details, and manage shipping statuses.</p>
          </div>
        </section>

        {loading ? (
        <div className="order-loading">Loading orders...</div>
      ) : ordersList.length === 0 ? (
        <div className="order-empty">No orders have been placed yet.</div>
      ) : (
        <section className="order-grid">
          {ordersList.map(order => (
            <article key={order.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <small className="order-date">{formatDate(order.createdAt)}</small>
                </div>
                <div className="order-status-wrap">
                  <label htmlFor={`status-${order.id}`}>Status:</label>
                  <select 
                    id={`status-${order.id}`}
                    className="order-status-select"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="order-details-grid">
                <div className="order-section">
                  <h4>Customer Details</h4>
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Email:</strong> {order.email || 'N/A'}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                </div>

                <div className="order-section">
                  <h4>Order Items</h4>
                  <div className="order-items-list">
                    {order.cartItems?.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <div className="order-item-info">
                          <img 
                            src={item.product?.imageUrl || item.product?.image || ''} 
                            alt={item.product?.name || 'Product'} 
                            className="order-item-img"
                          />
                          <div>
                            <div className="order-item-name">{item.product?.name}</div>
                            <small>Qty: {item.quantity}</small>
                          </div>
                        </div>
                        <div className="order-item-price">
                          ৳{(item.product?.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-totals">
                    <p><span>Subtotal:</span> <span>৳{order.cartSubtotal?.toLocaleString()}</span></p>
                    <p><span>Delivery:</span> <span>৳{order.deliveryCharge?.toLocaleString()}</span></p>
                    <p><strong>Total:</strong> <strong>৳{order.total?.toLocaleString()}</strong></p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
      </main>
    </AdminLayout>
  )
}

export default OrderList