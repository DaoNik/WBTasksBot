import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { BoardColumn } from './columns/column.model';
import { Task } from './tasks/task.model';

@Table
export class Board extends Model {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @HasMany(() => BoardColumn)
  columns: BoardColumn[];

  @HasMany(() => Task)
  tasks: Task[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  authors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  respondents: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  tags: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  categories: string[];
}
