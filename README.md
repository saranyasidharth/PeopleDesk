# 🚀 PeopleDesk- User Management Dashboard

A production-ready **User Management Dashboard** built with **React**, **TypeScript**, **Material-UI**, and **SCSS**. This application provides full CRUD operations for managing user records with an extensible, configuration-driven architecture.

## 🌟 Live Demo

**GitHub Pages:** [https://saranyasidharth.github.io/PeopleDesk/]

**GitHub Repository:** [https://github.com/saranyasidharth/PeopleDesk](https://github.com/saranyasidharth/PeopleDesk)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Architecture](#-architecture)
- [How to Add New Fields](#-how-to-add-new-fields)
- [Deployment](#-deployment)
- [Assumptions](#-assumptions)

---

## ✨ Features

### Core Features
- ✅ **Create** - Add new users with form validation
- ✅ **Read** - View all users in a responsive table
- ✅ **Update** - Edit existing user information
- ✅ **Delete** - Remove users with confirmation dialog
- ✅ **Form Validation** - Real-time validation using Yup schema
- ✅ **Loading States** - MUI Skeleton loaders for better UX
- ✅ **Error Handling** - Comprehensive error messages and toast notifications
- ✅ **Smart Data Persistence** - JSON-server API with localStorage fallback
- ✅ **Production Ready** - Works on GitHub Pages with automatic fallback

### Bonus Features
- 🔍 **Search** - Filter users by name, email, or phone number
- 📄 **Pagination** - Navigate through users with page controls
- 📱 **Responsive Design** - Works seamlessly on all device sizes
- 🎨 **Modern UI** - Clean, professional interface using Material-UI
- ⚡ **Extensible Architecture** - Add new fields with minimal code changes

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Material-UI (MUI)** | Component library |
| **SCSS Modules** | Styling |
| **React Hook Form** | Form management |
| **Yup** | Schema validation |
| **Axios** | HTTP client for API calls |
| **JSON Server** | Mock REST API (development) |
| **LocalStorage API** | Data persistence (production fallback) |
| **GitHub Pages** | Deployment |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.scss
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.module.scss
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.module.scss
│   │   ├── ConfirmDialog/
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── ConfirmDialog.module.scss
│   │   └── Toast/
│   │       └── Toast.tsx
│   ├── user/
│   │   ├── UserForm.tsx
│   │   ├── UserForm.module.scss
│   │   ├── UserList.tsx
│   │   ├── UserList.module.scss
│   │   ├── UserTable.tsx
│   │   └── UserTable.module.scss
│   └── Dashboard/
│       ├── Dashboard.tsx
│       └── Dashboard.module.scss
├── config/
│   ├── userFormSchema.ts          # ⭐ Form field configuration
│   └── validationSchema.ts        # Yup validation schema
├── context/
│   ├── UserContext.tsx            # User state management
│   └── ThemeContext.tsx           # Theme state management
├── hooks/
│   ├── useUsers.ts                # Custom hook for user CRUD
│   └── useLocalStorage.ts         # LocalStorage abstraction
├── types/
│   ├── user.types.ts              # User type definitions
│   └── form.types.ts              # Form configuration types
├── styles/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── base/
│   │   └── _reset.scss
│   └── main.scss
├── App.tsx
└── main.tsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saranyasidharth/PeopleDesk.git
   cd PeopleDesk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start JSON-server (optional - for API mode)**
   ```bash
   npm run mock
   ```
   This starts the API server on `http://localhost:5000`

4. **Start development server** (in a new terminal)
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

> **Note:** If you skip step 3, the app will automatically use localStorage fallback mode.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run mock` | Start JSON-server API (port 5000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

---

## 🏗 Architecture

### Configuration-Driven Design

The application uses a **schema-based approach** for maximum extensibility. All form fields are defined in a single configuration file.

#### Key Architecture Principles

1. **Single Source of Truth** - Form fields defined in `userFormSchema.ts`
2. **Dynamic Rendering** - Components render based on configuration
3. **Type Safety** - Full TypeScript support throughout
4. **Separation of Concerns** - Clear separation between UI, logic, and data
5. **Reusable Components** - Generic, composable UI components

### State Management

- **Context API** - Global state for users and theme
- **Custom Hooks** - Encapsulated business logic
- **LocalStorage** - Persistent data storage

### Form Validation

- **Schema-based** - Yup validation schemas
- **Real-time** - Validation on blur and submit
- **Type-safe** - TypeScript integration

---

## 🔧 How to Add New Fields

Adding a new field requires changes in **only 2 files**:

### Step 1: Update Type Definition

**File:** `src/types/user.types.ts`

```typescript
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;  // ✅ Add new field
}
```

### Step 2: Update Form Schema

**File:** `src/config/userFormSchema.ts`

```typescript
export const userFormSchema: FormFieldConfig[] = [
  // ... existing fields
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    required: true,
    placeholder: 'Select date of birth',
    validation: {
      required: true,
      message: 'Date of birth is required'
    }
  }
];
```

### Step 3: Update Validation Schema

**File:** `src/config/validationSchema.ts`

```typescript
export const userValidationSchema: yup.ObjectSchema<UserFormData> = yup.object().shape({
  // ... existing validations
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
});
```

**That's it!** The form will automatically:
- ✅ Render the new field
- ✅ Apply validation rules
- ✅ Display in the table
- ✅ Save to localStorage

---

## 🔌 API Integration

### Smart Fallback System

The app uses a **dual-mode architecture** that works both locally and in production:

#### Development Mode (with JSON-server)
```bash
npm run mock  # Start API server
npm run dev   # Start app
```
- Uses real REST API at `localhost:5000`
- Data stored in `db.json`
- Full CRUD operations via HTTP

#### Production Mode (GitHub Pages)
```bash
npm run deploy
```
- Automatically detects API unavailability
- Falls back to localStorage
- Same functionality, different storage

### How It Works

```
App loads → Check API availability (2s timeout)
  ↓
  ├─ API Available → Use JSON-server
  └─ API Unavailable → Use localStorage fallback
```

**Console Messages:**
- ✅ `API server available - using JSON-server` (Dev)
- ⚠️ `API server unavailable - using localStorage fallback` (Production)

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Fetch all users |
| POST | `/users` | Create user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Documentation

- 📖 **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Complete API guide
- 📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
- 📖 **[QUICK_START.md](./QUICK_START.md)** - Quick reference

---

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Update package.json**
   ```json
   "homepage": "https://saranyasidharth.github.io/PeopleDesk/"
   ```

2. **Update vite.config.ts** (already configured)
   ```typescript
   base: '/PeopleDesk/'
   ```

3. **Build and deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Deploy dist/ to your hosting provider
```

---

## 📝 Assumptions

1. **Browser Support** - Modern browsers with ES6+ support
2. **Data Storage** - LocalStorage is available and enabled
3. **Phone Format** - 10-digit numeric phone numbers
4. **Email Validation** - Standard email format (RFC 5322)
5. **No Backend** - All data stored client-side in localStorage
6. **Unique IDs** - Generated using timestamp + random string
7. **Single User** - No multi-user authentication required

---

## 🎯 Key Highlights

### Extensibility
- Configuration-driven form rendering
- Easy to add/remove fields
- Minimal code changes required

### Code Quality
- Strict TypeScript configuration
- No `any` types used
- Proper error handling
- Reusable components

### User Experience
- Loading states with skeletons
- Toast notifications
- Confirmation dialogs
- Responsive design
- Dark/light theme

### Best Practices
- Component composition
- Custom hooks
- Context for global state
- SCSS modules for styling
- Semantic HTML

---

## 📄 License

MIT License - feel free to use this project for learning or production.

---

## 👨‍💻 Author

Built with ❤️ as a demonstration of production-ready React architecture.

---

## 🙏 Acknowledgments

- Material-UI for the component library
- React Hook Form for form management
- Yup for validation schemas
