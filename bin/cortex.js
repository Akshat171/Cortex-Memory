#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

const program = new Command();

// Helper functions
const getCortexPath = () => path.join(process.cwd(), '.cortex');
const getTemplatesPath = () => path.join(__dirname, '..', 'templates');

// Init Command
program
  .command('init')
  .description('Initialize Cortex Memory System in current project')
  .action(async () => {
    try {
      const cortexPath = getCortexPath();
      const templatesPath = getTemplatesPath();

      // Check if already initialized
      if (await fs.pathExists(cortexPath)) {
        console.log(chalk.yellow('⚠️  Cortex already initialized in this project'));
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: 'Reinitialize? This will preserve existing memories and rules.',
            default: false
          }
        ]);
        if (!overwrite) return;
      }

      // Create directory structure
      await fs.ensureDir(path.join(cortexPath, 'memories'));
      await fs.ensureDir(path.join(cortexPath, 'rules'));

      // Copy template.md
      await fs.copy(
        path.join(templatesPath, 'template.md'),
        path.join(cortexPath, 'template.md')
      );

      // Copy CLAUDE.md to project root
      const claudePath = path.join(process.cwd(), 'CLAUDE.md');
      if (await fs.pathExists(claudePath)) {
        console.log(chalk.yellow('⚠️  CLAUDE.md already exists'));
        const { appendCortex } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'appendCortex',
            message: 'Append Cortex instructions to existing CLAUDE.md?',
            default: true
          }
        ]);

        if (appendCortex) {
          const existing = await fs.readFile(claudePath, 'utf-8');
          const cortexTemplate = await fs.readFile(
            path.join(templatesPath, 'CLAUDE.md'),
            'utf-8'
          );
          await fs.writeFile(claudePath, `${existing}\n\n---\n\n${cortexTemplate}`);
        }
      } else {
        await fs.copy(
          path.join(templatesPath, 'CLAUDE.md'),
          claudePath
        );
      }

      // Create README in .cortex
      const readmeContent = `# Cortex Memory System

This directory contains the project's self-learning memory system.

## Structure

- \`/memories/\` - Daily learnings, bug fixes, and discoveries
- \`/rules/\` - Permanent project rules and patterns
- \`template.md\` - Memory format template

## Commands

- \`cortex add-memory\` - Add a new memory
- \`cortex add-rule\` - Add a new rule
- \`cortex sync\` - Consolidate memories into rules
- \`cortex list\` - View all memories and rules

## How It Works

1. Claude reads \`CLAUDE.md\` and learns about the Cortex system
2. Before coding, Claude checks \`.cortex/rules/\` for project patterns
3. After solving problems, Claude documents learnings in \`.cortex/memories/\`
4. Periodically, run \`cortex sync\` to consolidate memories into rules
`;

      await fs.writeFile(path.join(cortexPath, 'README.md'), readmeContent);

      console.log(chalk.green('✓ Cortex Memory System initialized!'));
      console.log(chalk.cyan('\nDirectory structure created:'));
      console.log(chalk.gray('  .cortex/'));
      console.log(chalk.gray('  ├── memories/'));
      console.log(chalk.gray('  ├── rules/'));
      console.log(chalk.gray('  ├── template.md'));
      console.log(chalk.gray('  └── README.md'));
      console.log(chalk.gray('\n  CLAUDE.md (in project root)'));
      console.log(chalk.cyan('\nNext steps:'));
      console.log(chalk.gray('  1. Read CLAUDE.md to understand the system'));
      console.log(chalk.gray('  2. Use "cortex add-memory" to document learnings'));
      console.log(chalk.gray('  3. Use "cortex add-rule" to create project rules'));
      console.log(chalk.gray('  4. Use "cortex sync" to consolidate memories'));

    } catch (error) {
      console.error(chalk.red('Error initializing Cortex:'), error.message);
      process.exit(1);
    }
  });

