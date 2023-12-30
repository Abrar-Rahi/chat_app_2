import React from 'react'

const Button = ({name,className,type}) => {
  return (
    <>
    {type=="disabled" ?
    <button className={`py-1 px-2 bg-primary font-inter font-normal text-white text-lg rounded-lg ${className}`} disabled >{name}</button>

    :
    <button className={`py-1 px-2 bg-primary font-inter font-normal text-white text-lg rounded-lg ${className}`} >{name}</button>
    }
    </>
  )
}

export default Button