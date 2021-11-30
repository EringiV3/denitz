export const queryKeys = {
  currentUser: () => ['currentUser'] as const,
  profile: (accountId: string) => ['profile', accountId] as const,
  users: () => ['users'] as const,
  user: (accountId: string) => ['users', accountId] as const,
  denims: () => ['denims'] as const,
  denim: (denimId: string) => ['denims', denimId] as const,
  denimReports: (denimId: string) => ['denims', denimId, 'reports'] as const,
  denimReport: (denimId: string, reportId: string) =>
    ['denims', denimId, 'reports', reportId] as const,
};
