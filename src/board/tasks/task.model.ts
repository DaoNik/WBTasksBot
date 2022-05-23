import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Board } from '../board.model';

@Table
export class Task extends Model {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @Column({
    validate: { min: 4, max: 100 },
    defaultValue: 'Без названия',
  })
  title: string;
}
