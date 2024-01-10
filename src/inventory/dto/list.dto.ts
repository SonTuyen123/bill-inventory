import { Paginate } from '@app/common/dto';
import { BaseQuery } from '@app/common/dto/base-query.dto';
import { InfoInventory, InventoryManagement } from '@app/common/entities';

export class ListInventoryDTO extends BaseQuery {}

export class InventoryInfo {
	id: number;
	unit: string;
	department: string;
	code: string;
	userDeliver: string;
	nameInventory: string;
	address: string;
	originalDocumentNumber: string;
	infoInventory: InfoInventory[];
	constructor(entity: InventoryManagement) {
		this.id = entity.id;
		this.unit = entity.unit;
		this.department = entity.department;
		this.code = entity.code;
		this.userDeliver = entity.userDeliver;
		this.nameInventory = entity.nameInventory;
		this.address = entity.address;
		this.originalDocumentNumber = entity.originalDocumentNumber;
		this.infoInventory = entity.infoInventory;
	}
}

export class ListInventory extends Paginate(InventoryInfo) {}
