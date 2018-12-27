import React from 'react';
import Notification from '../shared-components/notification/index';
import { Route } from 'react-router-dom';
import Navbar from "../components/shared/navbar";
import Footer from "../components/shared/footer";

import { withRouter } from 'react-router-dom';

const HomeLayout = ({ component: Component, location, ...rest }) => {
  window.scroll(0, 0);
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div className="HomeLayout">
          <Navbar type="transparent" />
          <Notification />
          <Component {...matchProps} />
          <Footer />
        </div>
      )}
    />
  );
};
export default withRouter(HomeLayout);
