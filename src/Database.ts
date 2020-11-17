import { createConnection, ConnectionOptions } from 'typeorm'
import { Connection } from 'typeorm/connection/Connection'

export class Database {
  private static connection: Promise<Connection>

  public static createConnection(databaseConfig: ConnectionOptions) {
    if (!Database.connection) {
      Database.connection = createConnection(databaseConfig)
    }

    return Database.connection
  }
}
