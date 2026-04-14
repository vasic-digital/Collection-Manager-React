import { describe, it, expect } from 'vitest'
import {
  CollectionList,
  CollectionCard,
  CollectionForm,
  SmartRuleBuilder,
} from '../index'

describe('index exports', () => {
  it('exports CollectionList component', () => {
    expect(CollectionList).toBeDefined()
    expect(typeof CollectionList).toBe('function')
  })

  it('exports CollectionCard component', () => {
    expect(CollectionCard).toBeDefined()
    expect(typeof CollectionCard).toBe('function')
  })

  it('exports CollectionForm component', () => {
    expect(CollectionForm).toBeDefined()
    expect(typeof CollectionForm).toBe('function')
  })

  it('exports SmartRuleBuilder component', () => {
    expect(SmartRuleBuilder).toBeDefined()
    expect(typeof SmartRuleBuilder).toBe('function')
  })
})
