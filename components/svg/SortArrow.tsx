import React from 'react'

interface Props {
  order: 'ASC' | 'DESC'
}

function SortArrow(props: Props) {
  return (props.order === 'ASC' ?
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 4.5L8.20688 3.70687L5.0625 6.84562L5.0625 -3.44227e-07L3.9375 -4.42578e-07L3.9375 6.84562L0.79875 3.70125L3.93402e-07 4.5L4.5 9L9 4.5Z"
          fill="#828282"/>
      </svg>
      : <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 4.5L0.793125 5.29312L3.9375 2.15437L3.9375 9H5.0625L5.0625 2.15437L8.20125 5.29875L9 4.5L4.5 0L0 4.5Z"
          fill="#828282"/>
      </svg>

  )
}

export default SortArrow
