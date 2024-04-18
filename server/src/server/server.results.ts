import { Channel, Server, User, UserOnServer } from '@prisma/client';
import { ChannelResult } from 'src/channel/channel.results';
import { UserResult } from 'src/user/user.results';

export class ServerResult {
  name: string;
  identifier: string;
  isOwner: boolean;

  constructor(server: Server, userId: number) {
    this.name = server.name;
    this.identifier = server.identifier;
    this.isOwner = server.ownerId === userId;
  }
}

export class ServerDetailedResult {
  name: string;
  identifier: string;
  participants: UserResult[];
  channels: ChannelResult[];

  constructor(
    server: Server & {
      participants: ({ user: User } & UserOnServer)[];
      channels: Channel[];
    },
  ) {
    this.name = server.name;
    this.identifier = server.identifier;
    this.participants = server.participants.map(
      (participant) => new UserResult(participant.user),
    );
    this.channels = server.channels.map(
      (channel) => new ChannelResult(channel),
    );
  }
}