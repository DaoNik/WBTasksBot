import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BoardColumn } from '../columns/column.model';

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

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  authors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  respondents: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  tags: string[];

  @Column({ defaultValue: '' })
  category: string;

  @Column
  priority: string;

  @Column
  status: string;
}
