import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

interface AppCardProps {
    children: ReactNode;
    style?: ViewStyle;
    padding?: number;
}

export default function AppCard({
                                    children,
                                    style,
                                    padding = Spacing.three,
                                }: AppCardProps) {
    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: Colors.light.backgroundElement,
                    borderColor: Colors.light.border,
                    padding,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: Radius.large,
        borderWidth: 1,
    },
});