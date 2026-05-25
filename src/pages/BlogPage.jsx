import { useEffect, useState } from 'react'
import ClientPageLayout from '../components/ClientPageLayout/ClientPageLayout'
import { fetchBlogsAPI } from '../services/api'
import './BlogPage.css'

const mapBlog = (blog) => ({
  id: blog.id,
  headline: blog.headline,
  subline: blog.subline || '',
  body: blog.body || '',
  author: blog.author || 'IT Servicer',
  tags: Array.isArray(blog.tags) ? blog.tags : [],
  imageUrl: blog.imageUrl || blog.image_url || '',
  createdAt: blog.created_at,
})

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const data = await fetchBlogsAPI()
        if (active) setBlogs((data || []).map(mapBlog))
      } catch (err) {
        if (active) setError(err.message || 'Failed to load blogs')
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
      title="Blog"
      subtitle="Articles and updates from IT Servicer — published from the admin blog manager."
    >
      {loading && (
        <div className="client-page__status-wrap">
          <p className="client-page__status">Loading articles...</p>
        </div>
      )}
      {error && (
        <div className="client-page__status-wrap">
          <p className="client-page__status client-page__status--error">{error}</p>
        </div>
      )}
      {!loading && !error && blogs.length === 0 && (
        <div className="client-page__status-wrap">
          <p className="client-page__status">No blog posts yet. Publish posts in the admin panel.</p>
        </div>
      )}
      {!loading && !error && blogs.length > 0 && (
        <div className="blog-list">
          {blogs.map((blog) => (
            <article key={blog.id} className="blog-post-card">
              {blog.imageUrl ? (
                <div className="blog-post-card__image">
                  <img src={blog.imageUrl} alt={blog.headline} loading="lazy" />
                </div>
              ) : null}
              <div className="blog-post-card__body">
                <div className="blog-post-card__meta">
                  <span>{blog.author}</span>
                  {blog.createdAt ? (
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  ) : null}
                </div>
                <h2 className="blog-post-card__title">{blog.headline}</h2>
                {blog.subline ? <p className="blog-post-card__subline">{blog.subline}</p> : null}
                {blog.body ? <p className="blog-post-card__excerpt">{blog.body.slice(0, 280)}{blog.body.length > 280 ? '…' : ''}</p> : null}
                {blog.tags.length > 0 && (
                  <div className="blog-post-card__tags">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="blog-post-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </ClientPageLayout>
  )
}

export default BlogPage
