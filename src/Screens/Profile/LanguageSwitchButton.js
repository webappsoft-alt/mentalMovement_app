import React from 'react';
import {Button} from 'react-native';
import {useTranslation} from 'react-i18next';

const LanguageToggle = () => {
  const {i18n} = useTranslation();

  const toggleLanguage = () => {
    // Check the current language and toggle to the opposite language
    if (i18n.language === 'en') {
      i18n.changeLanguage('es'); // Switch to Spanish
    } else {
      i18n.changeLanguage('en'); // Switch to English
    }
  };

  return <Button title="Toggle Language" onPress={toggleLanguage} />;
};

export default LanguageToggle;
