import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Task } from './tasks/task.model';

@Table
export class Board extends Model {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @Column({
    validate: { min: 4, max: 100 },
    defaultValue: 'Без названия',
  })
  title: string;

  @Column({ defaultValue: ['To do', 'In progress', 'Done'] })
  columns: string[];

  @Column({ defaultValue: [] })
  authors: string[];

  @Column({ defaultValue: [] })
  respondents: string[];

  @Column({ defaultValue: [] })
  tags: string[];

  @Column({ defaultValue: [] })
  categories: string[];

  @HasMany(() => Task)
  tasks: Task[];
}
