# Salon Matin — demo-hjemmeside

Demo af en moderne hjemmeside til **Salon Matin**, Frederiks Allé 140, 8000 Aarhus C.
Bygget som én statisk side uden frameworks: ren HTML, ét stylesheet og ~2 kB JavaScript.

## Sådan åbner du den

- **Hurtigst:** dobbeltklik `index.html`. Alt er relative stier, så den virker direkte fra filsystemet.
- **Med lokal server** (hvis du vil teste som i drift):
  ```
  python -m http.server 8000
  ```
  og åbn <http://127.0.0.1:8000/>

## Struktur

```
index.html              hele siden
assets/css/style.css    al styling (design tokens øverst)
assets/js/main.js       mobilmenu, header-tilstand, indtoning ved scroll
assets/fonts/           Instrument Serif + Inter, self-hostet (latin subset)
assets/img/             alle billeder som WebP
arkiv/                  tidligere udkast, bruges ikke af demoen
```

## Fortællingen på siden

Hero → Historien (2010, samme adresse) → Hvad vi står for → Salonen →
Hvad vi laver → Priser og gavekort → Holdet → Anmeldelser → Klipninger →
Find os → Book tid.

## Billeder

Alle billeder er **salonens egne** — hentet fra deres nuværende hjemmesides mediebibliotek
(oprindeligt fra deres Facebook/Instagram) og beskåret, komprimeret og konverteret til WebP.
Der er ikke brugt stockbilleder eller AI-genererede billeder.

## Performance

Målt lokalt på forsiden: **7 requests, ~195 kB** ved første visning,
DOMContentLoaded ~270 ms, load ~820 ms.

- WebP i to størrelser til hero og salonbillede (`srcset`)
- `loading="lazy"` + `decoding="async"` på alt under folden
- `width`/`height` på alle billeder (ingen layout-hop)
- Fonts self-hostet, kun latin-subset, preloadet, `font-display: swap`
- Ingen frameworks, ingen CDN, ingen cookie-scripts
- Kort indlæses først, når man scroller derned
- Animationer slås fra ved `prefers-reduced-motion`

## Det skal kunden bekræfte inden lancering

1. **Priserne.** Siden bruger priserne fra deres online booking (Planway):
   klip 220, skin fade 230, skæg 150, klip+skæg 320, skin fade+skæg 330,
   maskine 120, maskine+barbering 220, hårvask/næsehår 40.
   Deres nuværende hjemmeside skriver andre tal (240/260/340/360) —
   de to kilder er altså ikke enige i dag.
2. **Weekendtillæg** på 20 kr. om lørdagen (står på deres nuværende service-side) — gælder det stadig?
3. **Anmeldelser.** Citaterne er ægte og hentet fra Trustpilot (4,8 af 5, 46 anmeldelser)
   med fornavn og måned. Google-tallet er skrevet som "flere hundrede anmeldelser"
   frem for et præcist tal.
4. **Holdet.** Der er bevidst ikke sat navne på de enkelte frisører, da vi ikke kunne
   verificere hvem der er hvem. Får vi navne + et portræt af hver, bliver sektionen
   markant stærkere ("book hos Montazer").
5. **Kreditlinjen** i footeren (Ron, 53 61 36 99) — ret mail/telefon hvis den skal være anderledes.

## Hvor ændrer man hvad

| Skal ændres | Find det her |
|---|---|
| Priser og tider | `index.html`, sektionen `<!-- Priser -->` og kortene under `<!-- Håndværket -->` |
| Booking-link | søg efter `salon-matin.planway.com` |
| Telefon / mail / adresse | søg efter `86194409`, `matin140@hotmail.com`, `Frederiks Allé` |
| Farver og typografi | `assets/css/style.css`, `:root` øverst |
| Billeder | `assets/img/` — samme filnavn, så virker det uden andre ændringer |