// Add Memory Command
program
  .command('add-memory')
  .description('Add a new memory using the template')
  .option('-f, --file <name>', 'Memory file name')
  .action(async (options) => {
    try {
      const cortexPath = getCortexPath();
      if (!await fs.pathExists(cortexPath)) {
        console.log(chalk.red('❌ Cortex not initialized. Run "cortex init" first.'));
        process.exit(1);
      }

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'context',
          message: 'Context (feature/file/component):',
          validate: input => input.trim() !== ''
        },
        {
          type: 'input',
          name: 'problem',
          message: 'The Problem:',
          validate: input => input.trim() !== ''
        },
        {
          type: 'input',
          name: 'solution',
          message: 'The Solution:',
          validate: input => input.trim() !== ''
        },
        {
          type: 'input',
          name: 'rule',
          message: 'The Rule (one sentence):',
          validate: input => input.trim() !== ''
        },
        {
          type: 'input',
          name: 'tags',
          message: 'Tags (comma-separated):',
          default: ''
        }
      ]);

      const fileName = options.file ||
        `${new Date().toISOString().split('T')[0]}-${answers.context.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;

      const content = `## Context: ${answers.context}

## The Problem: ${answers.problem}

## The Solution: ${answers.solution}

## The Rule: ${answers.rule}

