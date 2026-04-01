# Instrukcja dla AI - Portfolio Paula Kordevych

## Stack technologiczny

**Astro + Tailwind CSS**

- **Astro** - framework do generowania statycznych stron
- **Tailwind CSS** - utility-first CSS framework
- **TypeScript** - typowanie (opcjonalne w komponentach)

## Szybki start dla AI

### Uruchamianie serwera deweloperskiego

Użyj skryptu `server.sh`:

```bash
# Uruchom serwer
./server.sh start

# Otwórz stronę w przeglądarce
./server.sh open

# Sprawdź logi
./server.sh logs

# Sprawdź status
./server.sh status

# Zatrzymaj serwer
./server.sh stop
```

Serwer działa w sesji tmux (portfolio-server), więc możesz do niej wrócić:
```bash
./server.sh attach    # wejdź do sesji (Ctrl+B, D aby wyjść nie zatrzymując serwera)
```

### Struktura projektu Astro

```
astro-portfolio/
├── src/
│   ├── assets/              # Obrazki, pliki (optymalizowane przez Astro)
│   │   ├── projects/        # Projekty (p1, p2, p3, visual)
│   │   ├── about/           # Zdjęcie profilowe
│   │   ├── certs/           # Certyfikaty
│   │   └── components/      # Elementy graficzne
│   ├── components/          # Komponenty Astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── sections/        # Sekcje strony głównej
│   ├── data/
│   │   └── projects.json    # ZRÓDŁO PRAWDY o projektach
│   ├── layouts/
│   │   ├── Layout.astro     # Główny layout
│   │   └── CaseStudy.astro  # Layout dla case study
│   ├── pages/               # Routing oparty na plikach
│   │   ├── index.astro      # Strona główna
│   │   └── projects/        # Case study
│   ├── scripts/
│   │   └── theme.js         # Dark mode + scroll
│   └── styles/              # (opcjonalnie) dodatkowe style
├── public/
│   └── Favicon/             # Favicony (kopiowane bez zmian)
├── astro.config.mjs         # Konfiguracja Astro
├── tailwind.config.mjs      # Konfiguracja Tailwind
├── server.sh                # Skrypt zarządzający serwerem
├── Dockerfile               # Docker dla produkcji
└── nginx.conf               # Konfiguracja nginx
```

## Dodawanie nowego projektu UX/UI

### Krok 1: Dodaj dane do src/data/projects.json

W sekcji `projects` dodaj nowy obiekt z polami: id, title, type, tags, description, color, themeColor, featured, caseStudy.

### Krok 2: Dodaj obrazki

Umieść obrazki case study w: src/assets/projects/pX/new-case/CS - Nazwa_X.png

### Krok 3: Stwórz stronę case study

Utwórz plik src/pages/projects/{id}.astro uzywajac komponentu CaseStudy z odpowiednimi props.

## Workflow dla agentów AI

### Uruchomienie projektu
1. `./server.sh start` - uruchamia serwer na porcie 3000
2. `./server.sh open` - otwiera w przeglądarce
3. Wprowadzaj zmiany w plikach `.astro`
4. Astro automatycznie odświeży przeglądarkę (HMR)

### Zmiana stylów
- Używaj Tailwind classes zamiast custom CSS
- Kolory i breakpointy są w tailwind.config.mjs
- Customowe style tylko w komponentach gdy konieczne

### Dark mode
- Automatycznie obsługiwany przez klasę .dark
- Kolory dark mode są w tailwind.config.mjs
- Skrypt w src/scripts/theme.js obsługuje przełącznik i localStorage

## Budowanie produkcyjne

```bash
npm run build
```

Wynik trafia do folderu `dist/`.

## Docker (produkcja)

```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio
```

## Ważne zasady

1. Zawsze uzywaj ścieżek absolutnych dla obrazków: /assets/projects/...
2. Nie edytuj plików w dist/ - są generowane automatycznie
3. Dark mode działa automatycznie przez Tailwind (dark: prefix)
4. Responsywność przez klasy Tailwind (md:, lg:)

## Kontakt do właścicielki

- Email: kordevych.paula@gmail.com
- Behance: https://www.behance.net/paulakordevych

---
Migracja z Vite na Astro: 2026-04-01
Poprzedni commit: 3b0e0b7fdb08e35a4d3b931e43b6860ebb82cfdb
