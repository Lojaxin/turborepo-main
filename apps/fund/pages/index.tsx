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
    <div>
        <Button onClick={() => setValue("test2")}>change value</Button>
        <p>{value}</p>
        <Link href="/">返回首页</Link>
        <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} aria-label="basic tabs example">
          <Tab label="Item One"  />
          <Tab label="Item Two"  />
          <Tab label="Item Three" />
        </Tabs>
        <Box>
            {tabValue === 0 && <div>Item One</div>}
            {tabValue === 1 && <div>Item Two</div>}
            {tabValue === 2 && <div>Item Three</div>}
        </Box>
    </div>
  );
}
