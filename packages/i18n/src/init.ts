import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend/cjs";
import { requestManager } from "./request-manager";
import { mtsLocales } from "./config";

export interface I18nInitOptions {
  defaultLocale: string;
  locales: string[];
  mtsHost: string;
  mtsPath: string;
  mtsNs: string;
  reloadInterval?: number;
  debug?: boolean;
}

export interface I18nConfig {
  debug: boolean;
  i18n: {
    defaultLocale: string;
    locales: string[];
  };
  reloadOnPrerender: boolean;
  ns: string[];
  defaultNS: string;
  backend: {
    loadPath: (lngs: string[]) => string;
    requestOptions: {
      cache: string;
      credentials: string;
      mode: string;
    };
    reloadInterval: number;
  };
  serializeConfig: boolean;
  use: any[];
  interpolation: {
    prefix: string;
    suffix: string;
  };
}

/**
 * 初始化 i18n
 */
export const initI18n = async (options: I18nInitOptions) => {
  const {
    defaultLocale = "en",
    locales,
    mtsHost,
    mtsPath,
    mtsNs,
    reloadInterval = 1000 * 60 * 30,
    debug = false,
  } = options;

  // 如果已经初始化过，直接返回
  if (i18n.isInitialized) {
    return i18n;
  }

  // 创建自定义的 loadPath 函数，集成请求管理器
  const createLoadPath = (lngs: string[], namespaces: string[]) => {
    const lng = lngs[0];
    const ns = namespaces[0];
    if (!lng || !mtsLocales[lng]) {
      throw new Error(`Unsupported language: ${lng}`);
    }
    return `${mtsHost}/${mtsPath}/${ns}/${mtsLocales[lng]}.json`;
  };

  // 创建自定义的 request 函数，集成请求管理器
  const createRequest = (
    options: any,
    url: string,
    payload: any,
    callback: any
  ) => {
    const requestKey = `${url}_${JSON.stringify(payload)}`;

    requestManager
      .getOrCreateRequest(requestKey, async () => {
        const response = await fetch(url, {
          ...options,
          cache: "no-cache",
          credentials: "same-origin",
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        callback(null, { status: 200, data });
      })
      .catch((error) => {
        callback(error, { status: 500, data: null });
      });
  };

  await i18n
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
      debug,
      lng: defaultLocale,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      ns: [mtsNs],
      defaultNS: mtsNs,
      backend: {
        loadPath: createLoadPath,
        request: createRequest,
        reloadInterval,
      },
      interpolation: {
        prefix: "{",
        suffix: "}",
      },
      react: {
        useSuspense: false, // 避免服务端渲染问题
      },
    });

  return i18n;
};

/**
 * 切换语言
 */
export const changeLanguage = async (lng: string) => {
  if (i18n.isInitialized) {
    await i18n.changeLanguage(lng);
  }
};

/**
 * 获取当前语言
 */
export const getCurrentLanguage = () => {
  return i18n.language;
};

/**
 * 获取所有支持的语言
 */
export const getSupportedLanguages = () => {
  return i18n.options.supportedLngs || [];
};

/**
 * 清除 i18n 缓存
 */
export const clearI18nCache = () => {
  requestManager.clearCache();
  if (i18n.isInitialized) {
    i18n.reloadResources();
  }
};
