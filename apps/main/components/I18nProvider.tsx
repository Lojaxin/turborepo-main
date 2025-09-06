"use client";

import { useEffect, useState } from "react";
import { initI18n, I18nInitOptions } from "@repo/i18n/init";

interface I18nProviderProps {
  children: React.ReactNode;
  options: I18nInitOptions;
}

export const I18nProvider = ({ children, options }: I18nProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      try {
        await initI18n(options);
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize i18n:", error);
        // 即使初始化失败，也显示内容
        setIsInitialized(true);
      }
    };

    initializeI18n();
  }, [options]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
