# Preparação para a Pesquisa Google

## Estado em 26/10/2026

Publicação da preparação com noindex autorizada pelo responsável em 26/10/2026 no PR #72. A liberação para busca continua aguardando autorização após a qualificação. A propriedade de prefixo foi adicionada ao Search Console da conta do responsável. Nenhuma solicitação de indexação ou campanha paga foi feita. Não há data de lançamento presumida.

A publicação do PR #72 identifica o site como v0.72, com atualização em 26/10/2026 no `index.html`, README, histórico e prévia. A implementação original em 20/08/2026 permanece inalterada. Conferência da publicação e resultado da verificação de propriedade registrados no PR.

## Redação aprovada em 26/10/2026

- Título do navegador e sugestão para a pesquisa: **Desastres no Brasil | Mapa interativo de ocorrências e impactos**.
- Descrição: **Explore dados do Atlas Digital de Desastres no Brasil: ocorrências, danos humanos e prejuízos econômicos por município, em um mapa interativo.**

O cabeçalho visível, o subtítulo e as biografias não mudam. O Google pode escolher outro título ou trecho com base no conteúdo e na consulta; esta redação não garante exibição literal.

## Arquivos preparados

- `index.html`: título, descrição, metatag real de verificação de propriedade, URL canônica absoluta e regra temporária `noindex, follow` no HTML inicial. A regra deve permanecer até a autorização de liberação para busca.
- `sitemap.xml`: somente `https://leoneldfernandes.github.io/desastres-no-brasil/`, sem filtros, fragmentos, datas fictícias ou páginas de revisão. As abas pertencem ao mesmo documento; os links de meses, tipologias e municípios continuam funcionando.
- `tests/test_search_metadata.py`: coerência entre URL canônica e sitemap, descrição única, regra de indexação sem conflito e exclusão da página auxiliar de revisão.

O noindex passa a ser servido no site público com a publicação autorizada do PR #72. O site continua acessível pelo link; a regra depende de novo rastreamento para produzir efeito e não é proteção de acesso. A conferência do estado no índice do Google depende do Search Console.

Não se adicionou `robots.txt` à pasta do projeto. O Google procura esse arquivo na raiz do host, em `https://leoneldfernandes.github.io/robots.txt`; um arquivo em `/desastres-no-brasil/robots.txt` não controla o rastreamento. Não é necessário criar outro repositório ou bloquear o rastreador para enviar o sitemap pelo Search Console. O rastreador precisa acessar a página para ler `noindex`.

## Verificação de propriedade — aguardando publicação da metatag

Usar uma propriedade **Prefixo do URL**, com o endereço exato:

`https://leoneldfernandes.github.io/desastres-no-brasil/`

O prefixo corresponde ao projeto publicado; o domínio `github.io` não pertence ao responsável e não deve ser escolhido para verificação DNS. No Search Console da conta do responsável, escolher um método disponível de verificação. A tag HTML gerada pelo Google é adequada para este site estático: o valor deve ser obtido na propriedade real, adicionado ao `<head>` e publicado com autorização. Não criar um token fictício.

Não presumir que a integração com Analytics comprova a propriedade: sua coleta depende de consentimento e tem configuração própria. A verificação HTML pode ser feita enquanto houver `noindex`, sem solicitar indexação. O token de verificação deve permanecer no site após a confirmação, conforme as instruções do Google. Em 26/10/2026, a propriedade foi adicionada na conta Leonel Fernandes e a metatag HTML foi obtida na interface real do Google. A tag está no `index.html` do PR #72. Na preparação, o botão Verificar ainda não havia sido acionado para este método. A confirmação é realizada após a publicação autorizada; conferir o resultado registrado no PR #72. Não foram alteradas permissões de terceiros.

## Publicar a preparação sem liberar as buscas

O responsável autorizou incorporar e publicar o PR #72 antes da qualificação, mantendo `noindex, follow`. Após confirmar a tag no endereço público, usar Verificar no método Tag HTML do Search Console e registrar o resultado. Não enviar o sitemap nem solicitar indexação nesta etapa. A publicação torna a regra noindex efetiva para rastreadores que a lerem; os visitantes continuam acessando o site normalmente pelo link.

## Quando o responsável disser “liberar”

1. A redação já foi aprovada. Confirmar a autorização explícita de lançamento após a qualificação; não inferir liberação a partir da passagem do tempo ou da conclusão de testes.
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
