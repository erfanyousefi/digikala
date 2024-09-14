import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {ProductColor} from "../entities/product-color.entity";
import {AddColorDto, UpdateColorDto} from "../dto/color.dto";
import {ProductService} from "./product.service";
import {toBoolean} from "src/utils/functions";
import {Product} from "../entities/product.entity";
import {ProductType} from "../enum/type.enum";

@Injectable()
export class ProductColorService {
  constructor(
    private productService: ProductService,
    @InjectRepository(ProductColor)
    private productColorRepository: Repository<ProductColor>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource
  ) {}
  async create(colorDto: AddColorDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const {
        active_discount,
        count,
        discount,
        price,
        productId,
        color_code,
        color_name,
      } = colorDto;
      let product = await queryRunner.manager.findOneBy(Product, {
        id: productId,
      });
      if (product.type !== ProductType.Coloring)
        throw new BadRequestException("product type isn't coloring");
      if (!product) throw new NotFoundException("not found product");
      await queryRunner.manager.insert(ProductColor, {
        count,
        discount,
        price,
        color_code,
        color_name,
        active_discount: toBoolean(active_discount),
        productId,
      });
      if (!isNaN(parseInt(count.toString())) && +count > 0) {
        product.count =
          parseInt(product.count.toString()) + parseInt(count.toString());
        await queryRunner.manager.save(Product, product);
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        message: "created color of product successful",
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async update(id: number, colorDto: UpdateColorDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const {
        active_discount,
        count,
        discount,
        price,
        productId,
        color_code,
        color_name,
      } = colorDto;
      let product = await queryRunner.manager.findOneBy(Product, {
        id: productId,
      });
      if (!product) throw new NotFoundException("not found product");
      let color = await queryRunner.manager.findOneBy(ProductColor, {
        id,
      });
      if (!color) throw new NotFoundException("not found product");
      if (color_name) color.color_name = color_name;
      if (color_code) color.color_code = color_code;
      if (active_discount) color.active_discount = toBoolean(active_discount);
      if (discount) color.discount = discount;
      if (price) color.price = price;
      let previousCount = color.count;
      if (count && !isNaN(parseInt(count.toString())) && +count > 0) {
        product.count =
          parseInt(product.count.toString()) -
          parseInt(previousCount.toString());
        product.count =
          parseInt(product.count.toString()) + parseInt(count.toString());
        color.count = count;
        await queryRunner.manager.save(Product, product);
      }
      await queryRunner.manager.save(ProductColor, color);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        message: "created color of product successful",
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async find(productId: number) {
    return this.productColorRepository.find({
      where: {productId},
    });
  }
  async findOne(id: number) {
    const color = await this.productColorRepository.findOne({
      where: {id},
    });
    if (!color) throw new NotFoundException();
    return color;
  }
  async delete(id: number) {
    const color = await this.findOne(id);
    if (color.count && color.count > 0) {
      const product = await this.productRepository.findOneBy({
        id: color.productId,
      });
      product.count =
        parseInt(product.count.toString()) - parseInt(color.count.toString());
      await this.productRepository.save(product);
    }
    await this.productColorRepository.delete({id});
    return {
      message: "Deleted color of product successful.",
    };
  }
}
