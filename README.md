# Sarah - Kolači sa Ljubavlju 🎂

Minimalistički profesionalan sajt za prodaju kolača inspirisan Dunkin' Donuts stilom.

## 📋 Opis

Sarah je moderna, responzivna web stranica za kolačarnicu koja prikazuje proizvode na elegantan i profesionalan način. Sajt je dizajniran u stilu Dunkin' Donuts brenda - sa bold naslovima, narandžasto-crvenom paletom boja i čistim, modernim layoutom.

## ✨ Karakteristike

- **Dunkin' Donuts Stil**: Bold naslovi, narandžasto-crvena paleta, moderan layout
- **Responzivan Dizajn**: Savršeno se prilagođava svim uređajima (desktop, tablet, mobilni)
- **Hero sa Slikom**: Dva kolone layout sa animiranom slikom kolača
- **Featured Banner**: Gradijent banner za promocije
- **Moderna Animacija**: Glatke animacije i tranzicije (float, hover efekti)
- **Galerija Proizvoda**: Pregled svih kolača sa slikama i cijenama
- **Kontakt Forma**: Jednostavna forma za kontakt i narudžbe
- **Mobilni Meni**: Prilagođen meni za mobilne uređaje
- **Smooth Scrolling**: Glatko skrolovanje između sekcija
- **Bold Tipografija**: Extra bold fontovi (900 weight) za naslove

## 🎨 Sekcije

1. **Navigacija**: Sticky navigacija sa "NARUČI SADA" dugmetom
2. **Hero**: Dva kolone layout sa bold naslovom i animiranom slikom kolača
3. **Featured Banner**: Gradijent banner za promocije i novosti
4. **Meni (Proizvodi)**: Grid galerija kolača sa hover efektima
5. **O Nama**: Informacije o kolačarnici sa ikonama karakteristika
6. **Kontakt**: Kontakt informacije i forma za poruke
7. **Footer**: Linkovi i social media

## 🚀 Kako Pokrenuti

1. **Preuzmite fajlove**: Svi potrebni fajlovi su već kreirani
   - `index.html` - Glavna HTML stranica
   - `styles.css` - Stilovi
   - `script.js` - JavaScript funkcionalnost

2. **Otvorite sajt**: 
   - Dvostruki klik na `index.html` fajl
   - ILI desni klik → "Open with" → Izaberite browser
   - ILI koristite Live Server u VS Code

3. **Pregledajte**: Sajt će se otvoriti u vašem browseru

## 🛠️ Prilagođavanje

### Promjena Boja

U `styles.css` fajlu, pronađite `:root` sekciju i promijenite boje:

```css
:root {
    --primary-color: #FF6600;      /* Narandžasta (Dunkin' stil) */
    --secondary-color: #DD0031;    /* Crvena */
    --accent-color: #FFA500;       /* Svijetlo narandžasta */
}
```

**Trenutna Paleta (Dunkin' Donuts Stil):**
- Primarna: #FF6600 (Narandžasta)
- Sekundarna: #DD0031 (Crvena)
- Hero pozadina: #FFF5E6 - #FFE4CC (Svijetlo krem gradijent)

### Dodavanje Proizvoda

U `index.html` fajlu, kopirajte i prilagodite ovaj kod u `.products-grid` sekciji:

```html
<div class="product-card">
    <div class="product-image">
        <img src="URL_SLIKE" alt="Naziv Proizvoda">
        <div class="product-overlay">
            <button class="btn btn-secondary">Naruči</button>
        </div>
    </div>
    <div class="product-info">
        <h3>Naziv Proizvoda</h3>
        <p>Opis proizvoda</p>
        <span class="price">Cijena</span>
    </div>
</div>
```

### Promjena Kontakt Informacija

U `index.html` fajlu, pronađite `.contact-info` sekciju i ažurirajte:
- Telefon
- Email
- Adresu
- Radno vrijeme

## 📱 Responzivnost

Sajt je potpuno responzivan i prilagođen za:
- Desktop računare (1200px+)
- Tablete (768px - 1199px)
- Mobilne telefone (do 767px)

## 🎯 Tehnologije

- **HTML5**: Semantički markup
- **CSS3**: Moderne CSS funkcije (Grid, Flexbox, Animacije, Gradijenti)
- **JavaScript (Vanilla)**: Bez dodatnih biblioteka
- **Google Fonts**: Poppins font familija (300-900 weight)
- **Unsplash**: Placeholder slike (za zamjenu sa pravim fotografijama)

## 📸 Slike

Trenutno sajt koristi placeholder slike sa Unsplash servisa. Za produkciju:

1. **Hero Slika**: Zamijenite sa profesionalnom fotografijom vašeg kolača
   - Preporučena veličina: 800x800px
   - Format: JPG ili WebP
   - Okrugla slika (automatski border-radius: 50%)

2. **Proizvodi**: Zamijenite URL-ove slika sa vašim slikama
   - Preporučena veličina: 500x500px za proizvode
   - Konzistentno osvetljenje i pozadina
   - Koristite WebP format za bolje performanse

3. **O Nama Slika**: Fotografija kolačarnice ili tima
   - Preporučena veličina: 600x800px

## 🔧 Dodatne Funkcionalnosti

### Integracija sa Email Servisom

Za funkcionalnu kontakt formu, možete integrirati:
- EmailJS
- Formspree
- Vlastiti backend server

### Google Maps

Dodajte Google Maps za lokaciju:
```html
<iframe src="GOOGLE_MAPS_EMBED_URL" width="100%" height="400"></iframe>
```

### Social Media

Ažurirajte linkove u footer sekciji sa vašim social media profilima.

## 📝 Licenca

Ovaj projekat je kreiran za Sarah kolačarnicu. Slobodno ga prilagodite vašim potrebama.

## 🎨 Dizajn Detalji

### Dunkin' Donuts Inspiracija:
- **Bold Naslovi**: Svi naslovi su uppercase sa 900 font weight
- **Narandžasto-Crvena Paleta**: Inspirisana Dunkin' brendom
- **Hero Layout**: Dva kolone sa tekstom i slikom
- **Float Animacija**: Slika kolača se lagano pomjera gore-dolje
- **Featured Banner**: Gradijent banner za promocije
- **Hover Efekti**: Border i transform efekti na karticama

### Tipografija:
- **Naslovi**: Poppins 900 (Extra Bold), Uppercase
- **Tekst**: Poppins 400-700
- **Letter Spacing**: Povećan za naslove (1-2px)

## 💡 Savjeti

- Redovno ažurirajte proizvode i cijene
- Dodajte kvalitetne fotografije vaših kolača (profesionalne, sa dobrim osvetljenjem)
- Održavajte kontakt informacije ažurnim
- Testirajte sajt na različitim uređajima
- Koristite konzistentne fotografije (isti stil, pozadina, osvetljenje)
- Ažurirajte featured banner sa sezonskim ponudama

## 🆘 Podrška

Za pitanja ili pomoć oko prilagođavanja sajta, kontaktirajte developera.

---

**Napravljeno sa ❤️ za Sarah Kolače**
