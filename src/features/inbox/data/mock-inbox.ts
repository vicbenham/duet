import { ActiveMatch, LikeRequest } from '../types/inbox';

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

export const mockActiveMatch: ActiveMatch | null = null;