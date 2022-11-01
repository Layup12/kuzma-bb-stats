import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 9002;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('kuzma-bb-stats')
    .setDescription('documentation REST API')
    .setVersion('1.0.0')
    .addTag('layup')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.setGlobalPrefix('api');

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
