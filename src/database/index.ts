import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// createConnection().then(
//   () => console.log(`🔥 Database connected!`)
// );

export default async (): Promise<Connection> => {
  
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === "test"
      ? "./src/database/database.test.sqlite" : defaultOptions.database,
    })
  );
};

