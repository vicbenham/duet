import { UserProfile } from '../types/user-profile';

export const mockProfile: UserProfile = {
    id: 'user-1',
    firstName: 'Alexandre',
    birthDate: '1999-06-15',
    city: 'Paris',
    occupation: 'Software Engineer',
    bio: 'Curieux de nature, passionné par la technologie, les voyages et les belles découvertes. Je préfère les conversations qui durent des heures aux discussions superficielles.',
    photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900',
    ],
    interests: [
        'Cinéma',
        'Voyages',
        'Musique',
        'Technologie',
        'Photographie',
        'Cuisine',
    ],
    prompt: {
        question: 'Le meilleur moyen de me séduire ?',
        answer: 'Me proposer une aventure improvisée et une bonne adresse pour dîner.',
    },
};
