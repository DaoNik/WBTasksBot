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

  @Column({ type: DataType.ARRAY(DataType.STRING(2048)), defaultValue: [] })
  authors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING(2048)), defaultValue: [] })
  departments: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING(2048)), defaultValue: [] })
  tags: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING(2048)), defaultValue: [] })
  categories: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING(2048)), defaultValue: [] })
  watchers: string[];
}
