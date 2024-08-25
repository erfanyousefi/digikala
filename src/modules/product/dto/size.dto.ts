import {ApiProperty, ApiPropertyOptional, PartialType} from "@nestjs/swagger";

export class AddSizeDto {
  @ApiProperty()
  size: string;
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

export class UpdateSizeDto extends PartialType(AddSizeDto) {}
