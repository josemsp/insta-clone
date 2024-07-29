import ROUTES from "./routes";

export const PROFILE_PATH = (username: string) => `${ROUTES.PROFILE.replace(':username', username)}`;

export const IMAGE_PUBLIC_PATH = (filename: string) => {
  const url = import.meta.env.MODE === 'production' ? import.meta.env.BASE_URL : '/';
  return `${url}images/${filename}`;
}
