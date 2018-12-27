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
  get_api_cred: b + "user/credentials",
  verify_email_link: b + "user/verify/email",
  verify_password_reset_link: b + "api/user/password/reset",
  request_password_reset_link: b + "api/user/password/reset", // :email
  store: {
    get: b + 'store', 
    process: b + "store/process"
  },
  product: {
    multi: b + "product"
  }

};
