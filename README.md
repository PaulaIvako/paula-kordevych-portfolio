# Paula Kordevych Portfolio

Portfolio UX/UI z wybranymi case studies:
- Pylio
- Nimbus
- HawkTech

## Stack
- HTML
- CSS
- JavaScript

## Local preview
Otwórz `index.html` w przeglądarce.

## Docker
Zbudowanie obrazu lokalnie:

```bash
docker build -t paula-kordevych-portfolio .
```

Uruchomienie kontenera:

```bash
docker run --rm -p 8080:8080 paula-kordevych-portfolio
```

Strona będzie dostępna pod `http://localhost:8080`.

## GHCR
Repozytorium ma workflow GitHub Actions w `.github/workflows/ghcr.yml`, który publikuje obraz do:

```text
ghcr.io/paulaivako/paula-kordevych-portfolio
```

Publikacja uruchamia się po pushu do brancha `main` albo ręcznie przez `workflow_dispatch`.
