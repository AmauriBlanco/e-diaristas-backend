/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config';

const dataBase = new TypeOrmConfigService();
export const dataConfigMigrations = new DataSource(
  dataBase.createTypeOrmOptions() as DataSourceOptions,
);
