# AMT Tiltaksarrangør Flate

Flate for tiltaksarrangør. 

## Demo applikasjon

En demo versjon av applikasjonen kan testes gjennom lenken nedenfor.
All dataen i demo appen er mocket. Demoen vil i mest mulig grad være lik den reelle applikasjonen, men det kan oppstå differanser.

https://navikt.github.io/amt-tiltaksarrangor-flate/

## Kjør lokalt mot preprod med proxy
Hvis man ønsker å teste med en reel backend i preprod lokalt så kan man ta i bruk dev-proxyen.

Opprett filen **.env.local** med følgende innhold:
```.env
REACT_APP_MOCK_DEV_PROXY_ENABLED=true
REACT_APP_MOCK_DEV_PROXY_COOKIE=io.nais.wonderwall.session=<SESSION_COOKIE>
```

Sørg for å hente en ekte session cookie og bytt den ut med `<SESSION_COOKIE>`.
**.env.local** er lagt til i .gitignore og vil ikke bli commitet.

Kjør opp dev-proxyen med `docker compose up -d` og start deretter applikasjonen med `npm start`.

For å skru av proxyen sett `REACT_APP_MOCK_DEV_PROXY_ENABLED=false` i **.env.local**.
