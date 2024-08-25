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
import {AddSizeDto, UpdateSizeDto} from "../dto/size.dto";
import {ProductSizeService} from "../service/product-size.service";

@Controller("product-size")
@ApiTags("Product-size")
export class ProductSizeController {
  constructor(private sizeService: ProductSizeService) {}

  @Post()
  @ApiConsumes("application/x-www-form-urlencoded")
  create(@Body() sizeDto: AddSizeDto) {
    return this.sizeService.create(sizeDto);
  }
  @Get("/product/:productId")
  find(@Param("productId", ParseIntPipe) productId: number) {
    return this.sizeService.find(productId);
  }
  @Put("/:id")
  @ApiConsumes("application/x-www-form-urlencoded")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() sizeDto: UpdateSizeDto
  ) {
    return this.sizeService.update(id, sizeDto);
  }
  @Delete("/:id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.sizeService.delete(id);
  }
}
