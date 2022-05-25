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
  UseFilters,
} from '@nestjs/common';
import { IdParamsDto } from '../dto/id-params.dto';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';

@Controller('columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}
  @Get()
  getColumns() {
    return this.columnsService.getColumns();
  }

  @Get(':id')
  getColumn(@Param() idParamsDto: IdParamsDto): Promise<BoardColumn> {
    return this.columnsService.getColumn(idParamsDto);
  }

  @Post()
  @UseFilters(new ValidationExceptionFilter())
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.createColumn(createColumnDto);
  }

  @Patch(':id')
  @UseFilters(new ValidationExceptionFilter())
  updateColumn(
    @Param() idParamsDto: IdParamsDto,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.updateColumn(idParamsDto, updateColumnDto);
  }

  @Delete(':id')
  deleteColumn(@Param() idParamsDto: IdParamsDto) {
    return this.columnsService.deleteColumn(idParamsDto);
  }
}
