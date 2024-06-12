# IoT Agent User Interface - Single Page Application (SPA)

The Angular-based web Single Page Application (SPA) that enables user-friendly interaction with FIWARE IoT Agents.

## Locally run and test

Remember that SPA always needs the BFF (Backend For Frontend) up and running.

To test the SPA locally, clone the repository and edit the `BFF_API_BASE_URL` in the [environment.ts](./src/app/environment.ts) file, according to your BFF deployment.

From the `iotagent-ui-spa` folder, then run:

```sh
npm i
npx ng serve
```

Open [http://localhost:4200](http://localhost:4200) in a browser.

To run it in a production environment, please consider the parent README.md file in the root of this repository. 
