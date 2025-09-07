<img width="1256" height="656" alt="Screenshot 2025-09-07 at 20 20 53" src="https://github.com/user-attachments/assets/7d4db0b1-fc48-4106-b46a-7702526157ca" />

# Recall


A bookmark management application built in 1.5 hours as a rapid prototyping exercise. Built with Next.js, it lets you save, organize, and manage your favorite links with a simple, clean interface.

## ✨ Features

- **🔖 Bookmark Management**: Save, organize, and manage your favorite links with ease
- **⚡ Speed Built**: Developed in just 1.5 hours as a coding speed run challenge
- **🎨 Modern UI**: Clean interface built with shadcn/ui components and light/dark theme support
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices
- **🗄️ Database Ready**: SQLite for local development, Turso for production deployment
- **🚀 Fast Performance**: Built with Next.js for optimal loading speeds

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- pnpm 10+

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd codex
pnpm install
```

2. **Set up environment variables** - Create `.env` file in the root:
```bash
# For local development (SQLite)
DATABASE_URL=file:../../sqlite/dev.db

# For production (Turso) - add these instead:
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-auth-token
```

3. **Initialize the database**:
```bash
# Create the SQLite database file
mkdir -p sqlite
touch sqlite/dev.db

# Run database migrations and seed data
pnpm --filter @codex/db db:migrate
pnpm --filter @codex/db db:seed
```

4. **Start the development server**:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

This is a Turborepo monorepo with the following packages:

```
codex/
├── apps/
│   └── web/                    # Next.js frontend application
├── packages/
│   ├── db/                     # Database layer with Drizzle ORM
│   ├── ui/                     # Shared UI components (shadcn/ui)
│   ├── eslint-config/          # Shared ESLint configurations
│   └── typescript-config/      # Shared TypeScript configurations
└── sqlite/                     # Local SQLite database files
```

## ⚙️ Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ | Database connection URL | `file:./sqlite/dev.db` (local)<br/>`libsql://db.turso.io` (production) |
| `DATABASE_AUTH_TOKEN` | 🟡 | Database auth token for Turso | Only required for production Turso deployments |

## 📄 License

This project is licensed under the AGPL 3.0 License - see the [LICENSE](LICENSE) file for details.
