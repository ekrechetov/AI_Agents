# AI Agents - Professional Vue 3 Application

A production-ready Vue 3 + TypeScript + Vite application with integrated AI Agent chat functionality. Built following modern Vue 3 best practices with Composition API, Script Setup, and comprehensive component architecture.

## Key Features

- **Modern Stack**: Vue 3 with Composition API, TypeScript, Vite, Pinia, Vue Router
- **Responsive Design**: Mobile-first responsive layout with smooth animations
- **Sidebar Navigation**: Smooth sliding sidebar with click-outside detection
- **Chat Interface**: Full-featured chat page with message history
- **State Management**: Centralized state with Pinia stores
- **Type Safety**: Fully typed with TypeScript interfaces
- **Accessibility**: ARIA attributes and semantic HTML throughout
- **Component Architecture**: Modular UI components and feature-rich components
- **Development**: Hot Module Replacement for fast development experience

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI primitives
│   │   ├── Button.vue        # Button component
│   │   └── Header.vue        # Header with menu button
│   └── features/             # Complex feature components
│       ├── Layout.vue        # Main layout wrapper
│       ├── Sidebar.vue       # Animated sidebar
│       ├── ChatMessage.vue   # Chat message display
│       └── ChatInput.vue     # Message input form
├── composables/              # Shared composition logic
│   └── useSidebar.ts        # Sidebar interaction logic
├── stores/                   # Pinia store modules
│   ├── ui.ts                # UI state management
│   └── chat.ts              # Chat state management
├── views/                    # Page components
│   └── ChatView.vue         # Main chat page
├── types/                    # TypeScript interfaces
│   └── index.ts             # Type definitions
├── router/                   # Vue Router configuration
│   └── index.ts             # Router setup
├── utils/                    # Helper functions
├── App.vue                   # Root component
├── main.ts                   # Application entry point
└── style.css                 # Global styles
```

## Getting Started

### Prerequisites

- Node.js >= 20.19.0 or >= 22.12.0
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Core Technologies

- **Vue 3**: Latest Vue framework with Composition API
- **TypeScript**: Full type safety for JavaScript
- **Vite**: Ultra-fast build tool and dev server
- **Pinia**: Intuitive, modular state management
- **Vue Router**: Client-side routing
- **CSS3**: Modern styling with CSS variables and animations

## Architecture Notes

### UI Components (`src/components/ui/`)
Reusable, isolated UI primitives with minimal business logic:
- `Button.vue` - Customizable button with variants and sizes
- `Header.vue` - Navigation header with menu toggle

### Feature Components (`src/components/features/`)
Components combining UI primitives with business logic:
- `Layout.vue` - Main layout combining Header and Sidebar
- `Sidebar.vue` - Animated navigation sidebar with agent list
- `ChatMessage.vue` - Formatted message display
- `ChatInput.vue` - Message input with send functionality

### State Management (`src/stores/`)
Pinia stores for centralized state:
- `UIStore` - Manages sidebar visibility state
- `ChatStore` - Manages conversations, messages, and agents

### Composables (`src/composables/`)
Reusable logic as composition functions:
- `useSidebar.ts` - Click-outside detection and animation utilities

## TypeScript Features

- **Strict Mode**: Full TypeScript strict mode enabled
- **Interface Definitions**: Complete type coverage for data structures
- **Component Props**: Typed props with validation
- **Type Safety**: No `any` types, full type inference
- **Path Aliases**: `@/` prefix for clean imports

## Styling Approach

- **CSS Variables**: Theme colors defined in global scope
- **BEM Methodology**: Block-Element-Modifier for class naming
- **Scoped Styles**: Component-specific styling isolation
- **Responsive Design**: Mobile-first approach with media queries
- **Accessibility**: Color contrast, focus states, and ARIA support

## Accessibility (A11y)

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible styles
- Screen reader friendly
- Color contrast compliance

## Key Functionality

### Sidebar Toggle
- Click hamburger menu to open sidebar
- Click outside sidebar to close it
- Smooth transform animation (300ms)
- Overlay on mobile devices

### Chat Interface
- Create conversations with AI agents
- Send and receive messages
- Message history per conversation
- Auto-scroll to latest message
- Keyboard shortcut (Ctrl+Enter) for sending

### Agent Management
- Pre-defined AI agents with descriptions
- Quick conversation creation
- Conversation list with deletion

## Development Guidelines

### Adding a New Component

1. Create component in appropriate directory (`ui/` or `features/`)
2. Use `<script setup>` syntax
3. Use TypeScript for prop definitions
4. Add accessibility attributes
5. Include scoped styles

### Adding a New Route

Edit `src/router/index.ts`:

```typescript
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('@/views/NewPageView.vue'),
  meta: { title: 'New Page' }
}
```

### Adding Store State

Edit `src/stores/` files using Pinia composition API pattern:

```typescript
export const useNewStore = defineStore('new', () => {
  const state = ref(initialValue)
  
  function action() {
    // Logic here
  }
  
  return { state, action }
})
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting via Vite
- Lazy loading for routes
- Component-scoped styles
- Efficient reactivity with ref/computed
- Minimal bundle size

## Troubleshooting

### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

### Clear Node Modules
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npm run build  # Run full type check
```

## License

MIT

## Support

For issues and questions, please refer to the Vue 3 and Vite documentation:
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Guide](https://vitejs.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
