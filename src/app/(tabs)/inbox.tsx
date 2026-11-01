import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@/constants/theme';
import AppScreen from '@/components/ui/app-screen';

import { InboxSection } from '@/features/inbox/components/inbox-section';
import { InboxRequestCard } from '@/features/inbox/components/inbox-request-card';
import { ConversationCard } from '@/features/inbox/components/conversation-card';

import { mockRequests, mockConversations } from '@/features/inbox/data/mock-inbox';
import { Conversation, LikeRequest } from '@/features/inbox/types/inbox';

export default function InboxScreen() {
    const [requests, setRequests] = useState<LikeRequest[]>(mockRequests);
    const [conversations, setConversations] =
        useState<Conversation[]>(mockConversations);

    const acceptRequest = (request: LikeRequest) => {
        const newConversation: Conversation = {
            id: `conversation-${request.id}`,
            profile: request.profile,
            lastMessage: 'La conversation commence ici !',
            lastMessageAt: 'Maintenant',
            unreadCount: 0,
        };

        setRequests((current) =>
            current.filter((item) => item.id !== request.id)
        );

        setConversations((current) => [newConversation, ...current]);
    };

    const declineRequest = (requestId: string) => {
        setRequests((current) =>
            current.filter((item) => item.id !== requestId)
        );
    };

    const openConversation = (conversation: Conversation) => {
        Alert.alert(
            'Conversation',
            `La conversation avec ${conversation.profile.firstName} sera bientôt disponible.`
        );
    };

    return (
        <AppScreen title="Messages" subtitle="Les belles rencontres commencent ici.">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <InboxSection title="Demandes reçues" count={requests.length}>
                    {requests.length > 0 ? (
                        requests.map((request) => (
                            <InboxRequestCard
                                key={request.id}
                                request={request}
                                onAccept={() => acceptRequest(request)}
                                onDecline={() => declineRequest(request.id)}
                            />
                        ))
                    ) : (
                        <Text style={styles.emptyText}>
                            Aucune nouvelle demande pour le moment.
                        </Text>
                    )}
                </InboxSection>

                <InboxSection title="Conversations" count={conversations.length}>
                    {conversations.length > 0 ? (
                        conversations.map((conversation) => (
                            <ConversationCard
                                key={conversation.id}
                                conversation={conversation}
                                onPress={() => openConversation(conversation)}
                            />
                        ))
                    ) : (
                        <Text style={styles.emptyText}>
                            Tes conversations apparaîtront ici.
                        </Text>
                    )}
                </InboxSection>
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: 32,
    },
    emptyText: {
        fontSize: 13,
        color: Colors.light.textSecondary,
        paddingVertical: 18,
        textAlign: 'center',
    },
});