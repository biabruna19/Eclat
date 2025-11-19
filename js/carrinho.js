/*
 * ARQUIVO: carrinho.js
 * Carrinho de Joias - Vanilla JS
 * Responsável por gerenciar e renderizar os itens do carrinho e persistir via AJAX.
 */

// State
let cart = window.phpCartData || []; 
let appliedCoupon = null;
let shipping = { price: 0, service: null, eta: null };

// Helpers
const format = v => 'R$ ' + v.toFixed(2).replace('.',',');

// DOM
const cartItemsEl = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const taxesEl = document.getElementById('taxes');
const shippingEl = document.getElementById('shipping');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const cepInput = document.getElementById('cepInput');
const calcShippingBtn = document.getElementById('calcShippingBtn');
const shippingInfoEl = document.getElementById('shippingInfo');
const checkoutBtn = document.getElementById('checkoutBtn');


/**
 * Envia uma requisição AJAX para carrinho.php para atualizar a Sessão PHP.
 */
async function updateCartServer(action, index = null, qty = 1) {
    const formData = new FormData();
    formData.append('action', action);
    if (index !== null) {
        formData.append('index', index);
    }
    if (action === 'update_qty') {
        formData.append('qty', qty);
    }
    
    // URL para a própria página
    const url = 'carrinho.php'; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            // Adiciona o cabeçalho para o PHP saber que esta é uma requisição AJAX
            headers: {
                'X-Requested-With': 'XMLHttpRequest' 
            }
        });

        if (!response.ok) {
            throw new Error(`Erro de rede ou no servidor: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
            // Atualiza o estado local do carrinho e renderiza
            cart = result.cart;
            renderCart();
        } else {
            alert('Erro ao atualizar o carrinho: ' + result.message);
        }

    } catch (error) {
        console.error('Falha na comunicação com o servidor:', error);
        alert('Ocorreu um erro. Tente novamente.');
    }
}


// Funções de Ação do Usuário (Chamando AJAX)

function changeQty(index, qty){
  qty = Math.max(0, Number(qty)); 
  updateCartServer('update_qty', index, qty);
}

function removeItem(index){
  updateCartServer('remove', index);
}

// Funções de Cálculo (permanecem as mesmas)
function calculateTotals(){
  const subtotal = cart.reduce((s,i)=> s + i.price * i.qty, 0);
  const taxes = subtotal * 0.12;
  const discount = appliedCoupon ? (appliedCoupon.type==='PERCENT' ? subtotal * appliedCoupon.value/100 : appliedCoupon.value) : 0;
  const total = Math.max(0, subtotal + taxes + shipping.price - discount);
  return { subtotal, taxes, discount, total };
}

// FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO DO CARRINHO
function renderCart(){
  cartItemsEl.innerHTML = '';
  if(cart.length === 0){
    cartItemsEl.innerHTML = '<p class="muted">Seu carrinho está vazio.</p>';
    // Limpa estado local ao esvaziar
    appliedCoupon = null;
    shipping = { price: 0, service: null, eta: null };
  } else {
    cart.forEach((it, idx) => {
      const node = document.createElement('div');
      node.className = 'cart-summary-item'; 
      
      // Renderiza o item
      node.innerHTML = `
        <div class="summary-item-header">
            <div class="summary-item-info">
                <div class="summary-item-thumb">
                    <img src="${it.image}" alt="${it.name}" style="width:100%;height:100%;border-radius:4px;object-fit:cover">
                </div>
                <div>
                    <div style="font-weight:600">${it.name}</div>
                    <div class="muted small">${it.variant}</div>
                </div>
            </div>
            <button class="remove-btn" data-index="${idx}" aria-label="Remover item">Remover</button>
        </div>
        <div class="summary-item-details">
            <div style="font-weight:700; color:#444;">R$ ${it.price.toFixed(2).replace('.',',')}</div>
            <div style="display:flex; gap: 5px; align-items: center;">
                <label class="small" for="qty-${it.id}-${idx}">Quantidade</label>
                <input id="qty-${it.id}-${idx}" class="qty-input" type="number" min="1" value="${it.qty}" data-index="${idx}" style="width: 50px; text-align: center;" />
            </div>
        </div>
      `;
      cartItemsEl.appendChild(node);
    });
    
    // Anexa listeners (sempre reanexar após o render)
    document.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('change', e => {
        const idx = e.target.getAttribute('data-index');
        changeQty(idx, e.target.value); 
      });
    });
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = e.currentTarget.getAttribute('data-index');
        removeItem(idx);
      });
    });
  }

  const totals = calculateTotals();
  subtotalEl.textContent = format(totals.subtotal);
  taxesEl.textContent = format(totals.taxes);
  shippingEl.textContent = format(shipping.price);
  discountEl.textContent = '- ' + format(totals.discount);
  totalEl.textContent = format(totals.total);
}

// Coupon e Shipping (simulações, sem salvar na sessão)
applyCouponBtn.addEventListener('click', () => {
    // ... (lógica de cupom) ...
  const code = (couponInput.value || '').trim().toUpperCase();
  if(!code) return alert('Informe um cupom');
  if(code === 'PROMO10'){
    appliedCoupon = { code: 'PROMO10', type: 'PERCENT', value: 10 };
    alert('Cupom aplicado: 10% off');
  } else if(code === 'DESCONTO30'){
    appliedCoupon = { code: 'DESCONTO30', type: 'FIXED', value: 30 };
    alert('Cupom aplicado: R$30,00 off');
  } else {
    appliedCoupon = null;
    alert('Cupom inválido');
  }
  renderCart();
});

calcShippingBtn.addEventListener('click', () => {
    // ... (lógica de frete) ...
  const cep = (cepInput.value || '').trim();
  if(!cep || cep.length < 8){ alert('Informe um CEP válido (8 dígitos)'); return; }
  
  if(cep.startsWith('0') || cep.startsWith('1')){
    shipping = { price: 15.00, service: 'Sedex', eta: 2 };
  } else {
    shipping = { price: 29.90, service: 'PAC', eta: 7 };
  }
  shippingInfoEl.textContent = `${shipping.service} — ${shipping.eta} dias úteis`;
  renderCart();
});

// Checkout (Limpa o carrinho no servidor via AJAX)
checkoutBtn.addEventListener('click', () => {
  if(cart.length === 0){ alert('Seu carrinho está vazio'); return; }
  
  alert('Simulando o processamento do pedido...');
  
  // Limpa o carrinho na Sessão PHP e renderiza novamente
  updateCartServer('clear', null); 
  
  alert('Pedido finalizado (simulação). Carrinho limpo.');
});

// init
renderCart();