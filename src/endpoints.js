let b = "";

if (process.env.NODE_ENV === "development") {
  b = "http://localhost:7007/api/";
} else {
  b = "/";
}
export default {
  b,
  signin: b + "user/signin",
  signup: b + "user/signup",
  update: b + "user/update",
  verify: b + "user/verify",
  password: b + "user/password",
  settings: b + "user/settings",
  get_api_cred: b + "user/credentials",
  verify_email_link: b + "user/verify/email",
  verify_password_reset_link: b + "user/password/reset",
  request_password_reset_link: b + "user/password/reset", // :email
  store: {
    get: b + 'store', 
    process: b + "store/process",
    listen: b + 'store/listen',
    continue_listen: b + 'store/listen/continue'
  },
  transactions: {
    get_buying_orders: b + "my/orders",
    get_purchase_orders: b + "my/purchases",
    daily: b + "my/daily-transactions"
  },
  product: {
    multi: b + "product",
    search: b + "product/search"
  }

};
