import { StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';
import type { ChatMessage } from '../types/message';

interface MessageBubbleProps {
    message: ChatMessage;
    isMine: boolean;
}

export function MessageBubble({ message, isMine }: MessageBubbleProps) {
    const time = new Date(message.sentAt).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <View style={[
            styles.container,
            isMine ? styles.myContainer : styles.theirContainer,
        ]}>
            <View style={[
                styles.bubble,
                isMine ? styles.myBubble : styles.theirBubble,
            ]}>
                <Text style={[
                    styles.message,
                    isMine ? styles.myMessage : styles.theirMessage,
                ]}>
                    {message.content}
                </Text>
            </View>

            <Text style={[
                styles.time,
                isMine ? styles.myTime : styles.theirTime,
            ]}>
                {time}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '82%',
        gap: Spacing.half,
    },
    myContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    theirContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    bubble: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Radius.large,
    },
    myBubble: {
        backgroundColor: Colors.light.primary,
        borderBottomRightRadius: Radius.small,
    },
    theirBubble: {
        backgroundColor: Colors.light.backgroundElement,
        borderBottomLeftRadius: Radius.small,
    },
    message: {
        fontSize: 15,
        lineHeight: 21,
    },
    myMessage: {
        color: Colors.light.white,
    },
    theirMessage: {
        color: Colors.light.text,
    },
    time: {
        fontSize: 11,
        color: Colors.light.textSecondary,
        marginHorizontal: Spacing.one,
    },
    myTime: {
        textAlign: 'right',
    },
    theirTime: {
        textAlign: 'left',
    },
});