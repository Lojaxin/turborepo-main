import React, { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/router";
import { capitalize } from "@repo/utils/string";
import { formatTime } from "@repo/utils/time";
import Link from "next/link";

export default function Child() {
  const router = useRouter();
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            utils公共包测试{" "}
          </h3>
          <p>{capitalize("hello world")}</p>
          <p>{`当前时间： ${time}`}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            返回路由测试
          </h2>
          <Button onClick={() => router.push("/")}>返回首页</Button>
          <div className="space-y-3 mt-4 bg-slate-400 p-4 rounded-lg">
            <Link href="/fund">去Fund应用</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
