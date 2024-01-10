import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListInventory, ListInventoryDTO } from './dto/list.dto';
import { Transactional } from 'typeorm-transactional';
import { InventoryDTO } from './dto/add.dto';
import { PageMetaDto } from '@app/common/dto';
import { InventoryManagement, InfoInventory } from '@app/common/entities';
@Injectable()
export class InventoryService {
	constructor(
		@InjectRepository(InventoryManagement)
		private readonly inventoryManagementRepository: Repository<InventoryManagement>,
		@InjectRepository(InfoInventory)
		private readonly infoInventoryRepository: Repository<InfoInventory>,
	) {}

	async list(data: ListInventoryDTO) {
		const limit = data.limit;
		const offset = data.offset;

		const queryBuilder = this.inventoryManagementRepository
			.createQueryBuilder('inventoryManagement')
			.leftJoinAndSelect('inventoryManagement.infoInventory', 'infoInventory');

		if (limit) {
			queryBuilder.skip(offset).take(limit - offset);
		}
		const [result, total] = await queryBuilder.getManyAndCount();
		return new ListInventory(result, new PageMetaDto({ total: total }));
	}

	@Transactional()
	async add(data: InventoryDTO) {
		const dataKeys = [
			{ key: 'unit', sourceKey: 'unit' },
			{ key: 'department', sourceKey: 'department' },
			{ key: 'dateCreate', sourceKey: 'dateCreate' },
			{ key: 'code', sourceKey: 'code' },
			{ key: 'userDeliver', sourceKey: 'userDeliver' },
			{ key: 'nameInventory', sourceKey: 'nameInventory' },
			{ key: 'address', sourceKey: 'address' },
			{ key: 'originalDocumentNumber', sourceKey: 'originalDocumentNumber' },
			{ key: 'dateSignature', sourceKey: 'dateSignature' },
		];
		const inventory = {};
		dataKeys.forEach(({ key, sourceKey }) => {
			inventory[key] = data[sourceKey];
		});
		const inventoryNew = await this.inventoryManagementRepository.save(
			this.inventoryManagementRepository.create({
				...inventory,
				createdAt: new Date(),
			}),
		);

		for (const item of data.info) {
			const dataKeysInfo = [
				{ key: 'ordinalNumber', sourceKey: 'ordinalNumber' },
				{ key: 'nameProduct', sourceKey: 'nameProduct' },
				{ key: 'codeProduct', sourceKey: 'codeProduct' },
				{ key: 'unit', sourceKey: 'unit' },
				{ key: 'quantityDocument', sourceKey: 'quantityDocument' },
				{ key: 'quantityReal', sourceKey: 'quantityReal' },
				{ key: 'price', sourceKey: 'price' },
				{ key: 'money', sourceKey: 'money' },
			];
			const dataInfoInventory = {};
			dataKeysInfo.forEach(({ key, sourceKey }) => {
				dataInfoInventory[key] = item[sourceKey];
			});

			await this.infoInventoryRepository.save(
				this.infoInventoryRepository.create({
					...dataInfoInventory,
					createdAt: new Date(),
					inventoryManagementId: inventoryNew.id,
				}),
			);
		}

		return { message: 'SUCCESS' };
	}
}
