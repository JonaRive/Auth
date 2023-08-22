import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity('role')
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: any;

    @Column()
    Name: string;
 
}