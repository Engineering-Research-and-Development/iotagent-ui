export interface Device{
    device_id: string,
    apikey: string,
    service: string,
    service_path: string,
    entity_name: string,
    entity_type: string,
    endpoint: string,
    polling: boolean,
    transport: string,
    attributes: Attribute[],
    lazy: Attribute[],
    commands: Command[],
    static_attributes: StaticAttribute[]
}

export interface Attribute{
  name: string;
  type: string;
  object_id: string;
}

export interface StaticAttribute{
  name: string;
  type: string;
  value: string;
}

export interface Command{
  name: string;
  type: string;
  expression: string;
}
