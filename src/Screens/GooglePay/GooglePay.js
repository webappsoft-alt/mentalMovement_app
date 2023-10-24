import React, { useEffect } from 'react';
import { View, Alert, Platform, Image, TouchableOpacity, Text } from 'react-native';
import ApiRequest from '../../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ToastMessage } from '../../utils/Toast';
import { colors, fonts } from '../../constants';
import { requestPurchase, purchaseErrorListener, purchaseUpdatedListener, finishTransaction } from "react-native-iap";
import style from '../../assets/css/style';

function GooglePay({ setIsLoading = () => "", sku = '' }) {

  const navigation = useNavigation()

  const pay = async () => {
    console.log("rrrrr==>>", sku)
    if (!sku) return ToastMessage('Please choose a subscription plan before checkout.');
    setIsLoading(true)
    const params = Platform.select({
      ios: {
        sku: sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false
      },
      android: {
        skus: [sku]
      }
    })
    requestPurchase(params).catch((error) => {
      console.log(error)
      setIsLoading(false)
    })
  };

  useEffect(() => {
    const purchaseErrorSubscription = purchaseErrorListener(async (error) => {
      setIsLoading(false)
      ToastMessage(JSON.stringify(error.message))
      navigation.goBack()
    });

    const purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        await finishTransaction({ purchase, isConsumable: true });
        const user_id = await AsyncStorage.getItem('user_id');
        const paymentData = {
          type: 'add_data',
          table_name: 'payment_subscriptions',
          user_id: user_id,
          status: 'success',
          payment_response: JSON.stringify(purchase),
          plan_type: sku == 'com.mentalmovement.001c' ? 'monthly' : "yearly"
        }

        const response = await ApiRequest(paymentData)
        Alert.alert('Success', 'The payment was confirmed successfully.');
        setIsLoading(false)
        navigation.reset({
          index: 0,
          routes: [{
            name: 'MainStack',
            state: {
              routes: [
                {
                  name: "AppStack",
                }
              ]
            }
          }]
        })
      } else {
        await finishTransaction({ purchase, isConsumable: true });
        setIsLoading(false)
        ToastMessage('Payment does not completed successfully. Try again later.')
        navigation.goBack()
      }
    });


    return () => {
      purchaseErrorSubscription && purchaseErrorSubscription.remove();
      purchaseUpdateSubscription && purchaseUpdateSubscription.remove();
    };
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          backgroundColor: colors.white,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Platform.OS == 'android' ? 0 : 15
        }}
        onPress={pay}>
        <Text style={[style.font18Re, { color: colors.black, fontFamily: fonts.semiBold }]}>
          Subscribe Now
        </Text>
        {/* <Image source={require('../../assets/search.png')} style={{ width: 18, height: 18, marginHorizontal: 2, marginLeft: 5 }} />
            <Text style={[style.font18Re, { color: colors.black, fontFamily: fonts.semiBold }]}>
              Pay
            </Text> */}
      </TouchableOpacity>
    </View>
  );
}

export default GooglePay;
