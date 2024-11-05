import type { RouterContext, RouterMiddleware } from "deps";

/**
 * Check if user has required rights
 * @param requiredRights
 * @param userRights
 * @returns boolean
 */
const hasRequiredRights = (
  requiredRights: string[],
  userRights: string[]
): boolean => {
  return requiredRights.some((requiredRight) =>
    userRights.includes(requiredRight)
  );
};

export const auth =
  <Path extends string>(requiredRights: string[]): RouterMiddleware<Path> =>
  async (
    ctx: RouterContext<Path>,
    next: () => Promise<unknown>
  ): Promise<Error | void> => {
    await next();
  };
