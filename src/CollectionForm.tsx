import React, { useState } from 'react'
import type { CreateCollectionRequest, SmartCollectionRule } from '@vasic-digital/media-types'
import { SmartRuleBuilder } from './SmartRuleBuilder'

/**
 * Props for the CollectionForm component.
 */
export interface CollectionFormProps {
  /** Pre-populated field values for editing an existing collection. */
  initialValues?: Partial<CreateCollectionRequest>
  /** Called with the form data when the user submits. */
  onSubmit: (data: CreateCollectionRequest) => void
  /** Optional callback when the cancel button is clicked. */
  onCancel?: () => void
  /** Disables the submit button and shows a loading label. */
  isLoading?: boolean
}

/**
 * Form for creating or editing a media collection. Includes fields for name,
 * description, public/smart toggles, and an embedded SmartRuleBuilder when
 * the smart collection option is enabled. Validates that name is non-empty.
 *
 * @param props - CollectionFormProps
 */
export const CollectionForm: React.FC<CollectionFormProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [name, setName] = useState(initialValues.name ?? '')
  const [description, setDescription] = useState(initialValues.description ?? '')
  const [isPublic, setIsPublic] = useState(initialValues.is_public ?? false)
  const [isSmart, setIsSmart] = useState(initialValues.is_smart ?? false)
  const [rules, setRules] = useState<SmartCollectionRule[]>(initialValues.smart_rules ?? [])
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Name is required')
      return
    }
    setError(null)
    onSubmit({
      name: name.trim(),
      description: description || undefined,
      is_public: isPublic,
      is_smart: isSmart,
      smart_rules: isSmart ? rules : undefined,
    })
  }

  return (
    <form data-testid="collection-form" onSubmit={handleSubmit}>
      {error && <div data-testid="form-error" role="alert">{error}</div>}
      <div>
        <label htmlFor="col-name">Name</label>
        <input
          id="col-name"
          data-testid="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}

        />
      </div>
      <div>
        <label htmlFor="col-desc">Description</label>
        <input
          id="col-desc"
          data-testid="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            data-testid="is-public-checkbox"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          {' '}Public
        </label>
      </div>
      <div>
        <label>
          <input
            data-testid="is-smart-checkbox"
            type="checkbox"
            checked={isSmart}
            onChange={(e) => setIsSmart(e.target.checked)}
          />
          {' '}Smart Collection
        </label>
      </div>
      {isSmart && <SmartRuleBuilder rules={rules} onChange={setRules} />}
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button data-testid="submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        {onCancel && (
          <button data-testid="cancel-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
