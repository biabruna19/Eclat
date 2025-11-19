// Aguarda o carregamento completo do DOM (Document Object Model) antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos do DOM
    const carouselWrapper = document.getElementById('carousel-wrapper');
    // REMOVIDOS: prevBtn e nextBtn
    const indicatorContainer = document.getElementById('indicator-container');
    
    // Itens do carrossel (slides)
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    let intervalId; // Variável para armazenar o ID do intervalo do autoplay
    const autoPlayTime = 5000; // 5 segundos para o autoplay

    // 2. Criação dos Indicadores (bolinhas)
    const createIndicators = () => {
        indicatorContainer.innerHTML = ''; // Limpa indicadores antigos
        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white', 'mx-1', 'transition');
            indicator.setAttribute('data-index', i);
            
            // Adiciona evento de clique para navegação direta
            indicator.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay(); // Reinicia o autoplay após navegação manual
            });
            
            indicatorContainer.appendChild(indicator);
        }
        updateIndicators();
    };

    // 3. Atualiza a exibição do carrossel e dos indicadores
    const goToSlide = (index) => {
        // Garante que o índice esteja dentro dos limites
        if (index >= totalItems) {
            index = 0; // Volta para o primeiro slide
        } else if (index < 0) {
            index = totalItems - 1; // Vai para o último slide
        }
        
        currentIndex = index;
        
        // Calcula o valor de translação horizontal (em %)
        const offset = -currentIndex * 100;
        carouselWrapper.style.transform = `translateX(${offset}%)`;
        
        updateIndicators();
    };

    // 4. Atualiza o estado visual dos indicadores (a bolinha ativa)
    const updateIndicators = () => {
        const indicators = indicatorContainer.querySelectorAll('button');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                // Indicador ativo (mais visível)
                indicator.classList.remove('bg-opacity-50', 'hover:bg-opacity-80');
                indicator.classList.add('bg-opacity-100');
            } else {
                // Indicador inativo
                indicator.classList.remove('bg-opacity-100');
                indicator.classList.add('bg-opacity-50', 'hover:bg-opacity-80');
            }
        });
    };

    // 5. Funções de navegação (Automática)
    const nextSlide = () => {
        goToSlide(currentIndex + 1);
    };

    // 6. Configuração do Autoplay
    const startAutoPlay = () => {
        // Limpa qualquer intervalo anterior para evitar duplicação
        clearInterval(intervalId); 
        intervalId = setInterval(nextSlide, autoPlayTime);
    };
    
    const resetAutoPlay = () => {
        startAutoPlay();
    };

    // 7. Event Listeners (Somente para pausar o mouse e iniciar/reiniciar)
    const carouselSection = document.getElementById('banner-carousel');
    carouselSection.addEventListener('mouseenter', () => clearInterval(intervalId));
    carouselSection.addEventListener('mouseleave', resetAutoPlay);

    // 8. Inicialização
    createIndicators();
    startAutoPlay();
});