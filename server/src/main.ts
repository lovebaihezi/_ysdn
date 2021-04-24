import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//build uml for application!

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(5050);
}
bootstrap();
