import { I18nInitOptions } from "@repo/i18n/init";

// 环境变量配置
const MTS_HOST = process.env.MTS_HOST || "http://localhost:3001";
const MTS_PATH =
  process.env.MTS_PATH || "static/storage/multilingual-translation-system";
const MTS_NS = process.env.MTS_NS || "DooPrimeH5"; // main 应用使用不同的命名空间

export const i18nConfig: I18nInitOptions = {
  defaultLocale: "en",
  locales: [
    "en",
    "sc",
    "tc",
    "ko",
    "ja",
    "vi",
    "th",
    "in",
    "ar",
    "es",
    "pt",
    "ug",
    "hi",
  ],
  mtsHost: MTS_HOST,
  mtsPath: MTS_PATH,
  mtsNs: MTS_NS,
  reloadInterval: 1000 * 60 * 30, // 30分钟
  debug: process.env.NODE_ENV === "development",
};

export default i18nConfig;
