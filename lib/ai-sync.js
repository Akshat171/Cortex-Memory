const fs = require('fs-extra');
const path = require('path');

/**
 * AI-Powered Memory Consolidation
 * This module uses Claude API to analyze memories and suggest consolidations
 */

class AISync {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.anthropic.com/v1/messages';
  }

  /**
   * Analyze memories and suggest consolidations
   */
  async analyzeMemories(memories) {
    const memoryText = memories.map(m =>
      `File: ${m.file}\n${m.content}\n---\n`
    ).join('\n');

    const prompt = `You are analyzing project memories for the Cortex Memory System.

Your task:
1. Identify duplicate or highly similar memories
2. Find recurring patterns that should become "rules"
3. Suggest which memories can be consolidated

Here are the memories:

${memoryText}

Please respond in JSON format:
{
  "duplicates": [
    {
      "group": ["file1.md", "file2.md"],
      "reason": "Both address the same authentication bug"
    }
  ],
  "patterns": [
    {
      "pattern": "Pattern description",
      "memories": ["file1.md", "file2.md"],
      "suggested_rule": "One sentence rule"
    }
  ],
  "consolidations": [
    {
      "files": ["file1.md", "file2.md", "file3.md"],
      "new_rule_title": "Suggested rule title",
      "new_rule_description": "Description"
    }
  ]
}`;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4096,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.content[0].text;

      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse AI response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      throw new Error(`AI analysis failed: ${error.message}`);
    }
  }

  /**
   * Generate a consolidated rule from multiple memories
   */
  async generateRule(memories, context) {
    const memoryText = memories.map(m => m.content).join('\n\n---\n\n');

    const prompt = `Based on these related memories, generate a single, clear project rule.

Context: ${context}

Memories:
${memoryText}

Generate a rule in this format:
{
  "title": "Clear, concise rule title",
  "category": "Category (e.g., architecture, testing, naming)",
  "description": "Detailed rule description",
  "examples": "Code examples if applicable"
}`;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2048,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.content[0].text;

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse AI response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      throw new Error(`Rule generation failed: ${error.message}`);
    }
  }
}

module.exports = AISync;
