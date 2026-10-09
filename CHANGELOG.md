# Versões do site

A versão do site identifica a interface publicada e é independente da versão da base do Atlas. Na publicação do PR #62, a identificação adotada é `v0.62`, vinculada ao número do PR conforme a preferência do responsável pelo projeto. As versões anteriores permanecem registradas com sua numeração original.

## Regra de atualização

Na publicação atual, o PR #62 identifica o site como `v0.62`, inclusive por se tratar de um ajuste pequeno. A indicação da próxima atualização será decidida pelo responsável pelo projeto; não acrescentar um terceiro número automaticamente. A primeira versão completa (`1.0`) também depende dessa decisão.

A nova versão só passa a identificar o site após a incorporação e publicação do PR. No PR que muda a versão, atualizar juntos a seção Atualização do site em `index.html`, a identificação no `README.md` e este histórico. A seção mostra a versão, a data de implementação original do site e a última atualização. A data original é fixa: **20/08/2026**, confirmada pela [primeira publicação bem-sucedida no GitHub Pages](https://github.com/Leoneldfernandes/desastres-no-brasil/actions/runs/32402841959). Ao publicar uma nova versão, atualizar apenas a versão e a data da última atualização; preservar a data original. A navegação Mapa / Dashboard / Sobre foi introduzida em `0.43.0`.

## 0.62 — 09/10/2026 · PR #62

- Aplica 50% de opacidade somente ao fundo dos espaços entre os quadros laterais durante a reprodução, com transição suave de 600 ms.
- Recupera o fundo sem transparência ao pausar ou interromper a reprodução, incluindo as pausas automáticas.
- Preserva as cores e a opacidade dos quadros, tabelas, textos e botões, o layout e o fundo da barra temporal já aprovado.
- Respeita a preferência por movimento reduzido. Os espaços laterais continuam fora da área do mapa; a transparência não estende o mapa por baixo deles.

## 0.60 — 09/10/2026 · PR #60

- Reduz o fundo da barra temporal durante a reprodução para 50% da opacidade habitual, para aumentar a visibilidade do mapa durante a reprodução.
- Preserva a transição de 600 ms, a recuperação do fundo ao pausar ou usar os controles, as dimensões da barra e a opacidade integral dos textos e botões.

## 0.59 — 09/10/2026 · PR #59

- Aumenta a largura de cada aba em 10%, mantendo a sobreposição de 12 pixels e o conjunto centralizado sobre o mapa.
- Corrige a ordem visual: Mapa à frente de Dashboard, Dashboard à frente de Sobre; a aba selecionada sempre assume o primeiro plano.
- Mantém altura, textos e adaptação às telas menores.
- Aumenta o fundo da barra temporal durante a reprodução para 90% da opacidade habitual, mantendo transição de 600 ms e controles integralmente nítidos.

## 0.58 — 09/10/2026 · PR #58

- Ajusta o fundo durante a reprodução de 65% para 80% da opacidade habitual, após a avaliação visual do teste.
- Mantém a transição de 600 ms, a recuperação ao pausar ou usar os controles e a nitidez e dimensões da barra.

## 0.57 — 09/10/2026 · PR #57

- Testa o fundo da barra temporal a 65% da opacidade habitual durante a reprodução, preservando textos, botões, posição e dimensões.
- Aplica transição de 600 ms e recupera o fundo original ao pausar, interromper a reprodução, passar o mouse sobre a barra ou usar seus controles pelo teclado.
- Respeita a preferência por movimento reduzido. O ajuste fica isolado neste PR para facilitar a reversão se o resultado visual não agradar.

## 0.56 — 09/10/2026 · PR #56

- Move o compartilhamento para o canto superior direito do mapa e organiza as ferramentas em Buscar município, Retornar ao panorama, Tela cheia e Compartilhar.
- Uniformiza os quatro botões e mostra descrições ao passar o mouse ou usar o teclado, incluindo a lupa; preserva a confirmação “Link copiado”.
- Ajusta a posição do painel de busca e remove a linha de compartilhamento dos controles temporais em telas menores.

## 0.55 — 09/10/2026 · PR #55

- Atualiza o resultado da verificação semanal ao abrir o indicador do Atlas, sem recarregar a página ou os dados do mapa.
- Evita consultas simultâneas ao abrir e fechar o menu rapidamente; em falha de conexão, preserva a data da última verificação conhecida.
- Vincula a identificação desta publicação ao número do PR e preserva a implementação original em 20/08/2026.

## 0.43.7 — 02/10/2026

- Apresenta os autores em um quadro de largura completa, um abaixo do outro, com os mesmos tamanhos de texto e sem divisória vertical.
- Identifica Leonel Delmiro Fernandes como Engenheiro Civil (UVA), preservando a condição de mestrando em Desastres Naturais.
- Inclui Lindberg Nascimento Júnior como coautor e orientador, com o resumo biográfico aprovado e seu currículo Lattes.
- Acrescenta o vínculo acadêmico e o link do LabClima/UFSC e organiza os três quadros informativos abaixo da autoria.

## 0.43.6 — 02/10/2026

- Identifica a seção como “Sobre o projeto \"Desastres no Brasil\"”, deixando claro que apresenta a ferramenta.
- Adiciona o subtítulo “Mapa interativo de ocorrências e impactos ao longo do tempo”, com apenas quatro pixels de espaço abaixo do título.
- Remove o rótulo repetido “O projeto” e mantém um intervalo maior antes do texto de apresentação.

## 0.43.5 — 02/10/2026

- Corrige o título da seção para “Sobre os desastres no Brasil”.
- Apresenta o propósito da ferramenta logo abaixo do título, com o texto aprovado pelo autor.
- Acrescenta a biografia no quadro Autoria, identificando Leonel Delmiro Fernandes como engenheiro civil e mestrando em Desastres Naturais pela UFSC.

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
