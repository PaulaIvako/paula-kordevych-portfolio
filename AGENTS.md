# Instrukcja dla AI - Portfolio Paula Kordevych

## Szybki start dla AI

Ten projekt to portfolio UX/UI designerki zbudowane z **Vite** (build tool) + **vanilla HTML/CSS/JS**.

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

Serwer działa w sesji **tmux** (portfolio-server), więc możesz do niej wrócić:
```bash
./server.sh attach    # wejdź do sesji (Ctrl+B, D aby wyjść nie zatrzymując serwera)
```

### Struktura projektu

```
src/
├── components/          # Komponenty HTML (nie używane dynamicznie)
├── css/
│   ├── main.css        # Główny plik CSS (importuje wszystkie moduły)
│   ├── variables.css   # Kolory, zmienne CSS
│   ├── base.css        # Reset, typography
│   ├── components.css  # Przyciski, karty, tagi
│   ├── layout.css      # Nawigacja, layout
│   ├── sections/       # Style dla każdej sekcji osobno
│   └── responsive.css  # Media queries
├── js/
│   └── main.js         # Interakcje (dark mode, scroll, animacje)
├── data/
│   └── projects.json   # ŹRÓDŁO PRAWDY o projektach
├── projects/           # Strony case study
│   ├── pylio.html
│   ├── nimbus.html
│   └── hawktech.html
├── index.html          # Strona główna
└── about.html          # O mnie (opcjonalnie)

public/                 # Statyczne pliki (obrazki, fawikony)
├── Favicon/
└── assets/
    ├── projects/       # Obrazki projektów
    ├── about/          # Zdjęcie profilowe
    ├── certs/          # Certyfikaty
    └── visual/         # Projekty graficzne
```

---

## Jak dodać nowy projekt UX/UI

### Krok 1: Dodaj dane do `src/data/projects.json`

W sekcji `projects` dodaj nowy obiekt:

```json
{
  "id": "nazwa-projektu",
  "title": "Nazwa Projektu",
  "type": "Mobile App",
  "tags": ["UX/UI", "E-commerce"],
  "description": "Krótki opis na kartę projektu (1-2 zdania).",
  "color": "yellow|green|purple",
  "themeColor": "#HEXKOD",
  "featured": true,
  "caseStudy": {
    "subtitle": "Dłuższy opis pod tytułem na stronie case study.",
    "problem": "Opis problemu do rozwiązania.",
    "scope": "UX research, UI, design system",
    "reflection": "Opcjonalnie: wnioski z projektu.",
    "images": [
      "CS - Nazwa_1.png",
      "CS - Nazwa_2.png",
      "CS - Nazwa_3.png"
    ]
  }
}
```

### Krok 2: Dodaj obrazki

Umieść obrazki w:
- **Karta na stronie głównej:** nie potrzebna (kolory generowane przez CSS)
- **Case study:** `public/assets/projects/{id}/new-case/CS - Nazwa_X.png`

Nazewnictwo obrazków case study:
- `CS - NazwaProjektu_1.png` - strona 1
- `CS - NazwaProjektu_2.png` - strona 2
- itd.

### Krok 3: Stwórz stronę case study

Skopiuj `src/projects/pylio.html` i zmień:
1. `<title>` - tytuł strony
2. `<meta name="description">` - opis SEO
3. `<meta name="theme-color">` - kolor z JSON
4. `class="pylio-case"` na `class="{id}-case"`
5. Tytuł, opis i meta dane w `.case-header`
6. Ścieżki do obrazków
7. Nazwę pliku: `{id}.html`

### Krok 4: Dodaj kartę na stronę główną

W `src/index.html` w sekcji `#projekty` dodaj kartę projektu (skopiuj istniejącą i zmień dane):

