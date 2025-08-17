export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
  },
} as const;