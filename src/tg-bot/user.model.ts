import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  chatId: number;

  @Column({ defaultValue: 0 })
  right: number;

  @Column({ defaultValue: 0 })
  wrong: number;
}
