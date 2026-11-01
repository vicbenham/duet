import type { ChatMessage } from '../types/message';

export const mockMessages: ChatMessage[] = [
    {
        id: 'message-1',
        conversationId: 'conversation-request-1',
        senderId: 'user-1',
        content: 'Salut Julie ! Ravi qu’on puisse faire connaissance 😊',
        sentAt: '2026-11-01T14:30:00',
    },
    {
        id: 'message-2',
        conversationId: 'conversation-request-1',
        senderId: 'julie',
        content: 'Coucou ! Moi aussi 😊 J’aime beaucoup ton profil, notamment ton côté voyageur !',
        sentAt: '2026-11-01T14:32:00',
    },
    {
        id: 'message-3',
        conversationId: 'conversation-request-1',
        senderId: 'user-1',
        content: 'Merci ! Tu as une destination préférée parmi celles que tu as visitées ?',
        sentAt: '2026-11-01T14:34:00',
    },
    {
        id: 'message-4',
        conversationId: 'conversation-request-1',
        senderId: 'julie',
        content: 'Difficile de choisir… Mais je dirais Lisbonne, sans hésiter !',
        sentAt: '2026-11-01T14:36:00',
    },
];