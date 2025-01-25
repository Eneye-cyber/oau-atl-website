// accessControl.ts
import { ROUTES } from './routes';

export const roleAccessRules = {
  guest: {
    restrictedPaths: ['/admin', '/members', '/customize'],
    redirectPath: ROUTES.MEMBERS_LOGIN,
  },
  member: {
    restrictedPaths: ['/admin', '/customize'],
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
