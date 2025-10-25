import { Controller, Get, Delete, Param, Post, Body, Put, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-products.dto';
import { UpdateProductDTO } from './dtos/update-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('/')
        public getAll():any {
            return this.productsService.getAll();
        }
    @Get('/:id')
        async getById(@Param('id', new ParseUUIDPipe()) id: string) {
            const prod = await this.productsService.getById(id);
            if (!prod) throw new NotFoundException('Product not found');
            return prod;
        }
    
    @Get('/search/:text')
        public getBySeachParms(@Param('text') searchTerm: string) {
            return this.productsService.getBySeachParms(searchTerm);
        }

    @Delete('/:id')
        async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
            if (!(await this.productsService.getById(id)))
                throw new NotFoundException('Product not found');
            await this.productsService.deleteById(id);
            return { success: true };
        }

    @Post('/')
        create(@Body() productData: CreateProductDTO) {
        return this.productsService.create(productData);
    }

    @Put('/:id')
        async update( @Param('id', new ParseUUIDPipe()) id: string, @Body() productData: UpdateProductDTO) {
            if (!(await this.productsService.getById(id)))
                throw new NotFoundException('Product not found');

            await this.productsService.updateById(id, productData);
            return { success: true };
        }

}