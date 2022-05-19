export type CryptocurrencyMasterItemResponse = {
  id: number;
  name: string;
  type: string;
  minThreshold: number | null;
  maxThreshold: number | null;
};

export type CryptocurrencyMasterListResponse = {
  items: CryptocurrencyMasterItemResponse[];
};
