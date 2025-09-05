import { useState } from "react";
import { Button } from "@repo/ui/button";
import { useApi } from "@repo/hooks/index";
import { BasicSelect } from "@repo/ui/select";
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: 1, name: '股票型基金A', return: 12.5, risk: 'high' },
      { id: 2, name: '债券型基金B', return: 5.2, risk: 'low' },
      { id: 3, name: '混合型基金C', return: 8.7, risk: 'medium' },
    ];
  };

export default function Home() {
    const [value, setValue] = useState('1');
    const {data: result, loading} = useApi(fetchFundData, { immediate: true });
    console.log('%c [ result ]-31', 'font-size:13px; background:pink; color:#bf2c9f;', result)
  return (
    <div>
        <h1>Main</h1>
        <Button onClick={() => alert("Open alert")}>Open alert</Button>
        {
            loading ? <div>Loading...</div> : <BasicSelect options={result?.map(item=>({label: item.name, value: item.id})) || []} label="Fund" value={value} onChange={(event) => setValue(event.target.value)} />
        }
        <p><Link href="/fund">Fund</Link></p>
        <p><Link href="/child">main的子页面</Link></p>
    </div>
  );
}
