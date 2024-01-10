import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from '../src/inventory/inventory.controller';
import { InventoryService } from '../src/inventory/inventory.service';
import { InventoryDTO } from '../src/inventory/dto/add.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoInventory, InventoryManagement } from '@app/common/entities';
import { ListInventoryDTO } from '../src/inventory/dto/list.dto';

describe('InventoryController', () => {
	let controller: InventoryController;
	let service: InventoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: 'postgres',
					host: process.env.DATABASE_HOST,
					port: +process.env.DATABASE_PORT,
					username: process.env.DATABASE_USERNAME,
					password: process.env.DATABASE_PASSWORD,
					database: process.env.DATABASE_NAME,
					entities: [InventoryManagement, InfoInventory],
					synchronize: false,
				}),
				TypeOrmModule.forFeature([InventoryManagement, InfoInventory]),
			],
			controllers: [InventoryController],
			providers: [InventoryService],
		}).compile();

		controller = module.get<InventoryController>(InventoryController);
		service = module.get<InventoryService>(InventoryService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should list all inventory items', async () => {
		const mockListData: ListInventoryDTO = {
			keyword: '',
			limit: 10,
			offset: 0,
		};

		const mockInventoryList: any = {
			docs: [
				{
					createdAt: '2024-01-09T15:03:45.810Z',
					updatedAt: null,
					deletedAt: null,
					id: 3,
					unit: 'Unit 1',
					department: 'Department 1',
					dateCreate: '2024-01-10',
					code: 'Code 1',
					userDeliver: 'User 1',
					nameInventory: 'Inventory 1',
					address: 'Address 1',
					originalDocumentNumber: 'Document Number 1',
					dateSignature: '2024-01-10',
					infoInventory: [
						{
							createdAt: '2024-01-09T15:03:45.817Z',
							updatedAt: null,
							id: 2,
							ordinalNumber: '1',
							nameProduct: 'Product 1',
							codeProduct: 'Product Code 1',
							unit: 'Unit 1',
							quantityDocument: '10',
							quantityReal: '8',
							price: '100',
							money: '800',
							inventoryManagementId: 3,
						},
					],
				},
			],
			meta: {
				total: 1,
			},
		};

		jest.spyOn(service, 'list').mockResolvedValue(mockInventoryList);

		const result = await controller.list(mockListData);
		expect(result).toEqual(mockInventoryList);
	});

	it('should add a new inventory item', async () => {
		const mockInventoryData: InventoryDTO = {
			unit: 'Unit 1',
			department: 'Department 1',
			dateCreate: '2024-01-10',
			code: 'Code 1',
			userDeliver: 'User 1',
			nameInventory: 'Inventory 1',
			address: 'Address 1',
			originalDocumentNumber: 'Document Number 1',
			dateSignature: '2024-01-10',
			info: [
				{
					ordinalNumber: '1',
					nameProduct: 'Product 1',
					codeProduct: 'Product Code 1',
					unit: 'Unit 1',
					quantityDocument: '10',
					quantityReal: '8',
					price: '100',
					money: '800',
				},
				// More info items
			],
		};
		const mockAddResponse = { message: 'SUCCESS' };

		jest.spyOn(service, 'add').mockResolvedValue(mockAddResponse);

		const result = await controller.add(mockInventoryData);
		expect(result).toEqual(mockAddResponse);
	});
});
