export interface UserProfile {
    id: string;
    firstName: string;
    birthDate: string;
    city: string;
    occupation: string;
    bio: string;
    photos: string[];
    interests: string[];
    prompt: {
        question: string;
        answer: string;
    };
}
