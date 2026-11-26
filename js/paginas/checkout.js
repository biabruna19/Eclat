/*
 * Checkout (simulado): endereço com preenchimento pelo CEP (ViaCEP),
 * entrega, pagamento e confirmação. O pedido vai para "Minha conta" e
 * para o painel administrativo, e o estoque é atualizado.
 */
(function () {
    const { icone, real, escapar } = Loja;
    const $ = (id) => document.getElementById(id);
    const area = $('area');

    function semLogin() {
        area.innerHTML = `<div class="vazio" style="margin:50px 0 90px">${icone('usuario')}
            <h2>Entre para finalizar a compra</h2>
            <p>Assim você acompanha o pedido em “Minha conta”.</p>
            <a class="botao botao-escuro" href="entrar.html?volta=checkout.html">Entrar ou criar conta</a>
        </div>`;
    }
    function sacolaVazia() {
        area.innerHTML = `<div class="vazio" style="margin:50px 0 90px">${icone('sacola')}<h2>Sua sacola está vazia</h2><p>Escolha uma joia para continuar.</p><a class="botao botao-escuro" href="colecao.html">Ver joias</a></div>`;
    }

    function formulario() {
        const u = Loja.usuarioAtual();
        const e = u.endereco || {};
        const cepSalvo = e.cep || localStorage.getItem('eclat_cep') || '';
        area.innerHTML = `
        <h1 class="titulo-pagina">Finalizar compra</h1>
        <ol class="etapas" aria-label="Etapas"><li class="feita">Sacola</li><li class="atual" aria-current="step">Entrega e pagamento</li><li>Confirmação</li></ol>
        <form class="pagina-sacola" id="formCheckout" novalidate style="padding-top:0">
            <div>
                <section class="cartao bloco-checkout">
                    <h2>${icone('pino')} Endereço de entrega</h2>
                    <div class="grade-form">
                        <div class="campo col-2"><label for="cep">CEP</label><input id="cep" inputmode="numeric" autocomplete="postal-code" maxlength="9" value="${escapar(cepSalvo)}" required><span class="ajuda" id="ajudaCep">Preenchemos o endereço para você.</span></div>
                        <div class="campo col-4"><label for="rua">Rua</label><input id="rua" autocomplete="address-line1" value="${escapar(e.rua || '')}" required><span class="erro" id="erro-rua"></span></div>
                        <div class="campo col-2"><label for="numero">Número</label><input id="numero" value="${escapar(e.numero || '')}" required><span class="erro" id="erro-numero"></span></div>
                        <div class="campo col-4"><label for="complemento">Complemento <span class="ajuda">(opcional)</span></label><input id="complemento" value="${escapar(e.complemento || '')}"></div>
                        <div class="campo col-2"><label for="bairro">Bairro</label><input id="bairro" value="${escapar(e.bairro || '')}" required><span class="erro" id="erro-bairro"></span></div>
                        <div class="campo col-3"><label for="cidade">Cidade</label><input id="cidade" autocomplete="address-level2" value="${escapar(e.cidade || '')}" required><span class="erro" id="erro-cidade"></span></div>
                        <div class="campo col-1"><label for="uf">UF</label><input id="uf" maxlength="2" autocomplete="address-level1" value="${escapar(e.uf || '')}" required style="text-transform:uppercase"><span class="erro" id="erro-uf"></span></div>
                    </div>
                    <label class="marcar" style="margin-top:14px"><input type="checkbox" id="salvarEndereco" checked> Salvar este endereço na minha conta</label>
                </section>

                <section class="cartao bloco-checkout">
                    <h2>${icone('caminhao')} Entrega</h2>
                    <div class="opcoes" id="opcoesEntrega"><p class="ajuda">Informe o CEP para ver as opções.</p></div>
                </section>

                <section class="cartao bloco-checkout">
                    <h2>${icone('cartao')} Pagamento</h2>
                    <div class="opcoes" role="radiogroup" aria-label="Forma de pagamento">
                        <label class="opcao"><input type="radio" name="pagamento" value="pix" checked>${icone('pix')}<div><strong>Pix</strong><small>5% de desconto · aprovação na hora</small></div></label>
                        <label class="opcao"><input type="radio" name="pagamento" value="cartao">${icone('cartao')}<div><strong>Cartão de crédito</strong><small>Até 10x sem juros</small></div></label>
                        <label class="opcao"><input type="radio" name="pagamento" value="boleto">${icone('boleto')}<div><strong>Boleto</strong><small>Vence em 3 dias úteis</small></div></label>
                    </div>
                    <div id="dadosCartao" class="grade-form" style="margin-top:18px" hidden>
                        <div class="campo col-6"><label for="numCartao">Número do cartão</label><input id="numCartao" inputmode="numeric" autocomplete="cc-number" placeholder="0000 0000 0000 0000" maxlength="19"><span class="erro" id="erro-numCartao"></span></div>
                        <div class="campo col-4"><label for="nomeCartao">Nome impresso no cartão</label><input id="nomeCartao" autocomplete="cc-name"><span class="erro" id="erro-nomeCartao"></span></div>
                        <div class="campo col-2"><label for="validade">Validade</label><input id="validade" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/AA" maxlength="5"><span class="erro" id="erro-validade"></span></div>
                        <div class="campo col-2"><label for="cvv">CVV</label><input id="cvv" inputmode="numeric" autocomplete="cc-csc" maxlength="4"><span class="erro" id="erro-cvv"></span></div>
                        <div class="campo col-4"><label for="parcelas">Parcelas</label><select id="parcelas"></select></div>
                        <p class="ajuda col-6">Demonstração: use qualquer número de teste, como 4111 1111 1111 1111. Nada é cobrado.</p>
                    </div>
                </section>
            </div>
            <aside class="cartao resumo" id="resumo" aria-label="Resumo do pedido"></aside>
        </form>`;

        const cep = $('cep');
        cep.addEventListener('input', () => {
            cep.value = Loja.mascaraCep(cep.value);
            if (cep.value.length === 9) { buscarCep(cep.value); desenharEntrega(); }
        });
        document.querySelectorAll('input[name="pagamento"]').forEach(r => r.addEventListener('change', () => {
            $('dadosCartao').hidden = pagamento() !== 'cartao';
            desenharResumo();
        }));
        $('numCartao').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 '); });
        $('validade').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2'); });
        $('cvv').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });
        $('formCheckout').addEventListener('submit', finalizar);
        desenharEntrega();
        desenharResumo();
    }

    const pagamento = () => document.querySelector('input[name="pagamento"]:checked')?.value || 'pix';
    const entrega = () => document.querySelector('input[name="entrega"]:checked')?.value || 'normal';

    async function buscarCep(valor) {
        const ajuda = $('ajudaCep');
        ajuda.textContent = 'Buscando endereço…';
        try {
            const r = await fetch(`https://viacep.com.br/ws/${valor.replace(/\D/g, '')}/json/`);
            const d = await r.json();
            if (d.erro) { ajuda.textContent = 'CEP não encontrado. Preencha o endereço abaixo.'; return; }
            $('rua').value = d.logradouro || $('rua').value;
            $('bairro').value = d.bairro || $('bairro').value;
            $('cidade').value = d.localidade || $('cidade').value;
            $('uf').value = d.uf || $('uf').value;
            ajuda.textContent = 'Endereço encontrado. Confira o número.';
            if (!$('numero').value) $('numero').focus();
        } catch (e) {
            ajuda.textContent = 'Não deu para buscar o CEP agora. Preencha o endereço abaixo.';
        }
    }

    function calculo() {
        const itens = Loja.sacola();
        const sub = Loja.subtotal(itens);
        const codigo = localStorage.getItem('eclat_cupom');
        const cupom = Loja.CUPONS[codigo];
        const desconto = cupom && cupom.tipo === 'porcento' ? sub * cupom.valor / 100 : 0;
        const f = Loja.frete($('cep')?.value, sub);
        const opcao = f ? f.opcoes.find(o => o.id === entrega()) || f.opcoes[0] : null;
        let frete = opcao ? opcao.preco : 0;
        if (cupom && cupom.tipo === 'frete' && opcao && opcao.id === 'normal') frete = 0;
        const descontoPix = pagamento() === 'pix' ? (sub - desconto) * Loja.DESCONTO_PIX : 0;
        return { itens, sub, codigo: cupom ? codigo : null, desconto, descontoPix, frete, opcao, total: sub - desconto - descontoPix + frete };
    }

    function desenharEntrega() {
        const f = Loja.frete($('cep').value, Loja.subtotal());
        const escolhida = entrega();
        $('opcoesEntrega').innerHTML = f ? f.opcoes.map(o => `
            <label class="opcao"><input type="radio" name="entrega" value="${o.id}" ${o.id === escolhida ? 'checked' : ''}>
                <div><strong>${o.nome}</strong><small>Até ${o.dias} ${o.dias === 1 ? 'dia útil' : 'dias úteis'} · ${f.regiao}</small></div>
                <strong>${o.preco ? real(o.preco) : 'Grátis'}</strong></label>`).join('')
            : '<p class="ajuda">Informe o CEP para ver as opções.</p>';
        document.querySelectorAll('input[name="entrega"]').forEach(r => r.addEventListener('change', desenharResumo));
        desenharResumo();
    }

    function desenharResumo() {
        const t = calculo();
        const sel = $('parcelas');
        if (sel) {
            const max = Math.max(1, Math.min(10, Math.floor(t.total / 50)));
            const antes = sel.value;
            sel.innerHTML = Array.from({ length: max }, (_, i) => `<option value="${i + 1}">${i + 1}x de ${real(t.total / (i + 1))} sem juros</option>`).join('');
            if (antes && +antes <= max) sel.value = antes;
        }
        $('resumo').innerHTML = `
            <h2>Seu pedido</h2>
            ${t.itens.map(i => { const p = Loja.produto(i.id); return `<div class="mini-item"><img src="${Loja.img(p.img)}" alt=""><div><strong>${escapar(p.nome)}</strong><small>${i.qtd} × ${real(p.preco)}</small></div><span>${real(p.preco * i.qtd)}</span></div>`; }).join('')}
            <div class="linhas-resumo">
                <div><span>Subtotal</span><span>${real(t.sub)}</span></div>
                ${t.desconto ? `<div class="desconto"><span>Cupom ${t.codigo}</span><span>− ${real(t.desconto)}</span></div>` : ''}
                ${t.descontoPix ? `<div class="desconto"><span>Desconto Pix (5%)</span><span>− ${real(t.descontoPix)}</span></div>` : ''}
                <div><span>Frete</span><span>${t.opcao ? (t.frete ? real(t.frete) : 'Grátis') : '—'}</span></div>
            </div>
            <div class="total"><span>Total</span><strong>${real(t.total)}</strong></div>
            <button type="submit" class="botao botao-escuro botao-bloco" style="margin-top:20px">${icone('escudo')} Confirmar pedido</button>
            <p class="dica" style="text-align:center">Loja de demonstração: nenhuma cobrança é feita.</p>`;
    }

    function erro(id, msg) {
        const el = $(id);
        el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        const span = $('erro-' + id);
        if (span) span.textContent = msg || '';
        return !msg;
    }
    function validar() {
        let ok = true;
        const v = (id) => $(id).value.trim();
        ok = erro('cep', v('cep').replace(/\D/g, '').length === 8 ? '' : 'CEP inválido') && ok;
        ['rua', 'numero', 'bairro', 'cidade'].forEach(c => { ok = erro(c, v(c) ? '' : 'Obrigatório') && ok; });
        ok = erro('uf', /^[A-Za-z]{2}$/.test(v('uf')) ? '' : 'Use 2 letras') && ok;
        if (pagamento() === 'cartao') {
            const num = v('numCartao').replace(/\D/g, '');
            ok = erro('numCartao', num.length >= 13 && luhn(num) ? '' : 'Número de cartão inválido') && ok;
            ok = erro('nomeCartao', v('nomeCartao').length >= 3 ? '' : 'Digite o nome como está no cartão') && ok;
            const [m, a] = v('validade').split('/').map(Number);
            const agora = new Date(); const fim = new Date(2000 + (a || 0), m || 0, 0);
            ok = erro('validade', m >= 1 && m <= 12 && fim >= agora ? '' : 'Validade inválida') && ok;
            ok = erro('cvv', /^\d{3,4}$/.test(v('cvv')) ? '' : 'CVV inválido') && ok;
        }
        if (!ok) document.querySelector('[aria-invalid="true"]')?.focus();
        return ok;
    }
    // verificação do número do cartão (algoritmo de Luhn)
    function luhn(n) {
        let s = 0;
        [...n].reverse().forEach((d, i) => { let x = +d; if (i % 2) { x *= 2; if (x > 9) x -= 9; } s += x; });
        return s % 10 === 0;
    }

    function finalizar(e) {
        e.preventDefault();
        if (!validar()) return;
        const t = calculo();
        // confere o estoque de novo (outra aba pode ter comprado)
        const falta = t.itens.find(i => (Loja.produto(i.id)?.estoque || 0) < i.qtd);
        if (falta) { Loja.aviso(`${Loja.produto(falta.id).nome}: não há unidades suficientes. Ajuste a sacola.`, { icone: 'pacote', duracao: 6000 }); return; }
        const u = Loja.usuarioAtual();
        const endereco = { cep: $('cep').value, rua: $('rua').value.trim(), numero: $('numero').value.trim(), complemento: $('complemento').value.trim(), bairro: $('bairro').value.trim(), cidade: $('cidade').value.trim(), uf: $('uf').value.trim().toUpperCase() };
        if ($('salvarEndereco').checked) Loja.atualizarUsuario({ endereco });
        const forma = pagamento();
        const pedido = Loja.criarPedido({
            cliente: u.nome, email: u.email,
            itens: t.itens.map(i => { const p = Loja.produto(i.id); return { id: p.id, nome: p.nome, preco: p.preco, img: p.img, qtd: i.qtd }; }),
            subtotal: t.sub, desconto: t.desconto + t.descontoPix, cupom: t.codigo, frete: t.frete, total: t.total,
            pagamento: forma === 'pix' ? 'Pix' : forma === 'boleto' ? 'Boleto' : `Cartão em ${$('parcelas').value}x`,
            entrega: t.opcao.nome, prazo: t.opcao.dias, endereco,
            status: forma === 'cartao' ? 'aprovado' : 'aguardando',
        });
        Loja.salvarSacola([]);
        localStorage.removeItem('eclat_cupom');
        confirmacao(pedido, forma);
    }

    function confirmacao(p, forma) {
        const codigoPix = `00020126580014BR.GOV.BCB.PIX0136eclat-demo-${p.numero.toLowerCase()}5204000053039865406${p.total.toFixed(2)}5802BR5912ECLAT JOIAS6009SAO PAULO`;
        area.innerHTML = `
        <ol class="etapas" aria-label="Etapas" style="justify-content:center"><li class="feita">Sacola</li><li class="feita">Entrega e pagamento</li><li class="atual" aria-current="step">Confirmação</li></ol>
        <div class="confirmacao">
            <div class="selo-ok">${icone('check')}</div>
            <h1>Pedido confirmado!</h1>
            <p style="margin-top:10px">Obrigada, ${escapar(p.cliente.split(' ')[0])}. Seu pedido <strong>${p.numero}</strong> de <strong>${real(p.total)}</strong> foi registrado.</p>
            ${forma === 'pix' ? `
                <div class="cartao" style="margin-top:24px;text-align:left">
                    <strong>Pague com Pix (demonstração)</strong>
                    <p class="ajuda">Copie o código abaixo. Como é uma loja fictícia, você pode marcar o pagamento como feito no painel administrativo.</p>
                    <div class="codigo-pix"><input class="entrada" id="codigoPix" value="${codigoPix}" readonly aria-label="Código Pix"><button type="button" class="botao botao-contorno botao-pequeno" id="copiarPix">${icone('copiar')} Copiar</button></div>
                </div>` : forma === 'boleto' ? '<p class="ajuda" style="margin-top:14px">O boleto (fictício) vence em 3 dias úteis.</p>' : '<p class="ajuda" style="margin-top:14px">Pagamento aprovado. Agora é só aguardar o envio.</p>'}
            <p style="margin-top:18px">Entrega em até <strong>${p.prazo} dias úteis</strong> em ${escapar(p.endereco.cidade)}/${escapar(p.endereco.uf)}.</p>
            <div class="hero-acoes" style="justify-content:center;margin-top:26px">
                <a class="botao botao-escuro" href="conta.html#pedidos">Acompanhar pedido</a>
                <a class="botao botao-contorno" href="colecao.html">Continuar comprando</a>
            </div>
        </div>`;
        $('copiarPix')?.addEventListener('click', async () => {
            try { await navigator.clipboard.writeText(codigoPix); } catch (e) { $('codigoPix').select(); document.execCommand('copy'); }
            Loja.aviso('Código Pix copiado!');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (!Loja.usuarioAtual()) semLogin();
    else if (!Loja.sacola().length) sacolaVazia();
    else formulario();
})();
