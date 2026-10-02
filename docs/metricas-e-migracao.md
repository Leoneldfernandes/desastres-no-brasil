# Desastres no Brasil — apresentação, métricas e endereço

Título aprovado: **Desastres no Brasil**.

Subtítulo: **Mapa interativo de ocorrências e impactos ao longo do tempo**.

Endereço previsto após renomear o repositório: `https://leoneldfernandes.github.io/desastres-no-brasil/`.

## Google Analytics 4

A integração permanece desativada até existir uma propriedade real e suas opções serem conferidas. Nesse intervalo, a janela apresenta o mapa e o botão “Explorar mapa”, sem pedir uma autorização que ainda não seria usada.

1. Na conta Google do responsável, criar ou selecionar uma propriedade GA4 do projeto e um fluxo de dados da Web. Usar o endereço publicado do site. O cadastro e a aceitação de termos precisam do responsável; senhas não devem ser compartilhadas no repositório ou no chat.
2. No fluxo da Web, desativar **Medição otimizada**. Isso evita eventos extras e visualizações duplicadas causadas pelas mudanças de URL dos filtros do mapa.
3. Na coleta de dados da propriedade, manter **Google Signals**, publicidade, personalização de anúncios e dados fornecidos pelo usuário desativados. Desativar a coleta granular de localização e dispositivo; conferir os rótulos atuais no painel. Dados geográficos mais amplos, como país, ainda podem ser derivados pelo Google e são informados no aviso.
4. Definir a retenção de eventos e usuários em dois meses, manter o painel privado e desativar opções de compartilhamento de dados que não sejam necessárias. Não vincular Google Ads nem conceder acesso público aos relatórios.
5. Copiar o **ID de medição** público, no formato `G-XXXXXXXXXX`, para `assets/js/visitor-config.js`. Definir `privacySettingsVerified: true` somente após conferir as opções acima. Esse ID não dá acesso de leitura à conta; não é necessário segredo de API.
6. Atualizar os hashes SHA-256 das referências de arquivos alterados em `index.html` e executar a validação.
7. No site publicado, conferir uma visita autorizada no relatório em tempo real. Em outra visita sem autorização, confirmar que nenhum script ou pedido do Analytics é enviado. Conferir também a retirada da autorização e o uso com bloqueador de anúncios.

A configuração do site não consegue auditar as opções privadas da propriedade. O campo `privacySettingsVerified` registra essa conferência; não a substitui.

## Autorização e significado dos números

A janela traz uma opção de estatísticas desligada inicialmente, “Salvar minha escolha”, “Concordo e continuar” e “Continuar sem contabilizar”. A recusa permite usar o mapa normalmente. “Sobre e privacidade” reabre as preferências.

O Google só recebe pedidos após uma autorização válida. Usamos o modo de consentimento básico: o script não é baixado antes da escolha. Na recusa posterior, a flag oficial `ga-disable-ID` bloqueia a medição e os cookies próprios do Analytics, com prefixo `dnb`, são removidos. A decisão pode ser revista em outra aba e é armazenada localmente por até 180 dias. Cookies de Analytics usam esse mesmo prazo máximo. A retirada da autorização não apaga dados já recebidos pelo Google.

Cada carregamento autorizado envia uma visualização de página. Filtros, animação e seleção de municípios não geram eventos próprios. O endereço enviado exclui parâmetros, fragmentos e referências de origem. A contagem é desativada em localhost, navegadores automatizados, páginas ocultas e pré-renderizações; páginas que passam a ficar visíveis podem ser contadas.

O Analytics também gera eventos automáticos de sessão e engajamento. Os relatórios permitem acompanhar visualizações, sessões e estimativas de usuários. Esses valores não equivalem a um total exato de pessoas: recusas, bloqueadores, dispositivos e cookies afetam a medição. A coleta começa na ativação e não recupera visitas anteriores.

O Analytics usa cookies e informações técnicas. O Google declara que deriva localização aproximada do IP e depois descarta o endereço IP no GA4. Os dados podem ser tratados fora do Brasil. O aviso informa esses usos e contém um link para a política do Google. Publicidade e sinais opcionais estão desativados no código e devem permanecer desativados na propriedade.

## Migração do endereço e pesquisa Google

Renomear o repositório de `desastres-temporais` para `desastres-no-brasil` em **GitHub → Settings → Repository name**. A operação exige acesso administrativo, que não é fornecido pelo conector GitHub usado para commits e PRs.

1. Publicar e conferir a apresentação, o título e o subtítulo.
2. Renomear o repositório e conferir **Settings → Pages** e o novo endereço publicado.
3. Testar mapa, filtros, compartilhamento, exportação e consulta de atualização do Atlas. O código dessa consulta deriva o nome do repositório do endereço do GitHub Pages.
4. Atualizar links divulgados. O usuário optou por trocar o link, sem manter uma página no endereço antigo. O GitHub redireciona links do repositório, mas não o endereço do GitHub Pages.
5. Depois de verificar o novo endereço, definir a URL canônica, disponibilizar `sitemap.xml` e `robots.txt` e enviar a URL ao Google Search Console da conta do responsável. A indexação depende do Google; publicar essas informações não garante inclusão imediata nem posição na pesquisa.

## Navegação futura

A navegação **Introdução | Dashboard | Sobre** está planejada na issue #40 para um PR separado. O mapa e os indicadores atuais podem iniciar o Dashboard; a Introdução e o Sobre terão espaço próprio para orientações, fontes, metodologia e autoria. A integração de métricas deste PR já usa o provedor escolhido, Google Analytics.

## Referências técnicas

- [Criar uma propriedade e fluxo GA4](https://support.google.com/analytics/answer/9304153).
- [Modo de consentimento básico](https://developers.google.com/tag-platform/security/concepts/consent-mode).
- [Desativar Analytics e sinais de publicidade](https://developers.google.com/tag-platform/security/guides/privacy).
- [Visualizações manuais e medição otimizada](https://developers.google.com/analytics/devguides/collection/ga4/views).
- [Privacidade e uso dos dados pelo Google](https://policies.google.com/technologies/partner-sites?hl=pt-BR).
- [Renomear repositórios e efeito sobre GitHub Pages](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository).
