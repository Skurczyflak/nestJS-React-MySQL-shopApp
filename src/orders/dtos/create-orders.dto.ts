import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsEnum, IsUUID, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class OrderItemDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsString()
    color: string;

    @IsInt()
    quantity: number;

    @IsOptional()
    @IsString()
    comment?: string;
}

export class CreateOrderDTO {
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
    total: number

    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus
}