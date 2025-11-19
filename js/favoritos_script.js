// ARQUIVO: ../js/favoritos_script.js
// Responsável por adicionar/remover favoritos usando Cookie e dar feedback visual.

// O nome da chave deve ser o mesmo usado no PHP para o cookie (CRÍTICO)
const FAVORITES_KEY = "eclat_favoritos";

// --- 1. Funções para gerenciar o Cookie (JavaScript Puro) ---

/**
 * Lê o cookie de favoritos e retorna um array de IDs.
 * @returns {Array} Array contendo os IDs dos produtos favoritos.
 */
function getFavoritesFromCookie() {
    const name = FAVORITES_KEY + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            try {
                // Tenta decodificar o JSON e garante que é um array
                return JSON.parse(c.substring(name.length, c.length)) || [];
            } catch (e) {
                return []; 
            }
        }
    }
    return [];
}

/**
 * Salva o array de IDs atualizado de volta no cookie.
 * Expira em 30 dias com path=/ para todo o site.
 * @param {Array} favorites - Array de IDs de produtos favoritos.
 */
function saveFavoritesToCookie(favorites) {
    const d = new Date();
    // Tempo em milissegundos: 30 dias * 24 horas * 60 minutos * 60 segundos * 1000 ms
    d.setTime(d.getTime() + (86400 * 30 * 1000)); 
    const expires = "expires="+ d.toUTCString();
    
    // O cookie deve ser definido com path=/ para funcionar em todo o site
    document.cookie = FAVORITES_KEY + "=" + JSON.stringify(favorites) + ";" + expires + ";path=/";
}

/**
 * Adiciona ou remove um ID do array de favoritos no cookie.
 * @param {string} produtoId - O ID único do produto.
 * @returns {boolean} True se foi adicionado, False se foi removido.
 */
function toggleFavorite(produtoId) {
    let favoritos = getFavoritesFromCookie();
    const index = favoritos.indexOf(produtoId); 

    if (index === -1) {
        // Adiciona
        favoritos.push(produtoId);
        saveFavoritesToCookie(favoritos);
        return true; // Adicionado
    } else {
        // Remove
        favoritos.splice(index, 1);
        saveFavoritesToCookie(favoritos);
        return false; // Removido
    }
}

// -----------------------------------------------------------
// 2. Lógica do Botão de Coração (Interação do Usuário)
// -----------------------------------------------------------

document.addEventListener("click", function(e) {
    // Busca o botão mais próximo com a classe de controle
    const btn = e.target.closest(".js-toggle-favorite"); 
    if (!btn) return;

    // Se for o botão de remover específico na página de favoritos, adiciona
    // a classe "js-remover-favorito" na página de favoritos para lidar com a remoção
    // e recarregar a página, mas a função principal de toggle é a mesma.
    
    e.preventDefault(); 
    
    // Pega o ID a partir do card pai
    const card = btn.closest(".card");
    const icon = btn.querySelector("i");
    const produtoId = card ? card.dataset.id : btn.dataset.productId; 
    
    if (!produtoId) {
        console.error("ID do produto não encontrado.");
        return;
    }

    // 1. Atualiza o cookie
    const isNowFavorite = toggleFavorite(produtoId); 

    // 2. Atualiza o visual e lida com a remoção na página de favoritos
    if (isNowFavorite) {
        // Produto foi adicionado
        btn.classList.add("favorited");
        icon.classList.remove("far"); 
        icon.classList.add("fas");    
        icon.style.color = 'red'; 
        
    } else {
        // Produto foi removido
        btn.classList.remove("favorited");
        icon.classList.remove("fas"); 
        icon.classList.add("far");    
        icon.style.color = 'gray'; // Cor padrão para desfavoritado

        // Se a remoção ocorrer na página de favoritos, recarrega para sumir com o card
        if (window.location.pathname.includes('favoritos.php')) {
            window.location.reload(); 
        }
    }
});

// -----------------------------------------------------------
// 3. Atualização Inicial ao Carregar a Página
// -----------------------------------------------------------

/**
 * Percorre todos os cards na página e define o estado visual do coração
 * com base no cookie de favoritos ao carregar a página.
 */
function updateProductHearts() {
    const favoritos = getFavoritesFromCookie();
    
    document.querySelectorAll(".card").forEach(card => {
        // Busca o botão de toggle com a classe correta
        const btn = card.querySelector(".js-toggle-favorite");
        if (!btn) return; 

        const id = card.dataset.id;
        const icon = btn.querySelector("i");
        
        // Aplica o estado visual correto baseado no cookie
        if (favoritos.includes(id)) { 
            btn.classList.add("favorited");
            icon.classList.remove("far"); 
            icon.classList.add("fas");
            icon.style.color = 'red';
        } else {
            btn.classList.remove("favorited");
            icon.classList.remove("fas");
            icon.classList.add("far");
            icon.style.color = 'gray'; // Cor padrão para desfavoritado
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Garante que o estado do coração (vermelho/vazio) está correto 
    // quando a página de catálogo é carregada.
    updateProductHearts(); 
});