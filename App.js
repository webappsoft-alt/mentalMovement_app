import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigations';

import RNBootSplash from 'react-native-bootsplash';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n'; // Import your i18n configuration
import {RootSiblingParent} from 'react-native-root-siblings';
import {StripeProvider} from '@stripe/stripe-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '319958759561-ks499rmr0a8103urgc8v0lgargbk1ab1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    setTimeout(() => {
      RNBootSplash.hide();
    }, 3000);
  }, []);

  return (
    <StripeProvider
      publishableKey="pk_test_jiq9i56R2r9QvRxJuYWRgkeY00RDbpS355"
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.com.mentalmovement.appovement" // required for Apple Pay
    >
      <RootSiblingParent>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer onReady={() => RNBootSplash.hide()}>
            <RootNavigation />
          </NavigationContainer>
        </I18nextProvider>
      </RootSiblingParent>
    </StripeProvider>
  );
};

export default App;