import { Entity, OneToMany } from 'typeorm';
import {
	IdNumberDeleteDateEntity,
	NotNullColum,
	NullColumn,
} from '../database';
import { InfoInventory } from './info-inventory.entity';

@Entity('inventory_management')
export class InventoryManagement extends IdNumberDeleteDateEntity {
	@NullColumn()
	unit: string;

	@NullColumn()
	department: string;

	@NullColumn()
	dateCreate: string;

	@NotNullColum()
	code: string;

	@NotNullColum()
	userDeliver: string;

	@NotNullColum()
	nameInventory: string;

	@NotNullColum()
	address: string;

	@NotNullColum()
	originalDocumentNumber: string;

	@NotNullColum()
	dateSignature: string;

	@OneToMany(
		() => InfoInventory,
		(infoInventory) => infoInventory.inventoryManagement,
	)
	infoInventory: InfoInventory[];
}
