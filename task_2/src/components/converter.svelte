<script lang="ts">
  import { onMount } from "svelte";
  import { fetchCurrencies } from "../services/currencyApi";
  import type { CurrencyData } from "../types/currency";

  export let currencyFirst: string = "RUB";
  export let currencySecond: string = "USD";

  let currencyListFirst: string[] = [];
  let currencyListSecond: string[] = [];

  let firstInput: HTMLInputElement;
  let secondInput: HTMLInputElement;

  async function getCurrencyList(
    currency: string,
    updateFunction: (currencies: string[]) => void,
  ): Promise<void> {
    try {
      const data: CurrencyData = await fetchCurrencies(currency);
      const currencyList: string[] = Object.keys(data.conversion_rates);
      updateFunction(currencyList);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Could not load currency rates:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  }

  function changeCurrency(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newCurrency: string = selectElement.value;

    if (selectElement.name === "currencyFirst") {
      currencyFirst = newCurrency;
    } else {
      currencySecond = newCurrency;
    }
  }

  async function getCurrencyValue(
    event: Event,
    currency: string,
  ): Promise<void> {
    try {
      const selectElement = event.target as HTMLSelectElement;
      const data: CurrencyData = await fetchCurrencies(currency);

      if (selectElement.classList.contains("currency--first")) {
        if (firstInput.value.length != 0) {
          secondInput.value = `${+selectElement.value * data.conversion_rates[currencySecond]}`;
        } else {
          secondInput.value = "0";
        }
      } else {
        if (secondInput.value.length != 0) {
          firstInput.value = `${+selectElement.value * data.conversion_rates[currencyFirst]}`;
        } else {
          firstInput.value = "0";
        }
      }
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
      <input
        bind:this={firstInput}
        on:input={(event) => getCurrencyValue(event, currencyFirst)}
        class="converter-form__input currency--first"
        type="number"
      />
      <select
        on:change={changeCurrency}
        class="currency-list"
        name="currencyFirst"
      >
        {#each currencyListFirst as currency}
          <option class="currency-list__item" value={currency}>
            {currency}
          </option>
        {/each}
      </select>
    </div>

    <div class="input__wrapper">
      <input
        bind:this={secondInput}
        on:input={(event) => getCurrencyValue(event, currencySecond)}
        class="converter-form__input currency--second"
        type="number"
      />
      <select
        on:change={changeCurrency}
        class="currency-list"
        name="currencySecond"
      >
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