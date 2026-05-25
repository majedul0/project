import supabase from './supabaseClient'

// --------- SERVICES ---------
export const fetchAllServices = async () => {
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}
export const fetchServiceById = async (id) => {
  const { data, error } = await supabase.from('services').select('*').eq('id', id).single()
  if (error) throw error
  return data
}
export const createService = async (serviceData) => {
  const { data, error } = await supabase.from('services').insert([serviceData]).select().single()
  if (error) throw error
  return data
}
export const updateService = async (id, serviceData) => {
  const { data, error } = await supabase.from('services').update(serviceData).eq('id', id).select().single()
  if (error) throw error
  return data
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
  if (error) throw error
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
  if (error) throw error
  const { data } = supabase.storage.from('blog-img').getPublicUrl(fileName)
  return data.publicUrl
}

// --------- ORDERS ---------
export const fetchOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  if (error) throw error
  // The UI expects data.orders or similar, or just an array? The old api returned { orders: data }. We'll just return { orders: data }
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
