type ServerLocation = {
  host: string;
  port: number;
};

export type Config = {
  mysql: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  redis: {
    password: string;
    sentinels: ServerLocation[];
    cluster: ServerLocation[];
  };
};
