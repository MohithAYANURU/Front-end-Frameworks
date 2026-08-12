// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(resolve(__dirname, '../exercises/06.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

const logged = []
const context = { console: { log: (...args) => logged.push(args) } }
vm.createContext(context)
vm.runInContext(
  `(function() {
    ${code}
    __watchlist  = watchlist
    __newMovies  = newMovies
    __combined   = combined
    __withDune   = withDune
    __copy       = copy
    __merged     = merged
    __updated    = updated
    __logMovies  = logMovies
  })()`,
  context
)
const {
  __watchlist, __newMovies, __combined, __withDune,
  __copy, __merged, __updated, __logMovies,
} = context

describe('Exercise 06 — Spread and Rest', () => {
  describe('1 — combine watchlist and newMovies', () => {
    it('uses spread syntax', () => {
      expect(code).toMatch(/\[\s*\.\.\.\s*watchlist.*\.\.\.\s*newMovies\s*\]/)
    })

    it('combined contains all four titles in order', () => {
      expect(__combined).toEqual(['Inception', 'Interstellar', 'Tenet', 'Oppenheimer'])
    })
  })

  describe('2 — prepend "Dune" to watchlist', () => {
    it('uses spread syntax with "Dune" first', () => {
      expect(code).toMatch(/\[\s*["']Dune["']\s*,\s*\.\.\.\s*watchlist\s*\]/)
    })

    it('withDune starts with "Dune" followed by watchlist contents', () => {
      expect(__withDune).toEqual(['Dune', 'Inception', 'Interstellar'])
    })
  })

  describe('3 — shallow copy of watchlist', () => {
    it('uses spread syntax to copy', () => {
      expect(code).toMatch(/\[\s*\.\.\.\s*watchlist\s*\]/)
    })

    it('copy has the same contents as watchlist', () => {
      expect(__copy).toEqual(['Inception', 'Interstellar'])
    })

    it('copy is a different array reference', () => {
      expect(__copy).not.toBe(__watchlist)
    })
  })

  describe('4 — merge baseInfo and extraInfo', () => {
    it('uses object spread syntax', () => {
      expect(code).toMatch(/\{\s*\.\.\.\s*baseInfo.*\.\.\.\s*extraInfo\s*\}/)
    })

    it('merged contains all four fields', () => {
      expect(__merged).toEqual({ title: 'Dune', year: 2021, rating: 8.0, genre: 'Sci-Fi' })
    })
  })

  describe('5 — new object based on baseInfo with rating overridden to 9.0', () => {
    it('uses spread with an override', () => {
      expect(code).toMatch(/\{\s*\.\.\.\s*baseInfo.*rating\s*:\s*9/)
    })

    it('updated has rating 9.0 and keeps other baseInfo fields', () => {
      expect(__updated).toEqual({ title: 'Dune', year: 2021, rating: 9.0 })
    })
  })

  describe('6 — logMovies accepts any number of titles via rest', () => {
    it('uses rest parameter syntax', () => {
      expect(code).toMatch(/logMovies\s*=\s*\(\s*\.\.\.\w+\s*\)/)
    })

    it('logs each title individually', () => {
      const output = []
      const testContext = { console: { log: (...args) => output.push(...args) } }
      vm.createContext(testContext)
      vm.runInContext(
        `(function() { ${code}; logMovies("Inception", "Dune", "Tenet") })()`,
        testContext
      )
      expect(output).toContain('Inception')
      expect(output).toContain('Dune')
      expect(output).toContain('Tenet')
    })
  })

  describe('originals are unchanged', () => {
    it('watchlist is unchanged', () => {
      expect(__watchlist).toEqual(['Inception', 'Interstellar'])
    })

    it('newMovies is unchanged', () => {
      expect(__newMovies).toEqual(['Tenet', 'Oppenheimer'])
    })
  })
})
