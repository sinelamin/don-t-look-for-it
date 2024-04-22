import type { CurrencyData } from "../types/currency";

export async function fetchCurrencies(baseCurrency: string): Promise<CurrencyData> {
  const apiUrl = `https://v6.exchangerate-api.com/v6/fc8cb330498d16f31968d242/latest/${baseCurrency}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch currency rates');
    }
    const data: CurrencyData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw error;
  }
}