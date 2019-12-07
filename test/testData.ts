export interface Server {
  name: string;
  country: string;
  flag: string;
  load: number;
}

export const createServer = (fields?: Partial<Server>): Server => {
  const server: Server = {
    ...{
      country: "Sweden",
      flag: "flag",
      load: 0,
      name: "name"
    },
    ...fields
  };
  return server;
};
