import { useRef } from "react";

const InputFile = ({ onChange, label, accept='image/*' }: { label: string, onChange: (file: File | null) => void, accept?: string }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onChange(e.target.files[0]);
    if(fileInput.current) fileInput.current.value = '';
  }

  return (
    <div>
      <button
        className='px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 select-none'
        onClick={handleOnClick}
      >
        {label}
      </button>
      <input
        ref={fileInput}
        type='file'
        className="absolute top-0 left-0 opacity-0 pointer-events-none"
        onChange={handleOnChange}
        data-cy="select-image-input"
        accept={accept}
      />
    </div>
  )
}

export default InputFile