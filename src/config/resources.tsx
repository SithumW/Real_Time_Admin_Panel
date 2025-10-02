// IResourceItem is the type that defines what a Refine resource looks like
import { IResourceItem } from '@refinedev/core'

// Ant Design icons for the sidebar
import { DashboardOutlined, ProjectOutlined, ShopOutlined } from '@ant-design/icons'

/*
In Refine, a resource represents an API endpoint or entity (like users, posts, orders).
It connects your UI with your backend CRUD operations.
*/

// Define all your resources in one place
export const Resources: IResourceItem[] = [

  {
    name: 'dashboard',   // Resource name (unique key used internally by Refine)
    list: '/',           // Path for the "list" view (here it's your home route)
    meta: {
      label: 'Dashboard',        // Sidebar menu label
      icon: <DashboardOutlined/> // Sidebar menu icon
    }
  },

  {
    name: 'companies',
    list: '/companies',          // Path to list all companies
    show: '/companies:id',       // Path to show a single company
    create: '/companies/new',    // Path to create a new company
    edit: '/companies/edit/:id', // Path to edit a specific company
    meta: {
      label: 'Companies',
      icon: <ShopOutlined/>      // Icon in sidebar
    }
  },

  {
    name: 'tasks',
    list: '/tasks',              // Path to list all tasks
    create: '/tasks/new',        // Path to create a new task
    edit: '/tasks/edit/:id',     // Path to edit a task
    meta: {
      label: 'Tasks',
      icon: <ProjectOutlined/>   // Icon in sidebar
    }
  }

];
