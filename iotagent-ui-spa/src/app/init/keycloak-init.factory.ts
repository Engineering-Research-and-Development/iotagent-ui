
import { KeycloakService } from "keycloak-angular";
import { environment } from 'src/app/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  if(environment.KEYCLOAK_URL) {
    return () =>
      keycloak.init({
        config: {
          url: environment.KEYCLOAK_URL,
          realm: environment.KEYCLOAK_REALM,
          clientId: environment.KEYCLOAK_CLIENT_ID,
        },
        initOptions: {
          checkLoginIframe: false,
          pkceMethod: 'S256',
          redirectUri: environment.KEYCLOAK_REDIRECT_URI,
        }
      });
  } else {
   return () => {}
  }
}
