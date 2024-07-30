import { Popover, Button } from 'antd'
import   CustomAvatar  from 'components/custom-avatar'

import {User} from "@/graphql/schema.types"
import { useGetIdentity } from '@refinedev/core'

const CurrentUser = () => {

  const {data : user } = useGetIdentity<User>();

  return (
    <>
        <Popover
            placement='bottomRight'
            trigger="click"
            overlayInnerStyle={{padding:0}}
            overlayStyle={{zIndex:999}} 
        >
         <CustomAvatar 
            name={user?.name || 'User'} 
            src={user?.avatarUrl}
            size="default"
            style={{cursor: 'pointer' 
            }}   
          />
        </Popover>
    </>
  )
}

export default CurrentUser

