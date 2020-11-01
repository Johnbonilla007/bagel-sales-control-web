import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';

import {
  Dashboard as DashboardView,
  SignIn as SignInView,
  ProductForm as ProductFormView,
  ProductList as ProductListView
} from './views';
import SalesFormView from './views/sales';
import SaleList from './views/sales/SalesList';

const Routes = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Switch>
      <Redirect exact from="/" to={isAuthenticated ? '/dashboard' : 'signin'} />
      <Route component={SignInView} path="/signin" />

      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={SalesFormView}
        exact
        layout={MainLayout}
        path="/sales/register"
      />
      <RouteWithLayout
        component={SaleList}
        exact
        layout={MainLayout}
        path="/sales"
      />
      <RouteWithLayout
        component={ProductFormView}
        exact
        layout={MainLayout}
        path="/products/register"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
