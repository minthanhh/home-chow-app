import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Constants from 'expo-constants'
import { Asset } from 'expo-asset'

import { useColorScheme } from '@/shared/components/useColorScheme'
import { Animated, StyleSheet } from 'react-native'
import { View } from '@/shared/components/Themed'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    })

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <AnimatedAppLoader image={{ uri: Constants.expoConfig?.splash?.image }}>
            <RootLayoutNav />
        </AnimatedAppLoader>
    )
}

function AnimatedAppLoader({ children, image }: AnimatedSplashScreenProps) {
    const [isSplashReady, setSplashReady] = useState(false)

    useEffect(() => {
        async function prepare() {
            await Asset.fromURI(image.uri!).downloadAsync()
            setSplashReady(true)
        }

        prepare()
    }, [image])

    if (!isSplashReady) {
        return null
    }

    return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
}

interface AnimatedSplashScreenProps {
    children: React.ReactNode
    image: { uri?: string }
}

function AnimatedSplashScreen({ children, image }: AnimatedSplashScreenProps) {
    const animation = useMemo(() => new Animated.Value(1), [])
    const [isAppReady, setAppReady] = useState(false)
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false)

    useEffect(() => {
        if (isAppReady) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true))
        }
    }, [isAppReady])

    const onImageLoaded = useCallback(async () => {
        try {
            await SplashScreen.hideAsync()
            // Load stuff
            await Promise.all([])
        } catch (e) {
            // handle errors
        } finally {
            setAppReady(true)
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents='none'
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: Constants.expoConfig?.splash?.backgroundColor,
                            opacity: animation,
                        },
                    ]}>
                    <Animated.Image
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: Constants.expoConfig?.splash?.resizeMode || 'contain',
                            transform: [
                                {
                                    scale: animation,
                                },
                            ],
                        }}
                        source={image}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    )
}

function RootLayoutNav() {
    const colorScheme = useColorScheme()

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
            </Stack>
        </ThemeProvider>
    )
}
