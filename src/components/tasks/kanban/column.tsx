import { Text } from '@/components/text'
import { PlusOutlined } from '@ant-design/icons'
import { useDraggable, UseDroppableArguments } from '@dnd-kit/core'
import { Badge, Button, Space, Tooltip } from 'antd'
import React from 'react'
 
type Props = {
  id: string, 
  title: string,
  description?: React.ReactNode, 
  count: number,
  data?: UseDroppableArguments['data'],
  onAddClick? : (args:{id:string})=> void,
}

const KanbanColumn = ({children, id, title, description, count, data,onAddClick}: React.PropsWithChildren<Props>) => {

  const { over, setNodeRef, active } = useDraggable({ id , data })
    
  const onAddHandler = () => { onAddClick?.({id}) }

  return (
    <div 
      ref={setNodeRef}
      style={{
        display:'flex',
        flexDirection:'column',
        padding: '0px 16px',
     //   backgroundColor:'blue'
      }} 
    >
      <div style={{ padding:'12px',
       // backgroundColor:'green' 
        }}>
          <Space style={{width:'100%', justifyContent:'space-between'}}>
              <Space>
                <Text 
                  size="xs"
                  strong
                  style={{
                    textTransform:'uppercase',
                    whiteSpace:'nowrap'
                  }}
                
                  ellipsis={{tooltip:{title}}}>
                   {title}
                </Text>

                  {!!count && <Badge count={count} color="cyan"  />}  
              </Space>
              <Button onClick={onAddHandler} icon={<PlusOutlined />} shape="circle" size="small" />
          </Space>
          {description}
      </div>

      <div
        style={{
          flex:1,
          overflowY: active ? 'unset' : 'scroll',
          border: '2px dashed red',
          borderColor: over ? '#000040' : 'transparent',
          borderRadius: '4px'
        }}  
      >
        <div 
          style={{
              marginTop:'12px', display:'flex', flexDirection:'column', gap: '8px'
        }}>
          {children}
        </div>

      </div>

    </div>
  )
}

export default KanbanColumn
