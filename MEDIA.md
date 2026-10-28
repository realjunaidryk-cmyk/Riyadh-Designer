# Media brief: Riyadh Interior Decor website

Har image `public/media/` ke andar **exact isi path aur naam** se daalni hai. File milte hi website us jagah placeholder ki jagah asli image dikhayegi (next build ke baad). Koi file na ho to saaf placeholder rehta hai, site nahi tootti. Saari images ki list ek jagah hai: `src/content/images.ts`.

**Asli completed projects ki photos sabse behtar hain.** Jab tak wo nahi aati, neeche wale AI prompts use karein. AI images sirf "design concept" ke taur par dikhayi jati hain, client ke completed project ke taur par nahi.

## Already in place

- Hero scroll animation: client ki transformation video (`public/media/hero/`), 109 desktop + 73 mobile frames.
- Living Room, Apartment categories aur Modern Penthouse concept: isi video se nikle stills (`public/media/stills/`).
- Luxury Majlis category, majlis concept aur process step 5: website ke live 3D majlis ke renders (`public/media/renders/`).

## One look for every image

Har prompt ke end mein ye line lagaayein, taaki saari images ek family lagein (hero video jaisa look):

> Photorealistic luxury interior photography, Riyadh contemporary style, warm natural daylight, palette of warm ivory, limestone, sand, walnut brown and muted bronze, marble or travertine surfaces, soft curved furniture, calm and uncluttered, eye-level wide-angle 24mm, no people, no text, no logos, no watermark.

**Format:** `.jpg`, longest side 2000–2400px, quality 80–85, under 600 KB each.

## Still needed (37 images)

### Services (7) — ratio 4:5 (portrait), e.g. 1600×2000

| File | Prompt |
|---|---|
| `services/residential.jpg` | A furnished villa living room with a curved sofa, limestone floor and tall windows. |
| `services/commercial.jpg` | A designed office reception with a stone desk and timber wall panels. |
| `services/kitchen.jpg` | A contemporary kitchen with a long stone island, walnut cabinets and bronze handles. |
| `services/office.jpg` | An office floor during fit-out: new partitions, ceiling grid, clean and organised. |
| `services/turnkey.jpg` | Material samples laid out on a table: stone, wood, fabric and plaster swatches. |
| `services/renovation.jpg` | A room mid-renovation with fresh plaster walls, protected floor and natural light. |
| `services/finishing.jpg` | Close view of a gypsum false ceiling with hidden LED cove and decorative wall panels. |

### Room categories (9)

| File | Ratio | Prompt |
|---|---|---|
| `categories/bedroom.jpg` | 4:5 | A calm bedroom with an upholstered headboard wall and warm indirect light. |
| `categories/kitchen.jpg` | 4:3 | A kitchen with a stone island and pendant lights. |
| `categories/bathroom.jpg` | 4:5 | A stone bathroom with a freestanding tub and soft lighting. |
| `categories/home-office.jpg` | 1:1 | A home office with a timber desk, bookshelves and daylight. |
| `categories/dining.jpg` | 4:3 | A dining room set for guests, long table, statement chandelier. |
| `categories/closet.jpg` | 4:5 | A walk-in closet with lit shelving and a central island. |
| `categories/villa.jpg` | 4:3 | A double-height villa entrance hall with a sculptural staircase. |
| `categories/office.jpg` | 4:3 | An executive office interior with city view. |
| `categories/hospitality.jpg` | 4:5 | A hotel-style reception lounge with stone and brass details. |

### Project concepts (16) — 4 per project

| Files | Prompts |
|---|---|
| `projects/villa-hero.jpg` (16:9), `villa-1.jpg` (1:1), `villa-2.jpg` (4:5), `villa-3.jpg` (16:9) | Contemporary villa: reception hall; family living room; oak staircase on limestone floor; shaded courtyard seen from the living room. |
| `projects/bedroom-hero.jpg` (16:9), `bedroom-1.jpg` (1:1), `bedroom-2.jpg` (4:5), `bedroom-3.jpg` (16:9) | Minimalist master bedroom: wide view with upholstered wall; bedside detail with warm light; flush wardrobe wall; seating by the window. |
| `projects/kitchen-hero.jpg` (16:9), `kitchen-1.jpg` (1:1), `kitchen-2.jpg` (4:5), `kitchen-3.jpg` (16:9) | Designer kitchen: long quartzite island; walnut cabinet detail; display shelving with bronze handles; prep kitchen behind a pocket door. |
| `projects/office-hero.jpg` (16:9), `office-1.jpg` (1:1), `office-2.jpg` (4:5), `office-3.jpg` (16:9) | Executive office: reception with travertine desk; boardroom with acoustic ceiling; oak and glass partitions; executive office overlooking the city. |

### About and process (5) — ratio 4:5

| File | Prompt |
|---|---|
| `about/studio.jpg` | A design studio table with material samples, drawings and a laptop, daylight. |
| `process/1.jpg` | A consultation in a client's living room: plans on a coffee table, two cups of coffee. |
| `process/2.jpg` | A moodboard with fabric, stone and colour samples. |
| `process/3.jpg` | A floor plan drawing with a furniture layout and a pencil. |
| `process/4.jpg` | Finish samples: tiles, wood, paint chips and fabrics arranged on a table. |

## Also needed from the client

These are left empty on purpose until confirmed (nothing invented on the site):

- **Logo** (SVG or PNG). The header currently uses a text wordmark.
- **Email address** (the audit says to correct and verify it).
- **Office address** if visitors can come to the studio. Right now the site shows "Riyadh, Saudi Arabia".
- **Social media links**: Facebook, Instagram, LinkedIn, TikTok, X.
- **Official Arabic company name**. It is written as "رياض إنتيريور ديكور" for now.
- **Real completed projects**: photos and a short description each, to replace the concepts.
- **Domain name**, **GA4 Measurement ID** and **Google Search Console verification code** (see README).

Edit these in `src/content/site.ts`.
