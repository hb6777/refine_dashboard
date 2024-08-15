import   { Popover, Button } from 'antd'
import {SettingOutlined} from '@ant-design/icons'
import   CustomAvatar  from 'components/custom-avatar'

import {User} from "@/graphql/schema.types"
import { useGetIdentity } from '@refinedev/core'
import { Text } from '../text'
import { useState } from 'react'
import {AccountSettings} from './account-settings'

const CurrentUser = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  const {data : user } = useGetIdentity<User>();

   
  const content = (
    <div style={{display:'flex', flexDirection:'column'}}>

      <Text
        strong
        style={{padding: '12px 20px'}}
      >
        {user?.name}
      </Text>
      <div style={{border:'1px solid #d9d9d9',
        padding:'4px',
        display:'flex',
        gap:'4px',
        flexDirection:'column'
      }}>
        <Button 
          style={{textAlign:'left'}}
          icon={<SettingOutlined />}  
          type="text"
          block
          onClick={()=>setIsOpen(true)}
        > 
        Account Settings
        </Button>
      </div>
    </div>
  )


  return (
    <>
        <Popover
            placement='bottomRight'
            trigger="click"
            overlayInnerStyle={{padding:0}}
            overlayStyle={{zIndex:999}} 
            content={content}
        >
         <CustomAvatar 
            name={user?.name || 'User'} 
            src={user?.avatarUrl}
            size="default"
            style={{cursor: 'pointer' 
            }}   
          />
        </Popover>

        {isOpen && (  
          <AccountSettings 
            opened={isOpen}
            setOpened={setIsOpen}
            userId={user?.id || " "}
          />
        )}
    </>
  )
}

export default CurrentUser

