import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Comment } from './board/tasks/comments/comment.model';
import { CreateCommentDto } from './board/tasks/comments/dto/create-comment.dto';

@WebSocketGateway({
  path: '/api/socket',
  cors: {
    origin: ['http://localhost:4200', 'https://wbbase.site'],
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createComment')
  async createComment(@MessageBody() createCommentDto: CreateCommentDto) {
    const comment = await Comment.create({ ...createCommentDto });

    this.server.emit('returnComment', comment);
  }
}
