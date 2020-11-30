# Progetto NodeJS con Architettura Pulita

L'obiettivo del progetto è creare una API con una architettura ben definita e disaccoppiata, utilizzando un approccio di sviluppo orientato al TDD (Test Driven Development), osservando i principi **SOLID** e appplicando, dove possibile, soluzioni con **Design Pattern** per problemi comuni.

## Idea del Progetto

Un Server è in grado di accogliere richieste in entrata e di produrre delle risposte in uscita processate da uno o più Gestori (Handler) che concorrono all'elaborazione corretta della risposta. Il Server, tramite un Router, prevede una serie di rotte (endPoints) interrogate tramite architettura REST e quindi esporre risorse accessibili tramite Verbs Http.
Quando arriva una Request in ingresso, questa deve soddisfare una mappatura che richiamerà, per la rotta interrogata, uno o più Handler.
Ogni Handler può ricevere il dato elaborato dal precedente Handler o vedersi interrompere la catena (es. mancata autorizzazione).
Un Handler riceve un header ed un body della Request. Per questo va prevista una interfaccia o un adapter in quanto devo elaborare request provenienti da Express o Http di NodeJS.

> #### Server:
> #### Handler:
> #### Request: Response:

## Principi dell'applicazione (SOLID)

* Principio della Singole Responsabilità (SRP)
* Principio dell'Apertura-Chiusura (Open Closed) (OCP)
* Principio della Sostituzione di Liskov (LSP)
* Principio della Segregazione dell'interfaccia (ISP)
* Principio dell'inversione della dipendenza (DIP)
* Non ripeterti (DRY)
* Composizione al posto dell'ereditarietà
* Piccoli commit

## Dipendenze Particolari

* git-commit-msg-linter: per creare commit con regole standard [Link](https://www.npmjs.com/package/git-commit-msg-linter)
* tsconfig-path: mi serve per utilizzare le path definite in tsconfig con ts-node [ISSUE](https://github.com/TypeStrong/ts-node/issues/138)
* ts-jest: per avere TypeScript on-the-fly con Jest

## Avviare il progetto

Per utilizzare il progetto devi creare un file `.env` nella root contenente la variabile di ambiente API_SECRET, questa verrà letta in environment di tipo development, in alternativa puoi settare una variabile di ambiente nel tuo sistema operativo:

```
API_SECRET = inserisci_la_tua_api_pagopa
```

Per avviare, clona il progetto e da shell avvia l'installazione dei packages e l'avvio in dev mode:

```
npm i
npm run dev
```