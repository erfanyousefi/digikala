import {ApiProperty, ApiPropertyOptional, PartialType} from "@nestjs/swagger";
import {ProductType} from "../enum/type.enum";

export class CreateProductDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  code: string;
  @ApiProperty({enum: ProductType})
  type: string;
  @ApiPropertyOptional()
  price: number;
  @ApiPropertyOptional()
  count: number;
  @ApiPropertyOptional()
  discount: number;
  @ApiPropertyOptional({type: "boolean"})
  active_discount: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
