import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "passengers",
})
export class PassengerEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;
}
