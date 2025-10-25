import { 
  IsNotEmpty, 
  IsString, 
  Length, 
  IsArray, 
  ArrayNotEmpty,  
  IsInt, 
  Max, 
  Min,  
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  shortDesc: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  colors: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];

  @Min(0)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @Min(0)
  price: number;
}