import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius } from '@/constants/theme';
import { Conversation } from '../types/inbox';

interface ConversationCardProps {
    conversation: Conversation;
    onPress: () => void;
}

export function ConversationCard({
                                     conversation,
                                     onPress,
                                 }: ConversationCardProps) {
    const { profile } = conversation;

    return (
        <Pressable onPress={onPress} style={styles.card}>
            <Image source={{ uri: profile.image }} style={styles.image} />

            <View style={styles.info}>
                <Text style={styles.name}>{profile.firstName}</Text>
                <Text style={styles.message} numberOfLines={1}>
                    {conversation.lastMessage}
                </Text>
            </View>

            <View style={styles.meta}>
                <Text style={styles.time}>{conversation.lastMessageAt}</Text>
                {conversation.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>
                            {conversation.unreadCount}
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.backgroundElement,
        padding: 12,
        borderRadius: Radius.medium,
        borderWidth: 1,
        borderColor: Colors.light.border,
        gap: 12,
    },
    image: {
        width: 58,
        height: 58,
        borderRadius: Radius.full,
    },
    info: {
        flex: 1,
        gap: 5,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.light.text,
    },
    message: {
        fontSize: 13,
        color: Colors.light.textSecondary,
    },
    meta: {
        alignItems: 'flex-end',
        gap: 8,
    },
    time: {
        fontSize: 11,
        color: Colors.light.textSecondary,
    },
    unreadBadge: {
        minWidth: 21,
        height: 21,
        paddingHorizontal: 5,
        borderRadius: Radius.full,
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.light.white,
    },
});