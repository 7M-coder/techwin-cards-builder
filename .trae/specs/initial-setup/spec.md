# Techwin Card Builder Initial Setup Spec

## Why

To establish the foundational structure, styling, and navigation for the "Techwin Card Builder" website, implementing the Arabic RTL layout and a creative 3D navigation system as requested.

## What Changes

- **Project Configuration**:
  - Install Tailwind CSS for styling.
  - Install `react-router-dom` for routing.
  - Configure global styles for Arabic (RTL) and "Tajawal" font.
- **Theme & Styling**:
  - Define root CSS variables for colors extracted from the logo:
    - `--color-purple`: `#8B5CF6` (Violet)
    - `--color-cyan`: `#06B6D4` (Cyan)
    - `--color-orange`: `#F97316` (Orange)
    - `--color-yellow`: `#EAB308` (Yellow)
    - `--color-red`: `#EF4444` (Red/Orange)
  - Implement a "Glassy" UI theme with black/gray background and blurred theme colors.
- **Navigation**:
  - Create a creative 3D Navigation component using `react-three-fiber`.
  - The navigation will allow switching between 3 tabs/pages.
- **Pages**:
  - Create route placeholders:
    - `/` (Home/Dashboard)
    - `/greeting-cards` (بطائق التهنئة)
    - `/personal-card` (البطاقة الشخصية)

## Impact

- **Dependencies**: Adds `tailwindcss`, `postcss`, `autoprefixer`, `react-router-dom`.
- **UI/UX**: Sets the visual tone (Glassy, RTL, Arabic).
- **Architecture**: Establishes the routing and layout structure.

## ADDED Requirements

### Requirement: Global Styling

The system SHALL apply the "Tajawal" font globally.
The system SHALL set the document direction to RTL.
The system SHALL define the specified color palette as CSS variables.

### Requirement: 3D Navigation

The system SHALL provide a 3D interactive menu for navigation.
The menu SHALL allow users to navigate to:

1.  Home (Default)
2.  Greeting Cards (بطائق التهنئة)
3.  Personal Card (البطاقة الشخصية)

### Requirement: Glassy Background

The background SHALL be dark (black/gray) with blurred blobs of the theme colors to create a modern, glassy effect.
