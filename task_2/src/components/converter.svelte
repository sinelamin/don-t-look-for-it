<script lang="ts">
  import { onMount } from "svelte";
  import { fetchCurrencies } from "../services/currencyApi";
  import type { CurrencyData } from "../types/currency";

  export let currencyFirst: string = "RUB";
  export let currencySecond: string = "USD";

  let currencyListFirst: string[] = [];
  let currencyListSecond: string[] = [];

  async function getCurrencyList(
    currency: string,
    updateFunction: (currencies: string[]) => void,
  ): Promise<void> {
    try {
      const data: CurrencyData = await fetchCurrencies(currency);
      const currencyList = Object.keys(data.conversion_rates);
      updateFunction(currencyList);
      console.log(currencyListFirst);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Could not load currency rates:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  }

  onMount(() => {
    getCurrencyList(currencyFirst, (list) => (currencyListFirst = list));
    getCurrencyList(currencySecond, (list) => (currencyListSecond = list));
  });
</script>

<main class="converter">
  <form class="converter-form">
    <div class="input__wrapper">
      <input class="converter-form__input currency--first" type="number" />
      <select class="currency-list" name="currency">
        {#each currencyListFirst as currency}
          <option class="currency-list__item" value={currency}>
            {currency}
          </option>
        {/each}
      </select>
    </div>

    <div class="input__wrapper">
      <input class="converter-form__input currency--second" type="number" />
      <select class="currency-list" name="currency">
        {#each currencyListSecond as currency}
          <option class="currency-list__item" value={currency}>
            {currency}
          </option>
        {/each}
      </select>
    </div>
  </form>
</main>

<style>
  .input__wrapper {
    display: flex;
    margin-top: 50px;
    align-items: center;
    height: 50px;
  }

  .currency-list {
    margin-left: 5px;
    background-color: transparent;
    border: none;
  }

  .currency-list__item {
    background-color: #242424;
  }

  .converter-form__input {
    display: block;
    width: 500px;
    font-size: 28px;
    border-radius: 8px;
  }
</style>
