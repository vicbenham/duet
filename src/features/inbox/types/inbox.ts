export interface InboxProfile {
    id: string;
    firstName: string;
    age: number;
    city: string;
    photos: string[];
}

export interface LikeRequest {
    id: string;
    profile: InboxProfile;
    receivedAt: string;
}

export interface ActiveMatch {
    id: string;
    profile: InboxProfile;
    conversationId: string;
    matchedAt: string;
    lastMessage: string;
    lastMessageAt: string;
}