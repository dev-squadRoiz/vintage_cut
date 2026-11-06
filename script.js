

// CARREGAR O DOM
document.addEventListener('DOMContentLoaded', () => {
    initLiveStatus();
    initMobileMenu();
    initMinDate();
    initPhoneMask();
});

// ============================================================================
// 2. MÁSCARA TELEFÔNICA DINÂMICA (WHATSAPP / CELULAR)
// ============================================================================
function initPhoneMask() {
    const phoneInput = document.getElementById('telefone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }

        e.target.value = value;
    });
}

// ============================================================================
// 3. STATUS DA BARBEARIA EM TEMPO REAL (ABERTO OU FECHADO)
// ============================================================================
function initLiveStatus() {
    const statusContainer = document.getElementById('live-status');
    const statusText = document.getElementById('status-text');

    if (!statusContainer || !statusText) return;

    const now = new Date();
    const dayOfWeek = now.getDay(); // 0: Domingo, 1: Segunda ... 6: Sábado
    const currentHour = now.getHours();

    const isOpenDay = dayOfWeek >= 1 && dayOfWeek <= 6;
    const isOpenHour = currentHour >= 9 && currentHour < 20;

    if (isOpenDay && isOpenHour) {
        statusContainer.className = 'status-badge open';
        statusText.textContent = 'Aberto Agora';
    } else {
        statusContainer.className = 'status-badge closed';
        statusText.textContent = 'Fechado Agora';
    }
}

// ============================================================================
// 4. MENU MOBILE HAMBÚRGUER COM FECHAMENTO AUTOMÁTICO
// ============================================================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em qualquer item
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================================================
// 5. DATA MÍNIMA PARA AGENDAMENTO 
// ============================================================================
function initMinDate() {
    const dateInput = document.getElementById('data');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// ============================================================================
// 6. SELEÇÃO DIRETA DE SERVIÇOS OU PRODUTOS VIA CARDS
// ============================================================================
function selecionarServico(nomeServico) {
    const selectServico = document.getElementById('servico');
    if (!selectServico) return;

    for (let i = 0; i < selectServico.options.length; i++) {
        if (selectServico.options[i].value.includes(nomeServico) || selectServico.options[i].text.includes(nomeServico)) {
            selectServico.selectedIndex = i;
            break;
        }
    }

    const agendamentoSection = document.getElementById('agendamento');
    if (agendamentoSection) {
        agendamentoSection.scrollIntoView({ behavior: 'smooth' });
    }
}
/*
function selecionarProduto(nomeProduto) {
    selecionarServico(nomeProduto);
    
}
*/
// ============================================================================
// 7. PROCESSAMENTO DO FORMULÁRIO DE AGENDAMENTO
// ============================================================================
function processarAgendamento(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const servico = document.getElementById('servico').value;
    const dataRaw = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const observacoes = document.getElementById('observacoes') ? document.getElementById('observacoes').value.trim() : '';

    if (!nome || !telefone || !servico || !dataRaw || !hora) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
    }

    // Formatar data (DD/MM/AAAA)
    const partesData = dataRaw.split('-');
    const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

   
    const novoAgendamento = {
        id: Date.now(),
        nome,
        telefone,
        servico,
        data: dataFormatada,
        hora,
        observacoes: observacoes || 'Nenhuma',
        criadoEm: new Date().toLocaleString('pt-BR')
    };

    // Salvar localmente no navegador (localStorage)
    salvarAgendamentoLocal(novoAgendamento);

    // Preencher o resumo no Modal
    const summaryBox = document.getElementById('modalSummary');
    summaryBox.innerHTML = `
        <p><span>Cliente:</span> <strong>${nome}</strong></p>
        <p><span>Contato:</span> <strong>${telefone}</strong></p>
        <p><span>Serviço / Item:</span> <strong>${servico}</strong></p>
        <p><span>Data:</span> <strong>${dataFormatada}</strong></p>
        <p><span>Horário:</span> <strong>${hora}</strong></p>
        ${observacoes ? `<p><span>Obs:</span> <strong>${observacoes}</strong></p>` : ''}
        <div style="margin-top: 12px; padding: 10px; background: #e6f4ea; color: #137333; border-radius: 6px; text-align: center; font-size: 0.88rem; font-weight: 600;">
            ✓ Reserva gravada com sucesso!
        </div>
    `;

    // Montar link para notificação via WhatsApp (opcional para o cliente)
    const mensagemWhatsApp = encodeURIComponent(
        `Olá, Barbearia Vintage & Cut!\n\n` +
        `Gostaria de confirmar minha reserva:\n` +
        `👤 *Nome:* ${nome}\n` +
        `✂️ *Serviço/Produto:* ${servico}\n` +
        `📅 *Data:* ${dataFormatada}\n` +
        `⏰ *Horário:* ${hora}\n` +
        (observacoes ? `📝 *Observação:* ${observacoes}\n` : '') +
        `\nAguardo confirmação!`
    );

    const whatsappLink = document.getElementById('whatsappLink');
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/5586999999999?text=${mensagemWhatsApp}`;
    }

    
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Persistência local segura
function salvarAgendamentoLocal(agendamento) {
    try {
        const registros = JSON.parse(localStorage.getItem('vintagecut_agendamentos') || '[]');
        registros.push(agendamento);
        localStorage.setItem('vintagecut_agendamentos', JSON.stringify(registros));
    } catch (err) {
        console.warn('Armazenamento local indisponível:', err);
    }
}

function fecharModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
    }
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.reset();
    }
}


window.addEventListener('click', (e) => {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        fecharModal();
    }
});
