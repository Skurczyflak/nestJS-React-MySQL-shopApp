import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Order } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) {}
    public getAll(): Promise<Order[]> {
        return this.prismaService.order.findMany({
            include: {
                user: true
            }
        });
    }
    public getById(id: Order['id']): Promise<Order | null> {
        return this.prismaService.order.findUnique({ 
            where: { id }, 
            include: {
                user: true
            }
        });
    }

    public async create(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const { userId, items, ...otherData } = orderData;
        try{
            return this.prismaService.order.create({
                data: {
                ...otherData,
                user: { connect: { id: userId } },
                items: items as unknown as InputJsonValue,
                status: orderData.status ?? 'PENDING',
                },
            });
        } catch (error) {
            throw new BadRequestException(error);
        }

    }

    public deleteById(id: Order['id']): Promise<Order> {
         return this.prismaService.order.delete({ 
            where: { id } 
        }); 
    }
    public updateById(id: Order['id'], orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
        return this.prismaService.order.update({ 
            where: { id }, 
            data: {
                ...orderData,
                items: orderData.items as InputJsonValue
            } 
        }); 
    }
}
