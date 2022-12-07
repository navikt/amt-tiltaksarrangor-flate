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
VITE_MOCK_REQUEST_HANDLER=local
VITE_MOCK_REQUEST_AUTH_HEADER=Bearer <TOKEN>
```

## Kjør lokalt mot preprod med proxy
Hvis man ønsker å teste med en reel backend i testmiljøet lokalt fra PCen/MACen
så sett følgende innhold i **.env.local**:

```.env
VITE_MOCK_REQUEST_HANDLER=dev
VITE_MOCK_REQUEST_COOKIE="<ALL REQUEST COOKIES>"
```

Logg inn i testmiljø og hent alle cookies fra request header og bytt de ut med `<ALL REQUEST COOKIES>`
**.env.local** er lagt til i .gitignore og vil ikke bli commitet.

### Eksempel:
```.env
VITE_MOCK_REQUEST_HANDLER=dev
VITE_MOCK_REQUEST_COOKIE="io.nais.wonderwall.session=Fx8oqzvi5FhS5y4TYHXIYliXHT9fNs6/EXAMPLE/dgAxwY5H9S1qrdgg9E4Y+xv76lmv4bWggPZLr3hTZ12mViRYskEeGxpOPf8UvceXxOy5oYOESdLI; innloggingsstatus-token=eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJpbm5sb2dnaW5nc3N0YXR1cy1kZXYiLCJzdWIiOiIyNzg0OTA5ODE3NCIsImFjciI6IkxldmVsNCIsImlzcyI6ImlubmxvZ2dpbmdzc3RhdHVzLWRldiIsImV4cCI6MTY2NjA5ODcwMywiaWF0IjoxNjY2MDk1MTAzfQ.p4sXJFdopUa9s2PzzTzNLT-7easXEKMq9Bi7vhe69AUjlDsioSsKW7P3TPs3j5c3MALExample"
```

Kjør opp dev-proxyen med `docker compose up -d` og start deretter applikasjonen med `npm start`.

## Kjør med vanlig mocking
For å kjøre med mocks så sett følgende innhold i **.env.local** eller slett innholdet/filen:

```.env
VITE_MOCK_REQUEST_HANDLER=mock
```