---
*Created: ${new Date().toISOString()}*
*Tags: ${answers.tags}*
`;

      const filePath = path.join(cortexPath, 'memories', fileName);
      await fs.writeFile(filePath, content);

      console.log(chalk.green(`✓ Memory saved: ${fileName}`));
      console.log(chalk.gray(`  Location: .cortex/memories/${fileName}`));

    } catch (error) {
      console.error(chalk.red('Error adding memory:'), error.message);
      process.exit(1);
    }
  });

// Add Rule Command
program
  .command('add-rule')
  .description('Add a permanent project rule')
  .option('-f, --file <name>', 'Rule file name')
  .action(async (options) => {
    try {
      const cortexPath = getCortexPath();
      if (!await fs.pathExists(cortexPath)) {
        console.log(chalk.red('❌ Cortex not initialized. Run "cortex init" first.'));
        process.exit(1);
      }

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Rule title:',
          validate: input => input.trim() !== ''
        },
        {
          type: 'input',
          name: 'category',
          message: 'Category (e.g., architecture, testing, naming):',
          default: 'general'
        },
        {
          type: 'editor',
          name: 'description',
          message: 'Rule description (will open editor):'
        },
        {
          type: 'input',
          name: 'examples',
          message: 'Examples (optional):',
          default: ''
        }
      ]);

      const fileName = options.file ||
        `${answers.category.toLowerCase()}-${answers.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;

      const content = `# ${answers.title}

**Category:** ${answers.category}

## Rule

${answers.description}

${answers.examples ? `## Examples\n\n${answers.examples}` : ''}

---
*Created: ${new Date().toISOString()}*
`;

      const filePath = path.join(cortexPath, 'rules', fileName);
      await fs.writeFile(filePath, content);

      console.log(chalk.green(`✓ Rule saved: ${fileName}`));
      console.log(chalk.gray(`  Location: .cortex/rules/${fileName}`));
      console.log(chalk.yellow('\n⚠️  Remember: Rules are law. Claude will always follow them.'));

    } catch (error) {
      console.error(chalk.red('Error adding rule:'), error.message);
      process.exit(1);
    }
  });

// List Command
program
  .command('list')
  .description('List all memories and rules')
  .option('-m, --memories', 'Show only memories')
  .option('-r, --rules', 'Show only rules')
  .action(async (options) => {
    try {
      const cortexPath = getCortexPath();
      if (!await fs.pathExists(cortexPath)) {
        console.log(chalk.red('❌ Cortex not initialized. Run "cortex init" first.'));
        process.exit(1);
      }

      const showMemories = !options.rules || options.memories;
      const showRules = !options.memories || options.rules;

      if (showMemories) {
        const memoriesPath = path.join(cortexPath, 'memories');
        const memories = await fs.readdir(memoriesPath);
        const mdMemories = memories.filter(f => f.endsWith('.md'));

        console.log(chalk.cyan(`\n📝 Memories (${mdMemories.length}):`));
        if (mdMemories.length === 0) {
          console.log(chalk.gray('  No memories yet. Use "cortex add-memory" to create one.'));
        } else {
          mdMemories.forEach(file => {
            console.log(chalk.gray(`  • ${file}`));
          });
        }
      }

      if (showRules) {
        const rulesPath = path.join(cortexPath, 'rules');
        const rules = await fs.readdir(rulesPath);
        const mdRules = rules.filter(f => f.endsWith('.md'));

        console.log(chalk.cyan(`\n📜 Rules (${mdRules.length}):`));
        if (mdRules.length === 0) {
          console.log(chalk.gray('  No rules yet. Use "cortex add-rule" to create one.'));
        } else {
          mdRules.forEach(file => {
            console.log(chalk.gray(`  • ${file}`));
          });
        }
      }

      console.log(); // Empty line for spacing

    } catch (error) {
      console.error(chalk.red('Error listing files:'), error.message);
      process.exit(1);
    }
  });

// Sync Command (simplified version - can be enhanced with AI)
program
  .command('sync')
  .description('Analyze memories and suggest consolidation into rules')
  .action(async () => {
    try {
      const cortexPath = getCortexPath();
      if (!await fs.pathExists(cortexPath)) {
        console.log(chalk.red('❌ Cortex not initialized. Run "cortex init" first.'));
        process.exit(1);
      }

      const memoriesPath = path.join(cortexPath, 'memories');
      const memories = await fs.readdir(memoriesPath);
      const mdMemories = memories.filter(f => f.endsWith('.md'));

      if (mdMemories.length === 0) {
        console.log(chalk.yellow('⚠️  No memories to sync.'));
        return;
      }

      console.log(chalk.cyan(`\n🔍 Analyzing ${mdMemories.length} memories...\n`));

      // Read all memories
      const memoryContents = await Promise.all(
        mdMemories.map(async file => ({
          file,
          content: await fs.readFile(path.join(memoriesPath, file), 'utf-8')
        }))
      );

      // Group by tags/context (simple heuristic)
      const groups = {};
      memoryContents.forEach(({ file, content }) => {
        const contextMatch = content.match(/## Context: (.+)/);
        const context = contextMatch ? contextMatch[1].trim() : 'general';
        if (!groups[context]) groups[context] = [];
        groups[context].push({ file, content });
      });

      console.log(chalk.cyan('📊 Grouped memories by context:\n'));
      Object.entries(groups).forEach(([context, items]) => {
        console.log(chalk.yellow(`  ${context} (${items.length} memories)`));
        items.forEach(({ file }) => {
          console.log(chalk.gray(`    • ${file}`));
        });
      });

      console.log(chalk.cyan('\n💡 Suggestions:'));
      console.log(chalk.gray('  • Review memories in each group'));
      console.log(chalk.gray('  • Look for recurring patterns'));
      console.log(chalk.gray('  • Use "cortex add-rule" to create rules from patterns'));
      console.log(chalk.gray('  • Delete or archive consolidated memories'));

      console.log(chalk.yellow('\n🤖 AI-Powered Sync (Coming Soon):'));
      console.log(chalk.gray('  Future versions will use AI to automatically:'));
      console.log(chalk.gray('  • Detect duplicate/similar memories'));
      console.log(chalk.gray('  • Suggest rule consolidations'));
      console.log(chalk.gray('  • Auto-generate rules from patterns'));

    } catch (error) {
      console.error(chalk.red('Error syncing:'), error.message);
      process.exit(1);
    }
  });

program
  .name('cortex')
  .description('Self-learning memory system for Claude Code agents')
  .version('1.0.0');

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
