import React from 'react'
import type { MediaCollection } from '@vasic-digital/media-types'
import { CollectionCard } from './CollectionCard'

export interface CollectionListProps {
  collections: MediaCollection[]
  onOpen?: (collection: MediaCollection) => void
  onEdit?: (collection: MediaCollection) => void
  onDelete?: (collection: MediaCollection) => void
  onCreateNew?: () => void
  isLoading?: boolean
}

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
