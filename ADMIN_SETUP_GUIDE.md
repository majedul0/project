/**
 * Admin Panel Setup Guide
 * =======================
 * This document explains the modular admin panel architecture and how to use it.
 * 
 * PROJECT STRUCTURE
 * =================
 * 
 * src/
 * ├── context/
 * │   └── AuthContext.jsx           # Authentication state management
 * │
 * ├── pages/
 * │   ├── AdminLogin.jsx            # Login page with form
 * │   ├── AdminLogin.css            # Login page styles
 * │   ├── AdminDashboard.jsx        # Dashboard overview page
 * │   ├── AdminDashboard.css        # Dashboard styles
 * │   ├── ManageServices.jsx        # Services CRUD management
 * │   └── ManageServices.css        # Services page styles
 * │
 * ├── components/
 * │   ├── AdminLayout/
 * │   │   ├── AdminLayout.jsx       # Layout wrapper for admin pages
 * │   │   └── AdminLayout.css       # Layout styles
 * │   └── ProtectedRoute/
 * │       └── ProtectedRoute.jsx    # Route protection component
 * │
 * ├── services/
 * │   ├── supabaseClient.js         # Supabase client initialization
 * │   └── servicesApi.js            # Services API CRUD operations
 * │
 * └── App.jsx                       # Main app with routing
 * 
 * 
 * AUTHENTICATION FLOW
 * ===================
 * 
 * 1. User navigates to /admin
 * 2. AdminLogin page displays login form
 * 3. Credentials verified against hardcoded values:
 *    - Username: admin1971
 *    - Password: admin1971
 * 4. AuthContext stores session in localStorage
 * 5. ProtectedRoute checks auth status for protected pages
 * 6. User redirected to /admin/dashboard on success
 * 
 * Login Credentials:
 * ==================
 * Username: admin1971
 * Password: admin1971
 * 
 * These are stored in: src/context/AuthContext.jsx
 * 
 * 
 * ROUTES
 * ======
 * 
 * Public:
 *   GET  /                    Homepage
 * 
 * Admin (Protected):
 *   GET  /admin               Login page
 *   GET  /admin/dashboard     Dashboard overview
 *   GET  /admin/services      Services list & management
 *   GET  /admin/services/new  Create new service form
 *   GET  /admin/services/:id  Edit service form
 * 
 * 
 * API OPERATIONS
 * ==============
 * 
 * All API operations are in src/services/servicesApi.js
 * 
 * CREATE SERVICE:
 * ---------------
 * const newService = await createService({
 *   title: "Web Development",
 *   description: "Custom web solutions",
 *   category: "Web Development",
 *   icon: "🌐",
 *   features: ["Responsive", "Fast"],
 *   image_url: "https://example.com/image.jpg",
 *   price: 999.99
 * })
 * 
 * READ SERVICES:
 * ---------------
 * const services = await fetchAllServices()
 * const service = await fetchServiceById(id)
 * 
 * UPDATE SERVICE:
 * ---------------
 * const updated = await updateService(id, {
 *   title: "New Title",
 *   description: "Updated description"
 * })
 * 
 * DELETE SERVICE:
 * ---------------
 * await deleteService(id)
 * 
 * SEARCH SERVICES:
 * ---------------
 * const results = await searchServices("web")
 * 
 * 
 * DATABASE SCHEMA (Supabase)
 * ==========================
 * 
 * Table: services
 * 
 * Columns:
 * - id (UUID, Primary Key)
 * - title (VARCHAR, NOT NULL)
 * - description (TEXT, NOT NULL)
 * - category (VARCHAR, NOT NULL)
 * - icon (VARCHAR, DEFAULT '🔧')
 * - features (JSONB, DEFAULT '[]')
 * - image_url (VARCHAR)
 * - price (NUMERIC)
 * - created_at (TIMESTAMP, DEFAULT now())
 * - updated_at (TIMESTAMP, DEFAULT now())
 * 
 * Example SQL to create table:
 * 
 * CREATE TABLE services (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   title VARCHAR(255) NOT NULL,
 *   description TEXT NOT NULL,
 *   category VARCHAR(100) NOT NULL,
 *   icon VARCHAR(50) DEFAULT '🔧',
 *   features JSONB DEFAULT '[]',
 *   image_url VARCHAR(500),
 *   price NUMERIC(10,2),
 *   created_at TIMESTAMP DEFAULT now(),
 *   updated_at TIMESTAMP DEFAULT now()
 * );
 * 
 * CREATE INDEX idx_services_category ON services(category);
 * CREATE INDEX idx_services_created_at ON services(created_at DESC);
 * 
 * 
 * ENVIRONMENT VARIABLES
 * ====================
 * 
 * .env file should contain:
 * 
 * VITE_SUPABASE_URL=your_supabase_url
 * VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
 * 
 * 
 * CUSTOMIZING LOGIN CREDENTIALS
 * ==============================
 * 
 * To change admin credentials, edit src/context/AuthContext.jsx:
 * 
 * Line ~85:
 * const ADMIN_USERNAME = 'your_new_username'
 * const ADMIN_PASSWORD = 'your_new_password'
 * 
 * 
 * MODULAR DESIGN BENEFITS
 * ======================
 * 
 * ✓ Separation of Concerns
 *   - Components: UI logic
 *   - Services: API calls
 *   - Context: State management
 *   - Pages: Route-level components
 * 
 * ✓ Reusability
 *   - API functions can be used anywhere
 *   - Components can be reused
 *   - AuthContext available globally
 * 
 * ✓ Maintainability
 *   - Changes isolated to specific modules
 *   - Clear file structure
 *   - Comprehensive comments
 * 
 * ✓ Scalability
 *   - Easy to add new pages
 *   - Easy to add new API endpoints
 *   - Easy to extend authentication
 * 
 * 
 * EXTENDING THE ADMIN PANEL
 * ========================
 * 
 * Adding a New Admin Page:
 * ------------------------
 * 1. Create page file: src/pages/NewPage.jsx
 * 2. Create styles: src/pages/NewPage.css
 * 3. Add route in App.jsx
 * 4. Add menu item in AdminLayout.jsx
 * 5. Wrap with ProtectedRoute if needed
 * 
 * Example:
 * 
 * // App.jsx
 * <Route
 *   path="/admin/new-page"
 *   element={
 *     <ProtectedRoute>
 *       <NewPage />
 *     </ProtectedRoute>
 *   }
 * />
 * 
 * Adding New API Operations:
 * --------------------------
 * 1. Add function in src/services/servicesApi.js
 * 2. Document function with JSDoc comments
 * 3. Handle errors gracefully
 * 4. Use try-catch blocks
 * 
 * Example:
 * 
 * export const getServicesByCategory = async (category) => {
 *   try {
 *     const { data, error } = await supabase
 *       .from('services')
 *       .select('*')
 *       .eq('category', category)
 * 
 *     if (error) throw error
 *     return data || []
 *   } catch (error) {
 *     console.error('Error:', error.message)
 *     throw error
 *   }
 * }
 * 
 * 
 * TROUBLESHOOTING
 * ==============
 * 
 * Issue: "Missing Supabase environment variables"
 * Solution: Check .env file has correct VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
 * 
 * Issue: Login always fails
 * Solution: Check credentials in AuthContext.jsx match expected values
 * 
 * Issue: Services not loading
 * Solution: 
 *   1. Check network tab for API errors
 *   2. Verify Supabase table exists
 *   3. Check browser console for error messages
 * 
 * Issue: Session not persisting on page refresh
 * Solution: Check localStorage for admin_session key - may be blocked by browser settings
 * 
 * 
 * SECURITY NOTES
 * ==============
 * 
 * ⚠️  Hardcoded Credentials (Development Only)
 *   The login credentials are hardcoded for demo purposes.
 *   For production, implement proper authentication with:
 *   - Database-stored hashed passwords
 *   - JWT tokens
 *   - OAuth/SSO integration
 * 
 * ⚠️  Session Storage
 *   Sessions are stored in localStorage.
 *   For production, use httpOnly cookies.
 * 
 * ⚠️  API Security
 *   Implement Row Level Security (RLS) in Supabase.
 *   Restrict API access to authenticated users only.
 * 
 * 
 * PERFORMANCE TIPS
 * ===============
 * 
 * 1. Cache service data using React Query or SWR
 * 2. Implement pagination for large service lists
 * 3. Lazy load admin pages
 * 4. Use React.memo for expensive components
 * 5. Optimize images before uploading
 * 
 * 
 * SUPPORT
 * =======
 * 
 * All components have detailed JSDoc comments.
 * Refer to specific files for in-depth documentation.
 * 
 * Key files:
 * - src/context/AuthContext.jsx - Authentication logic
 * - src/services/servicesApi.js - API operations
 * - src/pages/ManageServices.jsx - CRUD example
 */

export default {}
