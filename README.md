# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Gestion Surveillance** is a React-based exam surveillance management system. It provides a dashboard for managing examinations, modules, departments, professors, and local exam venues. The frontend communicates with a REST API backend for data operations.

## Development Setup & Commands

### Prerequisites
- Node.js 14+ 
- npm 6+

### Installation & Running
```bash
# Install dependencies
npm install

# Run in development (http://localhost:3000)
npm start

# Build for production
npm build

# Run tests
npm test
```

### Code Quality
```bash
# Lint code (ESLint with Prettier)
npm run lint

# Note: Prettier is used for formatting (configured in .prettierrc.json)
# ESLint will check for issues and auto-fix where possible
```

### Special Installation Notes
- The project uses `legacy-peer-deps=true` in `.npmrc` due to peer dependency conflicts with Material-UI versions
- Use `npm install --legacy-peer-deps` if encountering peer dependency issues during installation
- `npm run install:clean` removes node_modules and package-lock.json, then reinstalls

### API & Proxy Configuration
- Backend proxy: `http://localhost:8082` (configured in package.json)
- API base URL: `/api/auth` (configured in `src/api/axiosInstance.js`)
- JWT authentication: Bearer tokens stored in localStorage and automatically added to all requests via axios interceptor

## Architecture

### Core Structure

```
src/
├── api/                    # Axios configuration and auth service
│   ├── axiosInstance.js   # Configured axios with JWT interceptor
│   └── authService.js     # Login/signup/logout utilities
├── services/              # Domain-specific API service modules
│   ├── authentification/  # Auth provider & protected routes
│   ├── dapartments/
│   ├── exam/
│   ├── locaux/
│   ├── modules/
│   ├── options/
│   ├── professors/
│   └── sessions/
├── layouts/               # Page-level components (one per major feature)
│   ├── dashboard/
│   ├── departments/
│   ├── exams/
│   ├── locals/
│   ├── modules/
│   ├── options/
│   ├── professors/
│   ├── sessions/
│   ├── surveillances/
│   ├── authentication/    # Sign-in & sign-up pages
│   └── [other layouts]/
├── modals/                # Modal dialogs (Add/Edit/Delete per entity)
│   ├── departements/
│   ├── enseignants/
│   ├── exams/
│   ├── locals/
│   ├── modules/
│   ├── options/
│   └── sessions/
├── components/            # Reusable UI building blocks
│   ├── SoftBox/           # Utility container component
│   ├── SoftButton/
│   ├── SoftTypography/
│   ├── SoftAvatar/
│   ├── SoftBadge/
│   ├── SoftInput/
│   ├── SoftProgress/
│   ├── SoftAlert/
│   └── SoftPagination/
├── examples/              # Layout templates & complex component patterns
│   ├── LayoutContainers/  # DashboardLayout & PageLayout wrappers
│   ├── Navbars/           # DashboardNavbar, DefaultNavbar
│   ├── Sidenav/           # Sidebar navigation component
│   ├── Tables/            # Table template
│   ├── Cards/             # Various card types
│   ├── Charts/            # Chart types (Bar, Line, Pie, etc.)
│   ├── Breadcrumbs/
│   ├── Footer/
│   └── [other examples]/
├── context/               # React Context for global UI state
│   └── index.js          # SoftUIController (theme, layout, sidenav state)
├── assets/                # Static resources
│   ├── theme/             # Material-UI theme configuration
│   ├── images/            # Logos, illustrations, shapes
│   └── [other assets]/
├── App.js                 # Root component, route rendering, layout switching
├── routes.js              # Route definitions with protection metadata
└── index.js              # React DOM entry point
```

### Key Architectural Patterns

**1. Service Layer (Domain-Specific)**
- Each domain (departments, exams, sessions, etc.) has a dedicated service module in `src/services/`
- Services encapsulate all REST API calls using the configured axios instance
- Services handle business logic and data transformation

**2. Layout + Modal + Data Pattern**
- Each major feature has:
  - A `layouts/[feature]/` page component
  - Corresponding `modals/[feature]/` for Add/Edit/Delete dialogs
  - A `layouts/[feature]/data/` file for table configuration and data transformation
  - A `layouts/[feature]/components/` for feature-specific sub-components

