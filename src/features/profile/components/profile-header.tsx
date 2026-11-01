import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';
import type { UserProfile } from '@/features/profile/types/user-profile';

interface ProfileHeaderProps {
    profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    const birthDate = new Date(`${profile.birthDate}T00:00:00`);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayHasPassed =
        today.getMonth() > birthDate.getMonth() ||
        (
            today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate()
        );

    if (!birthdayHasPassed) {
        age--;
    }

    return (
        <View style={styles.container}>
            <View style={styles.gallery}>
                {profile.photos.map((photo, index) => (
                    <View
                        key={`${photo}-${index}`}
                        style={[
                            styles.photoContainer
                        ]}
                    >
                        <Image
                            source={{ uri: photo }}
                            style={styles.photo}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.information}>
                <Text style={styles.name}>
                    {profile.firstName}, {age}
                </Text>

                <Text style={styles.details}>
                    {profile.occupation} · {profile.city}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.three,
    },
    gallery: {
        gap: Spacing.two,
    },
    photoContainer: {
        width: '100%',
        height: 340,
        overflow: 'hidden',
        borderRadius: Radius.medium,
        backgroundColor: Colors.light.backgroundSelected,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    information: {
        gap: Spacing.one,
    },
    name: {
        fontSize: 26,
        fontWeight: '700',
        color: Colors.light.text,
    },
    details: {
        fontSize: 14,
        color: Colors.light.textSecondary,
    },
});