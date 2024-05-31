export default class Utils {

    static agentTypesMap: Record<string, string> = {
        "json": "IoTAgent-JSON",
        "lwm2m":  "IoTAgent-LWM2M",
        "ul": "IoTAgent-UL",
        "lorawan":  "IoTAgent-LoRaWAN",
        "opcua": "IoTAgent-OPCUA",
        "aas": "IoTAgent-AAS"
     };

    static buildAgentBaseUrl(agent: any) {
        return `http://${agent.host}:${agent.port}`;
    }

    static buildAgentUrl(agent: any) {
        return `http://${agent.host}:${agent.port}/${agent.apiKey}`;
    }
}
