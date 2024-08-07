import { DragOutlined } from '@ant-design/icons'
import { DragOverlay, useDraggable, UseDroppableArguments } from '@dnd-kit/core'
import React from 'react'

type Props = {
    id: string,
    data?: UseDroppableArguments['data'],
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {

    const { attributes, listeners, setNodeRef, active } = useDraggable({
        id, data
    })

    return (
        <div style={{ position: 'relative' }}>
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                style={{
                    opacity: active ? (active.id === id ? 1 : 0.5) : 1,
                    borderRadius: '8px',
                    position: 'relative',
                    cursor: 'grab'
                }}
            >

                {active?.id === id && (
                    <DragOverlay zIndex={1000}>
                        <div style={{
                            borderRadius: '8px',
                            boxShadow: 'box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
                            cursor: 'grabbing'
                        }}>
                            {children}
                        </div>
                    </DragOverlay>
                )}
                {children}
            </div>

        </div>
    )
}

export default KanbanItem
