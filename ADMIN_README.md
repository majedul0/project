# Admin Panel Setup & Documentation

## Quick Start

### Login Credentials
```
Username: admin1971
Password: admin1971
```

### Access Admin Panel
Navigate to: `http://localhost:5173/admin`

---

## 📁 Project Structure

The admin panel follows a modular architecture for maintainability and scalability:

```
src/
├── config/
│   └── adminConfig.js              # Centralized configuration (credentials, settings)
│
├── context/
│   └── AuthContext.jsx              # Authentication state management
│
├── pages/
│   ├── AdminLogin.jsx               # Login page
│   ├── AdminLogin.css
│   ├── AdminDashboard.jsx           # Dashboard overview
│   ├── AdminDashboard.css
│   ├── ManageServices.jsx           # Services CRUD
│   └── ManageServices.css
│
├── components/
│   ├── AdminLayout/
│   │   ├── AdminLayout.jsx          # Sidebar + Header layout
│   │   └── AdminLayout.css
│   └── ProtectedRoute/
│       └── ProtectedRoute.jsx       # Route authentication guard
│
├── services/
│   ├── supabaseClient.js            # Supabase initialization
│   └── servicesApi.js               # Services CRUD operations
│
└── App.jsx                          # Main app with routing
```

---

## 🔐 Authentication System

### How It Works

1. **Login Page** (`/admin`)
   - User enters credentials
   - Credentials validated against `ADMIN_CONFIG.CREDENTIALS`
   - Session stored in `localStorage` with timestamp

2. **Protected Routes**
   - All admin pages wrapped with `<ProtectedRoute>`
   - Checks `isLoggedIn` state via `useAuth()` hook
   - Redirects to login if not authenticated

3. **Session Persistence**
   - Session stored in localStorage for 24 hours
   - Auto-login on page refresh (if session valid)
   - Auto-logout after 24 hours (configurable)

### Changing Credentials

Edit `src/config/adminConfig.js`:

```javascript
CREDENTIALS: {
  USERNAME: 'your_new_username',
  PASSWORD: 'your_new_password',
  SESSION_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
},
```

⚠️ **Security Note**: This is for development only. Use proper authentication (JWT, OAuth) in production.

---

## 📊 Services Management

### Features

- ✅ **Create** - Add new services with details
- ✅ **Read** - View all services in a table
- ✅ **Update** - Edit existing services
- ✅ **Delete** - Remove services with confirmation
- ✅ **Search** - Find services by keywords

### Service Form Fields

| Field | Required | Type | Example |
|-------|----------|------|---------|
| Title | Yes | Text | "Web Development" |
| Category | Yes | Select | "Web Development" |
| Description | Yes | Text Area | "Custom web solutions..." |
| Icon | No | Emoji | "🌐" |
| Features | No | Text Area | "Responsive, Fast, SEO" |
| Image URL | No | URL | "https://example.com/img.jpg" |
| Price | No | Number | 999.99 |

### Service Object (Database)

```javascript
{
  id: "uuid",                    // Auto-generated
  title: "Web Development",
  description: "...",
  category: "Web Development",
  icon: "🌐",
  features: ["Responsive", "Fast"],  // Array
  image_url: "https://...",
  price: 999.99,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

---

## 🗄️ Database Setup (Supabase)

### Table Creation

Create a `services` table in Supabase with this SQL:

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  icon VARCHAR(50) DEFAULT '🔧',
  features JSONB DEFAULT '[]',
  image_url VARCHAR(500),
  price NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_created_at ON services(created_at DESC);
CREATE INDEX idx_services_title ON services(title);
```

### Row Level Security (Optional but Recommended)

Enable RLS for production:

```sql
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow only authenticated users to access
CREATE POLICY "Enable read access for authenticated users"
  ON services FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON services FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
  ON services FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users"
  ON services FOR DELETE TO authenticated
  USING (true);
```

---

## 🔗 API Reference

All API functions in `src/services/servicesApi.js`:

### Fetch All Services
```javascript
const services = await fetchAllServices()
// Returns: Array<Service>
```

### Fetch Single Service
```javascript
const service = await fetchServiceById(id)
// Returns: Service object
```

### Create Service
```javascript
const newService = await createService({
  title: "Web Development",
  description: "Custom web solutions",
  category: "Web Development",
  icon: "🌐",
  features: ["Responsive", "Fast"],
  image_url: "https://...",
  price: 999.99
})
// Returns: Created Service object
```

