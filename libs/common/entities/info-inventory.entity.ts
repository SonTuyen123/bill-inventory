import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdNumberDateEntity, NotNullColum } from '../database';
import { InventoryManagement } from './inventory-management.entity';

@Entity('info_inventory')
export class InfoInventory extends IdNumberDateEntity {
	@NotNullColum()
	ordinalNumber: string;

	@NotNullColum()
	nameProduct: string;

	@NotNullColum()
	codeProduct: string;

	@NotNullColum()
	unit: string;

	@NotNullColum()
	quantityDocument: string;

	@NotNullColum()
	quantityReal: string;

	@NotNullColum()
	price: string;

	@NotNullColum()
	money: string;

	@ManyToOne(
		() => InventoryManagement,
		(inventoryManagement) => inventoryManagement.infoInventory,
	)
	@JoinColumn({ name: 'inventory_management_id' })
	inventoryManagement: InventoryManagement;
	@NotNullColum({ default: null })
	inventoryManagementId: number;
}
