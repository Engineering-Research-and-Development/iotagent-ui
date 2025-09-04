export interface ConfigGroup {
  _id: string;
  resource: string;
  apikey: string;
  service: string;
  subservice: string;
  entity_type: string;
  __v: number;
  commands: Command[];            
  lazy: Attribute[];
  attributes: Attribute[];
  static_attributes: StaticAttribute[];
  internal_attributes: any[];
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
