import { useState } from "react";
import { Button } from "@repo/ui/button";
import { useLocalStorage } from "@repo/hooks/useLocalStorage";
import { Tabs, Tab, Box } from '@mui/material';
import Link from "next/link";

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
    const [value, setValue] = useLocalStorage("testName", "test");
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tailwind CSS + MUI 集成测试</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Button onClick={() => setValue("test2")} className="mb-4">change value</Button>
          <p className="text-lg text-gray-600">当前值: <span className="font-semibold text-blue-600">{value}</span></p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Link href="/" className="text-blue-500 hover:text-blue-700 underline">返回首页</Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} aria-label="basic tabs example">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
          <Box className="mt-4">
            {tabValue === 0 && <div className="p-4 bg-blue-50 rounded text-blue-800">Item One 内容</div>}
            {tabValue === 1 && <div className="p-4 bg-green-50 rounded text-green-800">Item Two 内容</div>}
            {tabValue === 2 && <div className="p-4 bg-purple-50 rounded text-purple-800">Item Three 内容</div>}
          </Box>
        </div>
      </div>
    </div>
  );
}
