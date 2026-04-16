import React, { useState, useCallback, useMemo } from 'react';
import { I18nManager, Platform } from 'react-native';
import createContextHook from '@nkzw/create-context-hook';
import { translations, Language, Translations } from '@/constants/translations';

export const [LanguageProvider, useLanguage] = createContextHook(() => {
  const [language, setLanguageState] = useState<Language>('en');

  const isRTL = language === 'ar';

  const t: Translations = useMemo(() => translations[language], [language]);

  const setLanguage = useCallback((lang: Language) => {
    console.log('[Aythia] Language changed to:', lang);
    setLanguageState(lang);
    if (Platform.OS !== 'web') {
      I18nManager.forceRTL(lang === 'ar');
    }
  }, []);

  const textAlign = useMemo(() => (isRTL ? 'right' as const : 'left' as const), [isRTL]);
  const flexDirection = useMemo(() => (isRTL ? 'row-reverse' as const : 'row' as const), [isRTL]);
  const alignSelf = useMemo(() => (isRTL ? 'flex-end' as const : 'flex-start' as const), [isRTL]);
  const writingDirection = useMemo(() => (isRTL ? 'rtl' as const : 'ltr' as const), [isRTL]);

  return {
    language,
    setLanguage,
    t,
    isRTL,
    textAlign,
    flexDirection,
    alignSelf,
    writingDirection,
  };
});
