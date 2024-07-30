 import { getNameInitials } from '@/utilities';
import {Avatar as AntAvartar, AvatarProps} from 'antd'

 type Props = AvatarProps & {
    name?: string;
 }

const CustomAvatar = ({name="", style, ...rest}: Props) => {
   
  return (
    <AntAvartar
        alt={name}
        size='small'
        style={{backgroundColor: '#87d068',
            display: 'flex',
            border:'none',
            alignItems:'center',
            ...style
        }} 
        {...rest}
    >
         {getNameInitials(name)}
    </AntAvartar>
  )
}
  
export default CustomAvatar
