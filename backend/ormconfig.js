module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'portfolio',
  synchronize: false,
  logging: true,
  entities: ['libs/lib/src/database/entities/**/*entity.ts'],
  migrations: ['libs/lib/src/database/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'libs/lib/src/database/entities',
    migrationsDir: 'libs/lib/src/database/migrations',
  },
};