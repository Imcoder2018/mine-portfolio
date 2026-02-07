'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers'
import SortableItem from './SortableItem'

interface SortableContainerProps {
  items: Array<{ id: string; enabled?: boolean }>
  onReorder: (oldIndex: number, newIndex: number) => void
  children: (item: { id: string; enabled?: boolean }, index: number) => React.ReactNode
  onToggle?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function SortableContainer({ 
  items, 
  onReorder, 
  children, 
  onToggle,
  onDelete 
}: SortableContainerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over?.id)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(oldIndex, newIndex)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              enabled={item.enabled}
              onToggle={onToggle ? () => onToggle(item.id) : undefined}
              onDelete={onDelete ? () => onDelete(item.id) : undefined}
            >
              {children(item, index)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
