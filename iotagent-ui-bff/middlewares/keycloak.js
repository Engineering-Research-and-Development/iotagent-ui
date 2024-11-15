const Keycloak = require("keycloak-connect");

const config = {
  "realm": process.env.KEYCLOAK_REALM,
  "auth-server-url": `${process.env.KEYCLOAK_URL}`,
  "ssl-required": "external",
  "resource": process.env.KEYCLOAK_CLIENT,
  "bearer-only": true,
  "realm-public-key": process.env.KEYCLOAK_REALM_PUBLIC_KEY
}

module.exports = new Keycloak({}, config);
