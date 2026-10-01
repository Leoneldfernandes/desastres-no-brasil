# Desastres no Brasil — apresentação, métricas e endereço

Nome aprovado: **Desastres no Brasil**.

Subtítulo: **Mapa interativo de ocorrências e impactos ao longo do tempo**.

Novo endereço previsto: `https://leoneldfernandes.github.io/desastres-no-brasil/`.

## Ativação do painel privado

A implementação está pronta, mas permanece desativada até existir um painel real e suas opções serem conferidas. Não há contador local simulado, número inventado ou chave secreta no JavaScript. Antes da ativação, a janela apresenta somente o mapa e o botão “Explorar mapa”.

1. Criar uma conta em [GoatCounter](https://www.goatcounter.com/). O cadastro e a confirmação de e-mail ficam com o responsável pelo projeto. Não compartilhar senha ou token.
2. Nas configurações do site, manter o painel **privado**, acessível apenas à conta do responsável.
3. Em **Settings → Data collection**, desativar **Locations**, **Sessions**, navegadores, sistemas operacionais, idiomas, tamanhos de tela e referências/campanhas, quando houver essas opções. Manter desativada a coleta de acessos individuais. O único produto desejado são os totais agregados de acesso à página por período. Conferir os rótulos no painel real antes de ativar.
4. Configurar `assets/js/visitor-config.js` com o endpoint público `https://CODIGO.goatcounter.com/count` e `privacySettingsVerified: true`. A flag documenta a conferência manual; o navegador não pode verificar as configurações privadas do serviço.
5. Atualizar a versão SHA-256 do arquivo na referência de `index.html`.
6. Em um navegador de teste, abrir o site publicado, autorizar uma visita e verificar seu aparecimento no painel. Recusar em outra abertura e confirmar que nenhuma requisição ao GoatCounter é enviada. Testar também o bloqueador de anúncios: o mapa deve continuar funcionando.

Não é necessário token de API: o endpoint público recebe a visita, mas não concede acesso de leitura ao painel.

## O que o número significa

É a quantidade de **aberturas autorizadas da página**, a partir da ativação. Cada carregamento com autorização válida pode acrescentar um acesso. Recarregar a página pode acrescentar outro. Não equivale a pessoas únicas. Não há reconstrução de acessos anteriores à ativação.

Filtros, animação, mudanças de município e compartilhamento não enviam eventos. O caminho enviado é sempre `/mapa`, sem query ou fragmento, para manter a série contínua antes e depois da migração. A contagem não funciona em localhost, pré-renderizações ou navegadores automatizados.

O site salva apenas a escolha de autorização no armazenamento local do navegador, por até 180 dias, sem identificador do visitante. Falhas desse armazenamento não impedem o mapa: a escolha vale para a abertura atual. “Continuar sem contabilizar” não envia requisições ao contador. Escape na primeira apresentação também não autoriza. O botão “Sobre e privacidade” permite recusar contagens futuras; totais já agregados não são individualizáveis nem apagados pela retirada da escolha.

A requisição usa `credentials: omit`, `referrerPolicy: no-referrer` e não carrega scripts externos do contador. Ainda assim, o destino recebe IP e cabeçalhos técnicos inerentes à conexão. A configuração do painel é indispensável para desativar informações derivadas desses cabeçalhos. A política do fornecedor declara que não armazena IP nem o User-Agent completo. Nenhuma declaração de conformidade jurídica integral é inferida dessa integração.

## Migração do endereço

O repositório deve ser renomeado de `desastres-temporais` para `desastres-no-brasil` em **GitHub → Settings → Repository name**. A conexão GitHub disponível nesta sessão não expõe uma operação de renomear repositórios.

O GitHub redireciona URLs do repositório, issues e pull requests; **não redireciona automaticamente o site GitHub Pages**. Portanto:

1. Incorporar a alteração de identidade e apresentação no repositório atual e conferir a publicação.
2. Renomear o repositório nas configurações e conferir **Settings → Pages**, a publicação e o novo endereço.
3. Testar mapa, compartilhamento, download e consulta semanal do Atlas no novo endereço. O código da consulta de status usa o nome do repositório presente na URL do GitHub Pages, funcionando tanto antes quanto depois da renomeação.
4. Atualizar os links divulgados, descrição do repositório e perfis. Links compartilhados podem conservar os parâmetros e o fragmento ao trocar apenas `/desastres-temporais/` por `/desastres-no-brasil/`.

Se for necessário manter os links antigos funcionais, uma alternativa é hospedar uma página de redirecionamento no caminho antigo, preservando query e fragmento. Criar outro repositório com o nome anterior **remove os redirecionamentos automáticos do repositório original**, conforme a documentação do GitHub. Essa escolha deve ser explícita: não criar o repositório antigo silenciosamente. Um domínio próprio é outra alternativa, que exige domínio e DNS.

## Referências técnicas

- [Endpoint público e parâmetros do contador](https://www.goatcounter.com/help/pixel).
- [Política e categorias que podem ser desativadas](https://www.goatcounter.com/help/privacy).
- [Diferença entre visualizações e visitas](https://www.goatcounter.com/help/sessions).
- [Renomear repositórios e efeito sobre GitHub Pages](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository).
- [Guia da ANPD sobre cookies e proteção de dados pessoais](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais).
