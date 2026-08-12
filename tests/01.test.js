// @vitest-environment node
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
// Strip the solution comment block so its contents don't affect any checks
const src = readFileSync(resolve(__dirname, '../exercises/01.js'), 'utf-8')
const code = src.replace(/\/\*[\s\S]*?\*\//g, '')

describe('Exercise 01 — const and let', () => {
  it('uses no var declarations', () => {
    expect(code).not.toMatch(/\bvar\b/)
  })

  it('declares releaseYear with const', () => {
    expect(code).toMatch(/const\s+releaseYear/)
  })

  it('declares movieTitle with let', () => {
    expect(code).toMatch(/let\s+movieTitle/)
  })

  it('declares isWatched with let', () => {
    expect(code).toMatch(/let\s+isWatched/)
  })

  it('declares rating with let', () => {
    expect(code).toMatch(/let\s+rating/)
  })
})
