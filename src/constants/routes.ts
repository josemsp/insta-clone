const ROUTES = {
  DASHBOARD: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  PROFILE: '/:username',
  NOT_FOUND: '/not-found',
  EDIT_PROFILE: '/accounts/edit',
} as const;

export default ROUTES;