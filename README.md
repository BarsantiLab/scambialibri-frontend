# Scambialibri - API

**Scambialibri** è una piattaforma Web per la compravendita di libri scolastici trasversalmente all'istituto di appartenenza, mettendo in comunicazione i venditori con gli eventuali compratori.

### Prerequisiti

Per poter girare correttamente ha bisogno dei seguenti software:

- Node.js v8+
- `angular-cli` v6+
- Shell bash (per lo script di deploy, non fondamentale)

### Installazione

Per installare il progetto si può usare il seguente script:

```sh
git clone git@github.com:BarsantiLab/scambialibri-frontend.git
cd scambialibri-frontend
npm install
```

Una volta installati i pacchetti il frontend è pronto per essere avviato.

### Avvio

Per avviare il progetto sulla macchina locale è sufficiente lanciare questo comando:

```
npm start
```

Verranno compilati i file e il frontend verrà servito all'indirizzo `http://localhost:8080`. Per modificare le impostazioni riguardo il tool di compilazione consultare il file [`.angular-cli.json`](.angular-cli.json), mentre per le impostazioni del frontend vedere i file dentro la cartella [`environments`](/src/environments).

## Deploy

Per il deploy al momento viene utilizzato un semplice script bash ([`build.sh`](/build.sh)) che compila i sorgenti, crea un archivio compresso con l'output e in base all'environment specificato carica su diverse directory remote tramite `scp`. Dopo aver caricato l'archivio invia un comando via `ssh` per decomprimere l'archivio caricato. A differenza del backend non è necessario riavviare il processo con `pm2` perché verrà caricata soltanto la parte statica.

Per adattarlo alle proprie macchine cambiare le righe 33 e 34 cambiando l'URL, eventualmente l'utente e la path sulla quale vengono caricati gli archivi.

Questo è solo una misura temporanea, in futuro verrà attivato [CircleCI](https://circleci.com/) per le operazioni ci Continuous Integration e Continuous Delivery (vedi [Progetti futuri](#progetti-futuri)).

## Progetti futuri

Questa è una lista delle modifiche future che verranno implementate man mano lato frontend. Non sono in ordine temporale, né di importanza.

- [ ] Integrazione con [CircleCI](https://circleci.com/) per continuous integration/delivery e [CodeClimate](https://codeclimate.com/) per la quality assurance.
- [ ] Creazione di un container Docker (trasversale a tutti i progetti LoScambialibri.it).
- [ ] Integrazione di unit testing per le API.
- [ ] Integrazione di un client MQTT per la chat real-time.
- [ ] Integrazione automatica di una strategia di [SemVer](https://semver.org/).
- [ ] Integrazione di stategie di localizzazione e internaziolizzazione, comprendente la traduzione completa del frontend.

## Contributori cercasi!

LoScambialibri.it è sempre in cerca di menti che si uniscano nel progetto, in modo di condividere le proprie conoscenze e mettersi a confronto con altri colleghi!

Per avere maggiori informazioni consulta [CONTRIBUTING.md](/CONTRIBUTING.md) e leggi su come fare la tua parte!

## Progetti di LoScambialibri.it

- [`scambialibri-api`](https://github.com/BarsantiLab/scambialibri-api): server REST che fornisce le API per questo frontend.

## Autori

* **Davide Rossetto** - *Reviewer and first maintainer* - [DavideRoss](https://github.com/DavideRoss)
* **Marco Rubin** - *Presidente di LoScambialibri.it e tester*

## Licenza

Il progetto è coperto dalla licenza MIT - vedere la [LICENSE](LICENSE) per i dettagli.
