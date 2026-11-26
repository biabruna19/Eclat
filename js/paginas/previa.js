/* Prévia do novo visual da página inicial. Usa o catálogo e a sacola da loja. */
(function () {
    const { CAT, ORDEM, icone, real, escapar } = Loja;
    const $ = (id) => document.getElementById(id);
    const P = (id) => Loja.produto(id);
    document.querySelectorAll('[data-icone]').forEach(el => el.insertAdjacentHTML('afterbegin', icone(el.dataset.icone)));

    // anúncio que alterna
    const frases = ['Frete grátis em compras acima de R$ 999', 'Embalagem de presente em todas as compras', 'Até 10x sem juros · 5% de desconto no Pix'];
    let f = 0;
    setInterval(() => { const el = $('anuncio'); el.classList.add('saindo'); setTimeout(() => { f = (f + 1) % frases.length; el.textContent = frases[f]; el.classList.remove('saindo'); }, 600); }, 4500);

    // cabeçalho que encolhe ao rolar
    const cab = $('cabecalho');
    addEventListener('scroll', () => cab.classList.toggle('rolou', scrollY > 40), { passive: true });

    // menu com mega menu
    const capa = (c, l) => Loja.produtos().find(p => p.categoria === c && p.linha === l && p.estoque > 0);
    $('navegacao').innerHTML = ORDEM.map(c => `
        <div class="nav-item"><a href="${Loja.urlColecao(c)}">${CAT[c].nome}</a>
            <div class="mega"><div class="envolve mega-grade">
                <div class="mega-lista"><h3>${CAT[c].nome}</h3>
                    <a href="${Loja.urlColecao(c)}">Ver todos</a><a href="${Loja.urlColecao(c, 'dourado')}">Coleção ${CAT[c].dourado.nome}</a><a href="${Loja.urlColecao(c, 'prata')}">Coleção ${CAT[c].prata.nome}</a></div>
                ${['dourado', 'prata'].map(l => { const p = capa(c, l); return `
                <a class="mega-card" href="${Loja.urlColecao(c, l)}"><div class="foto"><img src="${Loja.img(p.img)}" alt="" loading="lazy"></div>
                    <div><span class="miuda dourada">${l === 'dourado' ? 'Ouro 18k' : 'Prata 925'}</span><h4>${CAT[c][l].nome}</h4><p>${escapar(CAT[c][l].descricao)}</p><span class="link-sublinhado">Descobrir</span></div></a>`; }).join('')}
            </div></div>
        </div>`).join('') + `<div class="nav-item"><a href="sobre.html">Nossa história</a></div>`;

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
    $('rodapeCategorias').innerHTML = ORDEM.map(c => `<li><a href="${Loja.urlColecao(c)}">${CAT[c].nome}</a></li>`).join('');

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

    // novidades
    const fotoColecao = { aneis: 'maos-aneis', brincos: 'retrato-brincos', colares: 'retrato-colar', braceletes: 'retrato-maos', relogios: 'aneis-linho' };
    function novidades() {
        const lista = [];
        ORDEM.forEach(c => ['dourado', 'prata'].forEach(l => { const p = Loja.produtos().filter(x => x.categoria === c && x.linha === l && x.estoque > 3)[1]; if (p) lista.push(p); }));
        $('trilho').innerHTML = lista.map(p => {
            const fav = Loja.ehFavorito(p.id);
            return `<article class="peca"><div class="peca-midia">
                <a class="peca-foto" href="produto.html?id=${p.id}" aria-label="${escapar(p.nome)}">
                    <img class="foto-1" src="${Loja.img(p.img)}" alt="" loading="lazy">
                    <img class="foto-2" src="imagens/editorial/${fotoColecao[p.categoria]}.webp" alt="" loading="lazy">
                </a>
                <span class="peca-etiqueta miuda">Novo</span>
                <button type="button" class="peca-fav" data-favorito="${p.id}" aria-pressed="${fav}" aria-label="Favoritar ${escapar(p.nome)}">${icone('coracao')}</button>
                <button type="button" class="peca-add miuda" data-levar="${p.id}">Adicionar à sacola</button></div>
                <div class="peca-info"><span class="miuda">${escapar(Loja.colecao(p))}</span><h3><a href="produto.html?id=${p.id}">${escapar(p.nome)}</a></h3><p>${real(p.preco)}</p></div>
            </article>`;
        }).join('');
    }
    novidades();
    const passo = () => $('trilho').querySelector('.peca').offsetWidth + 24;
    $('voltar').addEventListener('click', () => $('trilho').scrollBy({ left: -passo(), behavior: 'smooth' }));
    $('avancar').addEventListener('click', () => $('trilho').scrollBy({ left: passo(), behavior: 'smooth' }));

    // adicionar à sacola (aviso em vez da sacola lateral, que é da loja atual)
    document.addEventListener('click', (e) => {
        const b = e.target.closest('[data-levar]');
        if (!b) return;
        const r = Loja.adicionar(b.dataset.levar, 1);
        Loja.aviso(r.ok ? `${P(b.dataset.levar).nome} foi para a sacola` : 'Peça indisponível', { icone: 'sacola', acao: r.ok ? 'Ver sacola' : '', link: 'sacola.html' });
    });

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
        [...$('itensConjunto').querySelectorAll('input:checked')].forEach(i => Loja.adicionar(i.value, 1));
        Loja.aviso('Peças adicionadas à sacola', { icone: 'sacola', acao: 'Ver sacola', link: 'sacola.html' });
    });
    totalConjunto();

    // contadores
    function bolinhas() {
        document.querySelector('[data-bolinha="sacola"]').textContent = Loja.qtdSacola() || '';
        document.querySelector('[data-bolinha="favoritos"]').textContent = Loja.favoritos().length || '';
    }
    bolinhas();
    Loja.aoMudar(bolinhas);

    $('formCarta').addEventListener('submit', (e) => {
        e.preventDefault();
        const v = $('emailCarta').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { Loja.aviso('Digite um e-mail válido.', { icone: 'fechar' }); return; }
        $('emailCarta').value = '';
        Loja.aviso('Inscrição feita. Seu cupom é BEMVINDA15.', { icone: 'presente' });
    });
})();
