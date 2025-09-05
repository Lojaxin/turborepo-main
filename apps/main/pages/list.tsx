import React,{ useEffect, useState } from 'react';
import { Button } from "@repo/ui/button";
import { useRouter } from 'next/router';
import { capitalize } from '@repo/utils/string';
import { formatTime } from '@repo/utils/time';

export default function Child() {
  const router = useRouter();
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
        <p>list</p>
        <p>{capitalize('hello world')}</p>
        <p>{`当前时间： ${time}`}</p>
        <Button onClick={() => router.push('/')}>返回首页</Button>
    </div>
  )
}