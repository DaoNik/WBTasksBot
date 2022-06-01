import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Task } from '../task.model';

@Table
export class Comment extends Model {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @BelongsTo(() => Task)
  task: Task;

  @Column({ type: DataType.STRING(512) })
  text: string;

  @Column
  author: string;
}
