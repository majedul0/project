# IT Servicer - Client Application

Modern web application for IT services company with React, Vite, and Supabase backend.

## 🚀 Features

### Public Website
- Hero landing page with animations
- Tech stack showcase
- Services section
- Call-to-action section
- Responsive mobile design

### Admin Panel
- 🔐 **Authentication** - Secure login with credentials
- 📊 **Dashboard** - Overview and statistics
- 🔧 **Services Management** - Complete CRUD operations
- 📱 **Responsive Design** - Works on all devices
- 💾 **Database Integration** - Supabase backend

---

## 📋 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create `.env` file in root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_public_key
```

### 3. Setup Supabase Database
Create `services` table in Supabase with:
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
```

### 4. Start Development Server
```bash
npm run dev
```

---

## 🌐 Access Points

| URL | Purpose | Notes |
|-----|---------|-------|
| `http://localhost:5173/` | Homepage | Public website |
| `http://localhost:5173/admin` | Admin Login | Use credentials below |
| `http://localhost:5173/admin/dashboard` | Dashboard | Protected - login required |
| `http://localhost:5173/admin/services` | Services Management | Protected - login required |

---

## 🔐 Admin Credentials

```
Username: admin1971
Password: admin1971
```

⚠️ **Note**: For production, use proper authentication with JWT, OAuth, or database-stored hashed passwords.

---

## 📁 Project Structure

```
src/
├── pages/                      # Route-level components
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   └── ManageServices.jsx
│
├── components/                 # Reusable UI components
│   ├── AdminLayout/            # Admin pages layout
│   ├── ProtectedRoute/         # Route authentication guard
│   ├── TopAppBar/
│   ├── HeroSection/
│   └── ...
│
├── context/                    # State management
│   └── AuthContext.jsx         # Authentication state
│
├── services/                   # API & business logic
│   ├── supabaseClient.js       # Supabase initialization
│   └── servicesApi.js          # CRUD operations
│
├── config/                     # Configuration
│   └── adminConfig.js          # Admin settings & credentials
│
├── animations/                 # Animation components
│   ├── supernova.jsx
│   └── ...
│
├── styles/                     # Global styles
│   └── global.css
│
└── App.jsx                     # Main app with routing
```

---

## 🛠️ Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy
Choose one:

**Vercel**
```bash
npm install -g vercel
vercel
```

**Netlify**
- Push to GitHub
- Connect repo to Netlify in dashboard
- Build command: `npm run build`
- Publish: `dist`

---

## 📚 Documentation

- **[Admin Setup Guide](./ADMIN_SETUP_GUIDE.md)** - Detailed admin panel documentation
- **[Admin README](./ADMIN_README.md)** - Comprehensive admin features guide
- **[Quick Reference](./ADMIN_QUICK_REF.md)** - Quick lookup for common tasks

---

## 🧪 Features Overview

### Public Website
- ✅ Responsive landing page
- ✅ Animated hero section
- ✅ Services showcase
- ✅ Tech stack display
- ✅ CTA section
- ✅ Footer with links

### Admin Panel
- ✅ Login/Logout authentication
- ✅ Dashboard with statistics
- ✅ Create new services
- ✅ Edit existing services
- ✅ Delete services with confirmation
- ✅ View all services in table
- ✅ Session persistence
- ✅ Protected routes
- ✅ Responsive sidebar navigation

---

## 🔗 API Operations

All CRUD operations through Supabase:

```javascript
import { 
  fetchAllServices,
  fetchServiceById,
  createService,
  updateService,
  deleteService,
  searchServices
} from '@/services/servicesApi'

// Examples
const services = await fetchAllServices()
const service = await fetchServiceById(id)
await createService({ title: '...', ... })
await updateService(id, { title: '...' })
await deleteService(id)
await searchServices('web')
```

---

## 🎨 Customization

### Change Admin Login Credentials
Edit `src/config/adminConfig.js`:
```javascript
CREDENTIALS: {
  USERNAME: 'your_username',
  PASSWORD: 'your_password',
}
```

### Change Service Categories
Edit `src/config/adminConfig.js`:
```javascript
SERVICE_CATEGORIES: [
  'Web Development',
  'Mobile Development',
  'Your Category Here',
]
```

### Update UI Colors
Edit `src/config/adminConfig.js`:
```javascript
UI: {
  COLORS: {
    PRIMARY: '#667eea',
    SECONDARY: '#764ba2',
    SUCCESS: '#4caf50',
    ERROR: '#ff6b6b',
  },
}
```

---

## 📦 Dependencies

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^6.20.0",
  "@supabase/supabase-js": "^2.106.1",
  "@react-three/fiber": "^9.6.1",
  "@react-three/drei": "^10.7.7",
  "three": "^0.184.0"
}
```

---

## 🚨 Common Issues

### Issue: "Missing Supabase environment variables"
**Solution**: Check `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`

### Issue: Login page not working
**Solution**: 
1. Check browser console for errors
2. Verify `.env` variables
3. Clear browser cache and localStorage

### Issue: Services not loading
**Solution**:
1. Verify Supabase table exists
2. Check network tab in DevTools
3. Confirm Supabase credentials
4. Check browser console for errors

### Issue: Session not persisting
**Solution**: Check if localStorage is enabled in browser settings

---

## 🔒 Security Notes

### Development Mode
- Credentials are hardcoded (demo purposes only)
- Sessions stored in localStorage
- No database password hashing

### Production Requirements
1. **Implement proper authentication**
   - JWT tokens
   - Password hashing (bcrypt)
   - OAuth/SSO integration
   - Multi-factor authentication

2. **Enable Supabase security**
   - Enable Row Level Security (RLS)
   - Restrict API access to authenticated users
   - Set up proper API keys

3. **Secure session management**
   - Use httpOnly cookies (not localStorage)
   - Implement token refresh mechanism
   - Add session timeout
   - Log all admin actions

---

## 📊 Performance

- Optimized bundle size: ~170KB (gzipped)
- Lazy loading for admin pages
- Cached API responses
- Responsive images
- CSS minification

---

## 🤝 Contributing

When adding features:
1. Follow the modular structure
2. Add JSDoc comments
3. Create corresponding CSS file
4. Test on mobile and desktop
5. Update documentation

---

## 📞 Support

- Check browser DevTools Console tab
- Review component comments for usage
- Refer to documentation files
- Check Supabase dashboard for data

---

## 📄 License

This project is created for IT Servicer.

---

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com)

---

**Last Updated**: 2024
**Version**: 1.0.0
