import React from 'react'
import type { MediaCollection } from '@vasic-digital/media-types'
import { CollectionCard } from './CollectionCard'

/**
 * Props for the CollectionList component.
 */
export interface CollectionListProps {
  /** Array of collections to render. */
  collections: MediaCollection[]
  /** Optional callback when a collection is opened. */
  onOpen?: (collection: MediaCollection) => void
  /** Optional callback when edit is clicked on a collection. */
  onEdit?: (collection: MediaCollection) => void
  /** Optional callback when delete is clicked on a collection. */
  onDelete?: (collection: MediaCollection) => void
  /** Optional callback to create a new collection; renders a create button when provided. */
  onCreateNew?: () => void
  /** Shows a loading indicator instead of the list when true. */
  isLoading?: boolean
}

/**
 * Renders a grid of CollectionCard components with a header, optional create
 * button, and loading/empty states.
 *
 * @param props - CollectionListProps
 */
export const CollectionList: React.FC<CollectionListProps> = ({
  collections,
  onOpen,
  onEdit,
  onDelete,
  onCreateNew,
  isLoading,
}) => {
  if (isLoading) return <div data-testid="loading">Loading...</div>

  return (
    <div data-testid="collection-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 data-testid="list-title">Collections</h2>
        {onCreateNew && (
          <button data-testid="create-btn" onClick={onCreateNew}>+ New Collection</button>
        )}
      </div>
      {collections.length === 0 ? (
        <div data-testid="empty-state">No collections yet.</div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {collections.map((col) => (
            <CollectionCard
              key={col.id}
              collection={col}
              onOpen={onOpen}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
