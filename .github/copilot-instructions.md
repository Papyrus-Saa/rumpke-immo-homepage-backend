# Copilot Instructions for rumpke-immo-homepage-backend

## Project Overview
- **Framework:** NestJS (TypeScript, modular, dependency-injection)
- **Database:** PostgreSQL via TypeORM (see `src/database/data-source.ts`)
- **Domain:** Real estate backend (properties, agents, leads, media, taxonomy, etc.)
- **Key Modules:** Each domain (property, agent, lead, etc.) is a module under `src/modules/` with its own controller, service, DTOs, and entities.

## Architecture & Patterns
- **Modules:** Each feature is a NestJS module (see `src/modules/`).
- **Entities:** TypeORM entities in `entities/` folders define DB schema. Example: `src/modules/property/entities/property.entity.ts`.
- **DTOs:** Validation and typing via class-validator in `dto/` folders. Example: `src/modules/agent/dto/create-agent.dto.ts`.
- **Services:** Business logic in `*.service.ts` files, injected via constructor.
- **Controllers:** Route handlers in `*.controller.ts`, use decorators for routing and guards for auth.
- **Guards:** Auth and throttling via custom guards in `src/common/guards/` and module-specific guards.
- **Config:** Environment/configuration via `@nestjs/config` and `.env` variables.
- **Migrations:** TypeORM migrations in `src/database/migrations/`.

## Developer Workflows
- **Install:** `npm install`
- **Run (dev):** `npm run start:dev`
- **Run (prod):** `npm run start:prod`
- **Test:** `npm run test` (unit), `npm run test:e2e` (e2e), `npm run test:cov` (coverage)
- **Lint:** Uses ESLint with Prettier (`eslint.config.mjs`).
- **Migrations:** Managed via TypeORM CLI or programmatically (see `src/database/data-source.ts`).
- **Deployment:** See README for [NestJS Mau](https://mau.nestjs.com) deployment steps.

## Conventions & Integration
- **Validation:** All DTOs use class-validator decorators for input validation and error messages (often in German).
- **Multi-language:** Entities and DTOs often have fields for multiple languages (e.g., `bio_de`, `bio_en`, ...).
- **Relations:** Use TypeORM relations for linking entities (e.g., agents to properties).
- **External Services:**
  - Geocoding via `src/common/services/geocoding.service.ts` (uses axios, API key from config)
  - Media uploads via Cloudinary (`src/config/cloudinary.config.ts`)
- **API Auth:** JWT-based, see `src/modules/auth/` and `JwtAuthGuard`.
- **Throttling:** Configured globally and with custom guards.

## Examples
- **Add a new property field:** Update entity, DTO, and migration in `src/modules/property/`.
- **Add a new API route:** Add to controller, service, and update DTOs as needed in the relevant module.
- **Add a migration:** Place new migration in `src/database/migrations/` and update data-source if needed.

## Key Files/Dirs
- `src/app.module.ts`: Main module, imports all feature modules
- `src/database/`: Data source config and migrations
- `src/modules/`: All business logic, organized by domain
- `src/common/`: Shared utilities, guards, and services
- `.env`: Environment variables (not committed)

---
For more, see [README.md](../README.md) and module-specific files. Follow existing patterns for new features. If unsure, ask for clarification or review similar modules for guidance.
