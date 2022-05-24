import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { BoardColumn } from './columns/column.model';

@Table
export class Board extends Model {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @Column({
    validate: { min: 4, max: 100 },
    defaultValue: 'Без названия',
  })
  title: string;

  @HasMany(() => BoardColumn)
  columns: BoardColumn[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  authors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  respondents: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  tags: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  categories: string[];
}
