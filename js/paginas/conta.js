/* Minha conta: pedidos com acompanhamento e dados pessoais. */
(function () {
    const { icone, real, escapar } = Loja;
    const $ = (id) => document.getElementById(id);
    if (!Loja.usuarioAtual()) { location.replace('entrar.html?volta=conta.html'); return; }
    document.querySelectorAll('[data-icone]').forEach(el => { el.outerHTML = icone(el.dataset.icone); });

    let aba = location.hash === '#dados' ? 'dados' : 'pedidos';

    function perfil() {
        const u = Loja.usuarioAtual();
        $('ola').textContent = `Olá, ${u.nome.split(' ')[0]}!`;
        $('avatar').textContent = u.nome.trim()[0].toUpperCase();
        $('nomePerfil').textContent = u.nome;
        $('emailPerfil').textContent = u.email;
    }

    function linhaTempo(p) {
        if (p.status === 'cancelado') return '';
        const feito = p.status === 'aguardando' ? -1 : Loja.ETAPAS.indexOf(p.status);
        return `<ol class="linha-tempo" aria-label="Andamento">${Loja.ETAPAS.map((s, i) => `<li class="${i <= feito ? 'feito' : ''}">${Loja.STATUS[s]}</li>`).join('')}</ol>`;
    }

    function pedidos() {
        const u = Loja.usuarioAtual();
        const lista = Loja.pedidos().filter(p => p.email === u.email);
        if (!lista.length) return `<div class="vazio">${icone('pacote')}<h2>Você ainda não fez pedidos</h2><p>Quando comprar, você acompanha tudo por aqui.</p><a class="botao botao-escuro" href="colecao.html">Ver joias</a></div>`;
        return `<h2 style="font-size:1.6rem;margin-bottom:18px">Meus pedidos</h2>` + lista.map(p => `
            <article class="pedido">
                <div class="pedido-topo">
                    <div><small>Pedido</small><strong>${p.numero}</strong></div>
                    <div><small>Data</small><strong>${Loja.dataCurta(p.criado)}</strong></div>
                    <div><small>Total</small><strong>${real(p.total)}</strong></div>
                    <div><small>Pagamento</small><strong>${escapar(p.pagamento)}</strong></div>
                    <div style="margin-left:auto">${Loja.seloStatus(p.status)}</div>
                </div>
                <div class="pedido-corpo">
                    <div class="pedido-itens">${p.itens.map(i => `<a href="produto.html?id=${i.id}" title="${escapar(i.nome)} (${i.qtd})"><img src="${Loja.img(i.img)}" alt="${escapar(i.nome)}"></a>`).join('')}</div>
                    <p class="ajuda" style="margin-top:10px">${p.itens.map(i => `${i.qtd}× ${escapar(i.nome)}${Loja.opcoesTexto(i) ? ` (${escapar(Loja.opcoesTexto(i))})` : ''}`).join(' · ')}${p.endereco ? ` — entrega em ${escapar(p.endereco.cidade)}/${escapar(p.endereco.uf)}` : ''}</p>
                    ${p.presente ? `<p class="ajuda" style="display:flex;gap:8px;align-items:center">${icone('presente')} Para presente${p.presente.para ? ` · para ${escapar(p.presente.para)}` : ''}</p>` : ''}
                    ${linhaTempo(p)}
                </div>
            </article>`).join('');
    }

    function dados() {
        const u = Loja.usuarioAtual();
        const e = u.endereco || {};
        return `<form class="cartao" id="formDados" novalidate>
            <h2 style="font-size:1.6rem;margin-bottom:18px">Meus dados</h2>
            <div class="grade-form">
                <div class="campo col-3"><label for="nome">Nome</label><input id="nome" value="${escapar(u.nome)}" autocomplete="name" required></div>
                <div class="campo col-3"><label for="telefone">Celular</label><input id="telefone" value="${escapar(u.telefone || '')}" inputmode="numeric" autocomplete="tel"></div>
                <div class="campo col-6"><label for="emailFixo">E-mail</label><input id="emailFixo" value="${escapar(u.email)}" disabled></div>
            </div>
            <h3 style="font-size:1.2rem;margin:26px 0 14px">Endereço</h3>
            <div class="grade-form">
                <div class="campo col-2"><label for="cep">CEP</label><input id="cep" value="${escapar(e.cep || '')}" inputmode="numeric" maxlength="9"></div>
                <div class="campo col-4"><label for="rua">Rua</label><input id="rua" value="${escapar(e.rua || '')}"></div>
                <div class="campo col-2"><label for="numero">Número</label><input id="numero" value="${escapar(e.numero || '')}"></div>
                <div class="campo col-4"><label for="complemento">Complemento</label><input id="complemento" value="${escapar(e.complemento || '')}"></div>
                <div class="campo col-2"><label for="bairro">Bairro</label><input id="bairro" value="${escapar(e.bairro || '')}"></div>
                <div class="campo col-3"><label for="cidade">Cidade</label><input id="cidade" value="${escapar(e.cidade || '')}"></div>
                <div class="campo col-1"><label for="uf">UF</label><input id="uf" value="${escapar(e.uf || '')}" maxlength="2" style="text-transform:uppercase"></div>
            </div>
            <button type="submit" class="botao botao-escuro" style="margin-top:22px">${icone('check')} Salvar alterações</button>
        </form>`;
    }

    function desenhar() {
        perfil();
        document.querySelectorAll('[data-aba]').forEach(b => b.setAttribute('aria-selected', b.dataset.aba === aba));
        $('painel').innerHTML = aba === 'dados' ? dados() : pedidos();
        const form = $('formDados');
        if (form) {
            $('cep').addEventListener('input', (e) => { e.target.value = Loja.mascaraCep(e.target.value); });
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if ($('nome').value.trim().length < 3) { $('nome').focus(); Loja.aviso('Digite seu nome.', { icone: 'fechar' }); return; }
                const v = (id) => $(id).value.trim();
                Loja.atualizarUsuario({ nome: v('nome'), telefone: v('telefone'), endereco: { cep: v('cep'), rua: v('rua'), numero: v('numero'), complemento: v('complemento'), bairro: v('bairro'), cidade: v('cidade'), uf: v('uf').toUpperCase() } });
                Loja.aviso('Dados salvos.');
                perfil();
            });
        }
    }

    document.querySelectorAll('[data-aba]').forEach(b => b.addEventListener('click', () => { aba = b.dataset.aba; history.replaceState(null, '', '#' + aba); desenhar(); }));
    $('sair').addEventListener('click', () => { Loja.sair(); location.href = 'index.html'; });
    Loja.aoMudar((chave) => { if (chave === 'eclat_pedidos' && aba === 'pedidos') desenhar(); });
    desenhar();
})();
