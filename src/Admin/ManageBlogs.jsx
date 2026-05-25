import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import { fetchBlogsAPI, createBlogAPI, updateBlogAPI, deleteBlogAPI, uploadBlogImage } from '../services/api'

import './ManageBlogs.css'

//bog dashboard admin


const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ headline: '', subline: '', body: '', tags: '', author: '' })
  const [imageFile, setImageFile] = useState(null)
  const [toast, setToast] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [editImageFile, setEditImageFile] = useState(null)

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const data = await fetchBlogsAPI()
      setBlogs(data)
    } catch (err) {
      alert('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBlogs() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleEditClick = (blog) => {
    setEditingBlog(blog.id)
    setEditForm({
      headline: blog.headline,
      subline: blog.subline,
      body: blog.body,
      tags: blog.tags.join(', '),
      author: blog.author,
    })
    setEditImageFile(null)
  }

  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

  const handleUpdateBlog = async (e) => {
    e.preventDefault()
    if (!editForm.headline.trim()) {
      alert('Headline is required')
      return
    }

    setSubmitting(true)
    try {
      let imageUrl = null
      if (editImageFile) {
        imageUrl = await uploadBlogImage(editImageFile)
      }

      const updateData = {
        headline: editForm.headline,
        subline: editForm.subline,
        body: editForm.body,
        tags: editForm.tags.split(',').map(t => t.trim()),
        author: editForm.author,
      }
      if (imageUrl) updateData.imageUrl = imageUrl

      await updateBlogAPI(editingBlog, updateData)

      await fetchBlogs()
      setEditingBlog(null)
      setEditForm({})
      setEditImageFile(null)
      alert('Blog updated successfully!')
    } catch (err) {
      alert(err.message || 'Failed to update blog')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      await deleteBlogAPI(blogId)

      await fetchBlogs()
      alert('Blog deleted successfully!')
    } catch (err) {
      alert(err.message || 'Failed to delete blog')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.headline.trim()) {
      alert('Headline is required')
      return
    }
    setSubmitting(true)

    try {
      let imageUrl = null
      if (imageFile) {
        imageUrl = await uploadBlogImage(imageFile)
      }

      const createData = {
        headline: form.headline,
        subline: form.subline,
        body: form.body,
        tags: form.tags.split(',').map(t => t.trim()),
        author: form.author,
        imageUrl: imageUrl
      }

      await createBlogAPI(createData)
      await fetchBlogs()
      setForm({ headline: '', subline: '', body: '', tags: '', author: '' })
      setImageFile(null)
      alert('Blog created successfully!')
    } catch (err) {
      alert(err.message || 'Failed to create blog')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="manage-blogs">
        <div className="manage-blogs-header">
          <h2>Manage Blogs</h2>
          <p>Create and manage your blog posts</p>
        </div>

        <div className="manage-blogs-content">
          <div className="manage-blogs-form-section">
            <h3>Create New Blog</h3>
            <form onSubmit={handleSubmit} className="manage-blogs-form">
              <div className="form-group">
                <label htmlFor="headline">Headline *</label>
                <input
                  id="headline"
                  name="headline"
                  placeholder="Enter blog headline"
                  value={form.headline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subline">Subline</label>
                <input
                  id="subline"
                  name="subline"
                  placeholder="Enter subline/summary"
                  value={form.subline}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    value={form.author}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <input
                    id="tags"
                    name="tags"
                    placeholder="hair-care, ayurveda, organic"
                    value={form.tags}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="body">Body Text</label>
                <textarea
                  id="body"
                  name="body"
                  placeholder="Enter blog content"
                  value={form.body}
                  onChange={handleChange}
                  rows={10}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Featured Image</label>
                <div className="file-input-wrapper">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                  <span className="file-label">{imageFile ? imageFile.name : 'Choose image...'}</span>
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Blog'}
              </button>
            </form>
          </div>

          <div className="manage-blogs-list-section">
            <h3>Existing Blogs ({blogs.length})</h3>
            <div className="blogs-list">
              {loading ? (
                <div className="loading-state">Loading blogs...</div>
              ) : blogs.length === 0 ? (
                <div className="empty-state">No blogs created yet</div>
              ) : (
                blogs.map((b) => (
                  <div key={b.id} className="blog-item">
                    {b.imageUrl && <img src={b.imageUrl} alt={b.headline} className="blog-item-image" />}
                    <div className="blog-item-content">
                      <h4>{b.headline}</h4>
                      <p>{b.subline}</p>
                      <div className="blog-item-meta">
                        <span>{b.author}</span>
                        <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="blog-item-actions">
                      <button className="btn-edit" onClick={() => handleEditClick(b)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDeleteBlog(b.id)}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingBlog && (
        <div className="edit-modal-overlay" onClick={() => setEditingBlog(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>Edit Blog</h3>
              <button className="edit-modal-close" onClick={() => setEditingBlog(null)}>×</button>
            </div>

            <form onSubmit={handleUpdateBlog} className="edit-form">
              <div className="form-group">
                <label htmlFor="edit-headline">Headline *</label>
                <input
                  id="edit-headline"
                  name="headline"
                  value={editForm.headline || ''}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-subline">Subline</label>
                <input
                  id="edit-subline"
                  name="subline"
                  value={editForm.subline || ''}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-author">Author</label>
                  <input
                    id="edit-author"
                    name="author"
                    value={editForm.author || ''}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-tags">Tags</label>
                  <input
                    id="edit-tags"
                    name="tags"
                    value={editForm.tags || ''}
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-body">Body Text</label>
                <textarea
                  id="edit-body"
                  name="body"
                  value={editForm.body || ''}
                  onChange={handleEditChange}
                  rows={10}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-image">Featured Image (optional)</label>
                <div className="file-input-wrapper">
                  <input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImageFile(e.target.files[0])}
                  />
                  <span className="file-label">{editImageFile ? editImageFile.name : 'Choose new image...'}</span>
                </div>
              </div>

              <div className="edit-modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingBlog(null)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Updating...' : 'Update Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  )
}

export default ManageBlogs
