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
import { IdParamsDto } from './dto/id-params.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoards() {
    return this.boardsService.getBoards();
  }

  @Get(':id')
  getBoard(@Param() idParamsDto: IdParamsDto): Promise<Board> {
    return this.boardsService.getBoard(idParamsDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch(':id')
  updateBoard(
    @Param() idParamsDto: IdParamsDto,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.updateBoard(idParamsDto, updateBoardDto);
  }
}
