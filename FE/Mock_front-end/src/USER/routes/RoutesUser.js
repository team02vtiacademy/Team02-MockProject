import React from "react";
import { Switch } from "react-router-dom";
import { Route, Router } from "react-router-dom";

import {
  page as pageRoutes
} from "./indexUser";

import AuthLayout from "../../layouts/Auth";
import Page404 from "../../pages/auth/Page404";
import ScrollToTop from "../../components/ScrollToTop";
import LayoutUser from "../layout/LayoutUser";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

  const RoutesUser = () => (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route
            path = "/abc"
            render = {() => (
              <div>hello mother worldd</div>
            )}
          ></Route>
          {childRoutes(LayoutUser, UserHome)}
          {childRoutes(AuthLayout, pageRoutes)}
  
          <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          />
        </Switch>
      </ScrollToTop>
    </Router>
  );
export default RoutesUser;