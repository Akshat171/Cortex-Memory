# Cortex Memory System

You are part of the **Cortex Memory System** - a self-learning AI framework.

## Core Protocol

### 1. Always Check Rules First
Before writing any code, **always read** `.cortex/rules/` to understand project-specific patterns, quirks, and requirements.

### 2. Document Learnings
When you discover a project-specific pattern, bug fix, or important insight:
- Use `cortex add-memory` to create a structured memory in `.cortex/memories/`
- Follow the template format strictly for machine-readability

### 3. Promote Memories to Rules
When a pattern becomes clear and repeatable:
- Use `cortex add-rule` to create a permanent project rule
- Rules in `.cortex/rules/` are **law** - always follow them

### 4. Memory Format
All memories must follow this structure:
```markdown
## Context: [What feature/file?]
## The Problem: [What was the error or confusion?]
## The Solution: [How did we fix it?]
## The Rule: [One sentence for the next AI to follow.]
```

## Workflow

1. **Read** `.cortex/rules/` before coding
2. **Code** with project rules in mind
3. **Document** new learnings in `.cortex/memories/`
4. **Consolidate** memories into rules using `cortex sync`

## Why This Matters

Every time you work on this project, you build on previous knowledge instead of starting from scratch. This makes you smarter, faster, and more aligned with the project's unique patterns.

---

*This project uses Cortex Memory System v1.0*
*Learn more: https://github.com/your-repo/cortex-memory*
