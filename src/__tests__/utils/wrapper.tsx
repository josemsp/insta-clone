import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";

interface WrapperProps extends PropsWithChildren {
  initialPath?: string;
}

export const Wrapper = ({ children, initialPath = "/signup" }: WrapperProps) => {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      {children}
    </MemoryRouter>
  );
};
