import React from 'react'

interface props {
  ariaLabel?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  value: string | number | readonly string[];
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
}

const Input = (props: props) => {
  const { ariaLabel, className, onChange, placeholder, type, value, autoComplete } = props

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value)
  }

  return (
    <input
      aria-label={ariaLabel}
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={handleOnChange}
      value={value}
      autoComplete={autoComplete}
    />
  )
}

export default Input