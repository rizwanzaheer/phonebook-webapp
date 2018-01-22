import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';
import FeaturePage from 'containers/FeaturePage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SigninPage from 'containers/SigninPage/Loadable';

const RouteWithGlobalLayout = ({ component, ...rest }) => (
  <div>
    <Header />
    {/* {!localStorage.getItem('backoffice_token') && (
      <Redirect push to="/backoffice/signin" />
    )} */}
    <Route {...rest} render={() => React.createElement(component)} />
    <Footer />
  </div>
);
const RouteWithUserLayout = ({ component, ...rest }) => (
  <div>
    <Header />
    {!localStorage.getItem('token') && <Redirect push to="signin" />}
    <Route {...rest} render={() => React.createElement(component)} />
    <Footer />
  </div>
);

const RouteWithAdminLayout = ({ component, ...rest }) => (
  <div>
    <Header />
    {/* {!localStorage.getItem('backoffice_token') && (
      <Redirect push to="/backoffice/signin" />
    )} */}
    <Route {...rest} render={() => React.createElement(component)} />
    <Footer />
  </div>
);

const CustomRoutes = () => (
  <Switch>
    {/* User Routes */}
    <RouteWithUserLayout exact path="/" component={HomePage} />
    {/* dashboard */}
    <RouteWithUserLayout path="/features" component={FeaturePage} />
    <Route path="/signin" component={SigninPage} />
    <Route path="" component={NotFoundPage} />
  </Switch>
);
export default CustomRoutes;
