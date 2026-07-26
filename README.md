# Próxima Ação

MVP pessoal para decidir a melhor próxima ação em blocos de 15, 30 ou 60 minutos. Ele complementa o Evernote: guarda apenas os atributos necessários para recomendar, executar e acompanhar sessões.

## Como abrir

Abra `index.html` em um navegador moderno. Não há servidor, build, conta ou instalação. Para iniciar com exemplos, abra **Configurações** e escolha **Carregar demonstração**.

## O que está incluído

- Painel semanal com metas, ritmo, alertas, frequências e sessões estratégicas.
- Cadastro, edição, conclusão e arquivamento de tarefas com link para o Evernote.
- Motor determinístico e explicável: considera duração, contexto, energia, prioridades, prazo, ritmo, frequências, recusas, continuidade e proteção de Marketing/Desenvolvimento.
- Fluxo de recusa: na segunda troca, pergunta o motivo e ajusta o ciclo.
- Cronômetro persistente, recuperação após recarregar e registro de tempo real. A conclusão antecipada converte o restante planejado em pausa.
- Histórico, exportação e importação JSON com backup automático antes da importação.

## Agenda Semanal × Próxima Ação

O produto possui dois níveis complementares e independentes:

- **Agenda Semanal** planeja atenção e tempo. Responde: “Onde devo estar e qual responsabilidade devo cuidar?”
- **Próxima Ação** planeja execução. Responde: “Qual tarefa específica devo fazer agora?”

A Agenda trabalha com as responsabilidades Família, Casa, Pessoal, Profissional e Geld. Seus blocos podem ser fixos, protegidos, de presença, foco, manutenção, margem ou reserváveis, cada um com rigidez própria. Blocos de foco e manutenção podem abrir o motor Próxima Ação já filtrado pela responsabilidade e registrar a sessão no bloco de origem.

O planejamento assistido sempre apresenta uma proposta para revisão. Sugestões não são salvas automaticamente. O replanejamento preserva blocos rígidos e realizados, e a ocupação máxima padrão de 75% mantém margem explícita.

Os dados continuam locais e o backup JSON agora inclui `scheduleBlocks`, `scheduleRecurrences`, `maintenanceRoutines`, `agendaHistory` e `agendaSettings`. Importações antigas continuam válidas; campos ausentes recebem valores padrão na migração para o schema 2.

## Estrutura

```
index.html
css/styles.css
js/constants.js              parâmetros configuráveis
js/models.js                 estruturas de dados
js/storage.js                localStorage, backup e JSON
js/analytics.js              totais, ritmo e alertas
js/recommendation-engine.js  motor de decisão
js/timer.js                  base do cronômetro
js/ui.js                     telas e componentes
js/app.js                    coordenação e eventos
js/seed-data.js              demonstração
assets/favicon.svg
```

## Dados e segurança

Os dados ficam somente no `localStorage` deste navegador. Limpar os dados do navegador pode apagá-los; exporte backups periodicamente. A importação valida a estrutura básica e mantém uma cópia automática em `proxima-acao-before-import`.

Não há integração automática com Evernote, sincronização, notificações ou backend.

## Motor de recomendação

O motor filtra tarefas que não cabem no bloco, exigem contextos ausentes ou energia indisponível. Depois pontua áreas e tarefas com valores centralizados em `constants.js`. Trabalho usa a tabela acumulada semanal interpolada; as demais áreas usam distribuição uniforme leve. Marketing e Desenvolvimento recebem bônus até cumprir uma sessão válida de 30 minutos. Lazer só é sugerido quando as condições deliberadas são atendidas.

Para 60 minutos, o motor compara a melhor ação longa com duas ações de 30 minutos e divide o bloco somente quando a cobertura semanal vence claramente.

## Ajustes e testes

As metas básicas podem ser alteradas na tela **Configurações**. Todos os parâmetros do motor, incluindo pesos, limites de ritmo, frequência, continuidade e proteção estratégica, estão reunidos em `js/constants.js`.

No console do navegador, execute `runRecommendationTests()` para expor a verificação manual dos cenários previstos. Como limitação consciente do MVP, uma sessão que atravessa meia-noite é contabilizada no dia de início.
