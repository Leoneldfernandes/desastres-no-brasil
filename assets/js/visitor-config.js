/* Ativar somente após conferir as opções de privacidade no painel privado.
 * O endpoint é público; nunca colocar senha ou token de API neste arquivo.
 * Instruções: docs/metricas-e-migracao.md.
 */
window.VISITOR_METRICS = Object.freeze({
  endpoint: "",
  privacySettingsVerified: false,
});
