import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./../entities/product.entity";
import {DeepPartial, Repository} from "typeorm";
import {CreateProductDto, UpdateProductDto} from "./../dto/product.dto";
import {ProductType} from "./../enum/type.enum";
import {toBoolean} from "src/utils/functions";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}
  async create(productDto: CreateProductDto) {
    const {
      title,
      slug,
      active_discount,
      code,
      content,
      count,
      discount,
      price,
      type,
    } = productDto;
    const productObject: DeepPartial<Product> = {
      title,
      content,
      slug,
      code,
      discount,
      active_discount: toBoolean(active_discount),
    };
    if (type === ProductType.Single) {
      Object.assign(productObject, {price, count, type});
    } else if ([ProductType.Coloring, ProductType.Sizing].includes(type as any))
      productObject["type"] = type;
    else throw new BadRequestException("product type is invalid");
    await this.productRepository.save(productObject);
    return {
      message: "created product successful",
    };
  }
  async update(id: number, productDto: UpdateProductDto) {
    const {
      title,
      slug,
      active_discount,
      code,
      content,
      count,
      discount,
      price,
      type,
    } = productDto;
    const product = await this.findOneLean(id);
    if (title) product.title = title;
    if (slug) product.slug = slug;
    if (content) product.content = content;
    if (discount) product.discount = discount;
    if (active_discount) product.active_discount = toBoolean(active_discount);
    if (code) product.code = code;
    if (type === ProductType.Single) {
      Object.assign(product, {price, count});
    }
    await this.productRepository.save(product);
    return {
      message: "updated product successful",
    };
  }
  async find() {
    return this.productRepository.find({
      where: {},
      relations: {colors: true, sizes: true, details: true},
      select: {
        details: {
          key: true,
          value: true,
        },
      },
    });
  }
  async findOneLean(id: number) {
    const product = await this.productRepository.findOne({
      where: {id},
    });
    if (!product) throw new NotFoundException();
    return product;
  }
  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {id},
      relations: {colors: true, sizes: true, details: true},
    });
    if (!product) throw new NotFoundException();
    return product;
  }
  async delete(id: number) {
    await this.findOne(id);
    await this.productRepository.delete({id});
    return {
      message: "Deleted product successful.",
    };
  }
}
