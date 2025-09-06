import { useState } from "react";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/router";
import { useI18n, useT } from "@repo/i18n/hooks";
import {
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Link from "next/link";
import { useLocalStorage } from "@repo/hooks/useLocalStorage";

// const ThemeImage = (props: Props) => {
//   const { srcLight, srcDark, ...rest } = props;

//   return (
//     <>
//       <Image {...rest} src={srcLight} className="imgLight" />
//       <Image {...rest} src={srcDark} className="imgDark" />
//     </>
//   );
// };

export default function Home() {
  const [tabValue, setTabValue] = useState(1);

  const router = useRouter();
  const [value, setValue] = useLocalStorage("testName", "0");
  const { changeLanguage, language } = useI18n();
  const t = useT();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {t("Menu.ClientH5_HOME")} - Tailwind CSS + MUI + i18n 集成测试
        </h1>

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

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            aria-label="basic tabs example"
          >
            <Tab label={"路由测试"} />
            <Tab label={"自定义hooks包测试"} />
            <Tab label="Item Three" />
          </Tabs>
          <Box className="mt-4">
            {tabValue === 0 && (
              <div className="p-4 bg-blue-50 rounded text-blue-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                      Link to Main测试{" "}
                    </h3>
                    <Link href="/">Main</Link>
                    <br />
                    <Link href="/list">Main 的子页面</Link>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                      路由跳转
                    </h2>
                    <div className="space-y-3">
                      <Button onClick={() => router.push("/")}>
                        返回Main首页
                      </Button>
                      <Button onClick={() => router.push("/list")}>
                        Main的子页面
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tabValue === 1 && (
              <div className="p-4 bg-green-50 rounded text-green-800">
                <h3>useLocalStorage测试</h3>
                <p>当前值: {value}</p>
                <Button onClick={() => setValue(Math.random().toString())}>
                  设置值
                </Button>
              </div>
            )}
            {tabValue === 2 && (
              <div className="p-4 bg-purple-50 rounded text-purple-800">
                Item Three 内容
              </div>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
