import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class InfoDTO {
	@ApiPropertyOptional()
	@IsNotEmpty()
	ordinalNumber: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	nameProduct: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	codeProduct: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	unit: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	quantityDocument: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	quantityReal: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	price: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	money: string;
}

export class InventoryDTO {
	@ApiPropertyOptional()
	@IsNotEmpty()
	unit: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	department: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	dateCreate: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	code: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	userDeliver: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	nameInventory: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	address: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	originalDocumentNumber: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	dateSignature: string;

	@ApiPropertyOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => InfoDTO)
	info: InfoDTO[];
}
