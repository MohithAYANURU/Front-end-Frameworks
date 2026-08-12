// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(resolve(__dirname, '../exercises/08.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

// Mock fetch — no real network calls in tests
const mockPosts = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Post ${i + 1}` }))

const mockFetch = async (url) => {
  if (url.endsWith('/posts')) {
    return { ok: true, json: async () => mockPosts }
  }
  if (url.endsWith('/posts/1')) {
    return { ok: true, json: async () => ({ id: 1, title: 'Post 1' }) }
  }
  // Any other id simulates a 404
  return { ok: false, status: 404, json: async () => ({}) }
}

// Run code in sandbox with mocked fetch — suppress the bottom-level calls
const context = { fetch: mockFetch, console: { log: () => {}, error: () => {} } }
vm.createContext(context)
vm.runInContext(
  `(function() {
    ${code}
    __fetchPosts   = typeof fetchPosts   !== 'undefined' ? fetchPosts   : undefined
    __getPostById  = typeof getPostById  !== 'undefined' ? getPostById  : undefined
  })()`,
  context
)
const { __fetchPosts, __getPostById } = context

describe('Exercise 08 — async/await', () => {
  describe('fetchPosts', () => {
    it('is defined', () => {
      expect(__fetchPosts).toBeDefined()
    })

    it('is an async function', () => {
      expect(code).toMatch(/async\s+function\s+fetchPosts|fetchPosts\s*=\s*async/)
    })

    it('has try/catch for error handling', () => {
      expect(code).toMatch(/try\s*\{/)
      expect(code).toMatch(/catch\s*\(/)
    })

    it('returns only the first 5 items', async () => {
      const result = await __fetchPosts()
      expect(result).toHaveLength(5)
    })

    it('returned items are from the posts response', async () => {
      const result = await __fetchPosts()
      expect(result[0]).toEqual({ id: 1, title: 'Post 1' })
      expect(result[4]).toEqual({ id: 5, title: 'Post 5' })
    })

    it('logs "Failed to load posts" when fetch throws', async () => {
      const logs = []
      const failContext = {
        fetch: async () => { throw new Error('Network error') },
        console: { log: (...args) => logs.push(args.join(' ')) },
      }
      vm.createContext(failContext)
      vm.runInContext(`(function() { ${code}; __fetchPosts = fetchPosts })()`, failContext)
      await failContext.__fetchPosts()
      expect(logs.some(l => l.includes('Failed to load posts'))).toBe(true)
    })
  })

  describe('getPostById', () => {
    it('is defined', () => {
      expect(__getPostById).toBeDefined()
    })

    it('is an async function', () => {
      expect(code).toMatch(/async\s+function\s+getPostById|getPostById\s*=\s*async/)
    })

    it('checks res.ok and throws if false', () => {
      expect(code).toMatch(/res\.ok/)
      expect(code).toMatch(/throw/)
    })

    it('returns the post object for a valid id', async () => {
      const post = await __getPostById(1)
      expect(post).toEqual({ id: 1, title: 'Post 1' })
    })

    it('throws an error for an invalid id', async () => {
      await expect(__getPostById(99999)).rejects.toThrow()
    })
  })
})
