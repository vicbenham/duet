import { Colors, Radius, Spacing } from '@/constants/theme';
import type { UserProfile } from '@/features/profile/types/user-profile';

import { useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';

interface ProfileHeaderProps {
    profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const { width, height } = useWindowDimensions();

    const closePhoto = () => setSelectedPhoto(null);

    const navigatePhoto = (direction: -1 | 1) => {
        if (selectedPhoto === null) return;

        const nextIndex = selectedPhoto + direction;

        if (nextIndex >= 0 && nextIndex < profile.photos.length) {
            setSelectedPhoto(nextIndex);
        }
    };

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
                    <Pressable
                        key={`${photo}-${index}`}
                        style={styles.photoContainer}
                        onPress={() => setSelectedPhoto(index)}
                    >
                        <Image
                            source={{ uri: photo }}
                            style={styles.photo}
                        />
                    </Pressable>
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

            <Modal
                visible={selectedPhoto !== null}
                transparent
                animationType="fade"
                statusBarTranslucent
                onRequestClose={closePhoto}
            >
                <StatusBar hidden />

                <View style={styles.modalContainer}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={closePhoto}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </Pressable>

                    {selectedPhoto !== null && (
                        <>
                            <Image
                                source={{ uri: profile.photos[selectedPhoto] }}
                                style={{
                                    width,
                                    height: height * 0.8,
                                }}
                                resizeMode="contain"
                            />

                            <View style={styles.navigation}>
                                <Pressable
                                    onPress={() => navigatePhoto(-1)}
                                    disabled={selectedPhoto === 0}
                                    style={[
                                        styles.navigationButton,
                                        selectedPhoto === 0 && styles.disabledButton,
                                    ]}
                                >
                                    <Text style={styles.navigationText}>‹</Text>
                                </Pressable>

                                <Text style={styles.counter}>
                                    {selectedPhoto + 1} / {profile.photos.length}
                                </Text>

                                <Pressable
                                    onPress={() => navigatePhoto(1)}
                                    disabled={selectedPhoto === profile.photos.length - 1}
                                    style={[
                                        styles.navigationButton,
                                        selectedPhoto === profile.photos.length - 1 &&
                                        styles.disabledButton,
                                    ]}
                                >
                                    <Text style={styles.navigationText}>›</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 55,
        right: 24,
        zIndex: 2,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 30,
        lineHeight: 34,
    },
    navigation: {
        position: 'absolute',
        bottom: 55,
        width: '65%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    navigationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationText: {
        color: '#FFFFFF',
        fontSize: 32,
        lineHeight: 36,
    },
    counter: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.3,
    }
});