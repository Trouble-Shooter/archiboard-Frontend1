# ArchiBoard Frontend - Complete Package

## 📦 What's Included

This is a COMPLETE, production-ready frontend for ArchiBoard with ALL pages and functionality.

### ✅ All Pages (9 Pages Total)

1. **Home Page** (`/`) - Masonry grid layout
2. **Login Page** (`/login`) - Authentication
3. **Register Page** (`/register`) - Sign up
4. **Upload Page** (`/upload`) - Image upload with preview
5. **Boards Page** (`/boards`) - User's board collection
6. **Board Detail** (`/board/[id]`) - Single board view
7. **Image Detail** (`/image/[id]`) - Full image page with comments
8. **Profile Page** (`/profile/[id]`) - User profile
9. **Admin Dashboard** (`/admin`) - Content moderation

### ✅ All Components (15+ Components)

**Layout Components:**
- Navbar (responsive, search, user menu)
- Footer (links, social media)

**Card Components:**
- ImageCard (hover effects, like button)
- BoardCard (preview grid)
- UserCard (for profiles)

**Modal Components:**
- SaveToBoard modal
- CreateBoard modal
- ConfirmDelete modal

**UI Components:**
- Toaster (notifications)
- Loading spinner
- Empty states
- Button variants
- Input components

### ✅ All Features

**Authentication:**
- ✅ Login/Logout
- ✅ Registration
- ✅ Protected routes
- ✅ JWT token management
- ✅ Persistent sessions

**Image Features:**
- ✅ Upload with drag & drop
- ✅ Image preview
- ✅ Like/Unlike
- ✅ Comments
- ✅ Save to boards
- ✅ Flag content
- ✅ Share functionality

**Board Features:**
- ✅ Create boards
- ✅ Public/Private boards
- ✅ Save images to boards
- ✅ Remove images from boards
- ✅ Delete boards
- ✅ Board preview grid

**Search & Discovery:**
- ✅ Search by title/description
- ✅ Filter by tags
- ✅ Infinite scroll
- ✅ Masonry grid layout

**Profile:**
- ✅ View user uploads
- ✅ View user boards
- ✅ User stats
- ✅ Bio and avatar

**Admin:**
- ✅ View flagged content
- ✅ Remove images
- ✅ Ban/unban users
- ✅ Platform statistics
- ✅ Recent activity

**UI/UX:**
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark mode ready
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Accessible (ARIA labels)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd archiboard-frontend-complete
npm install
```

### 2. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

### 4. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
archiboard-frontend-complete/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Global styles
│   │   ├── login/
│   │   │   └── page.tsx            # Login page
│   │   ├── register/
│   │   │   └── page.tsx            # Register page
│   │   ├── upload/
│   │   │   └── page.tsx            # Upload page
│   │   ├── boards/
│   │   │   └── page.tsx            # Boards list
│   │   ├── board/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Board detail
│   │   ├── image/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Image detail
│   │   ├── profile/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # User profile
│   │   └── admin/
│   │       └── page.tsx            # Admin dashboard
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── cards/
│   │   │   ├── ImageCard.tsx
│   │   │   ├── BoardCard.tsx
│   │   │   └── UserCard.tsx
│   │   ├── modals/
│   │   │   ├── SaveToBoard.tsx
│   │   │   ├── CreateBoard.tsx
│   │   │   └── ConfirmDelete.tsx
│   │   ├── ui/
│   │   │   ├── Toaster.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── Button.tsx
│   │   └── providers/
│   │       └── AuthProvider.tsx
│   │
│   ├── lib/
│   │   ├── api.ts                  # Axios instance
│   │   ├── store.ts                # Zustand state
│   │   └── utils.ts                # Helper functions
│   │
│   └── types/
│       └── index.ts                # TypeScript types
│
├── public/
│   └── (static assets)
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .env.local.example
```

## 🎨 Design System

### Colors
- **Primary**: Stone (neutral architectural tones)
- **Accent**: Stone-900 (dark elegant)
- **Background**: Stone-50 (light warm)

### Typography
- **Display**: Playfair Display (elegant, architectural)
- **Body**: Inter (clean, readable)

### Components
- Rounded corners (rounded-xl, rounded-2xl)
- Shadow system (shadow-sm, shadow-md, shadow-lg)
- Smooth transitions (duration-200, duration-300)
- Hover effects (scale, lift, color)

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

## 🔧 Key Files Explained

### `src/lib/api.ts`
- Axios instance with interceptors
- Automatic token injection
- Error handling
- Image URL helpers

### `src/lib/store.ts`
- Zustand state management
- Authentication state
- User data persistence
- Login/logout functions

### `src/lib/utils.ts`
- Date formatting
- Text truncation
- Number formatting
- Validation helpers

### `src/app/layout.tsx`
- Root layout with fonts
- AuthProvider wrapper
- Navbar and Footer
- Global styles

### `src/components/layout/Navbar.tsx`
- Responsive navigation
- Search functionality
- User menu
- Mobile menu
- Scroll effects

## 🎯 Usage Examples

### Using the Toast System
```typescript
import { toast } from '@/components/ui/Toaster';

// Success notification
toast.success('Image uploaded successfully!');

// Error notification
toast.error('Failed to upload image');

// Warning
toast.warning('Please fill all required fields');

// Info
toast.info('New features coming soon!');
```

### Using the Auth Store
```typescript
import { useAuthStore } from '@/lib/store';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return <div>Welcome, {user?.username}!</div>;
}
```

### Making API Calls
```typescript
import api from '@/lib/api';

// Get images
const response = await api.get('/images');

// Upload image
const formData = new FormData();
formData.append('image', file);
formData.append('title', 'My Design');
await api.post('/images', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Like image
await api.post(`/images/${imageId}/like`);
```

## 🔐 Protected Routes

Pages that require authentication:
- `/upload`
- `/boards`
- `/profile/[id]` (own profile edit)
- `/admin` (admin only)

The AuthProvider automatically handles redirects.

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your colors here
      }
    }
  }
}
```

### Change Fonts
Edit `src/app/layout.tsx`:
```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
});
```

## 📸 Features in Detail

### Image Card
- Hover overlay with stats
- Like button with animation
- Save to board button
- View count
- User avatar
- Tags display
- Responsive sizing

### Masonry Grid
- Pinterest-style layout
- Responsive columns (1-4)
- Smooth image loading
- Infinite scroll support

### Search
- Real-time search
- Query parameter sync
- Search by title/description/tags
- Clear search button

### Boards
- Create public/private boards
- Grid preview (up to 4 images)
- Image count badge
- Empty state
- Delete confirmation

### Comments
- Real-time comment list
- Add new comments
- Delete own comments
- User avatars
- Timestamp display

### Admin Dashboard
- Flagged content review
- User management
- Statistics cards
- Recent activity feed
- Ban/unban users
- Remove content

## 🐛 Troubleshooting

### Images not loading
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running
- Check `next.config.js` remotePatterns

### Authentication not persisting
- Clear localStorage
- Check token expiration
- Verify API responses

### Styles not applying
- Run `npm install`
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Environment Variables
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

## 📝 License

MIT License - Free to use for personal and commercial projects

---

## 🎉 You're All Set!

This frontend is 100% complete and production-ready. Just connect it to your backend and you're good to go!

For questions or issues, check the code comments or create an issue.

Happy building! 🏗️
