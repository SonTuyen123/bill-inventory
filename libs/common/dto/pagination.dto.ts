import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export class PageMeta {
	@ApiProperty()
	public total: number;

	constructor(total: number) {
		this.total = total;
	}
}

interface IPaginated<T> {
	docs: T[];
	meta?: PageMeta;
}
export function Paginate<T>(classRef: Type<T>) {
	class Paginated implements IPaginated<T> {
		@ApiProperty({ type: classRef, isArray: true })
		docs: T[];

		@ApiProperty({ type: () => PageMeta })
		meta?: PageMeta;

		constructor(docs: T[], meta?: PageMeta) {
			this.docs = docs;
			this.meta = meta;
		}
	}
	return Paginated;
}

export class PageMetaDto {
	@ApiProperty()
	readonly total: number;

	constructor({ total }: IPageMetaDto) {
		this.total = total;
	}
}

interface IPageMetaDto {
	total: number;
}
