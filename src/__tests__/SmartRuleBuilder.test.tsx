import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SmartRuleBuilder } from '../SmartRuleBuilder'
import type { SmartCollectionRule } from '@vasic-digital/media-types'

const rules: SmartCollectionRule[] = [
  { field: 'media_type', operator: 'eq', value: 'movie' },
]

describe('SmartRuleBuilder', () => {
  it('renders existing rules', () => {
    render(<SmartRuleBuilder rules={rules} onChange={vi.fn()} />)
    expect(screen.getByTestId('rule-row-0')).toBeTruthy()
    expect(screen.getByTestId('rule-field-0')).toHaveValue('media_type')
    expect(screen.getByTestId('rule-operator-0')).toHaveValue('eq')
    expect(screen.getByTestId('rule-value-0')).toHaveValue('movie')
  })

  it('adds a new rule when add button clicked', () => {
    const onChange = vi.fn()
    render(<SmartRuleBuilder rules={rules} onChange={onChange} />)
    fireEvent.click(screen.getByTestId('add-rule-btn'))
    expect(onChange).toHaveBeenCalledWith([
      ...rules,
      { field: 'media_type', operator: 'eq', value: '' },
    ])
  })

  it('removes rule when remove button clicked', () => {
    const onChange = vi.fn()
    render(<SmartRuleBuilder rules={rules} onChange={onChange} />)
    fireEvent.click(screen.getByTestId('rule-remove-0'))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('renders empty with add button when no rules', () => {
    render(<SmartRuleBuilder rules={[]} onChange={vi.fn()} />)
    expect(screen.getByTestId('add-rule-btn')).toBeTruthy()
    expect(screen.queryByTestId('rule-row-0')).toBeNull()
  })
})
