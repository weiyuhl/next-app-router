# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Running the Application
- **Development server**: `npm run dev` (uses Turbopack)
  - Note: README mentions `edgeone pages dev` for deployment preview (runs on http://localhost:8088)
- **Build for production**: `npm run build` (uses Turbopack)
- **Start production server**: `npm start`
- **Lint**: `npm run lint` (uses ESLint 9)

### Testing
There are no test scripts configured in this project. Do not assume the presence of testing frameworks.

## Architecture Overview

### Tech Stack
- **Next.js 15.5.0** with App Router
- **React 19.1.0**
- **TypeScript 5** with strict mode enabled
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (New York style variant) with Radix UI primitives
- **Lucide React** for icons

### Route Group Architecture

This project uses **Next.js App Router route groups** to organize routes into three distinct sections, each with its own layout:

1. **`(frontend)`** - Public-facing pages
   - Layout includes: Header, Footer, MusicPlayer, BackToTop, ExternalLinkInterceptor
   - Home page at `/` (mapped from `(frontend)/page.tsx`)
   - Nested routes: `/about`, `/code-snap`, `/qingyu`

2. **`(admin)`** - Admin dashboard
   - Layout includes: AdminSidebar, AdminTopBar
   - Metadata template: "%s | 后台管理"
   - Dashboard at `/dashboard`
   - Test routes at `/test-routes`

3. **`(auth)`** - Authentication pages
   - Routes: `/login`, `/register`, `/forgot-password`

**Route groups use `(folderName)` convention** - the parentheses prevent the folder name from appearing in the URL path while still allowing separate layouts.

### Component Organization

- **`src/components/ui/`** - shadcn/ui components (button, card, sheet, slider)
- **`src/components/admin/`** - Admin-specific components (AdminSidebar, AdminTopBar)
- **`src/components/`** - Shared components (Header, Footer, MusicPlayer, BackToTop, ExternalLinkInterceptor)

### Path Aliases
All imports use `@/` prefix mapping to `./src/`:
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/app` → `src/app`

### File Conventions in Use
- **`layout.tsx`** - Defines UI shared between routes (nested layouts at root, (frontend), (admin) levels)
- **`loading.js`** - Loading UI (demonstrated in `/file-conventions/loading`)
- **`error.js`** - Error boundaries (present at root level)
- **`not-found.js`** - Custom 404 pages (present at root level)

### Features Demonstrated
The project showcases Next.js App Router features:
- Nested layouts (at `/layouts/nested-layouts`)
- Route groups (at `/layouts/route-groups`)
- Parallel routes (at `/layouts/parallel-routes`)
- File conventions: loading, error, not-found (at `/file-conventions/*`)

### Styling Approach
- Dark theme by default (`#0a0a0a` background)
- Primary color: `#1c66e5` (blue)
- Uses CSS variables for theming
- Tailwind v4 with PostCSS
- Chinese font: Noto Serif SC from Google Fonts

### ESLint Configuration
- Extends `next/core-web-vitals`
- TypeScript warnings (not errors) for unused vars and explicit any
- Disabled `react/no-unescaped-entities`
- Next.js warnings for img elements and custom fonts

### Language & Content
- Primary language: Chinese (`zh-CN`)
- Site title: "咏雪轩阁" (Yongxue Xuange)
- UI and content are predominantly in Chinese

## Key Development Notes

- **Turbopack is enabled** by default for both dev and build
- **No test framework** is configured - do not suggest running tests
- When adding shadcn/ui components, ensure they follow the "new-york" style variant
- The root `page.tsx` is located at `(frontend)/page.tsx`, not directly in `app/`
- Path imports should always use `@/` prefix, never relative paths like `../../`
