/*
 * Éclat Joias: núcleo da loja (modo demonstração).
 *
 * A versão original usava PHP e MySQL, que não rodam no GitHub Pages:
 * o carrinho dependia da sessão do PHP, e o estoque e os pedidos, de um banco
 * que nem estava no repositório. Agora tudo fica salvo no navegador
 * (localStorage), então a loja funciona inteira só com HTML, CSS e JS.
 */
(function () {
    const RAIZ = document.documentElement.dataset.raiz || './';
    const CHAVES = {
        produtos: 'eclat_produtos',
        sacola: 'eclat_sacola',
        favoritos: 'eclat_favoritos',
        usuarios: 'eclat_usuarios',
        sessao: 'eclat_sessao',
        pedidos: 'eclat_pedidos',
        aviso: 'eclat_aviso_demo',
        news: 'eclat_newsletter',
    };

    const ler = (chave, padrao) => {
        try { const v = localStorage.getItem(chave); return v ? JSON.parse(v) : padrao; } catch (e) { return padrao; }
    };
    const gravar = (chave, valor) => localStorage.setItem(chave, JSON.stringify(valor));
    const ouvintes = [];
    const avisar = (o) => ouvintes.forEach(fn => fn(o));
    // outra aba mudou a sacola, os favoritos ou o estoque: atualiza esta também
    window.addEventListener('storage', (e) => { if (e.key && e.key.startsWith('eclat_')) avisar(e.key); });

    // ---------- Ícones ----------
    const ICONES = {
        sacola: '<path d="M6 7h12l1 13H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
        coracao: '<path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5c-2.2 4.6-9.2 9-9.2 9Z"/>',
        usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
        busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
        menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
        fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
        mais: '<path d="M12 5v14M5 12h14"/>',
        menos: '<path d="M5 12h14"/>',
        lixeira: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
        seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
        esquerda: '<path d="m15 6-6 6 6 6"/>',
        direita: '<path d="m9 6 6 6-6 6"/>',
        baixo: '<path d="m6 9 6 6 6-6"/>',
        check: '<path d="m5 12 5 5 9-10"/>',
        caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
        escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
        joia: '<path d="M6 3h12l3 6-9 12L3 9l3-6Z"/><path d="M3 9h18M9 3l3 18M15 3l-3 18"/>',
        presente: '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8Zm0 0s2-5 4.5-3.5S15 8 12 8Z"/>',
        cartao: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
        pix: '<path d="m12 3 4 4-4 4-4-4 4-4Zm0 10 4 4-4 4-4-4 4-4ZM3 12l4-4 4 4-4 4-4-4Zm10 0 4-4 4 4-4 4-4-4Z"/>',
        boleto: '<path d="M4 5v14M7 5v14M10 5v14M14 5v14M17 5v14M20 5v14"/>',
        pino: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
        pacote: '<path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z"/><path d="m3 7 9 4 9-4M12 11v10"/>',
        sair: '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/>',
        editar: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/>',
        estrela: '<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3Z"/>',
        relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        copiar: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
        painel: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
        instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
        facebook: '<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2V3Z"/>',
        pinterest: '<circle cx="12" cy="12" r="9"/><path d="m10 20 2.2-8.5M9.5 13.5c-.6-2.6 1-5.5 3.7-5.5 2.2 0 3.3 1.6 3.3 3.4 0 2.4-1.3 4.3-3 4.3-1 0-1.6-.8-1.4-1.7"/>',
        github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
        linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    };
    const icone = (nome, extra = '') => `<svg class="icone ${extra}" viewBox="0 0 24 24" aria-hidden="true">${ICONES[nome] || ''}</svg>`;

    // ---------- Formatação ----------
    const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const real = (v) => moeda.format(v);
    const PARCELAS_MAX = 10;
    const parcelas = (v) => {
        const n = Math.max(1, Math.min(PARCELAS_MAX, Math.floor(v / 50)));
        return n > 1 ? `ou ${n}x de ${real(v / n)} sem juros` : 'à vista';
    };
    const DESCONTO_PIX = 0.05;
    const escapar = (t) => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const dataHora = (ms) => new Date(ms).toLocaleString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const dataCurta = (ms) => new Date(ms).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

    // ---------- Produtos e estoque ----------
    const CAT = window.CATALOGO.categorias;
    function produtos() {
        const salvos = ler(CHAVES.produtos, null);
        return Array.isArray(salvos) ? salvos : window.CATALOGO.produtos;
    }
    function salvarProdutos(lista) { gravar(CHAVES.produtos, lista); avisar(CHAVES.produtos); }
    const produto = (id) => produtos().find(p => p.id === id) || null;
    const colecao = (p) => (CAT[p.categoria] && CAT[p.categoria][p.linha]) ? CAT[p.categoria][p.linha].nome : '';
    const img = (caminho) => /^(data:|https?:)/.test(caminho) ? caminho : RAIZ + caminho;

    // ---------- Sacola ----------
    const sacola = () => ler(CHAVES.sacola, []).filter(i => produto(i.id));
    function salvarSacola(itens) { gravar(CHAVES.sacola, itens); avisar(CHAVES.sacola); }
    function adicionar(id, qtd = 1) {
        const p = produto(id);
        if (!p || p.estoque <= 0) return { ok: false, motivo: 'esgotado' };
        const itens = sacola();
        const item = itens.find(i => i.id === id);
        const atual = item ? item.qtd : 0;
        const nova = Math.min(p.estoque, atual + qtd);
        if (nova === atual) return { ok: false, motivo: 'limite', max: p.estoque };
        if (item) item.qtd = nova; else itens.push({ id, qtd: nova });
        salvarSacola(itens);
        return { ok: true, qtd: nova, limitado: nova < atual + qtd };
    }
    function mudarQtd(id, qtd) {
        const p = produto(id);
        let itens = sacola();
        if (qtd <= 0) itens = itens.filter(i => i.id !== id);
        else itens.forEach(i => { if (i.id === id) i.qtd = Math.min(qtd, p ? p.estoque : qtd); });
        salvarSacola(itens);
    }
    const remover = (id) => mudarQtd(id, 0);
    const qtdSacola = () => sacola().reduce((s, i) => s + i.qtd, 0);
    const subtotal = (itens = sacola()) => itens.reduce((s, i) => s + (produto(i.id)?.preco || 0) * i.qtd, 0);

    // ---------- Cupons e frete (simulados) ----------
    const CUPONS = {
        ECLAT10: { tipo: 'porcento', valor: 10, texto: '10% de desconto' },
        BEMVINDA15: { tipo: 'porcento', valor: 15, texto: '15% na primeira compra' },
        FRETEGRATIS: { tipo: 'frete', valor: 0, texto: 'Frete grátis' },
    };
    const FRETE_GRATIS_ACIMA = 999;
    // Tabela por região, a partir do primeiro dígito do CEP
    const REGIOES = [
        { de: 0, ate: 1, nome: 'São Paulo', preco: 19.9, dias: 3 },
        { de: 2, ate: 2, nome: 'Rio de Janeiro e Espírito Santo', preco: 24.9, dias: 4 },
        { de: 3, ate: 3, nome: 'Minas Gerais', preco: 24.9, dias: 4 },
        { de: 4, ate: 5, nome: 'Nordeste', preco: 34.9, dias: 7 },
        { de: 6, ate: 6, nome: 'Norte e Nordeste', preco: 39.9, dias: 9 },
        { de: 7, ate: 7, nome: 'Centro-Oeste', preco: 29.9, dias: 5 },
        { de: 8, ate: 9, nome: 'Sul', preco: 27.9, dias: 5 },
    ];
    function frete(cep, valor) {
        const n = String(cep || '').replace(/\D/g, '');
        if (n.length !== 8) return null;
        const r = REGIOES.find(x => +n[0] >= x.de && +n[0] <= x.ate);
        const gratis = valor >= FRETE_GRATIS_ACIMA;
        return {
            regiao: r.nome,
            opcoes: [
                { id: 'normal', nome: 'Entrega padrão', preco: gratis ? 0 : r.preco, dias: r.dias },
                { id: 'expressa', nome: 'Entrega expressa', preco: +(r.preco * 1.8).toFixed(2), dias: Math.max(1, Math.ceil(r.dias / 2)) },
            ],
        };
    }
    const mascaraCep = (v) => v.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');

    // ---------- Favoritos ----------
    const favoritos = () => ler(CHAVES.favoritos, []).filter(id => produto(id));
    const ehFavorito = (id) => favoritos().includes(id);
    function alternarFavorito(id) {
        const lista = favoritos();
        const agora = !lista.includes(id);
        gravar(CHAVES.favoritos, agora ? [...lista, id] : lista.filter(x => x !== id));
        avisar(CHAVES.favoritos);
        return agora;
    }

    // ---------- Contas (demonstração) ----------
    // Senhas guardadas com um resumo simples só para não ficarem legíveis
    // no localStorage. Num site de verdade isso fica no servidor.
    const resumo = (t) => { let h = 5381; for (const c of String(t)) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return 'h' + h.toString(36); };
    const ADMIN = { email: 'admin@eclat.com', senha: 'eclat2025', nome: 'Luiza' };
    const CLIENTE_DEMO = {
        nome: 'Luiza Soares', email: 'luiza@eclat.com', senha: resumo('123456'), telefone: '(11) 98765-4321',
        endereco: { cep: '06320-010', rua: 'Estrada da Aldeinha', numero: '1016', complemento: '', bairro: 'Aldeia', cidade: 'Carapicuíba', uf: 'SP' },
        criado: Date.now() - 1000 * 60 * 60 * 24 * 40,
    };
    function usuarios() {
        let lista = ler(CHAVES.usuarios, null);
        if (!lista) { lista = [CLIENTE_DEMO]; gravar(CHAVES.usuarios, lista); }
        return lista;
    }
    const sessao = () => ler(CHAVES.sessao, null);
    const usuarioAtual = () => { const s = sessao(); return s && !s.admin ? usuarios().find(u => u.email === s.email) || null : null; };
    const ehAdmin = () => !!(sessao() && sessao().admin);
    function entrar(email, senha) {
        email = String(email).trim().toLowerCase();
        if (email === ADMIN.email && senha === ADMIN.senha) { gravar(CHAVES.sessao, { admin: true, email }); avisar(CHAVES.sessao); return { ok: true, admin: true }; }
        const u = usuarios().find(x => x.email === email);
        if (!u) return { ok: false, campo: 'email', msg: 'Não encontramos uma conta com esse e-mail.' };
        if (u.senha !== resumo(senha)) return { ok: false, campo: 'senha', msg: 'Senha incorreta.' };
        gravar(CHAVES.sessao, { email }); avisar(CHAVES.sessao);
        return { ok: true };
    }
    function cadastrar(dados) {
        const email = dados.email.trim().toLowerCase();
        if (email === ADMIN.email || usuarios().some(u => u.email === email)) return { ok: false, campo: 'email', msg: 'Já existe uma conta com esse e-mail.' };
        const u = { nome: dados.nome.trim(), email, senha: resumo(dados.senha), telefone: dados.telefone || '', endereco: null, criado: Date.now() };
        gravar(CHAVES.usuarios, [...usuarios(), u]);
        gravar(CHAVES.sessao, { email }); avisar(CHAVES.sessao);
        return { ok: true };
    }
    function atualizarUsuario(mudancas) {
        const atual = usuarioAtual();
        if (!atual) return;
        gravar(CHAVES.usuarios, usuarios().map(u => u.email === atual.email ? { ...u, ...mudancas } : u));
        avisar(CHAVES.usuarios);
    }
    function sair() { localStorage.removeItem(CHAVES.sessao); avisar(CHAVES.sessao); }

    // ---------- Pedidos ----------
    const STATUS = {
        aguardando: 'Aguardando pagamento',
        aprovado: 'Pagamento aprovado',
        separacao: 'Em separação',
        enviado: 'Enviado',
        entregue: 'Entregue',
        cancelado: 'Cancelado',
    };
    const ETAPAS = ['aprovado', 'separacao', 'enviado', 'entregue'];
    const seloStatus = (s) => `<span class="status status-${s}">${STATUS[s] || s}</span>`;
    function pedidosIniciais() {
        // Alguns pedidos de exemplo, para o painel não começar vazio
        const dia = 1000 * 60 * 60 * 24;
        const lista = window.CATALOGO.produtos;
        const pega = (i) => ({ id: lista[i].id, nome: lista[i].nome, preco: lista[i].preco, img: lista[i].img, qtd: 1 });
        const exemplo = (n, cliente, email, itens, status, diasAtras, pagamento, cidade) => {
            const sub = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
            return { numero: n, cliente, email, itens, subtotal: sub, desconto: 0, frete: sub >= FRETE_GRATIS_ACIMA ? 0 : 19.9, total: sub + (sub >= FRETE_GRATIS_ACIMA ? 0 : 19.9), pagamento, entrega: 'Entrega padrão', endereco: { cidade, uf: 'SP', rua: 'Rua das Flores', numero: '120', bairro: 'Centro', cep: '01310-100' }, status, criado: Date.now() - diasAtras * dia, historico: [{ status, quando: Date.now() - diasAtras * dia }] };
        };
        return [
            exemplo('EC10421', 'Luiza Soares', 'luiza@eclat.com', [pega(30), pega(5)], 'entregue', 21, 'Cartão em 3x', 'Carapicuíba'),
            exemplo('EC10437', 'Marina Alves', 'marina@exemplo.com', [pega(12)], 'enviado', 4, 'Pix', 'São Paulo'),
            exemplo('EC10442', 'Camila Rocha', 'camila@exemplo.com', [pega(62), { ...pega(70), qtd: 2 }], 'separacao', 2, 'Cartão em 10x', 'Campinas'),
            exemplo('EC10446', 'Juliana Costa', 'juliana@exemplo.com', [pega(95)], 'aguardando', 1, 'Boleto', 'Santos'),
            exemplo('EC10449', 'Beatriz Lima', 'beatriz.lima@exemplo.com', [pega(48)], 'aprovado', 0.2, 'Pix', 'Osasco'),
        ];
    }
    function pedidos() {
        let lista = ler(CHAVES.pedidos, null);
        if (!lista) { lista = pedidosIniciais(); gravar(CHAVES.pedidos, lista); }
        return lista;
    }
    function salvarPedidos(lista) { gravar(CHAVES.pedidos, lista); avisar(CHAVES.pedidos); }
    function criarPedido(dados) {
        const lista = pedidos();
        const ultimo = lista.reduce((m, p) => Math.max(m, +p.numero.replace(/\D/g, '') || 0), 10450);
        const pedido = { numero: 'EC' + (ultimo + 1), criado: Date.now(), historico: [{ status: dados.status, quando: Date.now() }], ...dados };
        // baixa o estoque
        salvarProdutos(produtos().map(p => {
            const item = dados.itens.find(i => i.id === p.id);
            return item ? { ...p, estoque: Math.max(0, p.estoque - item.qtd) } : p;
        }));
        salvarPedidos([pedido, ...lista]);
        return pedido;
    }
    function mudarStatus(numero, status) {
        salvarPedidos(pedidos().map(p => p.numero === numero ? { ...p, status, historico: [...(p.historico || []), { status, quando: Date.now() }] } : p));
    }
    function restaurarDemo() {
        Object.values(CHAVES).forEach(k => { if (k !== CHAVES.aviso) localStorage.removeItem(k); });
        avisar('tudo');
    }

    // ---------- Avisos rápidos ----------
    function aviso(texto, opcoes = {}) {
        let pilha = document.getElementById('avisos');
        if (!pilha) {
            pilha = document.createElement('div');
            pilha.id = 'avisos'; pilha.className = 'avisos';
            pilha.setAttribute('role', 'status'); pilha.setAttribute('aria-live', 'polite');
            document.body.appendChild(pilha);
        }
        const el = document.createElement('div');
        el.className = 'aviso';
        el.innerHTML = `${icone(opcoes.icone || 'check')}<span></span>${opcoes.acao ? `<a href="${opcoes.link || '#'}">${escapar(opcoes.acao)}</a>` : ''}`;
        el.querySelector('span').textContent = texto;
        if (opcoes.aoAcionar) el.querySelector('a').addEventListener('click', (e) => { e.preventDefault(); opcoes.aoAcionar(); fechar(); });
        pilha.appendChild(el);
        const fechar = () => { el.classList.add('saindo'); setTimeout(() => el.remove(), 260); };
        setTimeout(fechar, opcoes.duracao || 3800);
    }

    // ---------- Cartão de produto ----------
    // Segunda foto (ao passar o mouse): uma foto de modelo da categoria
    const FOTO_LOOK = { aneis: 'maos-aneis', brincos: 'retrato-brincos', colares: 'retrato-colar', braceletes: 'retrato-maos', relogios: 'aneis-linho' };
    function cartao(p) {
        const fav = ehFavorito(p.id);
        const esgotado = p.estoque <= 0;
        const etiqueta = esgotado ? '<span class="peca-etiqueta miuda esgotada">Esgotado</span>' : p.estoque <= 3 ? `<span class="peca-etiqueta miuda">Últimas ${p.estoque}</span>` : '';
        const link = `${RAIZ}produto.html?id=${encodeURIComponent(p.id)}`;
        return `
        <article class="peca produto ${esgotado ? 'esgotada' : ''}" data-id="${p.id}">
            <div class="peca-midia">
                <a class="peca-foto" href="${link}" aria-label="${escapar(p.nome)}">
                    <img class="foto-1" src="${img(p.img)}" alt="" loading="lazy" width="640" height="640">
                    <img class="foto-2" src="${RAIZ}imagens/editorial/${FOTO_LOOK[p.categoria] || 'joias-linho'}.webp" alt="" loading="lazy">
                </a>
                ${etiqueta}
                <button type="button" class="peca-fav" data-favorito="${p.id}" aria-pressed="${fav}" aria-label="${fav ? 'Tirar dos favoritos' : 'Salvar nos favoritos'}: ${escapar(p.nome)}">${icone('coracao')}</button>
                <button type="button" class="peca-add miuda" data-comprar="${p.id}" ${esgotado ? 'disabled' : ''}>${esgotado ? 'Esgotado' : `${icone('sacola')} Adicionar à sacola`}</button>
            </div>
            <div class="peca-info">
                <span class="miuda">${escapar(colecao(p))}</span>
                <h3><a href="${link}">${escapar(p.nome)}</a></h3>
                <p>${real(p.preco)}</p>
                <p class="parcelas">${parcelas(p.preco)}</p>
            </div>
        </article>`;
    }

    // Cliques nos cartões (funciona em qualquer página)
    document.addEventListener('click', (e) => {
        const fav = e.target.closest('[data-favorito]');
        if (fav) {
            e.preventDefault();
            const agora = alternarFavorito(fav.dataset.favorito);
            document.querySelectorAll(`[data-favorito="${CSS.escape(fav.dataset.favorito)}"]`).forEach(b => {
                b.setAttribute('aria-pressed', agora);
                const nome = produto(fav.dataset.favorito)?.nome || '';
                if (b.classList.contains('peca-fav')) b.setAttribute('aria-label', `${agora ? 'Tirar dos favoritos' : 'Salvar nos favoritos'}: ${nome}`);
                b.classList.remove('pulsar'); void b.offsetWidth; b.classList.add('pulsar');
            });
            aviso(agora ? 'Salvo nos favoritos' : 'Removido dos favoritos', agora ? { icone: 'coracao', acao: 'Ver favoritos', link: RAIZ + 'favoritos.html' } : { icone: 'coracao' });
            return;
        }
        const comprar = e.target.closest('[data-comprar]');
        if (comprar) {
            e.preventDefault();
            const r = adicionar(comprar.dataset.comprar, 1);
            if (r.ok) abrirSacola(comprar.dataset.comprar);
            else if (r.motivo === 'limite') aviso(`Só temos ${r.max} ${r.max === 1 ? 'unidade' : 'unidades'} desta peça.`, { icone: 'pacote' });
            else aviso('Esta peça está esgotada.', { icone: 'pacote' });
        }
    });

    // ---------- Topo e rodapé ----------
    const LINKS_REDES = {
        instagram: 'https://www.instagram.com/eclatjoias_oficial/',
        facebook: 'https://www.facebook.com/share/17oPPh1v44/',
        pinterest: 'https://pin.it/4njZyGX1p',
    };
    const ORDEM = ['colares', 'brincos', 'aneis', 'relogios', 'braceletes'];
    const urlColecao = (cat, linha) => `${RAIZ}colecao.html?categoria=${cat}${linha ? '&linha=' + linha : ''}`;

    const ANUNCIOS = [
        `Frete grátis em compras acima de ${real(FRETE_GRATIS_ACIMA)}`,
        'Embalagem de presente em todas as compras',
        'Até 10x sem juros · 5% de desconto no Pix',
        'Loja de demonstração: nenhuma compra é real',
    ];
    const capaColecao = (c, l) => produtos().find(p => p.categoria === c && p.linha === l && p.estoque > 0) || produtos().find(p => p.categoria === c && p.linha === l);

    function montarTopo() {
        const lugar = document.getElementById('topo');
        if (!lugar) return;
        const atual = new URLSearchParams(location.search).get('categoria');
        const conta = ehAdmin() ? ['admin/index.html', 'Painel administrativo', 'painel'] : usuarioAtual() ? ['conta.html', 'Minha conta', 'usuario'] : ['entrar.html', 'Entrar', 'usuario'];
        lugar.outerHTML = `
        <a class="pular" href="#conteudo">Pular para o conteúdo</a>
        <div class="anuncio"><p class="miuda" id="anuncio">${ANUNCIOS[0]}</p></div>
        <header class="cabecalho" id="cabecalho">
            <div class="envolve cabecalho-topo">
                <div class="cab-esq">
                    <button type="button" class="icone-topo botao-menu" id="abrirMenu" aria-label="Abrir menu" aria-expanded="false" aria-controls="gavetaMenu">${icone('menu')}</button>
                    <button type="button" class="icone-topo" id="abrirBusca" aria-label="Buscar" aria-expanded="false" aria-controls="painelBusca">${icone('busca')}</button>
                    <a class="atendimento miuda" href="${RAIZ}sobre.html">${icone('usuario')} Atendimento</a>
                </div>
                <a class="marca" href="${RAIZ}index.html"><img src="${RAIZ}imagens/logo.webp" alt="Éclat Joias" width="424" height="271"></a>
                <div class="cab-dir">
                    <a class="icone-topo" href="${RAIZ}${conta[0]}" aria-label="${conta[1]}">${icone(conta[2])}</a>
                    <a class="icone-topo" href="${RAIZ}favoritos.html" aria-label="Favoritos">${icone('coracao')}<span class="bolinha" data-contador="favoritos"></span></a>
                    <button type="button" class="icone-topo" id="abrirSacola" aria-label="Sacola" aria-controls="gavetaSacola">${icone('sacola')}<span class="bolinha" data-contador="sacola"></span></button>
                </div>
            </div>
            <nav class="navegacao miuda" aria-label="Categorias">
                ${ORDEM.map(c => `
                <div class="nav-item ${atual === c ? 'ativo' : ''}"><a href="${urlColecao(c)}">${CAT[c].nome}</a>
                    <div class="mega"><div class="envolve mega-grade">
                        <div class="mega-lista"><h3>${CAT[c].nome}</h3>
                            <a href="${urlColecao(c)}">Ver todos</a><a href="${urlColecao(c, 'dourado')}">Coleção ${CAT[c].dourado.nome}</a><a href="${urlColecao(c, 'prata')}">Coleção ${CAT[c].prata.nome}</a></div>
                        ${['dourado', 'prata'].map(l => { const p = capaColecao(c, l); return `
                        <a class="mega-card" href="${urlColecao(c, l)}"><div class="foto">${p ? `<img src="${img(p.img)}" alt="" loading="lazy">` : ''}</div>
                            <div><span class="miuda dourada">${l === 'dourado' ? 'Ouro 18k' : 'Prata 925'}</span><h4>${CAT[c][l].nome}</h4><p>${escapar(CAT[c][l].descricao)}</p><span class="link-sublinhado">Descobrir</span></div></a>`; }).join('')}
                    </div></div>
                </div>`).join('')}
                <div class="nav-item"><a href="${RAIZ}sobre.html">Nossa história</a></div>
            </nav>
            <div class="busca-painel" id="painelBusca" hidden>
                <form class="envolve" role="search" action="${RAIZ}colecao.html">
                    ${icone('busca')}
                    <label class="sr-only" for="buscaTopo">Buscar joias</label>
                    <input id="buscaTopo" name="busca" type="search" placeholder="O que você procura? Pérola, ouro, safira…" autocomplete="off">
                    <button type="button" class="icone-topo" id="fecharBusca" aria-label="Fechar busca">${icone('fechar')}</button>
                </form>
            </div>
        </header>
        <div class="gaveta gaveta-esquerda" id="gavetaMenu" aria-hidden="true">
            <div class="gaveta-fundo" data-fechar-gaveta></div>
            <div class="gaveta-painel" role="dialog" aria-modal="true" aria-label="Menu">
                <div class="gaveta-cabeca"><img src="${RAIZ}imagens/logo.webp" alt="Éclat Joias" style="height:38px;width:auto"><button type="button" class="botao-icone" data-fechar-gaveta aria-label="Fechar menu">${icone('fechar')}</button></div>
                <div class="gaveta-corpo menu-celular">
                    <form role="search" action="${RAIZ}colecao.html"><label class="sr-only" for="buscaCel">Buscar joias</label><input id="buscaCel" name="busca" type="search" placeholder="Buscar joias"></form>
                    ${ORDEM.map(c => `
                    <details><summary>${CAT[c].nome}${icone('baixo')}</summary>
                        <a href="${urlColecao(c)}">Ver todos</a>
                        <a href="${urlColecao(c, 'dourado')}">Coleção ${CAT[c].dourado.nome} · ouro</a>
                        <a href="${urlColecao(c, 'prata')}">Coleção ${CAT[c].prata.nome} · prata</a>
                    </details>`).join('')}
                    <a href="${RAIZ}sobre.html">Nossa história</a>
                    <a href="${RAIZ}favoritos.html">Favoritos</a>
                    <a href="${RAIZ}${conta[0]}">${usuarioAtual() || ehAdmin() ? conta[1] : 'Entrar ou criar conta'}</a>
                </div>
            </div>
        </div>
        <div class="gaveta gaveta-direita" id="gavetaSacola" aria-hidden="true">
            <div class="gaveta-fundo" data-fechar-gaveta></div>
            <div class="gaveta-painel" role="dialog" aria-modal="true" aria-labelledby="tituloSacola">
                <div class="gaveta-cabeca"><h2 id="tituloSacola">Sua sacola</h2><button type="button" class="botao-icone" data-fechar-gaveta aria-label="Fechar sacola">${icone('fechar')}</button></div>
                <div class="gaveta-corpo" id="miniSacola"></div>
                <div class="gaveta-pe" id="miniSacolaPe"></div>
            </div>
        </div>`;

        document.getElementById('abrirMenu').addEventListener('click', () => abrirGaveta('gavetaMenu', document.getElementById('abrirMenu')));
        document.getElementById('abrirSacola').addEventListener('click', () => abrirSacola());
        // busca que abre embaixo do menu
        const busca = document.getElementById('painelBusca');
        const botaoBusca = document.getElementById('abrirBusca');
        const alternarBusca = (abrir) => {
            busca.hidden = !abrir;
            botaoBusca.setAttribute('aria-expanded', abrir);
            if (abrir) document.getElementById('buscaTopo').focus(); else botaoBusca.focus();
        };
        botaoBusca.addEventListener('click', () => alternarBusca(busca.hidden));
        document.getElementById('fecharBusca').addEventListener('click', () => alternarBusca(false));
        busca.addEventListener('keydown', (e) => { if (e.key === 'Escape') alternarBusca(false); });
        // cabeçalho encolhe ao rolar
        const cab = document.getElementById('cabecalho');
        addEventListener('scroll', () => cab.classList.toggle('rolou', scrollY > 40), { passive: true });
        // anúncio que alterna
        let n = 0;
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => {
            const el = document.getElementById('anuncio');
            el.classList.add('saindo');
            setTimeout(() => { n = (n + 1) % ANUNCIOS.length; el.textContent = ANUNCIOS[n]; el.classList.remove('saindo'); }, 600);
        }, 4500);
        const termo = new URLSearchParams(location.search).get('busca');
        if (termo) document.querySelectorAll('input[name="busca"]').forEach(i => { i.value = termo; });
        atualizarContadores();
    }

    let focoAntes = null;
    function abrirGaveta(id, origem) {
        const g = document.getElementById(id);
        focoAntes = origem || document.activeElement;
        g.classList.add('aberta'); g.setAttribute('aria-hidden', 'false');
        if (origem) origem.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        setTimeout(() => g.querySelector('[data-fechar-gaveta].botao-icone, a, button')?.focus(), 50);
    }
    function fecharGavetas() {
        document.querySelectorAll('.gaveta.aberta').forEach(g => { g.classList.remove('aberta'); g.setAttribute('aria-hidden', 'true'); });
        document.querySelectorAll('[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
        document.body.style.overflow = '';
        if (focoAntes) { focoAntes.focus(); focoAntes = null; }
    }
    document.addEventListener('click', (e) => { if (e.target.closest('[data-fechar-gaveta]')) fecharGavetas(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharGavetas(); });

    function desenharMiniSacola(destaque) {
        const corpo = document.getElementById('miniSacola');
        if (!corpo) return;
        const itens = sacola();
        const pe = document.getElementById('miniSacolaPe');
        if (!itens.length) {
            corpo.innerHTML = `<div class="vazio" style="border:0;background:none;padding:60px 0">${icone('sacola')}<h2>Sua sacola está vazia</h2><p>Comece pelas novidades da coleção Riviera.</p><a class="botao botao-escuro" href="${RAIZ}colecao.html?categoria=aneis&linha=dourado">Descobrir</a></div>`;
            pe.innerHTML = '';
            return;
        }
        corpo.innerHTML = itens.map(i => {
            const p = produto(i.id);
            return `<div class="mini-item" ${i.id === destaque ? 'style="background:linear-gradient(90deg,rgba(207,162,102,.14),transparent)"' : ''}>
                <img src="${img(p.img)}" alt="">
                <div><strong>${escapar(p.nome)}</strong><small>${escapar(colecao(p))} · ${i.qtd} ${i.qtd > 1 ? 'unidades' : 'unidade'}</small></div>
                <span>${real(p.preco * i.qtd)}</span>
            </div>`;
        }).join('');
        const sub = subtotal(itens);
        const falta = FRETE_GRATIS_ACIMA - sub;
        pe.innerHTML = `
            <p class="ajuda">${falta > 0 ? `Faltam <strong>${real(falta)}</strong> para o frete grátis.` : 'Você ganhou <strong>frete grátis</strong>!'}</p>
            <div class="mini-total"><span>Subtotal</span><strong>${real(sub)}</strong></div>
            <a class="botao botao-escuro" href="${RAIZ}checkout.html">Finalizar compra</a>
            <a class="botao botao-contorno" href="${RAIZ}sacola.html">Ver sacola</a>`;
    }
    function abrirSacola(destaque) {
        desenharMiniSacola(destaque);
        abrirGaveta('gavetaSacola', document.getElementById('abrirSacola'));
    }

    function atualizarContadores(pular) {
        const valores = { sacola: qtdSacola(), favoritos: favoritos().length };
        document.querySelectorAll('[data-contador]').forEach(el => {
            const v = valores[el.dataset.contador];
            const texto = v ? String(v) : '';
            if (el.textContent !== texto && pular) { el.classList.remove('pulo'); void el.offsetWidth; el.classList.add('pulo'); }
            el.textContent = texto;
        });
        const botao = document.getElementById('abrirSacola');
        if (botao) botao.setAttribute('aria-label', `Sacola, ${valores.sacola} ${valores.sacola === 1 ? 'item' : 'itens'}`);
    }
    ouvintes.push(() => { atualizarContadores(true); desenharMiniSacola(); });

    function montarRodape() {
        const lugar = document.getElementById('rodape');
        if (!lugar) return;
        lugar.outerHTML = `
        <footer class="rodape-novo">
            <div class="envolve">
                <div class="grade">
                    <div>
                        <img src="${RAIZ}imagens/logo.webp" alt="Éclat Joias" width="424" height="271">
                        <p>Elegância, tradição e significado. Joias em ouro 18k e prata 925 inspiradas na Riviera Francesa.</p>
                        <div class="redes-novo">
                            <a href="${LINKS_REDES.instagram}" target="_blank" rel="noopener" aria-label="Instagram da Éclat">${icone('instagram')}</a>
                            <a href="${LINKS_REDES.facebook}" target="_blank" rel="noopener" aria-label="Facebook da Éclat">${icone('facebook')}</a>
                            <a href="${LINKS_REDES.pinterest}" target="_blank" rel="noopener" aria-label="Pinterest da Éclat">${icone('pinterest')}</a>
                        </div>
                    </div>
                    <div><h3>Joias</h3><ul>${ORDEM.map(c => `<li><a href="${urlColecao(c)}">${CAT[c].nome}</a></li>`).join('')}</ul></div>
                    <div><h3>A Éclat</h3><ul>
                        <li><a href="${RAIZ}sobre.html">Nossa história</a></li>
                        <li><a href="${RAIZ}favoritos.html">Favoritos</a></li>
                        <li><a href="${RAIZ}conta.html">Minha conta</a></li>
                        <li><a href="${RAIZ}entrar.html?admin=1">Acesso administrador</a></li>
                    </ul></div>
                    <div><h3>Atendimento</h3><ul>
                        <li>Segunda a sábado, 9h às 18h</li>
                        <li>contato@eclatjoias.com.br</li>
                        <li>Trocas em até 30 dias</li>
                    </ul><div class="pagamentos"><span>Pix</span><span>Visa</span><span>Master</span><span>Elo</span><span>Boleto</span></div></div>
                </div>
                <div class="rodape-base">
                    <span>© ${new Date().getFullYear()} Éclat Joias · loja fictícia, projeto de portfólio</span>
                    <span>Desenvolvido por <strong>Beatriz Oliveira</strong> ·
                        <a href="https://github.com/biabruna19" target="_blank" rel="noopener">GitHub</a> ·
                        <a href="https://www.linkedin.com/in/beatriz-oliveira-759867294/" target="_blank" rel="noopener">LinkedIn</a></span>
                </div>
            </div>
        </footer>`;
    }

    function revelar() {
        const itens = document.querySelectorAll('.revelar');
        if (!('IntersectionObserver' in window)) { itens.forEach(el => el.classList.add('visivel')); return; }
        const obs = new IntersectionObserver((ents) => ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visivel'); obs.unobserve(en.target); } }), { rootMargin: '0px 0px -40px 0px' });
        itens.forEach(el => obs.observe(el));
    }

    window.Loja = {
        RAIZ, CAT, ORDEM, CUPONS, STATUS, ETAPAS, FRETE_GRATIS_ACIMA, DESCONTO_PIX, ADMIN, CLIENTE_DEMO,
        icone, real, parcelas, escapar, dataHora, dataCurta, img, urlColecao, seloStatus, mascaraCep,
        produtos, produto, salvarProdutos, colecao,
        sacola, adicionar, mudarQtd, remover, qtdSacola, subtotal, salvarSacola, frete,
        favoritos, ehFavorito, alternarFavorito,
        usuarios, usuarioAtual, sessao, ehAdmin, entrar, cadastrar, atualizarUsuario, sair,
        pedidos, salvarPedidos, criarPedido, mudarStatus, restaurarDemo,
        aviso, cartao, abrirSacola, FOTO_LOOK, aoMudar: (fn) => ouvintes.push(fn),
    };

    document.addEventListener('DOMContentLoaded', () => {
        montarTopo();
        montarRodape();
        revelar();
    });
})();
