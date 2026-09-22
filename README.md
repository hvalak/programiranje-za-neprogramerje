# Programiranje za neprogramerje

**Kaj moraš razumeti, da lahko gradiš z AI agenti.**

Gradivo v dvanajstih modulih in 107 pojmih — vsak pojem so trije stavki in primer kode z izpisom.
Na voljo v slovenščini in angleščini.

👉 **[Odpri gradivo](https://klemen.github.io/programiranje-za-neprogramerje/)**
*(naslov popravi, ko bo repozitorij objavljen)*

📕 [Priročnik v PDF — slovensko](osnove-programiranja-SL.pdf) · 116 strani
📗 [Handbook in PDF — English](programming-basics-EN.pdf) · 118 pages

---

## Kaj je notri

| | |
|---|---|
| **Priročnik** | vseh 107 pojmov za samostojno branje, z zložljivimi poglobitvami in viri |
| **Predstavitev** | 119 slajdov za delavnico v živo |
| **Predavateljsko okno** | opombe, naslednji slajd in časovnika — tipka `P` |
| **Mind map** | dvonivojski zemljevid gradiva, hkrati služi kot navigacija |
| **7 interaktivnih demo-jev** | zanka po korakih, tekst vs. binarno, isti podatki v štirih oblikah, razstavljen URL, pot enega klika, context window, števec tokenov |
| **Slovarček** | 107 gesel, slovensko ↔ angleško |

## Moduli

1. Kako računalnik razmišlja
2. Pravila igre
3. Datoteke in formati
4. Podatki in baze
5. Naslovi in omrežje
6. Kako deluje spletna stran
7. Kje koda živi (gostovanje)
8. Jeziki in orodja
9. Kako se dela dobra koda
10. AI, agenti in Claude
11. Delovni tok od ideje do kode
12. Velika slika

## Zagon na svojem računalniku

Gradivo ne potrebuje interneta in ničesar ni treba nameščati:

**Najhitreje:** dvoklik na `index.html`.

**S strežnikom** (da ga lahko odpreš tudi na telefonu v isti wifi mreži):

```
namesti.bat          preveri Python in prenese cloudflared
zazeni-lokalno.bat   strežnik + naslov za lokalno omrežje
zazeni-javno.bat     strežnik + začasen javni naslov (tunel)
naredi-pdf.bat       izvozi oba PDF-ja in .zip
```

Potrebuješ samo Python 3 — vse ostalo je v tej mapi.

## Urejanje vsebine

Vse besedilo je v dveh datotekah, ki ju lahko urejaš v Beležnici:

- [`content/content-sl.js`](content/content-sl.js) — slovenska različica
- [`content/content-en.js`](content/content-en.js) — angleška različica *(pisana vzporedno, ne prevedena)*

V glavi vsake datoteke je razloženo, kaj pomeni katero polje.

## Tehnične opombe

Čist HTML, CSS in JavaScript. **Nobene zunanje knjižnice, nobene povezave na CDN** — zato deluje
tudi brez internetne povezave in na računalnikih, kjer ni dovoljeno nameščati programov.
To ni naključje, ampak živ primer pojma 7.7 iz gradiva samega.

---

Avtor: **Klemen Hvala** · Izdajatelj: **Fundacija Zlata ovca** · 2026
Licenca: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.sl) — deli in predelaj,
navedi vir in ohrani isto licenco.
