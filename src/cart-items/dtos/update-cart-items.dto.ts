import { IsNotEmpty, IsInt, IsString, Min } from 'class-validator';

export class UpdateCartItemDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number;

    @IsString()
    comment: string;
}