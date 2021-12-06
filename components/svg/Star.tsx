import React from 'react'

interface Props {}

export const StarFilled = (props: Props) => {
  return (
    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 20.0921L21.034 25L18.902 15.75L26 9.52632L16.653 8.72368L13 0L9.347 8.72368L0 9.52632L7.098 15.75L4.966 25L13 20.0921Z" fill="black"/>
    </svg>
  )
}

export const StarOutline = (props: Props) => {
  return (
    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 9.52632L16.653 8.71053L13 0L9.347 8.72368L0 9.52632L7.098 15.75L4.966 25L13 20.0921L21.034 25L18.915 15.75L26 9.52632ZM13 17.6316L8.112 20.6184L9.412 14.9868L5.096 11.1974L10.79 10.6974L13 5.39474L15.223 10.7105L20.917 11.2105L16.601 15L17.901 20.6316L13 17.6316Z" fill="black"/>
    </svg>

  )
}
export const StarSmallFilled = (props: { color: 'white' | 'black' }) => {
  return (
    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 8.03684L8.899 10L7.997 6.3L11 3.81053L7.0455 3.48947L5.5 0L3.9545 3.48947L0 3.81053L3.003 6.3L2.101 10L5.5 8.03684Z" fill={props.color}/>
    </svg>
  )
}



