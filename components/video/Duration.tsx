import React from 'react'
import { formatSeconds } from "utils/formatters";

interface Props {
    className?:string
    seconds: number,
    showMs?: boolean
    onClick?: (seconds) => void
}
export default function Duration ({ className, seconds, showMs, onClick }: Props) {
    return (
        <time onClick={() => onClick ? onClick(seconds) : null} dateTime={`P${Math.round(seconds)}S`} className={className}>
            {formatSeconds(seconds, showMs)}
        </time>
    )
}
