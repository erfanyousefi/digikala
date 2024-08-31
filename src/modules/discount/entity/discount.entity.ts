import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DiscountType} from "../type.enum";
import {Basket} from "src/modules/basket/entity/basket.entity";

@Entity()
export class Discount {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({unique: true})
  code: string;
  @Column({type: "decimal", nullable: true})
  percent: number;
  @Column({type: "decimal", nullable: true})
  amount: number;
  @Column({nullable: true})
  limit: number;
  @Column({nullable: true, default: 0})
  usage: number;
  @Column({type: "timestamp", nullable: true})
  expires_in: Date;
  @Column({nullable: true})
  productId: number;
  @Column({type: "enum", enum: DiscountType})
  type: string;
  @OneToMany(() => Basket, (basket) => basket.discount)
  baskets: Basket[];
}
