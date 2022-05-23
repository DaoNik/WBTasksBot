import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BoardColumn } from './column.model';

@Table
export class Task extends Model {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => BoardColumn)
  @Column
  columnId: number;

  @BelongsTo(() => BoardColumn)
  column: BoardColumn;

  @Column({
    validate: { min: 4, max: 100 },
    defaultValue: 'Без названия',
  })
  title: string;

  @Column({ defaultValue: '' })
  description: string;

  @Column({ defaultValue: [] })
  authors: string[];

  @Column({ defaultValue: [] })
  respondents: string[];

  @Column({ defaultValue: [] })
  tags: string[];

  @Column({ defaultValue: '' })
  category: string;
}
