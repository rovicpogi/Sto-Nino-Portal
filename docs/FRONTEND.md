# Frontend Guide

The UI is built with Next.js App Router and shadcn/ui components.

## Structure

- `app/admin`, `app/teacher`, `app/student`, `app/parent`: portal pages
- `components/ui/*`: shadcn/ui primitives (button, card, table, etc.)
- `lib/*`: shared utilities and clients

## Conventions

- Use functional React components
- Keep presentational components dumb; fetch data in server components or API routes
- Reuse components from `components/ui` to keep styling consistent

## Styling

- TailwindCSS is used throughout
- Global styles in `app/globals.css` and `styles/globals.css`

## Images & Assets

- Place static files in `public/`, reference with `/path` in `<Image />` or `<img />`

## Useful Imports

```ts
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
```
