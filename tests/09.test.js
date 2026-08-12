// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(resolve(__dirname, '../exercises/09.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

const logged = []
const context = { console: { log: (...args) => logged.push(args) } }
vm.createContext(context)
vm.runInContext(
  `(function() {
    ${code}
    __directorName     = movie2.director?.name
    __castFirstName    = movie2.cast?.[0]?.name
    __taglineFallback  = movie2.tagline || "No tagline"
    __castFallback     = movie2.cast?.[0]?.name ?? "Unknown cast"
    __formatPosterUrl  = typeof formatPosterUrl !== 'undefined' ? formatPosterUrl : undefined
  })()`,
  context
)
const { __directorName, __castFirstName, __taglineFallback, __castFallback, __formatPosterUrl } = context

describe('Exercise 09 — Optional Chaining and Nullish Coalescing', () => {
  describe('1 — safely access movie2.director.name', () => {
    it('uses optional chaining ?.', () => {
      expect(code).toMatch(/movie2\.director\?\.name/)
    })

    it('returns undefined without throwing', () => {
      expect(__directorName).toBeUndefined()
    })
  })

  describe('2 — tagline fallback with ||', () => {
    it('uses || (not ??) for the fallback', () => {
      expect(code).toMatch(/movie2\.tagline\s*\|\|/)
      expect(code).not.toMatch(/movie2\.tagline\s*\?\?/)
    })

    it('returns "No tagline" for an empty string tagline', () => {
      expect(__taglineFallback).toBe('No tagline')
    })
  })

  describe('3 — safely access first cast member name of movie2', () => {
    it('uses optional chaining on both the array and the property', () => {
      expect(code).toMatch(/movie2\.cast\?\.\[0\]\?\.name/)
    })

    it('returns undefined without throwing', () => {
      expect(__castFirstName).toBeUndefined()
    })
  })

  describe('4 — cast fallback combining ?. and ??', () => {
    it('uses both ?. and ??', () => {
      expect(code).toMatch(/\?\.\[0\]\?\.name\s*\?\?/)
    })

    it('returns "Unknown cast" when cast is missing', () => {
      expect(__castFallback).toBe('Unknown cast')
    })
  })

  describe('5 — formatPosterUrl', () => {
    it('is defined', () => {
      expect(__formatPosterUrl).toBeDefined()
    })

    it('returns the full TMDB URL when poster_path exists', () => {
      const result = __formatPosterUrl({ poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg' })
      expect(result).toBe('https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg')
    })

    it('returns the placeholder URL when poster_path is null', () => {
      const result = __formatPosterUrl({ poster_path: null })
      expect(result).toBe('https://placehold.co/500x750?text=No+Image')
    })

    it('returns the placeholder URL when poster_path is undefined', () => {
      const result = __formatPosterUrl({})
      expect(result).toBe('https://placehold.co/500x750?text=No+Image')
    })
  })
})
