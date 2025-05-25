import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value:T, delay = 500): T {
    // 1. 상태 변수: 최조엊ㄱ으로 쓰로틀링 적용된 값 저장
    const [throttledValue, setThrottledValue] = useState<T>(value);

    // 2. Ref lastExcecuted:마지막으로 실행된 시간을 기록하는 변수
    const lastExcecuted = useRef<number>(Date.now());

    // 3. useEffect: value, delay가 변경될 때 아래 로직 실행
    useEffect(() => {
        if (Date.now() >= lastExcecuted.current + delay) {
            // 현재 시간이 지난 경우 현재 시각으로 lastExcuted 업데이트
            lastExcecuted.current = Date.now();
            setThrottledValue(value);
        } else {
            const timerId = setTimeout(() => {
                // 타이머가 만료되면 마지막 업데이트 시간을 현재 시각으로 갱신
                lastExcecuted.current = Date.now();
                setThrottledValue(value);
            }, delay);

            // 클린업 펑션 이펙트가 재실행되기 전에 타이머가 실행되지 않았다면 기존 타이머를 claerTimeout을 통해 취소하여 중복 업데이트 방지
            return () => clearTimeout(timerId);
        }
    }, [value, delay]);
    return throttledValue;
}

export default useThrottle;