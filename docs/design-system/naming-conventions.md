# Naming Conventions

## Token Naming

- Use lowercase kebab-case for design tokens.
- Examples: color-primary, surface-card, text-secondary, radius-md, space-4, shadow-lg, motion-fast, layer-dialog.

## Component Naming

- Shared components should use PascalCase and remain generic.
- Feature components should stay feature-scoped and not be reused outside their domain.

## State Naming

- Use semantic state names such as default, hover, pressed, focused, selected, disabled, loading, success, warning, danger.

## Rules

- Avoid inconsistent aliases such as bg-primary and bg-main when one semantic token exists.
- Prefer one canonical token for each purpose.
- Avoid hardcoded values in component implementations when a token already exists.
