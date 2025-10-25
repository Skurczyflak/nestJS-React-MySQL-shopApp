import { Injectable, BadRequestException } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class CartsService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise<Cart[]> {
        return this.prismaService.cart.findMany({
            include: {
                items: true,
                user: true
            },
        });
    }
    public getById(id: Cart['id']): Promise<Cart | null> {
        return this.prismaService.cart.findUnique({
            where: { id },
            include: {
                items: true,
                user: true
            }
        });
    }

    public getByUserId(userId: Cart['userId']): Promise<Cart | null> {
        return this.prismaService.cart.findUnique({
            where: { userId },
            include: {
                items: true,
                user: true
            }
        });
    }

    public create(cartData: Omit<Cart, 'id' | 'createdAt' | 'updatedAt'>): Promise<Cart> {
        const { userId } = cartData;
        try{
            return this.prismaService.cart.create({
                data: {
                    user: { connect: { id: userId } },
                },
                include: {
                    items: true,
                    user: true
                }

            });
        } catch (error) {
            throw new BadRequestException(error);    
        }
    }

    public async clearItemsTableByID(id: Cart['id']): Promise<void> {
        await this.prismaService.cartItem.deleteMany({
            where: { cartId: id },
        });
    }

    public deleteById(id: Cart['id']): Promise<Cart> {
        return this.prismaService.cart.delete({
            where: { id },
        });
    }
    public updateById(id: Cart['id'], cartData: Omit<Cart, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<Cart | null>{
        return this.prismaService.cart.update({
            where: { id },
            data: cartData,
        });
    }
}