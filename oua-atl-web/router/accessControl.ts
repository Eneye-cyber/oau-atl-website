// accessControl.ts
import { ROUTES } from './routes';

export const roleAccessRules = {
  guest: {
    restrictedPaths: ['/admin', '/members'],
    redirectPath: ROUTES.MEMBERS_LOGIN,
  },
  member: {
    restrictedPaths: ['/admin'],
    redirectPath: ROUTES.ROOT,
  },
  admin: {
    restrictedPaths: ['/members'],
    redirectPath: ROUTES.ROOT,
  },
};

export const checkAccess = (role: keyof typeof roleAccessRules, currentPath: string): string | null => {
  const roleRules = roleAccessRules[role];
  if (!roleRules) return null;

  const isRestricted = roleRules.restrictedPaths.some((path) => currentPath.startsWith(path));
  return isRestricted ? roleRules.redirectPath : null;
};
