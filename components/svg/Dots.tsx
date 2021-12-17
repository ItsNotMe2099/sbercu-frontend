import React from 'react'

interface Props {
    color?: string
}

function Dots(props: Props) {
  return (
    <svg width="17" height="4" viewBox="0 0 17 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.69043 0C1.59043 0 0.69043 0.9 0.69043 2C0.69043 3.1 1.59043 4 2.69043 4C3.79043 4 4.69043 3.1 4.69043 2C4.69043 0.9 3.79043 0 2.69043 0ZM14.6904 0C13.5904 0 12.6904 0.9 12.6904 2C12.6904 3.1 13.5904 4 14.6904 4C15.7904 4 16.6904 3.1 16.6904 2C16.6904 0.9 15.7904 0 14.6904 0ZM8.69043 0C7.59043 0 6.69043 0.9 6.69043 2C6.69043 3.1 7.59043 4 8.69043 4C9.79043 4 10.6904 3.1 10.6904 2C10.6904 0.9 9.79043 0 8.69043 0Z" fill={props.color}/>
    </svg>
  )
}

export default Dots