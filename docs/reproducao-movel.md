# Reprodução móvel e atalhos de visualização

## Experiência proposta

- Na primeira reprodução de cada visita (aba/sessão), oferecer **Tela cheia** e **Agora não**, sem interromper nem forçar a reprodução. O armazenamento funcional é opcional e não contém dados de visitantes.
- Em tela cheia móvel, recolher a barra e as ferramentas após **5 segundos sem interação**. Seleção ativa, menus abertos, foco por teclado, pausa, gráficos expandidos e aba oculta impedem o recolhimento.
- Manter sempre **Sair**, mês atual, **Pausar** e **Controles** acessíveis. Controles recupera a barra sem pausar. Pausar e o fim da reprodução restauram a barra. Sair retorna ao layout anterior, preservando mês e filtros.
- Usar o modo ampliado existente quando a tela cheia nativa estiver indisponível. Toques no mapa continuam consultando municípios; não recuperam os controles.
- A escala permanece acima dos créditos e só recebe afastamento extra quando sua posição cruza o reprodutor. O afastamento acompanha redimensionamento e zoom; o desktop sem colisão conserva sua posição.

## Atalhos discretos — local pendente

Preparados três destinos: **Amplo**, **Intermediário** e **Compacto**. O responsável definirá a letra ou local específico de acesso. Nenhum acionador foi ativado no título ou em outro ponto da interface; a proposta de cinco cliques também foi retirada. O módulo aguarda a presença do acionador a ser definido, sem modificar a navegação atual.

**Amplo** remove o modo forçado e retorna ao comportamento automático: em 1920×1080 recupera o amplo aprovado; em janelas menores mantém a adaptação por largura e altura. Não força o desktop amplo em uma tela onde ele não cabe.

Os links alteram apenas o parâmetro `layout` e o fragmento para `#mapa`. Mês, território, tipologias, município e contexto da série são preservados. Os limites de largura e altura continuam valendo: o pedido intermediário usa compacto onde falta espaço. Trata-se de conveniência discreta, não de autenticação ou controle de acesso.

## Validação antes da publicação

Automatizados: verificar temporizador com relógio controlado, interação/foco, recuperação/pausa/saída, links com parâmetros completos, colisão geométrica da escala, hashes dos assets, testes existentes e integridade dos dados.

Conferência visual ainda obrigatória na branch: 1920×1080 (três estilos), 1366×768, 768×1024, 820×1180, 1024×768, 1180×820, 412×860, 390×844, 320×568 e 860×412. Validar toque físico no S23 Ultra e tela cheia nativa/alternativa. Confirmar que Pausar e Controles respondem ao primeiro toque, que seletores abertos e foco por teclado não somem e que a escala não cruza barra ou dock.

O navegador de revisão desta sessão bloqueou arquivos locais por política de protocolo. A revisão de interface da nova branch não foi afirmada como concluída. A imagem de proposta anterior é conceitual, não prova da implementação. A Issue #17 permanece aberta até concluir a verificação e a publicação autorizada.
