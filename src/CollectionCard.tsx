import React from 'react'
import type { MediaCollection } from '@vasic-digital/media-types'

/**
 * Props for the CollectionCard component.
 */
export interface CollectionCardProps {
  /** The collection data to display. */
  collection: MediaCollection
  /** Optional callback when the collection name is clicked. */
  onOpen?: (collection: MediaCollection) => void
  /** Optional callback when delete is clicked. */
  onDelete?: (collection: MediaCollection) => void
  /** Optional callback when edit is clicked. */
  onEdit?: (collection: MediaCollection) => void
}

/**
 * Displays a single media collection as a card with name, description,
 * item count, Smart/Public badges, and optional edit/delete actions.
 *
 * @param props - CollectionCardProps
 */
export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  onOpen,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid="collection-card"
      style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px' }}
    >
      <div
        data-testid="collection-name"
        style={{ fontWeight: 'bold', cursor: onOpen ? 'pointer' : 'default' }}
        onClick={() => onOpen?.(collection)}
        role={onOpen ? 'button' : undefined}
        tabIndex={onOpen ? 0 : undefined}
        onKeyDown={(e) => { if (e.key === 'Enter') onOpen?.(collection) }}
      >
        {collection.name}
      </div>
      {collection.description && (
        <div data-testid="collection-description" style={{ fontSize: '0.9em', color: '#666' }}>
          {collection.description}
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '0.8em', color: '#888' }}>
        <span data-testid="collection-count">{collection.item_count} items</span>
        {collection.is_smart && <span data-testid="smart-badge">Smart</span>}
        {collection.is_public && <span data-testid="public-badge">Public</span>}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {onEdit && (
          <button data-testid="edit-btn" onClick={() => onEdit(collection)}>Edit</button>
        )}
        {onDelete && (
          <button data-testid="delete-btn" onClick={() => onDelete(collection)}>Delete</button>
        )}
      </div>
    </div>
  )
}
