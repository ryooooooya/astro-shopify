<script lang="ts">
  import type { z } from "zod";
  import type { MoneyV2Result } from "../utils/schemas";

  interface Props {
    price: z.infer<typeof MoneyV2Result>;
    showCurrency: boolean;
    size?: "sm" | "lg";
  }

  let { price, showCurrency, size = "sm" }: Props = $props();

  let formatPrice = $derived.by(() => new Intl.NumberFormat("en-US", {
    // style: "currency",
    currency: price.currencyCode,
    currencyDisplay: showCurrency ? "symbol" : "narrowSymbol",
  }).format(parseFloat(price.amount)));
</script>

<span>
  <span class={`${size == "sm" ? (`text-base tracking-2`) : (`text-[20px] tracking-2`)}`}>
    ¥
  </span>
  {formatPrice}
</span>
