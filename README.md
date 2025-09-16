# Cocktail Wiki (React + TypeScript)

Liten wiki över drinkar som hämtar data från **The Cocktail DB**.
Appen har tre sidor: en **Landing** med slumpad drink, en **Search** för att söka på namn, och en **Cocktail Info** med detaljer.

## Tech & API

* **Vite + React + TypeScript**
* **React Router**
* **CSS Modules** (+ lite global CSS)
* **The Cocktail DB API** (`/random.php`, `/search.php`, `/lookup.php`)

## Funktioner

* **Landing Page**

  * Visar **slumpad cocktail** vid start
  * Knapp för **ny random**
  * “See more” → går till **Cocktail Info**
* **Search Page**

  * **Submit-form** (Enter funkar)
  * Sök på **namn**
  * **Lista med bara namn**
  * **Paginering** (max 10 per sida)
* **Cocktail Info Page**

  * Visar **kategori**, **bild**, **tags**, **glas**, **ingredienser + mått**
* **UI**

  * Centrerat **card**-layout
  * **Floating Drinks Background** (emojis som flyter bakom innehållet)
  * Enkla **loading-/error**-tillstånd

> Obs: Enligt uppgiften är sidan för Cocktail Info endast nåbar via Landing/Search (ingen direktlänk i headern).

## Kom igång

### 1) Klona & installera

```bash
git clone <repo-url>
cd cocktail-wiki
npm install
```
### 2) Kör

```bash
npm run dev      # starta utvecklingsserver ex (http://localhost:5173)
npm run build    # bygga för produktion
npm run preview  # förhandsgranska byggd version
```

## Användning

* **Landing**: se slumpad drink, klicka “Get another” för ny. “See more” → detaljer.
* **Search**: skriv ett namn (t.ex. *margarita*) och tryck **Search**. Klicka på ett namn i listan för detaljer.
* **Cocktail Info**: läser in all info för vald drink.

Lycka till & skål! 🍸
