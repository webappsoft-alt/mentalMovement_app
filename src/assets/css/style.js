import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

export default StyleSheet.create({
  justify: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  justifyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  justifySpaBtwRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  justifySpaBtw: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  justifySpaEvenRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  justifySpaEven: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  font6Re: {
    fontSize: 6,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font8Re: {
    fontSize: 8,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font10Re: {
    fontSize: 10,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font12Re: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font14Re: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font16Re: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font18Re: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font20Re: {
    fontSize: 20,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font22Re: {
    fontSize: 22,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font24Re: {
    fontSize: 24,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font26Re: {
    fontSize: 26,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font28Re: {
    fontSize: 28,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font30Re: {
    fontSize: 30,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font32Re: {
    fontSize: 32,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font34Re: {
    fontSize: 34,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font36Re: {
    fontSize: 36,
    fontFamily: fonts.regular,
    color: colors.white,
  },

  title: {
    fontSize: 34,
    color: colors.white,
    fontFamily: fonts.regular,
    textAlign: 'center',
    //fontWeight:'200'
  },
  subTitle: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.regular,

    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 13,
    marginBottom: 10,
  },
  font14: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  font12: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  box: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 10,
  },
  lableStyle: {
    color: colors.white,
    fontFamily: fonts.regular,
    margin: 10,
    fontSize: 16,
    marginTop: -10,
  },
  heading: {
    color: colors.white,
    fontFamily: fonts.regular,
    textAlign: 'center',
    fontSize: 22,
    marginTop: 30,

    marginBottom: 25,
  },
});