```html
<article class="project-card project-card--{color}">
  <div class="project-card-top"></div>
  <div class="project-card-bottom">
    <h3>{title}</h3>
    <div class="project-tags">
      <span class="project-tag">{tag1}</span>
      <span class="project-tag">{tag2}</span>
    </div>
    <p class="project-desc">{description}</p>
    <a class="btn btn-rect project-btn" href="./projects/{id}.html">Więcej</a>
  </div>
</article>
```

### Krok 5: Dodaj style dla case study (opcjonalnie)

Jeśli projekt wymaga unikalnych stylów, dodaj w `src/css/sections/case-study.css`:

```css
body.{id}-case {
  background: {kolor-tła};
}

.{id}-case .case-meta-card {
  background: rgba(R, G, B, 0.16);
  border-color: rgba(R, G, B, 0.34);
}
```

---

## Jak zmienić wygląd istniejącej sekcji

### Znajdź odpowiedni plik CSS:

| Sekcja | Plik |
|--------|------|
| Nawigacja | `src/css/layout.css` |
| Hero (główny baner) | `src/css/sections/hero.css` |
| Karty projektów | `src/css/sections/projects.css` |
| Projekty graficzne | `src/css/sections/visual-work.css` |
| Proces projektowy | `src/css/sections/process.css` |
| Umiejętności | `src/css/sections/skills.css` |
| O mnie | `src/css/sections/about.css` |
| Kontakt | `src/css/sections/contact.css` |
| Strony case study | `src/css/sections/case-study.css` |
| Kolory, zmienne | `src/css/variables.css` |
| Przyciski | `src/css/components.css` |
| Mobile/tablet | `src/css/responsive.css` |

### Zmiana kolorów:

Edytuj `src/css/variables.css`:

```css
:root {
  --bg: #nowy-kolor-tła;
  --text: #nowy-kolor-tekstu;
  --accent-blue: #nowy-niebieski;
  --accent-pink: #nowy-różowy;
  /* ... */
}
```

---

## Jak dodać nową sekcję na stronę główną

1. **Stwórz plik CSS** w `src/css/sections/nowa-sekcja.css`
2. **Dodaj import** w `src/css/main.css`:
   ```css
   @import './sections/nowa-sekcja.css';
   ```
3. **Dodaj HTML** w `src/index.html`:
   ```html
   <section class="section reveal" id="nowa-sekcja">
     <h2>TYTUŁ SEKCJI</h2>
     <!-- zawartość -->
   </section>
   ```
4. **Dodaj link w nawigacji** w `src/index.html` i w headerach stron projektów

---

## Jak zmienić treści (teksty)

### Stałe treści:
- **Strona główna:** `src/index.html`
- **O mnie:** sekcja `#o-mnie` w `src/index.html`
- **Kontakt:** sekcja `#kontakt` w `src/index.html`

### Projekty:
- **Dane:** `src/data/projects.json`
- **Case study:** poszczególne pliki w `src/projects/`

---

## Budowanie i deploy

### Lokalny development (użyj skryptu):
```bash
./server.sh start    # uruchom serwer
./server.sh open     # otwórz w przeglądarce
./server.sh logs     # zobacz logi
./server.sh stop     # zatrzymaj serwer
```

### Budowanie produkcyjne:
```bash
npm run build
```

Wynik trafia do folderu `dist/`, który jest serwowany przez Nginxa w Dockerze.

### Docker (produkcja):
```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio
```

---

## Ważne zasady

1. **Zawsze używaj ścieżek absolutnych** dla obrazków: `/assets/projects/...`
2. **Nie edytuj plików w `dist/`** - są generowane automatycznie
3. **Cache busting** działa automatycznie przez Vite (dodaje hash do nazw plików)
4. **Dark mode** - zmienne CSS w `variables.css` obsługują automatycznie tryb ciemny
5. **Responsywność** - wszystkie zmiany sprawdzaj w `responsive.css`

---

## Kontakt do właścicielki

- Email: kordevych.paula@gmail.com
- Behance: https://www.behance.net/paulakordevych

---

*Ostatnia aktualizacja: Marzec 2026*