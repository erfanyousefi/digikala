import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import {ApiConsumes, ApiTags} from "@nestjs/swagger";
import {AddDetailDto, UpdateDetailDto} from "../dto/detail.dto";
import {ProductDetailService} from "../service/product-detail.service";

@Controller("product-detail")
@ApiTags("Product-detail")
export class ProductDetailController {
  constructor(private productDetailService: ProductDetailService) {}

  @Post()
  @ApiConsumes("application/x-www-form-urlencoded")
  create(@Body() detailDto: AddDetailDto) {
    return this.productDetailService.create(detailDto);
  }
  @Get("/product/:productId")
  find(@Param("productId", ParseIntPipe) productId: number) {
    return this.productDetailService.find(productId);
  }
  @Put("/:id")
  @ApiConsumes("application/x-www-form-urlencoded")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() detailDto: UpdateDetailDto
  ) {
    return this.productDetailService.update(id, detailDto);
  }
  @Delete("/:id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.productDetailService.delete(id);
  }
}
