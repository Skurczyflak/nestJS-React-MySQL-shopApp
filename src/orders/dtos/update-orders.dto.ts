import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsEnum, IsUUID, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class OrderItemDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    cartId: string;

    @IsString()
    color: string;

    @IsInt()
    quantity: number;

    @IsOptional()
    @IsString()
    comment?: string;
}

export class UpdateOrderDTO {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items: OrderItemDTO[];

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
    address: string;

    @IsNotEmpty()
    @IsInt()
    total: number

    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus
}