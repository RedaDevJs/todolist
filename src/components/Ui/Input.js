import React from 'react'

const Input = ({label,error,...props}) => {
  return (
    <div className="flex flex-col mb-4">
    <label className="mb-2">{label}</label>
    <input
        {...props}
    />
    {error && <div className="text-red-500">{error}</div>}
</div>
  )
}

export default Input