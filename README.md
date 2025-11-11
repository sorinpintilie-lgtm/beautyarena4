# BeautyArena - Produse Premium de Frumusețe

BeautyArena este un site web modern pentru un salon de frumusețe din Cluj-Napoca, construit cu React și Vite. Oferă o experiență completă pentru clienții care doresc să descopere produse premium și servicii profesionale de frumusețe.

## 🌟 Caracteristici

- **Design Responsiv**: Adaptat pentru desktop, tabletă și mobil
- **Interfață Modernă**: Interfață elegantă cu gradienți și animații
- **Localizare Română**: Complet tradus în română
- **Componente Interactive**: Formulare de contact, programări, newsletter
- **Optimizat pentru SEO**: Meta tags și structură optimizată
- **Performanță Ridicată**: Bundle-uri optimizate pentru producție

## 🚀 Tehnologii Utilizate

- **React 19** - Bibliotecă JavaScript pentru interfețe utilizator
- **Vite** - Tool de build rapid și dev server
- **Tailwind CSS 4** - Framework CSS utility-first
- **Lucide React** - Iconuri moderne
- **React Router 7** - Routing pentru Single Page Application
- **React Hot Toast** - Notificări elegante

## 📦 Instalare și Rulare

### Prerequisites
- Node.js (versiunea 18 sau mai nouă)
- npm sau pnpm

### Instalează dependențele:
```bash
npm install
```

### Rulează în mod dezvoltare:
```bash
npm run dev
```

### Build pentru producție:
```bash
npm run build
```

### Previzualizare build:
```bash
npm run preview
```

## 🛠️ Structura Proiectului

```
beautyarena/
├── public/                 # Fișiere statice
├── src/
│   ├── components/        # Componente React
│   │   ├── sections/     # Secțiuni principale
│   │   ├── layout/       # Layout components
│   │   ├── common/       # Componente comune
│   │   ├── product/      # Componente produse
│   │   ├── cart/         # Coș de cumpărături
│   │   ├── auth/         # Autentificare
│   │   └── shop/         # Componente magazin
│   ├── pages/            # Pagini principale
│   ├── context/          # Context providers
│   ├── hooks/            # Custom hooks
│   ├── data/             # Date mock și constante
│   ├── utils/            # Funcții utilitare
│   └── assets/           # Resurse (imagini, fonturi)
├── dist/                 # Build de producție
└── netlify.toml          # Configurare Netlify
```

## 🌐 Deploy pe Netlify

### Metoda 1: Deploy automat din GitHub
1. Încarcă codul pe GitHub
2. Conectează-ți repository-ul la Netlify
3. Netlify va detecta automat configurarea din `netlify.toml`
4. Deploy-ul va fi realizat automat la fiecare commit

### Metoda 2: Drag & Drop
1. Rulează `npm run build` pentru a genera folderul `dist`
2. Încarcă folderul `dist` prin drag & drop în Netlify

### Setări Deploy
Proiectul include configurarea optimă în `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects pentru Single Page Application
- Headers de securitate
- Optimizare statică

## 🎨 Personalizare

### Culori Tema
Culorile principale sunt definite în `tailwind.config.js`:
- `beauty-pink`: #ec4899
- `beauty-purple`: #8b5cf6
- `beauty-rose`: #f43f5e
- `beauty-gold`: #f59e0b
- `beauty-navy`: #1e293b

### Traduceri
Toate textele sunt în română și pot fi modificate în:
- Componente din `src/components/sections/`
- Paginile din `src/pages/`
- Meta tag-uri în `index.html`

## 📱 Secțiuni Disponibile

1. **Hero** - Secțiunea principală cu call-to-action
2. **Promotional Banner** - Oferte speciale
3. **Services** - Serviciile oferite
4. **Products** - Produse premium
5. **About** - Despre noi
6. **Testimonials** - Mărturii clienți
7. **Booking** - Sistem programări
8. **Contact** - Informații contact
9. **Newsletter** - Abonare newsletter

## 🔧 Funcționalități

### Sistem de Programări
- 4 pași pentru programare completă
- Selecție servicii, specialist, dată și oră
- Formular de contact complet
- Validare în timp real

### Coș de Cumpărături
- Adăugare/eliminare produse
- Gestionare cantități
- Calculare automată prețuri
- Persistență în localStorage

### Wishlist
- Salvare produse favorite
- Sincronizare cu coșul
- Interfață intuitivă

## 📞 Contact

**BeautyArena**
- Adresă: Strada Frumuseții 123, Cluj-Napoca
- Telefon: +40 264 123 456
- Email: info@beautyarena.ro
- Program: Luni-Vineri 9:00-20:00, Sâmbătă-Duminică 10:00-18:00

## 📄 Licență

Acest proiect este dezvoltat pentru BeautyArena și toate drepturile sunt rezervate.

---

**Dezvoltat cu ❤️ pentru experiențe de frumusețe de neuitat**
