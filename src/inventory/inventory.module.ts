import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryManagement, InfoInventory } from '@app/common/entities';

@Module({
	imports: [TypeOrmModule.forFeature([InventoryManagement, InfoInventory])],
	controllers: [InventoryController],
	providers: [InventoryService],
})
export class InventoryModule {}
