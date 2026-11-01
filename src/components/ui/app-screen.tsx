import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';

interface AppScreenProps {
    title: string;
    subtitle?: string;
    children?: ReactNode;
}

export default function AppScreen({
                                      title,
                                      subtitle,
                                      children,
                                  }: AppScreenProps) {
    const colors = Colors.light;

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {title}
                    </Text>

                    {subtitle && (
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.three,
    },
    header: {
        gap: Spacing.two,
        marginBottom: Spacing.four,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: -0.8,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
    },
});