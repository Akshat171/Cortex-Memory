# Cortex Memory - Quick Start Guide

Get up and running with Cortex Memory in 5 minutes.

## Installation (30 seconds)

```bash
npm install -g cortex-memory
```

## Initialize Your Project (30 seconds)

```bash
cd your-project
cortex init
```

This creates:
- `.cortex/` folder with `memories/` and `rules/`
- `CLAUDE.md` in your project root

## How It Works (2 minutes)

### 1. Claude Reads CLAUDE.md

When you open your project in Claude Code, Claude automatically reads `CLAUDE.md` and learns about the Cortex system.

### 2. Claude Checks Rules Before Coding

Before writing code, Claude reads `.cortex/rules/` to understand your project's patterns.

### 3. You Document Learnings

When you and Claude solve a problem, document it:

```bash
cortex add-memory
```

Fill in:
- **Context:** "React ProductList component"
- **Problem:** "Re-rendering on every keystroke"
- **Solution:** "Used React.memo and useCallback"
- **Rule:** "Memoize components with 100+ items"

### 4. Create Rules from Patterns

When a pattern emerges, make it a rule:

```bash
cortex add-rule
```

### 5. Consolidate Periodically

Weekly, run:

```bash
cortex sync
```

This groups similar memories and suggests consolidations.

## Real Example (2 minutes)

Let's say you're building an authentication system.

### Day 1: First Auth Bug

You and Claude fix a JWT token issue. Document it:

```bash
cortex add-memory
```

```
Context: JWT authentication
Problem: Tokens using HS256 were rejected in production
Solution: Switched to RS256 with RSA keys
Rule: Always use RS256 for production auth tokens
```

This gets saved to `.cortex/memories/2024-01-15-jwt-fix.md`

### Day 3: Similar Issue

You find another auth pattern. After 2-3 similar memories, create a rule:

```bash
cortex add-rule
```

```
Title: JWT Token Standards
Category: security
Description: All JWT tokens must use RS256 signing.
Required claims: user_id, roles, exp, iat.
Max expiration: 24 hours.
```

This gets saved to `.cortex/rules/security-jwt-standards.md`

### Day 5: Claude Applies the Rule

Now when Claude works on auth code, it:
1. Reads `.cortex/rules/security-jwt-standards.md`
2. Automatically follows your JWT pattern
3. No need to explain it again!

## Commands Cheat Sheet

```bash
cortex init              # Initialize in project
cortex add-memory        # Document a learning
cortex add-rule          # Create a project rule
cortex list              # View all memories & rules
cortex list --memories   # View only memories
cortex list --rules      # View only rules
cortex sync              # Consolidate memories
```

## Tips

### ✅ Do This

- Document bugs immediately after fixing them
- Create rules when you see patterns 2-3 times
- Run `cortex sync` weekly
- Commit `.cortex/` to git so your team benefits
- Be specific in memory descriptions

### ❌ Avoid This

- Don't create rules for one-off issues
- Don't write vague memories like "fixed bug"
- Don't skip the Context field
- Don't forget to run sync periodically

## What's Next?

1. **Read Examples**
   - Check `examples/memories/` for memory examples
   - Check `examples/rules/` for rule examples

2. **Customize Templates**
   - Edit `.cortex/template.md` for your team's needs

3. **Share with Team**
   - Commit `.cortex/` and `CLAUDE.md` to git
   - Everyone benefits from shared knowledge

4. **Stay Organized**
   - Run `cortex sync` weekly
   - Convert memories to rules regularly
   - Archive old/consolidated memories

## Need Help?

- **Documentation:** See [README.md](README.md)
- **Examples:** See `examples/` directory
- **Issues:** https://github.com/your-username/cortex-memory/issues
- **Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**You're ready!** Start using Cortex Memory and watch Claude get smarter with every project. 🚀
