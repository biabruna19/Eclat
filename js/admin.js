/* Painel administrativo: barra lateral, topo e proteção das páginas. */
(function () {
    if (!Loja.ehAdmin()) { location.replace(`${Loja.RAIZ}entrar.html?admin=1`); return; }
    const { icone, CAT, ORDEM } = Loja;
    const pagina = document.body.dataset.admin;
    const cat = new URLSearchParams(location.search).get('categoria');
    const atual = (p, c) => (p === pagina && (!c || c === cat)) ? 'aria-current="page"' : '';
    const pendentes = () => Loja.pedidos().filter(p => ['aguardando', 'aprovado', 'separacao'].includes(p.status)).length;

    document.getElementById('lateral').outerHTML = `
    <aside class="lateral" id="menuLateral" aria-label="Menu do painel">
        <a class="logo-admin" href="index.html"><img src="../imagens/logo.webp" alt="Éclat"><span>Gerenciamento</span></a>
        <nav>
            <a href="index.html" ${atual('painel')}>${icone('painel')} Painel</a>
            <a href="pedidos.html" ${atual('pedidos')}>${icone('pacote')} Pedidos <span class="contagem-menu" id="contPendentes">${pendentes() || ''}</span></a>
            <span class="grupo">Estoque</span>
            ${ORDEM.map(c => `<a href="estoque.html?categoria=${c}" ${atual('estoque', c)}>${icone('joia')} ${CAT[c].nome}</a>`).join('')}
        </nav>
        <div class="lateral-pe">
            <a href="../index.html">${icone('sacola')} Ver a loja</a>
            <button type="button" id="restaurar">${icone('relogio')} Restaurar dados de exemplo</button>
            <button type="button" id="sairAdmin">${icone('sair')} Sair</button>
        </div>
    </aside>`;
    const topo = document.getElementById('adminTopo');
    topo.innerHTML = `
        <button type="button" class="botao-icone botao-lateral" id="abrirLateral" aria-label="Abrir menu" aria-expanded="false" aria-controls="menuLateral">${icone('menu')}</button>
        <h1>${topo.dataset.titulo}</h1>
        <div class="quem"><b>${Loja.ADMIN.nome}</b><span aria-hidden="true">${Loja.ADMIN.nome[0]}</span></div>`;

    const lateral = document.getElementById('menuLateral');
    document.getElementById('abrirLateral').addEventListener('click', (e) => {
        const aberta = lateral.classList.toggle('aberta');
        e.currentTarget.setAttribute('aria-expanded', aberta);
    });
    document.addEventListener('click', (e) => {
        if (lateral.classList.contains('aberta') && !e.target.closest('#menuLateral, #abrirLateral')) {
            lateral.classList.remove('aberta');
            document.getElementById('abrirLateral').setAttribute('aria-expanded', 'false');
        }
    });
    document.getElementById('sairAdmin').addEventListener('click', () => { Loja.sair(); location.href = '../index.html'; });
    document.getElementById('restaurar').addEventListener('click', () => {
        if (!confirm('Voltar o estoque, os pedidos e as contas para os dados de exemplo? Isso apaga o que foi feito nesta demonstração.')) return;
        Loja.restaurarDemo();
        Loja.entrar(Loja.ADMIN.email, Loja.ADMIN.senha);
        location.reload();
    });
    Loja.aoMudar(() => { const el = document.getElementById('contPendentes'); if (el) el.textContent = pendentes() || ''; });

    // janelas (modais) do painel
    window.Janela = {
        abrir(id) {
            const j = document.getElementById(id);
            j.hidden = false;
            j._foco = document.activeElement;
            setTimeout(() => j.querySelector('input, select, textarea, button')?.focus(), 30);
        },
        fechar(id) {
            const j = document.getElementById(id);
            j.hidden = true;
            if (j._foco) j._foco.focus();
        },
    };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.janela:not([hidden])').forEach(j => Janela.fechar(j.id)); });
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('janela')) Janela.fechar(e.target.id);
        const f = e.target.closest('[data-fechar-janela]');
        if (f) Janela.fechar(f.closest('.janela').id);
    });
})();
