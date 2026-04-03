import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CollectionCard } from '../CollectionCard'
import type { MediaCollection } from '@vasic-digital/media-types'

function makeCollection(overrides: Partial<MediaCollection> = {}): MediaCollection {
  return {
    id: 1,
    name: 'Favorites',
    user_id: 1,
    is_public: false,
    is_smart: false,
    item_count: 5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('CollectionCard', () => {
  it('renders collection name', () => {
    render(<CollectionCard collection={makeCollection()} />)
    expect(screen.getByTestId('collection-name')).toHaveTextContent('Favorites')
  })

  it('shows item count', () => {
    render(<CollectionCard collection={makeCollection({ item_count: 12 })} />)
    expect(screen.getByTestId('collection-count')).toHaveTextContent('12 items')
  })

  it('shows smart badge for smart collections', () => {
    render(<CollectionCard collection={makeCollection({ is_smart: true })} />)
    expect(screen.getByTestId('smart-badge')).toBeTruthy()
  })

  it('shows public badge for public collections', () => {
    render(<CollectionCard collection={makeCollection({ is_public: true })} />)
    expect(screen.getByTestId('public-badge')).toBeTruthy()
  })

  it('calls onOpen when name clicked', () => {
    const onOpen = vi.fn()
    const col = makeCollection()
    render(<CollectionCard collection={col} onOpen={onOpen} />)
    fireEvent.click(screen.getByTestId('collection-name'))
    expect(onOpen).toHaveBeenCalledWith(col)
  })

  it('calls onEdit when edit button clicked', () => {
    const onEdit = vi.fn()
    const col = makeCollection()
    render(<CollectionCard collection={col} onEdit={onEdit} />)
    fireEvent.click(screen.getByTestId('edit-btn'))
    expect(onEdit).toHaveBeenCalledWith(col)
  })

  it('calls onDelete when delete button clicked', () => {
    const onDelete = vi.fn()
    const col = makeCollection()
    render(<CollectionCard collection={col} onDelete={onDelete} />)
    fireEvent.click(screen.getByTestId('delete-btn'))
    expect(onDelete).toHaveBeenCalledWith(col)
  })

  it('shows description when provided', () => {
    render(<CollectionCard collection={makeCollection({ description: 'My faves' })} />)
    expect(screen.getByTestId('collection-description')).toHaveTextContent('My faves')
  })

  it('does not render description when not provided', () => {
    render(<CollectionCard collection={makeCollection()} />)
    expect(screen.queryByTestId('collection-description')).toBeNull()
  })

  it('does not render edit button when onEdit not provided', () => {
    render(<CollectionCard collection={makeCollection()} />)
    expect(screen.queryByTestId('edit-btn')).toBeNull()
  })

  it('does not render delete button when onDelete not provided', () => {
    render(<CollectionCard collection={makeCollection()} />)
    expect(screen.queryByTestId('delete-btn')).toBeNull()
  })

  it('does not show smart badge for non-smart collections', () => {
    render(<CollectionCard collection={makeCollection({ is_smart: false })} />)
    expect(screen.queryByTestId('smart-badge')).toBeNull()
  })

  it('does not show public badge for private collections', () => {
    render(<CollectionCard collection={makeCollection({ is_public: false })} />)
    expect(screen.queryByTestId('public-badge')).toBeNull()
  })

  it('triggers onOpen via Enter key on name element', () => {
    const onOpen = vi.fn()
    const col = makeCollection()
    render(<CollectionCard collection={col} onOpen={onOpen} />)
    fireEvent.keyDown(screen.getByTestId('collection-name'), { key: 'Enter' })
    expect(onOpen).toHaveBeenCalledWith(col)
  })

  it('sets role=button and tabIndex when onOpen is provided', () => {
    render(<CollectionCard collection={makeCollection()} onOpen={vi.fn()} />)
    const name = screen.getByTestId('collection-name')
    expect(name).toHaveAttribute('role', 'button')
    expect(name).toHaveAttribute('tabindex', '0')
  })

  it('does not set role=button when onOpen is not provided', () => {
    render(<CollectionCard collection={makeCollection()} />)
    const name = screen.getByTestId('collection-name')
    expect(name).not.toHaveAttribute('role')
  })

  it('renders zero item count correctly', () => {
    render(<CollectionCard collection={makeCollection({ item_count: 0 })} />)
    expect(screen.getByTestId('collection-count')).toHaveTextContent('0 items')
  })
})
