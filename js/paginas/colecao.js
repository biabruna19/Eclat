/*
 * Coleção: substitui as 10 páginas PHP quase iguais da versão anterior
 * (aneisDourado.php, aneisPratas.php, ...). Também faz a busca.
 *   colecao.html?categoria=aneis&linha=dourado
 *   colecao.html?busca=perola
 */
(function () {
    const { CAT, escapar } = Loja;
    const url = new URLSearchParams(location.search);
    const categoria = CAT[url.get('categoria')] ? url.get('categoria') : null;
    const busca = (url.get('busca') || '').trim();
    let linha = ['prata', 'dourado'].includes(url.get('linha')) ? url.get('linha') : 'todas';
    const $ = (id) => document.getElementById(id);
    const sem = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    if (url.get('ordem')) $('ordem').value = url.get('ordem');

    function cabecalho() {
        const c = categoria && CAT[categoria];
        let trilha = `<a href="index.html">Início</a><span>/</span>`;
        if (busca) {
            $('sobre').textContent = 'Busca';
            $('titulo').innerHTML = `Resultados para <em>“${escapar(busca)}”</em>`;
            $('descricao').textContent = '';
            trilha += `<span aria-current="page">Busca</span>`;
            document.title = `Busca: ${busca} · Éclat Joias`;
        } else if (c) {
            const col = linha === 'todas' ? null : c[linha];
            $('sobre').textContent = col ? (linha === 'prata' ? 'Prata 925' : 'Banhado a ouro 18k') : 'Éclat Collections';
            $('titulo').innerHTML = col ? `Coleção <em>${col.nome}</em>` : c.nome;
            $('descricao').textContent = col ? col.descricao : `${c.nome} em duas coleções: ${c.prata.nome}, em prata, e ${c.dourado.nome}, em dourado.`;
            // faixa: foto de modelo + duas peças da coleção
            const pecas = Loja.produtos().filter(p => p.categoria === categoria && (!col || p.linha === linha) && p.estoque > 0);
            $('faixa').hidden = false;
            $('faixa').innerHTML = `<img src="imagens/editorial/${Loja.FOTO_LOOK[categoria]}.webp" alt="">` +
                pecas.slice(0, 2).map(p => `<img src="${Loja.img(p.img)}" alt="" style="object-fit:contain;padding:8%;background:var(--areia)">`).join('');
            trilha += col ? `<a href="${Loja.urlColecao(categoria)}">${c.nome}</a><span>/</span><span aria-current="page">${col.nome}</span>` : `<span aria-current="page">${c.nome}</span>`;
            document.title = `${col ? 'Coleção ' + col.nome : c.nome} · Éclat Joias`;
        } else {
            $('sobre').textContent = 'Éclat Collections';
            $('titulo').textContent = 'Todas as joias';
            $('descricao').textContent = 'Colares, brincos, anéis, relógios e braceletes em prata 925 e ouro 18k.';
            trilha += `<span aria-current="page">Todas as joias</span>`;
        }
        $('trilha').innerHTML = trilha;

        // abas: Todas / coleção prata / coleção dourado (ou categorias, na busca e em "todas")
        if (c) {
            $('abas').innerHTML = [['todas', 'Todas'], ['dourado', `${c.dourado.nome} · Ouro`], ['prata', `${c.prata.nome} · Prata`]]
                .map(([v, t]) => `<button type="button" data-linha="${v}" aria-pressed="${v === linha}">${t}</button>`).join('');
        } else {
            $('abas').innerHTML = [['todas', 'Todas'], ['dourado', 'Ouro 18k'], ['prata', 'Prata 925']]
                .map(([v, t]) => `<button type="button" data-linha="${v}" aria-pressed="${v === linha}">${t}</button>`).join('');
        }
    }

    function lista() {
        let itens = Loja.produtos();
        if (categoria) itens = itens.filter(p => p.categoria === categoria);
        if (linha !== 'todas') itens = itens.filter(p => p.linha === linha);
        if (busca) {
            const termos = sem(busca).split(/\s+/);
            itens = itens.filter(p => {
                const texto = sem(`${p.nome} ${p.descricao} ${Loja.colecao(p)} ${CAT[p.categoria].nome} ${CAT[p.categoria].singular} ${p.linha}`);
                return termos.every(t => texto.includes(t));
            });
        }
        if ($('soDisponiveis').checked) itens = itens.filter(p => p.estoque > 0);
        const ordem = $('ordem').value;
        if (ordem === 'menor') itens.sort((a, b) => a.preco - b.preco);
        else if (ordem === 'maior') itens.sort((a, b) => b.preco - a.preco);
        else if (ordem === 'nome') itens.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
        else itens.sort((a, b) => (b.estoque > 0) - (a.estoque > 0)); // esgotados por último
        return itens;
    }

    function desenhar() {
        const itens = lista();
        $('contagem').textContent = `${itens.length} ${itens.length === 1 ? 'joia' : 'joias'}`;
        $('grade').innerHTML = itens.length ? itens.map(Loja.cartao).join('') : `
            <div class="vazio" style="grid-column:1/-1">${Loja.icone('busca')}
                <h2>Nenhuma joia encontrada</h2>
                <p>${busca ? `Não achamos nada para “${escapar(busca)}”. Tente outra palavra, como “pérola”, “ouro” ou “safira”.` : 'Tente mudar os filtros.'}</p>
                <a class="botao botao-escuro" href="colecao.html">Ver todas as joias</a>
            </div>`;
    }

    $('abas').addEventListener('click', (e) => {
        const b = e.target.closest('[data-linha]');
        if (!b) return;
        linha = b.dataset.linha;
        const nova = new URLSearchParams(location.search);
        if (linha === 'todas') nova.delete('linha'); else nova.set('linha', linha);
        history.replaceState(null, '', `${location.pathname}?${nova}`);
        cabecalho();
        desenhar();
    });
    $('ordem').addEventListener('change', desenhar);
    $('soDisponiveis').addEventListener('change', desenhar);
    Loja.aoMudar((chave) => { if (['eclat_produtos', 'eclat_favoritos', 'tudo'].includes(chave)) desenhar(); });

    cabecalho();
    desenhar();
})();
