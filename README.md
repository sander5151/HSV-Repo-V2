# HSV-Website Project

test

Als vereniging willen we natuurlijk dat onze online aanwezigheid helemaal up-to-date is en past bij wat onze leden nodig hebben. Momenteel gebruiken we Congressus voor onze website, maar eerlijk gezegd beginnen de kosten een beetje uit de hand te lopen. Dat brengt ons bij dit project: we gaan kijken naar de mogelijkheden om onze huidige website te vervangen door een eigen, op maat gemaakte oplossing.

Het idee is om iets te bouwen dat beter aansluit bij wie we zijn en wat we willen doen, zonder dat het ons financieel de kop kost. In dit document zetten we de eerste stappen in de richting van een nieuwe website-opzet. We richten ons op drie belangrijke onderdelen: de publieke site ([www.hanzestudentenbelangen.nl](https://www.hanzestudentenbelangen.nl)), een dashboard voor onze leden ([dashboard.hanzestudentenbelangen.nl](https://dashboard.hanzestudentenbelangen.nl)) en een beheerdersportaal ([admin.hanzestudentenbelangen.nl](https://admin.hanzestudentenbelangen.nl)) waar we alle administratie kunnen regelen.

---

## Inhoudsopgave
1. [Technologieën en Tools](#technologieën-en-tools)
    1. [Front-end Technologieën](#front-end-technologieën)
    2. [Back-end Technologieën](#back-end-technologieën)
    3. [DevOps en Deployment](#devops-en-deployment)
2. [Structuur & Rollen](#structuur--rollen)
    1. [Structuur](#structuur)
        1. [Public Project](#public-project)
        2. [Dashboard Project](#dashboard-project)
        3. [Admin Project](#admin-project)
    2. [Rollen](#rollen)
3. [Kosten](#kosten)
4. [Design & Layout](#design--layout)

---

## Technologieën en Tools
In deze sectie beschrijven we de voorgestelde technologieën en tools die zullen worden gebruikt voor de ontwikkeling en het beheer van de nieuwe website, met als basis de T3-Stack en een zelfgehoste oplossing op een VPS.

### Front-end Technologieën
- **Framework: Next.js (met App Router)**
- **Styling: Tailwind CSS**
- **UI Componenten: ShadCN UI**
- **Icons: React Icons**

### Back-end Technologieën
- **TypeScript**
- **API communicatie: tRPC**
- **Database: Prisma ORM**
- **Authenticatie: NextAuth.js**
- **Betalingen: Stripe**
- **Storage: Lokaal op VPS / Google Drive voor foto's etc**

### DevOps en Deployment
- **Server: Linux VPS (Ubuntu headless)**
- **Database: Docker container PostgreSQL**
- **Hosting: PM2 met Nginx als reverse proxy**
- **SSL certificaat: Certbot**
- **Monitoring en Logging: Posthog**
- **Versiebeheer: Git met GitHub repository**

---

## Structuur & Rollen
In deze sectie beschrijven we de belangrijkste functies die elk deelproject binnen de HSV-Repo moet bevatten. Elk project - Public, Dashboard, en Admin - heeft een unieke set van functies die zijn afgestemd op de specifieke behoeften van de gebruikers.

### Structuur
#### Public Project
Het Public Project fungeert als de publieke website van de vereniging. Het is het eerste contactpunt voor nieuwe en potentiële leden en biedt algemene informatie over de vereniging, aankomende evenementen, en nieuws.

#### Dashboard Project
Het Dashboard Project is de centrale hub voor leden, waar zij hun activiteiten, evenementen, berichten en meer kunnen beheren.

#### Admin Project
Het Admin Project fungeert als de beheerdersinterface van de vereniging, gericht op ledenbeheer, evenementbeheer, financiën en communicatie.

### Rollen
Binnen de Hanze Studenten Belangen Vereniging zijn er verschillende rollen die elk een specifieke set van verantwoordelijkheden en taken omvatten.

- **Bezoeker**
- **Lid**
- **Bestuur**
    - Voorzitter
    - Secretaris
    - Penningmeester
    - Intern Coördinator
    - Extern Coördinator
- **Fractie**
    - Fractievoorzitter
    - Fractiesecretaris
    - Fractielid
- **Beheerder**
- **Raad van Toezicht**

---

## Kosten
| Wat | Prijs per maand | Prijs totaal | Link |
| --- | --- | --- | --- |
| **VPS** | 6,95 € | 158,16 € | [www.hostinger.nl/vps-hosting](https://www.hostinger.nl/vps-hosting) |
| **Domein** | 1,00 € | 12,00 € | [www.mijndomein.nl](https://www.mijndomein.nl/) |
| **Stripe payment** | 5,21 € | 125,00 € | [stripe.com/en-nl/payments](https://stripe.com/en-nl/payments) |

---

## Design & Layout
### Lettertype
### Kleuren
### Stockimages
