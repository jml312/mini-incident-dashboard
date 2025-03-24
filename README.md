# Mini Incident Dashboard

**Live Demo:** [mini-incident-dashboard.vercel.app](https://mini-incident-dashboard.vercel.app)

A responsive incident tracking dashboard built with Next.js 15, GraphQL Yoga, and Apollo Client. Users can create, update, delete, and view detailed incident reports, as well as browse a paginated list of all incidents. The app supports filtering by status and severity, full-text search by title or description, and includes both light and dark themes.

## Tech Stack

- **Next.js 15** (App Router, API Routes, Turbopack)
- **TypeScript** (strict types across backend and frontend)
- **GraphQL Yoga** (GraphQL API layer)
- **Apollo Client** (GraphQL client for React)
- **Codegen** (`graphql-codegen` for generating typed hooks and operations)
- **TailwindCSS** (utility-first styling)

## Running the App

### 1. Clone the repository

```bash
git clone https://github.com/jml312/mini-incident-dashboard.git
cd mini-incident-dashboard
```

### 2. Install dependencies

```bash
   npm install
```

### 3. Start the development server with live GraphQL code generation

```bash
   npm run dev:watch
```

This runs both the Next.js dev server and graphql-codegen in watch mode to auto-generate typed hooks and operations. The app will be available at http://localhost:3000, and the GraphQL API will be served from http://localhost:3000/api/graphql.

## Folder Structure and Key Files

### **codegen.ts**

Configuration for GraphQL Codegen to generate TypeScript types from GraphQL operations and fragments.

### **src/app**

Contains the Next.js app, including route handlers and the main layout. The GraphQL API lives in `src/app/api/graphql/route.ts` and is powered by GraphQL Yoga.

### **src/components**

Houses all reusable UI components. Includes a `common/` subfolder for shared elements like buttons, inputs, and layout primitives.

### **src/contexts**

React context providers for managing global app state (e.g., theme, Apollo client).

### **src/generated**

Contains all generated TypeScript types and hooks from Codegen. This folder is automatically generated and should not be modified directly.

### **src/graphql**

Contains the GraphQL schema (`schema.graphql`) and all queries and mutations used in the app. Each query or mutation has its own file.

### **src/hooks**

Custom React hooks to encapsulate and reuse logic (e.g., debouncing search queries).

### **src/lib**

Library functions and modules that are more application-specific, such as Apollo Client setup. These don’t fit under generic `utils/`.

### **src/utils**

Generic helper functions used throughout the codebase, such as capitalizing strings.

### **src/constants.ts**

Defines shared constants used across the app, such as status and severity colors.
