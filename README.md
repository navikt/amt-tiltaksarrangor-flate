# AMT Tiltaksarrangør Flate

Flate for tiltaksarrangør. 

## Demo applikasjon

En demo versjon av applikasjonen kan testes gjennom lenken nedenfor.
All dataen i demo appen er mocket. Demoen vil i mest mulig grad være lik den reelle applikasjonen, men det kan oppstå differanser.

https://navikt.github.io/amt-tiltaksarrangor-flate/

## Kjør lokalt mot lokal backend
Hvis man ønsker å teste med en backend som kjører lokalt på PCen/MACen
så sett følgende innhold i **.env.local**:

```.env
REACT_APP_MOCK_REQUEST_HANDLER=local
REACT_APP_MOCK_REQUEST_AUTH_HEADER=Bearer <TOKEN>
```

## Kjør lokalt mot preprod med proxy
Hvis man ønsker å teste med en reel backend i testmiljøet lokalt fra PCen/MACen
så sett følgende innhold i **.env.local**:

```.env
REACT_APP_MOCK_REQUEST_HANDLER=dev
REACT_APP_MOCK_REQUEST_COOKIE=io.nais.wonderwall.session=<SESSION_COOKIE>
```

Sørg for å hente en ekte session cookie og bytt den ut med `<SESSION_COOKIE>`.
**.env.local** er lagt til i .gitignore og vil ikke bli commitet.

Kjør opp dev-proxyen med `docker compose up -d` og start deretter applikasjonen med `npm start`.

## Kjør med vanlig mocking
For å kjøre med mocks så sett følgende innhold i **.env.local** eller slett innholdet/filen:

```.env
REACT_APP_MOCK_REQUEST_HANDLER=mock
```
