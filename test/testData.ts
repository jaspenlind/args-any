export interface Server {
  name: string;
  country: string;
  flag: string;
  load: number;
}

export const createServer = (fields?: Partial<Server>): Server => {
  const server: Server = {
    ...{
      name: "name",
      country: "Sweden",
      flag: "flag",
      load: 0
    },
    ...fields
  };
  return server;
};
