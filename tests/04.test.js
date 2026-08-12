// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(resolve(__dirname, '../exercises/04.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

// Capture variables and printMovie output from the sandbox
const logs = []
const context = { console: { log: (...args) => logs.push(args) } }
vm.createContext(context)
vm.runInContext(
  `(function() {
    ${code}
    __title = title
    __year = year
    __rating = rating
    __movieTitle = movieTitle
    __tagline = tagline
    __directorName = directorName
    __printMovie = printMovie
  })()`,
  context
)
const { __title, __year, __rating, __movieTitle, __tagline, __directorName, __printMovie } = context

describe('Exercise 04 — Destructuring Objects', () => {
  describe('1 — destructure title, year, and rating in one line', () => {
    it('uses object destructuring from movie', () => {
      expect(code).toMatch(/const\s*\{[^}]*title[^}]*\}\s*=\s*movie/)
      expect(code).toMatch(/const\s*\{[^}]*year[^}]*\}\s*=\s*movie/)
      expect(code).toMatch(/const\s*\{[^}]*rating[^}]*\}\s*=\s*movie/)
    })

    it('title is "Inception"', () => {
      expect(__title).toBe('Inception')
    })

    it('year is 2010', () => {
      expect(__year).toBe(2010)
    })

    it('rating is 8.8', () => {
      expect(__rating).toBe(8.8)
    })
  })

  describe('2 — nested destructuring of director.directorName', () => {
    it('uses nested destructuring syntax', () => {
      expect(code).toMatch(/director\s*:\s*\{[^}]*directorName/)
    })

    it('directorName is "Christopher Nolan"', () => {
      expect(__directorName).toBe('Christopher Nolan')
    })
  })

  describe('3 — rename title to movieTitle', () => {
    it('uses rename syntax title: movieTitle', () => {
      expect(code).toMatch(/title\s*:\s*movieTitle/)
    })

    it('movieTitle is "Inception"', () => {
      expect(__movieTitle).toBe('Inception')
    })
  })

  describe('4 — default value for missing tagline', () => {
    it('uses default value syntax', () => {
      expect(code).toMatch(/tagline\s*=\s*["']No tagline available["']/)
    })

    it('tagline is "No tagline available"', () => {
      expect(__tagline).toBe('No tagline available')
    })
  })

  describe('5 — destructuring in function parameter', () => {
    it('printMovie uses destructuring in the parameter list', () => {
      expect(code).toMatch(/printMovie\s*\(\s*\{[^}]*title[^}]*year[^}]*\}/)
    })

    it('printMovie logs the correct values', () => {
      const output = []
      __printMovie({ title: 'Dune', year: 2021 }, (...args) => output.push(args))
      // Call with a spy — fallback to checking the captured log from the initial call
      const captured = logs.find(args => args[0] === 'Inception' && args[1] === 2010)
      expect(captured).toBeDefined()
    })
  })
})
