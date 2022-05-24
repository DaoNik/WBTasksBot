import { UpdateColumnDto } from './../dto/update-column.dto';
import { CreateColumnDto } from './../dto/create-column.dto';
import { BoardColumn } from './column.model';
import { ColumnsService } from './columns.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}
  @Get()
  getColumns() {
    return this.columnsService.getColumns();
  }

  @Get(':id')
  getColumn(@Param('id') id: string): Promise<BoardColumn> {
    return this.columnsService.getColumn(id);
  }

  @Post()
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.createColumn(createColumnDto);
  }

  @Patch(':id')
  updateColumn(
    @Param('id') id: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.updateColumn(id, updateColumnDto);
  }

  @Delete(':id')
  deleteColumn(@Param('id') id: string) {
    return this.columnsService.deleteColumn(id);
  }
}
