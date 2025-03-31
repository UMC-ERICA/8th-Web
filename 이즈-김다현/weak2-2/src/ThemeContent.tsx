import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent() {
  const { theme } = useTheme();
  
  const isLightMode = theme === THEME.LIGHT;
  return (
    <div className={clsx(
      'p-4 h-dvh w-full',
      isLightMode ? 'bg-white' : 'bg-gray-800'
    )}>
      <h1 className={clsx('text-wxl font-bold',
        isLightMode ? 'text-black' : 'text-white'
      )}
      >
        ThemeContent
      </h1>
      <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
        우와 ㅎ..... 됐다....... 가나다라마바사
        <br/>아자차카타파하
        저 수요일에 놀러 가요
      </p>
  
    </div>
  );
}
