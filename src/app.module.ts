import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmConfigService } from 'libs/common/database';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
		}),

		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
			async dataSourceFactory(options) {
				if (!options) throw new Error('Invalid option passed');
				const dataSource = new DataSource(options);
				return addTransactionalDataSource({
					dataSource: dataSource,
				});
			},
		}),

		InventoryModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
