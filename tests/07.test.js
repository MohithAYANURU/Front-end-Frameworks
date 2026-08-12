// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(resolve(__dirname, '../exercises/07.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

const context = { console: { log: () => {} } }
vm.createContext(context)
vm.runInContext(
  `(function() {
    ${code}
    __movies      = movies
    __titles      = titles
    __sciFiMovies = sciFiMovies
    __highRated   = highRated
    __parasite    = parasite
    __hasOver9_5  = hasOver9_5
    __sciFiTitles = sciFiTitles
    __titleString = titleString
    __sorted      = sorted
  })()`,
  context
)
const {
  __movies, __titles, __sciFiMovies, __highRated,
  __parasite, __hasOver9_5, __sciFiTitles, __titleString, __sorted,
} = context

describe('Exercise 07 — Array Methods', () => {
  describe('1 — map: array of titles', () => {
    it('uses .map()', () => {
      expect(code).toMatch(/\.map\(/)
    })

    it('titles contains all 6 movie titles', () => {
      expect(__titles).toEqual([
        'Inception', 'The Dark Knight', 'Interstellar', 'Parasite', '1917', 'Tenet',
      ])
    })
  })

  describe('2 — filter: Sci-Fi movies', () => {
    it('uses .filter()', () => {
      expect(code).toMatch(/\.filter\(/)
    })

    it('sciFiMovies contains only Sci-Fi entries', () => {
      expect(__sciFiMovies.every(m => m.genre === 'Sci-Fi')).toBe(true)
    })

    it('sciFiMovies has 3 entries', () => {
      expect(__sciFiMovies).toHaveLength(3)
    })
  })

  describe('3 — filter: movies rated 8.5 or above', () => {
    it('highRated contains only movies with rating >= 8.5', () => {
      expect(__highRated.every(m => m.rating >= 8.5)).toBe(true)
    })

    it('highRated has 4 entries', () => {
      expect(__highRated).toHaveLength(4)
    })
  })

  describe('4 — find: movie titled "Parasite"', () => {
    it('uses .find()', () => {
      expect(code).toMatch(/\.find\(/)
    })

    it('parasite is the correct movie object', () => {
      expect(__parasite).toEqual({ title: 'Parasite', rating: 8.5, genre: 'Thriller', year: 2019 })
    })
  })

  describe('5 — some: any movie rated above 9.5', () => {
    it('uses .some()', () => {
      expect(code).toMatch(/\.some\(/)
    })

    it('hasOver9_5 is false', () => {
      expect(__hasOver9_5).toBe(false)
    })
  })

  describe('6 — filter + map chain: Sci-Fi titles rated above 8.0', () => {
    it('chains .filter() and .map()', () => {
      expect(code).toMatch(/\.filter\([\s\S]*?\.map\(|\.map\([\s\S]*?\.filter\(/)
    })

    it('sciFiTitles contains only qualifying titles', () => {
      expect(__sciFiTitles).toEqual(['Inception', 'Interstellar'])
    })
  })

  describe('7 — join: titles separated by " | "', () => {
    it('uses .join()', () => {
      expect(code).toMatch(/\.join\(/)
    })

    it('titleString is the correct joined string', () => {
      expect(__titleString).toBe(
        'Inception | The Dark Knight | Interstellar | Parasite | 1917 | Tenet'
      )
    })
  })

  describe('8 — sort: by rating descending without mutating original', () => {
    it('uses spread before sort to avoid mutation', () => {
      expect(code).toMatch(/\[\s*\.\.\.\s*movies\s*\]\.sort\(/)
    })

    it('sorted first entry has the highest rating', () => {
      expect(__sorted[0].title).toBe('The Dark Knight')
      expect(__sorted[0].rating).toBe(9.0)
    })

    it('sorted last entry has the lowest rating', () => {
      expect(__sorted[__sorted.length - 1].title).toBe('Tenet')
    })

    it('movies array is unchanged', () => {
      expect(__movies[0].title).toBe('Inception')
      expect(__movies).toHaveLength(6)
    })
  })
})
