# Objava gradiva na GitHub Pages

Navodila po korakih. Traja približno deset minut, večino časa čakaš na GitHub.
Ko enkrat opraviš, je vsaka naslednja objava tri vrstice.

**Rezultat:** stalen javni naslov oblike
`https://TVOJE-IME.github.io/programiranje-za-neprogramerje/`
ki deluje, tudi ko je tvoj računalnik ugasnjen.

---

## Preden začneš

Repozitorij mora biti **javen** — brezplačni GitHub Pages iz zasebnih repozitorijev ne delujejo.
Za to gradivo to ni težava: licenca CC BY-SA že tako predvideva deljenje.

Iz objave so izvzete tri stvari (nastavljeno v `.gitignore`):

| Izvzeto | Zakaj |
|---|---|
| `assets/bin/cloudflared.exe` | 55 MB; vsak si ga naloži sam z `namesti.bat` |
| `programiranje-za-neprogramerje.zip` | nastane z `naredi-pdf.bat`; GitHub ima svoj gumb *Download ZIP* |
| `plans/` | delovne opombe projekta, vključno s podatki o porabi |

Če želiš `plans/` vseeno objaviti, izbriši tisto vrstico iz `.gitignore`.

---

## Korak 1 — Račun na GitHubu

Če ga še nimaš: [github.com/signup](https://github.com/signup). Brezplačen paket zadošča.

Zapomni si **uporabniško ime** — v naslovu strani bo prav to.

---

## Korak 2 — Nov repozitorij

1. Odpri [github.com/new](https://github.com/new)
2. **Repository name:** `programiranje-za-neprogramerje`
3. **Public** *(obvezno za brezplačne Pages)*
4. **Ne** obkljukaj *Add a README file*, *Add .gitignore* ne *Choose a license* — vse to že imaš v mapi
5. **Create repository**

GitHub ti pokaže stran z ukazi. Ignoriraj jo, spodaj so pravi.

---

## Korak 3 — Pošlji datoteke

Odpri ukazni poziv v mapi projekta. Najlažje: v Raziskovalcu se postavi v
`D:\programiranje\programiranjezaneprogramerje`, v naslovno vrstico vpiši `cmd` in pritisni Enter.

Prvi commit je že narejen, zato ostanejo tri vrstice. **V prvi zamenjaj `TVOJE-IME`:**

```
git remote add origin https://github.com/TVOJE-IME/programiranje-za-neprogramerje.git
git branch -M main
git push -u origin main
```

Ob prvem `push` se odpre okno brskalnika za prijavo v GitHub. To je normalno —
gesla se v ukazno vrstico ne vpisuje več. Potrdi prijavo in okno se zapre samo.

Nalaganje traja nekaj sekund; PDF-ja sta skupaj 5 MB.

---

## Korak 4 — Vklopi GitHub Pages

1. V repozitoriju klikni **Settings** (zgoraj desno)
2. V levem stolpcu **Pages**
3. **Source:** `Deploy from a branch`
4. **Branch:** `main`, mapa `/ (root)` → **Save**

Počakaj eno do dve minuti. Osveži stran — na vrhu se pojavi zelen okvir z naslovom.

---

## Korak 5 — Preveri

Odpri naslov. Ko deluje, si zapiši še neposredne povezave:

```
https://TVOJE-IME.github.io/programiranje-za-neprogramerje/
https://TVOJE-IME.github.io/programiranje-za-neprogramerje/?lang=en
https://TVOJE-IME.github.io/programiranje-za-neprogramerje/osnove-programiranja-SL.pdf
https://TVOJE-IME.github.io/programiranje-za-neprogramerje/programming-basics-EN.pdf
```

Popravi še povezavo na vrhu datoteke `README.md`, da kaže na pravi naslov.

---

## Kasnejše spremembe

Ko popraviš besedilo v `content/content-sl.js` ali `content/content-en.js`:

```
git add .
git commit -m "Popravek besedila v modulu 3"
git push
```

Stran se osveži sama v eni do dveh minutah.

Če si popravil tudi vsebino, ki mora v PDF, prej poženi `naredi-pdf.bat` — sicer ostaneta
PDF-ja taka, kot sta bila.

---

## Če gre kaj narobe

| Sporočilo | Kaj pomeni |
|---|---|
| `remote origin already exists` | Ukaz iz koraka 3 si pognal dvakrat. Popravi z `git remote set-url origin ...` |
| `failed to push some refs` | Na GitHubu si vseeno ustvaril README. Poženi `git pull --rebase origin main`, nato znova `git push` |
| `Authentication failed` | Prijava v brskalniku ni uspela. Poženi `git push` znova — okno se odpre ponovno |
| Stran kaže 404 | Pages še ni zgrajen (počakaj dve minuti), ali pa je branch napačen — preveri Korak 4 |
| Stran je brez oblikovanja | Redko. Preveri, da je v mapi datoteka `.nojekyll` |

---

## Zakaj ravno ta pot

GitHub Pages ni tehnično boljši od Cloudflare Pages, kamor bi mapo preprosto povlekel.
Ima pa tri prednosti, ki so za to gradivo pomembne: stalen naslov, **zgodovina vseh sprememb**
in možnost, da popravke potisne kar AI agent.

Poleg tega boš s tem dejansko uporabil `git` iz pojma 9.7 — in razlika med tem, da si o njem
bral, in tem, da si z njim objavil svoje gradivo, je precejšnja.

---

Avtor: Klemen Hvala · Fundacija Zlata ovca · 2026 · CC BY-SA 4.0
