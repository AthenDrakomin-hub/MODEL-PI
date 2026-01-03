# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## Project Overview

Tesla-PiStore is a full-stack e-commerce application for reserving Tesla Model π phones. It features a React frontend with Vercel Serverless Functions backend, PostgreSQL database, and shared TypeScript schemas. The application features a booking/pre-order system and extensive documentation sections. Designed for seamless deployment to Vercel platform.

## Architecture

- **Frontend**: React 19 application using Vite, TypeScript, Tailwind CSS, and shadcn/ui components
- **Backend**: Vercel Serverless Functions with PostgreSQL database using Drizzle ORM
- **Shared**: Common TypeScript schemas and API route definitions used by both client and server
- **Database**: PostgreSQL with Drizzle ORM and Zod validation schemas
- **State Management**: React hooks with localStorage persistence
- **Component Structure**: Lazy-loaded components for performance optimization
- **Internationalization**: Multi-language support with translation system

## Project Structure

- `client/` - React frontend application with components, hooks, and pages
- `api/` - Vercel Serverless Functions with API routes and database access
- `shared/` - Shared TypeScript schemas and API route definitions
- `src/` - Additional frontend source files and services
- `components/` - Reusable UI components

## Key Dependencies

- React 19 with Vite
- Vercel Serverless Functions for the backend
- PostgreSQL with Drizzle ORM
- Zod for schema validation
- Tailwind CSS for styling
- shadcn/ui for components
- @tanstack/react-query for data fetching
- Framer Motion for animations
- concurrently for running multiple processes

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the application
npm run build

# Run TypeScript type checking
npm run check

# Push database schema
npm run db:push

# Preview built application
npm run preview
```

## API Routes

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `GET /api/cart/:sessionId` - Get cart items for session
- `POST /api/cart/:sessionId` - Sync cart items for session

## Database Schema

- `products` table: id, name, color, price, deposit, stock, image, isLimited, logistics
- `cart_items` table: id, sessionId, productId, quantity

## Client-Side Features

- Product listing and selection
- Shopping cart with persistent session storage
- Cart synchronization with backend
- Payment processing UI
- Responsive design with Tesla-inspired theme
- 3D UI interactions and dynamic components

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL database connection string
- `VITE_USDT_ADDR`: USDT wallet address for payments
- `VITE_PAYPAL_URL`: Optional PayPal payment URL
- `PORT`: Server port (default 5000)

Create a `.env` file with:
```
DATABASE_URL=your_postgresql_connection_string
VITE_USDT_ADDR=your_usdt_address
VITE_PAYPAL_URL=optional_paypal_url
PORT=5000
```

## Important Notes

- Booking data is stored in PostgreSQL database with persistent storage
- Components use lazy loading for performance optimization
- Theme switching between 'midnight' and 'solar' modes
- Countdown timer and booking statistics are dynamically calculated
- Backend API provides full CRUD operations for products and cart management
- Database schema is managed with Drizzle ORM and Zod validation
- The application uses a monorepo structure with shared types between frontend and backend
- The application is designed for Vercel deployment with Serverless Functions handling backend operations

## Build Process

- Client builds to the `dist/` directory
- The `overrides` section in package.json handles React 19 compatibility with UI libraries
- Vite handles module aliasing (@ for src, @shared for shared directory)
- Vercel Serverless Functions are automatically built and deployed by the Vercel platform

## Translation System

- Multi-language support with 15 declared languages (zh, en, ja, es, fr, de, ko, it, pt, nl, tr, pl, sv, ru, ar)
- Translation files located in `src/translations.ts` with base configuration
- Current implementation only includes Chinese and English translations
- RTL language support needed for Arabic and other right-to-left languages