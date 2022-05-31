import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Comment } from './board/tasks/comments/comment.model';
import { CreateCommentDto } from './board/tasks/comments/dto/create-comment.dto';

@WebSocketGateway({
  path: '/api/socket',
  cors: {
    origin: ['http://localhost:4200', 'https://wbbase.site'],
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('Logger');

  handleConnection(client: Socket) {
    this.logger.log(`[Socket - подключение] ID: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`[Socket - отключение] ID: ${client.id}`);
  }

  @SubscribeMessage('createComment')
  async createComment(@MessageBody() createCommentDto: CreateCommentDto) {
    const comment = await Comment.create({ ...createCommentDto });

    this.server.emit('returnComment', comment);
  }
}
