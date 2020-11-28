import { createConnection, Connection } from 'typeorm'

export class Database {
  private static connection: Connection

  public static async getConnection() {
    if (!Database.connection) {
      Database.connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'reminder',
        entities: [__dirname + '/**/*.entity.ts'],
        synchronize: true,
      })
    }

    return Database.connection
  }
}
