import supabase from './supabaseClient'

/** Map DB row → admin UI product shape */
const mapServiceFromDb = (row) => {
  if (!row) return row

  const product =
    row.product_data && typeof row.product_data === 'object' ? row.product_data : {}

  if (product.name) {
    return {
      ...product,
      id: row.id,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }
  }

  return {
    id: row.id,
    name: row.title,
    subtitle: row.description,
    description: row.description,
    category: row.category,
    imageUrl: row.image_url,
    price: row.price,
    icon: row.icon,
    features: row.features,
    created_at: row.created_at,
    updated_at: row.updated_at,
    ...product,
  }
}

/** Map admin UI product → Supabase services columns */
const mapServiceToDb = (data) => {
  if (data.title && !data.name) {
    return data
  }

  const product_data = {
    name: data.name,
    subtitle: data.subtitle,
    category: data.category,
    imageUrl: data.imageUrl,
    galleryImages: data.galleryImages,
    videoUrl: data.videoUrl,
    gifUrl: data.gifUrl,
    rating: data.rating,
    reviews: data.reviews,
    oldPrice: data.oldPrice,
    price: data.price,
    discount: data.discount,
    save: data.save,
    variants: data.variants,
    featureBadges: data.featureBadges,
    relatedProductIds: data.relatedProductIds,
    faqs: data.faqs,
    description: data.description,
    descriptionMedia: data.descriptionMedia,
  }

  return {
    title: data.name,
    description: data.description || data.subtitle || '',
    category: data.category,
    image_url: data.imageUrl || '',
    price: data.price ?? null,
    icon: data.icon || '🔧',
    features: [],
    product_data,
    updated_at: new Date().toISOString(),
  }
}

const formatStorageRlsError = (error) => {
  if (error?.message?.includes('row-level security')) {
    return new Error(
      'Storage upload blocked by Supabase security. Run supabase-fix-rls.sql in the Supabase SQL Editor, then try again.',
    )
  }
  return error
}

// --------- SERVICES ---------
export const fetchAllServices = async () => {
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(mapServiceFromDb)
}
export const fetchServiceById = async (id) => {
  const { data, error } = await supabase.from('services').select('*').eq('id', id).single()
  if (error) throw error
  return mapServiceFromDb(data)
}
export const createService = async (serviceData) => {
  const row = mapServiceToDb(serviceData)
  const { data, error } = await supabase.from('services').insert([row]).select().single()
  if (error) throw error
  return mapServiceFromDb(data)
}
export const updateService = async (id, serviceData) => {
  const row = mapServiceToDb(serviceData)
  const { data, error } = await supabase.from('services').update(row).eq('id', id).select().single()
  if (error) throw error
  return mapServiceFromDb(data)
}
export const deleteService = async (id) => {
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
  return true
}
export const uploadServiceImage = async (file) => {
  if (!file) return null
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const { error } = await supabase.storage.from('img').upload(fileName, file)
  if (error) throw formatStorageRlsError(error)
  const { data } = supabase.storage.from('img').getPublicUrl(fileName)
  return data.publicUrl
}

// --------- BLOGS ---------
export const fetchBlogsAPI = async () => {
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}
export const createBlogAPI = async (blogData) => {
  const { data, error } = await supabase.from('blogs').insert([blogData]).select().single()
  if (error) throw error
  return data
}
export const updateBlogAPI = async (id, blogData) => {
  const { data, error } = await supabase.from('blogs').update(blogData).eq('id', id).select().single()
  if (error) throw error
  return data
}
export const deleteBlogAPI = async (id) => {
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) throw error
  return true
}
export const uploadBlogImage = async (file) => {
  if (!file) return null
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const { error } = await supabase.storage.from('blog-img').upload(fileName, file)
  if (error) throw formatStorageRlsError(error)
  const { data } = supabase.storage.from('blog-img').getPublicUrl(fileName)
  return data.publicUrl
}

// --------- ORDERS ---------
export const fetchOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return { orders: data }
}
export const updateOrderStatus = async (id, status) => {
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single()
  if (error) throw error
  return data
}

// --------- CHAT HISTORY ---------
export const fetchChatHistory = async () => {
  const { data, error } = await supabase.from('chat_history').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}
