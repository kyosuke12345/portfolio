/**
 * 監視する仮想通貨の種類
 */
export const CRYPTOCURRENCY_TYPE = {
  BTC: '5', // ビットコイン
  ETH: '29', // イーサリアム
  SOL: '855', // ソラナ
} as const;

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
} as const;
