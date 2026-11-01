import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius } from '@/constants/theme';
import { ActiveMatch } from '../types/inbox';

interface ActiveMatchCardProps {
    match: ActiveMatch;
    onPress: () => void;
}

export function ActiveMatchCard({
                                    match,
                                    onPress,
                                }: ActiveMatchCardProps) {
    const { profile } = match;

    return (
        <Pressable onPress={onPress} style={styles.card}>
            <Image source={{ uri: profile.image }} style={styles.image} />

            <View style={styles.info}>
                <Text style={styles.name}>
                    {profile.firstName}, {profile.age}
                </Text>

                <Text style={styles.city}>{profile.city}</Text>

                <Text style={styles.message} numberOfLines={1}>
                    {match.lastMessage}
                </Text>
            </View>

            <Text style={styles.time}>{match.lastMessageAt}</Text>
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
        width: 64,
        height: 64,
        borderRadius: Radius.full,
    },
    info: {
        flex: 1,
        gap: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.light.text,
    },
    city: {
        fontSize: 12,
        color: Colors.light.textSecondary,
    },
    message: {
        fontSize: 13,
        color: Colors.light.textSecondary,
    },
    time: {
        fontSize: 11,
        color: Colors.light.textSecondary,
    },
});