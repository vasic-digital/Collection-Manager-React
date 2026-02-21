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
})
