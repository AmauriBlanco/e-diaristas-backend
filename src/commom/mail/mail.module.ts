import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.mailgun.org',
          secure: false,
          port: 587,
          auth: {
            user: config.get('MAILGUN_USERNAME'),
            pass: config.get('MAILGUN_PASS'),
          },
          ignoreTLS: true,
        },
        defaults: {
          from: '"No Reply" <noreply@ediaristas.com>',
        },
        template: {
          dir: '/Users/wesleygado/Documents/ediaristas-multistack/multistack-admin-web-ediariastas-nestjs/src/commom/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
