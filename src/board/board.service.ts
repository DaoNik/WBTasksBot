import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  getBoards() {
    return 'Здесь будут все доски';
  }

  getBoard() {
    return 'Здесь будет конкретная доска';
  }
}
