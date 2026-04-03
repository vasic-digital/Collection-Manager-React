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

  it('updates rule field when field input is changed', () => {
    const onChange = vi.fn()
    render(<SmartRuleBuilder rules={rules} onChange={onChange} />)
    fireEvent.change(screen.getByTestId('rule-field-0'), { target: { value: 'genre' } })
    expect(onChange).toHaveBeenCalledWith([
      { field: 'genre', operator: 'eq', value: 'movie' },
    ])
  })

  it('updates rule operator when operator select is changed', () => {
    const onChange = vi.fn()
    render(<SmartRuleBuilder rules={rules} onChange={onChange} />)
    fireEvent.change(screen.getByTestId('rule-operator-0'), { target: { value: 'contains' } })
    expect(onChange).toHaveBeenCalledWith([
      { field: 'media_type', operator: 'contains', value: 'movie' },
    ])
  })

  it('updates rule value when value input is changed', () => {
    const onChange = vi.fn()
    render(<SmartRuleBuilder rules={rules} onChange={onChange} />)
    fireEvent.change(screen.getByTestId('rule-value-0'), { target: { value: 'tv_show' } })
    expect(onChange).toHaveBeenCalledWith([
      { field: 'media_type', operator: 'eq', value: 'tv_show' },
    ])
  })

  it('renders multiple rules with separate rows', () => {
    const multiRules: SmartCollectionRule[] = [
      { field: 'media_type', operator: 'eq', value: 'movie' },
      { field: 'year', operator: 'gt', value: '2020' },
      { field: 'genre', operator: 'contains', value: 'action' },
    ]
    render(<SmartRuleBuilder rules={multiRules} onChange={vi.fn()} />)
    expect(screen.getByTestId('rule-row-0')).toBeTruthy()
    expect(screen.getByTestId('rule-row-1')).toBeTruthy()
    expect(screen.getByTestId('rule-row-2')).toBeTruthy()
    expect(screen.getByTestId('rule-field-1')).toHaveValue('year')
    expect(screen.getByTestId('rule-operator-1')).toHaveValue('gt')
    expect(screen.getByTestId('rule-value-2')).toHaveValue('action')
  })

  it('removes correct rule from the middle of multiple rules', () => {
    const onChange = vi.fn()
    const multiRules: SmartCollectionRule[] = [
      { field: 'media_type', operator: 'eq', value: 'movie' },
      { field: 'year', operator: 'gt', value: '2020' },
      { field: 'genre', operator: 'contains', value: 'action' },
    ]
    render(<SmartRuleBuilder rules={multiRules} onChange={onChange} />)
    fireEvent.click(screen.getByTestId('rule-remove-1'))
    expect(onChange).toHaveBeenCalledWith([
      { field: 'media_type', operator: 'eq', value: 'movie' },
      { field: 'genre', operator: 'contains', value: 'action' },
    ])
  })

  it('renders all operator options in the select', () => {
    render(<SmartRuleBuilder rules={rules} onChange={vi.fn()} />)
    const select = screen.getByTestId('rule-operator-0')
    const options = select.querySelectorAll('option')
    const values = Array.from(options).map((o) => o.getAttribute('value'))
    expect(values).toEqual(['eq', 'ne', 'gt', 'lt', 'contains', 'not_contains'])
  })

  it('updates only the targeted rule when multiple rules exist', () => {
    const onChange = vi.fn()
    const multiRules: SmartCollectionRule[] = [
      { field: 'media_type', operator: 'eq', value: 'movie' },
      { field: 'year', operator: 'gt', value: '2020' },
    ]
    render(<SmartRuleBuilder rules={multiRules} onChange={onChange} />)
    fireEvent.change(screen.getByTestId('rule-value-1'), { target: { value: '2025' } })
    expect(onChange).toHaveBeenCalledWith([
      { field: 'media_type', operator: 'eq', value: 'movie' },
      { field: 'year', operator: 'gt', value: '2025' },
    ])
  })
})
