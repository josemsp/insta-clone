import { useRef } from "react";

const InputFile = ({ onChange, label }: { label: string, onChange: (file: File | null) => void }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onChange(e.target.files[0]);
  }

  return (
    <div>
      <button
        className='px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600'
        onClick={handleOnClick}
      >
        {label}
      </button>
      <input
        ref={fileInput}
        type='file'
        className='hidden'
        onChange={handleOnChange}
      />
    </div>
  )
}

export default InputFile