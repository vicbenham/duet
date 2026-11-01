import { FlatList, StyleSheet, View, Text } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { MessageBubble } from './message-bubble';
import type { ChatMessage } from '../types/message';

interface MessageListProps {
    messages: ChatMessage[];
    currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
    return (
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <MessageBubble
                    message={item}
                    isMine={item.senderId === currentUserId}
                />
            )}
            ListFooterComponent={
                <View style={styles.startBanner}>
                    <Text style={styles.startBannerTitle}>
                        C'est le début de quelque chose !
                    </Text>
                    <Text style={styles.startBannerText}>
                        Prenez le temps de faire connaissance et profitez de cette rencontre.
                    </Text>
                </View>
            }
            contentContainerStyle={styles.content}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            inverted
        />
    );
}

const styles = StyleSheet.create({
    content: {
        padding: Spacing.three,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    separator: {
        height: Spacing.two,
    },
    startBanner: {
        alignItems: 'center',
        paddingVertical: Spacing.four,
        paddingHorizontal: Spacing.three,
        gap: Spacing.one,
    },
    startBannerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.light.text,
        textAlign: 'center',
    },
    startBannerText: {
        fontSize: 13,
        lineHeight: 19,
        color: Colors.light.textSecondary,
        textAlign: 'center',
    },
});