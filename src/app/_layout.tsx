import { DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="conversation/[id]" />
                <Stack.Screen name="(auth)" />
            </Stack>
        </ThemeProvider>
    );
}