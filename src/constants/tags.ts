export const tags = {
  User: "User",
  Withdrawals: "Withdrawals",
} as const;

export type TagType = (typeof tags)[keyof typeof tags];
