import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CollectionForm } from '../CollectionForm'

describe('CollectionForm', () => {
  it('renders name input', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    expect(screen.getByTestId('name-input')).toBeTruthy()
  })

  it('shows error when submitting with empty name', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(screen.getByTestId('form-error')).toHaveTextContent('Name is required')
  })

  it('calls onSubmit with form data', () => {
    const onSubmit = vi.fn()
    render(<CollectionForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'My Collection' } })
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'My Collection' }))
  })

  it('calls onCancel when cancel button clicked', () => {
    const onCancel = vi.fn()
    render(<CollectionForm onSubmit={vi.fn()} onCancel={onCancel} />)
    fireEvent.click(screen.getByTestId('cancel-btn'))
    expect(onCancel).toHaveBeenCalled()
  })

  it('shows smart rule builder when smart checkbox checked', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    fireEvent.click(screen.getByTestId('is-smart-checkbox'))
    expect(screen.getByTestId('smart-rule-builder')).toBeTruthy()
  })

  it('disables submit button when loading', () => {
    render(<CollectionForm onSubmit={vi.fn()} isLoading={true} />)
    expect(screen.getByTestId('submit-btn')).toBeDisabled()
  })

  it('shows "Saving..." text when loading', () => {
    render(<CollectionForm onSubmit={vi.fn()} isLoading={true} />)
    expect(screen.getByTestId('submit-btn')).toHaveTextContent('Saving...')
  })

  it('shows "Save" text when not loading', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    expect(screen.getByTestId('submit-btn')).toHaveTextContent('Save')
  })

  it('renders description input', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    expect(screen.getByTestId('description-input')).toBeTruthy()
  })

  it('does not show error initially', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    expect(screen.queryByTestId('form-error')).toBeNull()
  })

  it('pre-fills form fields from initialValues (edit mode)', () => {
    render(
      <CollectionForm
        onSubmit={vi.fn()}
        initialValues={{
          name: 'Existing Collection',
          description: 'Existing description',
          is_public: true,
          is_smart: false,
        }}
      />
    )
    expect(screen.getByTestId('name-input')).toHaveValue('Existing Collection')
    expect(screen.getByTestId('description-input')).toHaveValue('Existing description')
    expect(screen.getByTestId('is-public-checkbox')).toBeChecked()
    expect(screen.getByTestId('is-smart-checkbox')).not.toBeChecked()
  })

  it('submits with is_public and is_smart flags', () => {
    const onSubmit = vi.fn()
    render(<CollectionForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Test' } })
    fireEvent.click(screen.getByTestId('is-public-checkbox'))
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Test', is_public: true, is_smart: false })
    )
  })

  it('does not include smart_rules when is_smart is false', () => {
    const onSubmit = vi.fn()
    render(<CollectionForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Test' } })
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ smart_rules: undefined })
    )
  })

  it('does not render cancel button when onCancel not provided', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    expect(screen.queryByTestId('cancel-btn')).toBeNull()
  })

  it('trims whitespace from name before submitting', () => {
    const onSubmit = vi.fn()
    render(<CollectionForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: '  Trimmed  ' } })
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Trimmed' })
    )
  })

  it('treats whitespace-only name as empty and shows error', () => {
    const onSubmit = vi.fn()
    render(<CollectionForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: '   ' } })
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(screen.getByTestId('form-error')).toHaveTextContent('Name is required')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('clears error after valid submission following a failed one', () => {
    const onSubmit = vi.fn()
    render(<CollectionForm onSubmit={onSubmit} />)
    // First submit with empty name
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(screen.getByTestId('form-error')).toBeTruthy()
    // Then fill name and submit again
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Valid Name' } })
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(screen.queryByTestId('form-error')).toBeNull()
  })

  it('pre-fills smart rules from initialValues and shows rule builder', () => {
    render(
      <CollectionForm
        onSubmit={vi.fn()}
        initialValues={{
          name: 'Smart',
          is_smart: true,
          smart_rules: [{ field: 'genre', operator: 'eq', value: 'action' }],
        }}
      />
    )
    expect(screen.getByTestId('smart-rule-builder')).toBeTruthy()
    expect(screen.getByTestId('rule-row-0')).toBeTruthy()
    expect(screen.getByTestId('rule-field-0')).toHaveValue('genre')
  })

  it('submits with smart_rules when is_smart is true', () => {
    const onSubmit = vi.fn()
    render(
      <CollectionForm
        onSubmit={onSubmit}
        initialValues={{
          name: 'Smart Collection',
          is_smart: true,
          smart_rules: [{ field: 'genre', operator: 'eq', value: 'action' }],
        }}
      />
    )
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        is_smart: true,
        smart_rules: [{ field: 'genre', operator: 'eq', value: 'action' }],
      })
    )
  })

  it('sends description as undefined when left empty', () => {
    const onSubmit = vi.fn()
    render(<CollectionForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Test' } })
    fireEvent.click(screen.getByTestId('submit-btn'))
    const call = onSubmit.mock.calls[0][0]
    expect(call.description).toBeUndefined()
  })

  it('sends description when provided', () => {
    const onSubmit = vi.fn()
    render(<CollectionForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Test' } })
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'A description' } })
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ description: 'A description' })
    )
  })

  it('hides smart rule builder when smart checkbox is unchecked', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    // Enable smart
    fireEvent.click(screen.getByTestId('is-smart-checkbox'))
    expect(screen.getByTestId('smart-rule-builder')).toBeTruthy()
    // Disable smart
    fireEvent.click(screen.getByTestId('is-smart-checkbox'))
    expect(screen.queryByTestId('smart-rule-builder')).toBeNull()
  })

  it('updates description input value', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'My desc' } })
    expect(screen.getByTestId('description-input')).toHaveValue('My desc')
  })

  it('defaults initialValues to empty when not provided', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    expect(screen.getByTestId('name-input')).toHaveValue('')
    expect(screen.getByTestId('description-input')).toHaveValue('')
    expect(screen.getByTestId('is-public-checkbox')).not.toBeChecked()
    expect(screen.getByTestId('is-smart-checkbox')).not.toBeChecked()
  })

  it('renders the form element with data-testid', () => {
    render(<CollectionForm onSubmit={vi.fn()} />)
    expect(screen.getByTestId('collection-form')).toBeTruthy()
  })
})
