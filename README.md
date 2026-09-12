# Watch Shop — web shop + admin

## Tehnologije
- Next.js + React + TypeScript
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage za slike
- Responsive frontend

## Pokretanje

1. Instaliraj Node.js.
2. Napravi Supabase projekt.
3. U Supabase SQL Editor zalijepi `supabase/schema.sql` i pokreni ga.
4. U Supabase Authentication > Users napravi admin korisnika (email + lozinka).
5. Kopiraj `.env.example` u `.env.local` i upiši:
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
6. Pokreni:
   npm install
   npm run dev

Web shop: http://localhost:3000
Admin: http://localhost:3000/admin
Prijava: http://localhost:3000/login

## Važna napomena
Ovo je funkcionalna početna verzija. Prije produkcije preporučuje se dodatno ograničiti Supabase RLS tako da samo određeni admin korisnik može mijenjati proizvode i pregledavati narudžbe, te dodati zaštitu od spama na checkoutu.

## Produkcija
Deploy na Vercel/Netlify ili drugi Next.js hosting, poveži domenu i postavi iste environment varijable u hostingu.
