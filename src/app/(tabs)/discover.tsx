import { useRef, useState, useEffect } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    StyleSheet,
    View,
} from 'react-native';

import AppScreen from '@/components/ui/app-screen';
import AppText from '@/components/ui/app-text';
import DiscoveryActions from '@/features/discovery/components/discovery-actions';
import ProfileCard from '@/features/discovery/components/profile-card';
import { mockProfiles } from '@/features/discovery/data/mock-profiles';
import { Colors, Spacing } from '@/constants/theme';
import {useMatch} from "@/features/matching/match-context";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function DiscoverScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const position = useRef(new Animated.ValueXY()).current;

    const currentProfile = mockProfiles[currentIndex];

    const currentProfileRef = useRef(currentProfile);

    const { activeMatch } = useMatch();

    useEffect(() => {
        currentProfileRef.current = currentProfile;
    }, [currentProfile]);

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
        }).start();
    };

    const swipe = (direction: 'left' | 'right') => {
        const profile = currentProfileRef.current;
        if (!profile) return;

        const destination = direction === 'right'
            ? SCREEN_WIDTH * 1.5
            : -SCREEN_WIDTH * 1.5;

        Animated.timing(position, {
            toValue: { x: destination, y: 0 },
            duration: 220,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (!finished) return;

            console.log(
                direction === 'right' ? 'Liked:' : 'Passed:',
                profile.id
            );

            setCurrentIndex((index) => index + 1);
            position.setValue({ x: 0, y: 0 });
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, gesture) =>
                Math.abs(gesture.dx) > 8 &&
                Math.abs(gesture.dx) > Math.abs(gesture.dy),

            onPanResponderMove: (_, gesture) => {
                position.setValue({
                    x: gesture.dx,
                    y: gesture.dy * 0.15,
                });
            },

            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    swipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    swipe('left');
                } else {
                    resetPosition();
                }
            },

            onPanResponderTerminate: resetPosition,
        })
    ).current;

    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
        outputRange: ['-12deg', '0deg', '12deg'],
        extrapolate: 'clamp',
    });

    const animatedStyle = {
        transform: [
            ...position.getTranslateTransform(),
            { rotate },
        ],
    };

    return (
        <AppScreen
            title="duet."
            subtitle="Et si une belle rencontre commençait ici ?"
        >
            {activeMatch ? (
                <View style={styles.emptyState}>
                    <AppText variant="subtitle">
                        Et si tu prenais le temps ?
                    </AppText>

                    <AppText color={Colors.light.textSecondary}>
                        Tu as une belle rencontre à découvrir. Pour le moment,
                        les autres profils attendront.
                    </AppText>
                </View>
            ) : currentProfile ? (
                <View style={styles.content}>
                    <Animated.View
                        {...panResponder.panHandlers}
                        style={[styles.card, animatedStyle]}
                    >
                        <ProfileCard profile={currentProfile} />
                    </Animated.View>

                    <DiscoveryActions
                        onPass={() => swipe('left')}
                        onLike={() => swipe('right')}
                    />

                    <AppText variant="caption" color={Colors.light.textSecondary}>
                        Prenez le temps de découvrir chaque personne.
                    </AppText>
                </View>
            ) : (
                <View style={styles.emptyState}>
                    <AppText variant="subtitle">
                        Tu es à jour !
                    </AppText>

                    <AppText color={Colors.light.textSecondary}>
                        De nouveaux profils arriveront bientôt.
                    </AppText>
                </View>
            )}
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        gap: Spacing.three,
        paddingBottom: Spacing.two,
    },
    card: {
        flex: 1,
        minHeight: 300,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.three,
    },
});