# Publishing Cortex Memory to NPM

Follow these steps to publish Cortex Memory as a public NPM package that anyone can install.

## Prerequisites

1. **NPM Account**
   - Go to https://www.npmjs.com/signup
   - Create a free account
   - Verify your email

2. **GitHub Account**
   - You'll need a GitHub account for the repository
   - https://github.com/signup if you don't have one

## Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface

1. Go to https://github.com/new
2. Repository name: `cortex-memory`
3. Description: "Self-learning memory system for Claude Code agents"
4. Public repository (required for free npm packages)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Option B: Using GitHub CLI

```bash
cd cortex-memory
gh repo create cortex-memory --public --source=. --remote=origin
```

## Step 2: Push Code to GitHub

```bash
cd /Users/akshat/Desktop/HQ/humancircle/cortex-memory

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial release: Cortex Memory System v1.0.0"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cortex-memory.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Update package.json

Update these fields in `package.json`:

```json
{
  "name": "cortex-memory",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/cortex-memory.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/cortex-memory/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/cortex-memory#readme"
}
```

## Step 4: Login to NPM

```bash
npm login
```

Enter:
- Username
- Password
- Email (must match your npm account)
- One-time password (if 2FA enabled)

## Step 5: Test Before Publishing

```bash
# Test installation locally
npm pack

# This creates cortex-memory-1.0.0.tgz
# Install it in a test project:
cd /tmp/test-project
npm install /Users/akshat/Desktop/HQ/humancircle/cortex-memory/cortex-memory-1.0.0.tgz

# Test the CLI
npx cortex init
```

## Step 6: Publish to NPM

```bash
cd /Users/akshat/Desktop/HQ/humancircle/cortex-memory

# Dry run (see what will be published)
npm publish --dry-run

# Actual publish
npm publish
```

If the name is taken, you'll get an error. Either:
- Choose a different name (e.g., `@yourname/cortex-memory`)
- Or publish with a scope: `npm publish --access public`

## Step 7: Verify Publication

1. Check NPM: https://www.npmjs.com/package/cortex-memory
2. Test installation:
   ```bash
   npm install -g cortex-memory
   cortex --version
   cortex init
   ```

## Step 8: Share with the World

### Update README.md

Make sure the installation instructions reflect the published package:

```markdown
## Installation

\`\`\`bash
npm install -g cortex-memory
\`\`\`
```

### Create a GitHub Release

1. Go to your repo: `https://github.com/YOUR_USERNAME/cortex-memory`
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: "Cortex Memory v1.0.0 - Initial Release"
5. Description: Copy from CHANGELOG.md
6. Click "Publish release"

### Share on Social Media

Example tweet:
```
🚀 Just launched Cortex Memory - a self-learning system for Claude Code!

Make your AI agent remember project patterns, rules, and solutions.
Every session builds on previous knowledge.

npm install -g cortex-memory

https://github.com/YOUR_USERNAME/cortex-memory

#AI #ClaudeCode #DevTools
```

### Share on Reddit

- r/programming
- r/ArtificialIntelligence
- r/ClaudeAI
- r/coding

## Future Updates

### Versioning

Follow semantic versioning:
- `1.0.1` - Bug fixes
- `1.1.0` - New features (backwards compatible)
- `2.0.0` - Breaking changes

### Publishing Updates

```bash
# Update version in package.json
npm version patch  # for 1.0.1
npm version minor  # for 1.1.0
npm version major  # for 2.0.0

# Push tags to GitHub
git push --tags

# Publish
npm publish
```

### Maintenance

1. **Monitor Issues**
   - Respond to GitHub issues
   - Fix bugs promptly
   - Consider feature requests

2. **Update Dependencies**
   ```bash
   npm outdated
   npm update
   ```

3. **Security**
   ```bash
   npm audit
   npm audit fix
   ```

## Scoped Package (Alternative)

If `cortex-memory` is taken, use a scoped package:

```bash
# Update package.json
{
  "name": "@yourname/cortex-memory"
}

# Publish with public access
npm publish --access public
```

Users install with:
```bash
npm install -g @yourname/cortex-memory
```

## Troubleshooting

### "Package name already exists"
- Use scoped package: `@yourname/cortex-memory`
- Or choose different name: `cortex-ai-memory`

### "You must be logged in"
```bash
npm login
```

### "402 Payment Required"
- Scoped packages need `--access public` flag
```bash
npm publish --access public
```

### "Git working directory not clean"
```bash
git add .
git commit -m "Prepare for publish"
```

## Success Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] package.json updated with correct info
- [ ] Logged into NPM
- [ ] Tested with `npm pack`
- [ ] Published with `npm publish`
- [ ] Verified on npmjs.com
- [ ] Tested global installation
- [ ] Created GitHub release
- [ ] Shared on social media

---

**Congratulations!** 🎉 Your package is now available to developers worldwide!

Anyone can now install Cortex Memory with:
```bash
npm install -g cortex-memory
```
