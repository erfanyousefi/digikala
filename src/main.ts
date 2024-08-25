import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {SwaggerConfigInit} from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfigInit(app);
  await app.listen(3000, () => {
    console.log("server run: http://localhost:3000");
  });
}
bootstrap();
