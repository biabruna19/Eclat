/* Página inicial: abertura, categorias, capítulos das coleções, novidades e conjunto. */
(function () {
    const { CAT, ORDEM, icone, real, escapar } = Loja;
    const $ = (id) => document.getElementById(id);
    const P = (id) => Loja.produto(id);
    const capa = (c, l) => Loja.produtos().find(p => p.categoria === c && p.linha === l && p.estoque > 0);
    document.querySelectorAll('[data-icone]').forEach(el => el.insertAdjacentHTML('afterbegin', icone(el.dataset.icone)));

    // abertura com fotos que se alternam
    const fotos = [...$('aberturaFotos').querySelectorAll('img')];
    const legendas = [['Coleção Riviera', 'Anéis em ouro 18k', 'colecao.html?categoria=aneis&linha=dourado'], ['Coleção Essence', 'Braceletes em ouro 18k', 'colecao.html?categoria=braceletes&linha=dourado'], ['Coleção Étoile Royale', 'Colares em ouro 18k', 'colecao.html?categoria=colares&linha=dourado']];
    let a = 0, timer;
    $('aberturaPontos').innerHTML = fotos.map((_, i) => `<button type="button" aria-label="Foto ${i + 1}"></button>`).join('');
    function foto(i) {
        a = (i + fotos.length) % fotos.length;
        fotos.forEach((im, j) => im.classList.toggle('ativa', j === a));
        [...$('aberturaPontos').children].forEach((b, j) => b.setAttribute('aria-current', j === a));
        $('legendaTitulo').textContent = legendas[a][0];
        $('legendaSub').textContent = legendas[a][1];
        document.querySelector('.abertura-legenda').href = legendas[a][2];
    }
    const girar = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => foto(a + 1), 6500); };
    $('aberturaPontos').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { foto([...$('aberturaPontos').children].indexOf(b)); girar(); } });
    foto(0); girar();

    // categorias
    const capaCat = { colares: 'colares-dourado-lumiere', brincos: 'brincos-dourado-calisson', aneis: 'aneis-dourado-calme', relogios: 'relogios-dourado-amour', braceletes: 'braceletes-dourado-lys-blanc' };
    $('categorias').innerHTML = ORDEM.map(c => `
        <a class="categoria revelar" href="${Loja.urlColecao(c)}"><div class="foto"><img src="${Loja.img((P(capaCat[c]) || capa(c, 'dourado')).img)}" alt="" loading="lazy"></div>
            <h3>${CAT[c].nome}</h3><span class="miuda">${CAT[c].dourado.nome} · ${CAT[c].prata.nome}</span></a>`).join('');
    
    // capítulos das coleções
    const capitulos = [
        { num: 'I', cat: 'aneis', linha: 'dourado', sub: 'O esplendor do ouro', foto: 'retrato-maos', alt: 'Mãos com anéis dourados' },
        { num: 'II', cat: 'colares', linha: 'dourado', sub: 'A majestade do ouro', foto: 'joias-linho', alt: 'Colares e brincos dourados sobre linho' },
    ];
    $('capitulos').innerHTML = capitulos.map((k, i) => {
        const col = CAT[k.cat][k.linha];
        const pecas = Loja.produtos().filter(p => p.categoria === k.cat && p.linha === k.linha && p.estoque > 0).slice(0, 3);
        return `<article class="capitulo ${i % 2 ? 'invertido' : ''} revelar">
            <div class="capitulo-foto"><img src="imagens/editorial/${k.foto}.webp" alt="${k.alt}" loading="lazy"></div>
            <div class="capitulo-texto">
                <span class="miuda dourada">Capítulo ${k.num} · ${CAT[k.cat].nome}</span>
                <h2>${col.nome}</h2>
                <p class="subtitulo">${k.sub}</p>
                <p>${escapar(col.descricao)}</p>
                <div class="mini-produtos">${pecas.map(p => `<a class="mini-produto" href="produto.html?id=${p.id}"><div class="foto"><img src="${Loja.img(p.img)}" alt="" loading="lazy"></div><strong>${escapar(p.nome)}</strong><span>${real(p.preco)}</span></a>`).join('')}</div>
                <a class="link-sublinhado" href="${Loja.urlColecao(k.cat, k.linha)}">Descobrir a coleção ${icone('seta')}</a>
            </div>
        </article>`;
    }).join('');

    // novidades: o segundo produto disponível de cada coleção
    function novidades() {
        const lista = [];
        ORDEM.forEach(c => ['dourado', 'prata'].forEach(l => { const p = Loja.produtos().filter(x => x.categoria === c && x.linha === l && x.estoque > 3)[1]; if (p) lista.push(p); }));
        $('trilho').innerHTML = lista.map(Loja.cartao).join('');
    }
    novidades();
    Loja.aoMudar((chave) => { if (['eclat_produtos', 'eclat_favoritos', 'tudo'].includes(chave)) novidades(); });
    const passo = () => $('trilho').querySelector('.peca').offsetWidth + 24;
    $('voltar').addEventListener('click', () => $('trilho').scrollBy({ left: -passo(), behavior: 'smooth' }));
    $('avancar').addEventListener('click', () => $('trilho').scrollBy({ left: passo(), behavior: 'smooth' }));

    // conjunto
    const conjunto = ['colares-dourado-lumiere', 'brincos-dourado-calisson', 'aneis-dourado-calme'].map(P).filter(Boolean);
    $('itensConjunto').innerHTML = conjunto.map(p => `
        <label class="item-conjunto"><input type="checkbox" checked value="${p.id}"><img src="${Loja.img(p.img)}" alt="">
            <span><strong>${escapar(p.nome)}</strong><small>${CAT[p.categoria].singular} · Coleção ${escapar(Loja.colecao(p))}</small></span><span>${real(p.preco)}</span></label>`).join('');
    function totalConjunto() {
        const marcados = [...$('itensConjunto').querySelectorAll('input:checked')].map(i => P(i.value));
        const cheio = marcados.reduce((s, p) => s + p.preco, 0);
        const completo = marcados.length === conjunto.length;
        $('totalCheio').textContent = completo ? real(cheio) : '';
        $('totalConjunto').textContent = real(completo ? cheio * 0.9 : cheio);
        $('levarConjunto').disabled = !marcados.length;
        $('levarConjunto').textContent = marcados.length ? `Adicionar ${marcados.length === conjunto.length ? 'o conjunto' : marcados.length === 1 ? '1 peça' : marcados.length + ' peças'}` : 'Escolha uma peça';
    }
    $('itensConjunto').addEventListener('change', totalConjunto);
    $('levarConjunto').addEventListener('click', () => {
        const marcados = [...$('itensConjunto').querySelectorAll('input:checked')].map(i => i.value);
        marcados.forEach(id => Loja.adicionar(id, 1));
        Loja.abrirSacola(marcados[0]);
    });
    totalConjunto();

    $('formCarta').addEventListener('submit', (e) => {
        e.preventDefault();
        const v = $('emailCarta').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { Loja.aviso('Digite um e-mail válido.', { icone: 'fechar' }); return; }
        $('emailCarta').value = '';
        Loja.aviso('Inscrição feita. Seu cupom é BEMVINDA15.', { icone: 'presente' });
    });
})();