### Update Service
```javascript
const updated = await updateService(id, {
  title: "New Title",
  description: "Updated description"
})
// Returns: Updated Service object
```

### Delete Service
```javascript
await deleteService(id)
// Returns: void
```

### Search Services
```javascript
const results = await searchServices("web")
// Returns: Array of matching services
```

---

## 🎨 Configuration

Edit `src/config/adminConfig.js` to customize:

### Service Categories
```javascript
SERVICE_CATEGORIES: [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Cloud Services',
  'Consulting',
  'Support',
  'Custom',
],
```

### UI Colors
```javascript
UI: {
  COLORS: {
    PRIMARY: '#667eea',
    SECONDARY: '#764ba2',
    SUCCESS: '#4caf50',
    ERROR: '#ff6b6b',
    WARNING: '#ffc107',
  },
},
```

### Messages
```javascript
MESSAGES: {
  LOGIN_INVALID: 'Invalid username or password',
  LOGIN_SUCCESS: 'Login successful!',
  SERVICE_CREATED: 'Service created successfully!',
  SERVICE_UPDATED: 'Service updated successfully!',
  SERVICE_DELETED: 'Service deleted successfully!',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this service?',
},
```

---

## 🛣️ Routes

### Public Routes
```
GET  /              Homepage
```

### Admin Routes (Protected)
```
GET  /admin                 Login page
GET  /admin/dashboard       Dashboard (overview & statistics)
GET  /admin/services        Services list & management
GET  /admin/services/new    Create new service form
GET  /admin/services/:id    Edit service form
```

---

## 💾 Environment Variables

Create `.env` file in project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_public_key_here
```

Get these values from [Supabase Dashboard](https://supabase.com/dashboard/projects)

---

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This will install `react-router-dom` which was added to `package.json`.

### 2. Setup Supabase

1. Create account at https://supabase.com
2. Create new project
3. Create `services` table (see Database Setup section)
4. Copy credentials to `.env`

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access Admin Panel
- Homepage: `http://localhost:5173/`
- Admin Login: `http://localhost:5173/admin`
- Credentials: `admin1971` / `admin1971`

---

## 🧪 Testing the Admin Panel

### Test Flow
1. ✅ Navigate to `/admin`
2. ✅ Login with provided credentials
3. ✅ View dashboard with statistics
4. ✅ Go to Services management
5. ✅ Create a new service
6. ✅ Edit the service
7. ✅ Delete the service
8. ✅ Test logout

### Common Issues

**Issue**: "Missing Supabase environment variables"
- **Fix**: Check `.env` file has correct variables

**Issue**: Login page appears blank
- **Fix**: Browser console might show import errors - check console

**Issue**: Services not loading
- **Fix**: 
  - Check browser DevTools Network tab
  - Verify Supabase table exists
  - Check credentials in `.env`

**Issue**: Cannot delete service
- **Fix**: Check Supabase RLS policies allow DELETE operations

---

## 📱 Responsive Design

All components are fully responsive:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

The sidebar collapses to a hamburger menu on mobile devices.

---

## 📝 Code Comments

Every file includes comprehensive comments explaining:
- File purpose and structure
- Function parameters and return values
- Usage examples
- Important security notes

Refer to individual files for detailed documentation.

---

## 🔒 Security Considerations

### Development
- Credentials are hardcoded (demo only)
- Sessions stored in localStorage
- No password hashing

### Production Improvements Needed
1. **Authentication**
   - Use JWT tokens
   - Implement proper password hashing (bcrypt)
   - Add OAuth/SSO integration
   - Enable multi-factor authentication

2. **API Security**
   - Enable Supabase Row Level Security (RLS)
   - Implement rate limiting
   - Add API request validation
   - Use HTTPS only

3. **Session Management**
   - Use httpOnly cookies instead of localStorage
   - Implement token refresh mechanism
   - Add session timeout management
   - Log all admin actions

4. **Data Protection**
   - Encrypt sensitive data
   - Implement audit logging
   - Add data backup strategy
   - Use environment variables for secrets

---

## 🤝 Contributing

When adding new features:
1. Follow the modular structure
2. Add comprehensive JSDoc comments
3. Create corresponding CSS file
4. Update this documentation
5. Test on mobile and desktop

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Review relevant component documentation
3. Check Supabase dashboard for data
4. Verify `.env` configuration

---

## 📦 Dependencies

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^6.20.0",
  "@supabase/supabase-js": "^2.106.1"
}
```

---

**Last Updated**: 2024
**Version**: 1.0.0
