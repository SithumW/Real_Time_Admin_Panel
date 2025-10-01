import { ThemedLayout, ThemedTitle } from '@refinedev/antd'
import React, { Children } from 'react'
import Header from "./header"



// Layout component wraps around protected routes/pages
// - Uses Refine's ThemedLayout for consistent styling
// - Custom Header is injected
// - Title is customized via ThemedTitle
// - Renders children inside the layout

/*ThemedLayout comes from Refine Ant Design package.

It provides a pre-styled layout for admin panels, including:

Sidebar

Header

Footer (if needed)

Content area */


const Layout = ({children}:React.PropsWithChildren) => {
  return (
    <ThemedLayout
    Header = {Header} //Inject custom header


/*Customizes the app title/logo in the header.
ThemedTitle handles Refine-specific theming and props.
In your case, it will always show "Refine". */


    Title ={(titleProps)=> <ThemedTitle {...titleProps} text = "Refine"/> }
    >
        {children} 
        
        {/*This is where your page content goes.

        For example, if you wrap a dashboard or home page inside Layout, it will render inside this content area. */}


    </ThemedLayout>
  )
}

export default Layout