# Objava gradiva — GitHub + Cloudflare Pages

Navodila po korakih. Traja približno petnajst minut, večino časa čakaš.
Ko enkrat opraviš, je vsaka naslednja objava tri vrstice.

**Rezultat:**

```
https://programiranje-za-neprogramerje.pages.dev
```

Stalen naslov brez uporabniškega imena, deluje tudi ko je tvoj računalnik ugasnjen.

---

## Zakaj dve storitvi

Nista tekmeca — vsaka opravi svoj del:

| | Kaj počne | Zakaj ravno ta |
|---|---|---|
| **GitHub** | hrani datoteke in zgodovino sprememb | vrnitev na staro različico; AI agent lahko potiska popravke |
| **Cloudflare Pages** | streže stran obiskovalcem | ime projekta je poddomena — GitHub bi v naslov vedno vrinil tvoje uporabniško ime |

Cloudflare se poveže na GitHub. Ko potisneš spremembo, se stran sama objavi v minuti ali dveh.

**GitHub Pages ti ni treba vklopiti.** Če ga vseeno vklopiš, bo gradivo dosegljivo na dveh
naslovih hkrati — to ni narobe, je pa nepotrebno.

---

# 1. del — GitHub

## Korak 1 — Račun

Če ga še nimaš: [github.com/signup](https://github.com/signup). Brezplačen paket zadošča.

## Korak 2 — Nov repozitorij

1. Odpri [github.com/new](https://github.com/new)
2. **Repository name:** `programiranje-za-neprogramerje`
3. **Public**
4. **Ne** obkljukaj *Add a README file*, *Add .gitignore* ne *Choose a license* — vse to že imaš
5. **Create repository**

GitHub ti pokaže stran z ukazi. Ignoriraj jo, spodaj so pravi.

## Korak 3 — Pošlji datoteke

Odpri ukazni poziv v mapi projekta: v Raziskovalcu se postavi v
`D:\programiranje\programiranjezaneprogramerje`, v naslovno vrstico vpiši `cmd`, Enter.

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

# 2. del — Cloudflare Pages

## Korak 4 — Račun

Če ga še nimaš: [dash.cloudflare.com](https://dash.cloudflare.com/sign-up). Brezplačen, brez kartice.

## Korak 5 — Nov projekt iz repozitorija

1. V nadzorni plošči izberi **Workers & Pages** → **Create** → zavihek **Pages**
2. **Connect to Git** → poveži svoj GitHub račun
3. Cloudflare vpraša, do katerih repozitorijev sme dostopati — izberi
   `programiranje-za-neprogramerje` (ali *All repositories*, če ti je vseeno)
4. Izberi repozitorij → **Begin setup**

## Korak 6 — Nastavitve

Tu je edino mesto, kjer se da zmotiti. Vnesi točno to:

| Polje | Vrednost |
|---|---|
| **Project name** | `programiranje-za-neprogramerje` ← **to postane naslov** |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | *pusti prazno* |
| **Build output directory** | `/` |

Ime projekta določa poddomeno, zato mora biti natanko tako zapisano — z vezaji.

Prazen *build command* je pravilen: gradivo je že pripravljeno in ga ni treba prevajati.
Cloudflare bo datoteke samo prekopiral.

Klikni **Save and Deploy**. Prva objava traja pol minute.

---

# 3. del — Preveri

Odpri naslov in poglej, da deluje vse troje:

```
https://programiranje-za-neprogramerje.pages.dev/
https://programiranje-za-neprogramerje.pages.dev/?lang=en
https://programiranje-za-neprogramerje.pages.dev/osnove-programiranja-SL.pdf
https://programiranje-za-neprogramerje.pages.dev/programming-basics-EN.pdf
```

Preveri še predstavitveni pogled in predavateljsko okno (tipka `P`) — obojemu mora
brskalnik dovoliti odpiranje novega okna.

---

## Kasnejše spremembe

Ko popraviš besedilo v `content/content-sl.js` ali `content/content-en.js`:

```
git add .
git commit -m "Popravek besedila v modulu 3"
git push
```

Cloudflare zazna spremembo in objavi novo različico sam. Traja minuto ali dve.
V nadzorni plošči vidiš seznam vseh objav in se lahko z enim klikom vrneš na prejšnjo.

Če si popravil vsebino, ki mora tudi v PDF, prej poženi `naredi-pdf.bat` — sicer
ostaneta PDF-ja taka, kot sta bila.

---

## Če gre kaj narobe

| Težava | Kaj pomeni |
|---|---|
| `remote origin already exists` | Ukaz iz koraka 3 si pognal dvakrat. Popravi z `git remote set-url origin ...` |
| `failed to push some refs` | Na GitHubu si vseeno ustvaril README. Poženi `git pull --rebase origin main`, nato znova `git push` |
| `Authentication failed` | Prijava v brskalniku ni uspela. Poženi `git push` znova |
| Cloudflare ne vidi repozitorija | Pri povezavi nisi dal dostopa do njega. GitHub → Settings → Applications → Cloudflare Pages → Configure |
| Stran je prazna ali brez oblikovanja | *Build output directory* ni `/`. Popravi v Settings → Builds and deployments |
| Naslov ni tak, kot si želel | Ime projekta je določilo poddomeno. Preimenovati ga ni mogoče — projekt izbriši in ustvari znova s pravim imenom |
| Sprememba se ne pokaže | Poglej zavihek **Deployments** — če je objava spodletela, je razlog tam zapisan |

---

## Kasneje: lastna domena

Če boš kdaj želel `programiranje-za-neprogramerje.si` namesto `.pages.dev`, domeno najameš
(okoli 15–25 € na leto) in jo v Cloudflaru dodaš pod **Custom domains**. Naslov `.pages.dev`
ostane in deluje naprej, zato stare povezave ne odmrejo.

Prednost lastne domene ni videz, ampak da je tvoja: če zamenjaš gostitelja, naslov ostane isti.

---

## Viri

- [Cloudflare Pages — povezava z gitom](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare Pages — nastavitve gradnje](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Pages — lastne domene](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare Pages — omejitve brezplačnega paketa](https://developers.cloudflare.com/pages/platform/limits/)
- [GitHub Pages — o storitvi](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) *(če bi kdaj želel še to)*

---

Avtor: Klemen Hvala · Fundacija Zlata ovca · 2026 · CC BY-SA 4.0
