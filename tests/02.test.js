// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(resolve(__dirname, '../exercises/02.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

// Run the student's code in a sandbox and extract the four functions
const context = { console: { log: () => {} } }
vm.createContext(context)
const fns = vm.runInContext(
  `(function() { ${code}; return { formatTitle, isHighRated, double, toSummary } })()`,
  context
)

describe('Exercise 02 — Arrow Functions', () => {
  describe('source', () => {
    it('uses no function declarations', () => {
      expect(code).not.toMatch(/\bfunction\s+(formatTitle|isHighRated|double|toSummary)\b/)
    })

    it('formatTitle uses arrow syntax', () => {
      expect(code).toMatch(/const\s+formatTitle\s*=.*=>/)
    })

    it('isHighRated uses arrow syntax', () => {
      expect(code).toMatch(/const\s+isHighRated\s*=.*=>/)
    })

    it('double uses arrow syntax', () => {
      expect(code).toMatch(/const\s+double\s*=.*=>/)
    })

    it('toSummary uses arrow syntax with parenthesised object: => ({ ... })', () => {
      expect(code).toMatch(/const\s+toSummary\s*=.*=>\s*\(/)
    })
  })

  describe('runtime', () => {
    it('formatTitle("Inception", 2010) returns "Inception (2010)"', () => {
      expect(fns.formatTitle('Inception', 2010)).toBe('Inception (2010)')
    })

    it('isHighRated returns true for rating >= 8.0', () => {
      expect(fns.isHighRated({ rating: 9.0 })).toBe(true)
      expect(fns.isHighRated({ rating: 8.0 })).toBe(true)
    })

    it('isHighRated returns false for rating < 8.0', () => {
      expect(fns.isHighRated({ rating: 7.9 })).toBe(false)
    })

    it('double(5) returns 10', () => {
      expect(fns.double(5)).toBe(10)
    })

    it('toSummary returns an object with title and rating only', () => {
      expect(fns.toSummary({ title: 'Dune', rating: 8.0 })).toEqual({ title: 'Dune', rating: 8.0 })
    })
  })
})
