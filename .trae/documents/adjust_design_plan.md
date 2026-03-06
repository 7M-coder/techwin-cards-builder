# Plan: Adjust Design (Black BG, No Glass, Corner Shapes)

## Goal
Simplify the UI by removing the glass container effect, ensuring a solid black background, and repositioning the animated 3D shapes to frame the homepage content from the corners.

## 1. Update Layout (Remove Glass Container)
-   **File**: `src/components/Layout.jsx`
-   **Action**:
    -   Remove the CSS classes responsible for the glass effect (`bg-white/10`, `backdrop-blur-md`, `border`, `shadow-xl`, `rounded-2xl`) from the `div` wrapping the `<Outlet />`.
    -   Ensure the wrapper is just a clean container (e.g., just `w-full`).
    -   Verify the root `div` is `bg-black`.

## 2. Update Animated Background (Shapes in Corners)
-   **File**: `src/components/AnimatedBackground.jsx`
-   **Action**:
    -   Split the existing group of shapes into two distinct groups to populate the corners.
    -   **Group 1 (Top Left / Top Right)**: Position shapes like the Purple Pill, Cyan Squircle, and Orange Squircle.
    -   **Group 2 (Bottom Right / Bottom Left)**: Position shapes like the Yellow Squircle, Yellow Circle, and Red Pill.
    -   **Positioning**: Adjust `x` and `y` coordinates to push these groups to the edges of the view (e.g., `position={[-6, 3, 0]}` and `position={[6, -3, 0]}`).
    -   **Animation**: Maintain the gentle floating and rotation for all shapes.

## Execution Steps
1.  **Modify Layout**: Strip the glass styles.
2.  **Refine Background**: Update the Three.js scene to distribute shapes to the corners.
