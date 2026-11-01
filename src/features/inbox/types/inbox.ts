export interface InboxProfile {
    id: string;
    firstName: string;
    age: number;
    city: string;
    image: string;
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