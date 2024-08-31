import {ApiProperty, ApiPropertyOptional, PartialType} from "@nestjs/swagger";
import {DiscountType} from "../type.enum";

export class CreateDiscountDto {
  @ApiProperty()
  code: string;
  @ApiPropertyOptional()
  percent: number;
  @ApiPropertyOptional()
  amount: number;
  @ApiPropertyOptional()
  limit: number;
  @ApiPropertyOptional()
  expires_in: string;
  @ApiPropertyOptional()
  productId: number;
  @ApiPropertyOptional({enum: DiscountType})
  type: string;
}
export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {}
