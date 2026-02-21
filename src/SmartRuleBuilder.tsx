import React from 'react'
import type { SmartCollectionRule } from '@vasic-digital/media-types'

export interface SmartRuleBuilderProps {
  rules: SmartCollectionRule[]
  onChange: (rules: SmartCollectionRule[]) => void
}

const OPERATORS = ['eq', 'ne', 'gt', 'lt', 'contains', 'not_contains'] as const

export const SmartRuleBuilder: React.FC<SmartRuleBuilderProps> = ({ rules, onChange }) => {
  const addRule = () => {
    onChange([...rules, { field: 'media_type', operator: 'eq', value: '' }])
  }

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index))
  }

  const updateRule = (index: number, field: keyof SmartCollectionRule, value: string) => {
    const updated = rules.map((r, i) =>
      i === index ? { ...r, [field]: value } : r
    )
    onChange(updated)
  }

  return (
    <div data-testid="smart-rule-builder">
      {rules.map((rule, i) => (
        <div key={i} data-testid={`rule-row-${i}`} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            data-testid={`rule-field-${i}`}
            value={rule.field}
            onChange={(e) => updateRule(i, 'field', e.target.value)}
            placeholder="Field"
          />
          <select
            data-testid={`rule-operator-${i}`}
            value={rule.operator}
            onChange={(e) => updateRule(i, 'operator', e.target.value)}
          >
            {OPERATORS.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
          <input
            data-testid={`rule-value-${i}`}
            value={String(rule.value)}
            onChange={(e) => updateRule(i, 'value', e.target.value)}
            placeholder="Value"
          />
          <button data-testid={`rule-remove-${i}`} onClick={() => removeRule(i)}>×</button>
        </div>
      ))}
      <button data-testid="add-rule-btn" onClick={addRule}>+ Add Rule</button>
    </div>
  )
}
