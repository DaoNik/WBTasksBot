import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { BoardColumn } from './tasks/column.model';

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

  @Column({ defaultValue: [] })
  authors: string[];

  @Column({ defaultValue: [] })
  respondents: string[];

  @Column({ defaultValue: [] })
  tags: string[];

  @Column({ defaultValue: [] })
  categories: string[];
}
