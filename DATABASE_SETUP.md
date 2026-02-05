# Portfolio Database Setup Instructions

## 1. Set up Neon Database

Your Neon database is already created with these connection details:
- **Database URL**: `postgresql://neondb_owner:npg_JMcfKiao0UZ7@ep-silent-night-ai15fh88-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require`

## 2. Create Database Tables

Run the SQL schema in your Neon console:

1. Go to [Neon Console](https://console.neon.tech/)
2. Select your project `neon-violet-queen`
3. Open the SQL Editor
4. Copy and paste the contents of `database/schema.sql`
5. Execute the SQL to create all tables

## 3. Environment Variables

Add these to your Vercel project or local `.env` file:

```env
DATABASE_URL=postgresql://neondb_owner:npg_JMcfKiao0UZ7@ep-silent-night-ai15fh88-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 4. Deploy to Vercel

The application is now configured to use Neon database instead of localStorage:

### What's Changed:
- ✅ **Database Integration**: Full PostgreSQL database with Neon
- ✅ **API Routes**: RESTful API endpoints for all CRUD operations
- ✅ **State Management**: Updated Zustand store to work with database
- ✅ **Loading States**: Proper loading indicators
- ✅ **Error Handling**: Fallback to default data if database fails
- ✅ **Type Safety**: Full TypeScript support

### Features:
- **Persistent Storage**: All portfolio data stored in Neon database
- **Real-time Updates**: Changes immediately saved to database
- **Admin Authentication**: Secure admin area with password protection
- **API Endpoints**: Full REST API for external integrations
- **Automatic Migration**: Seamless transition from localStorage

### API Endpoints:
- `GET /api/portfolio` - Fetch all portfolio data
- `POST /api/portfolio/update` - Update portfolio data (admin required)

### Database Tables:
- `profile` - User profile information
- `social_links` - Social media links
- `skills` - Technical skills
- `work_experience` - Work experience
- `projects` - Portfolio projects
- `education` - Education background
- `certifications` - Professional certifications
- `testimonials` - Client testimonials
- `services` - Services offered
- `section_settings` - UI section visibility
- `admin_settings` - Admin authentication

## 5. Test the Application

1. Run locally: `npm run dev`
2. Visit `http://localhost:3001`
3. Data will automatically load from Neon database
4. Admin features require password authentication

## 6. Production Deployment

The application is ready for Vercel deployment with:
- ✅ Database connection configured
- ✅ API routes implemented
- ✅ Environment variables set
- ✅ Build process optimized

Your portfolio now has a robust, scalable database backend with Neon!
