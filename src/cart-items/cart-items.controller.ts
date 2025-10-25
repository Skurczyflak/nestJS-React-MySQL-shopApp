import { Controller, Get, Delete, Param, Post, Body, Put, NotFoundException, ParseUUIDPipe } from '@nestjs/common';

import { CartItemsService } from './cart-items.service';

import { CreateCartItemDTO } from './dtos/create-cart-items.dto';
import { UpdateCartItemDTO } from './dtos/update-cart-items.dto';

@Controller('cart-items')
export class CartItemsController {
    constructor(private readonly cartItemsService: CartItemsService) {}

    @Get('/')
    getAll() {
        return this.cartItemsService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const cartItem = await this.cartItemsService.getById(id);
        if (!cartItem) {
            throw new NotFoundException();
        }
        return cartItem;
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if(!await this.cartItemsService.getById(id)) {
            throw new NotFoundException();
        }
        await this.cartItemsService.deleteById(id);
        return{ success: true };
    }

    @Post('/')
    create(@Body() cartItemData: CreateCartItemDTO) {
        return this.cartItemsService.create(cartItemData);
    }

    @Put('/:id')
    async updateById(@Param('id', new ParseUUIDPipe()) id: string, @Body() cartItemData: UpdateCartItemDTO) {
        if(!await this.cartItemsService.getById(id)) {
            throw new NotFoundException();
        }
        await this.cartItemsService.updateById(id, cartItemData);
        return{ success: true };
    }
}