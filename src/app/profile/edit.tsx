import { useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import AppScreen from '@/components/ui/app-screen';
import AppButton from '@/components/ui/app-button';
import { Colors, Radius, Spacing } from '@/constants/theme';

import { useProfile } from '@/features/profile/profile-context';
import type { UserProfile } from '@/features/profile/types/user-profile';

export default function EditProfileScreen() {
    const router = useRouter();
    const { profile, setProfile } = useProfile();

    const [draft, setDraft] = useState<UserProfile>(profile);
    const [interestsText, setInterestsText] = useState(profile.interests.join(', '));

    const updateField = <K extends keyof UserProfile>(
        field: K,
        value: UserProfile[K],
    ) => {
        setDraft((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const updatePrompt = (field: 'question' | 'answer', value: string) => {
        setDraft((current) => ({
            ...current,
            prompt: {
                ...current.prompt,
                [field]: value,
            },
        }));
    };

    const addPhoto = async () => {
        if (draft.photos.length >= 4) {
            Alert.alert('Limite atteinte', 'Tu peux ajouter jusqu’à 4 photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 5],
            quality: 0.85,
        });

        if (result.canceled || !result.assets[0]) return;

        updateField('photos', [...draft.photos, result.assets[0].uri]);
    };

    const removePhoto = (index: number) => {
        if (draft.photos.length <= 1) {
            Alert.alert(
                'Photo obligatoire',
                'Ton profil doit conserver au moins une photo.',
            );
            return;
        }

        Alert.alert(
            'Supprimer cette photo ?',
            'Cette photo sera retirée de ton profil.',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        updateField(
                            'photos',
                            draft.photos.filter((_, photoIndex) => photoIndex !== index),
                        );
                    },
                },
            ],
        );
    };

    const movePhoto = (index: number, direction: -1 | 1) => {
        const targetIndex = index + direction;

        if (targetIndex < 0 || targetIndex >= draft.photos.length) return;

        const photos = [...draft.photos];
        [photos[index], photos[targetIndex]] = [
            photos[targetIndex],
            photos[index],
        ];

        updateField('photos', photos);
    };

    const saveProfile = () => {
        const interests = interestsText
            .split(',')
            .map((interest) => interest.trim())
            .filter(Boolean);

        setProfile({
            ...draft,
            interests,
        });

        router.back();
    };

    return (
        <AppScreen
            title="Modifier mon profil"
            subtitle="Quelques détails pour mieux te présenter."
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mes photos</Text>
                    <Text style={styles.helper}>
                        Ta première photo sera celle affichée en priorité.
                    </Text>

                    <View style={styles.photosGrid}>
                        {draft.photos.map((photo, index) => (
                            <View key={`${photo}-${index}`} style={styles.photoContainer}>
                                <Image source={{ uri: photo }} style={styles.photo} />

                                {index === 0 && (
                                    <View style={styles.primaryBadge}>
                                        <Text style={styles.primaryBadgeText}>
                                            Principale
                                        </Text>
                                    </View>
                                )}

                                <Pressable
                                    style={styles.removeButton}
                                    onPress={() => removePhoto(index)}
                                >
                                    <Text style={styles.removeButtonText}>×</Text>
                                </Pressable>

                                <View style={styles.photoActions}>
                                    <Pressable
                                        style={[
                                            styles.photoAction,
                                            index === 0 && styles.disabledAction,
                                        ]}
                                        disabled={index === 0}
                                        onPress={() => movePhoto(index, -1)}
                                    >
                                        <Text style={styles.photoActionText}>←</Text>
                                    </Pressable>

                                    <Pressable
                                        style={[
                                            styles.photoAction,
                                            index === draft.photos.length - 1 &&
                                            styles.disabledAction,
                                        ]}
                                        disabled={index === draft.photos.length - 1}
                                        onPress={() => movePhoto(index, 1)}
                                    >
                                        <Text style={styles.photoActionText}>→</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))}

                        {draft.photos.length < 4 && (
                            <Pressable
                                style={styles.addPhoto}
                                onPress={addPhoto}
                            >
                                <Text style={styles.addPhotoIcon}>+</Text>
                                <Text style={styles.addPhotoText}>Ajouter</Text>
                            </Pressable>
                        )}
                    </View>

                    <Text style={styles.helper}>
                        {draft.photos.length}/4 photos
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informations</Text>

                    <Field
                        label="Prénom"
                        value={draft.firstName}
                        onChangeText={(value) => updateField('firstName', value)}
                    />

                    <Field
                        label="Date de naissance"
                        value={draft.birthDate}
                        placeholder="AAAA-MM-JJ"
                        onChangeText={(value) => updateField('birthDate', value)}
                    />

                    <Field
                        label="Ville"
                        value={draft.city}
                        onChangeText={(value) => updateField('city', value)}
                    />

                    <Field
                        label="Profession"
                        value={draft.occupation}
                        onChangeText={(value) => updateField('occupation', value)}
                    />

                    <Field
                        label="À propos de moi"
                        value={draft.bio}
                        multiline
                        onChangeText={(value) => updateField('bio', value)}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mes centres d'intérêt</Text>
                    <Text style={styles.helper}>
                        Sépare tes centres d'intérêt par des virgules.
                    </Text>

                    <Field
                        label="Centres d'intérêt"
                        value={interestsText}
                        multiline
                        onChangeText={setInterestsText}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ma petite phrase</Text>

                    <Field
                        label="Question"
                        value={draft.prompt.question}
                        onChangeText={(value) => updatePrompt('question', value)}
                    />

                    <Field
                        label="Réponse"
                        value={draft.prompt.answer}
                        multiline
                        onChangeText={(value) => updatePrompt('answer', value)}
                    />
                </View>

                <View style={styles.buttons}>
                    <AppButton
                        label="Enregistrer"
                        onPress={saveProfile}
                    />

                    <AppButton
                        label="Annuler"
                        variant="outline"
                        onPress={() => router.back()}
                    />
                </View>
            </ScrollView>
        </AppScreen>
    );
}

interface FieldProps {
    label: string;
    value: string;
    placeholder?: string;
    multiline?: boolean;
    onChangeText: (value: string) => void;
}

function Field({
                   label,
                   value,
                   placeholder,
                   multiline = false,
                   onChangeText,
               }: FieldProps) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                value={value}
                placeholder={placeholder}
                placeholderTextColor={Colors.light.textSecondary}
                onChangeText={onChangeText}
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : 'center'}
                style={[
                    styles.input,
                    multiline && styles.multilineInput,
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: Spacing.five,
        gap: Spacing.four,
    },
    section: {
        gap: Spacing.three,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    helper: {
        fontSize: 13,
        color: Colors.light.textSecondary,
    },
    photosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.two,
    },
    photoContainer: {
        width: '48%',
        aspectRatio: 0.8,
        borderRadius: Radius.medium,
        overflow: 'hidden',
        backgroundColor: Colors.light.backgroundSelected,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    primaryBadge: {
        position: 'absolute',
        top: Spacing.two,
        left: Spacing.two,
        backgroundColor: Colors.light.primary,
        paddingHorizontal: Spacing.two,
        paddingVertical: Spacing.one,
        borderRadius: Radius.full,
    },
    primaryBadgeText: {
        color: Colors.light.white,
        fontSize: 11,
        fontWeight: '600',
    },
    removeButton: {
        position: 'absolute',
        top: Spacing.two,
        right: Spacing.two,
        width: 28,
        height: 28,
        borderRadius: Radius.full,
        backgroundColor: Colors.light.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButtonText: {
        color: Colors.light.error,
        fontSize: 22,
        lineHeight: 25,
    },
    photoActions: {
        position: 'absolute',
        bottom: Spacing.two,
        left: Spacing.two,
        right: Spacing.two,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    photoAction: {
        width: 34,
        height: 34,
        borderRadius: Radius.full,
        backgroundColor: Colors.light.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoActionText: {
        fontSize: 20,
        color: Colors.light.text,
    },
    disabledAction: {
        opacity: 0.3,
    },
    addPhoto: {
        width: '48%',
        aspectRatio: 0.8,
        borderRadius: Radius.medium,
        borderWidth: 1.5,
        borderColor: Colors.light.border,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.one,
    },
    addPhotoIcon: {
        fontSize: 32,
        color: Colors.light.primary,
    },
    addPhotoText: {
        fontSize: 14,
        color: Colors.light.textSecondary,
    },
    field: {
        gap: Spacing.one,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.light.textSecondary,
    },
    input: {
        minHeight: 48,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Radius.medium,
        backgroundColor: Colors.light.backgroundElement,
        borderWidth: 1,
        borderColor: Colors.light.border,
        color: Colors.light.text,
        fontSize: 15,
    },
    multilineInput: {
        minHeight: 100,
        paddingTop: Spacing.three,
    },
    buttons: {
        gap: Spacing.two,
        marginTop: Spacing.two,
    },
});