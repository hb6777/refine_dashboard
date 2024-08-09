import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import { Authenticated, ErrorComponent, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { App as AntdApp, ConfigProvider } from "antd";
import { authProvider, dataProvider, liveProvider } from "./providers";

import { Home,  Login, Register, ForgotPassword, CompanyList, CreateCompany, EditCompany }
  from "./pages";


import Layout from "./components/layout";
import { resources } from "./config/resources";

// import {
//   CompanyCreatePage,
//   CompanyEditPage,
//   CompanyListPage,
//   DashboardPage,
//   LoginPage,
//   TasksCreatePage,
//   TasksEditPage,
//   TasksListPage,
// } from "./routes";

import "@refinedev/antd/dist/reset.css"; 
import TasksList from "./pages/tasks/list";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
                useNewQueryKeys: true,
              }}
            >
              <Routes>

                {/* <Route index element={<WelcomePage />} /> */}
                <Route path="/register" index element={<Register />} />
                <Route path="/login" index element={<Login />} />
                <Route path="/forgotPassword" index element={<ForgotPassword />} />

                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >

                  <Route index element={<Home />} />

                  <Route path="/companies">
                    <Route index element={<CompanyList />} />
                    <Route path="new" element={<CreateCompany />} />
                    <Route path="edit/:id" element={<EditCompany />} />
                  </Route>

                  <Route path="/tasks" element={
                    <TasksList>
                      <Outlet />
                    </TasksList>
                  }>
                      <Route path="new" element={<CreateTask />} />
                      <Route path="edit/:id" element={<EditTask />} /> 
                  </Route>
                </Route> 
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;