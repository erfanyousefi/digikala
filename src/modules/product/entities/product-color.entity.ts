import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  productId: number;
  @Column()
  color_name: string;
  @Column()
  color_code: string;
  @Column()
  count: number;
  @Column({type: "decimal"})
  price: number;
  @Column({type: "decimal", default: 0})
  discount: number;
  @Column({default: false})
  active_discount: boolean;
  @ManyToOne(() => Product, (product) => product.colors, {onDelete: "CASCADE"})
  product: Product;
}
