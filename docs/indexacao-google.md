# Preparação para a Pesquisa Google

## Estado em 26/10/2026

Preparação em branch/PR, aguardando liberação do responsável após a qualificação. Nenhuma solicitação de indexação, cadastro no Search Console ou campanha paga faz parte desta preparação. Não há data de lançamento presumida.

O site publicado permanece na v0.70. A versão e a data da próxima interface devem ser atualizadas juntas no `index.html`, README, histórico e prévia quando o PR estiver autorizado para publicação, usando o número real do PR. Esta preparação não antecipa essa identificação no site.

## Redação candidata

- Título do navegador e sugestão para a pesquisa: **Desastres no Brasil | Mapa interativo de ocorrências e impactos**.
- Descrição: **Explore dados do Atlas Digital de Desastres no Brasil: ocorrências, danos humanos e prejuízos econômicos por município, em um mapa interativo.**

O cabeçalho visível, o subtítulo e as biografias não mudam. O Google pode escolher outro título ou trecho com base no conteúdo e na consulta; esta redação não garante exibição literal.

## Arquivos preparados

- `index.html`: título, descrição, URL canônica absoluta e regra temporária `noindex, follow` no HTML inicial. A regra deve permanecer até a autorização de liberação para busca.
- `sitemap.xml`: somente `https://leoneldfernandes.github.io/desastres-no-brasil/`, sem filtros, fragmentos, datas fictícias ou páginas de revisão. As abas pertencem ao mesmo documento; os links de meses, tipologias e municípios continuam funcionando.
- `tests/test_search_metadata.py`: coerência entre URL canônica e sitemap, descrição única, regra de indexação sem conflito e exclusão da página auxiliar de revisão.

`noindex` nesta branch não altera o site público. Se for necessário impedir a presença do site nas buscas antes da qualificação, será preciso autorizar a publicação da regra temporária. O site continuará acessível pelo link; a regra depende de novo rastreamento para produzir efeito e não é proteção de acesso. Não foi verificado se o endereço já aparece no índice do Google.

Não se adicionou `robots.txt` à pasta do projeto. O Google procura esse arquivo na raiz do host, em `https://leoneldfernandes.github.io/robots.txt`; um arquivo em `/desastres-no-brasil/robots.txt` não controla o rastreamento. Não é necessário criar outro repositório ou bloquear o rastreador para enviar o sitemap pelo Search Console. O rastreador precisa acessar a página para ler `noindex`.

## Verificação de propriedade — etapa privada pendente

Usar uma propriedade **Prefixo do URL**, com o endereço exato:

`https://leoneldfernandes.github.io/desastres-no-brasil/`

O prefixo corresponde ao projeto publicado; o domínio `github.io` não pertence ao responsável e não deve ser escolhido para verificação DNS. No Search Console da conta do responsável, escolher um método disponível de verificação. A tag HTML gerada pelo Google é adequada para este site estático: o valor deve ser obtido na propriedade real, adicionado ao `<head>` e publicado com autorização. Não criar um token fictício.

Não presumir que a integração com Analytics comprova a propriedade: sua coleta depende de consentimento e tem configuração própria. A verificação HTML pode ser feita enquanto houver `noindex`, sem solicitar indexação. O token de verificação deve permanecer no site após a confirmação, conforme as instruções do Google. Essa etapa requer acesso do responsável à conta e publicação da tag; ainda não foi realizada.

## Quando o responsável disser “liberar”

1. Confirmar a redação final e a autorização explícita de lançamento; não inferir liberação a partir da passagem do tempo ou da conclusão de testes.
2. Na página principal, trocar `noindex, follow` por `index, follow` e retirar o comentário de espera. Manter `noindex` em `docs/preview-layout.html`.
3. Atualizar a versão e a data conforme o PR efetivamente publicado; preservar a implementação original em 20/08/2026. Conferir eventual mudança da base do Atlas durante a espera.
4. Executar testes, revisar o diff, incorporar o PR autorizado e confirmar CI/GitHub Pages. Conferir no endereço público a regra de indexação, URL canônica, descrição, tag de propriedade (se usada) e o XML do sitemap. Preservar filtros, compartilhamento e consentimento do Analytics.
5. Na propriedade verificada do Search Console, enviar `https://leoneldfernandes.github.io/desastres-no-brasil/sitemap.xml`, inspecionar a URL principal e solicitar indexação. Essas ações não ocorrerão automaticamente pela publicação.
6. Acompanhar o relatório de indexação e erros de rastreamento. Solicitar inclusão não garante prazo, presença imediata nem posição nos resultados.

O preparo técnico do repositório pode ficar pronto antes da qualificação. A verificação da conta/propriedade e a resposta do Google são etapas externas; não equivalem a um botão de anúncio com publicação instantânea.

## Fontes oficiais

- [URL canônica e páginas duplicadas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=pt-br).
- [Criar e enviar um sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=pt-br).
- [Bloqueio temporário com noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=pt-br).
- [Local correto do robots.txt](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt?hl=pt-br).
- [Verificar a propriedade no Search Console](https://support.google.com/webmasters/answer/9008080?hl=pt-BR).
- [Solicitar novo rastreamento](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=pt-BR).
