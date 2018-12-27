import React from "react";

import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { retrieveToken } from "../helpers/TokenManager";
import styled from "styled-components";
const Loading = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
`;

class RevProtectedLayout extends React.PureComponent {
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
          if (isAuthenticated === true && isTokenInStorage === true) {
            return <Redirect to="/dashboard" />;
          } else if (isAuthenticated === false && isTokenInStorage === true) {
            return (
              <div className="ProtectedLayout">
                <Loading className="xs-12 i">
                  <div className="c-w">
                    <div className="c t-c">
                      <h3>Loading...</h3>
                    </div>
                  </div>
                </Loading>
              </div>
            );
          } else {
            return (
              <div className="ProtectedLayout">
                <Component {...matchProps} />
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
export default connect(mapStateToProps)(withRouter(RevProtectedLayout));
