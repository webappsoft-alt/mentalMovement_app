import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigations';
import 'intl-pluralrules';
import RNBootSplash from 'react-native-bootsplash';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n'; // Import your i18n configuration
import {RootSiblingParent} from 'react-native-root-siblings';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '319958759561-ks499rmr0a8103urgc8v0lgargbk1ab1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 3000);
  }, []);

  return (
    <RootSiblingParent>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </I18nextProvider>
    </RootSiblingParent>
  );
};

export default App;
