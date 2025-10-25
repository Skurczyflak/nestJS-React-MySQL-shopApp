import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CartItem } from '@prisma/client';

@Injectable()
export class CartItemsService {
    constructor(private prismaService: PrismaService) {}
    public getAll(): Promise<CartItem[]> {
        return this.prismaService.cartItem.findMany({
            include: {
                product: true,
                cart: true
            },
        });
    }

    public getById(id: CartItem['id']): Promise<CartItem | null> {
        return this.prismaService.cartItem.findUnique({
            where: { id },
            include: {
                product: true,
                cart: true
            }
        });
    }

    public async create(cartItemData: Omit<CartItem, 'id'| 'comment' | 'createdAt' | 'updatedAt'| 'price' | 'image' | 'name'>): Promise<CartItem> {
        const { productId, cartId, ...otherData } = cartItemData;
        try {
            const product = await this.prismaService.product.findUnique({
                where: { id: productId },
                select: { images: true, price: true, name: true },
            });

            if (!product) {
                throw new BadRequestException('Product not found');
            }

            const firstImage = product.images && product.images[0];
            if (!firstImage) {
                throw new BadRequestException('Product has no images');
            }

            return this.prismaService.cartItem.create({
                data: {
                    ...otherData,
                    price: product.price,
                    image: firstImage,
                    name: product.name,
                    cart: { connect: { id: cartId } },
                    product: { connect: { id: productId } },
                },
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
    
    public deleteById(id: CartItem['id']): Promise<CartItem> {
        return this.prismaService.cartItem.delete({
            where: { id },
        });
    }
    
    public updateById(id: CartItem['id'], cartItemData: Partial<CartItem>): Promise<CartItem | undefined> {
        return this.prismaService.cartItem.update({
            where: { id },
            data: cartItemData,
        });
    }
}
