---
name: portfolio-publish
description: Publish Astro portfolio to production with safe deploy verification and cache busting
license: MIT
compatibility: opencode
metadata:
  author: AI Agent
  project: Paula Kordevych Portfolio
  repo: /Users/paulakordevych/Desktop/Projekty/Portfolio test
  live_url: https://paula-kordevych.art/
---

# Portfolio Publish Skill

Safe deployment workflow for Astro-based portfolio with cache busting and live verification.

## Overview

This skill handles the complete deployment workflow:
1. Pull newest GitHub changes first
2. Re-apply local work  
3. Generate fresh deploy token for cache busting
4. Build the Astro project
5. Commit and push
6. Wait for live verification

## Default Configuration

- **Repository**: `/Users/paulakordevych/Desktop/Projekty/Portfolio test`
- **Live URL**: `https://paula-kordevych.art/`
- **Deploy Token File**: `src/data/deploy-token.json`
- **Build Command**: `npm run build`

## Workflow

### 1. Confirm Target

Use defaults unless user specifies otherwise:
- repo: `/Users/paulakordevych/Desktop/Projekty/Portfolio test`
- live URL: `https://paula-kordevych.art/`

### 2. Pull First, Always

Check state:
```bash
git status --short
git branch --show-current
git remote -v
```

If local changes exist, stash them:
```bash
git stash push -u -m "temp-before-publish"
```

Pull from GitHub:
```bash
git pull --rebase origin main
```

Re-apply local changes:
```bash
git stash pop
```

If conflicts occur, STOP and resolve. Never discard user's work.

### 3. Generate Deploy Token

Run the token bumping script:
```bash
python3 .opencode/skills/portfolio-publish/scripts/bump_deploy_token.py "/Users/paulakordevych/Desktop/Projekty/Portfolio test"
```

This script:
- Generates a new timestamp-based token
- Updates `src/data/deploy-token.json`
- Ensures Layout.astro imports and displays the token in a meta tag

Capture the printed `token=...` value - needed for verification.

### 4. Build Project

```bash
npm run build
```

Ensure build completes without errors before proceeding.

### 5. Review Changes

```bash
git status --short
git diff --stat
```

Expected changes:
- `src/data/deploy-token.json` (token update)
- `src/layouts/Layout.astro` (if first run)
- Any user-modified files

### 6. Commit and Push

Commit with descriptive message:
```bash
git add .
git commit -m "<describe the change>"
git push origin main
```

Do NOT claim success yet - push ≠ live deploy.

### 7. Wait for Live Deploy

Poll until new token appears:
```bash
python3 .opencode/skills/portfolio-publish/scripts/wait_for_live_token.py "https://paula-kordevych.art/" "<token>"
```

This script:
- Fetches page with no-cache check
- Retries until timeout
- Succeeds only when deployed HTML contains exact token

### 8. Final Report

Report:
1. Whether pull found upstream changes
2. Which files were updated (token + user changes)
3. Commit hash after push
4. Whether live verification succeeded

If live verification fails: explicitly state "push succeeded but deploy confirmation failed".

## Important Notes

- **Cache busting is mandatory** - always generate new token
- **Never skip the pull step** even if repo looks current
- **Never claim live update** without token verification
- **Astro builds static files** to `dist/` which is gitignored - token is embedded at build time via `src/data/deploy-token.json`

## Troubleshooting

**Build fails**: Check for TypeScript errors or missing dependencies
```bash
npm install
npm run build
```

**Token not found in live site**: 
- Check if GitHub Actions workflow completed
- Verify Docker image was built and deployed
- Check live URL is correct

**Conflicts during stash pop**: Resolve manually, ask user if unsure
