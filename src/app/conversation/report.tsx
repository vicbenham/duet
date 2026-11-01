
import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { Colors, Radius, Spacing } from '@/constants/theme';
import {useMatch} from "@/features/matching/match-context";

const reportReasons = [
    'Comportement déplacé ou harcèlement',
    'Faux profil ou usurpation d’identité',
    'Propos haineux ou discriminatoires',
    'Spam ou tentative d’arnaque',
    'Autre',
];

export default function ReportScreen() {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [details, setDetails] = useState('');

    const { profileName, conversationId } = useLocalSearchParams<{
        profileName: string;
        conversationId: string;
    }>();

    const {
        reportedConversationIds,
        markConversationReported,
    } = useMatch();

    const alreadyReported = reportedConversationIds.includes(conversationId);

    const submitReport = () => {
        if (!selectedReason || alreadyReported) return;

        markConversationReported(conversationId);

        Alert.alert(
            'Signalement envoyé',
            'Merci de nous avoir alertés. Notre équipe pourra examiner ce signalement.',
            [
                {
                    text: 'Terminer',
                    onPress: () => router.back(),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>‹</Text>
                </Pressable>

                <Text style={styles.headerTitle}>Signaler un profil</Text>

                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>
                    Que s'est-il passé ?
                </Text>

                <Text style={styles.description}>
                    {profileName
                        ? `Tu souhaites signaler le profil de ${profileName}.`
                        : 'Explique-nous pourquoi tu souhaites signaler ce profil.'}
                    {' '}Chaque signalement est examiné avec attention.
                </Text>

                <Text style={styles.sectionTitle}>
                    Choisis un motif
                </Text>

                <View style={styles.reasons}>
                    {reportReasons.map((reason) => {
                        const isSelected = selectedReason === reason;

                        return (
                            <Pressable
                                key={reason}
                                style={[
                                    styles.reason,
                                    isSelected && styles.reasonSelected,
                                ]}
                                onPress={() => setSelectedReason(reason)}
                            >
                                <Text
                                    style={[
                                        styles.reasonText,
                                        isSelected && styles.reasonTextSelected,
                                    ]}
                                >
                                    {reason}
                                </Text>

                                <View style={[
                                    styles.radio,
                                    isSelected && styles.radioSelected,
                                ]}>
                                    {isSelected && (
                                        <View style={styles.radioInner} />
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                <Text style={styles.sectionTitle}>
                    Quelques précisions
                    <Text style={styles.optional}> (facultatif)</Text>
                </Text>

                <TextInput
                    style={styles.detailsInput}
                    value={details}
                    onChangeText={setDetails}
                    placeholder="Tu peux nous donner davantage de contexte..."
                    placeholderTextColor={Colors.light.textSecondary}
                    multiline
                    textAlignVertical="top"
                    maxLength={1000}
                />

                <Text style={styles.characterCount}>
                    {details.length}/1000
                </Text>

                {alreadyReported && (
                    <View style={styles.alreadyReported}>
                        <Text style={styles.alreadyReportedText}>
                            Tu as déjà signalé cette conversation. Notre équipe pourra examiner ton signalement.
                        </Text>
                    </View>
                )}

                <Pressable
                    style={[
                        styles.submitButton,
                        !selectedReason && styles.submitButtonDisabled,
                    ]}
                    onPress={submitReport}
                    disabled={!selectedReason}
                >
                    <Text style={styles.submitButtonText}>
                        Envoyer le signalement
                    </Text>
                </Pressable>

                <Text style={styles.disclaimer}>
                    Le signalement est confidentiel. Il ne met pas
                    automatiquement fin à ta rencontre.
                </Text>
            </ScrollView>
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
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Colors.light.backgroundElement,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    backButtonText: {
        fontSize: 36,
        lineHeight: 40,
        color: Colors.light.text,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.light.text,
    },
    headerSpacer: {
        width: 40,
    },
    content: {
        padding: Spacing.four,
        paddingBottom: Spacing.six,
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: Spacing.two,
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
        color: Colors.light.textSecondary,
        marginBottom: Spacing.five,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: Spacing.two,
    },
    optional: {
        fontSize: 13,
        fontWeight: '400',
        color: Colors.light.textSecondary,
    },
    reasons: {
        gap: Spacing.two,
        marginBottom: Spacing.four,
    },
    reason: {
        minHeight: 58,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Radius.medium,
        borderWidth: 1,
        borderColor: Colors.light.border,
        backgroundColor: Colors.light.backgroundElement,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: Spacing.two,
    },
    reasonSelected: {
        borderColor: Colors.light.primary,
        backgroundColor: Colors.light.backgroundSelected,
    },
    reasonText: {
        flex: 1,
        fontSize: 14,
        color: Colors.light.text,
    },
    reasonTextSelected: {
        fontWeight: '600',
    },
    radio: {
        width: 21,
        height: 21,
        borderRadius: Radius.full,
        borderWidth: 1.5,
        borderColor: Colors.light.textSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: Colors.light.primary,
    },
    radioInner: {
        width: 11,
        height: 11,
        borderRadius: Radius.full,
        backgroundColor: Colors.light.primary,
    },
    detailsInput: {
        minHeight: 120,
        padding: Spacing.three,
        borderRadius: Radius.medium,
        borderWidth: 1,
        borderColor: Colors.light.border,
        backgroundColor: Colors.light.backgroundElement,
        color: Colors.light.text,
        fontSize: 14,
        lineHeight: 20,
    },
    characterCount: {
        fontSize: 11,
        color: Colors.light.textSecondary,
        textAlign: 'right',
        marginTop: Spacing.one,
        marginBottom: Spacing.four,
    },
    submitButton: {
        minHeight: 52,
        borderRadius: Radius.full,
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.three,
    },
    submitButtonDisabled: {
        opacity: 0.45,
    },
    submitButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.light.white,
    },
    disclaimer: {
        fontSize: 12,
        lineHeight: 18,
        color: Colors.light.textSecondary,
        textAlign: 'center',
        marginTop: Spacing.three,
    },
    alreadyReported: {
        padding: Spacing.three,
        borderRadius: Radius.medium,
        backgroundColor: Colors.light.backgroundSelected,
        marginBottom: Spacing.three,
    },
    alreadyReportedText: {
        color: Colors.light.text,
        fontSize: 14,
        lineHeight: 20,
    },
});
