/* Página de produto: produto.html?id=aneis-dourado-bonne */
(function () {
    const { CAT, icone, real, escapar } = Loja;
    const id = new URLSearchParams(location.search).get('id');
    const $ = (s) => document.getElementById(s);
    let qtd = 1;
    // escolhas da pessoa (sobrevivem quando a página é redesenhada)
    let tamanho = null;
    const gravacao = { ativa: false, texto: '', fonte: 'classica' };
    const LIMITE_GRAVACAO = 12;

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
            <div class="galeria">
                <div class="foto-produto" id="foto"><img src="${Loja.img(p.img)}" alt="${escapar(c.singular + ' ' + p.nome)}" width="640" height="640"></div>
                <div class="miniaturas" role="group" aria-label="Fotos">
                    <button type="button" data-foto="peca" aria-pressed="true" aria-label="Foto da peça"><img src="${Loja.img(p.img)}" alt=""></button>
                    <button type="button" data-foto="look" aria-pressed="false" aria-label="Foto com modelo"><img src="imagens/editorial/${Loja.FOTO_LOOK[p.categoria]}.webp" alt=""></button>
                </div>
            </div>
            <div class="detalhe">
                <span class="sobretitulo">${c.singular} · Coleção ${escapar(col.nome)}</span>
                <h1>${escapar(p.nome)}</h1>
                <p class="descricao">${escapar(p.descricao)}.</p>
                <div id="precos"></div>
                <p class="disponibilidade ${disp[0]}">${disp[1]}</p>
                ${Loja.precisaTamanho(p) ? `
                <div class="escolha" id="tamanho">
                    <div class="escolha-topo"><span class="rotulo" id="rotuloAro">Tamanho (aro)</span><button type="button" class="link" id="abrirGuia">Descobrir meu tamanho</button></div>
                    <div class="aros" role="radiogroup" aria-labelledby="rotuloAro">
                        ${Array.from({ length: Loja.ARO.max - Loja.ARO.min + 1 }, (_, i) => Loja.ARO.min + i).map(a => `<button type="button" role="radio" data-aro="${a}" aria-checked="${a === tamanho}">${a}</button>`).join('')}
                    </div>
                    <p class="erro" id="erroAro"></p>
                </div>` : ''}
                ${Loja.aceitaGravacao(p) ? `
                <div class="escolha gravacao">
                    <label class="marcar"><input type="checkbox" id="querGravar" ${gravacao.ativa ? 'checked' : ''}> Adicionar gravação personalizada <span class="dourada">+ ${real(Loja.PRECO_GRAVACAO)}</span></label>
                    <div id="blocoGravacao" ${gravacao.ativa ? '' : 'hidden'}>
                        <div class="previa-gravacao fonte-${gravacao.fonte}" aria-hidden="true"><span id="textoPrevia">${escapar(gravacao.texto) || 'Seu texto'}</span></div>
                        <div class="campo">
                            <label for="textoGravacao">Texto (até ${LIMITE_GRAVACAO} caracteres)</label>
                            <input id="textoGravacao" maxlength="${LIMITE_GRAVACAO}" value="${escapar(gravacao.texto)}" placeholder="Ex.: B & L, 12.06.25" autocomplete="off">
                            <span class="ajuda"><span id="contaGravacao">${gravacao.texto.length}</span>/${LIMITE_GRAVACAO} · letras, números, & e pontos</span>
                            <span class="erro" id="erroGravacao"></span>
                        </div>
                        <div class="fontes" role="radiogroup" aria-label="Estilo da letra">
                            <button type="button" role="radio" data-fonte="classica" aria-checked="${gravacao.fonte === 'classica'}"><span class="fonte-classica">Aa</span> Clássica</button>
                            <button type="button" role="radio" data-fonte="cursiva" aria-checked="${gravacao.fonte === 'cursiva'}"><span class="fonte-cursiva">Aa</span> Cursiva</button>
                        </div>
                        <p class="ajuda">A gravação leva até 3 dias úteis a mais. Peças gravadas não podem ser trocadas.</p>
                    </div>
                </div>` : ''}
                <div class="comprar">
                    <div class="quantidade" role="group" aria-label="Quantidade">
                        <button type="button" id="menos" aria-label="Diminuir quantidade" ${qtd <= 1 || p.estoque <= 0 ? 'disabled' : ''}>${icone('menos')}</button>
                        <output id="qtd" aria-live="polite">${qtd}</output>
                        <button type="button" id="mais" aria-label="Aumentar quantidade" ${qtd >= p.estoque ? 'disabled' : ''}>${icone('mais')}</button>
                    </div>
                    <button type="button" class="botao botao-escuro" id="adicionar" ${p.estoque <= 0 ? 'disabled' : ''}>${icone('sacola')} ${p.estoque <= 0 ? 'Esgotado' : 'Adicionar à sacola'}</button>
                    <button type="button" class="coracao-grande" data-favorito="${p.id}" aria-pressed="${fav}" aria-label="Salvar nos favoritos">${icone('coracao')}</button>
                </div>
                <div class="garantias">
                    <div>${icone('escudo')}Certificado de autenticidade</div>
                    <div>${icone('presente')}Embalagem de presente</div>
                    <div>${icone('caminhao')}Troca em 30 dias</div>
                </div>
                <form class="calc-frete" id="formFrete" novalidate>
                    <label for="cep">${icone('caminhao')} Calcular frete e prazo</label>
                    <div class="linha-form">
                        <input class="entrada" id="cep" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" maxlength="9">
                        <button type="submit" class="botao botao-contorno">Calcular</button>
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
                    ${Loja.precisaTamanho(p) ? `<details><summary>Guia de tamanhos ${icone('mais')}</summary><p>Os anéis vão do aro 12 ao 24. Meça o diâmetro interno de um anel que sirva em você e veja o aro correspondente. <button type="button" class="link" data-abrir-guia>Abrir o guia</button></p></details>` : ''}
                    <details><summary>Garantia, trocas e embalagem ${icone('mais')}</summary><p>Todas as peças vão em embalagem de presente, com certificado de autenticidade e garantia de 1 ano contra defeitos de fabricação. Você pode trocar em até 30 dias.</p></details>
                </div>
            </div>
        </div>
        ${Loja.precisaTamanho(p) ? `
        <dialog class="janela-guia" id="guia" aria-labelledby="tituloGuia">
            <div class="janela-guia-topo"><h2 id="tituloGuia">Descubra seu tamanho</h2><button type="button" class="botao-icone" id="fecharGuia" aria-label="Fechar">${icone('fechar')}</button></div>
            ${Loja.guiaTamanhosHtml()}
        </dialog>` : ''}`;

        desenharPrecos(p);
        $('menos').addEventListener('click', () => { qtd--; desenhar(); });
        $('mais').addEventListener('click', () => { qtd++; desenhar(); });
        $('adicionar').addEventListener('click', () => {
            if (Loja.precisaTamanho(p) && !tamanho) {
                $('erroAro').textContent = 'Escolha o tamanho do anel.';
                $('tamanho').scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.querySelector('[data-aro]').focus();
                return;
            }
            if (gravacao.ativa && !textoValido()) return;
            const opcoes = { tamanho, gravacao: gravacao.ativa ? { texto: gravacao.texto.trim(), fonte: gravacao.fonte } : null };
            const r = Loja.adicionar(p.id, qtd, opcoes);
            if (r.ok) { Loja.abrirSacola(r.chave); if (r.limitado) Loja.aviso(`Adicionamos o máximo disponível (${r.qtd}).`, { icone: 'pacote' }); }
            else if (r.motivo === 'limite') Loja.aviso(`Você já tem todas as ${r.max} unidades na sacola.`, { icone: 'pacote' });
        });

        // tamanho do anel
        document.querySelectorAll('[data-aro]').forEach(b => b.addEventListener('click', () => escolherAro(+b.dataset.aro)));
        function escolherAro(a) {
            tamanho = a;
            document.querySelectorAll('[data-aro]').forEach(x => x.setAttribute('aria-checked', +x.dataset.aro === a));
            $('erroAro').textContent = '';
        }
        const guia = $('guia');
        if (guia) {
            $('abrirGuia').addEventListener('click', () => guia.showModal());
            $('fecharGuia').addEventListener('click', () => guia.close());
            guia.addEventListener('click', (e) => { if (e.target === guia) guia.close(); });
            Loja.iniciarGuia(guia, (a) => { escolherAro(a); guia.close(); Loja.aviso(`Aro ${a} selecionado.`); });
            document.querySelectorAll('[data-abrir-guia]').forEach(b => b.addEventListener('click', () => guia.showModal()));
        }

        // gravação
        const quer = $('querGravar');
        if (quer) {
            quer.addEventListener('change', () => { gravacao.ativa = quer.checked; $('blocoGravacao').hidden = !quer.checked; desenharPrecos(p); if (quer.checked) $('textoGravacao').focus(); });
            $('textoGravacao').addEventListener('input', (e) => {
                gravacao.texto = e.target.value;
                $('textoPrevia').textContent = gravacao.texto || 'Seu texto';
                $('contaGravacao').textContent = gravacao.texto.length;
                $('erroGravacao').textContent = '';
            });
            document.querySelectorAll('[data-fonte]').forEach(b => b.addEventListener('click', () => {
                gravacao.fonte = b.dataset.fonte;
                document.querySelectorAll('[data-fonte]').forEach(x => x.setAttribute('aria-checked', x === b));
                document.querySelector('.previa-gravacao').className = `previa-gravacao fonte-${gravacao.fonte}`;
            }));
        }
        if (location.hash === '#tamanho' && $('tamanho')) setTimeout(() => $('tamanho').scrollIntoView({ block: 'center' }), 100);
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
        // galeria: foto da peça ou com modelo
        const foto = $('foto'), im = foto.querySelector('img');
        document.querySelectorAll('[data-foto]').forEach(b => b.addEventListener('click', () => {
            const look = b.dataset.foto === 'look';
            document.querySelectorAll('[data-foto]').forEach(x => x.setAttribute('aria-pressed', x === b));
            im.src = look ? `imagens/editorial/${Loja.FOTO_LOOK[p.categoria]}.webp` : Loja.img(p.img);
            foto.classList.toggle('editorial-foto', look);
            foto.classList.remove('zoom');
        }));
        // zoom acompanhando o mouse (só na foto da peça)
        foto.addEventListener('mousemove', (e) => {
            if (foto.classList.contains('editorial-foto')) return;
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

    function textoValido() {
        const t = gravacao.texto.trim();
        const msg = !t ? 'Digite o texto da gravação ou desmarque a opção.' : !/^[\p{L}\p{N} &.'-]+$/u.test(t) ? 'Use só letras, números, espaço, & e pontos.' : '';
        $('erroGravacao').textContent = msg;
        if (msg) $('textoGravacao').focus();
        return !msg;
    }
    function desenharPrecos(p) {
        const preco = p.preco + (gravacao.ativa ? Loja.PRECO_GRAVACAO : 0);
        $('precos').innerHTML = `
            <p class="preco-grande">${real(preco)}</p>
            ${gravacao.ativa ? `<p class="parcelas">Joia ${real(p.preco)} + gravação ${real(Loja.PRECO_GRAVACAO)}</p>` : ''}
            <p class="parcelas">${Loja.parcelas(preco)}</p>
            <p class="preco-pix">${real(preco * (1 - Loja.DESCONTO_PIX))} no Pix (5% de desconto)</p>`;
    }

    desenhar();
    Loja.aoMudar((chave) => { if (['eclat_produtos', 'tudo'].includes(chave)) desenhar(); });
})();
