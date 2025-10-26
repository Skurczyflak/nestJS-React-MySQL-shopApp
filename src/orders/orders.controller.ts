import { Controller, Get, Delete, Param, Post, Body, Put, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';

import { CreateOrderDTO } from './dtos/create-orders.dto';
import { UpdateOrderDTO } from './dtos/update-orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get('/')
    getAll():any {
        return this.ordersService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const order = await this.ordersService.getById(id);
        if (!order) {
            throw new NotFoundException();
        }
        return order;
    }

    @Get('/user/:userId')
    async getByUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
        const order = await this.ordersService.getByUserId(userId);
        if(!order) {
            throw new NotFoundException();
        }
        return order;
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if(!await this.ordersService.getById(id)) {
            throw new NotFoundException();
        }
        await this.ordersService.deleteById(id);
        return{ success: true };
    }

    @Post('/')
    create(@Body() orderData: CreateOrderDTO) {
        // Zamień DTO na czysty JSON
        const orderDataPlain = {
            ...orderData,
            items: orderData.items.map(i => ({ ...i })),
        };

        return this.ordersService.create(orderDataPlain);
        }

    @Put('/:id')
    async updateById(@Param('id', new ParseUUIDPipe()) id: string, @Body() orderData: UpdateOrderDTO) {
        if(!await this.ordersService.getById(id)) {
            throw new NotFoundException();
        }
        const orderDataPlain = {
            ...orderData,
            items: orderData.items.map(i => ({ ...i })),
        };
        await this.ordersService.updateById(id, orderDataPlain);
        return{ success: true };
    }
}
