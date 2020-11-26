# BDD Specs

Dall'analisi effettuata con la BDD mi ritrovo i miei use case e quindi viene esplicitato il mio dominio. Inoltre vengono evidenziati frammenti di scenari che si ripetono e che possono essere astratti per essere riutilizzati in altre storie e scenari. Evita l'accoppiamento tra classi concrete.

## Storia 1

```
Come Server voglio poter accettare richieste di ingresso in modo da elaborare una risposta
```

### Scenario 1

```
Il server è in ascolto e riceve una richiesta mappata
Dato un server avviato
e in ascolto in una determinata porta
Quando arriva la richiesta in ingresso
Allora il server identifica la route
e la route viene elaborata
e viene inviata la risposta
```

### Scenario 2

```
Il server è in ascolto e riceve una richiesta non mappata
Dato un server avviato
e in ascolto in una determinata porta
Quando arriva la richiesta in ingresso
Allora il server non identifica la route
e viene fornito un messaggio di errore
e viene inviata la risposta
```

### Scenario 3

```
Il server è in ascolto e riceve una richiesta ma non ha mappe
Dato un server avviato
e in ascolto in una determinata porta
Quando arriva la richiesta in ingresso
Allora il server non identifica la route
e viene fornito un messaggio di errore
e viene inviata la risposta
```

Lo scenario 2 e 3 portano allo stesso comportamento del sistema per il mondo esterno.

## Storia 2

```
Come Client voglio inviare un messaggio ad un codice fiscale valido
```

### Scenario 1

```
Si riceve una richiesta mappata che verrà elaborata dall'handler appropriato
Dato l'handler di gestione di richiesta
Quando l'handler elabora la richiesta
e verificata la validità del codice fiscale
e verificata la possibilità di inviare messaggi al codice fiscale
Allora interroga l'API esterna
e viene fornito l'ID del messaggio
e viene inviata la risposta
```

### Scenario 2

```
Si riceve una richiesta mappata ma con CF non valido
Dato l'handler di gestione di richiesta
Quando l'handler elabora la richiesta
e verificata la non validità del codice fiscale
Allora non interroga l'API esterna
e viene elaborato un messaggio di errore
e viene inviata la risposta
```

### Scenario 3

```
Si riceve una richiesta mappata ma con CF valido ma non autorizzato a ricevere messaggi
Dato l'handler di gestione di richiesta
Quando l'handler elabora la richiesta
e verificata la validità del codice fiscale
e verificata la non possibilità di inviare messaggi al codice fiscale
Allora non interroga l'API esterna
e viene elaborato un messaggio di errore
e viene inviata la risposta
```