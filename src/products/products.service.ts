import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Product } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
    
    public getAll(): Promise<Product[]> {
        return this.prismaService.product.findMany();
    }

    public getById(id: Product['id']): Promise<Product | null> {
        return this.prismaService.product.findUnique({
            where: { id },
        });
    }

    public getBySeachParms(searchTerm: string): Promise<Product[]> {
        return this.prismaService.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                        },
                    },
                    {
                        title: {
                            contains: searchTerm,
                        },
                    },
                ],
            },
        });
    }

    public deleteById(id: Product['id']): Promise<Product> {
        return this.prismaService.product.delete({
            where: { id },
        });
    }

    public create(productData: Omit<Product, 'id'| 'createdAt'| 'updatedAt'>): Promise<Product> {
        try{
            return this.prismaService.product.create({
                data: {
                    ...productData,
                    colors: productData.colors as InputJsonValue,
                    images: productData.images as InputJsonValue,
                }
            });
        } catch (error) {
        throw new BadRequestException(error);
    }
    }

    public updateById(id: Product['id'], productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
        return this.prismaService.product.update({
            where: { id },
            data: { ...productData,
                colors: productData.colors as InputJsonValue,
                images: productData.images as InputJsonValue
            }
        });
    }
}
