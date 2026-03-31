import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CollectionList } from '../CollectionList'
import type { MediaCollection } from '@vasic-digital/media-types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCollection(overrides: Partial<MediaCollection> = {}): MediaCollection {
  return {
    id: 1,
    name: 'My Favorites',
    description: 'A collection of favorite media',
    user_id: 42,
    is_public: false,
    is_smart: false,
    item_count: 10,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CollectionList', () => {
  it('renders the collection list container', () => {
    render(<CollectionList collections={[]} />)
    expect(screen.getByTestId('collection-list')).toBeInTheDocument()
  })

  it('renders the "Collections" title', () => {
    render(<CollectionList collections={[]} />)
    expect(screen.getByTestId('list-title')).toHaveTextContent('Collections')
  })

  it('shows empty state when no collections exist', () => {
    render(<CollectionList collections={[]} />)
    expect(screen.getByTestId('empty-state')).toHaveTextContent('No collections yet')
  })

  it('renders collection cards for each collection', () => {
    const collections = [
      makeCollection({ id: 1, name: 'Favorites' }),
      makeCollection({ id: 2, name: 'Watch Later' }),
      makeCollection({ id: 3, name: 'Action Movies' }),
    ]
    render(<CollectionList collections={collections} />)
    expect(screen.getAllByTestId('collection-card')).toHaveLength(3)
  })

  it('shows loading state when isLoading is true', () => {
    render(<CollectionList collections={[]} isLoading={true} />)
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading...')
    expect(screen.queryByTestId('collection-list')).toBeNull()
  })

  it('renders the create button when onCreateNew is provided', () => {
    const onCreateNew = vi.fn()
    render(<CollectionList collections={[]} onCreateNew={onCreateNew} />)
    const createBtn = screen.getByTestId('create-btn')
    expect(createBtn).toBeInTheDocument()
    expect(createBtn).toHaveTextContent('+ New Collection')
  })

  it('calls onCreateNew when create button is clicked', () => {
    const onCreateNew = vi.fn()
    render(<CollectionList collections={[]} onCreateNew={onCreateNew} />)
    fireEvent.click(screen.getByTestId('create-btn'))
    expect(onCreateNew).toHaveBeenCalledTimes(1)
  })

  it('does not render create button when onCreateNew is not provided', () => {
    render(<CollectionList collections={[]} />)
    expect(screen.queryByTestId('create-btn')).toBeNull()
  })

  it('passes onOpen callback to CollectionCards', () => {
    const onOpen = vi.fn()
    const collection = makeCollection()
    render(<CollectionList collections={[collection]} onOpen={onOpen} />)

    fireEvent.click(screen.getByTestId('collection-name'))
    expect(onOpen).toHaveBeenCalledWith(collection)
  })

  it('passes onEdit callback to CollectionCards', () => {
    const onEdit = vi.fn()
    const collection = makeCollection()
    render(<CollectionList collections={[collection]} onEdit={onEdit} />)

    fireEvent.click(screen.getByTestId('edit-btn'))
    expect(onEdit).toHaveBeenCalledWith(collection)
  })

  it('passes onDelete callback to CollectionCards', () => {
    const onDelete = vi.fn()
    const collection = makeCollection()
    render(<CollectionList collections={[collection]} onDelete={onDelete} />)

    fireEvent.click(screen.getByTestId('delete-btn'))
    expect(onDelete).toHaveBeenCalledWith(collection)
  })

  it('renders multiple collections with correct names', () => {
    const collections = [
      makeCollection({ id: 1, name: 'First' }),
      makeCollection({ id: 2, name: 'Second' }),
    ]
    render(<CollectionList collections={collections} />)

    const names = screen.getAllByTestId('collection-name')
    expect(names[0]).toHaveTextContent('First')
    expect(names[1]).toHaveTextContent('Second')
  })

  it('shows empty state instead of cards when collections is empty', () => {
    render(<CollectionList collections={[]} />)
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.queryByTestId('collection-card')).toBeNull()
  })
})
