import { useState } from "react";
import { Button } from "@repo/ui/button";
import { useApi } from "@repo/hooks/index";
import { BasicSelect } from "@repo/ui/select";
import { useI18n, useT } from "@repo/i18n/hooks";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Link from "next/link";

// type Props = Omit<ImageProps, "src"> & {
//   srcLight: string;
//   srcDark: string;
// };

// const ThemeImage = (props: Props) => {
//   const { srcLight, srcDark, ...rest } = props;

//   return (
//     <>
//       <Image {...rest} src={srcLight} className="imgLight" />
//       <Image {...rest} src={srcDark} className="imgDark" />
//     </>
//   );
// };

// 模拟 API 函数
const fetchFundData = async (): Promise<any[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: 1, name: "股票型基金A", return: 12.5, risk: "high" },
    { id: 2, name: "债券型基金B", return: 5.2, risk: "low" },
    { id: 3, name: "混合型基金C", return: 8.7, risk: "medium" },
  ];
};

export default function Home() {
  const [value, setValue] = useState("1");
  const { data: result, loading } = useApi(fetchFundData, { immediate: true });
  const { changeLanguage, language } = useI18n();
  const t = useT();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Main 应用 - Tailwind CSS + i18n 测试
        </h1>

        {/* 语言切换器 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <FormControl fullWidth className="mb-4">
            <InputLabel>{t("Global.Language")}</InputLabel>
            <Select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              label={t("Global.Language")}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="sc">简体中文</MenuItem>
              <MenuItem value="tc">繁體中文</MenuItem>
              <MenuItem value="ko">한국어</MenuItem>
              <MenuItem value="ja">日本語</MenuItem>
            </Select>
          </FormControl>
          <p className="text-sm text-gray-500">当前语言: {language}</p>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              翻译测试
            </h3>
            <p>{t("Account.AboutAuthTwo")}</p>
            <p>{t("Global.AddressLocal")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              组件测试{" "}
            </h3>
            <Button
              onClick={() => alert("测试Button事件")}
              className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              点我测试Button事件
            </Button>

            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-600">
                    {t("Global.Loading")}
                  </span>
                </div>
              ) : (
                <BasicSelect
                  options={
                    result?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) || []
                  }
                  label="Fund"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              导航测试
            </h2>
            <div className="space-y-3">
              <Link
                href="/fund"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
              >
                前往 Fund 应用
              </Link>
              <Link
                href="/list"
                className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
              >
                Main 的子页面
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
