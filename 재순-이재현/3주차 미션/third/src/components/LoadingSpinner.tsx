import { JSX } from "react";

export const LodingSpinner = (): JSX.Element => {
    return <div className="size-12 animate-spin rounded-full border-6 
    border-t-t-transparent border-[ #b2dab1]"
    role="status"
    >
        <span className="sr-only">로딩 중...</span>
        LoadingSpinner</div>;
}