/* Página inicial: categorias, carrossel de novidades e mais desejados. */
(function () {
    const { CAT, ORDEM, icone } = Loja;

    // Categorias (a foto é uma peça de cada uma)
    const capa = { colares: 'colares-dourado-lumiere', brincos: 'brincos-dourado-calisson', aneis: 'aneis-dourado-calme', relogios: 'relogios-dourado-amour', braceletes: 'braceletes-dourado-lys-blanc' };
    document.getElementById('listaCategorias').innerHTML = ORDEM.map(c => {
        const p = Loja.produto(capa[c]) || Loja.produtos().find(x => x.categoria === c);
        return `<a class="categoria revelar" href="${Loja.urlColecao(c)}">
            <div class="categoria-foto"><img src="${Loja.img(p.img)}" alt="" loading="lazy"></div>
            <h3>${CAT[c].nome}</h3>
            <span>${CAT[c].prata.nome} · ${CAT[c].dourado.nome}</span>
        </a>`;
    }).join('');

    // Mais desejados: uma peça de cada categoria e linha, das disponíveis
    function destaques() {
        const lista = [];
        ORDEM.forEach(c => ['dourado', 'prata'].forEach(l => {
            const p = Loja.produtos().find(x => x.categoria === c && x.linha === l && x.estoque > 3);
            if (p) lista.push(p);
        }));
        document.getElementById('destaques').innerHTML = lista.slice(0, 8).map(Loja.cartao).join('');
    }
    destaques();
    Loja.aoMudar((chave) => { if (chave === 'eclat_produtos' || chave === 'eclat_favoritos' || chave === 'tudo') destaques(); });

    // Ícones dos benefícios
    document.querySelectorAll('[data-icone]').forEach(el => el.insertAdjacentHTML('afterbegin', icone(el.dataset.icone)));

    // Carrossel: passa sozinho, pausa com o mouse e aceita deslizar no celular
    const trilho = document.getElementById('trilho');
    const total = trilho.children.length;
    const pontos = document.getElementById('pontos');
    let atual = 0, timer = null;
    pontos.innerHTML = Array.from({ length: total }, (_, i) => `<button type="button" aria-label="Novidade ${i + 1}"></button>`).join('');
    document.getElementById('anterior').innerHTML = icone('esquerda');
    document.getElementById('proxima').innerHTML = icone('direita');
    function ir(i) {
        atual = (i + total) % total;
        trilho.style.transform = `translateX(-${atual * 100}%)`;
        [...pontos.children].forEach((b, j) => b.setAttribute('aria-current', j === atual));
        [...trilho.children].forEach((s, j) => { s.setAttribute('aria-hidden', j !== atual); s.tabIndex = j === atual ? 0 : -1; });
    }
    const iniciar = () => { parar(); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(atual + 1), 6000); };
    const parar = () => clearInterval(timer);
    pontos.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { ir([...pontos.children].indexOf(b)); iniciar(); } });
    document.getElementById('anterior').addEventListener('click', () => { ir(atual - 1); iniciar(); });
    document.getElementById('proxima').addEventListener('click', () => { ir(atual + 1); iniciar(); });
    const car = document.getElementById('carrossel');
    car.addEventListener('mouseenter', parar); car.addEventListener('mouseleave', iniciar);
    car.addEventListener('focusin', parar); car.addEventListener('focusout', iniciar);
    let x0 = null;
    car.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; parar(); }, { passive: true });
    car.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) ir(atual + (dx < 0 ? 1 : -1)); x0 = null; iniciar(); });
    ir(0); iniciar();

    // Newsletter (demonstração)
    document.getElementById('formNews').addEventListener('submit', (e) => {
        e.preventDefault();
        const campo = document.getElementById('emailNews');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value.trim())) { campo.focus(); Loja.aviso('Digite um e-mail válido.', { icone: 'fechar' }); return; }
        localStorage.setItem('eclat_newsletter', campo.value.trim());
        campo.value = '';
        Loja.aviso('Prontinho! Use BEMVINDA15 na sua primeira compra.', { icone: 'presente', duracao: 5000 });
    });
})();
