<!-- src/components/CartPage.svelte -->
<script>
  import { cart, removeCartItems } from '../stores/cart.ts';
  import { onMount } from 'svelte';
  
  let cartData = {};
  let cartItems = [];
  let isLoading = true;
  let totalPrice = 0;
  let checkoutUrl = '';

  // nanostoresのカートストアから状態を取得
  onMount(() => {
    const unsubscribe = cart.subscribe(value => {
      console.log('Cart value:', value);
      cartData = value;
      cartItems = value.lines?.nodes || [];
      totalPrice = parseFloat(value.cost?.subtotalAmount?.amount || '0');
      checkoutUrl = value.checkoutUrl || '';
      isLoading = false;
    });
    
    return unsubscribe;
  });

  // 商品数量を更新する関数（現在は削除のみ対応）
  async function updateQuantity(lineId, quantity) {
    if (quantity <= 0) {
      await removeItem(lineId);
      return;
    }
    
    // 数量更新機能は後で実装
    console.log(`数量更新: ${lineId} -> ${quantity}`);
  }

  // 商品を削除する関数
  async function removeItem(lineId) {
    try {
      await removeCartItems([lineId]);
    } catch (error) {
      console.error('商品削除エラー:', error);
    }
  }

  // チェックアウトに進む関数
  function proceedToCheckout() {
    if (cartItems.length === 0) return;
    
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }

  // 価格をフォーマットする関数
  function formatPrice(amount) {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  }
</script>

<div class="cart-page">
  {#if isLoading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  {:else if cartItems.length === 0}
    <!-- 空のカート -->
    <div class="text-center py-12">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 5H3M7 13L5.4 5M7 13l-2.293 2.293c-.188.188-.293.442-.293.707v.586c0 1.105.895 2 2h11M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
      </svg>
      <h2 class="text-2xl font-semibold text-gray-700 mb-2">カートは空です</h2>
      <p class="text-gray-500 mb-6">商品を追加してショッピングを始めましょう</p>
      <a href="/" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        ショッピングを続ける
      </a>
    </div>
  {:else}
    <!-- カート商品リスト -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 商品リスト -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border">
          {#each cartItems as line (line.id)}
            <div class="flex items-center p-6 border-b border-gray-200 last:border-b-0">
              <!-- 商品画像 -->
              <div class="flex-shrink-0 w-24 h-24">
                {#if line.merchandise?.image?.url}
                  <img
                    src={line.merchandise.image.url}
                    alt={line.merchandise.image.altText || line.merchandise.product.title}
                    class="w-full h-full object-cover rounded-lg"
                  />
                {:else}
                  <div class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                {/if}
              </div>
              
              <!-- 商品情報 -->
              <div class="flex-1 ml-6">
                <h3 class="text-lg font-semibold text-gray-900">
                  {line.merchandise?.product?.title || 'Unknown Product'}
                </h3>
                {#if line.merchandise?.title && line.merchandise.title !== 'Default Title'}
                  <p class="text-sm text-gray-600">{line.merchandise.title}</p>
                {/if}
                <p class="text-lg font-medium text-gray-900 mt-2">
                  {#if line.merchandise?.price?.amount}
                    {formatPrice(line.merchandise.price.amount)}
                  {:else if line.merchandise?.price}
                    {formatPrice(line.merchandise.price)}
                  {:else}
                    価格情報なし
                  {/if}
                </p>
              </div>
              
              <!-- 数量表示（更新機能は一時的に無効化） -->
              <div class="flex items-center space-x-3">
                <span class="text-gray-600">数量:</span>
                <span class="w-12 text-center font-medium bg-gray-100 px-2 py-1 rounded">
                  {line.quantity}
                </span>
              </div>
              
              <!-- 削除ボタン -->
              <button
                on:click={() => removeItem(line.id)}
                class="ml-4 text-red-500 hover:text-red-700 transition-colors"
                aria-label="商品を削除"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- 注文サマリー -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
          <h2 class="text-xl font-semibold mb-6">注文サマリー</h2>
          
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-sm">
              <span>小計</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>送料</span>
              <span>配送先住所入力後に計算</span>
            </div>
            <hr class="my-4">
            <div class="flex justify-between font-semibold text-lg">
              <span>合計</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
          
          <button
            on:click={proceedToCheckout}
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            disabled={cartItems.length === 0}
          >
            チェックアウトに進む
          </button>
          
          <a
            href="/"
            class="block w-full text-center text-blue-600 py-3 mt-3 hover:text-blue-700 transition-colors"
          >
            ショッピングを続ける
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .cart-page {
    /* ページ用のスタイル（モーダル用スタイルを上書き） */
    position: static !important;
    background: transparent !important;
    padding: 0 !important;
    max-width: none !important;
    width: 100% !important;
    height: auto !important;
    overflow: visible !important;
  }
</style>