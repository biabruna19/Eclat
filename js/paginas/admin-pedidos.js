/* Pedidos: filtro por status, detalhes e mudança de status. */
(function () {
    const { icone, real, escapar, STATUS } = Loja;
    const $ = (id) => document.getElementById(id);
    $('statusFiltro').innerHTML = `<option value="">Todos os status</option>` + Object.entries(STATUS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');

    function desenhar() {
        const termo = $('buscaPedido').value.trim().toLowerCase();
        const st = $('statusFiltro').value;
        const lista = Loja.pedidos().filter(p => (!st || p.status === st) && (!termo || p.numero.toLowerCase().includes(termo) || p.cliente.toLowerCase().includes(termo)));
        $('linhas').innerHTML = lista.map(p => `
            <tr>
                <td><strong>${p.numero}</strong></td>
                <td style="white-space:nowrap">${Loja.dataCurta(p.criado)}</td>
                <td>${escapar(p.cliente)}<br><small class="ajuda">${escapar(p.email)}</small></td>
                <td>${p.itens.reduce((s, i) => s + i.qtd, 0)}</td>
                <td style="white-space:nowrap">${real(p.total)}</td>
                <td>${escapar(p.pagamento)}</td>
                <td><label class="sr-only" for="st-${p.numero}">Status do pedido ${p.numero}</label>
                    <select id="st-${p.numero}" data-status="${p.numero}" class="entrada" style="min-height:36px;padding:4px 10px;width:auto">${Object.entries(STATUS).map(([k, v]) => `<option value="${k}" ${k === p.status ? 'selected' : ''}>${v}</option>`).join('')}</select></td>
                <td><div class="acoes-tabela"><button type="button" data-ver="${p.numero}" aria-label="Ver detalhes do pedido ${p.numero}" title="Detalhes">${icone('busca')}</button></div></td>
            </tr>`).join('') || '<tr><td colspan="8" style="text-align:center;padding:30px">Nenhum pedido encontrado.</td></tr>';
    }

    function detalhe(numero) {
        const p = Loja.pedidos().find(x => x.numero === numero);
        if (!p) return;
        const e = p.endereco || {};
        $('detalhe').innerHTML = `
            <h2 id="tituloPedido">Pedido ${p.numero} <button type="button" class="botao-icone" data-fechar-janela aria-label="Fechar">${icone('fechar')}</button></h2>
            <p style="margin-bottom:16px">${Loja.seloStatus(p.status)}</p>
            <dl>
                <dt>Cliente</dt><dd>${escapar(p.cliente)} · ${escapar(p.email)}</dd>
                <dt>Data</dt><dd>${Loja.dataHora(p.criado)}</dd>
                <dt>Entrega</dt><dd>${escapar(p.entrega || '')}${p.prazo ? ` · até ${p.prazo} dias úteis` : ''}<br>${escapar([e.rua, e.numero].filter(Boolean).join(', '))}${e.complemento ? ' · ' + escapar(e.complemento) : ''}<br>${escapar([e.bairro, e.cidade && `${e.cidade}/${e.uf}`, e.cep].filter(Boolean).join(' · '))}</dd>
                <dt>Pagamento</dt><dd>${escapar(p.pagamento)}${p.cupom ? ` · cupom ${escapar(p.cupom)}` : ''}</dd>
            </dl>
            <table><tbody>${p.itens.map(i => `<tr><td><div class="produto-celula"><img src="${Loja.img(i.img)}" alt=""><div><strong>${escapar(i.nome)}</strong><small>${i.qtd} × ${real(i.preco)}</small></div></div></td><td style="text-align:right">${real(i.preco * i.qtd)}</td></tr>`).join('')}</tbody></table>
            <div class="linhas-resumo">
                <div><span>Subtotal</span><span>${real(p.subtotal)}</span></div>
                ${p.desconto ? `<div class="desconto"><span>Descontos</span><span>− ${real(p.desconto)}</span></div>` : ''}
                <div><span>Frete</span><span>${p.frete ? real(p.frete) : 'Grátis'}</span></div>
            </div>
            <div class="total"><span>Total</span><strong>${real(p.total)}</strong></div>
            <div class="historico-status"><strong>Histórico</strong>${(p.historico || []).map(h => `<span>${Loja.dataHora(h.quando)} · ${STATUS[h.status]}</span>`).join('')}</div>`;
        Janela.abrir('janelaPedido');
    }

    $('linhas').addEventListener('change', (e) => {
        const sel = e.target.closest('[data-status]');
        if (!sel) return;
        Loja.mudarStatus(sel.dataset.status, sel.value);
        Loja.aviso(`Pedido ${sel.dataset.status}: ${STATUS[sel.value]}.`);
    });
    $('linhas').addEventListener('click', (e) => { const b = e.target.closest('[data-ver]'); if (b) detalhe(b.dataset.ver); });
    ['buscaPedido', 'statusFiltro'].forEach(id => $(id).addEventListener('input', desenhar));
    Loja.aoMudar(() => { if (!document.querySelector('[data-status]:focus')) desenhar(); });
    desenhar();
    if (location.hash) detalhe(decodeURIComponent(location.hash.slice(1)));
})();
