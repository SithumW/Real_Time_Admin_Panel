// Importing a utility function that extracts initials from a given name
import { getNameInitials } from '../utilities';

// Importing Avatar component and its props type from Ant Design (antd library)
import { Avatar as AntdAvatar, AvatarProps } from 'antd';

// Define a custom props type that extends Ant Design's AvatarProps
// and adds an optional `name` property
type Props = AvatarProps & {
    name?: string;
}

// Define the CustomAvatar component
// Destructure `name`, `style`, and any other props passed to it (`...rest`)
const CustomAvatar = ({ name, style, ...rest }: Props) => {
  
  // Utility functions like getNameInitials are stored in a utilities (utils) folder
  // so that they can be reused across the application.

  return (
    <AntdAvatar
      alt={name} // Accessibility: alternate text (usually the person's name)
      size="small" // Sets the size of the avatar (Ant Design supports "small", "default", "large")
      style={{
        backgroundColor: '#87d068', // Greenish background for the avatar circle
        display: 'flex',            // Flex layout for centering content
        alignItems: 'center',       // Vertically center the initials
        border: 'none',             // Remove border styling
        ...style                    // Merge in any additional styles passed as props (Other styles does the ant have)
      }}
      {...rest} // Spread the rest of the props so AntdAvatar can use them (Other properties the ANT use)
    >
      {/* Display the initials of the name. If name is not provided, fallback to an empty string */}
      {getNameInitials(name || '')}
    </AntdAvatar>
  )
}

// Export the component so it can be used in other parts of the app
export default CustomAvatar
