import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';

const Privacy = () => {
  return (
    <Container customStyle={{}}>
      <View style={{paddingTop: StatusBar.currentHeight, marginVertical: 20}}>
        <AuthHeader title={'Privacy Policy'} />
        <ScrollView>
          <Text style={[style.font14Re, {marginTop: 16}]}>
            Privacy Policy for “Mental Movement” App
          </Text>
          <Text style={[style.font12Re]}>Effective Date: 27 Sep 2023</Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            Introduction
          </Text>
          <Text style={[style.font12Re]}>
            Welcome to “Mental Movement,” the mindset app designed especially
            for athletes. At “Mental Movement,” we are committed to protecting
            your privacy and ensuring the security of your personal information.
            This Privacy Policy outlines how we collect, use, disclose, and
            protect your data when you use our app.
          </Text>
          <Text style={[style.font12Re]}>
            By using the “Mental Movement” app, you consent to the practices
            described in this Privacy Policy. Please take the time to read and
            understand this policy. If you do not agree with our practices,
            please do not use the app.
          </Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            Information We Collect
          </Text>
          <Text style={[style.font12Re]}>
            Personal Information: We may collect personal information, including
            your name, email address, and demographic information, when you
            create an account or contact us for support.
          </Text>
          <Text style={[style.font12Re]}>
            Usage Data: We collect data about your interactions with the app,
            such as the features you use, the content you view, and your device
            information (e.g., device type, operating system, and IP address).
          </Text>
          <Text style={[style.font12Re]}>
            User-Generated Content: Any content you voluntarily submit to the
            app, such as comments, posts, or journal entries, may be collected
            and stored.
          </Text>
          <Text style={[style.font12Re]}>
            Payment Information: If you make in-app purchases, we may collect
            payment information, including credit card details, to facilitate
            the transaction.
          </Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            How We Use Your Information
          </Text>
          <Text style={[style.font12Re]}>
            We use your information for the following purposes:
          </Text>
          <Text style={[style.font12Re]}>
            Personalization: To provide you with a personalized experience,
            including content recommendations and goal tracking.
          </Text>

          <Text style={[style.font12Re]}>
            Communication: To send you updates, notifications, and support
            messages regarding the app.
          </Text>

          <Text style={[style.font12Re]}>
            Customer Support: To respond to your inquiries and provide
            assistance.
          </Text>
          <Text style={[style.font12Re, {marginBottom: 30}]}>
            Marketing: With your consent, we may send you promotional materials
            and newsletters. You can opt out at any time.
          </Text>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Privacy;

const styles = StyleSheet.create({});
