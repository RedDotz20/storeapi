# Migration to Platzi Fake Store API

## Overview
Successfully migrated from FakeStore API to Platzi Fake Store API (https://api.escuelajs.co/api/v1)

## Changes Made

### 1. API Configuration
- **File**: `src/components/config.ts`
- Added `apiBaseUrl: "https://api.escuelajs.co/api/v1"` to centralize API configuration

### 2. Type Definitions
- **Files**:
  - `src/types/product.ts` - Fixed typo: `creaionAt` → `creationAt`
  - `src/types/products.types.ts` - Updated to match Platzi API structure
  - `src/types/auth.ts` - Changed from `FakeStoreLoginResponse` to `PlatziLoginResponse`

- **Product Type Structure**:
  ```typescript
  {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: CategoryType; // Full category object, not just string
    images: string[]; // Array of images
    creationAt: string;
    updatedAt: string;
  }
  ```

- **Auth Response Structure**:
  ```typescript
  {
    access_token: string;
    refresh_token: string;
  }
  ```

### 3. Products API
- **File**: `src/lib/productsApi.ts`
- Removed old FakeStore endpoints
- Added:
  - `getProducts()` - Fetch all products
  - `getProductById(id)` - Fetch single product
  - `getProductsByCategory(categoryId)` - Filter by category

### 4. Authentication API
- **File**: `src/lib/api.ts`
- Updated authentication to use Platzi API endpoints:
  - Login: `POST /auth/login` (uses email instead of username)
  - Profile: `GET /auth/profile` (requires Bearer token)
- Changed from `getUserById()` to `getUserProfile(token)`
- Updated helper function: `mapPlatziUserToUser()`

### 5. Auth Provider
- **File**: `src/components/AuthProvider.tsx`
- Updated login flow to:
  1. Get access token from login
  2. Fetch user profile with token
  3. Map Platzi user to local User type

### 6. Components
- **File**: `src/components/Products.tsx`
- Changed from `newProducts()` to `getProducts()`

- **File**: `src/routes/dashboard/products/$productId.tsx`
- Updated loader to use `getProductById()` instead of direct fetch
- Cleaned up unused imports

## API Endpoints Reference

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products/?categoryId={id}` - Filter by category

### Authentication
- `POST /auth/login` - Login with email/password
  ```json
  {
    "email": "john@mail.com",
    "password": "changeme"
  }
  ```
- `GET /auth/profile` - Get user profile (requires Bearer token)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get single category

## Test Credentials

You can use these test credentials provided by Platzi API:

**Email**: `john@mail.com`
**Password**: `changeme`

Or:

**Email**: `maria@mail.com`
**Password**: `12345`

## Breaking Changes

1. **Login now requires email instead of username**
   - Update your login form to use email field
   - Or modify the API call to accept username and convert to email

2. **Product structure changed**
   - `category` is now an object instead of a string
   - `image` changed to `images` (array)
   - Added `slug`, `creationAt`, `updatedAt` fields

3. **No rating system**
   - Platzi API doesn't have product ratings
   - Removed all rating-related code

## Next Steps

1. Test the login functionality with the provided credentials
2. Verify product listing and detail pages work correctly
3. Consider implementing category filtering
4. Update the signup flow (Platzi API supports user creation)

## Additional Features Available

The Platzi API also supports:
- Creating/updating/deleting products (with auth)
- Creating/updating/deleting categories (with auth)
- User registration: `POST /users`
- File uploads: `POST /files/upload`

## Notes

- The Platzi API is a public API for testing and doesn't require API keys
- Data is reset periodically, so any changes you make won't persist forever
- Rate limiting may apply for excessive requests
