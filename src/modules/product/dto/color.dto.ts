import {ApiProperty, ApiPropertyOptional, PartialType} from "@nestjs/swagger";
import {ProductType} from "../enum/type.enum";

export class AddColorDto {
  @ApiProperty()
  color_name: string;
  @ApiProperty()
  color_code: string;
  @ApiProperty()
  productId: number;
  @ApiPropertyOptional()
  price: number;
  @ApiPropertyOptional()
  count: number;
  @ApiPropertyOptional()
  discount: number;
  @ApiPropertyOptional({type: "boolean"})
  active_discount: boolean;
}

export class UpdateColorDto extends PartialType(AddColorDto) {}
