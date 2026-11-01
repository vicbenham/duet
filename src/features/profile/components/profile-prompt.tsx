
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';
import { UserProfile } from '../types/user-profile';

interface ProfilePromptProps {
    prompt: UserProfile['prompt'];
}

export function ProfilePrompt({ prompt }: ProfilePromptProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>POUR FAIRE CONNAISSANCE</Text>

            <Text style={styles.question}>
                {prompt.question}
            </Text>

            <Text style={styles.answer}>
                {prompt.answer}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.backgroundSelected,
        borderRadius: Radius.large,
        padding: Spacing.four,
        gap: Spacing.three,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: Colors.light.textSecondary,
    },
    question: {
        fontSize: 20,
        lineHeight: 27,
        fontWeight: '700',
        color: Colors.light.text,
    },
    answer: {
        fontSize: 15,
        lineHeight: 23,
        color: Colors.light.text,
    },
});
