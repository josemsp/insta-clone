import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

const ForwardedInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ onChange, ...props }, ref) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      ref={ref}
      onChange={handleOnChange}
      {...props}
    />
  );
};

const Input = forwardRef(ForwardedInput);

export default Input;
