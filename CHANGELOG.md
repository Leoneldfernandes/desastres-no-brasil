# Versões do site

A versão do site identifica a interface publicada e é independente da versão da base do Atlas. O número do PR #42 foi escolhido como ponto de partida; os próximos números de versão seguem a regra abaixo, sem depender da numeração dos pull requests.

## Regra de atualização

Em todo PR, conferir se a alteração exige uma nova versão:

- Nova funcionalidade relevante: incrementar o segundo número, por exemplo, `0.42.0` → `0.43.0`.
- Correção ou pequeno ajuste visual: incrementar o terceiro número, por exemplo, `0.43.0` → `0.43.1`.
- Documentação, rotinas internas ou atualização exclusiva dos dados: manter a versão da interface, a menos que também mude o funcionamento do site.
- Primeira versão completa e revisada: `1.0.0`, mediante decisão do responsável pelo site.

A nova versão só passa a identificar o site após a incorporação e publicação do PR. No PR que muda a versão, atualizar juntos a seção Atualização do site em `index.html`, a identificação no `README.md` e este histórico. A seção mostra a versão, sua data de implementação e a última atualização do site. A navegação Mapa / Dashboard / Sobre está prevista para `0.43.0`.

## 0.42.0 — 01/10/2026

- Adiciona o seletor Aparência no topo: Sistema, Claro e Escuro.
- Sistema acompanha a preferência do computador e suas mudanças durante a visita.
- Escolhas manuais são salvas neste navegador e sincronizadas entre abas; sem armazenamento disponível, funcionam durante a visita.
- Adapta painéis, tabelas, gráfico temporal, controles do mapa e janelas aos dois temas.
- Mantém fixas as cores das tipologias e classes científicas do mapa.
- Mostra a versão do site, o estado Em desenvolvimento, a data de implementação e a última atualização na parte inferior do painel que abre pelo indicador no canto superior direito.
- Identifica separadamente a geração da base de dados, que vem do manifesto do Atlas.

As funcionalidades anteriores, incluindo a apresentação inicial, o consentimento para Google Analytics e os recursos do mapa, precedem o início desta numeração.
