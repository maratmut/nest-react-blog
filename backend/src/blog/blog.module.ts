import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationMiddleware } from 'src/common/authentication.middleware';
import { BlogSchema } from 'src/schemas/blog.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])], // add this
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/blog/post' },
        { method: RequestMethod.PUT, path: '/blog/edit' },
        { method: RequestMethod.DELETE, path: '/blog/delete' },
      );
  }
}
