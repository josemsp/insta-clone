import { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src: string;
  alt?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

const Image = ({ src, alt, className = '', onError, ...props }: Props) => {
  return (
    <img
      className={`${className} object-cover`}
      src={src}
      alt={alt}
      onError={onError}
      {...props}
    />
  )
}

export default Image