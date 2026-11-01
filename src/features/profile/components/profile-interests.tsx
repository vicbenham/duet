
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

interface ProfileInterestsProps {
    interests: string[];
}

export function ProfileInterests({ interests }: ProfileInterestsProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ce qui m'intéresse</Text>

            <View style={styles.tags}>
                {interests.map((interest) => (
                    <View key={interest} style={styles.tag}>
                        <Text style={styles.tagText}>{interest}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.backgroundElement,
        borderRadius: Radius.large,
        borderWidth: 1,
        borderColor: Colors.light.border,
        padding: Spacing.three,
        gap: Spacing.three,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.light.text,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.two,
    },
    tag: {
        backgroundColor: Colors.light.backgroundSelected,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Radius.full,
    },
    tagText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.light.text,
    },
});
