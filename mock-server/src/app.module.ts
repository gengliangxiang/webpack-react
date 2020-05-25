import { Module } from '@nestjs/common';
import { AppService } from './service/app.service';
import { LoginController } from './controller/login/login.controller';

@Module({
	imports: [],
	controllers: [
		LoginController,
	],
	providers: [AppService],
})
export class AppModule {}
