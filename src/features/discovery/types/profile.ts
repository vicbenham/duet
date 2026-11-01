export interface Profile {
    id: string;
    firstName: string;
    age: number;
    city: string;
    distance: number;
    occupation: string;
    bio: string;
    interests: string[];
    commonInterests: string[];
    prompt: {
        question: string;
        answer: string;
    };
    photos: string[];
}