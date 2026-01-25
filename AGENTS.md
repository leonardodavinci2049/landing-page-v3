# AGENTS.md - AI Coding Agent Instructions

## Project Overview

Next.js 16 landing page for "Promos da Mih" - a Brazilian promotional deals community directing users to WhatsApp/Telegram groups. Uses React 19, TypeScript, Tailwind CSS 4.1, and Radix UI components.

## Build/Lint/Test Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack (http://localhost:3000)

# Production
pnpm build            # Production build with Turbopack
pnpm start            # Run production server on port 5560

# Linting
pnpm lint             # Run ESLint on the codebase

# Type checking (no separate script - integrated in build)
npx tsc --noEmit      # Manual type check without emitting files

# No test framework is configured in this project
```

## Project Structure

```
src/app/              # Next.js App Router pages and layouts
src/components/ui/    # Reusable shadcn/ui-style components
src/lib/              # Utilities (cn() for Tailwind class merging)
src/mock/             # Static JSON data (e.g., brazilian-names.json)
public/               # Static assets (images, logos)
```

## Code Style Guidelines

### Imports

- Use path alias `@/*` for `./src/*` imports: `import { cn } from "@/lib/utils"`
- Group imports: React/Next.js first, then external libs, then local modules
- Use named imports where possible
- JSON imports: `import data from "../mock/file.json"`

### TypeScript

- Strict mode enabled (`"strict": true` in tsconfig.json)
- Use `type` imports for type-only imports: `import type { Metadata } from "next"`
- Define component props inline or with `React.ComponentProps<"element">`
- Use explicit return types only when necessary

### Components

- Add `"use client"` directive at top of files using hooks/interactivity
- Layout files (`layout.tsx`) remain Server Components
- Use function declarations for components: `function Button({ ... }) { }`
- Export named exports for multiple items, default for single main component
- Add `data-slot` attributes for component identification (shadcn pattern)

### Naming Conventions

- **Files**: kebab-case for all files (`brazilian-names.json`, `navigation-menu.tsx`)
- **Components**: PascalCase (`HomePage`, `CardHeader`)
- **Functions/Variables**: camelCase (`availableSpots`, `showNotification`)
- **CSS Classes**: Tailwind utility classes, no custom class names except in globals.css
- **Constants**: camelCase (not SCREAMING_CASE)

### Tailwind CSS

- Use `cn()` from `@/lib/utils` for conditional classes
- Mobile-first responsive design with `sm:`, `xs:` prefixes
- Prefer Tailwind utilities over custom CSS
- Use CSS variables for colors (defined in globals.css with oklch values)
- Animations: Use `tw-animate-css` classes or custom keyframes in globals.css

### Formatting (Prettier)

- Tailwind class sorting via `prettier-plugin-tailwindcss`
- Tab indentation (configured in project)
- Run formatting before commits

### Error Handling

- Clean up intervals/timeouts in useEffect return functions
- Use optional chaining for potentially undefined values
- Handle edge cases in state updates (e.g., `Math.max(1, value)`)

## UI Components (shadcn/ui Style)

Components in `src/components/ui/` follow shadcn/ui patterns:

```tsx
import { cn } from "@/lib/utils";

function Component({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="component-name"
      className={cn("base-classes", className)}
      {...props}
    />
  );
}

export { Component };
```

### Adding New UI Components

Use shadcn CLI: `npx shadcn@latest add <component-name>`
Configuration in `components.json` - uses "new-york" style, stone base color.

## Key Patterns

### State Management

- Use React hooks (`useState`, `useEffect`) for local state
- Clean up side effects: always return cleanup functions from useEffect
- Avoid stale closures by including dependencies in useEffect arrays

### Responsive Design

- Use `safe-area-inset-x` and `safe-area-inset-y` classes for notch devices
- Use `touch-target` class (min 44px) for tap areas on mobile
- Test on mobile viewports - this is a mobile-first landing page

### Animation Timing

- Available spots counter: decrements every 5 seconds
- Notifications: appear every 10 seconds, visible for 1.5 seconds
- Use `transition-all duration-700` for smooth transitions

## ESLint Configuration

ESLint uses flat config format (`eslint.config.mjs`):

- Extends `eslint-config-next`
- Special exceptions for `layout.tsx`: allows dangerouslySetInnerHTML for GTM
- Ignores: `node_modules/`, `.next/`, `out/`, `build/`

## External Dependencies

### Google Tag Manager

- ID: `GTM-K32FH9SX` (configured in layout.tsx)
- DO NOT remove without approval - affects analytics tracking

### External Links (hardcoded in page.tsx)

- WhatsApp group: `https://chat.whatsapp.com/CFwC3iqivEH8DbE6DqJL3l`
- Telegram group: `https://t.me/promosdamih`

## Common Pitfalls

1. **Missing "use client"**: Add directive when using useState, useEffect, or event handlers
2. **Memory leaks**: Always clean up intervals/timeouts in useEffect
3. **Responsive values**: Use Tailwind prefixes, don't hardcode pixel values
4. **GTM removal**: Never remove Google Tag Manager code without explicit approval
5. **Animation timing**: Don't modify without testing user experience impact
6. **Class order**: Let Prettier sort Tailwind classes automatically

## Git Workflow

This project uses Git Flow:

```bash
git flow feature start feature-name    # Start feature branch
git flow feature finish feature-name   # Merge to develop
git flow release start version         # Start release
git flow release finish version        # Merge to main + develop, tag
```

## Quick Reference

| Task                 | Command                        |
| -------------------- | ------------------------------ |
| Start dev server     | `pnpm dev`                     |
| Build for production | `pnpm build`                   |
| Run production       | `pnpm start`                   |
| Lint code            | `pnpm lint`                    |
| Type check           | `npx tsc --noEmit`             |
| Add UI component     | `npx shadcn@latest add <name>` |
| Check dependencies   | `pnpm outdated`                |
