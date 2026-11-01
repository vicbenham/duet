import { ImageBackground, StyleSheet, View } from 'react-native';

import AppText from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';

import { Profile } from '../types/profile';

interface ProfileCardProps {
    profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
    return (
        <ImageBackground
            source={{ uri: profile.image }}
            style={styles.card}
            imageStyle={styles.image}
        >
            <View style={styles.overlay}>
                <View style={styles.topInfo}>
                    <AppText variant="bodySmall" color="#FFFFFF">
                        {profile.city} · {profile.distance} km
                    </AppText>
                </View>

                <View style={styles.profileInfo}>
                    <AppText variant="heading" color="#FFFFFF">
                        {profile.firstName}, {profile.age}
                    </AppText>

                    <AppText variant="bodySmall" color="#FFFFFF">
                        {profile.occupation}
                    </AppText>

                    <AppText variant="body" color="#FFFFFF">
                        {profile.bio}
                    </AppText>

                    <View style={styles.interests}>
                        {profile.commonInterests.map((interest) => (
                            <View key={interest} style={styles.interestTag}>
                                <AppText variant="caption" color={Colors.light.text}>
                                    {interest}
                                </AppText>
                            </View>
                        ))}
                    </View>

                    <View style={styles.prompt}>
                        <AppText variant="label" color="#FFFFFF">
                            {profile.prompt.question}
                        </AppText>

                        <AppText variant="bodySmall" color="#FFFFFF">
                            {profile.prompt.answer}
                        </AppText>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderRadius: Radius.large,
        backgroundColor: '#777783',
    },
    image: {
        borderRadius: Radius.large,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        padding: Spacing.three,
        backgroundColor: 'rgba(20, 20, 30, 0.12)',
    },
    topInfo: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(30, 30, 40, 0.45)',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Radius.full,
    },
    profileInfo: {
        gap: Spacing.two,
        paddingTop: Spacing.five,
        backgroundColor: 'rgba(20, 20, 30, 0.35)',
        marginHorizontal: -Spacing.three,
        marginBottom: -Spacing.three,
        paddingHorizontal: Spacing.three,
        paddingBottom: Spacing.four,
    },
    interests: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.two,
        marginTop: Spacing.two,
    },
    interestTag: {
        backgroundColor: '#F5EDE7',
        borderRadius: Radius.full,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
    },
    prompt: {
        gap: Spacing.two,
        borderLeftWidth: 2,
        borderLeftColor: Colors.light.primary,
        paddingLeft: Spacing.three,
        marginTop: Spacing.two,
    },
});