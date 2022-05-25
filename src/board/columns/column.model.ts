import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Board } from '../board.model';
import { Task } from '../tasks/task.model';

@Table
export class BoardColumn extends Model {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @BelongsTo(() => Board)
  board: Board;

  @Column
  title: string;

  @HasMany(() => Task)
  tasks: Task[];
}
