import React from "react";
 import Navbar from "../components/shared/navbar";
// import Footer from "../components/shared/footer";

import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { retrieveToken } from "../helpers/TokenManager";
// import auth_actions from "../redux/actions/auth";
// import Notification from "../shared-components/notification/";

import styled from "styled-components";
const Loading = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
`;

class ProtectedLayout extends React.PureComponent {
  render() {
    const {
      component: Component,
      isAuthenticated,
      isTokenInStorage,
      freeze,
      type,
      message,
      ...rest
    } = this.props;
    if (freeze !== true) {
      window.scroll(0, 0);
    }

    return (
      <Route
        {...rest}
        render={matchProps => {
          if (isAuthenticated === false && isTokenInStorage === false) {
            return <Redirect to="/" />;
          } else if (isAuthenticated === false && isTokenInStorage === true) {
            return (
              <div className="ProtectedLayout">
                {/* <Navbar /> */}
                <Loading className="xs-12 i">
                  <div className="c-w">
                    <div className="c t-c">
                      <h3>Loading...</h3>
                    </div>
                  </div>
                </Loading>
                {/* <Footer /> */}
              </div>
            );
          } else {
            return (
              <div className="ProtectedLayout">
                <Navbar />
                <Component {...matchProps} />
                {/* <Footer /> */}
              </div>
            );
          }
        }}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    type: state.auth.type,
    message: state.auth.message,
    isTokenInStorage: retrieveToken() !== undefined
  };
};
export default connect(mapStateToProps)(withRouter(ProtectedLayout));
