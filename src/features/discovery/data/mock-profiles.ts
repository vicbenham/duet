import { Profile } from '../types/profile';

export const mockProfiles: Profile[] = [
    {
        id: '1',
        firstName: 'Camille',
        age: 26,
        city: 'Paris',
        distance: 4,
        occupation: 'Architecte',
        bio: 'Toujours partante pour découvrir un nouvel endroit ou refaire le monde autour d’un café.',
        interests: ['Architecture', 'Voyages', 'Photographie', 'Cinéma'],
        commonInterests: ['Voyages', 'Cinéma'],
        prompt: {
            question: 'Un dimanche idéal ?',
            answer: 'Un marché le matin, une exposition l’après-midi et un bon dîner.',
        },
        image:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900',
    },
    {
        id: '2',
        firstName: 'Emma',
        age: 28,
        city: 'Montreuil',
        distance: 7,
        occupation: 'Graphiste',
        bio: 'Créative, curieuse et toujours à la recherche de nouvelles expériences.',
        interests: ['Musique', 'Art', 'Cuisine', 'Randonnée'],
        commonInterests: ['Musique', 'Art'],
        prompt: {
            question: 'La chose que tu aimerais apprendre ?',
            answer: 'Jouer du piano et enfin maîtriser quelques morceaux de jazz.',
        },
        image:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900',
    },
    {
        id: '3',
        firstName: 'Léa',
        age: 25,
        city: 'Vincennes',
        distance: 9,
        occupation: 'Enseignante',
        bio: 'J’aime les discussions qui durent des heures et les escapades improvisées.',
        interests: ['Lecture', 'Nature', 'Voyages', 'Cuisine'],
        commonInterests: ['Voyages', 'Cuisine'],
        prompt: {
            question: 'Ton prochain voyage ?',
            answer: 'Le Japon, pour ses paysages, sa cuisine et sa culture.',
        },
        image:
            'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900',
    },
];