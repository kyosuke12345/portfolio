const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env

if (!DATABASE_HOST || !DATABASE_PORT || !DATABASE_NAME || !DATABASE_USER || !DATABASE_PASSWORD) {
    throw Error("DB周りの環境変数の設定が不足しています")
}

module.exports = {
  name: 'default',
  type: 'postgres',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT, 10),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['src/database/entities/**/*entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
  },
};