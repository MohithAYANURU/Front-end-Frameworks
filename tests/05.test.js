// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(resolve(__dirname, '../exercises/05.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

// Run the student's code in a sandbox
// a, b, genres, and remainingGenres are the only reliably named variables
const context = { console: { log: () => {} } }
vm.createContext(context)
vm.runInContext(
  `(function() {
    ${code}
    __a = a
    __b = b
    __genres = genres
    __remainingGenres = remainingGenres
  })()`,
  context
)
const { __a, __b, __genres, __remainingGenres } = context

describe('Exercise 05 — Destructuring Arrays', () => {
  describe('1 — destructure only the first genre', () => {
    it('uses array destructuring from genres', () => {
      expect(code).toMatch(/const\s*\[/)
    })
  })

  describe('2 — destructure first and third genre, skipping second', () => {
    it('uses the empty slot comma pattern [x, , y]', () => {
      expect(code).toMatch(/\[\s*\w+\s*,\s*,\s*\w+\s*\]/)
    })
  })

  describe('3 — first genre and rest into remainingGenres', () => {
    it('uses rest syntax ...remainingGenres', () => {
      expect(code).toMatch(/\.\.\.\s*remainingGenres/)
    })

    it('remainingGenres is ["Sci-Fi", "Thriller"]', () => {
      expect(__remainingGenres).toEqual(['Sci-Fi', 'Thriller'])
    })
  })

  describe('4 — swap a and b without a temp variable', () => {
    it('uses array destructuring to swap', () => {
      expect(code).toMatch(/\[\s*a\s*,\s*b\s*\]\s*=\s*\[\s*b\s*,\s*a\s*\]/)
    })

    it('a is "Comedy" after the swap', () => {
      expect(__a).toBe('Comedy')
    })

    it('b is "Action" after the swap', () => {
      expect(__b).toBe('Action')
    })
  })

  describe('genres array is unchanged', () => {
    it('genres still equals ["Action", "Sci-Fi", "Thriller"]', () => {
      expect(__genres).toEqual(['Action', 'Sci-Fi', 'Thriller'])
    })
  })
})
