import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { dataSource } from './data-source';

import { Organization } from './organization.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';


//AdminJS.registerAdapter({ Database, Resource })


const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

/*
const adminjsImport = async () => {
  const { AdminJS } = await import('adminjs');
  const AdminJSTypeorm = await import('@adminjs/typeorm');
  return AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
  });
};*/

@Module({
  imports: [
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    //import('adminjs').then(({ Adminjs }) => Adminjs),
    TypeOrmModule.forRoot({
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
    }),
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [Organization],
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }),
      }),
    ),
    //adminjsImport(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
