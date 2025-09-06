import { useTranslation } from 'react-i18next';

/**
 * 自定义 hook，提供类型安全的翻译函数
 */
export const useI18n = (namespace?: string) => {
  const { t, i18n } = useTranslation(namespace);

  return {
    t,
    i18n,
    changeLanguage: i18n.changeLanguage,
    language: i18n.language,
    languages: i18n.languages,
  };
};

/**
 * 统一导出useTranslation
 */
export const useT = () => {
  const { t } = useTranslation();
  return t;
};
