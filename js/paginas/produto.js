/* Página de produto: produto.html?id=aneis-dourado-bonne */
(function () {
    const { CAT, icone, real, escapar } = Loja;
    const id = new URLSearchParams(location.search).get('id');
    const $ = (s) => document.getElementById(s);
    let qtd = 1;

    const MATERIAL = {
        prata: { nome: 'Prata 925', cuidados: 'Guarde separada das outras peças, longe da umidade. Para limpar, use flanela macia; evite perfume e cloro.' },
        dourado: { nome: 'Banho de ouro 18k', cuidados: 'Evite contato com perfume, cremes, cloro e água do mar. Limpe com flanela seca e guarde na embalagem.' },
    };

    function desenhar() {
        const p = Loja.produto(id);
        if (!p) {
            $('area').innerHTML = `<div class="vazio" style="margin:40px 0 80px">${icone('joia')}<h2>Essa joia não está mais disponível</h2><p>Ela pode ter saído do catálogo.</p><a class="botao botao-escuro" href="colecao.html">Ver todas as joias</a></div>`;
            $('trilha').innerHTML = '<a href="index.html">Início</a>';
            return;
        }
        const c = CAT[p.categoria];
        const col = c[p.linha];
        document.title = `${p.nome} · ${c.singular} ${col.nome} · Éclat Joias`;
        $('trilha').innerHTML = `<a href="index.html">Início</a><span>/</span><a href="${Loja.urlColecao(p.categoria)}">${c.nome}</a><span>/</span><a href="${Loja.urlColecao(p.categoria, p.linha)}">${col.nome}</a><span>/</span><span aria-current="page">${escapar(p.nome)}</span>`;
        qtd = Math.min(Math.max(1, qtd), Math.max(1, p.estoque));
        const fav = Loja.ehFavorito(p.id);
        const disp = p.estoque <= 0 ? ['esgotado', 'Esgotado no momento'] : p.estoque <= 3 ? ['pouco', `Corre! Só ${p.estoque === 1 ? 'resta 1 unidade' : `restam ${p.estoque} unidades`}`] : ['', 'Em estoque, pronta para envio'];
        $('area').innerHTML = `
        <div class="pagina-produto">
            <div class="foto-produto" id="foto"><img src="${Loja.img(p.img)}" alt="${escapar(c.singular + ' ' + p.nome)}" width="600" height="600"></div>
            <div class="detalhe">
                <span class="sobretitulo">${c.singular} · Coleção ${escapar(col.nome)}</span>
                <h1>${escapar(p.nome)}</h1>
                <p class="descricao">${escapar(p.descricao)}.</p>
                <p class="preco-grande">${real(p.preco)}</p>
                <p class="parcelas">${Loja.parcelas(p.preco)}</p>
                <p class="preco-pix">${real(p.preco * (1 - Loja.DESCONTO_PIX))} no Pix (5% de desconto)</p>
                <p class="disponibilidade ${disp[0]}">${disp[1]}</p>
                <div class="comprar">
                    <div class="quantidade" role="group" aria-label="Quantidade">
                        <button type="button" id="menos" aria-label="Diminuir quantidade" ${qtd <= 1 || p.estoque <= 0 ? 'disabled' : ''}>${icone('menos')}</button>
                        <output id="qtd" aria-live="polite">${qtd}</output>
                        <button type="button" id="mais" aria-label="Aumentar quantidade" ${qtd >= p.estoque ? 'disabled' : ''}>${icone('mais')}</button>
                    </div>
                    <button type="button" class="botao botao-escuro" id="adicionar" ${p.estoque <= 0 ? 'disabled' : ''}>${icone('sacola')} ${p.estoque <= 0 ? 'Esgotado' : 'Adicionar à sacola'}</button>
                    <button type="button" class="coracao-grande" data-favorito="${p.id}" aria-pressed="${fav}" aria-label="Salvar nos favoritos">${icone('coracao')}</button>
                </div>
                <form class="calc-frete" id="formFrete" novalidate>
                    <label for="cep">${icone('caminhao')} Calcular frete e prazo</label>
                    <div class="linha-form">
                        <input class="entrada" id="cep" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" maxlength="9">
                        <button type="submit" class="botao botao-contorno botao-pequeno">Calcular</button>
                    </div>
                    <ul class="resultado-frete" id="resultadoFrete" aria-live="polite"></ul>
                </form>
                <div class="sanfona">
                    <details open><summary>Detalhes da peça ${icone('mais')}</summary>
                        <ul>
                            <li><strong>Material:</strong> ${MATERIAL[p.linha].nome}</li>
                            <li><strong>Coleção:</strong> ${escapar(col.nome)}: ${escapar(col.descricao)}</li>
                            <li><strong>Código:</strong> ${p.id.toUpperCase()}</li>
                        </ul>
                    </details>
                    <details><summary>Cuidados com a joia ${icone('mais')}</summary><p>${MATERIAL[p.linha].cuidados}</p></details>
                    <details><summary>Garantia, trocas e embalagem ${icone('mais')}</summary><p>Todas as peças vão em embalagem de presente, com certificado de autenticidade e garantia de 1 ano contra defeitos de fabricação. Você pode trocar em até 30 dias.</p></details>
                </div>
            </div>
        </div>`;

        $('menos').addEventListener('click', () => { qtd--; desenhar(); });
        $('mais').addEventListener('click', () => { qtd++; desenhar(); });
        $('adicionar').addEventListener('click', () => {
            const r = Loja.adicionar(p.id, qtd);
            if (r.ok) { Loja.abrirSacola(p.id); if (r.limitado) Loja.aviso(`Adicionamos o máximo disponível (${r.qtd}).`, { icone: 'pacote' }); }
            else if (r.motivo === 'limite') Loja.aviso(`Você já tem todas as ${r.max} unidades na sacola.`, { icone: 'pacote' });
        });
        const cep = $('cep');
        cep.value = localStorage.getItem('eclat_cep') || '';
        cep.addEventListener('input', () => { cep.value = Loja.mascaraCep(cep.value); });
        $('formFrete').addEventListener('submit', (e) => {
            e.preventDefault();
            const r = Loja.frete(cep.value, p.preco * qtd);
            if (!r) { $('resultadoFrete').innerHTML = '<li style="color:var(--vermelho)">Digite um CEP com 8 números.</li>'; cep.focus(); return; }
            localStorage.setItem('eclat_cep', cep.value);
            $('resultadoFrete').innerHTML = `<li><span>Entrega para ${r.regiao}</span></li>` + r.opcoes.map(o => `<li><span>${o.nome} · até ${o.dias} dias úteis</span><strong>${o.preco ? real(o.preco) : 'Grátis'}</strong></li>`).join('');
        });
        // zoom acompanhando o mouse
        const foto = $('foto'), im = foto.querySelector('img');
        foto.addEventListener('mousemove', (e) => {
            const r = foto.getBoundingClientRect();
            im.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
            foto.classList.add('zoom');
        });
        foto.addEventListener('mouseleave', () => foto.classList.remove('zoom'));

        // relacionados: mesma coleção, depois mesma categoria
        const outros = Loja.produtos().filter(x => x.id !== p.id && x.estoque > 0);
        const rel = [...outros.filter(x => x.categoria === p.categoria && x.linha === p.linha), ...outros.filter(x => x.categoria === p.categoria && x.linha !== p.linha)].slice(0, 4);
        $('relacionados').hidden = !rel.length;
        $('gradeRelacionados').innerHTML = rel.map(Loja.cartao).join('');
        $('verColecao').href = Loja.urlColecao(p.categoria, p.linha);
    }

    desenhar();
    Loja.aoMudar((chave) => { if (['eclat_produtos', 'tudo'].includes(chave)) desenhar(); });
})();
