
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { useState, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '@/components/ui/app-text';
import AppButton from '@/components/ui/app-button';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { mockProfiles } from '@/features/discovery/data/mock-profiles';

import {
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';

export default function PublicProfileScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const profile = mockProfiles.find((item) => item.id === id);

    const [photoVisible, setPhotoVisible] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const galleryRef = useRef<FlatList<string>>(null);
    const screenWidth = Dimensions.get('window').width;

    const openGallery = () => {
        setCurrentPhotoIndex(0);
        setPhotoVisible(true);
    };

    const handleGalleryScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
        );

        setCurrentPhotoIndex(index);
    };

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
                <Pressable onPress={openGallery}>
                    <Image
                        source={{ uri: profile.photos[0] }}
                        style={styles.photo}
                    />
                    <View style={styles.photoHint}>
                        <AppText variant="caption" color="#FFFFFF">
                            Voir les photos
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

                    <FlatList
                        ref={galleryRef}
                        data={profile.photos}
                        horizontal
                        pagingEnabled
                        snapToInterval={screenWidth}
                        snapToAlignment="start"
                        decelerationRate="fast"
                        disableIntervalMomentum
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        getItemLayout={(_, index) => ({
                            length: screenWidth,
                            offset: screenWidth * index,
                            index,
                        })}
                        onMomentumScrollEnd={handleGalleryScroll}
                        renderItem={({ item }) => (
                            <View style={{ width: screenWidth, flex: 1 }}>
                                <Image
                                    source={{ uri: item }}
                                    style={{ width: screenWidth, height: '100%' }}
                                    resizeMode="contain"
                                />
                            </View>
                        )}
                    />

                    <View style={styles.galleryIndicator}>
                        <AppText variant="bodySmall" color="#FFFFFF">
                            {currentPhotoIndex + 1} / {profile.photos.length}
                        </AppText>
                        <View style={styles.galleryDots}>
                            {profile.photos.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.galleryDot,
                                        index === currentPhotoIndex && styles.activeDot,
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
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
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.four,
        gap: Spacing.three,
    },
    photoModal: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    fullscreenPhoto: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 55,
        right: 24,
        zIndex: 10,
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Radius.full,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    galleryIndicator: {
        position: 'absolute',
        bottom: 45,
        alignSelf: 'center',
        alignItems: 'center',
        gap: Spacing.two,
    },
    galleryDots: {
        flexDirection: 'row',
        gap: Spacing.two,
    },
    galleryDot: {
        width: 7,
        height: 7,
        borderRadius: Radius.full,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    activeDot: {
        width: 20,
        backgroundColor: '#FFFFFF',
    },
});
