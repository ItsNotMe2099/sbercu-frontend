import React from 'react'
import { formatSeconds } from "utils/formatters";

interface Props {
    className?:string
    seconds: number,
    onClick?: (seconds) => void
}
export default function Duration ({ className, seconds, onClick }: Props) {
    return (
        <time onClick={() => onClick ? onClick(seconds) : null} dateTime={`P${Math.round(seconds)}S`} className={className}>
            {formatSeconds(seconds)}
        </time>
    )
}
