import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise<User[]> {
        return this.prismaService.user.findMany({
            include: {
                cart: true,
                orders: true
            }
        });
    }
    public getById(id: User['id']): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { id },
            include: {
                cart: true,
                orders: true
            }
        });
    }

    public getByLogin(login: User['login']): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { login },
            include: {
                cart: true,
                orders: true
            }
        });
    }
    
    public create( userData: Omit<User, 'id'| 'createdAt'| 'updatedAt'>): Promise<User> {
        try{
            return this.prismaService.user.create({ 
                data: {
                    ...userData,
                    cart: {
                        create: {}
                    }
                },
                include: {
                    cart: {
                        include: {
                            items: true
                        }
                    },
                }
            }
            )
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    public deleteById(id: User['id']): Promise<User> {
        return this.prismaService.user.delete({
            where: { id },
        });
    }
    public updateById(id: User['id'], userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        return this.prismaService.user.update({
            where: { id },
            data: userData
        });
    }
}
