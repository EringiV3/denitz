export const queryKeys = {
  currentUser: () => ['currentUser'] as const,
  profile: (accountId: string) => ['profiles', accountId] as const,
  denims: (accountId: string) => ['profiles', accountId, 'denims'] as const,
  denim: (denimId: string) => ['denims', denimId] as const,
  denimReports: (denimId: string) => ['denims', denimId, 'reports'] as const,
  denimReport: (denimId: string, reportId: string) =>
    ['denims', denimId, 'reports', reportId] as const,
};
