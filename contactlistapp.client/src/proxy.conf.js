const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7005';

const PROXY_CONFIG = [
  {
    context: [
      "/api/auth/login",
      "/api/auth/logout",
      "/api/contacts",
      "/api/contacts/edit/:id",
      "/api/categories",
      "/api/categories/:id",
      "/api/subcategories",
      "/api/subcategories/:id",
      "/api/subcategories/category:id"
    ],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
