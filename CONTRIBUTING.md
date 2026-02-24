# Contributing to Cortex Memory

Thank you for your interest in contributing to Cortex Memory! This document provides guidelines for contributing to the project.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/cortex-memory.git
   cd cortex-memory
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Test Your Changes**
   ```bash
   # Test the CLI locally
   node bin/cortex.js --help

   # Test in a sample project
   mkdir test-project
   cd test-project
   node ../bin/cortex.js init
   ```

## Areas for Contribution

### High Priority

1. **AI-Powered Sync**
   - Implement full AI-powered memory consolidation
   - Use Anthropic API to detect duplicates
   - Auto-generate rules from patterns
   - File: `lib/ai-sync.js`

2. **Better CLI UX**
   - Add interactive mode for all commands
   - Improve error messages
   - Add progress indicators for long operations
   - File: `bin/cortex.js`

3. **Testing**
   - Add unit tests for core functions
   - Add integration tests for CLI commands
   - Test edge cases (empty memories, malformed files)
   - Create test framework

4. **VSCode Extension**
   - Create VSCode extension for Cortex
   - Add sidebar for browsing memories/rules
   - Add commands palette integration
   - Quick add memory from editor

### Medium Priority

5. **Better Duplicate Detection**
   - Improve the basic sync command
   - Use fuzzy matching for similar memories
   - Suggest merges based on content similarity

6. **Templates**
   - Allow custom memory templates
   - Support multiple template types
   - Template variables and placeholders

7. **Search & Filter**
   - Add `cortex search <query>` command
   - Filter by tags, date, category
   - Full-text search in memories

8. **Export & Import**
   - Export memories to markdown/PDF
   - Import from other formats
   - Team sync via git hooks

### Low Priority

9. **Analytics**
   - Track memory growth over time
   - Show most common patterns
   - Memory health metrics

10. **Integration**
    - GitHub Actions integration
    - Slack notifications
    - Discord bot

## Contribution Guidelines

### Code Style

- Use 2 spaces for indentation
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

Follow conventional commits:
```
feat: add AI-powered duplicate detection
fix: handle empty memories directory
docs: update installation instructions
test: add tests for sync command
```

### Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update README if needed

3. **Test Thoroughly**
   ```bash
   npm test
   # Manual testing
   node bin/cortex.js init
   node bin/cortex.js list
   ```

4. **Submit PR**
   - Clear description of changes
   - Link to related issues
   - Screenshots for UI changes

### What We Look For

✅ **Good PRs:**
- Solve a specific problem
- Include tests
- Update documentation
- Follow code style
- Small, focused changes

❌ **PRs to Avoid:**
- Large, unfocused changes
- Breaking existing functionality
- No description or context
- Untested code

## Testing

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] `cortex init` creates all files
- [ ] `cortex add-memory` prompts correctly
- [ ] `cortex add-rule` creates valid rules
- [ ] `cortex list` shows all items
- [ ] `cortex sync` analyzes memories
- [ ] CLAUDE.md integration works
- [ ] Works on clean project
- [ ] Works with existing CLAUDE.md

### Automated Tests (Coming Soon)

We're working on adding automated tests. Contributions welcome!

## Feature Requests

Have an idea? Open an issue with:
- **Problem:** What problem does this solve?
- **Solution:** How would it work?
- **Alternatives:** Other approaches considered
- **Use Case:** Real-world example

## Bug Reports

Found a bug? Open an issue with:
- **Description:** What happened?
- **Expected:** What should happen?
- **Steps:** How to reproduce
- **Environment:** OS, Node version, etc.

## Questions

Not sure about something? Ask!

- Open a GitHub Discussion
- Comment on relevant issues
- Tag maintainers for guidance

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Forever appreciated! 🙏

---

**Thank you for making Cortex better!**
