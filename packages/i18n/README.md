# @repo/i18n

这是一个基于 i18next 的多语言国际化包，支持动态 MTS 加载和防重复请求机制。

## 功能特性

- 🌍 支持多语言切换
- 🔄 动态 MTS 加载（通过接口请求）
- 🚫 防重复请求机制
- 📦 支持命名空间
- ⚡ 请求缓存和优化
- 🎯 TypeScript 支持

## 安装

```bash
pnpm add @repo/i18n
```

## 配置

### 1. 环境变量

在你的应用中创建 `.env.local` 文件：

```env
MTS_HOST=https://api.example.com
MTS_PATH=mts
MTS_NS=common
NEXT_PUBLIC_RELOAD_INTERVAL=1800000
```

### 2. 创建 i18n 配置

```typescript
// i18n.config.ts
import { createI18nConfig } from "@repo/i18n";

export const i18nConfig = createI18nConfig({
  defaultLocale: "en",
  locales: ["en", "sc", "tc", "ko", "ja"],
  mtsHost: process.env.MTS_HOST || "https://api.example.com",
  mtsPath: process.env.MTS_PATH || "mts",
  mtsNs: process.env.MTS_NS || "common",
  reloadInterval: 1000 * 60 * 30, // 30分钟
  debug: process.env.NODE_ENV === "development",
});
```

### 3. 在 Next.js 应用中集成

```tsx
// pages/_app.tsx
import { I18nProvider } from "../components/I18nProvider";
import { i18nConfig } from "../i18n.config";

export default function App({ Component, pageProps }) {
  return (
    <I18nProvider options={i18nConfig}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}

// i18n.config.ts
import { I18nInitOptions } from "@repo/i18n/init";

export const i18nConfig: I18nInitOptions = {
  defaultLocale: "en",
  locales: ["en", "sc", "tc", "ko", "ja"],
  mtsHost: process.env.MTS_HOST || "https://api.example.com",
  mtsPath: process.env.MTS_PATH || "mts",
  mtsNs: process.env.MTS_NS || "common",
  reloadInterval: 1000 * 60 * 30,
  debug: process.env.NODE_ENV === "development",
};
```

## 使用方法

### 基本用法

```tsx
import { useI18n, useT } from "@repo/i18n/hooks";

function MyComponent() {
  const { changeLanguage, language } = useI18n();
  const t = useT();

  return (
    <div>
      <h1>{t("Menu.ClientH5_HOME")}</h1>
      <button onClick={() => changeLanguage("sc")}>切换到中文</button>
    </div>
  );
}
```

### 高级用法

```tsx
import { useI18n } from "@repo/i18n/hooks";

function LanguageSwitcher() {
  const { changeLanguage, language, languages } = useI18n();

  return (
    <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
      {languages.map((lng) => (
        <option key={lng} value={lng}>
          {lng}
        </option>
      ))}
    </select>
  );
}
```

## MTS 数据结构

MTS 接口应返回以下格式的 JSON 数据：

```json
{
  "Menu": {
    "ClientH5_HOME": "首页",
    "ClientH5_TRADE_MANAGEMENT": "我的交易"
  },
  "Global": {
    "Submit": "提交",
    "Cancel": "取消",
    "Loading": "加载中..."
  }
}
```

## API 参考

### createI18nConfig(options)

创建 i18n 配置对象。

**参数：**

- `defaultLocale`: 默认语言
- `locales`: 支持的语言列表
- `mtsHost`: MTS 主机地址
- `mtsPath`: MTS 路径
- `mtsNs`: 命名空间
- `reloadInterval`: 重新加载间隔（毫秒）
- `debug`: 是否开启调试模式

### initI18n(options)

初始化 i18n 实例。

### useI18n(namespace?)

React Hook，返回 i18n 相关功能。

**返回值：**

- `t`: 翻译函数
- `i18n`: i18n 实例
- `changeLanguage`: 切换语言函数
- `language`: 当前语言
- `languages`: 支持的语言列表

### useT()

简化的翻译 Hook，返回翻译函数。

**返回值：**

- 翻译函数 `t(key, options?)`

## 支持的语言

- `en`: English
- `sc`: 简体中文
- `tc`: 繁體中文
- `ko`: 한국어
- `ja`: 日本語
- `vi`: Tiếng việt
- `th`: ภาษาไทย
- `in`: Indonesia
- `ar`: عربي
- `es`: español
- `pt`: Português
- `ug`: ئۇيغۇر
- `hi`: हिन्दी

## 注意事项

1. 确保 MTS 接口返回正确的 JSON 格式
2. 语言代码需要与配置中的 `locales` 匹配
3. 请求会自动缓存，避免重复请求
4. 支持静态文件部署，无需服务端预渲染
