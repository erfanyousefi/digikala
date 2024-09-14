import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {toBoolean} from "src/utils/functions";
import {DataSource, Repository} from "typeorm";
import {AddSizeDto, UpdateSizeDto} from "../dto/size.dto";
import {ProductSize} from "../entities/product-size.entity";
import {Product} from "../entities/product.entity";
import {ProductType} from "../enum/type.enum";
import {ProductService} from "./product.service";

@Injectable()
export class ProductSizeService {
  constructor(
    private productService: ProductService,
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource
  ) {}
  async create(sizeDto: AddSizeDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const {active_discount, count, discount, price, productId, size} =
        sizeDto;
      let product = await queryRunner.manager.findOneBy(Product, {
        id: productId,
      });
      if (product.type !== ProductType.Sizing)
        throw new BadRequestException("product type isn't sizing");
      if (!product) throw new NotFoundException("not found product");
      await queryRunner.manager.insert(ProductSize, {
        count,
        discount,
        price,
        size,
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
        message: "created size of product successful",
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async update(id: number, sizeDto: UpdateSizeDto) {
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
        size: sizeTitle,
      } = sizeDto;
      let product = await queryRunner.manager.findOneBy(Product, {
        id: productId,
      });
      if (!product) throw new NotFoundException("not found product");
      let size = await queryRunner.manager.findOneBy(ProductSize, {
        id,
      });
      if (!size) throw new NotFoundException("not found product");
      if (sizeTitle) size.size = sizeTitle;
      console.log(active_discount);

      if (active_discount) size.active_discount = toBoolean(active_discount);
      if (discount) size.discount = discount;
      if (price) size.price = price;
      let previousCount = size.count;
      if (count && !isNaN(parseInt(count.toString())) && +count > 0) {
        product.count =
          parseInt(product.count.toString()) -
          parseInt(previousCount.toString());
        product.count =
          parseInt(product.count.toString()) + parseInt(count.toString());
        size.count = count;
        await queryRunner.manager.save(Product, product);
      }
      await queryRunner.manager.save(ProductSize, size);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        message: "created size of product successful",
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async find(productId: number) {
    return this.productSizeRepository.find({
      where: {productId},
    });
  }
  async findOne(id: number) {
    const size = await this.productSizeRepository.findOne({
      where: {id},
    });
    if (!size) throw new NotFoundException();
    return size;
  }
  async delete(id: number) {
    const size = await this.findOne(id);
    if (size.count && size.count > 0) {
      const product = await this.productRepository.findOneBy({
        id: size.productId,
      });
      product.count =
        parseInt(product.count.toString()) - parseInt(size.count.toString());
      await this.productRepository.save(product);
    }
    await this.productSizeRepository.delete({id});
    return {
      message: "Deleted size of product successful.",
    };
  }
}
