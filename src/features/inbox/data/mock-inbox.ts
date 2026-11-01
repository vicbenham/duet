import { Conversation, LikeRequest } from '../types/inbox';

export const mockRequests: LikeRequest[] = [
    {
        id: 'request-1',
        profile: {
            id: 'profile-4',
            firstName: 'Julie',
            age: 26,
            city: 'Paris',
            image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=900',
        },
        receivedAt: 'Il y a 20 min',
    },
    {
        id: 'request-2',
        profile: {
            id: 'profile-5',
            firstName: 'Sarah',
            age: 28,
            city: 'Montreuil',
            image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900',
        },
        receivedAt: 'Il y a 2 h',
    },
];

export const mockConversations: Conversation[] = [
    {
        id: 'conversation-1',
        profile: {
            id: 'profile-6',
            firstName: 'Clara',
            age: 27,
            city: 'Paris',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900',
        },
        lastMessage: 'J\'aime beaucoup cette idée de voyage !',
        lastMessageAt: '14:32',
        unreadCount: 2,
    },
    {
        id: 'conversation-2',
        profile: {
            id: 'profile-7',
            firstName: 'Manon',
            age: 25,
            city: 'Vincennes',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900',
        },
        lastMessage: 'Haha, complètement d’accord !',
        lastMessageAt: 'Hier',
        unreadCount: 0,
    },
];