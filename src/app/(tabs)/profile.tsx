
import { ScrollView, StyleSheet } from 'react-native';

import AppScreen from '@/components/ui/app-screen';
import AppButton from '@/components/ui/app-button';

import { Colors, Spacing } from '@/constants/theme';

import { useProfile } from '@/features/profile/profile-context';
import { ProfileHeader } from '@/features/profile/components/profile-header';
import { ProfileBio } from '@/features/profile/components/profile-bio';
import { ProfileInterests } from '@/features/profile/components/profile-interests';
import { ProfilePrompt } from '@/features/profile/components/profile-prompt';

import { useRouter } from 'expo-router';

export default function ProfileScreen() {

    const { profile } = useProfile();
    const router = useRouter();

    return (
        <AppScreen
            title="Mon profil"
            subtitle="Voici comment les autres te découvrent."
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <ProfileHeader profile={profile} />

                <ProfileBio bio={profile.bio} />

                <ProfileInterests interests={profile.interests} />

                <ProfilePrompt prompt={profile.prompt} />

                <AppButton
                    label="Modifier mon profil"
                    onPress={() => router.push('/profile/edit')}
                />
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: Spacing.three,
        paddingBottom: Spacing.five,
    },
});
