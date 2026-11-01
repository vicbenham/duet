import { ActivityIndicator, Pressable, StyleSheet, ViewStyle } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';
import AppText from './app-text';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface AppButtonProps {
    label: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
}

export default function AppButton({
                                      label,
                                      onPress,
                                      variant = 'primary',
                                      disabled = false,
                                      loading = false,
                                      style,
                                  }: AppButtonProps) {
    const colors = Colors.light;

    const isDisabled = disabled || loading;

    const backgroundColor = {
        primary: colors.primary,
        secondary: colors.secondary,
        outline: 'transparent',
    }[variant];

    const textColor = colors.text;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
            disabled={isDisabled}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor,
                    borderColor: variant === 'outline' ? colors.border : backgroundColor,
                    opacity: isDisabled ? 0.5 : pressed ? 0.75 : 1,
                },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <AppText variant="label" color={textColor}>
                    {label}
                </AppText>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 52,
        paddingHorizontal: Spacing.four,
        borderRadius: Radius.full,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});