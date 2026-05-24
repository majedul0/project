import { useState } from 'react'
import { useProducts } from '../../context/ProductContext'
import { uploadProductImage, uploadProductMedia } from '../../services/api'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import './ManageProducts.css'
import { DEFAULT_FEATURE_BADGES, getProductCategoryOptions, getProductCategoryLabel, normalizeCategoryLabel } from '../../utils/productCustomization'

const MAX_GALLERY_IMAGES = 5
const VARIANT_UNIT_OPTIONS = ['ML', 'L', 'G', 'KG', 'PCS']
const createVariantRow = (variant = {}, index = 0) => ({
  id: variant.id || `variant-${Date.now()}-${index}`,
  amount: String(variant.amount ?? ''),
  unit: String(variant.unit ?? 'ML').toUpperCase(),
  price: String(variant.price ?? ''),
  oldPrice: String(variant.oldPrice ?? ''),
  save: String(variant.save ?? ''),
  label: String(variant.label ?? ''),
})
const createBadgeRow = (badge = {}, index = 0) => ({
  id: badge.id || `badge-${Date.now()}-${index}`,
  icon: String(badge.icon ?? '✨'),
  label: String(badge.label ?? ''),
  enabled: badge.enabled !== false,
})
const createFaqRow = (faq = {}, index = 0) => ({
  id: faq.id || `faq-${Date.now()}-${index}`,
  question: String(faq.question ?? ''),
  answer: String(faq.answer ?? ''),
})
const createMediaRow = (media = {}, index = 0) => ({
  id: media.id || `media-${Date.now()}-${index}`,
  type: String((media.type || 'image')).toLowerCase(),
  url: String(media.url || ''),
  alt: String(media.alt || ''),
  caption: String(media.caption || ''),
})

const createInitialForm = () => ({
  name: '',
  subtitle: '',
  category: '',
  imageUrl: '',
  galleryImageUrls: '',
  videoUrl: '',
  gifUrl: '',
  description: '',
  rating: '4.5',
  reviews: '0',
  oldPrice: '0',
  price: '0',
  discount: '0% OFF',
  save: '0',
  variants: [createVariantRow({ amount: '100', unit: 'ML' })],
  featureBadges: DEFAULT_FEATURE_BADGES.map((badge, index) => createBadgeRow(badge, index)),
  relatedProductIds: [],
  faqs: [],
  descriptionMedia: [],
})

