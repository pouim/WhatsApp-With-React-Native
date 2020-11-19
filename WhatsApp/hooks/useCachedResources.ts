// import { Ionicons } from 'react-native-vector-icons';
// import * as SplashScreen from 'react-native-splash-screen';
// import * as React from 'react';

// export default function useCachedResources() {
//   const [isLoadingComplete, setLoadingComplete] = React.useState(false);

//   // Load any resources or data that we need prior to rendering the app
//   React.useEffect(() => {
//     async function loadResourcesAndDataAsync() {
//       try {
//         SplashScreen.preventAutoHideAsync();

//         // Load fonts
//         await Font.loadAsync({
//           ...Ionicons.font,
//           'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
//         });
//       } catch (e) {
//         // We might want to provide this error information to an error reporting service
//         console.warn(e);
//       } finally {
//         setLoadingComplete(true);
//         SplashScreen.hideAsync();
//       }
//     }

//     loadResourcesAndDataAsync();
//   }, []);

//   return isLoadingComplete;
// }