import { StoreState } from '../../../redux';
import { Ticket, Channel, DM } from '../../../types/services';

export const getActiveConversation = (communication: StoreState['communication'], activeId: string): Channel | Ticket | DM | undefined => {
  const activeChannel = communication
    .channels
    .find(channel => channel._id === communication.active.value);

  const activeTicket = communication
    .tickets
    .find(ticket => ticket._id === communication.active.value);

  const activeDm = communication
    .dms
    .find(dm => dm._id === communication.active.value);

  if (activeChannel) return activeChannel;
  if (activeTicket) return activeTicket;
  if (activeDm) return activeDm;
};
