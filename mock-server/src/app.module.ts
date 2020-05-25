import { Module } from '@nestjs/common';
import { AppService } from './service/app.service';
import { LoginController } from './controller/login/login.controller';
import { TableController } from './controller/table/table.controller';

@Module({
	imports: [],
	controllers: [
		LoginController,
		TableController,
	],
	providers: [AppService],
})
export class AppModule {}
