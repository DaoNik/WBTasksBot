import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Board } from '../board.model';
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

  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @BelongsTo(() => Board)
  board: Board;

  @Column
  title: string;

  @Column({ defaultValue: '' })
  description: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  authors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  departments: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  tags: string[];

  @Column({ defaultValue: '' })
  category: string;

  @Column({ defaultValue: '' })
  priority: string;

  @Column({ defaultValue: '' })
  status: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  watchers: string[];

  @Column({ defaultValue: '' })
  deadline: string;

  @Column({ defaultValue: '' })
  contact: string;
}
