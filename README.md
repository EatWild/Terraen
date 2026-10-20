# Teknisk dokumentation – Gruppe 7: Terræn opskrifter

## Om projektet

Dette projekt er lavet som en del af Tema 8.
Vi har lavet et dynamisk website med HTML, CSS og JavaScript, hvor opskrifterne bliver hentet fra dummyJson.com.

Sitet består af flere sider, hvor brugeren kan:

- se en liste med indhold
- klikke sig videre til en detaljeside
- bruge relevant filtrering
- se merch

## Links

- [GitHub Repository EatWild](https://github.com/EatWild/Terraen)
- [Github Pages Terraen](https://eatwild.github.io/Terraen/)
- [Figma Prototype](https://www.figma.com/design/n0G60vsrpcZSviCwX02nAS/Design-process?node-id=17-7&t=zpXhIhjwRTuYp4K0-1)
- [Trello board](https://www.figma.com/board/d9jMUGyu57mwnGYhlQ47IT/Process--n-stuff-?node-id=34-239&t=x9muFoDnaTenIzfY-1)

---

## Projektstruktur

Projektet er opdelt i HTML, CSS og JavaScript-filer.

```
Terrean/
├── index.html
├── productlist.html
├── singleview.html
├── merch.html
├── merchprodukt.html
├── css/
│   ├── custom.css
│   ├── general.css
│   ├── index.css
│   ├── merch.css
│   ├── merchprodukt.css
│   ├── productlist.css
│   ├── singleview.css
├── js/
│   ├── generel.js
│   ├── index.js
│   ├── merchprodukt.js
│   ├── productlist.js
│   └── singleview.js
├── README.md
├── imgs/
└── favicon/
```

### Filbeskrivelser

- **index.html** – forsiden
- **productlist.html** – viser en liste af opskrifter med data fra API'et
- **singleview.html** – viser detaljer om en valgt opskrift
- **merch.html** – viser en liste af merch produkter
- **merchprodukt.html** – viser detaljer om det valgte merch produkt
- **general.css** – global css fil
- **custom.css** - global css fil
- **index.css, productlist.css, merch.css osv.** – de lokale css filer, der kun er linket til den enkelte side
- **JavaScript-filer** – generel.js er global, de resterende styrer det dynamiske indhold på de forskellige sider.

---

## Hvordan koden fungerer

Vi har lavet en globals CSS fil, samt en global JS fil, hvor vores universelle elementer kodes, f.eks sitets reset, fonts, header + footer og andre gentagende elementer.
De resterende css og js filer er lokale for deres dertilhørende html side.

### index.js

Bruges på forsiden.
Her bliver indhold vist dynamisk, fx links eller kategorier.

### productlist.js

Henter data fra Rest API'et og viser en liste med opskrifter på siden. Opskrifterne loopes med forEach, og bliver alle vist på samme måde i HTML'en, så de ikke skal kodes manuelt, men indsættes automatisk.
Filtreringsknapperne kan filtrere individuelt og på tværs af hinanden, ved hjælp af en række if-statements.

**Flow:**

1. Siden loader
2. JavaScript kører
3. Data hentes fra Rest API
4. Data bliver gennemgået med loop
5. HTML bliver indsat i DOM'en
6. Brugeren kan klikke på en opskrift

### singleview.js & merchproduct.js

Bruges til detaljesiderne. Den læser et id fra URL'en og henter derefter den rigtige opskrift fra API'et.

Det gør det muligt at genbruge den samme HTML-side til mange opskrifter. I stedet for at lave én side per opskrift, bruger vi ét id i URL'en til at vise det rigtige indhold.

### generel.js

Global js fil der har en clickhandler til menu'en i headeren, i mobil visning, så det ikke skulle gentages i de lokale filer.

---

## Navngivning

Vi har navngivet vores filer, variabler og funktioner så de så tydeligt som muligt er selvforklarende.

### Eksempler på variabler

```javascript
const currentUrl;
const listContainer;
let allData;
let selectedWeight;
let selectedTime;
```

### Eksempler på funktioner

```javascript
btnClickedWeight();
btnClickedTime();
btnClickedUdstyr();
filterRecipes();
udregnTid();
```

Vi har brugt camelCase i JavaScript, fordi det gør koden mere ensartet og lettere at læse.

---

## Kommentarer i koden

Vi har kommenteret de steder i koden, hvor det giver mening.
Fx ved funktioner, fetch-kald og steder hvor der sker DOM-manipulation.

**Eksempel:**

```javascript
// //Udregning/"lommeregner"
const udregnTid = (forberedelsesTid, tilberedningsTid) => {
  return forberedelsesTid + tilberedningsTid;
};
```

Vi har prøvet ikke at skrive kommentarer til helt åbenlyse ting, men kun dér hvor det hjælper forståelsen.

---

## Data og JSON-struktur

Vi henter data fra et API i JSON-format.

**Et objekt kan fx se sådan ud:**

```json
{
  "id": 26,
  "name": "Mexican Street Corn (Elote)",
  "ingredients": ["Corn on the cob", "Mayonnaise", "Cotija cheese, crumbled", "Chili powder", "Lime wedges"],
  "instructions": ["Grill or roast corn on the cob until kernels are charred.", "Brush each cob with mayonnaise, then sprinkle with crumbled Cotija cheese and chili powder.", "Serve with lime wedges for squeezing over the top.", "Enjoy this delicious and flavorful Mexican Street Corn!"],
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 15,
  "servings": 4,
  "difficulty": "Easy",
  "cuisine": "Mexican",
  "caloriesPerServing": 180,
  "tags": ["Elote", "Mexican", "Street food"],
  "userId": 93,
  "image": "https://cdn.dummyjson.com/recipe-images/26.webp",
  "rating": 4.6,
  "reviewCount": 2,
  "mealType": ["Snack", "Side Dish"]
}
```

### Felter vi bruger

- **id** – bruges bla. til at sende brugeren videre til detaljesiden
- **name** – opskriftsnavn
- **instructions** – instruktioner til opskriften
- **ingredients** – ingrediens liste
- **prepTimeMinutes** – forberedelsestid i minutter
- **cookTimeMinutes** – tilberedningstid i minutter
- **image** – billede af retten

---

## Git og branches

Vi har brugt GitHub til at samarbejde om projektet.

Vi har arbejdet med branches, så vi ikke sad og ændrede i det samme på samme tid.

Vi navngav branchene efter deres formål, og til de 3 obligatoriske sider skrev vi vores navn på.

### Eksempler på branches

- `index_johanne`
- `singleview-kamilla`
- `header-footer`
- `productlist-laura`

### Workflow

1. Lave en branch med navn på gøremålet og evt. eget navn til sidst
2. Kode en feature
3. Committe ændringer
4. Pushe til GitHub
5. Merge til main når det virkede

Det gjorde det nemmere at holde styr på, hvem der lavede hvad.

---

## Bæredygtighed

Vi har tænkt bæredygtighed ind i projektet ved at holde page weight under 250 kb samt en enkel informationasarkitektur.

**Tiltag:**

- Ingen videoer
- Ingen tunge frameworks
- Genbruge af kode
- Optimerede billeder

---

## Udfordringer undervejs

En af vores udfordringer var at filtrere opskrifterne efter tilberednings udstyr, da udstyr ikke er et eksisterende objekt i API'et (og vi ikke måtte ændre i API'et).

**Løsninger:**

- Manuel fordeling af udstyr pr. opskrift, til hvert enkelte id. Når opskriften bliver hentet (fetch), tilføjes udstyret som recipe.udstyr
- Console.log data undervejs, samt sparring med vsCode Copilot
- Teste fetch-kald separat

---

## Mulige forbedringer

Hvis vi skulle arbejde videre med projektet, kunne vi forbedre det ved at tilføje:

- Lave vores manuelle udstyr pr. opskrifts liste som Json
- Vis mere knap på opskrifter, så alle 50 opskrifter ikke loades by default
- Færdiggøre opskrifter efter landskaber

---

## Gruppemedlemmer

- Laura Tagholm
- Johanne Hagsteen Staal
- Kamilla Krattet Nielsen
