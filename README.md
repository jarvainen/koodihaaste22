# Koodihaaste22

## Palautuksen tiedot

Kehitystyö on tehty Linuxilla. Teknologiat listattu frontendin repositoriossa. 
E2E testeihin käytetty cypressia. Ympäristön pystyttämiseen docker ja docker-compose.

Yksityiskohtaisemmat tiedot löytyy frontend kansion README.md tiedostosta.

## Running with docker

### Requirements

- docker
- docker-compose

### Installation

```bash
docker-compose up --build
```

### End-to-end tests

Uncomment e2e-tests from docker compose and run `docker-compose up`