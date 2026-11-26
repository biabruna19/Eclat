/* Sacola: quantidades, cupom e frete. */
(function () {
    const { icone, real, escapar } = Loja;
    const $ = (id) => document.getElementById(id);
    const cupomAtual = () => localStorage.getItem('eclat_cupom');
    let focar = null; // devolve o foco ao botão depois de redesenhar

    function totais() {
        const itens = Loja.sacola();
        const sub = Loja.subtotal(itens);
        const cupom = Loja.CUPONS[cupomAtual()];
        const desconto = cupom && cupom.tipo === 'porcento' ? sub * cupom.valor / 100 : 0;
        const f = Loja.frete(localStorage.getItem('eclat_cep'), sub);
        let frete = f ? f.opcoes[0].preco : null;
        if (cupom && cupom.tipo === 'frete' && frete !== null) frete = 0;
        return { itens, sub, desconto, frete, f, total: sub - desconto + (frete || 0) };
    }

    function desenhar() {
        const t = totais();
        const qtd = t.itens.reduce((s, i) => s + i.qtd, 0);
        $('resumoQtd').textContent = qtd ? `${qtd} ${qtd === 1 ? 'item' : 'itens'}` : '';
        if (!t.itens.length) {
            $('area').innerHTML = `<div class="vazio" style="margin:20px 0 90px">${icone('sacola')}<h2>Sua sacola está vazia</h2><p>Explore as coleções e encontre a joia perfeita.</p><a class="botao botao-escuro" href="colecao.html">Ver joias</a></div>`;
            return;
        }
        const cupom = Loja.CUPONS[cupomAtual()];
        $('area').innerHTML = `
        <div class="pagina-sacola">
            <section aria-label="Itens da sacola">
                ${t.itens.map(i => {
                    const p = Loja.produto(i.id);
                    return `<div class="item-sacola">
                        <a href="produto.html?id=${p.id}"><img src="${Loja.img(p.img)}" alt="${escapar(p.nome)}"></a>
                        <div>
                            <span class="produto-colecao">${escapar(Loja.colecao(p))}</span>
                            <h3><a href="produto.html?id=${p.id}">${escapar(p.nome)}</a></h3>
                            <p class="parcelas">${real(p.preco)} cada${p.estoque <= 3 ? ` · só ${p.estoque} em estoque` : ''}</p>
                            <div class="acoes-item">
                                <div class="quantidade" role="group" aria-label="Quantidade de ${escapar(p.nome)}">
                                    <button type="button" data-menos="${p.id}" aria-label="Diminuir">${icone('menos')}</button>
                                    <output>${i.qtd}</output>
                                    <button type="button" data-mais="${p.id}" aria-label="Aumentar" ${i.qtd >= p.estoque ? 'disabled' : ''}>${icone('mais')}</button>
                                </div>
                                <button type="button" class="botao-remover" data-remover="${p.id}">${icone('lixeira')} Remover</button>
                                <button type="button" class="botao-remover" data-mover="${p.id}">${icone('coracao')} Mover para favoritos</button>
                            </div>
                        </div>
                        <div class="item-preco">${real(p.preco * i.qtd)}${i.qtd > 1 ? `<small>${i.qtd} × ${real(p.preco)}</small>` : ''}</div>
                    </div>`;
                }).join('')}
                <a class="link" href="colecao.html" style="display:inline-block;margin-top:18px">Continuar comprando</a>
            </section>
            <aside class="cartao resumo" aria-label="Resumo do pedido">
                <h2>Resumo</h2>
                <form id="formCupom" novalidate>
                    <label class="rotulo" for="cupom">Cupom de desconto</label>
                    <div class="linha-form"><input class="entrada" id="cupom" placeholder="Digite o código" autocomplete="off"><button class="botao botao-contorno botao-pequeno" type="submit">Aplicar</button></div>
                    ${cupom ? `<div class="cupom-ativo"><span>${icone('check')} ${cupomAtual()}: ${cupom.texto}</span><button type="button" id="tirarCupom" aria-label="Remover cupom">${icone('fechar')}</button></div>` : '<p class="dica">Na demonstração, experimente ECLAT10 ou FRETEGRATIS.</p>'}
                </form>
                <form id="formCep" novalidate style="margin-top:16px">
                    <label class="rotulo" for="cep">Calcular frete</label>
                    <div class="linha-form"><input class="entrada" id="cep" inputmode="numeric" placeholder="00000-000" maxlength="9" value="${localStorage.getItem('eclat_cep') || ''}"><button class="botao botao-contorno botao-pequeno" type="submit">Calcular</button></div>
                    ${t.f ? `<p class="dica">Entrega padrão para ${t.f.regiao}: até ${t.f.opcoes[0].dias} dias úteis.</p>` : ''}
                </form>
                <div class="linhas-resumo">
                    <div><span>Subtotal</span><span>${real(t.sub)}</span></div>
                    ${t.desconto ? `<div class="desconto"><span>Desconto</span><span>− ${real(t.desconto)}</span></div>` : ''}
                    <div><span>Frete</span><span>${t.frete === null ? 'Informe o CEP' : t.frete === 0 ? 'Grátis' : real(t.frete)}</span></div>
                </div>
                <div class="total"><span>Total</span><strong>${real(t.total)}</strong></div>
                <p class="parcelas">${Loja.parcelas(t.total)} · ${real(t.total * (1 - Loja.DESCONTO_PIX))} no Pix</p>
                <a class="botao botao-escuro botao-bloco" href="checkout.html">Finalizar compra</a>
                <p class="dica" style="text-align:center">${t.sub < Loja.FRETE_GRATIS_ACIMA ? `Faltam ${real(Loja.FRETE_GRATIS_ACIMA - t.sub)} para o frete grátis.` : 'Você ganhou frete grátis!'}</p>
            </aside>
        </div>`;

        const cep = $('cep');
        cep.addEventListener('input', () => { cep.value = Loja.mascaraCep(cep.value); });
        $('formCep').addEventListener('submit', (e) => {
            e.preventDefault();
            if (cep.value.replace(/\D/g, '').length !== 8) { Loja.aviso('Digite um CEP com 8 números.', { icone: 'pino' }); cep.focus(); return; }
            localStorage.setItem('eclat_cep', cep.value); desenhar();
        });
        $('formCupom').addEventListener('submit', (e) => {
            e.preventDefault();
            const codigo = $('cupom').value.trim().toUpperCase();
            if (!Loja.CUPONS[codigo]) { Loja.aviso('Cupom inválido ou expirado.', { icone: 'fechar' }); $('cupom').focus(); return; }
            localStorage.setItem('eclat_cupom', codigo);
            Loja.aviso(`Cupom ${codigo} aplicado!`, { icone: 'presente' });
            desenhar();
        });
        $('tirarCupom')?.addEventListener('click', () => { localStorage.removeItem('eclat_cupom'); desenhar(); });
        if (focar) { const el = document.querySelector(focar); if (el && !el.disabled) el.focus(); focar = null; }
    }

    $('area').addEventListener('click', (e) => {
        const alvo = e.target.closest('[data-menos],[data-mais],[data-remover],[data-mover]');
        if (!alvo) return;
        const { menos, mais, remover, mover } = alvo.dataset;
        const item = (id) => Loja.sacola().find(i => i.id === id);
        if (menos || mais) focar = menos ? `[data-menos="${menos}"]` : `[data-mais="${mais}"]`;
        if (menos) Loja.mudarQtd(menos, item(menos).qtd - 1);
        if (mais) Loja.mudarQtd(mais, item(mais).qtd + 1);
        if (remover) {
            const antes = item(remover);
            Loja.remover(remover);
            Loja.aviso('Joia removida da sacola.', { icone: 'lixeira', acao: 'Desfazer', aoAcionar: () => Loja.adicionar(remover, antes.qtd) });
        }
        if (mover) {
            if (!Loja.ehFavorito(mover)) Loja.alternarFavorito(mover);
            Loja.remover(mover);
            Loja.aviso('Movida para os favoritos.', { icone: 'coracao', acao: 'Ver', link: 'favoritos.html' });
        }
    });
    Loja.aoMudar(desenhar);
    desenhar();
})();
