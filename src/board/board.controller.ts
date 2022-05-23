import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getBoards() {
    this.boardService.getBoards();
  }

  @Get()
  getBoard() {
    this.boardService.getBoard();
  }
}
