import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class BaseQuery {
	@ApiPropertyOptional()
	@IsOptional()
	keyword: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsInt({ message: 'Limit must be an integer' })
	@Type(() => Number)
	@Transform(({ value }) => parseInt(value))
	limit: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsInt({ message: 'Offset must be an integer' })
	@Type(() => Number)
	@Transform(({ value }) => parseInt(value))
	offset: number;
}
