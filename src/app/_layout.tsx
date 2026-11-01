import { DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { MatchProvider } from '@/features/matching/match-context';
import { ProfileProvider } from '@/features/profile/profile-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <ThemeProvider value={DefaultTheme}>
            <MatchProvider>
                <ProfileProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="conversation/[id]" />
                        <Stack.Screen name="(auth)" />
                    </Stack>
                </ProfileProvider>
            </MatchProvider>
        </ThemeProvider>
    );
}