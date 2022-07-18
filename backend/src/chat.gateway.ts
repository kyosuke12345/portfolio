// import { UseGuards } from '@nestjs/common';
import { isProduct } from '@lib/lib/config/enviroment';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { CookieAuthenticationGuard } from './authentication/cookieAuthentication.guard';

type ChatContent = {
  email: string;
  message: string;
  time: string;
};

@WebSocketGateway({ cors: !isProduct() })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // @UseGuards(CookieAuthenticationGuard)
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: ChatContent,
    @ConnectedSocket() client: Socket,
  ): void {
    this.server.emit('message', data);
  }

  // handleConnection(@ConnectedSocket() client: Socket) {
  //   console.log('connect :', client.id);
  // }

  // handleDisconnect(@ConnectedSocket() client: Socket) {
  //   console.log('disconnect :', client.id);
  // }
}
