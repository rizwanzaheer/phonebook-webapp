import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const RouteWithUserLayout = ({ component, ...rest }) => (
  <div>
    <Header />
    {/* {!localStorage.getItem('token') && <Redirect push to="signin" />} */}
    <Route {...rest} render={() => React.createElement(component)} />
    {/* <Footer /> */}
  </div>
);
const CustomRoutes = () => (
  <Switch>
    {/* User Routes */}
    <RouteWithUserLayout exact path="/" component={HomePage} />
    <Route path="" component={NotFoundPage} />
  </Switch>
);
export default CustomRoutes;
