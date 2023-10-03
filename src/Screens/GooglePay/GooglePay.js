import React, { useEffect } from 'react';
import { View, Alert, Platform } from 'react-native';
import {
  PlatformPayButton,
  usePlatformPay,
  PlatformPay,
} from '@stripe/stripe-react-native';
import ApiRequest from '../../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { requestPurchase, purchaseErrorListener, purchaseUpdatedListener, finishTransaction } from 'react-native-iap';
import { ToastMessage } from '../../utils/Toast';

const API_URL = 'YOUR_API_URL'; // Replace with your server's API URL

function GooglePay({ data = {}, setIsLoading = () => "", selected = '' }) {

  const { isPlatformPaySupported, confirmPlatformPayPayment } = usePlatformPay();
  const navigation = useNavigation()

  React.useEffect(() => {
    (async function () {
      if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
        Alert.alert('Google Pay is not supported.');
        return;
      }
    })();
  }, []);
  const googlePay = {
    googlePay: {
      testEnv: false,
      merchantName: 'Mental Movement',
      merchantCountryCode: 'US',
      currencyCode: 'USD',
      amount: selected == '1' ? 6.99 : 69.99,
      billingAddressConfig: {
        format: PlatformPay.BillingAddressFormat.Full,
        isPhoneNumberRequired: true,
        isRequired: true,
      },
    },
  }

  const ApplePay = {
    applePay: {
      cartItems: [
        {
          label: selected == '1' ? 'Monthly Package' : 'Yearly Package',
          amount: selected == '1' ? '6.99' : '69.99',
          paymentType: PlatformPay.PaymentType.Immediate,
        },
        {
          label: 'Total',
          amount: selected == '1' ? '6.99' : '69.99',
          paymentType: PlatformPay.PaymentType.Immediate,
        },
      ],
      merchantCountryCode: 'US',
      currencyCode: 'USD',
      requiredShippingAddressFields: [
        PlatformPay.ContactField.PostalAddress,
      ],
      requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
    },
  }


  const pay = async () => {
    if (!selected) return;
    if (Platform.OS == 'ios') {
      try {
        setIsLoading(true)
        const res = await requestPurchase({ sku: selected })
        console.log(res)
      } catch (error) {
      }
      return;
    }
    setIsLoading(true)
    try {
      const ApiData = {
        type: 'payment_intent',
        amount: selected == '1' ? '6.99' : '69.99'
      }
      const res = await ApiRequest(ApiData)
      const clientSecret = res.data.intent
      console.log("clientSecret==>>", clientSecret)

      const { error, paymentIntent } = await confirmPlatformPayPayment(
        clientSecret,
        Platform.OS == 'android' ? googlePay : ApplePay
      );

      console.log("paymentIntent", await paymentIntent)


      if (error) {
        Alert.alert(error.code, error.message);
        // Update UI to prompt user to retry payment (and possibly another payment method)
        return;
      }
      let resp = false
      let id = ''
      if (data.id) {
        resp = true
      } else {
        const registerd = await ApiRequest(data);
        resp = registerd?.data?.result;
        console.log('respppppppp', registerd.data.name)
        if (registerd?.data?.user_id)
          await AsyncStorage.setItem('user_id', String(registerd?.data?.user_id));
        if (registerd?.data?.name)
          await AsyncStorage.setItem('name', registerd?.data.name);
        id = String(registerd?.data?.user_id)
      }


      if (resp) {
        const paymentData = {
          type: 'add_data',
          table_name: 'payment_subscriptions',
          user_id: data.id ? data.id : id,
          status: error ? 'failure' : 'success',
          payment_response: error ? JSON.stringify(error) : JSON.stringify(paymentIntent),
          plan_type: selected == '1' ? 'monthly' : "yearly"
        }



        const response = await ApiRequest(paymentData)
        console.log("paymentData", response.data)
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
        console.log(response.data)
        Alert.alert('Success', 'The payment was confirmed successfully.');
      }


    } catch (error) {
      console.log("Errrr==>>", error)

    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const purchaseErrorSubscription = purchaseErrorListener((error) => {
      setIsLoading(false)
      ToastMessage(JSON.stringify(error.message))
      navigation.goBack()
    });

    const purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (!receipt) return;

      // TODO: the android receipt validation should be in backend, ref: https://github.com/dooboolab/react-native-iap/blob/0a255579a75e64a938ecf06d6e1be3bcdbb3fdee/docs/docs/usage_instructions/receipt_validation.md
      // if (Platform.OS === 'ios') {
      //   const receiptStatus = await this.validateReceipt(receipt);

      //   if (receiptStatus !== 0) {
      //     return errorCallback(new Error('Purchase Failure'));
      //   }
      // }
      await finishTransaction(purchase, true);

      let resp = false
      let id = ''
      if (data.id) {
        id = String(data.id)
        resp = true
      } else {
        const registerd = await ApiRequest(data);
        resp = registerd?.data?.result;
        console.log('respppppppp', registerd.data.name)
        if (registerd?.data?.user_id)
          await AsyncStorage.setItem('user_id', String(registerd?.data?.user_id));
        if (registerd?.data?.name)
          await AsyncStorage.setItem('name', registerd?.data.name);
        id = String(registerd?.data?.user_id)
      }
      if (resp) {
        const paymentData = {
          type: 'add_data',
          table_name: 'payment_subscriptions',
          user_id: id,
          status: 'success',
          payment_response: JSON.stringify(purchase),
          plan_type: selected == 'com.mentalmovement.001c' ? 'monthly' : "yearly"
        }

        const response = await ApiRequest(paymentData)
        console.log("paymentData", response.data)
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
        console.log(response.data)
        Alert.alert('Success', 'The payment was confirmed successfully.');
      }
      setIsLoading(false)
    });


    return () => {
      purchaseErrorSubscription && purchaseErrorSubscription.remove();
      purchaseUpdateSubscription && purchaseUpdateSubscription.remove();
    };
  }, []);

  return (
    <View>
      <PlatformPayButton
        type={PlatformPay.ButtonType.Pay}
        onPress={pay}
        style={{
          width: '100%',
          height: 50,
        }}
      />
    </View>
  );
}

export default GooglePay;
