# 🛒 StoreAPI - Modern E-Commerce Application

A modern, production-ready e-commerce application built with React, TypeScript, and TanStack Router. Features a complete shopping experience with authentication, product browsing, cart management, and theme customization.

Built with **SOLID principles** for maintainability, testability, and scalability.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-Latest-orange.svg)](https://tanstack.com/router)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff.svg)](https://vitejs.dev/)

## ✨ Features

### 🔐 Authentication
- User login and registration
- Persistent authentication with localStorage
- Protected routes with automatic redirects
- Token-based authentication system

### 🛍️ Shopping Experience
- Browse products with filtering and sorting
- Search functionality with debouncing
- Filter by categories, price range, and ratings
- Detailed product views
- Responsive product cards

### 🛒 Shopping Cart
- Add/remove items
- Update quantities
- Real-time total calculations
- Toast notifications for cart actions
- Persistent cart state

### 🎨 Theming
- Light/Dark/System theme modes
- Persistent theme preferences
- Smooth theme transitions
- System theme detection

### 🏗️ Architecture
- **SOLID Principles** implementation
- Service-based architecture
- Clean separation of concerns
- Dependency injection ready
- Fully typed with TypeScript

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** 10+ (recommended package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/RedDotz20/storeapi.git
cd storeapi

# Install dependencies
pnpm install

# Start development server
pnpm start
```

The application will be available at `http://localhost:3000`

### Demo Credentials

To test the application, use these credentials:

```
Username: mor_2314
Password: 83r5^_
```

### Available Scripts

```bash
# Development
pnpm dev          # Start Vite dev server (default port)
pnpm start        # Start dev server on port 3000

# Production
pnpm build        # Build for production
pnpm serve        # Preview production build

# Testing
pnpm test         # Run tests with Vitest

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm check        # Run lint + format check
```

## 🏛️ Architecture & SOLID Principles

This project follows **SOLID principles** for clean, maintainable code:

### Service Layer Architecture

```
┌─────────────────────────────────────┐
│      React Components (UI)          │
│  Presentation & User Interaction    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Context Providers               │
│   State Management Only             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Services Layer               │
│   Business Logic & Operations       │
│  Auth │ Theme │ Cart │ Products     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Infrastructure Services            │
│  HttpClient │ StorageService        │
└─────────────────────────────────────┘
```

### Services

- **AuthService** - Authentication & user management
- **ThemeService** - Theme logic & system detection
- **CartService** - Cart calculations & operations
- **ProductsService** - Product API operations
- **StorageService** - localStorage/sessionStorage abstraction
- **HttpClient** - Centralized HTTP request handling

### Benefits

✅ **Single Responsibility** - Each service has one clear purpose
✅ **Testability** - Services can be tested in isolation
✅ **Maintainability** - Clear separation of concerns
✅ **Flexibility** - Easy to swap implementations
✅ **Type Safety** - Full TypeScript support

📚 **Learn More**: See [SOLID-PRINCIPLES.md](./SOLID-PRINCIPLES.md) for detailed documentation

## 📁 Project Structure

```
storeapi/
├── src/
│   ├── components/          # React components
│   │   ├── AuthProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── CartProvider.tsx
│   │   ├── Products.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Header.tsx
│   │   ├── navbar/
│   │   └── ui/             # shadcn/ui components
│   ├── services/           # 🆕 Service layer (SOLID)
│   │   ├── interfaces/     # Service interfaces
│   │   ├── AuthService.ts
│   │   ├── ThemeService.ts
│   │   ├── CartService.ts
│   │   ├── ProductsService.ts
│   │   ├── HttpClient.ts
│   │   ├── StorageService.ts
│   │   └── index.ts
│   ├── routes/             # TanStack Router routes
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── profile.tsx
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   └── signup.tsx
│   │   └── dashboard/
│   │       ├── index.tsx
│   │       ├── cart.tsx
│   │       └── products/
│   ├── types/              # TypeScript types
│   │   ├── auth.ts
│   │   ├── cart.types.ts
│   │   └── products.types.ts
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── styles.css          # Global styles
├── public/                 # Static assets
├── SOLID-PRINCIPLES.md     # 📚 SOLID documentation
├── SOLID-QUICK-REFERENCE.md
├── REFACTORING-SUMMARY.md
└── README.md
```

## 🛠️ Tech Stack

### Core
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.1** - Build tool & dev server
- **pnpm** - Fast, disk space efficient package manager

### Routing & State
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Context API** - Client state management

### UI & Styling
- **Tailwind CSS 4.1** - Utility-first CSS
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library

### Development
- **Vitest** - Unit testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript linting

### API
- **FakeStore API** - Demo e-commerce API

## 🚦 Routing

### Current Routes

```
/ (root)
├── /                      # Home/Landing page
├── /profile               # User profile (protected)
├── /auth
│   ├── /auth/login       # Login page
│   └── /auth/signup      # Signup page
└── /dashboard            # Dashboard (protected)
    ├── /dashboard/       # Products listing
    ├── /dashboard/cart   # Shopping cart
    └── /dashboard/products/:productId  # Product details
```

### Navigation

```tsx
import { Link } from '@tanstack/react-router';

<Link to="/dashboard">Go to Dashboard</Link>
<Link to="/dashboard/cart">View Cart</Link>
```

### Protected Routes

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Automatically redirects to /auth/login if not authenticated
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

## 💾 State Management

### Using Context Providers

```tsx
import { useAuth } from '@/components/AuthProvider';
import { useCart } from '@/components/CartProvider';
import { useTheme } from '@/components/ThemeProvider';

function MyComponent() {
  // Authentication
  const { user, login, logout, isLoading } = useAuth();

  // Shopping cart
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  // Theme
  const { theme, setTheme, actualTheme } = useTheme();
}
```

### Using Services Directly (Recommended for new code)

```typescript
import { productsService, authService, cartService } from '@/services';

// Fetch products
const products = await productsService.getProducts();

// Authenticate
const user = await authService.login({ username, password });

// Cart operations
const newCart = cartService.addItem(currentCart, item, quantity);
```

## 📊 Data Fetching with TanStack Query

```tsx
import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services';

function ProductsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getProducts(),
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading products</div>;

  return <ProductGrid products={data} />;
}
```

### Query Keys Used

- `['products']` - All products
- `['products', limit]` - Limited products
- `['product', id]` - Single product
- `['categories']` - Product categories

## 🎨 Styling & Theming

### Dark Mode

```tsx
const { theme, setTheme } = useTheme();

// Set theme
<button onClick={() => setTheme('dark')}>Dark Mode</button>
<button onClick={() => setTheme('light')}>Light Mode</button>
<button onClick={() => setTheme('system')}>System</button>
```

### Adding UI Components

This project uses **shadcn/ui** components:

```bash
pnpx shadcn@latest add button
pnpx shadcn@latest add card
pnpx shadcn@latest add dialog
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Watch mode (development)
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Example Test

```typescript
import { describe, it, expect } from 'vitest';
import { CartService } from '@/services/CartService';

describe('CartService', () => {
  it('should add item to cart', () => {
    const service = new CartService();
    const state = { items: [], totalItems: 0, totalPrice: 0 };
    const item = { id: 1, name: 'Product', price: 100 };

    const result = service.addItem(state, item, 1);

    expect(result.totalItems).toBe(1);
    expect(result.totalPrice).toBe(100);
  });
});
```

## 🔒 Authentication Flow

1. User enters credentials on `/auth/login`
2. `AuthService` validates with FakeStore API
3. Token stored in localStorage via `StorageService`
4. User redirected to dashboard
5. Protected routes check authentication status
6. Logout clears token and redirects to home

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# API Configuration
VITE_API_BASE_URL=https://fakestoreapi.com
```

### Customizing API

Edit `src/components/config.ts`:

```typescript
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com',
};
```

## 🚀 Deployment

### Netlify (Recommended)

The project includes Netlify configuration in `netlify.toml`:

1. Push to GitHub
2. Connect repository in Netlify
3. Deploy automatically on push

### Manual Build

```bash
pnpm build       # Creates dist/ folder
pnpm serve       # Preview production build
```

## 📝 Development Guidelines

### Adding New Features

1. **Create Service** (if needed):
   ```typescript
   // src/services/MyService.ts
   export class MyService implements IMyService {
     // Business logic here
   }
   ```

2. **Create Interface**:
   ```typescript
   // src/services/interfaces/IMyService.ts
   export interface IMyService {
     myMethod(): Promise<Result>;
   }
   ```

3. **Use in Component**:
   ```tsx
   import { myService } from '@/services';

   function MyComponent() {
     const result = await myService.myMethod();
   }
   ```

### Code Style

- Use TypeScript for type safety
- Follow SOLID principles
- Write services for business logic
- Keep components focused on UI
- Use interfaces for contracts

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📚 Additional Documentation

- [SOLID Principles Guide](./SOLID-PRINCIPLES.md) - Detailed architecture explanation
- [Quick Reference](./SOLID-QUICK-REFERENCE.md) - Quick reference guide
- [Refactoring Summary](./REFACTORING-SUMMARY.md) - Overview of refactoring changes

## 🔗 Resources

- [TanStack Router Docs](https://tanstack.com/router)
- [TanStack Query Docs](https://tanstack.com/query)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [FakeStore API Docs](https://fakestoreapi.com)
- [Vitest Docs](https://vitest.dev)

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**RedDotz20**

- GitHub: [@RedDotz20](https://github.com/RedDotz20)
- Repository: [storeapi](https://github.com/RedDotz20/storeapi)

---

Built with ❤️ using React, TypeScript, and SOLID principles
