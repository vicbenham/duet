
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

interface ProfileBioProps {
    bio: string;
}

export function ProfileBio({ bio }: ProfileBioProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quelques mots sur moi</Text>
            <Text style={styles.bio}>{bio}</Text>
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
        gap: Spacing.two,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.light.text,
    },
    bio: {
        fontSize: 14,
        lineHeight: 22,
        color: Colors.light.textSecondary,
    },
});
