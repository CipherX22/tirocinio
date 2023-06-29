import { DataSource } from 'typeorm';
import { Organization } from './organization.entity';

export const dataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 5432,
  username: 'francesco',
  password: 'password',
  database: 'Tirocinio',
  synchronize: true,
  logging: true,
  entities: [Organization],
  subscribers: [],
  migrations: [],
});
