import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: process.env.DATABASE_TYPE,
			host: process.env.DATABASE_HOST,
			port: +process.env.DATABASE_PORT,
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			namingStrategy: new SnakeNamingStrategy(),
			autoLoadEntities: false,
			synchronize: false,
			logging: ['error', 'query'],
			entities: [__dirname + '/../../**/**/entities/*.entity{.ts,.js}'],
			retryAttempts: 2,
		} as TypeOrmModuleOptions;
	}
}
