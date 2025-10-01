// Import UI components from Ant Design
import { Popover, Button } from 'antd'

// Refine hook to get the logged-in user identity
import { useGetIdentity } from '@refinedev/core'

// Custom reusable Avatar component
import CustomAvatar from '../custom-avatar'

// React state hook
import { useState } from 'react'

// User type (generated automatically from your GraphQL schema using codegen)
import type { User } from '@/graphql/schema.types'

// Ant Design icons
import { SettingOutlined } from '@ant-design/icons'

// Custom Text component
import { Text } from '../text'

// Account Settings component
import { AccountSettings } from './account-settings'




// Component to show the currently logged-in user
const CurrentUser = () => {

  // `useGetIdentity` is a Refine hook that fetches current user info
  // `user` will contain details such as name, avatar, etc.
  const { data: user } = useGetIdentity<User>();

  // Local state to track if the settings modal/panel is open
  const [IsOpen, setIsOpen] = useState(false);

  // Content of the Popover (dropdown that shows when clicking avatar)
  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      
      {/* Display user's name in bold text */}
      <Text
        strong
        style={{ padding: '12px 20px' }}
      >
        {user?.name} 
        {/* `?.` ensures no error if user is undefined (optional chaining) */}
      </Text>

      {/* Divider section with settings options */}
      <div
        style={{
          borderTop: '1px solid #d9d9d9',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        {/* Button that opens settings */}
        <Button 
          style={{ textAlign: 'left' }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)} // When clicked, open settings
        >
          Open Settings
          {/* Button text can go here if needed (e.g., "Settings") */}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Ant Design Popover wraps the avatar */}
      <Popover
        placement='bottomRight'   // Position of the popover (below, right aligned)
        trigger='click'           // Open popover when user clicks avatar
        styles={{
          body: { padding: 0 }    // Remove default padding
        }}
        style={{ zIndex: 9999 }}  // Ensure popover appears above everything
        content={content}         // The content defined above
      >
        {/* The user avatar itself (clickable to open popover) */}
        <CustomAvatar
          name={user?.name}       // Show initials if no avatar
          src={user?.avatarUrl}   // Avatar image if available
          size="default"
          style={{ cursor: 'pointer' }} // Indicate clickable
        />
      </Popover>
        {/* If the user is logged in, show the account settings component */}
        {user && (
          <AccountSettings
            opened={IsOpen}
            setOpened={setIsOpen}
            userId={user.id}
          />
        )}

    </>
  );
}

export default CurrentUser;
