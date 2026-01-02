# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## Project Overview

This is a Tesla Model Pi concept web application that showcases Tesla's hypothetical mobile device. The application features a booking/pre-order system and extensive documentation sections.

## Architecture

- **Frontend**: React 19 with TypeScript, using Vite as the build tool
- **Styling**: Tailwind CSS with custom dark/light theme (midnight/solar)
- **Backend**: Cloudflare Workers with KV for data storage
- **State Management**: React hooks with localStorage persistence
- **Component Structure**: Lazy-loaded components for performance optimization
- **Internationalization**: Multi-language support with translation system

## Key Components

- Main application in `App.tsx` with header, hero, booking, and documentation sections
- Components in `/components` directory with lazy-loaded detail views
- Legal documentation component in `/components/LegalDocumentation.tsx` for static compliance display
- Dynamic legal documentation in `/components/DynamicLegalDocumentation.tsx` for API-driven content
- Compliance page component in `/components/CompliancePage.tsx` for legal information
- Cloudflare Workers in `/src/index.ts` for backend functionality
- KV API implementation in `/src/kv-api.ts` for data operations
- Sales calculator in `/src/sales-calculator.ts` for sales planning
- Inventory management system in `/src/inventory/inventory-manager.ts` for stock control
- Payment processing system in `/src/payment/payment-processor.ts` for payment handling
- Shopping cart system in `/src/cart/shopping-cart.ts` for order management
- Legal service in `/src/legal/legal-service.ts` for document management
- Legal worker integration in `/src/legal/worker-integration.ts` for legal API
- Main service integration in `/src/main-service.ts` for complete functionality
- File storage service in `/src/file-storage/file-service.ts` for asset management
- Worker integration in `/src/file-storage/worker-integration.ts` for R2 implementation
- Project documentation in `/PROJECT_DOCUMENTATION.md` for project overview
- Quick start guide in `/QUICK_START.md` for onboarding new developers
- Translation check report in `/TRANSLATION_CHECK.md` for localization status
- Translation enhancement guide in `/TRANSLATION_ENHANCEMENT.md` for i18n improvements
- Documentation index in `/DOCUMENTATION_INDEX.md` for navigation
- Legal documentation in `/LEGAL_DOCUMENTATION.md` for compliance and terms
- Legal integration guide in `/LEGAL_INTEGRATION.md` for deployment instructions
- File storage solution in `/FILE_STORAGE_SOLUTION.md` for asset management strategy
- R2 integration guide in `/R2_INTEGRATION.md` for object storage implementation
- Payment system specifications in `/PAYMENT_SPEC.md` for technical implementation
- Inventory allocation table in `/INVENTORY_ALLOCATION.md` for stock management
- Inventory management system in `/INVENTORY_MANAGEMENT.md` for logistics
- Implementation guide in `/IMPLEMENTATION_GUIDE.md` for deployment instructions
- API documentation in `/API_DOCUMENTATION.md` for integration reference
- Data persistence using localStorage with virtual database key and Cloudflare KV

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Cloudflare Workers commands
npx wrangler dev                    # Run Cloudflare Worker in development
npx wrangler deploy                 # Deploy Cloudflare Worker
npx wrangler kv namespace create    # Create new KV namespace
npx wrangler kv key put <key> <value> --binding=MODEL_PI  # Put KV value (consumes write quota)
npx wrangler kv key get <key> --binding=MODEL_PI          # Get KV value (consumes read quota)
```

## Environment Variables

Required environment variables:
- `VITE_USDT_ADDR`: USDT wallet address for payments
- `VITE_PAYPAL_URL`: Optional PayPal payment URL

Create a `.env` file with:
```
VITE_USDT_ADDR=your_usdt_address
VITE_PAYPAL_URL=optional_paypal_url
```

## Cloudflare Free Tier Notes

- **KV Operations**: 100,000 reads and 10,000 writes/deletes per month
- **Optimization**: Use client-side caching to reduce unnecessary KV requests
- **Data expiration**: Set appropriate TTL values to avoid storing unnecessary data
- **Batch operations**: Combine multiple small data items into single KV entries

## Important Notes

- Booking data is stored in localStorage (not persistent across devices/browsers)
- Components use lazy loading for performance optimization
- Theme switching between 'midnight' and 'solar' modes
- Countdown timer and booking statistics are simulated with predetermined values
- Cloudflare KV integration uses free tier limits (100K reads, 10K writes per month)

## Translation System

- Multi-language support with 15 declared languages (zh, en, ja, es, fr, de, ko, it, pt, nl, tr, pl, sv, ru, ar)
- Translation files located in `src/translations.ts` with base configuration
- Translation check report in `/TRANSLATION_CHECK.md` for localization status
- Translation enhancement guide in `/TRANSLATION_ENHANCEMENT.md` for i18n improvements
- Current implementation only includes Chinese and English translations
- RTL language support needed for Arabic and other right-to-left languages
- Translation context system available in `/contexts/TranslationContext.tsx` for unified management
- Translation utility functions in `/utils/translation.ts` for nested key access and interpolation