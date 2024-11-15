
import { KeycloakService } from "keycloak-angular";
import { environment } from 'src/app/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  console.log(environment)
  if(environment.keycloakUrl) {
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloakUrl,
          realm: environment.keycloakRealm,
          clientId: environment.keycloakClientId,
        },
        initOptions: {
          checkLoginIframe: false,
          pkceMethod: 'S256',
          redirectUri: environment.keycloakRedirectUri,
        }
      });
  } else {
   return () => {}
  }
}
