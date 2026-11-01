import { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { Colors, Radius, Spacing } from '@/constants/theme';
import { useMatch } from '@/features/matching/match-context';
import { mockMessages } from '@/features/conversation/data/mock-messages';
import type { ChatMessage } from '@/features/conversation/types/message';

import { MessageList } from '@/features/conversation/components/message-list';
import { MessageInput } from '@/features/conversation/components/message-input';

export default function ConversationScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { activeMatch, setActiveMatch } = useMatch();

    const [messages, setMessages] = useState<ChatMessage[]>(() =>
        mockMessages
            .filter((message) => message.conversationId === id)
            .sort((a, b) => b.sentAt.localeCompare(a.sentAt))
    );

    if (!activeMatch || activeMatch.conversationId !== id) {
        return (
            <SafeAreaView style={styles.unavailable}>
                <Text style={styles.unavailableTitle}>
                    Cette conversation n'est plus disponible.
                </Text>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backLink}>Retour</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    const sendMessage = (content: string) => {
        const newMessage: ChatMessage = {
            id: `message-${Date.now()}`,
            conversationId: id,
            senderId: 'user-1',
            content,
            sentAt: new Date().toISOString(),
        };

        setMessages((current) => [newMessage, ...current]);
    };

    const endEncounter = () => {
        Alert.alert(
            'Mettre fin à la rencontre ?',
            'Cette action mettra fin à votre conversation. Vous pourrez tous les deux retrouver la découverte, mais cette rencontre ne sera plus accessible.',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Mettre fin',
                    style: 'destructive',
                    onPress: () => {
                        setActiveMatch(null);
                        router.replace('/(tabs)/discover');
                    },
                },
            ]
        );
    };

    const openActionMenu = () => {
        Alert.alert(
            'Options',
            undefined,
            [
                {
                    text: 'Mettre fin à la rencontre',
                    style: 'destructive',
                    onPress: endEncounter,
                },
                {
                    text: 'Signaler ce profil',
                    onPress: () => {
                        Alert.alert(
                            'Signalement',
                            'Cette fonctionnalité sera bientôt disponible.'
                        );
                    },
                },
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}
            >
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </Pressable>

                    <Image
                        source={{ uri: activeMatch.profile.image }}
                        style={styles.avatar}
                    />

                    <View style={styles.headerInformation}>
                        <Text style={styles.name}>
                            {activeMatch.profile.firstName}
                        </Text>
                        <Text style={styles.status}>Votre rencontre</Text>
                    </View>

                    <Pressable
                        style={styles.menuButton}
                        onPress={openActionMenu}
                    >
                        <Text style={styles.menuButtonText}>⋯</Text>
                    </Pressable>
                </View>

                <View style={styles.messages}>
                    <MessageList
                        messages={messages}
                        currentUserId="user-1"
                    />
                </View>

                <MessageInput onSend={sendMessage} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    keyboardContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Colors.light.backgroundElement,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
        gap: Spacing.two,
    },
    backButton: {
        width: 36,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        fontSize: 36,
        color: Colors.light.text,
        lineHeight: 40,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: Radius.full,
    },
    headerInformation: {
        flex: 1,
        gap: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.light.text,
    },
    status: {
        fontSize: 12,
        color: Colors.light.textSecondary,
    },
    messages: {
        flex: 1,
    },
    unavailable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        padding: Spacing.four,
        gap: Spacing.three,
    },
    unavailableTitle: {
        fontSize: 16,
        color: Colors.light.text,
        textAlign: 'center',
    },
    backLink: {
        color: Colors.light.primary,
        fontWeight: '600',
    },
    menuButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButtonText: {
        fontSize: 28,
        color: Colors.light.text,
        lineHeight: 32,
    },
});