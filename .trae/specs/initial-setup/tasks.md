# Tasks

- [x] Task 1: Project Setup & Dependencies: Install necessary libraries and configure the build tools.
  - [x] SubTask 1.1: Install `tailwindcss`, `postcss`, `autoprefixer`, `react-router-dom`.
  - [x] SubTask 1.2: Initialize Tailwind CSS and create `tailwind.config.js`.
  - [x] SubTask 1.3: Configure `vite.config.js` if needed for resolving aliases (optional).

- [x] Task 2: Global Styling & Assets: Define the design system.
  - [x] SubTask 2.1: Import "Tajawal" font from Google Fonts in `index.css`.
  - [x] SubTask 2.2: Define CSS variables for the extracted logo colors (`--color-purple`, `--color-cyan`, `--color-orange`, `--color-yellow`, `--color-red`).
  - [x] SubTask 2.3: Set `html` attribute `dir="rtl"` and `lang="ar"`.
  - [x] SubTask 2.4: Apply global styles (background: black/gray, text color, font-family).

- [x] Task 3: Layout & Glassy Theme: Create the main application layout.
  - [x] SubTask 3.1: Create a `Layout` component that wraps the app.
  - [x] SubTask 3.2: Implement the glassy background effect with blurred color blobs using CSS or SVG filters.
  - [x] SubTask 3.3: Ensure the layout supports RTL content flow.

- [x] Task 4: 3D Navigation Component: Implement the creative navigation.
  - [x] SubTask 4.1: Create a `Navigation3D` component using `@react-three/fiber`.
  - [x] SubTask 4.2: Design interactive 3D elements (e.g., floating cards or icons) for each route.
  - [x] SubTask 4.3: Implement click handlers to navigate using `useNavigate`.
  - [x] SubTask 4.4: Add hover effects and animations using `@react-three/drei` or `react-spring`.

- [x] Task 5: Pages & Routing: Set up the application routes.
  - [x] SubTask 5.1: Create placeholder components for `Home`, `GreetingCards` (بطائق التهنئة), and `PersonalCard` (البطاقة الشخصية).
  - [x] SubTask 5.2: Configure `react-router-dom` routes in `App.jsx`.
  - [x] SubTask 5.3: Ensure navigation works correctly between pages.

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 4]
