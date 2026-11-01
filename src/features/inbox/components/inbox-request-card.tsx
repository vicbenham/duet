import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius } from '@/constants/theme';
import { LikeRequest } from '../types/inbox';

interface InboxRequestCardProps {
    request: LikeRequest;
    onAccept: () => void;
    onDecline: () => void;
}

export function InboxRequestCard({
                                     request,
                                     onAccept,
                                     onDecline,
                                 }: InboxRequestCardProps) {
    const { profile } = request;

    return (
        <View style={styles.card}>
            <Image source={{ uri: profile.image }} style={styles.image} />

            <View style={styles.info}>
                <Text style={styles.name}>
                    {profile.firstName}, {profile.age}
                </Text>
                <Text style={styles.city}>{profile.city}</Text>
                <Text style={styles.receivedAt}>{request.receivedAt}</Text>

                <View style={styles.actions}>
                    <Pressable onPress={onDecline} style={styles.declineButton}>
                        <Text style={styles.declineText}>Décliner</Text>
                    </Pressable>

                    <Pressable onPress={onAccept} style={styles.acceptButton}>
                        <Text style={styles.acceptText}>Répondre</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.light.backgroundElement,
        borderRadius: Radius.medium,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        gap: 14,
    },
    image: {
        width: 92,
        height: 112,
        borderRadius: Radius.small,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.light.text,
    },
    city: {
        fontSize: 13,
        color: Colors.light.textSecondary,
        marginTop: 3,
    },
    receivedAt: {
        fontSize: 11,
        color: Colors.light.textSecondary,
        marginTop: 6,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    declineButton: {
        flex: 1,
        paddingVertical: 9,
        alignItems: 'center',
        borderRadius: Radius.full,
        backgroundColor: Colors.light.backgroundSelected,
    },
    declineText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.text,
    },
    acceptButton: {
        flex: 1,
        paddingVertical: 9,
        alignItems: 'center',
        borderRadius: Radius.full,
        backgroundColor: Colors.light.primary,
    },
    acceptText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.light.white,
    },
});