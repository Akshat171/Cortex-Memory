# Cortex Memory System

**A self-learning memory system for Claude Code agents**

Cortex transforms Claude Code from a stateless AI into a self-learning agent that remembers project patterns, rules, and solutions. Every interaction builds on previous knowledge instead of starting from scratch.

## The Problem

When you use Claude Code:
- It forgets project-specific patterns between sessions
- You repeat the same explanations about your codebase
- Bug fixes and learnings disappear after each conversation
- No institutional knowledge accumulates

## The Solution

Cortex creates a structured memory system:
- **Memories** (.cortex/memories/) - Daily learnings, bug fixes, discoveries
- **Rules** (.cortex/rules/) - Permanent project laws that Claude always follows
- **CLAUDE.md** - System instructions that make Claude "cortex-aware"

## Installation

### Global Installation (Recommended)

```bash
npm install -g cortex-memory
```

### One-time Use (npx)

```bash
npx cortex-memory init
```

### Local Installation

```bash
npm install cortex-memory
npx cortex init
```

## Quick Start

### 1. Initialize Cortex in Your Project

```bash
cd your-project
cortex init
```

This creates:
```
your-project/
├── .cortex/
│   ├── memories/
│   ├── rules/
│   ├── template.md
│   └── README.md
└── CLAUDE.md
```

### 2. Claude Automatically Uses Cortex

Once initialized, Claude Code reads `CLAUDE.md` and:
- Checks `.cortex/rules/` before coding
- Documents learnings in `.cortex/memories/`
- Follows established project patterns

### 3. Add Memories as You Work

When you discover something important:

```bash
cortex add-memory
```

You'll be prompted to fill in:
- **Context:** What feature/file/component?
- **Problem:** What was the error or confusion?
- **Solution:** How did we fix it?
- **Rule:** One sentence summary

### 4. Create Project Rules

When a pattern becomes clear:

```bash
cortex add-rule
```

Rules are **law** - Claude will always follow them.

### 5. Consolidate Memories

Periodically, analyze and consolidate memories:

```bash
cortex sync
```

This groups similar memories and suggests which should become rules.

## Commands

| Command | Description |
|---------|-------------|
| `cortex init` | Initialize Cortex in current project |
| `cortex add-memory` | Add a new memory |
| `cortex add-rule` | Create a permanent rule |
| `cortex list` | View all memories and rules |
| `cortex sync` | Analyze and consolidate memories |

## How It Works

### The Memory Flow

```
┌─────────────────┐
│  Claude works   │
│   on project    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Discovers bug   │
│  or pattern     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ cortex add-     │
│    memory       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  .cortex/       │
│  memories/      │
│  2024-01-15-    │
│  auth-bug.md    │
└────────┬────────┘
         │
         ▼ (after multiple similar memories)
┌─────────────────┐
│  cortex sync    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  cortex add-    │
│     rule        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  .cortex/rules/ │
│  auth-always-   │
│  use-bcrypt.md  │
└─────────────────┘
```

### The Cortex Protocol

When Claude Code sees `CLAUDE.md`, it follows this workflow:

1. **Before coding:** Read `.cortex/rules/`
2. **During coding:** Apply rules and patterns
3. **After solving:** Document in `.cortex/memories/`
4. **Periodically:** Consolidate into rules

## Example Use Cases

### Use Case 1: Authentication Patterns

**Scenario:** Your project uses a specific auth pattern

```bash
# Create a rule
cortex add-rule

# Input:
Title: Authentication Token Structure
Category: security
Description: All auth tokens must use JWT with RS256 signing.
Never use HS256. Include user_id, roles, and exp claims.
```

**Result:** Claude will always follow this pattern when touching auth code.

### Use Case 2: Bug Fixes

**Scenario:** You fix a tricky React rendering bug

```bash
cortex add-memory

# Input:
Context: React rendering in ProductList component
Problem: Component re-rendered on every keystroke causing lag
Solution: Wrapped in React.memo() and used useCallback for handlers
Rule: Always memoize list components with 100+ items
```

**Result:** Next time Claude works on a similar component, it remembers this pattern.

### Use Case 3: Project-Specific Quirks

**Scenario:** Your database has a weird timezone issue

```bash
cortex add-memory

Context: PostgreSQL date queries
Problem: Dates were off by 1 day in production
Solution: Always use AT TIME ZONE 'UTC' in date queries
Rule: All date queries must explicitly set timezone to UTC
```

**Result:** Claude won't make the same mistake twice.

## Advanced Usage

### AI-Powered Sync (Coming Soon)

Future versions will include:
```bash
cortex sync --ai
```

This will:
- Automatically detect duplicate memories
- Suggest rule consolidations
- Generate rules from patterns
- Use Claude API to analyze your memory database

### Custom Templates

Edit `.cortex/template.md` to customize the memory format for your team.

### Integration with CI/CD

Add Cortex checks to your pipeline:

```yaml
# .github/workflows/cortex.yml
- name: Check Cortex Rules
  run: |
    cortex list --rules
    # Ensure critical rules exist
```

## File Structure

### Memory Format (`.cortex/memories/*.md`)

```markdown
## Context: [Feature/file/component]
## The Problem: [What went wrong]
## The Solution: [How you fixed it]
## The Rule: [One sentence takeaway]

---
*Created: 2024-01-15T10:30:00Z*
*Tags: authentication, security*
```

### Rule Format (`.cortex/rules/*.md`)

```markdown
# Rule Title

**Category:** security

## Rule

Detailed description of the rule and when it applies.

## Examples

\`\`\`typescript
// Good: Following the rule
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

// Bad: Violating the rule
const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
\`\`\`

---
*Created: 2024-01-15T10:30:00Z*
```

## Best Practices

### 1. Write Atomic Memories
Each memory should cover ONE specific learning. Don't combine multiple issues.

### 2. Be Specific
Instead of "Fixed bug", write "Fixed React rendering bug by memoizing ProductList"

### 3. Extract Rules Early
When you see a pattern 2-3 times, make it a rule.

### 4. Review Regularly
Run `cortex sync` weekly to keep your memory database clean.

### 5. Team Sync
Commit `.cortex/` to git so the whole team benefits.

## Publishing to NPM

To publish this tool for others to use:

### 1. Update package.json

```json
{
  "name": "cortex-memory",
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/cortex-memory"
  }
}
```

### 2. Create GitHub Repository

```bash
cd cortex-memory
git init
git add .
git commit -m "Initial commit: Cortex Memory System"
git remote add origin https://github.com/your-username/cortex-memory.git
git push -u origin main
```

### 3. Publish to NPM

```bash
npm login
npm publish
```

### 4. Users Can Now Install

```bash
npm install -g cortex-memory
cortex init
```

## Troubleshooting

### "Cortex not initialized"
Run `cortex init` in your project directory.

### "Command not found: cortex"
If installed globally, ensure npm global bin is in your PATH:
```bash
npm config get prefix
# Add <prefix>/bin to your PATH
```

### "CLAUDE.md already exists"
Cortex will ask if you want to append instructions. Choose "yes" to add Cortex to existing instructions.

## Contributing

Contributions welcome! Areas for improvement:
- AI-powered memory consolidation
- Better duplicate detection
- Integration with other AI coding tools
- VSCode extension

## License

MIT

## Credits

Built for the Claude Code community. Inspired by the need for AI agents that learn and improve with every interaction.

---

**Questions?** Open an issue at [github.com/your-username/cortex-memory](https://github.com/your-username/cortex-memory)
# Cortex-Memory
