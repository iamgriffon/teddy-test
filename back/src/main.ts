import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/application/modules/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('API for managing clients')
    .setVersion('1.0')
    .addTag('clients')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: []
  })

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1
    },
    customSiteTitle: 'API Documentation'
  })

  await app.listen(8080)
}
bootstrap().catch(console.error)
