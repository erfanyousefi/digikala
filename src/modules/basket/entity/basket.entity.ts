import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Product} from "src/modules/product/entities/product.entity";
import {ProductColor} from "src/modules/product/entities/product-color.entity";
import {ProductSize} from "src/modules/product/entities/product-size.entity";
import {Discount} from "src/modules/discount/entity/discount.entity";

@Entity()
export class Basket {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({nullable: true})
  productId: number;
  @Column({nullable: true})
  sizeId: number;
  @Column({nullable: true})
  colorId: number;
  @Column({nullable: true})
  discountId: number;
  @Column()
  count: number;

  @ManyToOne(() => Product, (product) => product.baskets, {onDelete: "CASCADE"})
  product: Product;
  @ManyToOne(() => ProductColor, (color) => color.baskets, {
    onDelete: "CASCADE",
  })
  color: ProductColor;
  @ManyToOne(() => ProductSize, (size) => size.baskets, {onDelete: "CASCADE"})
  size: ProductSize;
  @ManyToOne(() => Discount, (discount) => discount.baskets, {
    onDelete: "CASCADE",
  })
  discount: Discount;
}
