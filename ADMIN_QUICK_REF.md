# Admin Panel Quick Reference

## 🎯 Quick Commands

### Install Dependencies
```bash
npm install
```

### Start Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 🔐 Login

**URL**: `http://localhost:5173/admin`

**Credentials**:
- Username: `admin1971`
- Password: `admin1971`

---

## 📂 File Locations

| Task | File |
|------|------|
| Change login credentials | `src/config/adminConfig.js` |
| Add service categories | `src/config/adminConfig.js` |
| Create service schema | `src/services/servicesApi.js` |
| Update authentication logic | `src/context/AuthContext.jsx` |
| Change UI colors | `src/config/adminConfig.js` |
| Edit form fields | `src/pages/ManageServices.jsx` |

---

## 🛠️ Common Tasks

### Change Login Credentials
```javascript
// File: src/config/adminConfig.js
export const ADMIN_CONFIG = {
  CREDENTIALS: {
    USERNAME: 'your_username',
    PASSWORD: 'your_password',
  },
  // ...\n}
```

### Add New Service Category
```javascript
// File: src/config/adminConfig.js
SERVICE_CATEGORIES: [
  'Web Development',
  'Mobile Development',
  'Your New Category',  // Add here
],
```

### Add New Admin Page

1. Create `src/pages/NewPage.jsx`
2. Create `src/pages/NewPage.css`
3. Add route to `src/App.jsx`:
```jsx
<Route
  path="/admin/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```
4. Add menu item to `src/components/AdminLayout/AdminLayout.jsx`

### Create a Service Programmatically
```javascript
import { createService } from '@/services/servicesApi'

const newService = await createService({
  title: 'Service Title',
  description: 'Description',
  category: 'Web Development',
  icon: '🚀',
  features: ['Feature 1', 'Feature 2'],
  image_url: 'https://...',
  price: 999.99
})
```

---

## 🗄️ Database

### Create Services Table (SQL)
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

### Insert Sample Data
```sql
INSERT INTO services (title, description, category, icon, features, price)
VALUES (
  'Web Development',
  'Custom web solutions',
  'Web Development',
  '🌐',
  '["Responsive", "Fast", "SEO"]',
  999.99
);
```

---

## 📚 Hooks

### useAuth() - Get Authentication State
```javascript
import { useAuth } from '@/context/AuthContext'

const { isLoggedIn, user, loading, login, logout } = useAuth()

// isLoggedIn: boolean
// user: { username, role, loginTime }
// loading: boolean
// login(username, password): Promise<boolean>
// logout(): void
```

---

## 🎨 Styling

All styles use CSS with variables for consistency:

```css
/* Colors (from config) */
--primary: #667eea;
--secondary: #764ba2;
--success: #4caf50;
--error: #ff6b6b;
--warning: #ffc107;

/* Layout */
--sidebar-width: 250px;
--header-height: 60px;
```

---

## 🧪 Testing Admin Features

### Test Checklist
- [ ] Login with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Dashboard loads with stats
- [ ] Can create new service
- [ ] Can edit existing service
- [ ] Can delete service
- [ ] Can view service list
- [ ] Session persists on refresh
- [ ] Can logout
- [ ] Redirect to login when not authenticated
- [ ] Responsive on mobile
- [ ] Sidebar collapses on mobile

---

## 📊 API Endpoints

### Supabase REST API (Auto-generated)

All operations go through `supabase` client in `src/services/supabaseClient.js`

Example:
```javascript
// CREATE
const { data, error } = await supabase
  .from('services')
  .insert([{ title: '...', description: '...' }])
  .select()

// READ
const { data, error } = await supabase
  .from('services')
  .select('*')

// UPDATE
const { data, error } = await supabase
  .from('services')
  .update({ title: '...' })
  .eq('id', serviceId)

// DELETE
const { error } = await supabase
  .from('services')
  .delete()
  .eq('id', serviceId)
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Creates `dist/` folder with optimized build.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

---

## 🐛 Debugging

### Check Authentication
```javascript
// In browser console
localStorage.getItem('admin_session')
```

### Check Services Data
```javascript
// In browser console
import supabase from './services/supabaseClient'
const { data } = await supabase.from('services').select('*')
console.log(data)
```

### Debug Mode
All API calls log to console. Check DevTools Console tab for errors.

---

## 📝 File Sizes

After build optimization:
- Main bundle: ~150KB
- CSS: ~20KB
- Total: ~170KB (gzipped)

---

## 🔗 Useful Links

- [React Router Docs](https://reactrouter.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)

---

## ⚡ Performance Tips

1. **Lazy Load Pages**
   ```javascript
   const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
   ```

2. **Memoize Components**
   ```javascript
   export default memo(ServiceForm)
   ```

3. **Pagination for Large Lists**
   - Default: 10 items per page
   - Configure in `adminConfig.js`

4. **Cache API Responses**
   - Consider React Query or SWR
   - Reduces Supabase API calls

---

## 💡 Tips & Tricks

1. **Auto-reload on Changes**
   - Vite HMR is enabled by default
   - Just save file, page updates automatically

2. **Test API Calls**
   - Use Supabase Dashboard directly
   - Test queries before implementing

3. **Component Organization**
   - Keep related files together
   - Example: Component.jsx + Component.css

4. **Git Workflow**
   - Commit frequently
   - Use meaningful commit messages
   - Create feature branches

---

**Quick Access**: This file in `ADMIN_QUICK_REF.md`
