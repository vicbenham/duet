import { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

interface MessageInputProps {
    onSend: (content: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
    const [content, setContent] = useState('');

    const sendMessage = () => {
        const trimmedContent = content.trim();

        if (!trimmedContent) return;

        onSend(trimmedContent);
        setContent('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={setContent}
                placeholder="Écris ton message..."
                placeholderTextColor={Colors.light.textSecondary}
                maxLength={2000}
                returnKeyType="send"
                onSubmitEditing={sendMessage}
            />

            <Pressable
                style={[
                    styles.sendButton,
                    !content.trim() && styles.disabledButton,
                ]}
                onPress={sendMessage}
                disabled={!content.trim()}
            >
                <Text style={styles.sendButtonText}>↑</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: Spacing.two,
        paddingHorizontal: Spacing.three,
        paddingTop: Spacing.two,
        paddingBottom: Spacing.four,
        backgroundColor: Colors.light.backgroundElement,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
    },
    input: {
        flex: 1,
        height: 44,
        paddingHorizontal: Spacing.three,
        paddingVertical: 0,
        borderRadius: Radius.large,
        backgroundColor: Colors.light.background,
        color: Colors.light.text,
        fontSize: 15,
        textAlignVertical: 'center',
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: Radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.primary,
    },
    sendButtonText: {
        color: Colors.light.white,
        fontSize: 26,
        fontWeight: '600',
        lineHeight: 30,
    },
    disabledButton: {
        opacity: 0.4,
    },
});