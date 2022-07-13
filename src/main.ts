import 'dotenv/config' 
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 3000;

  const config = new DocumentBuilder()
    .setTitle('Test task')
    .setDescription('Test API description')
    .setVersion('1.0')
    .addBearerAuth({ type: "http", name: "authorization", in: "header", scheme: "bearer", bearerFormat: "JWT" })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  await app.listen(port);
  console.log(`Listening on port: ${port}`);
  console.log(`Explore api on http://localhost:${port}/swagger-api`);

}
bootstrap();
