// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(resolve(__dirname, '../exercises/03.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

// Run the student's code in a sandbox and extract the three variables
const context = { console: { log: () => {} } }
vm.createContext(context)
vm.runInContext(
  `(function() { ${code}; __label = label; __description = description; __summary = summary })()`,
  context
)
const { __label: label, __description: description, __summary: summary } = context

describe('Exercise 03 — Template Literals', () => {
  describe('source', () => {
    it('label uses a template literal', () => {
      expect(code).toMatch(/const\s+label\s*=\s*`/)
    })

    it('description uses a template literal', () => {
      expect(code).toMatch(/const\s+description\s*=\s*`/)
    })

    it('summary uses a template literal', () => {
      expect(code).toMatch(/const\s+summary\s*=\s*`/)
    })

    it('label does not use string concatenation with +', () => {
      // Extract only the label assignment line
      const line = code.match(/const\s+label\s*=.+/)?.[0] ?? ''
      expect(line).not.toMatch(/["']\s*\+/)
    })
  })

  describe('runtime', () => {
    it('label equals "Movie: Inception (2010)"', () => {
      expect(label).toBe('Movie: Inception (2010)')
    })

    it('description contains title, year and rating on separate lines', () => {
      expect(description).toBe('Title: Inception\nYear: 2010\nRating: 8.8/10')
    })

    it('summary equals "Rating is excellent"', () => {
      expect(summary).toBe('Rating is excellent')
    })
  })
})