const ManageProducts = () => {
  const { products, createProduct, updateProduct, deleteProduct } = useProducts()
  const [formData, setFormData] = useState(createInitialForm)
  const [editingId, setEditingId] = useState(null)
  const [primaryImageFile, setPrimaryImageFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [videoFile, setVideoFile] = useState(null)
  const [descriptionFiles, setDescriptionFiles] = useState([])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVariantChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, currentIndex) =>
        currentIndex === index ? { ...variant, [field]: value } : variant,
      ),
    }))
  }

  const addVariantRow = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, createVariantRow({}, prev.variants.length)],
    }))
  }

  const removeVariantRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.length > 1 ? prev.variants.filter((_, currentIndex) => currentIndex !== index) : prev.variants,
    }))
  }

  const handleBadgeChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      featureBadges: prev.featureBadges.map((badge, currentIndex) =>
        currentIndex === index ? { ...badge, [field]: value } : badge,
      ),
    }))
  }

  const addBadgeRow = () => {
    setFormData((prev) => ({
      ...prev,
      featureBadges: [...prev.featureBadges, createBadgeRow({}, prev.featureBadges.length)],
    }))
  }

  const removeBadgeRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      featureBadges: prev.featureBadges.length > 1 ? prev.featureBadges.filter((_, currentIndex) => currentIndex !== index) : prev.featureBadges,
    }))
  }

  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, currentIndex) =>
        currentIndex === index ? { ...faq, [field]: value } : faq,
      ),
    }))
  }

  const addFaqRow = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, createFaqRow({}, prev.faqs.length)],
    }))
  }

  const removeFaqRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, currentIndex) => currentIndex !== index),
    }))
  }

  const handleMediaChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      descriptionMedia: prev.descriptionMedia.map((media, currentIndex) =>
        currentIndex === index ? { ...media, [field]: value } : media,
      ),
    }))
  }

  const addMediaRow = () => {
    setFormData((prev) => ({
      ...prev,
      descriptionMedia: [...prev.descriptionMedia, createMediaRow({}, prev.descriptionMedia.length)],
    }))
  }

  const removeMediaRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      descriptionMedia: prev.descriptionMedia.filter((_, currentIndex) => currentIndex !== index),
    }))
  }

  const handleDescriptionFilesChange = (event) => {
    const files = Array.from(event.target.files || [])
    setDescriptionFiles(files)
  }

  const handleRelatedProductsChange = (event) => {
    const selectedIds = Array.from(event.target.selectedOptions || []).map((option) => option.value)
    setFormData((prev) => ({ ...prev, relatedProductIds: selectedIds }))
  }

  const resetForm = () => {
    setFormData(createInitialForm())
    setEditingId(null)
    setPrimaryImageFile(null)
    setGalleryFiles([])
    setVideoFile(null)
  }

  const handlePrimaryImageFileChange = (event) => {
    const file = event.target.files?.[0] || null
    setPrimaryImageFile(file)
  }

  const handleGalleryFilesChange = (event) => {
    const files = Array.from(event.target.files || []).slice(0, MAX_GALLERY_IMAGES)
    if ((event.target.files || []).length > MAX_GALLERY_IMAGES) {
      alert(`You can upload up to ${MAX_GALLERY_IMAGES} gallery images.`)
    }
    setGalleryFiles(files)
  }

  const handleVideoFileChange = (event) => {
    const file = event.target.files?.[0] || null
    setVideoFile(file)
  }

  const parseMultilineUrls = (value) =>
    value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)

  const uniqueStrings = (values) => Array.from(new Set(values.filter(Boolean)))

  const uploadFilesByType = async (files) => {
    if (!files.length) {
      return []
    }

    const result = await uploadProductMedia(files)
    return Array.isArray(result.files) ? result.files : []
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let resolvedImageUrl = formData.imageUrl.trim()
    let resolvedGalleryImages = parseMultilineUrls(formData.galleryImageUrls).slice(0, MAX_GALLERY_IMAGES)
    let resolvedVideoUrl = formData.videoUrl.trim()
    const resolvedGifUrl = formData.gifUrl.trim()

    try {
      if (primaryImageFile) {
        const uploadResult = await uploadProductImage(primaryImageFile)
        resolvedImageUrl = uploadResult.imageUrl
      }

      const galleryUploads = await uploadFilesByType(galleryFiles)
      const uploadedGalleryImages = galleryUploads
        .filter((file) => file.type === 'image')
        .map((file) => file.url)

      resolvedGalleryImages = uniqueStrings([...resolvedGalleryImages, ...uploadedGalleryImages]).slice(0, MAX_GALLERY_IMAGES)

      if (videoFile) {
        const videoUploads = await uploadFilesByType([videoFile])
        const uploadedVideo = videoUploads.find((file) => file.type === 'video')
        if (uploadedVideo?.url) {
          resolvedVideoUrl = uploadedVideo.url
        }
      }
    } catch (error) {
      alert(error.message || 'Unable to upload product media')
      return
    }

    if (!resolvedImageUrl) {
      alert('One primary image is mandatory for every product.')
      return
    }

    const resolvedVariants = formData.variants
      .map((variant, index) => {
        const amount = String(variant.amount).trim()
        const unit = String(variant.unit).trim().toUpperCase()
        const price = Number(variant.price || formData.price)
        const oldPrice = Number(variant.oldPrice || formData.oldPrice)
        const save = Number(variant.save || Math.max(0, oldPrice - price))
        const label = String(variant.label).trim() || [amount, unit].filter(Boolean).join(' ').trim() || `Variant ${index + 1}`

        if (!amount && !unit && !variant.price && !variant.oldPrice) {
          return null
        }

        return {
          id: variant.id || `variant-${index + 1}`,
          amount,
          unit,
          label,
          price,
          oldPrice,
          save,
        }
      })
      .filter(Boolean)

    const resolvedFeatureBadges = formData.featureBadges
      .map((badge, index) => ({
        id: badge.id || `badge-${index + 1}`,
        icon: String(badge.icon).trim() || '✨',
        label: String(badge.label).trim(),
        enabled: badge.enabled !== false,
      }))
      .filter((badge) => badge.label)

    const resolvedFaqs = (formData.faqs || [])
      .map((faq, index) => ({
        id: faq.id || `faq-${index + 1}`,
        question: String(faq.question).trim(),
        answer: String(faq.answer).trim(),
      }))
      .filter((faq) => faq.question && faq.answer)

    // Upload any new description media files and merge with existing items
    let resolvedDescriptionMedia = (formData.descriptionMedia || [])
      .map((m, index) => ({
        id: m.id || `media-${index + 1}`,
        type: String((m.type || 'image')).toLowerCase(),
        url: String(m.url || '').trim(),
        alt: String(m.alt || '').trim(),
        caption: String(m.caption || '').trim(),
      }))
      .filter((m) => m.url)

    if (descriptionFiles && descriptionFiles.length > 0) {
      try {
        const descriptionUploads = await uploadFilesByType(descriptionFiles)
        const uploadedDescriptionMedia = (descriptionUploads || [])
          .map((file, index) => ({
            id: file.id || `media-upload-${Date.now()}-${index}`,
            type: String(file.type || 'image').toLowerCase(),
            url: file.url,
            alt: '',
            caption: '',
          }))
        // merge and dedupe by url (keep first occurrence)
        const merged = [...resolvedDescriptionMedia, ...uploadedDescriptionMedia]
        const mapByUrl = new Map()
        merged.forEach((m) => {
          if (m.url && !mapByUrl.has(m.url)) {
            mapByUrl.set(m.url, m)
          }
        })
        resolvedDescriptionMedia = Array.from(mapByUrl.values())
      } catch (err) {
        // non-fatal: continue without uploaded description media
        console.warn('description media upload failed', err)
      }
    }

    const resolvedDescription = String(formData.description || '').trim()

    const payload = {
      name: formData.name.trim(),
      subtitle: formData.subtitle.trim(),
      category: normalizeCategoryLabel(formData.category),
      imageUrl: resolvedImageUrl,
      galleryImages: resolvedGalleryImages,
      videoUrl: resolvedVideoUrl,
      gifUrl: resolvedGifUrl,
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      oldPrice: Number(formData.oldPrice),
      price: Number(formData.price),
      discount: formData.discount.trim(),
      save: Number(formData.save),
      variants: resolvedVariants.length > 0 ? resolvedVariants : [
        {
          id: 'default',
          amount: '',
          unit: '',
          label: 'Standard',
          price: Number(formData.price),
          oldPrice: Number(formData.oldPrice),
          save: Number(formData.save),
        },
      ],
      featureBadges: resolvedFeatureBadges.length > 0 ? resolvedFeatureBadges : DEFAULT_FEATURE_BADGES,
      relatedProductIds: formData.relatedProductIds,
      faqs: resolvedFaqs,
      description: resolvedDescription,
      descriptionMedia: resolvedDescriptionMedia,
    }

    if (!payload.name || !payload.subtitle || !payload.imageUrl) {
      return
    }

    if (!payload.category) {
      alert('Please choose or create a category for this product.')
      return
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload)
        resetForm()
        return
      }

      await createProduct(payload)
      resetForm()
    } catch (error) {
      alert(error.message || 'Unable to save the product')
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setPrimaryImageFile(null)
    setGalleryFiles([])
    setVideoFile(null)
    setFormData({
      name: product.name,
      subtitle: product.subtitle,
      category: product.category || getProductCategoryLabel(product),
      imageUrl: product.imageUrl,
      galleryImageUrls: Array.isArray(product.galleryImages) ? product.galleryImages.join('\n') : '',
      videoUrl: product.videoUrl || '',
      gifUrl: product.gifUrl || '',
      rating: String(product.rating),
      reviews: String(product.reviews),
      oldPrice: String(product.oldPrice),
      price: String(product.price),
      discount: product.discount,
      save: String(product.save),
      variants: Array.isArray(product.variants) && product.variants.length > 0
        ? product.variants.map((variant, index) => createVariantRow(variant, index))
        : [createVariantRow({ amount: product.variantAmount || '100', unit: product.variantUnit || 'ML', price: product.price, oldPrice: product.oldPrice, save: product.save }, 0)],
      featureBadges: Array.isArray(product.featureBadges) && product.featureBadges.length > 0
        ? product.featureBadges.map((badge, index) => createBadgeRow(badge, index))
        : DEFAULT_FEATURE_BADGES.map((badge, index) => createBadgeRow(badge, index)),
      relatedProductIds: Array.isArray(product.relatedProductIds) ? product.relatedProductIds.map(String) : [],
      faqs: Array.isArray(product.faqs) ? product.faqs.map((faq, index) => createFaqRow(faq, index)) : [],
      descriptionMedia: Array.isArray(product.descriptionMedia) ? product.descriptionMedia.map((m, index) => createMediaRow(m, index)) : [],
      description: product.description || '',
    })
  }

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId)

      if (editingId === productId) {
        resetForm()
      }
    } catch (error) {
      alert(error.message || 'Unable to delete the product')
    }
  }

  return (
    <AdminLayout>
      <main className="manage-products-page">
        <section className="manage-header">
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Manage Products</h1>
            <p>Add new products, edit existing products, or remove items from the list.</p>
          </div>
        </section>

        <section className="manage-layout" aria-label="Product tools">
          <article className="product-form-card">
            <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form-grid">
            <label>
              Product Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>

            <div className="product-form-section" style={{ gridColumn: 'span 2' }}>
              <div className="product-form-section-head">
                <h3>Description Media (Images / GIFs / Videos)</h3>
                <button type="button" className="manage-ghost-btn" onClick={addMediaRow}>
                  Add Media Item
                </button>
              </div>

              <label style={{ gridColumn: 'span 2' }}>
                Upload Media Files (multiple allowed)
                <input type="file" accept="image/*,video/*" multiple onChange={handleDescriptionFilesChange} />
              </label>

              {formData.descriptionMedia.map((media, index) => (
                <div key={media.id} className="media-row" style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                  <input
                    type="text"
                    value={media.url}
                    onChange={(event) => handleMediaChange(index, 'url', event.target.value)}
                    placeholder="Media URL"
                    aria-label={`Media url ${index + 1}`}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select value={media.type} onChange={(event) => handleMediaChange(index, 'type', event.target.value)}>
                      <option value="image">Image</option>
                      <option value="gif">GIF</option>
                      <option value="video">Video</option>
                    </select>
                    <input
                      type="text"
                      value={media.alt}
                      onChange={(event) => handleMediaChange(index, 'alt', event.target.value)}
                      placeholder="Alt text"
                    />
                  </div>
                  <textarea
                    value={media.caption}
                    onChange={(event) => handleMediaChange(index, 'caption', event.target.value)}
                    placeholder="Caption (optional)"
                    rows={2}
                  />
                  <button type="button" className="manage-ghost-btn" onClick={() => removeMediaRow(index)} style={{ justifySelf: 'start' }}>
                    Remove Media
                  </button>
                </div>
              ))}
            </div>

            <label>
              Subtitle
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                required
              />
            </label>

            <label style={{ gridColumn: 'span 2' }}>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Short product description or details (plain text)."
              />
            </label>

            <label>
              Category <span style={{ fontSize: '0.85em', color: '#6a7d5f', fontWeight: 'normal', marginLeft: '0.5rem' }}>(Type any name to create a new category)</span>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                <input
                  type="text"
                  name="category"
                  list="product-category-options"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Select existing or type a new category..."
                  required
                  style={{ flex: 1, margin: 0 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, category: '' }));
                    const categoryInput = document.querySelector('input[name="category"]');
                    if (categoryInput) categoryInput.focus();
                  }}
                  className="btn-secondary"
                  style={{ margin: 0, whiteSpace: 'nowrap' }}
                  title="Clear field to type a new category"
                >
                  + Add New
                </button>
              </div>
              <datalist id="product-category-options">
                {getProductCategoryOptions(products).map((category) => (
                  <option key={category.value} value={category.label} />
                ))}
              </datalist>
            </label>

            <label>
              Upload Primary Image (mandatory unless URL is set)
              <input
                type="file"
                accept="image/*"
                onChange={handlePrimaryImageFileChange}
              />
            </label>

            <label>
              Primary Image URL
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Upload Gallery Images (optional, up to 5)
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryFilesChange}
              />
            </label>

            <label>
              Gallery Image URLs (optional, one per line, up to 5)
              <textarea
                name="galleryImageUrls"
                value={formData.galleryImageUrls}
                onChange={handleInputChange}
                rows={4}
              />
            </label>

            <label>
              Upload Video
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
              />
            </label>

            <label>
              Video URL (optional)
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
              />
            </label>

            <label>
              GIF URL (optional)
              <input
                type="text"
                name="gifUrl"
                value={formData.gifUrl}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Rating
              <input
                type="number"
                min="0"
                max="5"
                step="0.01"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Reviews
              <input
                type="number"
                min="0"
                name="reviews"
                value={formData.reviews}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Old Price
              <input
                type="number"
                min="0"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Price
              <input
                type="number"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Discount
              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Save Amount
              <input
                type="number"
                min="0"
                name="save"
                value={formData.save}
                onChange={handleInputChange}
                required
              />
            </label>

            <div className="product-form-section">
              <div className="product-form-section-head">
                <h3>Variants</h3>
                <button type="button" className="manage-ghost-btn" onClick={addVariantRow}>
                  Add Variant
                </button>
              </div>
              {formData.variants.map((variant, index) => (
                <div key={variant.id} className="variant-row">
                  <input
                    type="text"
                    value={variant.amount}
                    onChange={(event) => handleVariantChange(index, 'amount', event.target.value)}
                    placeholder="100"
                    aria-label={`Variant amount ${index + 1}`}
                  />
                  <select
                    value={variant.unit}
                    onChange={(event) => handleVariantChange(index, 'unit', event.target.value)}
                    aria-label={`Variant unit ${index + 1}`}
                  >
                    {VARIANT_UNIT_OPTIONS.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={variant.price}
                    onChange={(event) => handleVariantChange(index, 'price', event.target.value)}
                    placeholder="Price"
                    aria-label={`Variant price ${index + 1}`}
                  />
                  <input
                    type="number"
                    min="0"
                    value={variant.oldPrice}
                    onChange={(event) => handleVariantChange(index, 'oldPrice', event.target.value)}
                    placeholder="Old price"
                    aria-label={`Variant old price ${index + 1}`}
                  />
                  <input
                    type="text"
                    value={variant.label}
                    onChange={(event) => handleVariantChange(index, 'label', event.target.value)}
                    placeholder="Label"
                    aria-label={`Variant label ${index + 1}`}
                  />
                  <button type="button" className="manage-ghost-btn" onClick={() => removeVariantRow(index)} disabled={formData.variants.length === 1}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="product-form-section">
              <div className="product-form-section-head">
                <h3>Feature Badges</h3>
                <button type="button" className="manage-ghost-btn" onClick={addBadgeRow}>
                  Add Badge
                </button>
              </div>
              {formData.featureBadges.map((badge, index) => (
                <div key={badge.id} className="badge-row">
                  <input
                    type="text"
                    value={badge.icon}
                    onChange={(event) => handleBadgeChange(index, 'icon', event.target.value)}
                    placeholder="🌿"
                    aria-label={`Badge icon ${index + 1}`}
                  />
                  <input
                    type="text"
                    value={badge.label}
                    onChange={(event) => handleBadgeChange(index, 'label', event.target.value)}
                    placeholder="Feature label"
                    aria-label={`Badge label ${index + 1}`}
                  />
                  <label className="badge-enabled-toggle">
                    <input
                      type="checkbox"
                      checked={badge.enabled}
                      onChange={(event) => handleBadgeChange(index, 'enabled', event.target.checked)}
                    />
                    Show
                  </label>
                  <button type="button" className="manage-ghost-btn" onClick={() => removeBadgeRow(index)} disabled={formData.featureBadges.length === 1}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="product-form-section" style={{ gridColumn: 'span 2' }}>
              <div className="product-form-section-head">
                <h3>Frequently Asked Questions</h3>
                <button type="button" className="manage-ghost-btn" onClick={addFaqRow}>
                  Add FAQ
                </button>
              </div>
              {formData.faqs.map((faq, index) => (
                <div key={faq.id} className="faq-row" style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(event) => handleFaqChange(index, 'question', event.target.value)}
                    placeholder="Question (e.g. Can I use this product daily?)"
                    aria-label={`FAQ question ${index + 1}`}
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(event) => handleFaqChange(index, 'answer', event.target.value)}
                    placeholder="Answer"
                    aria-label={`FAQ answer ${index + 1}`}
                    rows={3}
                  />
                  <button type="button" className="manage-ghost-btn" onClick={() => removeFaqRow(index)} style={{ justifySelf: 'start' }}>
                    Remove FAQ
                  </button>
                </div>
              ))}
            </div>
            <label className="related-products-label">
              Related Products
              <select multiple value={formData.relatedProductIds} onChange={handleRelatedProductsChange} className="related-products-select">
                {products
                  .filter((product) => String(product.id) !== String(editingId))
                  .map((product) => (
                    <option key={product.id} value={String(product.id)}>
                      {product.name}
                    </option>
                  ))}
              </select>
            </label>

            <div className="product-form-buttons">
              <button type="submit" className="manage-primary-btn">
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
              {editingId ? (
                <button type="button" className="manage-ghost-btn" onClick={resetForm}>
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </form>
        </article>

        <article className="product-list-card">
          <h2>Product List ({products.length})</h2>
          <div className="product-list-wrap">
            {products.map((product) => (
              <div key={product.id} className="product-row">
                <img src={product.imageUrl} alt={product.name} />
                <div className="product-row-info">
                  <h3>{product.name}</h3>
                  <p>{product.subtitle}</p>
                  <small>
                    BDT {product.price} | {product.discount} | Rating {product.rating.toFixed(2)}
                  </small>
                  <small>
                    Gallery: {Array.isArray(product.galleryImages) ? product.galleryImages.length : 0} | Video:{' '}
                    {product.videoUrl ? 'Yes' : 'No'} | GIF: {product.gifUrl ? 'Yes' : 'No'}
                  </small>
                  <small>
                    Variants: {Array.isArray(product.variants) ? product.variants.length : 0} | Badges:{' '}
                    {Array.isArray(product.featureBadges) ? product.featureBadges.filter((badge) => badge.enabled !== false).length : 0} | Related:{' '}
                    {Array.isArray(product.relatedProductIds) ? product.relatedProductIds.length : 0}
                  </small>
                </div>
                <div className="product-row-actions">
                  <button type="button" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button type="button" className="danger-btn" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
    </AdminLayout>
  )
}

export default ManageProducts
