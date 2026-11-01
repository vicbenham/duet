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

export interface Conversation {
    id: string;
    profile: InboxProfile;
    lastMessage: string;
    lastMessageAt: string;
    unreadCount: number;
}