Example: Departments feature
- Page: `src/layouts/departments/index.js`
- Modals: `src/modals/departements/DepartmentAddModal.js`, `DepartmentEditModal.js`, `DepartmentDeleteModal.js`
- Data: `src/layouts/departments/data/departmentsTableData.js`
- Components: `src/layouts/departments/components/Header.js`

**3. Protected Routes**
- Routes marked with `protected: true` in `routes.js` are wrapped with `ProtectedRoute`
- `ProtectedRoute` redirects unauthenticated users to `/sign-in`
- Authentication state managed via `AuthProvider` context

**4. Global UI State Management**
- Theme, layout mode, sidenav state, and direction (RTL/LTR) managed in `context/index.js`
- Uses React Context with useReducer pattern
- Accessed via `useSoftUIController()` hook

**5. Material-UI & Soft UI Dashboard**
- Built on Material-UI (@mui/material) v5
- Uses Soft UI Dashboard theme and component set for consistent styling
- RTL support via stylis-plugin-rtl

### Data Flow for Feature Pages

1. **Component Load**: Layout component (e.g., `Departments`) initializes with empty state
2. **Fetch Data**: `useEffect` calls service method (e.g., `DepartmentService.getAllDepartments()`)
3. **Transform Data**: Data generation function (e.g., `departmentsTableData()`) converts fetched data to table format
4. **Render**: Table renders with action handlers for edit/delete/view
5. **User Action**: Modal opens (Add/Edit/Delete) with pre-filled data if editing
6. **Submit**: Modal calls service method to persist changes
7. **Refresh**: Page refetches data and updates state

## Code Style & Linting

- **ESLint Config**: Extends `react-app` with Prettier integration
- **Prettier Config**: Print width 100, trailing commas (ES5), single quotes disabled, 2-space tabs
- **Key Rules Disabled**:
  - `react/require-default-props` - Default props not enforced
  - `react/react-in-jsx-scope` - React 17+ JSX transform
  - `react/display-name` - Allow unnamed components
  - `jsx-a11y/alt-text` - Disabled for flexibility
- **Module Resolution**: `baseUrl: src` in `jsconfig.json` allows imports like `import X from "components/X"`

## Important Implementation Notes

- **Token Management**: JWT tokens stored in localStorage; interceptor in `axiosInstance.js` attaches to every request
- **Loading States**: Most data-fetching components show loading spinner using `SoftTypography` or custom UI
- **Error Handling**: Errors logged to console but minimal user feedback currently—consider adding toast/notification system for production
- **Navigation**: `useNavigate()` from react-router-dom; layout routes pass context via state when navigating
- **Modal Pattern**: Modals are controlled by parent page component state; callbacks trigger parent refetch on submit
- **Reusable Components**: Use `SoftBox`, `SoftButton`, `SoftTypography` for consistency rather than raw MUI components

## Common Development Tasks

### Adding a New Feature Page
1. Create `src/layouts/[feature]/index.js` as the main page
2. Create `src/layouts/[feature]/components/Header.js` for page header
3. Create `src/layouts/[feature]/data/[feature]TableData.js` for data transformation
4. Create `src/services/[feature]/` directory with service methods
5. Create `src/modals/[feature]/` with Add/Edit/Delete modals
6. Add route in `routes.js` with `protected: true` if authentication required

### Adding a Service Module
- Create file in `src/services/[domain]/` (e.g., `src/services/exams/examService.js`)
- Export a service object with methods: `getAll()`, `getById()`, `create()`, `update()`, `delete()`
- Use `axiosInstance` for all HTTP calls
- Return data directly; error handling in components

### Adding a New Modal
- Import in layout component
- Control visibility with parent state (`showAddModal`, `showEditModal`, `showDeleteModal`)
- On submit, call service method, then callback parent's refetch function
- Pass modal state setters and data to modal component as props

## Deployment & Environment

- **Environment Variables**: Configured in `.env` (not tracked in git)
- **Genezio Config**: `genezio.yaml` present; used for deployment automation if applicable
- **Build Output**: `npm run build` creates production build in `build/` directory

