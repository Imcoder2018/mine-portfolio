'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Eye, EyeOff } from '@/components/icons'

interface SortableItemProps {
  id: string
  children: React.ReactNode
  onToggle?: () => void
  enabled?: boolean
  onDelete?: () => void
}

export default function SortableItem({ id, children, onToggle, enabled, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative"
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 bg-slate-700 rounded text-gray-400 hover:text-white"
        >
          <GripVertical size={16} />
        </div>
      </div>
      
      <div className="pl-8">
        {children}
      </div>
      
      {(onToggle || onDelete) && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onToggle && (
            <button
              onClick={onToggle}
              className={`p-2 rounded-lg transition-all ${
                enabled ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'
              }`}
            >
              {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
