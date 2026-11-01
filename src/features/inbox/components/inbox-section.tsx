import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

interface InboxSectionProps {
    title: string;
    count?: number;
    children: ReactNode;
}

export function InboxSection({
                                 title,
                                 count,
                                 children,
                             }: InboxSectionProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {count !== undefined && (
                    <Text style={styles.count}>{count}</Text>
                )}
            </View>

            <View style={styles.content}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 28,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        gap: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    count: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.light.primary,
        backgroundColor: Colors.light.backgroundSelected,
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 20,
        overflow: 'hidden',
    },
    content: {
        gap: 12,
    },
});