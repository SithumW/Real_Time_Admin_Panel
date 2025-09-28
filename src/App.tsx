import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { GraphQLClient,} from "@refinedev/nestjs-query";


import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Route, Routes } from "react-router";


import { authProvider, dataProvider, liveProvider } from "./providers"; //import dataProvider, liveProvider


function App() {
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
                authProvider={authProvider}


                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "UadGg5-PX9ENF-sFoVLr",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route index element={<WelcomePage />} />
                </Routes>
                <RefineKbar />
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
