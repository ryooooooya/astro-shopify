<script lang="ts">
  import { onMount } from "svelte";
  import { initCart, cart, isCartDrawerOpen } from "../stores/cart";

  onMount(() => {
    initCart();
  });

  function openCart() {
    isCartDrawerOpen.set(true);
  }
</script>

<div class="flex items-center gap-x-[2px]">
  <!-- <button class="relative" onclick={() => openCart()}>
    <span class="sr-only">Open your cart</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-7 h-7 sm:w-8 sm:h-8 pointer-events-none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
    {#if $cart && $cart.totalQuantity > 0}
      <div
        class="absolute -right-2 -top-1 sm:-right-1 sm:top-0 bg-emerald-900 text-white text-[12px] rounded-full"
      >
        <span class="w-5 h-5 flex justify-center text-center items-center">
          {$cart.totalQuantity}
        </span>
      </div>
    {/if}
  </button> -->
  <!-- <button class="cursor-pointer" onclick={() => openCart()}>
    Cart
  </button> -->
  <a href="/cart">Cart</a>
  <div class="relative">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
      <path fill="#000" d="M8.346 25.15a1.968 1.968 0 0 1-1.446-.595 1.968 1.968 0 0 1-.595-1.446c0-.567.198-1.049.595-1.446a1.968 1.968 0 0 1 1.446-.596c.567 0 1.05.199 1.446.596.397.397.596.879.596 1.446s-.199 1.049-.596 1.446a1.97 1.97 0 0 1-1.446.596Zm11.308 0c-.567 0-1.05-.198-1.446-.595a1.968 1.968 0 0 1-.596-1.446c0-.567.199-1.049.596-1.446.397-.397.879-.596 1.446-.596s1.049.199 1.446.596c.397.397.595.879.595 1.446s-.198 1.049-.595 1.446a1.968 1.968 0 0 1-1.446.596ZM7.018 6.709l2.957 6.193h7.954a.326.326 0 0 0 .18-.05.442.442 0 0 0 .134-.141l3.13-5.688c.044-.082.048-.155.01-.218-.037-.064-.1-.096-.19-.096H7.018Zm-.839-1.75h16.199c.477 0 .837.203 1.082.61.244.406.256.82.035 1.244l-3.738 6.77a2.107 2.107 0 0 1-.76.787 1.98 1.98 0 0 1-1.035.282H9.45L8.1 17.119c-.06.09-.062.187-.006.291a.27.27 0 0 0 .252.157h13.35v1.75H8.345c-.778 0-1.362-.335-1.753-1.006-.391-.67-.405-1.34-.042-2.01l1.665-2.992L3.97 4.375H1.75v-1.75h3.32l1.11 2.333Z"/>
    </svg>
    {#if $cart && $cart.totalQuantity > 0}
      <div
        class="absolute -right-[14px] -bottom-[6px] bg-black text-white text-xs font-bold rounded-full border-[1px] border-white"
      >
        <span class="w-5 h-5 flex justify-center text-center items-center">
          {$cart.totalQuantity}
        </span>
      </div>
    {/if}
  </div>
</div>
