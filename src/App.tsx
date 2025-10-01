import { GitHubBanner, Refine, WelcomePage, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import Layout from "./components/layout"; // Import your custom layout
import { authProvider, dataProvider, liveProvider } from "./providers"; //import dataProvider, liveProvider
import {Home, Login, Register, ForgotPassword} from "./pages"

function App() {
  console.log("App component rendering...");
  
  return (
    <BrowserRouter>
      <GitHubBanner />
          <AntdApp>
            <DevtoolsProvider>
              <Refine
              dataProvider={dataProvider} //responsible for providing data to the entire application
              liveProvider={liveProvider} //providing the live data (ws)
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider} // Re-enabled for login functionality


                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "UadGg5-PX9ENF-sFoVLr",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  {/* Public routes */}
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/forgot-password" element={<ForgotPassword/>} />
                
                
                   {/* Protected routes (only accessible when authenticated).  
         - `Authenticated` checks if the user is logged in.  
         - If not, it redirects (`fallback`) to `/login`.  
         - If yes, it renders `Layout` with an `<Outlet />` inside,  
           meaning child routes will be displayed within the layout. */}
              <Route          
            element={
              <Authenticated
                key="authenticated-layout"
                fallback={<CatchAllNavigate to="/login"/>} // redirect to login if not authenticated
              >
                <Layout>
                  {/* <Outlet /> renders the matched child route inside this layout.
                      For example, the <Home /> component below will appear here. */}
                  <Outlet/>
                </Layout>

              </Authenticated>
            }
          >
            {/* Child routes rendered inside the <Outlet /> */}
            <Route index element={<Home/>} />  
          </Route>
                </Routes>
                
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>

    </BrowserRouter>
  );
}

export default App;
