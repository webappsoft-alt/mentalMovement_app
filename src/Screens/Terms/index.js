import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';

const Terms = () => {
  return (
    <Container customStyle={{}}>
      <View style={{paddingTop: StatusBar.currentHeight, marginVertical: 20}}>
        <AuthHeader title={'Terms & Conditions'} />
        <ScrollView>
          <Text style={[style.font14Re, {marginTop: 16}]}>
            Terms & Conditions for “Mental Movement” App
          </Text>
          <Text style={[style.font12Re]}>Effective Date: 27 Sep 2023</Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            Sharing Your Information
          </Text>
          <Text style={[style.font12Re]}>
            We may share your information in the following circumstances:
          </Text>
          <Text style={[style.font12Re]}>
            With Your Consent: We may share your information when you give us
            explicit consent to do so.
          </Text>
          <Text style={[style.font12Re]}>
            Service Providers: We may share your information with third-party
            service providers who assist us in delivering our services.
          </Text>
          <Text style={[style.font12Re]}>
            Legal Obligations: We may share your information to comply with
            legal obligations, such as responding to legal requests and
            preventing fraud.
          </Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            Data Security
          </Text>
          <Text style={[style.font12Re]}>
            We take data security seriously. We implement reasonable measures to
            protect your data from unauthorized access, disclosure, alteration,
            or destruction.
          </Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            Your Choices
          </Text>
          <Text style={[style.font12Re]}>
            You have the following rights regarding your information:
          </Text>

          <Text style={[style.font12Re]}>
            Access and Correction: You can access and update your personal
            information through your app settings.
          </Text>

          <Text style={[style.font12Re]}>
            Data Deletion: You can request the deletion of your account and
            associated data by contacting us.
          </Text>
          <Text style={[style.font12Re]}>
            Marketing Communications: You can opt out of marketing
            communications by following the instructions provided in our emails
            or by contacting us.
          </Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            Children's Privacy
          </Text>
          <Text style={[style.font12Re]}>
            “Mental Movement” is intended for users aged 13 and older. We do not
            knowingly collect or maintain information from children under 13
            years of age.
          </Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            Changes to this Privacy Policy
          </Text>
          <Text style={[style.font12Re]}>
            We may update this Privacy Policy to reflect changes in our
            practices or for other operational, legal, or regulatory reasons. We
            will notify you of any changes by posting the updated Privacy Policy
            in the app.
          </Text>
          <Text
            style={[
              style.font18Re,
              {fontFamily: fonts.bold, marginVertical: 10},
            ]}>
            Contact Us
          </Text>
          <Text style={[style.font12Re]}>
            If you have questions or concerns about this Privacy Policy or our
            data practices, please contact us at [Contact Information].
          </Text>
          <Text style={[style.font12Re, {marginBottom: 30}]}>
            By using the “Mental Movement” app, you acknowledge that you have
            read and understood this Privacy Policy and agree to its terms and
            conditions.
          </Text>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Terms;

const styles = StyleSheet.create({});
