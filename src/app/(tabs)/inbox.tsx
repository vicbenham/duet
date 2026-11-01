import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/theme';
import AppScreen from '@/components/ui/app-screen';

import { InboxSection } from '@/features/inbox/components/inbox-section';
import { InboxRequestCard } from '@/features/inbox/components/inbox-request-card';
import { ActiveMatchCard } from '@/features/inbox/components/active-match-card';

import { mockRequests } from '@/features/inbox/data/mock-inbox';

import { useMatch } from '@/features/matching/match-context';
import type { ActiveMatch, LikeRequest } from '@/features/inbox/types/inbox';

export default function InboxScreen() {
    const [requests, setRequests] = useState<LikeRequest[]>(mockRequests);
    const { activeMatch, setActiveMatch } = useMatch();

    const acceptRequest = (request: LikeRequest) => {
        if (activeMatch !== null) {
            return;
        }

        const newMatch: ActiveMatch = {
            id: `match-${request.id}`,
            profile: request.profile,
            conversationId: `conversation-${request.id}`,
            matchedAt: new Date().toISOString(),
            lastMessage: 'Votre rencontre commence ici !',
            lastMessageAt: 'Maintenant',
        };

        setActiveMatch(newMatch);
        setRequests([]);
    };

    const declineRequest = (requestId: string) => {
        setRequests((current) =>
            current.filter((request) => request.id !== requestId)
        );
    };

    const openMatch = (match: ActiveMatch) => {
        Alert.alert(
            'Votre rencontre',
            `Votre conversation avec ${match.profile.firstName} sera bientôt disponible.`
        );
    };

    return (
        <AppScreen
            title="Messages"
            subtitle={
                activeMatch
                    ? 'Une rencontre à la fois.'
                    : 'Les belles rencontres commencent ici.'
            }
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {activeMatch ? (
                    <InboxSection title="Ta rencontre">
                        <ActiveMatchCard
                            match={activeMatch}
                            onPress={() => openMatch(activeMatch)}
                        />
                        <Text style={styles.matchDescription}>
                            Tu es actuellement engagé dans une rencontre. Prends le temps
                            de découvrir cette personne : les autres profils attendront.
                        </Text>
                    </InboxSection>
                ) : (
                    <InboxSection
                        title="Demandes reçues"
                        count={requests.length}
                    >
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
                )}
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
    matchDescription: {
        fontSize: 13,
        lineHeight: 20,
        color: Colors.light.textSecondary,
        marginTop: 12,
        paddingHorizontal: 4,
    },
});