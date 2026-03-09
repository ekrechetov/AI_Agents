# Shared Types & DTOs
Types for AI-agents library.
This repository contains shared TypeScript interfaces and Data Transfer Objects (DTOs) used by both the Frontend (Vue 3) and Backend (Node.js) applications.

It is integrated into main projects as a **Git Submodule**.

---

## Initial Setup
To add these shared types to a new project (Frontend or Backend), run the following command in the project root:

```bash
git submodule add git@github.com:your-username/my-app-types.git src/shared-types

```

## How to UPDATE Types
If changes have been pushed to this repository and you need to pull them into your current project:

```bash
git submodule update --remote --merge

```

## How to MODIFY and PUSH Changes
If you need to edit, add, or delete an interface, follow these steps inside your main project:
1. Enter the submodule directory:

```bash
cd src/shared

```

2. Commit and Push changes to the Types repository:

```bash
git add .
git commit -m "feat: add OrderDTO and PaymentStatus types"
git push origin main

```

3. Link the new version to your main project:
Return to the project root and commit the submodule pointer update:

```bash
cd ../..
git add src/shared
git commit -m "chore: update shared types to latest version"
git push

```

## Cloning a Project with Submodules
If you have just cloned the Frontend or Backend repository and the src/shared folder is empty, initialize it using:

```bash
git submodule update --init --recursive

```

## TypeScript Integration (Path Alias)
To use clean imports like @shared, update your tsconfig.json in the host project:

```JSON
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["src/shared-types/*"]
    }
  }
}

```

## Usage:
import { UserDTO } from '@shared/index';

