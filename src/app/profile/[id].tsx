
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '@/components/ui/app-text';
import AppButton from '@/components/ui/app-button';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { mockProfiles } from '@/features/discovery/data/mock-profiles';

export default function PublicProfileScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [photoVisible, setPhotoVisible] = useState(false);

    const profile = mockProfiles.find((item) => item.id === id);

    if (!profile) {
        return (
            <SafeAreaView style={styles.screen}>
                <View style={styles.notFound}>
                    <AppText variant="subtitle">
                        Profil indisponible
                    </AppText>
                    <AppButton
                        label="Retour"
                        variant="secondary"
                        onPress={() => router.back()}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            <View style={styles.header}>
                <AppButton
                    label="Retour"
                    variant="outline"
                    onPress={() => router.back()}
                />
                <AppText variant="subtitle">
                    Profil
                </AppText>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Pressable onPress={() => setPhotoVisible(true)}>
                    <Image
                        source={{ uri: profile.image }}
                        style={styles.photo}
                    />
                    <View style={styles.photoHint}>
                        <AppText variant="caption" color="#FFFFFF">
                            Agrandir la photo
                        </AppText>
                    </View>
                </Pressable>

                <View style={styles.identity}>
                    <AppText variant="heading">
                        {profile.firstName}, {profile.age}
                    </AppText>

                    <AppText color={Colors.light.textSecondary}>
                        {profile.occupation}
                    </AppText>

                    <AppText color={Colors.light.textSecondary}>
                        {profile.city} · {profile.distance} km
                    </AppText>
                </View>

                <View style={styles.section}>
                    <AppText variant="subtitle">
                        À propos
                    </AppText>
                    <AppText>
                        {profile.bio}
                    </AppText>
                </View>

                <View style={styles.section}>
                    <AppText variant="subtitle">
                        Ses centres d'intérêt
                    </AppText>

                    <View style={styles.interests}>
                        {profile.interests.map((interest) => (
                            <View key={interest} style={styles.interestTag}>
                                <AppText variant="caption">
                                    {interest}
                                </AppText>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.prompt}>
                    <AppText variant="label">
                        {profile.prompt.question}
                    </AppText>
                    <AppText variant="body">
                        {profile.prompt.answer}
                    </AppText>
                </View>
            </ScrollView>

            <Modal
                visible={photoVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setPhotoVisible(false)}
                statusBarTranslucent
            >
                <View style={styles.photoModal}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setPhotoVisible(false)}
                    >
                        <AppText variant="heading" color="#FFFFFF">
                            ×
                        </AppText>
                    </Pressable>

                    <Image
                        source={{ uri: profile.image }}
                        style={styles.fullscreenPhoto}
                        resizeMode="contain"
                    />

                    <AppText variant="caption" color="#FFFFFF">
                        {profile.firstName}
                    </AppText>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.three,
        backgroundColor: Colors.light.backgroundElement,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    headerSpacer: {
        width: 72,
    },
    content: {
        padding: Spacing.three,
        paddingBottom: Spacing.six,
        gap: Spacing.four,
    },
    photo: {
        width: '100%',
        height: 420,
        borderRadius: Radius.large,
        backgroundColor: Colors.light.backgroundSelected,
    },
    photoHint: {
        position: 'absolute',
        bottom: Spacing.three,
        right: Spacing.three,
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Radius.full,
    },
    identity: {
        gap: Spacing.one,
    },
    section: {
        gap: Spacing.two,
    },
    interests: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.two,
    },
    interestTag: {
        backgroundColor: Colors.light.backgroundElement,
        borderRadius: Radius.full,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    prompt: {
        gap: Spacing.two,
        padding: Spacing.three,
        borderLeftWidth: 3,
        borderLeftColor: Colors.light.primary,
        backgroundColor: Colors.light.backgroundElement,
        borderRadius: Radius.medium,
    },
    photoModal: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.three,
        gap: Spacing.three,
    },
    fullscreenPhoto: {
        width: '100%',
        height: '85%',
    },
    closeButton: {
        position: 'absolute',
        top: 55,
        right: 24,
        zIndex: 1,
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Radius.full,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.four,
        gap: Spacing.three,
    },
});
