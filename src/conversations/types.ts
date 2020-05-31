export interface IConversationMessage {
  conversationId: string;
  createdAt: string;
  emitter: string;
  content: string;
}

export interface IConversation {
  uid: string;
  target: string;
  createdAt: string;
  updatedAt: string;
  lastSeen: string;
  unseenMessages: number;
  messages: IConversationMessage[];
}

export type IConversationsStatus = 'unavailable' | 'ready' | 'sending' | 'error';

export interface IConversationsState {
  status: IConversationsStatus;
  show: boolean;
  messageEdition: string;
  unseenMessages: number;
  currentConversation?: string;
  conversations: IConversation[];
}
export const CREATE_CONVERSATION = 'CREATE_CONVERSATION';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export const UPDATE_CONVERSATION_STATUS = 'UPDATE_CONVERSATION_STATUS';
export const TOGGLE_CONVERSATION_LIST = 'TOGGLE_CONVERSATION_LIST';
export const UPDATE_MESSAGE_EDITION = 'UPDATE_MESSAGE_EDITION';

export interface ICreateConversationAction {
  type: typeof CREATE_CONVERSATION;
  myId: string;
  targetId: string;
}

export interface IUpdateConversationAction {
  type: typeof UPDATE_CONVERSATION;
  data: IConversationMessage;
}

export interface IUpdateConversationStatusAction {
  type: typeof UPDATE_CONVERSATION_STATUS;
  status: IConversationsStatus;
}

export interface IToggleConversationListAction {
  type: typeof TOGGLE_CONVERSATION_LIST;
  value: boolean;
}

export interface IUpdateMessageEditionAction {
  type: typeof UPDATE_MESSAGE_EDITION;
  text: string;
}

export type IConversationsAction =
  | ICreateConversationAction
  | IUpdateConversationAction
  | IUpdateConversationStatusAction
  | IToggleConversationListAction
  | IUpdateMessageEditionAction;
