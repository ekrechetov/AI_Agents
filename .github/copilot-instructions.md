# AI Agents Project - Development Guidelines

Professional Vue 3 + Vite + TypeScript + Pinia project with AI Agent Library.

## Project Overview

**Status**: Production-Ready ✅
**Stack**: Vue 3 (Composition API) | Vite | TypeScript | Pinia | Vue Router
**Architecture**: Modular component structure with UI primitives, feature components, composables, stores, and views

## Completed Features

✅ Vue 3 + TypeScript + Vite scaffolding
✅ Pinia state management setup
✅ Vue Router configuration
✅ Responsive layout with Header and Sidebar
✅ Smooth sidebar animation with click-outside detection
✅ Complete chat interface with message history
✅ AI Agent library with multiple agents
✅ Type-safe component system
✅ Accessible UI with ARIA attributes
✅ Production build successful
✅ Development server running on port 5173

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI primitives
│   │   ├── Button.vue
│   │   └── Header.vue
│   └── features/        # Complex components
│       ├── Layout.vue
│       ├── Sidebar.vue
│       ├── ChatMessage.vue
│       └── ChatInput.vue
├── composables/         # Shared logic
│   └── useSidebar.ts
├── stores/              # Pinia stores
│   ├── ui.ts
│   └── chat.ts
├── views/               # Route components
│   └── ChatView.vue
├── types/               # TypeScript definitions
│   └── index.ts
├── router/              # Vue Router config
│   └── index.ts
├── utils/               # Helper functions
├── App.vue              # Root component
├── main.ts              # Entry point
└── style.css            # Global styles
```

## Running the Project

### Development
```bash
npm run dev
# Application: http://localhost:5173/
```

### Production Build
```bash
npm run build
npm run preview
```

## Development Guidelines

### Component Development
- Use `<script setup>` syntax (Vue 3 style)
- Define props with TypeScript interfaces
- Include ARIA attributes for accessibility
- Use scoped styles with BEM naming
- Keep components focused and reusable

### State Management
- Use Pinia Composition API style
- Define reactive state with `ref`
- Export computed values and actions
- Keep stores focused on single responsibility

### Styling
- CSS variables for theming (defined in style.css)
- Scoped styles in components
- Mobile-first responsive design
- BEM naming convention
- Accessibility-first design

### TypeScript
- Strict mode enabled
- Complete type safety (no `any` types)
- Interface definitions for API responses
- Path alias imports (`@/`)

## Project Configuration

### TypeScript
- Target: ES2020
- Strict mode: Enabled
- Path aliases configured (@/ points to src/)

### Vite
- Dev server port: 5173
- Build output: dist/
- Module format: ESM

### Pinia
- State management for UI and Chat
- Reactive store composition
- Type-safe operations

## Key Features Explained

### Sidebar Interaction
- Click menu button in Header to toggle
- Click outside Sidebar to close (click-outside composable)
- Smooth 300ms animation
- Overlay on mobile, fixed on desktop

### Chat System
- Multiple AI agents available
- Conversation management per agent
- Message history with timestamps
- Auto-scroll to latest message
- Simulated assistant responses

### Responsive Design
- Mobile-first approach
- Tablet optimizations
- Desktop optimizations (sidebar visible)
- Touch-friendly interfaces

## Code Quality Standards

- **TypeScript**: Strict mode, full coverage
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Code splitting, lazy loading ready
- **Consistency**: BEM CSS, Vue style guide

## Future Enhancement Ideas

- [ ] Backend API integration for real AI responses
- [ ] User authentication
- [ ] Conversation persistence (localStorage/database)
- [ ] Rich text editor for messages
- [ ] File upload support
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Real-time collaboration
- [ ] Advanced conversation search

## Troubleshooting

**Port 5173 in use**: `npm run dev -- --port 3000`
**TypeScript errors**: `npm run build` for full check
**Dependencies issue**: `npm install` to reinstall

## Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

## Notes for Developers

1. **Component Import Paths**: Always use `@/` alias for imports
2. **Store Usage**: Import and use stores in components via `<script setup>`
3. **Type Definitions**: Update types/index.ts for new data structures
4. **Styling**: Follow CSS variables defined in style.css
5. **Accessibility**: Include proper ARIA labels for interactive elements
6. **Responsive**: Test on mobile, tablet, and desktop viewports
