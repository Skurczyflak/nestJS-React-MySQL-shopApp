import { Controller, Get, Delete, Param, Post, Body, Put, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDTO } from './dtos/create-carts.dto';
import { UpdateCartDTO } from './dtos/update-carts.dto';

@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @Get('/')
    getAll():any {
        return this.cartsService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const cart = await this.cartsService.getById(id);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    @Get('/user/:id')
    async getByUserId(@Param('id', new ParseUUIDPipe()) id: string) {
        const cart = await this.cartsService.getByUserId(id);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if(!await this.cartsService.getById(id)) {
            throw new NotFoundException('Cart not found');
        }
        await this.cartsService.deleteById(id);
        return{ success: true };
    }

    @Delete('/clear/:id')
    async clearItemsTableByID(@Param('id', new ParseUUIDPipe()) id: string) {
        if(!await this.cartsService.getById(id)) {
            throw new NotFoundException('Cart not found');
        }
        await this.cartsService.clearItemsTableByID(id);
        return{ success: true };
    }

    @Post('/')
    create(@Body() cartData: CreateCartDTO) {
        return this.cartsService.create(cartData);
    }

    @Put('/:id')
    async updateById(@Param('id', new ParseUUIDPipe()) id: string, @Body() cartData: UpdateCartDTO) {
        if(!await this.cartsService.getById(id)) {
            throw new NotFoundException('Cart not found');
        }
        await this.cartsService.updateById(id, cartData);
        return{ success: true };
    }

}
