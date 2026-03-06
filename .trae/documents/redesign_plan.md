# Plan: Redesign Background (Three.js), Navigation, and Home Content

## Goal
Refine the application's visual style by replacing the blurred background with a dedicated Three.js animated scene, switching to a glass-morphism bottom navigation, and populating the homepage with Arabic content.

## 1. Redesign Background (Animated 3D Shapes)
-   **Remove**: Delete the existing blurred blob `div`s from `src/components/Layout.jsx`.
-   **Create Component**: `src/components/AnimatedBackground.jsx` using `@react-three/fiber` and `@react-three/drei`.
-   **3D Scene**:
    -   Create a scene with a fixed camera.
    -   Implement the shapes from the user's reference image as 3D geometries:
        1.  **Purple Pill**: `CapsuleGeometry` or stretched `SphereGeometry` (Color: `#8B5CF6`).
        2.  **Cyan Squircle**: `BoxGeometry` with rounded corners (using `RoundedBox` from drei) (Color: `#06B6D4`).
        3.  **Orange Squircle**: `RoundedBox` (Color: `#F97316`).
        4.  **Yellow Squircle**: `RoundedBox` (Color: `#EAB308`).
        5.  **Yellow Circle**: `SphereGeometry` (Color: `#EAB308`).
        6.  **Red Pill**: `CapsuleGeometry` (Color: `#EF4444`).
    -   **Positioning**: Arrange them in a row or slight arc in the corner of the view (e.g., bottom-left or top-right) to act as a background element.
    -   **Animation**:
        -   Use `useFrame` to add gentle floating/bobbing motion (sine wave on Y-axis).
        -   Add slow rotation to some shapes for dynamism.
    -   **Layering**: Ensure the canvas has `position: absolute; inset: 0; z-index: 0; pointer-events: none;` so it sits behind the content.

## 2. Replace Navigation (Bottom Glassy Nav)
-   **Remove**: Remove `<Navigation3D />` from `src/components/Layout.jsx`.
-   **Create Component**: `src/components/BottomNav.jsx`.
    -   **Style**: Fixed at the bottom of the screen (`fixed bottom-8 left-1/2 -translate-x-1/2 z-50`).
    -   **Glass Effect**: `backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-8 py-4 shadow-lg`.
    -   **Items**:
        -   **الرئيسية** (Home) - Path: `/`
        -   **بطائق التهنئة** (Greeting Cards) - Path: `/greeting-cards`
        -   **البطاقة الشخصية** (Personal Card) - Path: `/personal-card`
    -   **Interactivity**:
        -   Use `NavLink` for active state styling (e.g., `text-white font-bold bg-white/20 rounded-full` vs `text-white/70 hover:text-white`).
        -   Add smooth transitions.

## 3. Update Homepage Content
-   **Edit**: `src/pages/Home.jsx`.
-   **Content**: Add a hero section with Arabic text explaining the platform.
    -   **Headline**: "منشئ بطاقات تيك وين" (Techwin Card Builder)
    -   **Description**:
        "صمم بطاقات تهنئة وبطاقات شخصية احترافية بسهولة وسرعة. اختر من بين مجموعة واسعة من القوالب والألوان لتناسب ذوقك."
        (Design professional greeting and personal cards easily and quickly. Choose from a wide range of templates and colors to suit your taste.)
    -   **Call to Action**: Maybe a button "ابدأ الآن" (Start Now) linking to the greeting cards page.
    -   **Style**: Centered layout, large typography (Tajawal font), white text with subtle shadow.

## Execution Steps
1.  **Create AnimatedBackground**: Implement the Three.js scene with the requested shapes and animation.
2.  **Update Layout**: Integrate `AnimatedBackground` and remove the old blob divs.
3.  **Create BottomNav**: Implement the new navigation component and add it to `Layout`.
4.  **Update Home**: Add the Arabic content and styling.
5.  **Cleanup**: Remove unused 3D navigation code.
