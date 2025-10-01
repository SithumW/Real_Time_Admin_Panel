// Refine hooks and types for working with Ant Design forms and GraphQL
import { SaveButton, useForm } from "@refinedev/antd";
import type { HttpError } from "@refinedev/core";
import type { GetFields, GetVariables } from "@refinedev/nestjs-query";

// Ant Design icons and components
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Spin } from "antd";

// GraphQL types generated via codegen
import type {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/graphql/types";

// Utility to get name initials
import { getNameInitials } from "@/utilities";

// Custom components
import CustomAvatar from "../custom-avatar";
import { Text } from "../text";

// GraphQL mutation for updating user
import { UPDATE_USER_MUTATION } from "../../graphql/mutations";

// Props for the AccountSettings component
type Props = {
  opened: boolean;                  // Controls whether the Drawer is open
  setOpened: (opened: boolean) => void; // Function to toggle Drawer visibility
  userId: string;                   // ID of the user being edited
};

// Main AccountSettings component
export const AccountSettings = ({ opened, setOpened, userId }: Props) => {

  // useForm hook from Refine to manage form state, data fetching, and mutations
  const {
    saveButtonProps,  // Props to control the SaveButton (loading, disabled, etc.)
    formProps,        // Props for the Ant Design Form (values, onChange, etc.)
    query: queryResult, // Contains the user data fetched from the backend
  } = useForm<
    GetFields<UpdateUserMutation>,                // The fields returned by the mutation
    HttpError,                                   // Error type
    GetVariables<UpdateUserMutationVariables>    // Variables needed for the mutation
  >({
    mutationMode: "optimistic",  // Update UI immediately before server response
    resource: "users",            // The resource we are editing
    action: "edit",               // Action type
    id: userId,                   // User ID to fetch and edit
    meta: {
      gqlMutation: UPDATE_USER_MUTATION,  // GraphQL mutation to update the user
    },
  });

  // Extract avatar URL and name from fetched user data
  const { avatarUrl, name } = queryResult?.data?.data || {};

  // Function to close the Drawer
  const closeModal = () => {
    setOpened(false);
  };

  // Show a loading spinner while data is being fetched
  if (queryResult?.isLoading) {
    return (
      <Drawer
        open={opened}
        width={756}
        styles={{
          body: {
            background: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Spin /> {/* Ant Design loading spinner */}
      </Drawer>
    );
  }

  return (
    <Drawer
      onClose={closeModal}     // Close drawer when clicking outside
      open={opened}            // Control drawer visibility
      width={756}              // Drawer width
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" }, // Hide default header
      }}
    >
      {/* Custom header for the Drawer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => closeModal()} // Close Drawer on click
        />
      </div>

      {/* Drawer content */}
      <div style={{ padding: "16px" }}>
        <Card>
          {/* Ant Design Form controlled by Refine */}
          <Form {...formProps} layout="vertical">
            {/* User avatar */}
            <CustomAvatar
              shape="square"
              src={avatarUrl}
              name={getNameInitials(name || "")} // Fallback to initials if no avatar
              style={{
                width: 96,
                height: 96,
                marginBottom: "24px",
              }}
            />

            {/* Form fields */}
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input placeholder="email" />
            </Form.Item>

            <Form.Item label="Job title" name="jobTitle">
              <Input placeholder="jobTitle" />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input placeholder="Phone" />
            </Form.Item>
          </Form>

          {/* Save button to submit changes */}
          <SaveButton
            {...saveButtonProps}       // Automatically handles loading, disabled, and onClick
            style={{
              display: "block",
              marginLeft: "auto",      // Align button to the right
            }}
          />
        </Card>
      </div>
    </Drawer>
  );
};
