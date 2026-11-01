import { Pressable, StyleSheet, View } from 'react-native';

import AppText from '@/components/ui/app-text';
import { Colors, Radius } from '@/constants/theme';

interface DiscoveryActionsProps {
    onPass: () => void;
    onLike: () => void;
}

export default function DiscoveryActions({
                                             onPass,
                                             onLike,
                                         }: DiscoveryActionsProps) {
    return (
        <View style={styles.container}>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Passer ce profil"
                onPress={onPass}
                style={({ pressed }) => [
                    styles.action,
                    styles.pass,
                    { opacity: pressed ? 0.65 : 1 },
                ]}
            >
                <AppText color={Colors.light.error} variant="heading">
                    ×
                </AppText>
            </Pressable>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Aimer ce profil"
                onPress={onLike}
                style={({ pressed }) => [
                    styles.action,
                    styles.like,
                    { opacity: pressed ? 0.65 : 1 },
                ]}
            >
                <AppText color={Colors.light.text} variant="heading">
                    ♥
                </AppText>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 28,
    },
    action: {
        width: 64,
        height: 64,
        borderRadius: Radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.backgroundElement,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    pass: {
        borderColor: Colors.light.error,
    },
    like: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
});