import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProductDetail} from "../entities/product-detail.entity";
import {AddDetailDto, UpdateDetailDto} from "../dto/detail.dto";
import {ProductService} from "./product.service";

@Injectable()
export class ProductDetailService {
  constructor(
    private productService: ProductService,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>
  ) {}
  async create(detailDto: AddDetailDto) {
    const {key, value, productId} = detailDto;
    await this.productService.findOne(productId);
    await this.productDetailRepository.insert({
      key,
      value,
      productId,
    });
    return {
      message: "created detail of product successful",
    };
  }
  async update(id: number, detailDto: UpdateDetailDto) {
    const {key, value, productId} = detailDto;
    const detail = await this.findOne(id);
    if (productId) {
      await this.productService.findOne(productId);
      detail.productId = productId;
    }
    if (key) detail.key = key;
    if (value) detail.value = value;
    await this.productDetailRepository.save(detail);
    return {
      message: "updated detail of product successful",
    };
  }
  async find(productId: number) {
    return this.productDetailRepository.find({
      where: {productId},
    });
  }
  async findOne(id: number) {
    const detail = await this.productDetailRepository.findOne({
      where: {id},
    });
    if (!detail) throw new NotFoundException();
    return detail;
  }
  async delete(id: number) {
    await this.findOne(id);
    await this.productDetailRepository.delete({id});
    return {
      message: "Deleted detail of product successful.",
    };
  }
}
