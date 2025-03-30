import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

    export default function ThemeContent(){
        const { theme } = useTheme();
        const isLightMode = theme === THEME.LIGHT;

        return (
            <div className={clsx(
                'p-4 h-dvh w-full',
                isLightMode ? 'bg-white' : 'bg-gray-800'
            )}>
            <h1 className={clsx('text-wxl font-bold', isLightMode ? 'text-black' : 'text-white')}>
                ThemeContent
            </h1>
            <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                언제쯤 종강할까요...? 왜 이제야 3월 끝... ㅠㅠ
            </p>
            </div>
        );
    }
