import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Basket} from "./entity/basket.entity";
import {FindOptionsWhere, Repository} from "typeorm";
import {BasketDto} from "./dto/product.dto";
import {ProductService} from "../product/service/product.service";
import {ProductType} from "../product/enum/type.enum";
import {ProductSize} from "../product/entities/product-size.entity";
import {ProductColor} from "../product/entities/product-color.entity";
import {ProductColorService} from "../product/service/product-color.service";
import {ProductSizeService} from "../product/service/product-size.service";

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    private productService: ProductService,
    private productColorService: ProductColorService,
    private productSizeService: ProductSizeService
  ) {}

  async addToBasket(basketDto: BasketDto) {
    const {colorId, productId, sizeId} = basketDto;
    let size: ProductSize;
    let color: ProductColor;
    let where: FindOptionsWhere<Basket> = {};
    const product = await this.productService.findOneLean(productId);
    if (product.count === 0)
      throw new BadRequestException("product inventory not enough");
    where["productId"] = product.id;
    if (product.type === ProductType.Coloring && !colorId) {
      throw new BadRequestException("You should select some color");
    } else if (product.type === ProductType.Coloring && colorId) {
      if (isNaN(parseInt(colorId?.toString()))) {
        throw new BadRequestException("You should select some color");
      }
      color = await this.productColorService.findOne(colorId);
      where["colorId"] = colorId;
    } else if (product.type === ProductType.Sizing && !sizeId) {
      throw new BadRequestException("You should select a size");
    } else if (product.type === ProductType.Sizing && sizeId) {
      if (isNaN(parseInt(sizeId?.toString()))) {
        throw new BadRequestException("You should select a size");
      }
      size = await this.productSizeService.findOne(sizeId);
      where["sizeId"] = sizeId;
    }
    let basketItem = await this.basketRepository.findOneBy(where);
    if (basketItem) {
      basketItem.count += 1;
      if (basketItem.count > product.count) {
        throw new BadRequestException("product inventory not enough");
      }
    } else {
      basketItem = this.basketRepository.create({
        productId,
        sizeId: size?.id,
        colorId: color?.id,
        count: 1,
      });
    }
    await this.basketRepository.save(basketItem);
    return {
      message: "product added to basket",
    };
  }
  async removeFromBasket(basketDto: BasketDto) {
    const {colorId, productId, sizeId} = basketDto;
    let size: ProductSize;
    let color: ProductColor;
    let where: FindOptionsWhere<Basket> = {};
    const product = await this.productService.findOneLean(productId);
    where["productId"] = product.id;
    if (product.type === ProductType.Coloring && !colorId) {
      throw new BadRequestException("You should select some color");
    } else if (product.type === ProductType.Coloring && colorId) {
      if (isNaN(parseInt(colorId?.toString()))) {
        throw new BadRequestException("You should select some color");
      }
      color = await this.productColorService.findOne(colorId);
      where["colorId"] = colorId;
    } else if (product.type === ProductType.Sizing && !sizeId) {
      throw new BadRequestException("You should select a size");
    } else if (product.type === ProductType.Sizing && sizeId) {
      if (isNaN(parseInt(sizeId?.toString()))) {
        throw new BadRequestException("You should select a size");
      }
      size = await this.productSizeService.findOne(sizeId);
      where["sizeId"] = sizeId;
    }
    let basketItem = await this.basketRepository.findOneBy(where);
    if (basketItem) {
      if (basketItem.count <= 1) {
        await this.basketRepository.delete({id: basketItem.id});
      } else {
        basketItem.count -= 1;
        await this.basketRepository.save(basketItem);
      }
    } else {
      throw new NotFoundException("not found item in basket");
    }
    return {
      message: "product removed from basket",
    };
  }
  async removeFromBasketById(id: number) {
    let basketItem = await this.basketRepository.findOneBy({id});
    if (basketItem) {
      if (basketItem.count <= 1) {
        await this.basketRepository.delete({id: basketItem.id});
      } else {
        basketItem.count -= 1;
        await this.basketRepository.save(basketItem);
      }
    } else {
      throw new NotFoundException("not found item in basket");
    }
    return {
      message: "product removed from basket",
    };
  }
}
