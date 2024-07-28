import { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src: string;
  alt?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

const Image = ({ src, alt, className = '', onError, ...props }: Props) => {
  const handleOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    onError?.(e)
  }

  return (
    <img
      className={`${className} object-cover`}
      src={src}
      alt={alt}
      onError={handleOnError}
      loading="lazy"
      {...props}
    />
  )
}

export default Image