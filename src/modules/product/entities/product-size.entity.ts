import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  productId: number;
  @Column()
  size: string;
  @Column()
  count: number;
  @Column({type: "decimal"})
  price: number;
  @Column({type: "decimal", default: 0})
  discount: number;
  @Column({default: false})
  active_discount: boolean;
  @ManyToOne(() => Product, (product) => product.sizes, {onDelete: "CASCADE"})
  product: Product;
}
