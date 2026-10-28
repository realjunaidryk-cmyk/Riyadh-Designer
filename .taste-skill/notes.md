# Riyadh Designer — build notes

## Reading of the brief
Bilingual (EN / AR, RTL) homepage for an interior design studio in Riyadh. Homes and workplaces.
Client reference: yof.sa (could not be reached from the build environment). Stack: Next.js + Motion + three.js.
Owner asked for rich animation, video, 3D — that overrides the dealt "Stillness" motion.

## Inventory (things only this client has)
1. The name: Riyadh = "the gardens" (plural of rawdah) — a city named for green shade in the desert.
2. Najdi triangular wall openings (light vents) that throw triangles of sun across a floor.
3. Mud-plaster (adobe) walls of Najd, colour of the earth at Diriyah / At-Turaif.
4. Athl (tamarisk) wood beams and palm-frond ceilings.
5. Painted, carved Najdi doors with geometric triangles.
6. Sadu weaving — red/black/white Bedouin textile.
7. The majlis: low seating around the walls, coffee (qahwa) served first.
8. The sun: summer afternoons above 45°C; interiors are made as shade.
9. Prayer times and the light at Maghrib — the day's rhythm.
10. Wadi Hanifa, the green valley through the city.
11. Two halves of the work: the home (villa, majlis) and the workplace (office, showroom).

## Argument
- Hero: we design interiors for Riyadh, at home and at work → two doors, one for each.
- Intro: Riyadh means gardens; our rooms are shade made with care → staircase statement.
- Light: we draw with the Riyadh sun → live 3D majlis, move the sun, change the material.
- Materials: we build with the materials of Najd → band of unequal panels.
- Work: recent projects → scatter.
- Walkthroughs: see the rooms move → curved reel carousel.
- Process: how a project runs, visit to handover → drag row.
- FAQ: practical answers → questions beside a tall photo.
- Contact: visit the studio by appointment → visit card.

## Idea
On this page, **the Riyadh sun through a Najdi triangular opening** becomes **the single light that picks out each exhibit in the dark room**.
Competitor test: another studio could use "light", but not the triangle vents of Najd over a majlis at Riyadh's own sun path and hour.

## Live thing
A 3D majlis lit by the sun. A slider sets the hour in Riyadh (05:30–18:30, opens at the real Riyadh time); triangles of sunlight
from the Najdi openings move across the floor and walls. Chips swap the wall finish (mud plaster, travertine, athl wood).
Fallback without WebGL/JS: a still drawing with the same controls hidden.

## Overrides of the sheet
- Motion: owner explicitly asked for rich animation → signature move is the 3D sun room; plus scroll text reveal,
  curved reel carousel, parallax and section entrances. Reduced-motion keeps everything still.
- Gallery slot (staggered pairs) replaced by the curved reel carousel at the owner's request (their reference prompt).
- Type: TikTok Sans has no Arabic → Arabic set in Noto Kufi Arabic (only on /ar). Still one face per language.
- Imagery: no open collection reachable; every picture slot is a named file the owner will supply (AI-generated).
