# 🚀 AI Portfolio Website

A modern, dynamic portfolio website built with Next.js, featuring AI integration, real-time database backend with Neon PostgreSQL, and responsive design with multiple themes.

## ✨ Features

### 🎨 **Design & Themes**
- **Dual Theme System**: Professional & Bauhaus design themes
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Dark/Light Modes**: Theme-specific color schemes

### 🗄️ **Database Backend**
- **Neon PostgreSQL**: Cloud-native database with real-time sync
- **Full CRUD Operations**: Create, read, update, delete all content
- **Data Persistence**: All portfolio data stored securely in the cloud
- **Automatic Backups**: Neon handles database backups and maintenance

### 📱 **Portfolio Sections**
- **Hero Section**: Dynamic introduction with call-to-action
- **About Me**: Professional summary and personal information
- **Skills**: Categorized technical skills with proficiency levels
- **Work Experience**: Professional history with achievements
- **Projects**: Portfolio showcase with live demos and GitHub links
- **Education**: Academic background and achievements
- **Certifications**: Professional certifications and credentials
- **Services**: Services offered with detailed descriptions
- **Testimonials**: Client recommendations and reviews
- **Contact**: Contact information and social links

### 🔐 **Admin Panel**
- **Secure Authentication**: Password-protected admin area
- **Content Management**: Full control over all portfolio content
- **Section Visibility**: Show/hide specific sections
- **Real-time Updates**: Changes reflected immediately on the site
- **Theme Switching**: Toggle between Professional and Bauhaus themes

### 📄 **PDF Resume**
- **Downloadable Resume**: Professional PDF export
- **Selectable Text**: PDF with selectable text and clickable links
- **Multiple Formats**: Print-friendly and downloadable versions
- **Theme Consistency**: PDF matches the selected theme

### 🌐 **API & Integration**
- **REST API**: Full API endpoints for external integrations
- **Real-time Data**: Live data synchronization
- **Type Safety**: Full TypeScript support
- **Error Handling**: Graceful fallbacks and error recovery

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Modern icon library
- **React Hot Toast**: Elegant notifications

### **Backend**
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **@neondatabase/serverless**: Neon database driver
- **Next.js API Routes**: Server-side API endpoints
- **Zustand**: Lightweight state management

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes
- **Vercel**: Deployment and hosting

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- Neon database account (free tier available)
- Vercel account for deployment

### **1. Clone the Repository**
```bash
git clone https://github.com/Imcoder2018/portfolio-website.git
cd portfolio-website
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env.local` file:
```env
DATABASE_URL=postgresql://neondb_owner:your_password@your-neon-host.neon.tech/neondb?sslmode=require
```

### **4. Set Up Database**
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project or use existing one
3. Open SQL Editor
4. Run the schema: `database/schema.sql`
5. Populate with data: `database/seed.sql`

### **5. Run Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── portfolio/     # Portfolio data endpoints
│   ├── admin/             # Admin panel
│   ├── resume/            # PDF resume page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── bauhaus/          # Bauhaus theme components
│   ├── professional/     # Professional theme components
│   └── DataInitializer.tsx # Database data loader
├── lib/                  # Utility libraries
│   ├── db.ts             # Database operations
│   ├── store.ts          # State management
│   ├── store-new.ts      # Database-backed state
│   └── utils.ts          # Helper functions
├── database/             # Database files
│   ├── schema.sql        # Database schema
│   └── seed.sql          # Initial data
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎯 Usage Guide

### **Admin Panel**
1. Navigate to `/admin`
2. Enter password: `admin123` (default)
3. Manage all portfolio content
4. Toggle section visibility
5. Switch themes

### **Adding Content**
- **Profile**: Update personal information
- **Skills**: Add technical skills with categories
- **Projects**: Showcase your work with links
- **Experience**: Add work history
- **Education**: Academic background
- **Certifications**: Professional credentials

### **Theme Customization**
- **Professional Theme**: Clean, corporate design
- **Bauhaus Theme**: Bold, artistic design
- **CSS Variables**: Easy color customization
- **Responsive**: Works on all screen sizes

### **PDF Resume**
1. Navigate to `/resume`
2. Select theme (Professional/Bauhaus)
3. Click "Download PDF"
4. Get printable resume with clickable links

## 🔧 Configuration

### **Environment Variables**
```env
# Database
DATABASE_URL=postgresql://...

# Optional (for development)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Database Schema**
The application uses the following tables:
- `profile` - User information
- `social_links` - Social media links
- `skills` - Technical skills
- `work_experience` - Job history
- `projects` - Portfolio projects
- `education` - Academic background
- `certifications` - Professional certifications
- `testimonials` - Client recommendations
- `services` - Services offered
- `section_settings` - UI visibility controls
- `admin_settings` - Admin authentication

### **Theme Customization**
Edit `app/globals.css` to customize:
```css
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  /* Add more variables */
}
```

## 🚀 Deployment

### **Vercel Deployment**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### **Manual Deployment**
```bash
npm run build
npm start
```

### **Database Setup in Production**
1. Add `DATABASE_URL` to Vercel environment variables
2. Run schema and seed SQL in Neon Console
3. Redeploy to activate database

## 📊 API Endpoints

### **GET /api/portfolio**
Fetch all portfolio data
```json
{
  "profile": {...},
  "socialLinks": [...],
  "skills": [...],
  "projects": [...]
}
```

### **POST /api/portfolio/update**
Update portfolio data (admin required)
```json
{
  "action": "updateProfile",
  "data": {...},
  "adminPassword": "admin123"
}
```

## 🎨 Customization

### **Adding New Themes**
1. Create theme CSS in `app/globals.css`
2. Add theme option to store
3. Update theme selector components

### **Adding New Sections**
1. Create database table in `schema.sql`
2. Add API endpoints in `lib/db.ts`
3. Create React components
4. Add to portfolio layouts

### **Custom Styling**
- Edit Tailwind config in `tailwind.config.js`
- Modify CSS variables in `app/globals.css`
- Update component styles

## 🔒 Security

- **Admin Authentication**: Password-protected admin area
- **Environment Variables**: Secure database credentials
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: React's built-in protections
- **HTTPS**: Secure connections in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Portfolio**: [https://waqar-portfolio-sandy.vercel.app](https://waqar-portfolio-sandy.vercel.app)
- **GitHub**: [https://github.com/Imcoder2018/portfolio-website](https://github.com/Imcoder2018/portfolio-website)
- **Email**: junglescouthome@gmail.com

## 🌟 Features Highlights

- ✅ **Live Demo**: Deployed and working
- ✅ **Database Integration**: Full Neon PostgreSQL backend
- ✅ **Admin Panel**: Complete content management
- ✅ **PDF Export**: Downloadable resumes
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **TypeScript**: Type-safe codebase
- ✅ **Modern Stack**: Next.js 14, React 18
- ✅ **SEO Optimized**: Meta tags and structured data
- ✅ **Performance**: Optimized loading and caching
- ✅ **Accessibility**: WCAG compliant design

---

**Built with ❤️ by Muhammad Waqar Sikandar**
