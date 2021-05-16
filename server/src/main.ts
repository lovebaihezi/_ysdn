import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initializeDataBase from './init';

async function bootstrap() {
    // await initializeDataBase();
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(5050);
}
bootstrap();
