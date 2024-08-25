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
import {CreateProductDto, UpdateProductDto} from "../dto/product.dto";
import {ProductService} from "../service/product.service";

@Controller("product")
@ApiTags("Product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiConsumes("application/x-www-form-urlencoded")
  create(@Body() productDto: CreateProductDto) {
    return this.productService.create(productDto);
  }
  @Get()
  find() {
    return this.productService.find();
  }
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
  @Put("/:id")
  @ApiConsumes("application/x-www-form-urlencoded")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() productDto: UpdateProductDto
  ) {
    return this.productService.update(id, productDto);
  }
  @Delete("/:id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
