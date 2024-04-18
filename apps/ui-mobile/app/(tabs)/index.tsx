import { Button, Platform, StyleSheet } from 'react-native'

import EditScreenInfo from '@/shared/components/EditScreenInfo'
import { Text, View } from '@/shared/components/Themed'
import { StatusBar } from 'expo-status-bar'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useEffect } from 'react'

WebBrowser.maybeCompleteAuthSession()

export default function TabOneScreen() {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId: '325523474062-uj0cp4j7imefajgjtrjpjp71vpuprsmd.apps.googleusercontent.com',
        webClientId: '325523474062-qbr946eu7a4mmoq0dmo4h80uf4bf01db.apps.googleusercontent.com',
        iosClientId: '325523474062-eomtt8hl2dg96sqbjr713gq116trnu92.apps.googleusercontent.com',
    })

    useEffect(() => {
        ;(async () => {
            if (response?.type === 'success') {
                try {
                    console.log(response)
                    // const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                    //     headers: { Authorization: `Bearer ${response.authentication?.accessToken}` },
                    // })

                    // const user = await res.json()

                    // console.log(user)
                } catch (err) {}
            }
        })()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
            <EditScreenInfo path='app/(tabs)/index.tsx' />

            <View className='flex-1 items-center justify-center bg-white text-red-500'>
                <Text>Open up App.js to start working on your app!</Text>
                <StatusBar style='auto' />
            </View>

            <Button title='Sign in with Google' onPress={() => promptAsync()} />

            {Platform.OS === 'ios' && (
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={styles.button}
                    onPress={async () => {
                        try {
                            const credential = await AppleAuthentication.signInAsync({
                                requestedScopes: [
                                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                ],
                            })
                            console.log(credential)

                            // signed in
                        } catch (e: any) {
                            if (e.code === 'ERR_REQUEST_CANCELED') {
                                // handle that the user canceled the sign-in flow
                            } else {
                                // handle other errors
                            }
                        }
                    }}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        height: 44,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
