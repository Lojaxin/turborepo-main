import I18NextHttpBackend from 'i18next-http-backend/cjs';

export const locales = [
  { key: 'zh-CN', name: '简体中文', locale: 'sc', mts_cdn: 'zh_cns' },
  { key: 'zh-TW', name: '繁體中文', locale: 'tc', mts_cdn: 'zh_cnt' },
  { key: 'en-US', name: 'English', locale: 'en', mts_cdn: 'en_us' },
  { key: 'ko-KR', name: '한국어', locale: 'ko', mts_cdn: 'ko_kr' },
  { key: 'ja-JP', name: '日本語', locale: 'ja', mts_cdn: 'ja_jp' },
  { key: 'vi-VN', name: 'Tiếng việt', locale: 'vi', mts_cdn: 'vi_vn' }, // 越南语
  { key: 'th-TH', name: 'ภาษาไทย', locale: 'th', mts_cdn: 'th_th' }, // 泰语
  { key: 'in-ID', name: 'Indonesia', locale: 'in', mts_cdn: 'in_id' }, // 印度尼西亚语（缺少）
  { key: 'ar-AE', name: 'عربي', locale: 'ar', mts_cdn: 'ar_ae' }, // 阿拉伯语(阿联酋)（缺少）
  { key: 'es-ES', name: 'español', locale: 'es', mts_cdn: 'es_es' }, // 西班牙语
  { key: 'pt-PT', name: 'Português', locale: 'pt', mts_cdn: 'pt_pt' }, // 葡萄牙语
  { key: 'ug-CN', name: 'ئۇيغۇر', locale: 'ug', mts_cdn: 'ug_cn' }, // 维吾尔语
  { key: 'hi-IN', name: 'हिन्दी', locale: 'hi', mts_cdn: 'hi_in' }, // 印地语（缺少)
];

const mtsLocales: Record<string, string> = {};
const i18nLocales: string[] = [];

locales.forEach((item) => {
  i18nLocales.push(item.locale);
  mtsLocales[item.locale] = item.mts_cdn;
});

export { mtsLocales, i18nLocales };

export interface I18nConfigOptions {
  defaultLocale: string;
  locales: string[];
  mtsHost: string;
  mtsPath: string;
  mtsNs: string;
  reloadInterval?: number;
  debug?: boolean;
}

export const createI18nConfig = (config: I18nConfigOptions) => {
  const {
    defaultLocale = 'en',
    locales = i18nLocales,
    mtsHost,
    mtsPath,
    mtsNs,
    reloadInterval = 1000 * 60 * 30,
    debug = false,
  } = config;

  return {
    debug,
    i18n: {
      defaultLocale,
      locales,
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    ns: [mtsNs],
    defaultNS: mtsNs,
    backend: {
      loadPath: function (lngs: string[]) {
        const lng = lngs[0];
        if (!lng || !mtsLocales[lng]) {
          throw new Error(`Unsupported language: ${lng}`);
        }
        return `${mtsHost}/${mtsPath}/${mtsNs}/${mtsLocales[lng]}.json`;
      },
      requestOptions: {
        cache: 'no-cache',
        credentials: 'same-origin',
        mode: 'cors',
      },
      reloadInterval,
    },
    serializeConfig: false,
    use: [I18NextHttpBackend],
    interpolation: {
      prefix: '{',
      suffix: '}',
    },
  };
};
