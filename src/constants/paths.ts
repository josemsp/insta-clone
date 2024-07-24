import ROUTES from "./routes";

export const AVATAR_PATH = (displayName: string, ext?: string) => `/images/avatars/${displayName}.${ext || 'jpg'}`;

export const PROFILE_PATH = (username: string) => `${ROUTES.PROFILE.replace(':username', username)}`;
