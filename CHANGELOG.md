# Versões do site

A versão do site identifica a interface publicada e é independente da versão da base do Atlas. O número do PR #42 foi escolhido como ponto de partida; os próximos números de versão seguem a regra abaixo, sem depender da numeração dos pull requests.

## Regra de atualização

Em todo PR, conferir se a alteração exige uma nova versão:

- Nova funcionalidade relevante: incrementar o segundo número, por exemplo, `0.42.0` → `0.43.0`.
- Correção ou pequeno ajuste visual: incrementar o terceiro número, por exemplo, `0.43.0` → `0.43.1`.
- Documentação, rotinas internas ou atualização exclusiva dos dados: manter a versão da interface, a menos que também mude o funcionamento do site.
- Primeira versão completa e revisada: `1.0.0`, mediante decisão do responsável pelo site.

A nova versão só passa a identificar o site após a incorporação e publicação do PR. No PR que muda a versão, atualizar juntos a seção Atualização do site em `index.html`, a identificação no `README.md` e este histórico. A seção mostra a versão, a data de implementação original do site e a última atualização. A data original é fixa: **20/08/2026**, confirmada pela [primeira publicação bem-sucedida no GitHub Pages](https://github.com/Leoneldfernandes/desastres-no-brasil/actions/runs/32402841959). Ao publicar uma nova versão, atualizar apenas a versão e a data da última atualização; preservar a data original. A navegação Mapa / Dashboard / Sobre foi introduzida em `0.43.0`.

## 0.43.4 — 02/10/2026

- Corrige a largura efetiva dos controles do cabeçalho entre 1101 e 1599 pixels, mantendo espaço entre os controles e as abas centradas.

## 0.43.3 — 02/10/2026

- Alinha o conjunto de abas ao centro do mapa em telas largas, evitando o deslocamento para a direita em Full HD.
- Aproxima e sobrepõe discretamente as capinhas, reforçando a aba selecionada em primeiro plano.
- Mantém o tamanho das letras, suaviza as abas inativas e preserva a altura do cabeçalho.
- Disponibiliza uma página de revisão de layout em 1920 × 1080 e outras larguras, independente da interface principal.

## 0.43.2 — 02/10/2026

- Recupera as proporções da proposta visual aprovada, com abas mais largas e texto legível no cabeçalho.
- Reproduz o contorno de pasta com desenho vetorial e limita a conexão da aba selecionada à moldura, sem avançar sobre o mapa.
- Preserva as seções, os filtros e a área útil do mapa, com uma separação de apenas dois pixels abaixo da moldura.

## 0.43.1 — 02/10/2026

- Encaixa Mapa / Dashboard / Sobre no cabeçalho, como abas de pasta conectadas à moldura do conteúdo.
- Remove a faixa separada de navegação, recuperando a altura útil do mapa na visualização desktop.
- Mantém arredondamento discreto e adapta o encaixe das abas às larguras menores e aos temas claro e escuro.

## 0.43.0 — 02/10/2026

- Adiciona a navegação superior Mapa / Dashboard / Sobre, com o mapa como tela inicial.
- Preserva filtros e mês ao mudar de seção; pausa a reprodução fora do mapa e ajusta o mapa ao voltar.
- Informa que o Dashboard está em desenvolvimento, com acesso ao mapa atual.
- Inicia o Sobre com autoria, fonte Atlas Digital, limites de interpretação, metodologia e preferências de privacidade.
- Permite navegação por teclado, links diretos e histórico voltar/avançar; adapta as três opções às telas pequenas e aos temas claro e escuro.

## 0.42.4 — 02/10/2026

- Atualiza o aviso de privacidade após ativar a coleta de cidades no Google Analytics.
- Explica a localização aproximada por país, estado e cidade e os metadados técnicos de dispositivo coletados pela mesma opção.
- Preserva a coleta somente após consentimento e as configurações sem publicidade, Google Signals ou medição otimizada.

## 0.42.3 — 02/10/2026

- Move Sobre e privacidade para o rodapé do quadro Baixar dados, com ícone informativo e acesso discreto.
- Mantém Recorte territorial, Aparência e atualização no topo, com títulos centralizados.
- Centraliza Velocidade sobre o seletor e amplia sua largura para mostrar as opções completas.
- Reorganiza a série temporal pela largura disponível dentro do mapa, evitando sobreposição dos controles e corte dos indicadores.

## 0.42.2 — 01/10/2026

- Centraliza os títulos Recorte territorial e Aparência sobre seus respectivos controles.

## 0.42.1 — 01/10/2026

- Corrige a data de implementação original para 20/08/2026, mantendo a última atualização em 01/10/2026.

- Organiza os controles do topo na ordem Recorte territorial, Sobre e privacidade, Aparência e indicador de atualização.
- Uniformiza altura, largura, formato arredondado, tipografia e alinhamento dos controles, seguindo o modelo do indicador Atlas verificado.
- Mantém a ordem dos controles em quatro colunas nas telas intermediárias e duas colunas nas telas menores, com alvos de toque de 44 px.

## 0.42.0 — 01/10/2026

- Adiciona o seletor Aparência no topo: Sistema, Claro e Escuro.
- Sistema acompanha a preferência do computador e suas mudanças durante a visita.
- Escolhas manuais são salvas neste navegador e sincronizadas entre abas; sem armazenamento disponível, funcionam durante a visita.
- Adapta painéis, tabelas, gráfico temporal, controles do mapa e janelas aos dois temas.
- Mantém fixas as cores das tipologias e classes científicas do mapa.
- Mostra a versão do site, o estado Em desenvolvimento, a data de implementação e a última atualização na parte inferior do painel que abre pelo indicador no canto superior direito.
- Identifica separadamente a geração da base de dados, que vem do manifesto do Atlas.

As funcionalidades anteriores, incluindo a apresentação inicial, o consentimento para Google Analytics e os recursos do mapa, precedem o início desta numeração.
