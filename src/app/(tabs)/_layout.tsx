import { NativeTabs } from 'expo-router/native-tabs';

import { Colors } from '@/constants/theme';

export default function TabsLayout() {
    const colors = Colors.light;

    return (
        <NativeTabs
            backgroundColor={colors.backgroundElement}
            indicatorColor={colors.backgroundSelected}
            labelStyle={{
                selected: { color: colors.text },
                default: { color: colors.textSecondary },
            }}
        >
            <NativeTabs.Trigger name="discover">
                <NativeTabs.Trigger.Label>Découvrir</NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="inbox">
                <NativeTabs.Trigger.Label>Messages</NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="events">
                <NativeTabs.Trigger.Label>Événements</NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="profile">
                <NativeTabs.Trigger.Label>Profil</NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}