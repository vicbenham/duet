import { DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { MatchProvider } from '@/features/matching/match-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <ThemeProvider value={DefaultTheme}>
            <MatchProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="conversation/[id]" />
                    <Stack.Screen name="(auth)" />
                </Stack>
            </MatchProvider>
        </ThemeProvider>
    );
}