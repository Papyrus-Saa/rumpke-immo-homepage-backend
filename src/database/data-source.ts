import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const isCompiled = __dirname.includes('dist');
export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [isCompiled ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [isCompiled ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
});
