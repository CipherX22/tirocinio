import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Organization } from './organization.entity';

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

const adminjsImport = async () => {
  const { AdminJS } = await import('adminjs');
  const AdminJSTypeorm = await import('@adminjs/typeorm');
  return AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
  });
};

@Module({
  imports: [
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    //import('adminjs').then(({ Adminjs }) => Adminjs),
    /*TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'francesco',
      password: 'password',
      database: 'Tirocinio',
      synchronize: true,
      logging: true,
      //options: {
      //  trustServerCertificate: true,
      //},
      entities: [Organization],
      subscribers: [],
      migrations: [],
    }),*/
    import('@adminjs/nestjs').then(async ({ AdminModule }) => {
      await adminjsImport();
      return AdminModule.createAdminAsync({
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
      });
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
