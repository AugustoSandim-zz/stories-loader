var config = {
  development: {
    telegramToken: null,
    insEmail: "storiesloaderatendimento@gmail.com",
    insPass: "hrq1256nk0",
    port: 3000,
    insCookies: "",
    url: "http://127.0.0.1:3000/"
  },
  production: {
    telegramToken: null,
    insEmail: "storiesloaderatendimento@gmail.com",
    insPass: "hrq1256nk0",
    port: process.env.PORT,
    insCookies: "",
    url: "https://stories-loader-web.herokuapp.com/"
  }
};


module.exports = config;
