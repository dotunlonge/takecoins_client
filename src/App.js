import React, { Component } from 'react';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/auth/log-in';
import Register from './pages/auth/register';
import Home from './pages/public/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RevProtectedRoute from "./layouts/reversed.protected.layout";
import ProtectedRoute from "./layouts/protected.layout";
import DashHome from './pages/dashboard';
import Store from './pages/public/store/index';

import DashSettings from './pages/dashboard/seller/settings';
import DashProducts from './pages/dashboard/seller/products';
import NewProduct from './pages/dashboard/forms/new.product.form';
import EditProduct from './pages/dashboard/forms/edit.product.form';
import p404 from "./pages/public/p404";
import forgotPassword from './pages/auth/forgot.password';
import myAccount from './pages/dashboard/seller/my-account';

class App extends Component {
  render() {
    return (
    <React.Fragment>
      <ToastContainer/>   
     <Router>
       <Switch>
         
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={Home}/>
        <Route exact path="/instructions" component={Home}/>

        <ProtectedRoute exact path = "/dashboard" component={DashHome}/>
        <ProtectedRoute exact path = "/dashboard/products" component={DashProducts}/>
        <ProtectedRoute exact path = "/dashboard/account" component={myAccount}/>
        
        <ProtectedRoute exact path = "/dashboard/products/new" component={NewProduct}/>
        <ProtectedRoute exact path = "/dashboard/products/edit/:id" component={EditProduct}/>
       
        <ProtectedRoute exact path = "/dashboard/settings" component={DashSettings}/>
        
        <RevProtectedRoute exact path="/login" component={Login}/>
        <RevProtectedRoute exact path="/register" component={Register}/>
        <RevProtectedRoute exact path="/forgot/password" component={forgotPassword}/>
        
        <Route exact path="/:store_name" component={Store}/>
       
        <Route path="/" component={p404}/>
       </Switch>
     </Router>
     </React.Fragment>
       
      );
  }
}

export default App;
