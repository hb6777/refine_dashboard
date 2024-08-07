import { Text } from '@/components/text'
import { User } from '@/graphql/schema.types'
import { DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Dropdown, theme, Tooltip } from 'antd'
import { MenuProps } from 'antd/lib'
import tooltip from 'antd/lib/tooltip'
import React, { useMemo } from 'react'

type ProjectCardProps ={
    id: string,
    title: string,
    updatedAt: string,
    dueDate?: string,
    users?: {
        id:string,
        name:string,
        avatarUrl?: User['avatarUrl']
    }[]  
}

 const {token} = theme.useToken();

const edit = () => {}

const dropdownItems = useMemo(()=>{
    const dropdownItems: MenuProps['items'] = [
        {
            label: 'View Card',
            key: '1',
            icon: <EyeOutlined />,
            onClick: () => {
                edit();
            }
        },
        {
            danger:true,
            label: 'Delete Card',
            key: '2',
            icon: <DeleteOutlined />,
            onClick: ()=> {}
        }, 
    ]

    return dropdownItems
},[])


const ProjectCard = ({id, title, dueDate, users}: ProjectCardProps) => {
  return (
    //<div>{title}</div>
    <ConfigProvider
        theme={{
            components:{
                Tag:{
                    colorText:token.colorTextSecondary,
                },
                Card:{
                    headerBg:'transparent',
                }
            }
        }}
    >
        <Card
            size='small'
            title={<Text ellipsis={{tooltip:title}}>{title}</Text>}
            onClick={()=>edit()}
            extra={
                <Dropdown
                    trigger={['click']}
                    menu={{
                        items: dropdownItems,
                    }}
                >
                    <Button 
                        type="text"
                        shape="circle"
                        icon={<MoreOutlined 
                            style={{
                                transform:('rotate(90deg)')
                            }}
                        />}
                        
                    />
                </Dropdown>
            }
        >

        </Card>
       
    </ConfigProvider>
  )
}

export default ProjectCard
