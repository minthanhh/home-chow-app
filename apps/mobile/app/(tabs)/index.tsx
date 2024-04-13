import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/shared/components/EditScreenInfo'
import { Text, View } from '@/shared/components/Themed'
import { StatusBar } from 'expo-status-bar'

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
            <EditScreenInfo path='app/(tabs)/index.tsx' />

            <View className='flex-1 items-center justify-center bg-white text-red-500'>
                <Text>Open up App.js to start working on your app!</Text>
                <StatusBar style='auto' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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