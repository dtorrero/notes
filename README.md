# Simple Notes App

A minimalist browser-based notes application with persistent storage. All users share the same notes, which are stored on the server.

## Features

- 📝 Clean, simple interface
- 🌓 Dark mode toggle
- 💾 Persistent storage (JSON file)
- 🔄 Auto-save every 30 seconds
- ⌨️ Keyboard shortcut (Ctrl/Cmd + S)
- 🐳 Docker ready with multi-architecture support (amd64, arm64, arm/v7)
- 🌐 Shared across all users
- 🚀 GitHub Actions for automated builds

## Quick Start

### Option 1: Run Locally with Node.js

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

### Option 2: Run with Docker

1. Build the Docker image:
```bash
docker build -t simple-notes .
```

2. Run the container with persistent storage:
```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  --name notes-app \
  simple-notes
```

3. Open your browser to: `http://localhost:3000`

### Option 3: Run with Docker Compose (Local Build)

1. Start the application:
```bash
docker-compose up -d
```

2. Open your browser to: `http://localhost:3000`

3. View logs:
```bash
docker-compose logs -f
```

4. Stop the application:
```bash
docker-compose down
```

### Option 4: Run with Docker Compose (Pre-built Image)

**Copy-paste ready!** Use the pre-built multi-architecture image from GitHub Container Registry:

1. Create a `docker-compose.yml` file:
```yaml
version: '3.8'

services:
  notes-app:
    image: ghcr.io/YOUR_USERNAME/notes:latest
    container_name: simple-notes-app
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - PORT=3000
      - NODE_ENV=production
    restart: unless-stopped
```

2. Replace `YOUR_USERNAME` with your GitHub username

3. If the repository is private, login first:
```bash
docker login ghcr.io -u YOUR_USERNAME
```

4. Start the application:
```bash
docker-compose up -d
```

5. Open your browser to: `http://localhost:3000`

> **Note**: The image supports amd64, arm64, and arm/v7 architectures automatically.

## Multi-Architecture Support

This application supports multiple architectures:
- **linux/amd64** - Standard x86_64 systems
- **linux/arm64** - ARM 64-bit (Raspberry Pi 4, Apple Silicon, AWS Graviton)
- **linux/arm/v7** - ARM 32-bit (Raspberry Pi 3 and older)

Docker will automatically pull the correct image for your architecture.

## GitHub Actions CI/CD

The repository includes automated multi-architecture Docker builds:

- **Triggers**: Push to main/master, tags, or pull requests
- **Builds**: Automatic builds for amd64, arm64, and arm/v7
- **Registry**: Images pushed to GitHub Container Registry (ghcr.io)
- **Tags**: 
  - `latest` - Latest commit on default branch
  - `v*` - Semantic version tags (e.g., v1.0.0)
  - Branch names for feature branches

### Setting Up GitHub Actions

1. Push this repository to GitHub
2. Go to Settings → Actions → General
3. Enable "Read and write permissions" for workflows
4. Push a commit to trigger the workflow
5. Images will be available at `ghcr.io/YOUR_USERNAME/REPO_NAME`

## Docker Commands

**Stop the container:**
```bash
docker stop notes-app
```

**Start the container:**
```bash
docker start notes-app
```

**View logs:**
```bash
docker logs notes-app
```

**Remove the container:**
```bash
docker rm -f notes-app
```

## How It Works

- **Frontend**: Single-page HTML with vanilla JavaScript
- **Backend**: Express.js server with two API endpoints
  - `GET /api/notes` - Retrieve notes
  - `POST /api/notes` - Save notes
- **Storage**: JSON file in `data/notes.json`
- **Persistence**: Docker volume mount ensures data survives container restarts

## File Structure

```
.
├── server.js                      # Express server
├── public/
│   └── index.html                 # Frontend interface with dark mode
├── data/
│   └── notes.json                 # Persistent storage (auto-created)
├── .github/
│   └── workflows/
│       └── docker-build.yml       # Multi-arch Docker builds
├── package.json                   # Dependencies
├── Dockerfile                     # Docker configuration
├── docker-compose.yml             # Docker Compose configuration
└── README.md                      # This file
```

## Notes

- All users see and edit the same notes
- Notes are saved to the server, not browser localStorage
- The Docker volume mount (`-v`) ensures your notes persist even if you remove the container
- Port 3000 is used by default (change with `-p` flag or `PORT` environment variable)

## License

MIT
