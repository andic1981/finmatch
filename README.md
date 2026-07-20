# FinMatch România v2.3

## Deploy
```bash
cd finmatch
npx wrangler login   # doar prima dată
npx wrangler deploy
```

## v2.3 — Redesign + reparație encoding
- FIX CRITIC: diacriticele erau dublu-escapate (pagina afișa `\u0103` în loc de „ă"),
  iar JS-ul aplicației avea eroare de sintaxă. Reparat complet.
- CSS rebuilt: Syne + Inter, umbre rafinate, hover states, logo mark nou,
  focus ring pe search, prefers-reduced-motion, mobile îmbunătățit.
- Toate funcțiile păstrate: căutare, filtre, comparare, salvate (localStorage),
  alerte, surse (10, incl. eeagrants.ro), admin, waitlist.
