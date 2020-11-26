## Ricezione ed elaborazione della risposta

> ## Casi di successo
1. L'Handler riceve la richiesta
2. L'Handler verifica la validità del CF
3. L'Handler verifica la previa autorizzazione del CF con l'API
4. L'Handler invia il messaggio al CF con l'API
5. L'Handler ritorna l'ID del messaggio inviato al CF

> ## Eccezione - CF non valido
1. L'Handler non verifica la validità del codice
2. L'Handler ritorna un errore appropriato

> ## Eccezione - CF valido ma non autorizzato
1. L'Handler verifica la validità del CF
2. L'Handler verifica la non autorizzazione del CF con l'API
3. L'Handler ritorna un errore appropriato