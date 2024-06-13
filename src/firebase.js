import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
    apiKey: 'AIzaSyD6K_945qqKtjNlziJiPVqYYlOjI2WdmUQ',
    authDomain: 'shopmart-7bb63.firebaseapp.com',
    projectId: 'shopmart-7bb63',
    storageBucket: 'shopmart-7bb63.appspot.com',
    messagingSenderId: '676933188534',
    appId: '1:676933188534:web:35f921e4d3fb295146df17',
    measurementId: 'G-YKR8MT0R1Z',
}
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey:
            'BIEpliQ-rvsUWTMgPp_g4rGN5EqD-l0MpT4uHa2ByuWYO_v9xr1ZE_HhothZtdoNyU8GZ8TCDl_nOKHyX9typEw',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {
            console.error(err)
            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )
