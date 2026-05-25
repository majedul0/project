import './CatalogProductCard.css'

const CatalogProductCard = ({ product }) => {
  const badges = (product.featureBadges || []).filter((b) => b.enabled !== false).slice(0, 2)
  const price = product.price ?? product.variants?.[0]?.price

  return (
    <article className="catalog-product-card">
      <div className="catalog-product-card__image-wrap">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name || 'Service'} loading="lazy" />
        ) : (
          <div className="catalog-product-card__placeholder">
            <span className="material-symbols-outlined">hub</span>
          </div>
        )}
        {product.discount ? <span className="catalog-product-card__badge">{product.discount}</span> : null}
      </div>
      <div className="catalog-product-card__body">
        <span className="catalog-product-card__category">{product.category}</span>
        <h3 className="catalog-product-card__title">{product.name}</h3>
        <p className="catalog-product-card__subtitle">{product.subtitle}</p>
        {badges.length > 0 && (
          <div className="catalog-product-card__tags">
            {badges.map((badge) => (
              <span key={badge.id || badge.label} className="catalog-product-card__tag">
                {badge.icon} {badge.label}
              </span>
            ))}
          </div>
        )}
        <div className="catalog-product-card__footer">
          <div className="catalog-product-card__price">
            {product.oldPrice > 0 && product.oldPrice > price ? (
              <span className="catalog-product-card__old-price">BDT {product.oldPrice}</span>
            ) : null}
            <span className="catalog-product-card__current-price">BDT {price ?? '—'}</span>
          </div>
          <span className="catalog-product-card__rating">
            <span className="material-symbols-outlined">star</span>
            {(Number(product.rating) || 0).toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  )
}

export default CatalogProductCard
