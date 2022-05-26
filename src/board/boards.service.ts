import { BoardColumn } from './columns/column.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IdParamsDto } from './dto/id-params.dto';
import { Task } from './tasks/task.model';
import sequelize from 'sequelize';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board) private boardModel: typeof Board) {}

  async getBoards() {
    return 'Здесь будут все доски';
  }

  async getBoardTasks(idParamsDto: IdParamsDto) {
    return this.boardModel.findAll({
      where: { id: idParamsDto.id },
      include: [Task],
    });
  }

  async getBoard(idParamsDto: IdParamsDto): Promise<Board> {
    return this.boardModel
      .findOne({
        where: {
          id: idParamsDto.id,
        },
        include: [
          {
            model: BoardColumn,
            as: 'columns',
          },
        ],
        order: [
          [
            {
              model: BoardColumn,
              as: 'columns',
            },
            'id',
            'ASC',
          ],
        ],
      })
      .then((board) => {
        if (!board) {
          throw new NotFoundException('Доски с таким ID не существует');
        }

        return board;
      });
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardModel.create({ ...createBoardDto });
  }

  async updateBoard(idParamsDto: IdParamsDto, updateBoardDto: UpdateBoardDto) {
    // НУЖНО ПОМЕНЯТЬ(НАВЕРНОЕ)
    return this.boardModel
      .update(
        { ...updateBoardDto },
        {
          where: {
            id: idParamsDto.id,
          },
          returning: true,
        },
      )
      .then((board) => {
        if (!board[1][0]) {
          throw new NotFoundException('Доски с таким ID не существует');
        }

        return board[1][0];
      });
  }
}
