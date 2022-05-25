import { BoardColumn } from './columns/column.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IdParamsDto } from './dto/id-params.dto';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board) private boardModel: typeof Board) {}

  async getBoards() {
    return 'Здесь будут все доски';
  }

  async getBoard(idParamsDto: IdParamsDto): Promise<Board> {
    return this.boardModel
      .findOne({
        where: {
          id: idParamsDto.id,
        },
        include: [BoardColumn],
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
