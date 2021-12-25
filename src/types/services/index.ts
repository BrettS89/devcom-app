import { Paginated } from '@feathersjs/feathers';
import { Resource } from '../resource';

export interface Role extends Partial<Resource> {
  name: string;
}

export type Roles = Paginated<Role>;

export interface Account extends Partial<Resource> {
  name: string;
}

export type Accounts = Paginated<Account>;

export interface User extends Partial<Resource> {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  accountId: string;
  roleId: string;
  account?: Account;
  role?: Role;
}

export type Users = Paginated<User>;

export interface Tag extends Partial<Resource> {
  key: string;
  value: string;
}

export type Tags = Paginated<Tag>;

export interface Message extends Partial<Resource>{
  accountId: string;
  userId: string;
  ticketId: string;
  text: string;
  user?: User;
}

export type Messages = Paginated<Message>;

export interface Ticket extends Partial<Resource> {
  accountId: string;
  assignerUserId: string;
  assigneeUserId?: string;
  testerUserId?: string;
  status: string;
  name: string;
  description?: string;
  messages?: Message[]
  assigner?: User;
  assignee?: User;
  tester?: User;
}

export type Tickets = Paginated<Ticket>

export interface Channel extends Partial<Resource> {
  accountId: string;
  name: string;
  private: boolean;
  adminIds: string[];
  messages?: Message[];
}

export type Channels = Paginated<Channel>;

export interface ChannelMember extends Partial<Resource> {
  channelId: string;
  userId: string;
}

export type ChannelMembers = Paginated<ChannelMember>;

export interface DM extends Partial<Resource> {
  accountId: string;
  userIds: string[];
  messages?: Message[];
  username?: string;
}

export type DMs = Paginated<DM>;

export interface Workflow extends Partial<Resource> {
  accountId: string;
  projectId?: string;
  name: string;
  order: number;
  status: string;
}

export type Workflows = Paginated<Workflow>;