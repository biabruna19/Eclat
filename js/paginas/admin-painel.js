/* Painel: resumo de vendas, últimos pedidos e estoque baixo. */
(function () {
    const { icone, real, escapar, CAT, ORDEM } = Loja;
    function desenhar() {
        const pedidos = Loja.pedidos();
        const validos = pedidos.filter(p => p.status !== 'cancelado');
        const fat = validos.reduce((s, p) => s + p.total, 0);
        const produtos = Loja.produtos();
        const unidades = produtos.reduce((s, p) => s + p.estoque, 0);
        const pend = pedidos.filter(p => ['aguardando', 'aprovado', 'separacao'].includes(p.status)).length;
        const card = (ic, rot, val, sub) => `<div class="resumo-card"><small>${icone(ic)} ${rot}</small><strong>${val}</strong><span>${sub}</span></div>`;
        document.getElementById('resumo').innerHTML =
            card('estrela', 'Faturamento', real(fat), `${validos.length} pedidos`) +
            card('pacote', 'A preparar', pend, 'aguardando, aprovados ou em separação') +
            card('sacola', 'Ticket médio', real(validos.length ? fat / validos.length : 0), 'por pedido') +
            card('joia', 'Peças em estoque', unidades, `${produtos.length} produtos · ${produtos.filter(p => !p.estoque).length} esgotados`);

        document.getElementById('ultimos').innerHTML = pedidos.slice(0, 6).map(p => `
            <tr><td><a class="link" href="pedidos.html#${p.numero}">${p.numero}</a></td><td>${escapar(p.cliente)}</td><td>${real(p.total)}</td><td>${Loja.seloStatus(p.status)}</td></tr>`).join('') || '<tr><td colspan="4">Nenhum pedido.</td></tr>';

        const porCat = Object.fromEntries(ORDEM.map(c => [c, 0]));
        validos.forEach(p => p.itens.forEach(i => { const c = i.id.split('-')[0]; if (c in porCat) porCat[c] += i.preco * i.qtd; }));
        const max = Math.max(1, ...Object.values(porCat));
        document.getElementById('barras').innerHTML = ORDEM.map(c => `<div class="barra-linha"><span>${CAT[c].nome}</span><div class="trilho"><i style="width:${(porCat[c] / max) * 100}%"></i></div><b>${real(porCat[c]).replace(',00', '')}</b></div>`).join('');

        const baixos = produtos.filter(p => p.estoque <= 3).sort((a, b) => a.estoque - b.estoque).slice(0, 6);
        document.getElementById('baixo').innerHTML = baixos.length ? `<table><tbody>${baixos.map(p => `
            <tr><td><div class="produto-celula"><img src="${Loja.img(p.img)}" alt=""><div><strong>${escapar(p.nome)}</strong><small>${CAT[p.categoria].singular} · ${escapar(Loja.colecao(p))}</small></div></div></td>
            <td style="text-align:right"><a class="link" href="estoque.html?categoria=${p.categoria}">${p.estoque ? p.estoque + ' un.' : 'Esgotado'}</a></td></tr>`).join('')}</tbody></table>` : '<p class="ajuda">Tudo com estoque confortável.</p>';
    }
    desenhar();
    Loja.aoMudar(desenhar);
})();
