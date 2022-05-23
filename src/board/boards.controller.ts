import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoards() {
    return this.boardsService.getBoards();
  }

  @Get(':id')
  getBoard(@Param('id') id: string): Promise<Board> {
    return this.boardsService.getBoard(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch(':id')
  updateBoard(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.updateBoard(id, updateBoardDto);
  }
}
