import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ListInventoryDTO } from './dto/list.dto';
import { InventoryDTO } from './dto/add.dto';

@ApiTags('Inventory')
@Controller({
	path: 'inventory',
	version: '1',
})
export class InventoryController {
	constructor(private readonly inventoryService: InventoryService) {}

	@ApiOperation({ summary: 'list' })
	@Get()
	list(@Query() data: ListInventoryDTO) {
		return this.inventoryService.list(data);
	}

	@ApiOperation({ summary: 'add' })
	@Post()
	add(@Body() data: InventoryDTO) {
		return this.inventoryService.add(data);
	}
}
