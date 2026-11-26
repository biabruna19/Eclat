/*
 * Estoque por categoria: ajustar quantidade, editar, adicionar e remover.
 * Substitui estoque_aneis.php, estoque_colares.php etc., que dependiam de
 * tabelas do MySQL que não estavam no repositório.
 */
(function () {
    const { icone, real, escapar, CAT } = Loja;
    const $ = (id) => document.getElementById(id);
    const cat = CAT[new URLSearchParams(location.search).get('categoria')] ? new URLSearchParams(location.search).get('categoria') : 'aneis';
    const C = CAT[cat];
    let editando = null, fotoNova = null;

    document.title = `Estoque de ${C.nome} · Éclat Joias`;
    document.querySelector('.admin-topo h1').textContent = `Estoque de ${C.nome}`;
    $('linhaFiltro').innerHTML = `<option value="">Todas as coleções</option><option value="prata">${C.prata.nome} (prata)</option><option value="dourado">${C.dourado.nome} (dourado)</option>`;
    $('pLinha').innerHTML = `<option value="prata">${C.prata.nome} · Prata</option><option value="dourado">${C.dourado.nome} · Dourado</option>`;

    const daCategoria = () => Loja.produtos().filter(p => p.categoria === cat);

    function desenhar() {
        const termo = $('filtro').value.trim().toLowerCase();
        const linha = $('linhaFiltro').value;
        const lista = daCategoria()
            .filter(p => (!linha || p.linha === linha) && (!termo || p.nome.toLowerCase().includes(termo)) && (!$('soBaixo').checked || p.estoque <= 3));
        const todos = daCategoria();
        $('sub').textContent = `${todos.length} produtos · ${todos.reduce((s, p) => s + p.estoque, 0)} peças em estoque · ${todos.filter(p => !p.estoque).length} esgotados. As mudanças aparecem na loja na hora.`;
        $('linhas').innerHTML = lista.map(p => `
            <tr data-id="${p.id}">
                <td><div class="produto-celula"><img src="${Loja.img(p.img)}" alt=""><div><strong>${escapar(p.nome)}</strong><small>${escapar(p.descricao)}</small></div></div></td>
                <td>${escapar(Loja.colecao(p))}</td>
                <td style="white-space:nowrap">${real(p.preco)}</td>
                <td><div class="estoque-ajuste ${p.estoque === 0 ? 'estoque-zero' : p.estoque <= 3 ? 'estoque-baixo' : ''}">
                    <button type="button" data-delta="-1" aria-label="Tirar uma unidade de ${escapar(p.nome)}">${icone('menos')}</button>
                    <input type="number" min="0" value="${p.estoque}" aria-label="Estoque de ${escapar(p.nome)}" data-estoque>
                    <button type="button" data-delta="1" aria-label="Adicionar uma unidade de ${escapar(p.nome)}">${icone('mais')}</button>
                </div></td>
                <td><div class="acoes-tabela">
                    <a class="botao-icone" href="../produto.html?id=${p.id}" target="_blank" rel="noopener" title="Ver na loja" aria-label="Ver ${escapar(p.nome)} na loja">${icone('sacola')}</a>
                    <button type="button" data-editar title="Editar" aria-label="Editar ${escapar(p.nome)}">${icone('editar')}</button>
                    <button type="button" data-apagar title="Remover" aria-label="Remover ${escapar(p.nome)}">${icone('lixeira')}</button>
                </div></td>
            </tr>`).join('') || `<tr><td colspan="5" style="text-align:center;padding:30px">Nenhum produto encontrado.</td></tr>`;
    }

    function mudar(id, fn) { Loja.salvarProdutos(Loja.produtos().map(p => p.id === id ? fn(p) : p)); }

    $('linhas').addEventListener('click', (e) => {
        const tr = e.target.closest('tr[data-id]');
        if (!tr) return;
        const id = tr.dataset.id;
        const delta = e.target.closest('[data-delta]');
        if (delta) { mudar(id, p => ({ ...p, estoque: Math.max(0, p.estoque + +delta.dataset.delta) })); tr.querySelector(`[data-delta="${delta.dataset.delta}"]`)?.focus(); }
        if (e.target.closest('[data-editar]')) abrir(Loja.produto(id));
        if (e.target.closest('[data-apagar]')) {
            const p = Loja.produto(id);
            const copia = Loja.produtos();
            Loja.salvarProdutos(copia.filter(x => x.id !== id));
            Loja.aviso(`${p.nome} removido do catálogo.`, { icone: 'lixeira', acao: 'Desfazer', aoAcionar: () => Loja.salvarProdutos(copia) });
        }
    });
    $('linhas').addEventListener('change', (e) => {
        if (!e.target.matches('[data-estoque]')) return;
        const v = Math.max(0, Math.floor(+e.target.value || 0));
        mudar(e.target.closest('tr').dataset.id, p => ({ ...p, estoque: v }));
        Loja.aviso('Estoque atualizado.');
    });
    ['filtro', 'linhaFiltro', 'soBaixo'].forEach(id => $(id).addEventListener('input', desenhar));

    // ----- janela de produto -----
    function abrir(p) {
        editando = p ? p.id : null;
        fotoNova = null;
        $('tituloJanela').textContent = p ? `Editar ${p.nome}` : `Novo produto em ${C.nome}`;
        $('pNome').value = p ? p.nome : '';
        $('pDesc').value = p ? p.descricao : '';
        $('pLinha').value = p ? p.linha : 'dourado';
        $('pPreco').value = p ? p.preco.toFixed(2).replace('.', ',') : '';
        $('pEstoque').value = p ? p.estoque : 5;
        $('pPrevia').src = p ? Loja.img(p.img) : `../${C.banner}`;
        $('pImg').value = '';
        document.querySelectorAll('#formProduto .erro').forEach(el => { el.textContent = ''; });
        Janela.abrir('janelaProduto');
    }
    $('novo').addEventListener('click', () => abrir(null));
    $('pImg').addEventListener('change', () => {
        const arq = $('pImg').files[0];
        if (!arq) return;
        if (arq.size > 1024 * 1024) { Loja.aviso('A foto precisa ter até 1 MB.', { icone: 'fechar' }); $('pImg').value = ''; return; }
        const leitor = new FileReader();
        leitor.onload = () => { fotoNova = leitor.result; $('pPrevia').src = fotoNova; };
        leitor.readAsDataURL(arq);
    });
    $('formProduto').addEventListener('submit', (e) => {
        e.preventDefault();
        const erro = (id, msg) => { $('erro-' + id).textContent = msg; $(id).setAttribute('aria-invalid', msg ? 'true' : 'false'); return !msg; };
        const preco = parseFloat($('pPreco').value.replace(/\./g, '').replace(',', '.'));
        const estoque = Math.floor(+$('pEstoque').value);
        let ok = erro('pNome', $('pNome').value.trim().length >= 2 ? '' : 'Digite o nome.');
        ok = erro('pDesc', $('pDesc').value.trim().length >= 5 ? '' : 'Escreva uma descrição curta.') && ok;
        ok = erro('pPreco', preco > 0 ? '' : 'Preço inválido.') && ok;
        ok = erro('pEstoque', estoque >= 0 ? '' : 'Estoque inválido.') && ok;
        if (!ok) return document.querySelector('#formProduto [aria-invalid="true"]').focus();
        const dados = { nome: $('pNome').value.trim(), descricao: $('pDesc').value.trim(), linha: $('pLinha').value, preco, estoque };
        try {
            if (editando) {
                mudar(editando, p => ({ ...p, ...dados, img: fotoNova || p.img }));
                Loja.aviso('Produto atualizado.');
            } else {
                const base = `${cat}-${dados.linha}-${dados.nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                let id = base, n = 2;
                while (Loja.produto(id)) id = `${base}-${n++}`;
                Loja.salvarProdutos([...Loja.produtos(), { id, categoria: cat, img: fotoNova || C[dados.linha].img, ...dados }]);
                Loja.aviso(`${dados.nome} adicionado ao catálogo.`, { acao: 'Ver na loja', link: `../produto.html?id=${id}` });
            }
            Janela.fechar('janelaProduto');
        } catch (err) {
            Loja.aviso('Não deu para salvar: o armazenamento do navegador está cheio. Tente uma foto menor.', { icone: 'fechar', duracao: 6000 });
        }
    });

    desenhar();
    Loja.aoMudar(desenhar);
})();
