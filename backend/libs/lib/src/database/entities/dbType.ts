export enum UserRole {
  Normal = '0',
  Admin = '1',
}

/**
 * 最大文字数
 */
export const MAX_DB_LENGTH = {
  EMAIL: 80,
  BCRYPT_PASSWORD: 60,
  PLAIN_PASSWORD: 16,
  HOBBY_NAME: 50,
  ADMIN_ID: 8,
  CRYPTOCURRENCY_TYPE: 3,
  CURRENCY_NAME: 16,
  ROLE: 1,
} as const;
