import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class BasketDto {
  @ApiProperty()
  productId: number;
  @ApiPropertyOptional()
  colorId: number;
  @ApiPropertyOptional()
  sizeId: number;
}
