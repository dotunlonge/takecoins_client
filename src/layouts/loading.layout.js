import React from "react";
import Navbar from "../components/shared/navbar";
import Footer from "../components/shared/footer";

import One from "../components/shared/spinners/one";

const LoadingLayout = () => {
  window.scroll(0, 0);

  return (
    <div className="xs-12" style={{ height: "calc(100vh - 90px)" }}>
      <div className="DefaultLayout i">
        <Navbar />
        <div className="xs-12 i ">
          <div className="c-w i">
            <div className="c t-c">
              <One />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default LoadingLayout;
