import { ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { Colors, Typography } from '@/constants/theme';

type TextVariant =
    | 'heading'
    | 'subtitle'
    | 'body'
    | 'bodySmall'
    | 'label'
    | 'caption';

interface AppTextProps extends TextProps {
    variant?: TextVariant;
    color?: string;
    children: ReactNode;
}

export default function AppText({
                                    variant = 'body',
                                    color,
                                    style,
                                    children,
                                    ...props
                                }: AppTextProps) {
    const colors = Colors.light;

    return (
        <Text
            {...props}
            style={[
                styles.base,
                Typography[variant],
                { color: color ?? colors.text },
                style,
            ]}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    base: {
        includeFontPadding: false,
    },
});