/* ════════════════════════════════════════════════════════════════════
   SLOVENSKA VSEBINA
   Tole je edina datoteka, ki jo moraš urejati, če želiš popraviti besedilo.
   Odpri jo v Beležnici (Notepad) ali kjerkoli — shrani in osveži stran.

   Polja:
     s:      stavki, ki jih vidi občinstvo na slajdu.
             Praviloma trije. Zahtevna tema jih sme imeti štiri ali pet,
             preprosta dva — nikoli pa toliko, da bi slajd postal članek.
     code:   primer kode — src je koda, out je izpis, note je opomba pod blokom.
     cmds:   neobvezna tabela ukazov: ["ukaz", "kaj naredi"].
     deeper: razširjena razlaga ("Rad bi izvedel več") — samo v Priročniku.
     refs:   povezave do zunanjih virov, prikazane pod razlago.
     tag:    angleški izraz, izpisan poudarjeno ob naslovu pojma.
     notes:  opombe za predavatelja — občinstvo jih ne vidi.

   V besedilu lahko uporabiš:
     `koda`            → izpiše se kot koda
     *poudarek*        → poševno
     [[english term]]  → poudarjen angleški izraz
   ════════════════════════════════════════════════════════════════════ */

window.CONTENT = window.CONTENT || {};

window.CONTENT.sl = {

  meta: {
    title: "Programiranje za neprogramerje",
    subtitle: "Kaj moraš razumeti, da lahko gradiš z AI agenti",
    intro: "Ni namen, da bi postal programer. Namen je, da razumeš besede, ki jih uporablja tvoj AI agent, " +
           "in da znaš problem razstaviti tako, da ga zna rešiti."
  },

  modules: [

    {
      id: 1,
      t: "Kako računalnik razmišlja",
      sub: "Devet gradnikov, iz katerih je sestavljen vsak program na svetu — in črno okno, v katerem se to zgodi.",
      items: [

        {
          id: "1.1", core: true, t: "Kaj je program", tag: "program / code",
          s: [
            "Program je zaporedje navodil, ki jih računalnik izvede eno za drugim, od zgoraj navzdol.",
            "Navodila so napisana v jeziku, ki ga bere tudi človek, računalnik pa si ga sproti prevede v svoje ukaze.",
            "Od recepta se loči samo po bralcu: recept bere kuhar, program bere stroj — zato mora biti neprimerno bolj natančen."
          ],
          code: {
            file: "prestej.py",
            src: `# Prestej vrstice v datoteki.
pot = "gostje.txt"

datoteka = open(pot, encoding="utf-8")
vrstice = datoteka.readlines()
datoteka.close()

print("Stevilo vrstic:", len(vrstice))`,
            out: `Stevilo vrstic: 248`,
            note: "Sest vrstic, ki se izvedejo od prve do zadnje. To je cel program."
          },
          deeper: "Kuharju lahko napišeš *sol po okusu* in bo kosilo dobro. Računalniku moraš povedati, koliko gramov, " +
                  "sicer se ustavi ali pa doda nič. Ta razlika — da računalnik nikoli ne ugiba — je vzrok za skoraj vse, " +
                  "kar se začetniku zdi nelogično. Ko boš kasneje pisal navodila AI agentu, boš v resnici pisal recept " +
                  "za nekoga vmes: dovolj pameten, da ugane manjkajoče, a ravno zato nevaren, kadar ugane narobe.",
          refs: [
            { t: "Automate the Boring Stuff — Python Basics (brezplačna knjiga)", url: "https://automatetheboringstuff.com/2e/chapter1/" },
            { t: "Python: uradni uvodni vodič", url: "https://docs.python.org/3/tutorial/introduction.html" }
          ],
          notes: "Preberi program vrstico za vrstico na glas. Poudari, da se izvaja od zgoraj navzdol, brez izjem.",
          links: ["2.1", "9.1"]
        },

        {
          id: "1.2", core: true, t: "Spremenljivka", tag: "variable",
          s: [
            "Spremenljivka je poimenovano mesto, kjer je shranjena ena vrednost.",
            "Levo od enačaja je ime [[name]], desno vrednost [[value]].",
            "Vrednost zamenjaš na enem mestu in vse, kar jo uporablja, računa po novem."
          ],
          code: {
            file: "ddv.py",
            src: `ddv_stopnja = 22        # spremeni samo tukaj
cena_brez = 100

ddv = cena_brez * ddv_stopnja / 100
cena_z_ddv = cena_brez + ddv

print(ddv, cena_z_ddv)`,
            out: `22.0 122.0`,
            note: "Ce se stopnja spremeni na 9.5, popravis eno vrstico - ne sedemnajstih."
          },
          deeper: "Zakaj to šteje pri delu z AI: če je stopnja DDV zapisana neposredno na sedemnajstih mestih v kodi, " +
                  "je sprememba tvegana in agent jo bo skoraj zagotovo nekje spregledal. Če je zapisana v eni " +
                  "spremenljivki, je sprememba ena vrstica. Ko agentu rečeš *spremeni davčno stopnjo*, v ozadju " +
                  "prosiš ravno za to. Vrednost, zapisana kar sredi kode, ima svoje ime: [[hard-coded value]].",
          refs: [
            { t: "Real Python — Variables in Python", url: "https://realpython.com/python-variables/" }
          ],
          notes: "Pokaži prstom na vrstico 1 in vprašaj, kaj se zgodi z izpisom, če jo spremenimo v 9.5.",
          links: ["1.3", "9.3"]
        },

        {
          id: "1.3", core: true, t: "Podatkovni tipi", tag: "data types",
          s: [
            "Računalnik strogo loči med številom [[int]], besedilom [[str]], da/ne vrednostjo [[bool]] in datumom [[date]].",
            "Število `22` in besedilo `\"22\"` nista isto: prvo lahko sešteješ, drugo samo zlepiš.",
            "Narekovaji so tisti, ki odločajo — kar je med njimi, je za računalnik besedilo, tudi če so same številke.",
            "Presenetljivo velik del napak so podatki, ki izgledajo kot število, v resnici pa so besedilo."
          ],
          code: {
            file: "tipi.py",
            src: `kolicina = 22          # int    - stevilo
kolicina_txt = "22"    # str    - besedilo
je_placano = True      # bool   - da / ne

print(kolicina + 1)
print(kolicina_txt + "1")
print(type(kolicina), type(kolicina_txt))`,
            out: `23
221
<class 'int'> <class 'str'>`,
            note: "Vrstica 5 sesteje, vrstica 6 zlepi. Ista tipka, drugacen pomen."
          },
          deeper: "Klasičen primer iz pisarne: v Excelu je stolpec z zneski, v katerem je nekje vrednost `1.200,00 €`. " +
                  "Za človeka je to tisoč dvesto evrov, za računalnik pa niz znakov z evrom in vejico. " +
                  "Seštevek se zato ne izide ali pa program obstane. Kadar ti agent javi napako " +
                  "[[TypeError: expected number, got string]], je to natanko ta primer — in rešitev je pretvorba " +
                  "besedila v število, ne popravljanje matematike.",
          refs: [
            { t: "Real Python — Basic Data Types in Python", url: "https://realpython.com/python-data-types/" },
            { t: "Python: števila, nizi in seznami", url: "https://docs.python.org/3/tutorial/introduction.html" }
          ],
          notes: "Tu vedno pride vprašanje o Excelu. Dovoli ga, je najboljši most.",
          links: ["3.4", "4.1"]
        },

        {
          id: "1.4", core: true, t: "Seznam", tag: "list / array",
          s: [
            "Seznam je oštevilčeno zaporedje vrednosti pod enim samim imenom.",
            "Do posameznega elementa [[item]] prideš prek njegove številke [[index]], pri čemer Python šteje od nič.",
            "Seznam uporabiš vedno, kadar imaš *več istega*: vrstice v tabeli, datoteke v mapi, prijavljene udeležence."
          ],
          code: {
            file: "seznam.py",
            src: `gostje = ["Ana", "Bor", "Cvet", "Dan"]

print(gostje[0])        # prvi
print(gostje[3])        # zadnji
print(len(gostje))      # koliko jih je

gostje.append("Eva")    # dodaj na konec
print(gostje)`,
            out: `Ana
Dan
4
['Ana', 'Bor', 'Cvet', 'Dan', 'Eva']`,
            note: "gostje[4] bi vrgel napako IndexError - tak predal ne obstaja."
          },
          deeper: "Štetje od nič ni muha programerjev, ampak posledica tega, kako je seznam shranjen v pomnilniku: " +
                  "številka pove, koliko mest za začetkom je element. V praksi si zapomni samo to, da je prvi element " +
                  "pod številko 0 in zadnji pod *dolžina − 1*. Napaka [[IndexError: list index out of range]] pomeni, " +
                  "da si segel v predal, ki ne obstaja — skoraj vedno zato, ker si štel od ena.",
          refs: [
            { t: "Real Python — Lists and Tuples", url: "https://realpython.com/python-lists-tuples/" },
            { t: "Automate the Boring Stuff — Lists", url: "https://automatetheboringstuff.com/2e/chapter4/" }
          ],
          notes: "Vprašaj, katera številka je zadnji element. Skoraj vedno nekdo reče 4.",
          links: ["1.7", "3.4", "4.2"]
        },

        {
          id: "1.5", core: true, t: "Objekt", tag: "object / dict / key-value",
          s: [
            "Objekt je izpolnjen obrazec: vsako polje ima svoje ime [[key]] in svojo vrednost [[value]].",
            "Do podatka ne prideš prek številke, ampak prek imena polja.",
            "Tako izgleda velika večina podatkov v datotekah `.json` in v odgovorih spletnih storitev."
          ],
          code: {
            file: "objekt.py",
            src: `stranka = {
    "ime": "Novak",
    "email": "novak@primer.si",
    "znesek": 120,
    "placano": False,
}

print(stranka["email"])
print(stranka["znesek"] * 1.22)`,
            out: `novak@primer.si
146.39999999999998`,
            note: "Seznam objektov = tabela: vrstice so elementi, stolpci so imena polj."
          },
          deeper: "Seznam in objekt sta dva gradnika, iz katerih je sestavljeno skoraj vse. Seznam objektov " +
                  "(*več izpolnjenih obrazcev*) je natanko to, kar je tabela v Excelu: vrstice so elementi seznama, " +
                  "stolpci pa polja objekta. Mimogrede — izpis `146.39999999999998` ni napaka programa, ampak " +
                  "posledica tega, kako računalnik hrani decimalna števila [[floating point]]; pri denarju se temu " +
                  "izogneš z zaokroževanjem ali s štetjem celih centov.",
          refs: [
            { t: "Real Python — Dictionaries in Python", url: "https://realpython.com/python-dicts/" },
            { t: "Automate the Boring Stuff — Dictionaries and Structuring Data", url: "https://automatetheboringstuff.com/2e/chapter5/" }
          ],
          notes: "Izpis s piko namerno pustim nezaokrožen — dober uvod v Modul 2 (kaj je bug in kaj ni).",
          links: ["3.5", "4.6", "6.6"]
        },

        {
          id: "1.6", core: true, t: "Pogoj", tag: "if / else",
          s: [
            "Pogoj je kretnica: če nekaj drži, gre program po eni poti, sicer po drugi.",
            "Zapiše se skoraj tako, kot ga izgovoriš — *če je znesek nad sto, daj popust, sicer polno ceno*.",
            "Vsako poslovno pravilo, ki ga znaš povedati z besedo *če*, je mogoče zapisati kot kodo."
          ],
          code: {
            file: "popust.py",
            src: `znesek = 120

if znesek > 100:
    popust = 0.10
elif znesek > 50:
    popust = 0.05
else:
    popust = 0.0

print("Popust:", popust * 100, "%")`,
            out: `Popust: 10.0 %`,
            note: "Zamik (presledki na zacetku vrstice) v Pythonu doloca, kaj spada pod kateri pogoj."
          },
          deeper: "Največ nesporazumov nastane pri pravilih, ki jih v pogovoru izrečemo nedokončana. " +
                  "*Popust dobijo stalne stranke* ne pove, kaj je stalna stranka in kaj se zgodi z ostalimi. " +
                  "Računalnik potrebuje vse veje [[branch]]. Zato te bo dober agent — in skill `grilling` iz " +
                  "Modula 11 — silil, da poveš tudi drugo polovico stavka.",
          refs: [
            { t: "Real Python — Conditional Statements", url: "https://realpython.com/python-conditional-statements/" },
            { t: "Automate the Boring Stuff — Flow Control", url: "https://automatetheboringstuff.com/2e/chapter2/" }
          ],
          notes: "Tu se prvič pokaže, zakaj grilling deluje. Omeni, ne razlagaj še.",
          links: ["2.1", "11.1"]
        },

        {
          id: "1.7", core: true, t: "Zanka for", tag: "for loop",
          s: [
            "Zanka ponovi isti postopek za vsak element seznama.",
            "`for` uporabiš takrat, ko že vnaprej veš, čez kaj greš: čez tristo vrstic, čez dvanajst mesecev, čez vse datoteke v mapi.",
            "Namesto tristo ročnih ponovitev napišeš postopek enkrat in poveš, čez kaj naj teče."
          ],
          code: {
            file: "zanka.py",
            src: `racuni = [120, 45, 310]
skupaj = 0

for znesek in racuni:
    skupaj = skupaj + znesek
    print("Dodal", znesek, "-> skupaj", skupaj)

print("Konec:", skupaj)`,
            out: `Dodal 120 -> skupaj 120
Dodal 45 -> skupaj 165
Dodal 310 -> skupaj 475
Konec: 475`,
            note: "Zamaknjeni vrstici 5 in 6 se ponovita trikrat, zadnja vrstica samo enkrat."
          },
          deeper: "Zanka je razlog, zakaj se programiranje sploh splača. Delo, ki traja tri ure ročno, " +
                  "traja v zanki tri sekunde — in kar je pomembneje, drugič traja spet tri sekunde. " +
                  "Kadar se zalotiš, da nekaj v Excelu ponavljaš za vsako vrstico posebej, imaš pred sabo zanko. " +
                  "Ena ponovitev zanke se imenuje [[iteration]].",
          refs: [
            { t: "Real Python — For Loops", url: "https://realpython.com/python-for-loop/" },
            { t: "Python: nadzor poteka programa", url: "https://docs.python.org/3/tutorial/controlflow.html" }
          ],
          notes: "Izpis po korakih je bistvo tega slajda — preberi ga skupaj s publiko.",
          links: ["1.4", "1.8"]
        },

        {
          id: "1.8", core: false, t: "Zanka while", tag: "while loop",
          s: [
            "`while` ponavlja, dokler je nek pogoj izpolnjen — koliko ponovitev bo, vnaprej ne veš.",
            "Če se pogoj nikoli ne neha izpolnjevati, se program vrti v neskončnost [[infinite loop]] in ga moraš ustaviti ročno."
          ],
          code: {
            file: "while.py",
            src: `zaloga = 3

while zaloga > 0:
    print("Prodano. Ostalo:", zaloga)
    zaloga = zaloga - 1

print("Zaloge ni vec.")`,
            out: `Prodano. Ostalo: 3
Prodano. Ostalo: 2
Prodano. Ostalo: 1
Zaloge ni vec.`,
            note: "Ce izbrises vrstico 5, se pogoj nikoli ne spremeni - neskoncna zanka, Ctrl + C."
          },
          deeper: "Razlika je preprosta: `for` je *štirikrat*, `while` je *dokler*. Neskončna zanka je eden redkih " +
                  "primerov, ko se računalnik obnaša, kot da se je sesul, čeprav pridno dela točno to, kar si mu naročil.",
          refs: [
            { t: "Real Python — While Loops", url: "https://realpython.com/python-while-loop/" }
          ],
          notes: "Če zmanjkuje časa, ta slajd preskoči.",
          links: ["1.7", "1.11"]
        },

        {
          id: "1.9", core: true, t: "Funkcija", tag: "function",
          s: [
            "Funkcija je poimenovan kos kode: noter daš podatke [[arguments]], ven dobiš rezultat [[return value]].",
            "Napišeš jo enkrat, nato jo po imenu pokličeš, kolikorkrat hočeš.",
            "Dobra funkcija počne eno samo stvar in ima ime, iz katerega je razvidno, katero."
          ],
          code: {
            file: "funkcija.py",
            src: `def z_ddv(cena, stopnja=22):
    return cena * (1 + stopnja / 100)

print(z_ddv(100))
print(z_ddv(250, 9.5))
print(z_ddv(80))`,
            out: `122.0
273.75
97.6`,
            note: "def = definiraj. return = kaj funkcija vrne. stopnja=22 je privzeta vrednost."
          },
          deeper: "Funkcija je najmanjša enota, ki se jo da samostojno preveriti s testom (Modul 9). " +
                  "Prav zato je pri delu z AI agentom pomembna: agent, ki ti napiše eno funkcijo z jasnim vhodom " +
                  "in izhodom, je preverljiv. Agent, ki ti napiše tristo vrstic v enem kosu, ni. " +
                  "Kadar rečeš *razbij to na manjše dele*, v resnici prosiš za funkcije.",
          refs: [
            { t: "Real Python — Defining Your Own Python Function", url: "https://realpython.com/defining-your-own-python-function/" },
            { t: "Automate the Boring Stuff — Functions", url: "https://automatetheboringstuff.com/2e/chapter3/" }
          ],
          notes: "Poudari tri klice iste funkcije — enkrat napisano, trikrat uporabljeno.",
          links: ["9.2", "9.4"]
        },

        {
          id: "1.10", core: false, t: "Komentar", tag: "comment",
          s: [
            "Komentar je vrstica, ki jo računalnik v celoti prezre, človek pa jo prebere.",
            "Služi razlagi, *zakaj* je nekaj narejeno tako — kaj koda počne, se vidi iz kode same.",
            "Pri delu z AI so komentarji dvojno koristni: agent jih prebere kot navodilo, ne le kot opombo."
          ],
          code: {
            file: "komentar.py",
            src: `import math

# Racunovodstvo zahteva zaokrozevanje NAVZGOR
# (dogovor 2024). Zato ni round(), ampak ceil().
znesek = math.ceil(12.31)

print(znesek)`,
            out: `13`,
            note: "Slab komentar bi bil: \"zaokrozi znesek\". To se vidi ze iz kode."
          },
          deeper: "Slab komentar ponovi kodo z drugimi besedami. Dober komentar pove tisto, česar iz kode ni mogoče " +
                  "razbrati: da je ta izjema posledica zahteve računovodstva, da tega vrstnega reda ne smeš spremeniti, " +
                  "da je bilo prej drugače in zakaj se ni obneslo.",
          refs: [
            { t: "Real Python — Writing Comments in Python", url: "https://realpython.com/python-comments-guide/" }
          ],
          notes: "Če zmanjkuje časa, preskoči.",
          links: ["9.3", "9.8"]
        },

        {
          id: "1.11", core: true, t: "Terminal", tag: "terminal / command line / cmd",
          s: [
            "Terminal je okno, v katerega pišeš ukaze, namesto da klikaš po gumbih.",
            "En ukaz je ena vrstica: ime programa in za njim nastavitve [[arguments]].",
            "Poziv [[prompt]] na levi pove, v kateri mapi trenutno si — tam bodo ukazi tudi delovali.",
            "Skoraj vse, kar počneš z miško, se da narediti tudi tu — le da je hitreje in ponovljivo."
          ],
          code: {
            term: true,
            file: "Ukazni poziv (cmd)",
            src: `C:\\Users\\Klemen> cd Documents\\projekt

C:\\Users\\Klemen\\Documents\\projekt> dir
  prestej.py
  gostje.txt

C:\\...\\projekt> python prestej.py
Stevilo vrstic: 248

C:\\...\\projekt> _`,
            note: "Poziv se spremeni, ko z ukazom cd vstopis v drugo mapo."
          },
          cmds: [
            ["cd ime_mape", "vstopi v mapo"],
            ["cd ..", "nazaj v nadrejeno mapo"],
            ["cd /d D:\\projekt", "skok na drug disk in v mapo"],
            ["dir", "izpiši, kaj je v mapi (na Macu in Linuxu `ls`)"],
            ["type gostje.txt", "izpiši vsebino datoteke (drugod `cat`)"],
            ["python prestej.py", "poženi program"],
            ["cls", "počisti zaslon"],
            ["Tab", "dopolni začeto ime datoteke"],
            ["↑ ↓", "prikliči prejšnje ukaze"],
            ["Ctrl + C", "ustavi, kar trenutno teče"]
          ],
          deeper: "Črno okno, ki se odpre ob dvokliku na `zazeni-lokalno.bat`, je terminal. Vse, kar v njem piše, " +
                  "je program, ki govori s tabo. Dve stvari sta vredni zaupanja: `Ctrl + C` ustavi, kar teče, " +
                  "in zadnja vrstica napake je skoraj vedno najbolj uporabna. Na Windowsu obstajata dve različici — " +
                  "starejši [[cmd]] in novejši [[PowerShell]]; ukazi so večinoma isti, razlike pa se pokažejo šele " +
                  "pri zahtevnejših rečeh. Agenti, kot je Claude Code, živijo prav tu — zato je koristno, " +
                  "da te okno ne straši.",
          refs: [
            { t: "Microsoft — seznam ukazov za Windows", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands" },
            { t: "Microsoft — ukaz cd", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cd" }
          ],
          notes: "Pokaži v živo: odpri zazeni-lokalno.bat pred očmi publike in preberi izpis skupaj z njimi.",
          links: ["2.4", "8.8"]
        }

      ]
    },

    {
      id: 2,
      t: "Pravila igre",
      sub: "Zakaj se stvari pokvarijo, kako se napaka bere in v čem se koda bistveno razlikuje od umetne inteligence.",
      items: [

        {
          id: "2.1", core: true, t: "Smeti noter, smeti ven", tag: "garbage in, garbage out",
          s: [
            "Računalnik ne preverja, ali so podatki smiselni — preveri samo, ali jih zna obdelati.",
            "Če je med zneski eden zapisan kot besedilo, se seštevek ne zmoti, ampak se ustavi.",
            "Večina *napak programa* v resnici ni napaka programa, ampak napaka podatkov, ki so vanj prišli."
          ],
          code: {
            file: "gigo.py",
            src: `zneski = [120, 45, "310"]   # zadnji je besedilo!
skupaj = 0

for z in zneski:
    skupaj = skupaj + z

print(skupaj)`,
            out: `TypeError: unsupported operand type(s)
for +: 'int' and 'str'`,
            note: "Program ni pokvarjen. Vhodni podatek je."
          },
          deeper: "Enako velja za AI agente, le da je posledica drugačna: program se ustavi, agent pa nadaljuje. " +
                  "Če mu daš tabelo z nejasnimi stolpci in polovico manjkajočih vrednosti, ti bo vrnil odgovor — " +
                  "samozavesten in napačen. Zato se največ dela pri delu z AI ne zgodi pri pisanju navodil, " +
                  "ampak pri pripravi vhodnih podatkov.",
          refs: [
            { t: "Wikipedia — Garbage in, garbage out", url: "https://en.wikipedia.org/wiki/Garbage_in,_garbage_out" }
          ],
          notes: "Vprašaj, kdo je že kdaj v Excelu našel znesek s presledkom na koncu. Vsi.",
          links: ["1.3", "3.10", "10.8"]
        },

        {
          id: "2.2", core: true, t: "Kaj je bug", tag: "bug",
          s: [
            "Bug je razlika med tem, kar si mislil, da si naročil, in tem, kar si dejansko naročil.",
            "Skoraj nikoli ne gre za to, da bi računalnik naredil napako — naredil je točno to, kar piše.",
            "Najpogostejši bug je primer, na katerega nihče ni pomislil: prazen seznam, negativno število, manjkajoče polje."
          ],
          code: {
            file: "bug.py",
            src: `def povprecje(stevila):
    return sum(stevila) / len(stevila)

print(povprecje([2, 4, 6]))
print(povprecje([]))        # kaj pa, ce je seznam prazen?`,
            out: `4.0
ZeroDivisionError: division by zero`,
            note: "Funkcija je pravilna za vse primere, razen za tistega, na katerega nismo pomislili."
          },
          deeper: "Beseda izvira iz leta 1947, ko so v računalnik Mark II dejansko zletele vešče in jih je bilo treba " +
                  "pobrati iz rele. Pomembnejše od zgodbe je to, kar iz nje sledi: iskanje buga ni iskanje krivca, " +
                  "ampak iskanje primera, ki ga navodila niso pokrila. Prav zato so testi (Modul 9) tako močno orodje — " +
                  "so seznam primerov, na katere si se spomnil, zapisan tako, da se preveri sam.",
          refs: [
            { t: "Wikipedia — Software bug", url: "https://en.wikipedia.org/wiki/Software_bug" }
          ],
          notes: "Poudari: program je naredil točno to, kar piše. Krivda je pri navodilu, ne pri stroju.",
          links: ["1.6", "9.4", "9.6"]
        },

        {
          id: "2.3", core: false, t: "Napaka ali sesutje", tag: "error / exception",
          s: [
            "Ko program naleti na nekaj, česar ne zna, sproži *izjemo* [[exception]] — in se ustavi.",
            "Isto situacijo lahko vnaprej predvidiš in jo obvladaš, namesto da se program sesuje.",
            "Razlika med *program se je sesul* in *program je javil, da manjka podatek* je samo v tem, ali je nekdo na to pomislil."
          ],
          code: {
            file: "izjema.py",
            src: `vnos = "dvanajst"

try:
    stevilo = int(vnos)
except ValueError:
    stevilo = 0
    print("To ni stevilo, uporabljam 0.")

print("Rezultat:", stevilo)`,
            out: `To ni stevilo, uporabljam 0.
Rezultat: 0`,
            note: "Brez try/except bi se program na vrstici 4 ustavil z ValueError."
          },
          deeper: "Past je v tem, da se da z `try/except` napako tudi *pomesti pod preprogo*: če na tihem nadomestiš " +
                  "vsako napako z ničlo, bo program deloval naprej in tiho računal narobe. To je slabše od sesutja, " +
                  "ker sesutje vsaj opaziš. Dobro pravilo: obvladaj samo tiste napake, za katere veš, kaj z njimi.",
          refs: [
            { t: "Python — napake in izjeme", url: "https://docs.python.org/3/tutorial/errors.html" }
          ],
          notes: "Če zmanjkuje časa, preskoči — a poanta 'tiho narobe je slabše od sesutja' je vredna omembe.",
          links: ["2.2", "2.4"]
        },

        {
          id: "2.4", core: true, t: "Kako brati sporočilo o napaki", tag: "traceback / stack trace",
          s: [
            "Sporočilo o napaki ni kazen, ampak najbolj natančen opis problema, kar ga boš dobil.",
            "Bere se **od spodaj navzgor**: zadnja vrstica pove, *kaj* je narobe, vrstice nad njo pa, *kje*.",
            "Če boš agentu prilepil celotno sporočilo namesto opisa *ne dela*, bo rešitev prišla veliko hitreje."
          ],
          code: {
            term: true,
            file: "Izpis napake",
            src: `Traceback (most recent call last):
  File "racun.py", line 5, in <module>
    skupaj = skupaj + z
             ~~~~~~~^~~
TypeError: unsupported operand type(s)
for +: 'int' and 'str'`,
            note: "Isti primer kot pri 2.1, tokrat v celoti."
          },
          cmds: [
            ["TypeError: ...", "zadnja vrstica: kaj je narobe — preberi jo prvo"],
            ["File \"racun.py\", line 5", "katera datoteka in katera vrstica"],
            ["skupaj = skupaj + z", "vrstica kode, ki je sprožila napako"],
            ["~~~~~~~^~~", "puščica pokaže na točno mesto v vrstici"],
            ["Traceback ...", "pot, po kateri je program prišel do te vrstice"]
          ],
          deeper: "Pri daljših programih je *traceback* dolg deset vrstic in vse izgledajo enako pomembne. " +
                  "Niso: zanima te zadnja vrstica z imenom napake in zadnja omemba **tvoje** datoteke. " +
                  "Vse vmes so notranje datoteke knjižnic, ki si jih ti nisi pisal. Ko delaš z agentom, prilepi " +
                  "celotno sporočilo — agent zna iz njega prebrati več kot ti, a samo, če ga dobi v celoti.",
          refs: [
            { t: "Real Python — Understanding Tracebacks", url: "https://realpython.com/python-traceback/" }
          ],
          notes: "To je najbolj praktičen slajd v modulu. Ne hiti čezenj.",
          links: ["1.11", "2.5"]
        },

        {
          id: "2.5", core: false, t: "Razhroščevanje", tag: "debugging",
          s: [
            "Razhroščevanje je preverjanje domnev: kaj mislim, da je v tej spremenljivki, in kaj je v resnici.",
            "Najstarejša metoda je še vedno med najboljšimi — izpiši vrednost in poglej.",
            "Kadar nekaj *ne dela*, skoraj vedno drži ena tvoja domneva manj, kot si mislil."
          ],
          code: {
            file: "preveri.py",
            src: `zneski = [120, 45, "310"]

for z in zneski:
    print(repr(z), type(z))   # zacasno: kaj je res notri?`,
            out: `120 <class 'int'>
45 <class 'int'>
'310' <class 'str'>`,
            note: "repr() pokaze narekovaje - takoj se vidi, kateri element je besedilo."
          },
          deeper: "Profesionalna orodja (*debugger*) znajo program ustaviti sredi izvajanja in pokazati vse " +
                  "vrednosti hkrati, a za začetek je izpis povsem dovolj. Pomembnejša od orodja je navada: " +
                  "namesto ugibanja, kje je napaka, razpolovi program — preveri na sredini, ali so vrednosti še " +
                  "prave. Tako v nekaj korakih zožiš iskanje s tristo vrstic na tri.",
          refs: [
            { t: "Real Python — Python Debugging With pdb", url: "https://realpython.com/python-debugging-pdb/" }
          ],
          notes: "Metoda razpolavljanja je najbolj uporabna stvar, ki jo publika odnese iz tega slajda.",
          links: ["2.4", "9.4"]
        },

        {
          id: "2.6", core: true, t: "Koda je predvidljiva, AI ni", tag: "deterministic / non-deterministic",
          s: [
            "Ista koda z istim vhodom da **vsakič** isti rezultat — to se imenuje determinizem [[deterministic]].",
            "Jezikovni model z istim vprašanjem ne da nujno istega odgovora; deluje z verjetnostmi, ne s pravili.",
            "To ni napaka modela, ampak njegova narava — in je razlog, zakaj kodo, ki jo napiše AI, vedno preveriš.",
            "Zato se pravilo glasi: AI naj piše kodo, koda naj računa. Nikoli obratno."
          ],
          code: {
            file: "determinizem.py",
            src: `def z_ddv(cena):
    return cena * 1.22

print(z_ddv(100))
print(z_ddv(100))
print(z_ddv(100))`,
            out: `122.0
122.0
122.0`,
            note: "Trikrat isto vprasanje, trikrat isti odgovor. Pri AI to ne drzi."
          },
          deeper: "Iz tega sledi praktično pravilo, ki ti bo prihranilo največ težav: AI agenta ne prosi, " +
                  "naj *izračuna* vsoto tvojih tristo računov — prosi ga, naj napiše program, ki jo izračuna. " +
                  "V prvem primeru dobiš številko, ki ji ne moreš zaupati in je ne moreš ponoviti. V drugem dobiš " +
                  "orodje, ki ga preveriš enkrat in uporabljaš stokrat. Ista razlika loči *vprašal sem AI* " +
                  "od *zgradil sem si aplikacijo*.",
          refs: [
            { t: "Anthropic — kako Claude deluje (dokumentacija)", url: "https://docs.claude.com/en/docs/about-claude/models/overview" }
          ],
          notes: "Najpomembnejši slajd modula. To je most med prvim delom gradiva in celotnim Modulom 10.",
          links: ["10.1", "10.8", "9.6"]
        }

      ]
    },

    {
      id: 3,
      t: "Datoteke in formati",
      sub: "Katere datoteke zna AI brati in katerih ne — ter zakaj je ta ena razlika pomembnejša od vseh ostalih.",
      items: [

        {
          id: "3.1", core: true, t: "Datoteka, končnica, pot", tag: "file, extension, path",
          s: [
            "Datoteka je kos podatkov z imenom; končnica [[extension]] za piko je samo obljuba, kaj je notri.",
            "Pot [[path]] je naslov datoteke na disku — mape, ločene s poševnicami, in na koncu ime.",
            "Ko agentu poveš *tale datoteka*, mu v resnici moraš povedati pot; drugače je ne najde."
          ],
          code: {
            file: "poti.py",
            src: `from pathlib import Path

pot = Path("D:/projekt/racuni/januar.pdf")

print(pot.name)      # ime z koncnico
print(pot.suffix)    # samo koncnica
print(pot.parent)    # mapa, v kateri je
print(pot.exists())  # ali sploh obstaja`,
            out: `januar.pdf
.pdf
D:\\projekt\\racuni
False`,
            note: "Windows uporablja \\, splet in Python pa /. Python razume oboje."
          },
          deeper: "Preimenovanje `podatki.txt` v `podatki.xlsx` ne naredi iz datoteke Excelove preglednice — " +
                  "spremeni samo obljubo. Windows privzeto končnice skriva, kar je vir presenetljivo velikega " +
                  "števila zmed; v Raziskovalcu jih vklopiš pod *Pogled → Pokaži → Končnice imen datotek*. " +
                  "Pri delu z agentom vedno navedi celotno pot ali pa datoteko postavi v mapo projekta.",
          refs: [
            { t: "Python — pathlib (delo s potmi)", url: "https://docs.python.org/3/library/pathlib.html" }
          ],
          notes: "Vprašaj, kdo ima v Windowsih vklopljen prikaz končnic. Skoraj nihče — in to je težava.",
          links: ["1.11", "3.2"]
        },

        {
          id: "3.2", core: true, t: "Tekstovno ali binarno", tag: "text vs. binary",
          s: [
            "Vse datoteke so v osnovi zaporedje števil; razlika je samo v tem, ali ta števila predstavljajo črke.",
            "Tekstovno datoteko lahko odpreš v Beležnici in jo razumeš — binarno tudi odpreš, a vidiš smeti.",
            "**To je najpomembnejša delitev v celotnem gradivu:** kar je tekst, AI bere neposredno; vse ostalo je treba najprej pretvoriti."
          ],
          code: {
            file: "tekst_ali_binarno.py",
            src: `# tekstovna datoteka - berljiva
print(open("gostje.txt", encoding="utf-8").read(22))

# slika - isti postopek, drugacen rezultat
print(open("logo.png", "rb").read(12))`,
            out: `Ana Novak
Bor Kovac

b'\\x89PNG\\r\\n\\x1a\\n\\x00\\x00\\x00\\r'`,
            note: "Oboje so datoteke. Prvo agent prebere, drugo mora najprej pretvoriti."
          },
          deeper: "Zato je smiselno vprašanje pred vsakim opravilom z AI: *ali je moj vhod tekst?* Če je, gre " +
                  "skoraj vse gladko. Če ni — slika, PDF iz skenerja, zaslonska slika tabele — je prvi korak " +
                  "pretvorba, ne pa boljši prompt. Velik del razočaranj nad AI izvira iz tega, da je bil vhod " +
                  "binaren, pričakovanje pa tekstovno.",
          refs: [
            { t: "Wikipedia — Optical character recognition", url: "https://en.wikipedia.org/wiki/Optical_character_recognition" }
          ],
          notes: "Če publika odnese iz tega modula en sam stavek, naj bo to tretji stavek tega slajda.",
          links: ["3.10", "3.11", "10.17"]
        },

        {
          id: "3.3", core: true, t: "Navaden tekst in Markdown", tag: ".txt / .md",
          s: [
            "`.txt` je gola vsebina brez oblikovanja — najbolj nedolžen format, kar jih je.",
            "`.md` (Markdown) je isti navaden tekst, le z nekaj dogovorjenimi znaki za naslove, sezname in krepko pisavo.",
            "Markdown je jezik, v katerem se pogovarjaš z agenti in v katerem pišeš datoteko `arhitektura.md` iz Modula 9."
          ],
          code: {
            file: "markdown.py",
            src: `vsebina = """# Zapisnik sestanka

## Sklepi
- Rok: 30. september
- Odgovoren: **Klemen**

Podrobnosti so v [datoteki](porocilo.pdf).
"""

open("zapisnik.md", "w", encoding="utf-8").write(vsebina)`,
            out: `(datoteka zapisnik.md je zapisana)`,
            note: "Znaki #, - in ** so ves Markdown, ki ga potrebujes v 90 % primerov."
          },
          deeper: "Prednost Markdowna je, da je berljiv v obeh smereh: človek ga razume tudi brez prikazovalnika, " +
                  "računalnik pa ga zna spremeniti v lepo oblikovan dokument, spletno stran ali PDF. Prav zato je " +
                  "privzeti jezik dokumentacije pri razvijalcih in privzeti izhod jezikovnih modelov.",
          refs: [
            { t: "Markdown Guide — osnovna sintaksa", url: "https://www.markdownguide.org/basic-syntax/" }
          ],
          notes: "Pokaži isti tekst v Beležnici in v prikazovalniku — razlika je prepričljiva.",
          links: ["3.9", "9.8"]
        },

        {
          id: "3.4", core: true, t: "CSV — tabela kot tekst", tag: ".csv",
          s: [
            "CSV je tabela, zapisana kot navaden tekst: ena vrstica je ena vrstica tabele, vejica loči stolpce.",
            "Nima formul, barv, več listov in ne ve, kaj je datum — zna samo vrstice in stolpce.",
            "Ravno zato je najzanesljivejši način, da podatke iz Excela spraviš v program ali v AI agenta."
          ],
          code: {
            file: "beri_csv.py",
            src: `# gostje.csv je navaden tekst:
#   ime,email,znesek
#   Novak,novak@primer.si,120
#   Kovac,kovac@primer.si,45

import csv

with open("gostje.csv", encoding="utf-8") as f:
    for vrstica in csv.DictReader(f):
        print(vrstica["ime"], "->", vrstica["znesek"])`,
            out: `Novak -> 120
Kovac -> 45`,
            note: "Prva vrstica so imena stolpcev. Vsaka naslednja je en objekt iz pojma 1.5."
          },
          deeper: "Dve pasti sta slovenski: Excel pri nas privzeto loči stolpce s **podpičjem**, ne z vejico, " +
                  "in decimalke piše z vejico. Če program prebere CSV narobe, je to skoraj vedno vzrok. " +
                  "Druga past je kodiranje: če se šumniki spremenijo v `Ĺˇ`, je datoteka shranjena v drugem " +
                  "naboru znakov — shrani jo kot *CSV UTF-8*.",
          refs: [
            { t: "Wikipedia — Comma-separated values", url: "https://en.wikipedia.org/wiki/Comma-separated_values" },
            { t: "Python — modul csv", url: "https://docs.python.org/3/library/csv.html" }
          ],
          notes: "Šumniki in podpičje sta dve vprašanji, ki ju vedno dobiš. Odgovori nanju preventivno.",
          links: ["1.4", "4.1", "4.2"]
        },

        {
          id: "3.5", core: true, t: "JSON — struktura kot tekst", tag: ".json",
          s: [
            "JSON je zapis objektov in seznamov iz Modula 1 v obliki navadnega teksta.",
            "Uporablja zavite oklepaje za objekte, oglate za sezname in narekovaje za imena polj.",
            "Skoraj vse, kar si dve napravi na internetu povesta, je zapisano v JSON."
          ],
          code: {
            file: "json_primer.py",
            src: `import json

besedilo = '{"ime": "Novak", "znesek": 120, "placano": false}'

stranka = json.loads(besedilo)     # iz teksta v objekt
print(stranka["ime"], stranka["znesek"])

print(json.dumps(stranka, indent=2))   # nazaj v tekst`,
            out: `Novak 120
{
  "ime": "Novak",
  "znesek": 120,
  "placano": false
}`,
            note: "loads = beri, dumps = zapisi. Isti podatki, dve obliki."
          },
          deeper: "JSON je za razliko od CSV sposoben zapisati gnezdenje — stranka ima seznam naročil, vsako " +
                  "naročilo ima seznam postavk. Prav zato je privzeti jezik spletnih storitev (Modul 6) in " +
                  "tudi način, kako agent opiše orodje, ki ga zna uporabiti (MCP, Modul 10).",
          refs: [
            { t: "json.org — uradni opis formata", url: "https://www.json.org/json-en.html" },
            { t: "Python — modul json", url: "https://docs.python.org/3/library/json.html" }
          ],
          notes: "Poveži nazaj na 1.5 — to je isti objekt, samo zapisan kot tekst.",
          links: ["1.5", "4.6", "6.6"]
        },

        {
          id: "3.6", core: true, t: "PDF", tag: ".pdf",
          s: [
            "PDF je narejen za to, da je povsod videti enako — ne za to, da bi iz njega jemali podatke.",
            "Notri sta lahko dve povsem različni stvari: pravo besedilo ali zgolj slika strani.",
            "Od tega, katera od obeh je, je odvisno, ali bo agent datoteko prebral v sekundi ali sploh ne."
          ],
          code: {
            file: "beri_pdf.py",
            src: `# pip install pypdf
from pypdf import PdfReader

stran = PdfReader("racun.pdf").pages[0]
besedilo = stran.extract_text()

print(len(besedilo), "znakov")
print(besedilo[:40])`,
            out: `0 znakov
`,
            note: "Nic znakov pomeni, da je PDF nastal iz skena - potreben je OCR (3.11)."
          },
          deeper: "Preprost test brez programiranja: odpri PDF in poskusi z miško označiti besedilo. " +
                  "Če se označi, je notri pravi tekst in ga bo agent prebral. Če se ne da označiti ničesar, " +
                  "gledaš sliko. Tretja, najbolj zoprna možnost so tabele: besedilo se izlušči, a se " +
                  "postavitev stolpcev izgubi, zato tabele iz PDF-jev vedno preveri.",
          refs: [
            { t: "pypdf — dokumentacija", url: "https://pypdf.readthedocs.io/en/stable/" }
          ],
          notes: "Test z označevanjem miške je najbolj uporaben trik iz celotnega modula. Pokaži ga v živo.",
          links: ["3.2", "3.11"]
        },

        {
          id: "3.7", core: false, t: "Wordove in Excelove datoteke", tag: ".docx / .xlsx",
          s: [
            "`.docx` in `.xlsx` sta v resnici stisnjeni mapi (`.zip`) z datotekami XML notri.",
            "Vsebina je torej tekst, le zapakiran — zato jo programi in agenti berejo zanesljivo.",
            "Preimenuj `porocilo.docx` v `porocilo.zip`, odpri in prepričaj se sam."
          ],
          code: {
            file: "docx_je_zip.py",
            src: `import zipfile

with zipfile.ZipFile("porocilo.docx") as z:
    for ime in z.namelist()[:4]:
        print(ime)`,
            out: `[Content_Types].xml
_rels/.rels
word/document.xml
word/styles.xml`,
            note: "word/document.xml je celotno besedilo dokumenta."
          },
          deeper: "To pojasni, zakaj agent brez težav prebere Wordov dokument, s sliko iste strani pa ima " +
                  "velike težave: prvo je zapakiran tekst, drugo so pike. Velja tudi obratno — ko od agenta " +
                  "zahtevaš Wordov dokument, ga v resnici sestavi iz teh XML delov.",
          refs: [
            { t: "Wikipedia — Office Open XML", url: "https://en.wikipedia.org/wiki/Office_Open_XML" }
          ],
          notes: "Preimenovanje v .zip je trik, ki ga publika rada preizkusi. Povej, naj najprej naredi kopijo.",
          links: ["3.2", "3.10"]
        },

        {
          id: "3.8", core: true, t: "Slika ali risba", tag: "raster vs. vector (.png / .svg)",
          s: [
            "`.jpeg` in `.png` sta mreži pik — povečaj ju in postanejo mehki.",
            "`.svg` je navodilo za risanje, zapisano kot tekst: *črta od tu do tam, krog s tem polmerom*.",
            "SVG lahko agent prebere in spremeni; sliko iz pik lahko samo pogleda."
          ],
          code: {
            file: "svg_je_tekst.py",
            src: `svg = open("assets/img/logo.svg", encoding="utf-8").read()

print(svg[:90])`,
            out: `<svg role="img" aria-label="Zlata ovca" version="1.1"
 xmlns="http://www.w3.org/2000/svg" viewBox=`,
            note: "To je logotip te predstavitve. Je navaden tekst - zato se barva po temi strani."
          },
          deeper: "Praktična posledica: logotipe, ikone, diagrame in grafe hrani v SVG, fotografije pa v JPEG. " +
                  "SVG je poljubno velik brez izgube kakovosti, zavzame malo prostora in ga lahko kadarkoli " +
                  "prebarvaš — tudi z agentom, ki mu preprosto rečeš, naj spremeni barvo. Pri fotografiji " +
                  "to ni mogoče, ker v njej ni oblik, samo pike.",
          refs: [
            { t: "MDN — SVG", url: "https://developer.mozilla.org/en-US/docs/Web/SVG" }
          ],
          notes: "Logotip v glavi strani je živ primer — pokaži preklop teme in kako se ovca prebarva.",
          links: ["3.2", "6.2"]
        },

        {
          id: "3.9", core: false, t: "HTML", tag: ".html",
          s: [
            "HTML je tekst z oznakami, ki povedo, kaj je naslov, kaj odstavek in kaj povezava.",
            "Brskalnik ga ne prikaže kot tekst, ampak ga *izvede* in nariše stran.",
            "Datoteka `.html` je samostojna — dvoklik jo odpre tudi brez interneta."
          ],
          code: {
            file: "naredi_stran.py",
            src: `html = """<!doctype html>
<html lang="sl">
  <body>
    <h1>Pozdravljeni</h1>
    <p>To je <b>spletna stran</b>.</p>
  </body>
</html>"""

open("stran.html", "w", encoding="utf-8").write(html)`,
            out: `(dvoklik na stran.html odpre brskalnik)`,
            note: "Gradivo, ki ga berete, je ena taka datoteka. Vec v Modulu 6."
          },
          deeper: "Prav ta lastnost — da je stran samo datoteka — je razlog za Modul 7: spletno tehnologijo " +
                  "lahko uporabiš za povsem lokalno aplikacijo, ki ne potrebuje niti interneta niti namestitve. " +
                  "Na službenem računalniku, kjer ne smeš nameščati programov, je to pogosto edina pot do " +
                  "lastnega orodja.",
          refs: [
            { t: "MDN — HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
          ],
          notes: "Napovej Modul 7 — ta slajd je njegova priprava.",
          links: ["6.2", "7.7"]
        },

        {
          id: "3.10", core: true, t: "Kateri formati so AI-prijazni", tag: "AI-friendly formats",
          s: [
            "Pravilo je preprosto: bližje kot je format navadnemu tekstu, manj težav boš imel.",
            "Če imaš na voljo izvor podatkov, ga uporabi — izvozi CSV namesto da pošlješ zaslonsko sliko tabele.",
            "Pretvorba je vedno prvi korak, ne boljši prompt."
          ],
          cmds: [
            [".txt  .md", "odlično — čisti tekst, nobene pretvorbe"],
            [".csv", "odlično — tabela kot tekst"],
            [".json", "odlično — struktura kot tekst"],
            [".html  .svg", "odlično — tekst z oznakami"],
            [".docx  .xlsx", "dobro — zapakiran tekst, bere se zanesljivo"],
            [".pdf iz besedila", "srednje — besedilo se izlušči, postavitev tabel se izgubi"],
            [".pdf iz skena", "slabo — najprej OCR"],
            [".jpeg  .png", "slabo — model vidi sliko, ne podatkov"],
            ["zaslonska slika tabele", "najslabše — skoraj vedno obstaja izvorna datoteka"]
          ],
          deeper: "Vrstni red v tabeli je hkrati vrstni red, po katerem naj iščeš vir podatkov. Preden " +
                  "fotografiraš zaslon, se vprašaj, ali obstaja izvoz. Preden pošlješ PDF, se vprašaj, ali " +
                  "obstaja Excel, iz katerega je nastal. Vsak korak nazaj proti izvoru ti prihrani eno " +
                  "pretvorbo in eno mesto, kjer se lahko izgubijo podatki.",
          refs: [
            { t: "Anthropic — delo z datotekami in dokumenti", url: "https://docs.claude.com/en/docs/build-with-claude/files" }
          ],
          notes: "To je najbolj praktična tabela v gradivu. Priporoči, naj jo natisnejo.",
          links: ["3.2", "3.6", "10.17"]
        },

        {
          id: "3.11", core: true, t: "OCR — iz slike v tekst", tag: "OCR",
          s: [
            "OCR [[optical character recognition]] je postopek, ki iz slike prepozna črke in vrne navaden tekst.",
            "Deluje v korakih: poravna sliko, jo očisti, poišče vrstice in oblike znakov ter za vsako ugane črko.",
            "Ker gre za ugibanje, dela napake — najpogosteje zamenja `0` in `O` ter `1` in `l`.",
            "Rezultat OCR zato vedno preveri, še posebej pri zneskih in davčnih številkah."
          ],
          code: {
            file: "ocr.py",
            src: `# pip install pytesseract pillow  (+ program Tesseract)
import pytesseract
from PIL import Image

slika = Image.open("racun_sken.png")
besedilo = pytesseract.image_to_string(slika, lang="slv")

print(besedilo[:60])`,
            out: `RACUN st. 2026-0148
Datum: 12.09.2026
Znesek: 1.2O0,00 EUR`,
            note: "Poglej zadnjo vrstico: 1.2O0 - OCR je namesto nicle prepoznal crko O."
          },
          deeper: "Sodobni jezikovni modeli znajo sliko prebrati tudi sami, brez posebnega OCR programa, in so " +
                  "pri razgibanih postavitvah pogosto boljši. Slabost je ista kot pri klasičnem OCR — ugibanje " +
                  "ostane ugibanje. Dobro pravilo za pisarno: OCR uporabi za iskanje in pregled, nikoli pa " +
                  "ne prepiši zneska iz OCR v računovodstvo brez pogleda na izvirnik.",
          refs: [
            { t: "Tesseract OCR (odprtokodni program)", url: "https://github.com/tesseract-ocr/tesseract" },
            { t: "Wikipedia — Optical character recognition", url: "https://en.wikipedia.org/wiki/Optical_character_recognition" }
          ],
          notes: "Napaka 1.2O0 v izpisu je namerna. Počakaj, da jo nekdo opazi — učinek je močnejši.",
          links: ["3.2", "3.6", "10.8"]
        }

      ]
    },

    {
      id: 4,
      t: "Podatki in baze",
      sub: "Od Excelove tabele do prave baze podatkov, v štirih korakih in brez preskoka.",
      items: [

        {
          id: "4.1", core: true, t: "Excel kot izhodišče", tag: "spreadsheet",
          s: [
            "Excelova tabela je že skoraj baza podatkov: ima stolpce z imeni in vrstice z vrednostmi.",
            "Formula v Excelu je isto kot vrstica kode — le da jo moraš vsakič znova povleči po stolpcu.",
            "Program naredi isti izračun, a ga lahko jutri ponoviš na drugi datoteki, ne da bi se česa dotaknil."
          ],
          code: {
            file: "sestej.py",
            src: `# V Excelu bi napisal:  =SUM(C2:C4)
# V Pythonu:

import csv

with open("gostje.csv", encoding="utf-8") as f:
    zneski = [int(v["znesek"]) for v in csv.DictReader(f)]

print(sum(zneski))`,
            out: `475`,
            note: "Isti rezultat. Razlika je v tem, da to kodo jutri pozenes na 300 datotekah."
          },
          deeper: "Meja Excela se pokaže na treh mestih: ko podatkov ni več mogoče obdržati v eni tabeli, ko mora " +
                  "do njih hkrati dostopati več ljudi, in ko je treba isti postopek ponoviti vsak teden. " +
                  "Prvi dve težavi rešuje baza, tretjo program. Dokler nobena od teh treh ne boli, je Excel " +
                  "povsem spodobna izbira in tega ti ne bo povedal noben razvijalec.",
          refs: [
            { t: "Python — modul csv", url: "https://docs.python.org/3/library/csv.html" }
          ],
          notes: "Ne blati Excela. Publika ga uporablja vsak dan in ima prav.",
          links: ["3.4", "4.3"]
        },

        {
          id: "4.2", core: true, t: "Isti podatki, štiri oblike", tag: "same data, four shapes",
          s: [
            "Ena sama vrstica podatkov se zapiše na štiri načine, ki jih boš srečeval povsod.",
            "Vsebina je v vseh štirih enaka — razlikuje se le zapis in to, kdo ga bere.",
            "Ko to enkrat vidiš, prenehajo biti CSV, JSON in SQL tri različne skrivnosti."
          ],
          code: {
            file: "stiri_oblike.py",
            src: `# 1) Excel - vrstice in stolpci
#      ime    | znesek
#      Novak  |    120

# 2) CSV - tabela kot tekst
csv_zapis = "ime,znesek\\nNovak,120"

# 3) JSON - objekt kot tekst
json_zapis = '[{"ime": "Novak", "znesek": 120}]'

# 4) SQL - ukaz bazi
sql_zapis = "INSERT INTO stranke (ime, znesek) VALUES ('Novak', 120);"`,
            note: "Stirje zapisi, ena sama informacija: Novak, 120."
          },
          deeper: "Izbira med njimi ni vprašanje okusa, ampak namena. CSV je za izmenjavo. JSON je za pogovor " +
                  "med programi. SQL je za shranjevanje in iskanje. Excel je za človeka, ki hoče videti in " +
                  "popraviti. Skoraj vsako delo s podatki je v resnici prehajanje med temi štirimi oblikami.",
          refs: [
            { t: "Wikipedia — Comma-separated values", url: "https://en.wikipedia.org/wiki/Comma-separated_values" }
          ],
          notes: "Preberi vse štiri na glas in poudari, da povedo isto. To je ključni trenutek modula.",
          links: ["3.4", "3.5", "4.5"]
        },

        {
          id: "4.3", core: true, t: "Kaj je baza podatkov", tag: "database",
          s: [
            "Baza je program, ki hrani podatke in zna hitro odgovarjati na vprašanja o njih.",
            "Od datoteke se loči po treh stvareh: vodi red, zna iskati med milijoni vrstic in prenese več hkratnih uporabnikov.",
            "Najpreprostejša baza je ena sama datoteka — SQLite je vgrajen že v Python, brez namestitve."
          ],
          code: {
            file: "baza.py",
            src: `import sqlite3

baza = sqlite3.connect("podjetje.db")    # nastane datoteka

baza.execute("CREATE TABLE IF NOT EXISTS stranke ("
             "id INTEGER PRIMARY KEY, ime TEXT, znesek INTEGER)")
baza.execute("INSERT INTO stranke (ime, znesek) VALUES ('Novak', 120)")
baza.commit()

print(baza.execute("SELECT * FROM stranke").fetchall())`,
            out: `[(1, 'Novak', 120)]`,
            note: "Cela baza je ena datoteka podjetje.db. Prav to uporablja tvoj telefon za sporocila."
          },
          deeper: "Velike baze (PostgreSQL, MySQL, SQL Server) so isti koncept, le da tečejo kot samostojen " +
                  "strežnik, do katerega se poveže več programov hkrati. Za osebno orodje ali prototip je " +
                  "SQLite skoraj vedno prava izbira: nič za namestiti, nič za nastaviti, in celotno bazo " +
                  "prekopiraš tako, da prekopiraš datoteko.",
          refs: [
            { t: "Python — modul sqlite3", url: "https://docs.python.org/3/library/sqlite3.html" },
            { t: "SQLite — kdaj ga uporabiti", url: "https://www.sqlite.org/whentouse.html" }
          ],
          notes: "Omeni, da je SQLite v vsakem telefonu in brskalniku. Publiko to preseneti.",
          links: ["3.1", "4.4"]
        },

        {
          id: "4.4", core: true, t: "Relacijska baza in ključi", tag: "relational database, primary/foreign key",
          s: [
            "Relacijska baza hrani podatke v več tabelah, ki so med sabo povezane.",
            "Vsaka vrstica ima svojo enolično številko — primarni ključ [[primary key]].",
            "Druga tabela se nanjo sklicuje s to isto številko — tujim ključem [[foreign key]].",
            "Tako se podatek o stranki zapiše enkrat, čeprav ima stranka petdeset naročil."
          ],
          code: {
            file: "kljuci.py",
            src: `baza.execute("CREATE TABLE narocila ("
             "id INTEGER PRIMARY KEY,"
             "stranka_id INTEGER,"      # tuji kljuc -> stranke.id
             "znesek INTEGER)")

baza.execute("INSERT INTO narocila (stranka_id, znesek) VALUES (1, 120)")
baza.execute("INSERT INTO narocila (stranka_id, znesek) VALUES (1, 45)")
baza.commit()

vrstice = baza.execute(
    "SELECT stranke.ime, narocila.znesek "
    "FROM narocila JOIN stranke ON stranke.id = narocila.stranka_id"
).fetchall()

print(vrstice)`,
            out: `[('Novak', 120), ('Novak', 45)]`,
            note: "Ime 'Novak' je v bazi zapisano enkrat samkrat, pa se pojavi v obeh vrsticah."
          },
          deeper: "Prav zaradi te lastnosti je relacijska baza tako močna: ko stranka spremeni e-naslov, " +
                  "ga popraviš na enem mestu in pravilen je povsod. V Excelu bi ga moral popraviti v vseh " +
                  "petdesetih vrsticah — in ena bi zagotovo ostala stara. To je isti princip kot spremenljivka " +
                  "iz pojma 1.2, le na ravni podatkov.",
          refs: [
            { t: "Wikipedia — Relational database", url: "https://en.wikipedia.org/wiki/Relational_database" }
          ],
          notes: "Poveži z 1.2 — ena resnica na enem mestu. Publika to takoj razume.",
          links: ["1.2", "4.5"]
        },

        {
          id: "4.5", core: true, t: "SQL", tag: "SQL",
          s: [
            "SQL je jezik za pogovor z bazo in je presenetljivo podoben angleškemu stavku.",
            "Povedati ti ni treba, *kako* naj baza podatke poišče — samo, *kaj* hočeš.",
            "Štiri besede pokrijejo večino vsega: `SELECT`, `FROM`, `WHERE`, `ORDER BY`."
          ],
          code: {
            file: "poizvedba.sql",
            src: `SELECT stranke.ime,
       SUM(narocila.znesek) AS skupaj
FROM narocila
JOIN stranke ON stranke.id = narocila.stranka_id
WHERE narocila.znesek > 50
GROUP BY stranke.ime
ORDER BY skupaj DESC
LIMIT 10;`,
            out: `Novak | 120`,
            note: "Prevod: vzemi naročila nad 50, sestej jih po strankah, uredi padajoce, vrni prvih deset."
          },
          deeper: "SQL je vreden poznavanja tudi, če ne boš nikoli programiral: ko AI agentu rečeš, naj ti " +
                  "pripravi poročilo iz baze, bo napisal SQL — in ti boš moral znati prebrati, ali je zajel " +
                  "prave vrstice. Najpogostejša napaka ni sintaksa, ampak pozabljen pogoj `WHERE`, zaradi " +
                  "katerega poročilo tiho vključi tudi storniranje in testne vnose.",
          refs: [
            { t: "SQLite — jezik SQL", url: "https://www.sqlite.org/lang.html" },
            { t: "Wikipedia — SQL", url: "https://en.wikipedia.org/wiki/SQL" }
          ],
          notes: "Preberi poizvedbo na glas kot slovenski stavek. Deluje skoraj dobesedno.",
          links: ["4.4", "6.7"]
        },

        {
          id: "4.6", core: true, t: "Dokumentna baza", tag: "document database / NoSQL",
          s: [
            "Dokumentna baza ne hrani vrstic, ampak cele objekte — take, kot si jih videl pri JSON.",
            "Vsak zapis ima lahko drugačna polja; vnaprej dogovorjene oblike ni.",
            "Prednost je svoboda, cena pa je, da red nad podatki ni več naloga baze, ampak tvoja."
          ],
          code: {
            file: "dokument.py",
            src: `# En dokument - v relacijski bazi bi bili to dve tabeli
stranka = {
    "ime": "Novak",
    "email": "novak@primer.si",
    "narocila": [
        {"datum": "2026-09-01", "znesek": 120},
        {"datum": "2026-09-14", "znesek": 45},
    ],
}

print(stranka["narocila"][0]["znesek"])`,
            out: `120`,
            note: "MongoDB, Firestore in podobne baze hranijo natanko taksne dokumente."
          },
          deeper: "Nevarnost dokumentnih baz je tiha: ker vnaprejšnje oblike ni, se čez leto dni v isti zbirki " +
                  "znajdejo zapisi s poljem `email`, `e-mail` in `mail`. Baza ne bo javila ničesar, poročilo pa " +
                  "bo izpustilo tretjino strank. V relacijski bazi bi tak vnos preprosto zavrnila.",
          refs: [
            { t: "Wikipedia — Document-oriented database", url: "https://en.wikipedia.org/wiki/Document-oriented_database" }
          ],
          notes: "Poveži z 1.5 in 3.5 — to je isti objekt, tokrat shranjen.",
          links: ["1.5", "3.5", "4.7"]
        },

        {
          id: "4.7", core: false, t: "Kdaj katera", tag: "choosing a store",
          s: [
            "Izbira je skoraj vedno odvisna od enega vprašanja: ali so podatki povsod enake oblike?",
            "Če so, vzemi relacijsko bazo — pomagala ti bo obdržati red.",
            "Če niso in se oblika še išče, je dokumentna baza hitrejša pot do delujočega prototipa."
          ],
          cmds: [
            ["Excel / CSV", "do nekaj tisoč vrstic, en uporabnik, ročno delo"],
            ["SQLite", "osebno orodje, prototip, ena aplikacija — brez namestitve"],
            ["PostgreSQL / MySQL", "več uporabnikov hkrati, pomembni podatki, poročila"],
            ["MongoDB / Firestore", "oblika zapisov se še spreminja, veliko gnezdenja"],
            ["JSON datoteka", "nastavitve in majhni seznami — ne pa evidenca"]
          ],
          deeper: "Praktičen nasvet za delo z agentom: povej mu, koliko vrstic pričakuješ, koliko ljudi bo " +
                  "uporabljalo orodje in ali se oblika podatkov še spreminja. To so tri vprašanja, iz katerih " +
                  "izhaja odločitev — brez njih bo agent izbral tisto, kar je videl najpogosteje, kar je " +
                  "pogosto pretirano za tvoj primer.",
          refs: [
            { t: "SQLite — kdaj ga uporabiti", url: "https://www.sqlite.org/whentouse.html" }
          ],
          notes: "Če zmanjkuje časa, pokaži samo tabelo in pojdi naprej.",
          links: ["4.3", "9.8"]
        }

      ]
    },

    {
      id: 5,
      t: "Naslovi in omrežje",
      sub: "Kaj je pravzaprav naslov spletne strani in kako računalnik najde drug računalnik.",
      items: [

        {
          id: "5.1", core: true, t: "Anatomija naslova", tag: "URL",
          s: [
            "Naslov spletne strani ni ena beseda, ampak šest ločenih delov, od katerih ima vsak svojo nalogo.",
            "Ko enkrat vidiš, kje se en del konča in drug začne, naslovi nehajo biti skrivnost.",
            "Del za vprašajem je poizvedba [[query]] — prav ta v tem gradivu nosi izbiro jezika."
          ],
          code: {
            file: "naslov.py",
            src: `from urllib.parse import urlparse

u = urlparse("https://www.zlataovca.si:443/gradivo/index.html?lang=sl#modul3")

print(u.scheme)     # protokol
print(u.hostname)   # gostitelj (domena)
print(u.port)       # vrata
print(u.path)       # pot do datoteke
print(u.query)      # poizvedba
print(u.fragment)   # odsek na strani`,
            out: `https
www.zlataovca.si
443
/gradivo/index.html
lang=sl
modul3`,
            note: "Poglej naslov te strani v brskalniku - ?lang=sl je isti del kot v tem primeru."
          },
          deeper: "Dve praktični posledici. Prvič: vse za vprašajem je viden vsakomur na poti in se zapisuje " +
                  "v dnevnike strežnikov, zato tja nikoli ne sodijo gesla ali osebni podatki. Drugič: `#odsek` " +
                  "se sploh ne pošlje strežniku — to je navodilo brskalniku, kam naj se pomakne na že naloženi " +
                  "strani.",
          refs: [
            { t: "MDN — kaj je URL", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL" },
            { t: "Python — urllib.parse", url: "https://docs.python.org/3/library/urllib.parse.html" }
          ],
          notes: "Pokaži na naslovno vrstico brskalnika in preberi dele na glas. Traja deset sekund, učinek je velik.",
          links: ["5.6", "6.6"]
        },

        {
          id: "5.2", core: true, t: "Domena in DNS", tag: "domain, DNS",
          s: [
            "Računalniki se med sabo ne kličejo po imenih, ampak po številkah.",
            "DNS je imenik, ki ime `example.com` prevede v številko naslova.",
            "Domeno si najameš pri registrarju za nekaj deset evrov na leto — to je najem imena, ne strežnika."
          ],
          code: {
            file: "dns.py",
            src: `import socket

print(socket.gethostbyname("example.com"))
print(socket.gethostbyname("www.python.org"))`,
            out: `172.66.147.243
151.101.64.223`,
            note: "Ista domena lahko cez teden vrne drugo stevilko - imenik se spreminja."
          },
          deeper: "Zato ob selitvi spletne strani traja nekaj ur, preden jo vsi vidijo na novem mestu: imenik se " +
                  "ne posodobi povsod hkrati, saj si vmesni strežniki odgovore nekaj časa zapomnijo. Ista " +
                  "lastnost pojasni, zakaj stran včasih deluje tebi, kolegu pa ne — pri njem je še vedno " +
                  "shranjen star odgovor.",
          refs: [
            { t: "Wikipedia — Domain Name System", url: "https://en.wikipedia.org/wiki/Domain_Name_System" }
          ],
          notes: "Primerjava s telefonskim imenikom je še vedno najboljša. Uporabi jo.",
          links: ["5.3", "7.4"]
        },

        {
          id: "5.3", core: false, t: "IP naslov", tag: "IP address",
          s: [
            "IP naslov je hišna številka računalnika v omrežju, zapisana kot štiri števila med 0 in 255.",
            "Nekateri razponi so rezervirani za domača in pisarniška omrežja in na internetu ne obstajajo.",
            "Prav zato tvojega računalnika od zunaj ni mogoče doseči brez posebne pomoči."
          ],
          cmds: [
            ["127.0.0.1", "ta računalnik, vedno in povsod (`localhost`)"],
            ["192.168.x.x", "domače ali pisarniško omrežje"],
            ["10.x.x.x", "večja podjetniška omrežja"],
            ["172.16–31.x.x", "prav tako zasebno"],
            ["vse ostalo", "javni naslov, dosegljiv z interneta"]
          ],
          deeper: "Ker so zasebni razponi povsod isti, ima tvoj računalnik doma in računalnik v pisarni lahko " +
                  "popolnoma enak naslov `192.168.1.10` — in to ni težava, ker sta v ločenih omrežjih. " +
                  "Posledica pa je, da nekdo z interneta ne more preprosto vpisati tvojega naslova in odpreti " +
                  "tvoje strani. To rešuje tunel iz pojma 7.3.",
          refs: [
            { t: "Wikipedia — Private network", url: "https://en.wikipedia.org/wiki/Private_network" }
          ],
          notes: "Če zmanjkuje časa, pokaži samo tabelo.",
          links: ["5.4", "5.5", "7.3"]
        },

        {
          id: "5.4", core: true, t: "localhost", tag: "localhost / 127.0.0.1",
          s: [
            "`localhost` pomeni *ta računalnik* — naslov, ki nikoli ne zapusti tvoje naprave.",
            "Ko poženeš `zazeni-lokalno.bat`, teče strežnik prav tu in nihče drug ga ne vidi.",
            "To je najvarnejši prostor za preizkušanje: internet o njem ne ve ničesar."
          ],
          code: {
            file: "server.py",
            src: `import http.server, socketserver

with socketserver.TCPServer(("127.0.0.1", 8080),
                            http.server.SimpleHTTPRequestHandler) as srv:
    print("Odpri http://localhost:8080")
    srv.serve_forever()`,
            out: `Odpri http://localhost:8080`,
            note: "Tri vrstice so cel spletni streznik. To gradivo tece na skoraj isti kodi."
          },
          deeper: "Opazi `127.0.0.1` v kodi: strežnik posluša samo na tem naslovu, zato je dosegljiv izključno " +
                  "s tega računalnika. Če bi hotel, da ga vidijo tudi drugi v pisarni, bi moral poslušati na " +
                  "`0.0.0.0`, kar pomeni *na vseh omrežnih karticah*. Prav v tej eni številki je razlika med " +
                  "pojmoma 5.4 in 5.5.",
          refs: [
            { t: "Python — http.server", url: "https://docs.python.org/3/library/http.server.html" }
          ],
          notes: "Pokaži v živo: zazeni-lokalno.bat je res to.",
          links: ["5.5", "7.1"]
        },

        {
          id: "5.5", core: true, t: "Lokalno omrežje", tag: "LAN, 192.168.x.x",
          s: [
            "Ko strežnik posluša na vseh omrežnih karticah, ga vidijo vsi, ki so na isti wifi mreži.",
            "Takrat ne uporabiš `localhost`, ampak naslov tvojega računalnika v tej mreži.",
            "To je najhitrejši način, da nekaj pokažeš kolegu ali odpreš na svojem telefonu."
          ],
          code: {
            file: "lan.py",
            src: `import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))      # ne poslje nicesar, samo izbere kartico
print("http://" + s.getsockname()[0] + ":8080")
s.close()`,
            out: `http://192.168.1.24:8080`,
            note: "Prav to vrstico izpise zazeni-lokalno.bat - odpri jo na telefonu."
          },
          deeper: "Omejitev je, da mora biti druga naprava v isti mreži. Na telefonu to pomeni, da mora biti " +
                  "na wifi in ne na mobilnih podatkih. V podjetjih je pogosto tudi gostujoče wifi omrežje " +
                  "ločeno od službenega, zato naslov deluje z enega, z drugega pa ne — in to ni napaka " +
                  "programa, ampak nastavitev omrežja.",
          refs: [
            { t: "Wikipedia — Private network", url: "https://en.wikipedia.org/wiki/Private_network" }
          ],
          notes: "Tu naj publika dejansko odpre stran na telefonu. Najboljših trideset sekund delavnice.",
          links: ["5.4", "7.2"]
        },

        {
          id: "5.6", core: true, t: "Vrata", tag: "port",
          s: [
            "Na enem računalniku teče več programov hkrati; vrata [[port]] povedo, kateri od njih naj sprejme povezavo.",
            "Naslov je stavba, vrata so številka stanovanja.",
            "Če dobiš napako *port already in use*, v tem stanovanju že nekdo stanuje — izberi drugo številko."
          ],
          cmds: [
            ["80", "navadne spletne strani (http)"],
            ["443", "varne spletne strani (https) — privzeto, zato ga ne vidiš"],
            ["8080  8000  5000", "razvojni strežniki, ki jih poganjaš sam"],
            ["3306  5432", "baze podatkov (MySQL, PostgreSQL)"],
            ["22", "oddaljena prijava na strežnik (SSH)"]
          ],
          deeper: "Zato v naslovu spletne strani vrat običajno ne vidiš: brskalnik pri `https://` sam doda 443. " +
                  "Pri lastnem strežniku jih moraš navesti, ker 8080 ni privzet. Če te zanima, kaj na tvojem " +
                  "računalniku trenutno zaseda vrata, ti to v ukaznem pozivu pove `netstat -ano | findstr 8080`.",
          refs: [
            { t: "Wikipedia — seznam vrat TCP in UDP", url: "https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers" }
          ],
          notes: "Analogija stavba/stanovanje zadošča. Ne omenjaj TCP in UDP.",
          links: ["5.1", "5.4"]
        },

        {
          id: "5.7", core: true, t: "Zahteva in odgovor", tag: "HTTP request / response",
          s: [
            "Splet deluje po preprostem vzorcu: brskalnik pošlje zahtevo, strežnik vrne odgovor, povezava se zapre.",
            "Zahteva pove metodo (`GET` ali `POST`), pot in nekaj dodatnih podatkov v glavah [[headers]].",
            "Odgovor vrne statusno kodo, glave in vsebino — datoteko, sliko ali JSON."
          ],
          code: {
            file: "zahteva.py",
            src: `import urllib.request

with urllib.request.urlopen("http://localhost:8080/index.html") as odgovor:
    print(odgovor.status)
    print(odgovor.headers["Content-Type"])
    print(len(odgovor.read()), "bajtov")`,
            out: `200
text/html; charset=utf-8
2184 bajtov`,
            note: "Tocno to naredi brskalnik, ko vpises naslov - le da vsebino se narise."
          },
          deeper: "Pomembna lastnost je, da si strežnik med dvema zahtevama ničesar ne zapomni — vsaka zahteva " +
                  "je nova in prazna. Zato obstajajo piškotki in prijavni žetoni: da lahko brskalnik ob vsaki " +
                  "zahtevi znova pove, kdo si. Ta ista lastnost je razlog, da AI agenti potrebujejo kontekst, " +
                  "ki se pošlje ob vsakem sporočilu — o tem v Modulu 10.",
          refs: [
            { t: "MDN — pregled protokola HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" }
          ],
          notes: "Poudari 'strežnik si ne zapomni ničesar'. To je most do context window v Modulu 10.",
          links: ["6.6", "6.7", "10.5"]
        },

        {
          id: "5.8", core: true, t: "Statusne kode", tag: "status codes",
          s: [
            "Vsak odgovor se začne s trimestno številko, ki pove, kako se je zahteva iztekla.",
            "Prva števka je vse, kar si moraš zapomniti: 2 je v redu, 3 je preusmeritev, 4 je tvoja napaka, 5 je njihova.",
            "Znamenita 404 torej ne pomeni *pokvarjeno*, ampak *tega naslova ni*."
          ],
          cmds: [
            ["200 OK", "vse je v redu, vsebina je priložena"],
            ["301 / 302", "vsebina se je preselila, pojdi drugam"],
            ["400 Bad Request", "zahteva je napačno sestavljena"],
            ["401 / 403", "nisi prijavljen / nimaš dovoljenja"],
            ["404 Not Found", "na tem naslovu ni ničesar"],
            ["429 Too Many Requests", "preveč zahtev prehitro — počakaj"],
            ["500 Internal Server Error", "strežnik se je sesul — napaka je pri njih"],
            ["503 Service Unavailable", "strežnik je preobremenjen ali na vzdrževanju"]
          ],
          deeper: "Razlika med 4xx in 5xx je pri delu z agenti zelo praktična: če dobiš 401 ali 403, je treba " +
                  "popraviti ključ ali dovoljenja na tvoji strani. Če dobiš 500, popravljanje prompta ne bo " +
                  "pomagalo — težava je pri storitvi in edino smiselno je počakati ali javiti. Koda 429 pomeni, " +
                  "da si dosegel omejitev števila zahtev; takrat se splača vgraditi premor med klici.",
          refs: [
            { t: "MDN — statusne kode HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" }
          ],
          notes: "Pravilo 'prva števka je vse' je tisto, kar publika odnese. Ostalo je referenca.",
          links: ["5.7", "6.6"]
        }

      ]
    },

    {
      id: 6,
      t: "Kako deluje spletna stran",
      sub: "Kaj se v resnici zgodi med klikom na gumb in prikazom rezultata.",
      items: [

        {
          id: "6.1", core: true, t: "Brskalnik je izvajalec", tag: "browser / rendering engine",
          s: [
            "Brskalnik ni okno v internet, ampak program, ki datoteke prevzame in jih **izvede** na tvojem računalniku.",
            "Ko vpišeš naslov, prenese nekaj datotek, jih prebere in iz njih nariše stran.",
            "Vse, kar potem vidiš in klikaš, se dogaja lokalno — ne na strežniku."
          ],
          code: {
            term: true,
            file: "Kaj brskalnik prenese",
            src: `GET /index.html          -> 2 KB  (vsebina in zgradba)
GET /assets/css/style.css -> 12 KB  (videz)
GET /assets/js/app.js     -> 18 KB  (obnasanje)
GET /assets/img/logo.svg  -> 25 KB  (slika)

Skupaj: 4 zahteve, 57 KB. Stran je narisana.`,
            note: "To so dejanske datoteke tega gradiva. Odpri F12 -> Network in poglej sam."
          },
          deeper: "Prav zato je mogoče stran odpreti tudi brez strežnika: če datoteke že imaš na disku, brskalnik " +
                  "nima kaj prenašati in jih preprosto prebere. Dvoklik na `index.html` naredi natanko to. " +
                  "Ta lastnost je temelj Modula 7 in razlog, zakaj lahko na službenem računalniku, kjer ne smeš " +
                  "ničesar nameščati, vseeno poganjaš lastno aplikacijo.",
          refs: [
            { t: "MDN — tvoja prva spletna stran", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website" }
          ],
          notes: "Odpri razvijalska orodja s F12 in pokaži zavihek Network v živo. Nazorno in hitro.",
          links: ["3.9", "7.7"]
        },

        {
          id: "6.2", core: true, t: "HTML — zgradba", tag: "HTML",
          s: [
            "HTML pove, *kaj* je na strani: naslov, odstavek, seznam, gumb, slika.",
            "Oznake so v koničastih oklepajih in se skoraj vedno pojavijo v paru — odprta in zaprta.",
            "O videzu HTML ne pove ničesar; to je naloga CSS."
          ],
          code: {
            file: "index.html",
            src: `<!doctype html>
<html lang="sl">
  <body>
    <h1>Gostje</h1>
    <ul id="seznam">
      <li>Ana Novak</li>
    </ul>
    <button id="dodaj">Dodaj gosta</button>
  </body>
</html>`,
            note: "Vsak element ima lahko id - to je ime, po katerem ga pokliceta CSS in JavaScript."
          },
          deeper: "Ko brskalnik HTML prebere, ga spremeni v drevo elementov, ki mu pravimo [[DOM]]. To drevo je " +
                  "tisto, kar JavaScript spreminja — in prav zato se stran lahko spremeni, ne da bi se znova " +
                  "naložila. Ko agentu rečeš *dodaj gumb*, bo v resnici dodal eno vrstico v to strukturo.",
          refs: [
            { t: "MDN — HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
            { t: "MDN — kaj je DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" }
          ],
          notes: "Primerjava s skeletom, obleko in mišicami deluje — a povej jo šele po 6.4, ko so vsi trije zraven.",
          links: ["3.9", "6.3"]
        },

        {
          id: "6.3", core: true, t: "CSS — videz", tag: "CSS",
          s: [
            "CSS pove, *kako* naj stvari izgledajo: barve, velikosti, razmiki, postavitev.",
            "Pravilo izbere elemente in jim določi lastnosti — nič več kot to.",
            "Ista HTML stran z drugim CSS je videti kot povsem drug izdelek."
          ],
          code: {
            file: "style.css",
            src: `:root {
  --accent: #d97757;      /* ena barva na enem mestu */
}

button {
  background: var(--accent);
  color: white;
  border: 0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
}`,
            note: "To je res koda tega gradiva. Spremeni --accent in vse skupaj zamenja barvo."
          },
          deeper: "Zapis `--accent` je spremenljivka iz pojma 1.2, le v CSS. Prav na tem temelji preklop med " +
                  "temno in svetlo temo na tej strani: HTML se ne spremeni niti za znak, zamenja se samo " +
                  "peščica barvnih spremenljivk. Če boš kdaj agentu rekel *spremeni barvno shemo*, je to " +
                  "mesto, kjer bo delal.",
          refs: [
            { t: "MDN — CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }
          ],
          notes: "Preklopi temo pred publiko in povej, da se je spremenilo pet vrstic CSS, nič drugega.",
          links: ["1.2", "6.2"]
        },

        {
          id: "6.4", core: true, t: "JavaScript — obnašanje", tag: "JavaScript / TypeScript",
          s: [
            "JavaScript je edini programski jezik, ki ga brskalnik razume neposredno.",
            "Poskrbi za vse, kar se zgodi *potem*: klik, vnos, preverjanje, spreminjanje strani.",
            "TypeScript je isti jezik z dodanimi podatkovnimi tipi iz pojma 1.3 — napake se pokažejo že med pisanjem."
          ],
          code: {
            file: "app.js",
            src: `const gumb = document.getElementById("dodaj");
const seznam = document.getElementById("seznam");

gumb.addEventListener("click", function () {
    const vrstica = document.createElement("li");
    vrstica.textContent = "Nov gost";
    seznam.appendChild(vrstica);
});`,
            note: "Klik na gumb doda vrstico. Stran se pri tem ne nalozi znova."
          },
          deeper: "Opazi, da ta primer nikoli ne pokliče strežnika — vrstica se doda samo v brskalniku in ob " +
                  "osvežitvi strani izgine. To je ključna razlika med *videti se je spremenilo* in " +
                  "*shranjeno je*. Za drugo potrebuješ API klic in bazo, kar sta naslednja dva pojma.",
          refs: [
            { t: "MDN — JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
            { t: "TypeScript — dokumentacija", url: "https://www.typescriptlang.org/docs/" }
          ],
          notes: "Poanta slajda je zadnji stavek poglobitve: brez strežnika sprememba ni shranjena.",
          links: ["1.3", "6.6", "8.5"]
        },

        {
          id: "6.5", core: true, t: "Frontend in backend", tag: "frontend / backend",
          s: [
            "Frontend je vse, kar teče v brskalniku pri uporabniku — HTML, CSS, JavaScript.",
            "Backend je program, ki teče na strežniku in hrani podatke ter skrbi za pravila.",
            "Meja med njima je pomembna zato, ker je frontend viden in spremenljiv vsakomur."
          ],
          code: {
            file: "kje_tece.py",
            src: `# BACKEND - tece na strezniku, uporabnik ga ne vidi
def sme_videti_racun(uporabnik, racun):
    return racun.lastnik_id == uporabnik.id       # <- pravo preverjanje

# FRONTEND - tece v brskalniku, vsak ga lahko prebere in spremeni
# if (uporabnik.jeLastnik) { prikaziGumb(); }     <- samo videz`,
            note: "Skrivanje gumba ni varnost. Varnost je preverjanje na strezniku."
          },
          deeper: "To je najpogostejša varnostna napaka začetnikov in tudi AI agentov: pravilo se preveri samo " +
                  "v brskalniku. Kdorkoli lahko odpre razvijalska orodja, spremeni kodo in gumb prikaže nazaj. " +
                  "Pravilo se zato glasi: frontend skrbi za udobje, backend za resnico. Kar je pomembno, " +
                  "mora biti preverjeno tam, kjer uporabnik nima dostopa.",
          refs: [
            { t: "MDN — kaj je API", url: "https://developer.mozilla.org/en-US/docs/Glossary/API" }
          ],
          notes: "Povej jasno: skrit gumb ni varnost. To je stavek, ki reši marsikatero aplikacijo.",
          links: ["6.6", "7.8", "10.9"]
        },

        {
          id: "6.6", core: true, t: "API klic", tag: "API call",
          s: [
            "API je dogovorjen seznam vprašanj, ki jih program lahko postavi drugemu programu.",
            "Brskalnik pošlje zahtevo na naslov, strežnik vrne JSON — brez slik in brez oblikovanja.",
            "Ista vrata uporabljajo mobilne aplikacije, drugi programi in AI agenti."
          ],
          code: {
            file: "klic.js",
            src: `async function shraniGosta(ime) {
    const odgovor = await fetch("/api/gostje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ime: ime })
    });

    if (!odgovor.ok) throw new Error("Napaka " + odgovor.status);
    return await odgovor.json();
}`,
            out: `{ "id": 42, "ime": "Nov gost", "shranjeno": true }`,
            note: "POST pomeni 'shrani', GET pomeni 'daj mi'. Odgovor je JSON iz pojma 3.5."
          },
          deeper: "Zdaj se sestavi celotna slika: JSON iz Modula 3 je oblika sporočila, statusna koda iz Modula 5 " +
                  "pove, kako se je izteklo, baza iz Modula 4 pa je tisto, kamor se podatek dejansko zapiše. " +
                  "Prav tako deluje tudi MCP iz Modula 10 — agent pošlje zahtevo orodju in dobi nazaj JSON.",
          refs: [
            { t: "MDN — uporaba fetch", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" }
          ],
          notes: "Tu poveži nazaj na module 3, 4 in 5. Publika naj vidi, da se stvari sestavljajo.",
          links: ["3.5", "4.3", "5.7", "10.17"]
        },

        {
          id: "6.7", core: true, t: "Pot enega klika", tag: "the journey of one click",
          s: [
            "Klik na gumb sproži verigo šestih korakov, ki se zgodi v nekaj stotinkah sekunde.",
            "Vsak korak lahko odpove — in statusna koda ti pove, kateri.",
            "Ko to pot enkrat vidiš, znaš vprašanje *zakaj ne dela* postaviti veliko bolj natančno."
          ],
          cmds: [
            ["1. Brskalnik", "uporabnik klikne gumb, sproži se JavaScript"],
            ["2. Zahteva", "`POST /api/gostje` z JSON vsebino"],
            ["3. Strežnik", "preveri dovoljenja in pravila (`6.5`)"],
            ["4. Baza", "`INSERT INTO gostje ...` — podatek se zapiše"],
            ["5. Odgovor", "`200 OK` in JSON z novim zapisom"],
            ["6. Brskalnik", "prejme odgovor in posodobi stran"]
          ],
          deeper: "Diagnostika po korakih: če se v razvijalskih orodjih zahteva sploh ne pojavi, je težava v " +
                  "koraku 1. Če dobiš 401 ali 403, je v koraku 3. Če dobiš 500, je v koraku 3 ali 4 na strežniku. " +
                  "Če dobiš 200, a se na strani nič ne spremeni, je v koraku 6. Prav ta razčlenitev je tisto, " +
                  "kar boš povedal agentu, in razlika med *ne dela* in *zahteva vrne 500* je razlika med uro " +
                  "in minuto iskanja.",
          refs: [
            { t: "MDN — statusne kode HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" }
          ],
          notes: "Najbolj uporaben slajd modula. Preberi vseh šest korakov počasi.",
          links: ["5.8", "6.6", "2.4"]
        },

        {
          id: "6.8", core: false, t: "Statično in dinamično", tag: "static vs. dynamic",
          s: [
            "Statična stran je datoteka, ki se vsem prikaže enako — strežnik jo samo pošlje naprej.",
            "Dinamična stran se sestavi za vsakega uporabnika posebej, ker mora pogledati v bazo.",
            "To gradivo je statično, zato deluje tudi brez interneta in brez strežnika."
          ],
          code: {
            file: "razlika.py",
            src: `# STATICNO - streznik samo poslje datoteko
#   GET /index.html  ->  index.html

# DINAMICNO - streznik stran sestavi ob vsaki zahtevi
def stran_za(uporabnik):
    narocila = baza.execute(
        "SELECT * FROM narocila WHERE stranka_id = ?", (uporabnik.id,)
    ).fetchall()
    return sestavi_html(narocila)`,
            note: "Staticno je hitrejse in varnejse. Dinamicno je potrebno, ko je vsebina osebna."
          },
          deeper: "Pogosta in zelo praktična kombinacija je vmesna pot: stran je statična, podatke pa si " +
                  "pridobi z API klici iz pojma 6.6. Tako dobiš hitrost statične strani in svežino dinamične. " +
                  "Prav to počne večina sodobnih aplikacij — in prav to počne tudi gradivo, ki ga bereš, " +
                  "le da namesto strežnika bere svoje podatkovne datoteke.",
          refs: [
            { t: "Wikipedia — Static web page", url: "https://en.wikipedia.org/wiki/Static_web_page" }
          ],
          notes: "Če zmanjkuje časa, preskoči — poanta se ponovi v Modulu 7.",
          links: ["6.6", "7.5"]
        }

      ]
    },

    {
      id: 7,
      t: "Kje koda živi",
      sub: "Lestvica gostovanja od tvojega računalnika do oblaka — s ceno, dovoljenji in pastmi vsake stopnje.",
      items: [

        {
          id: "7.1", core: true, t: "Prva stopnja: moj računalnik", tag: "localhost",
          s: [
            "Najnižja stopnja gostovanja je tvoj računalnik: program teče, ko ga poženeš, in umre, ko okno zapreš.",
            "Nič ne stane, nikogar ni treba prositi za dovoljenje in nihče drug ne vidi ničesar.",
            "Za učenje, preizkušanje in osebna orodja je to povsem dovolj — in pogosto najboljša izbira."
          ],
          code: {
            term: true,
            file: "zazeni-lokalno.bat",
            src: `D:\\projekt> python tools\\server.py

  Na tem racunalniku:   http://localhost:8080
  V lokalnem omrezju:   http://192.168.1.24:8080

  Ustavi z:  Ctrl + C`,
            note: "Dokler to okno tece, stran zivi. Ko ga zapres, je ni vec."
          },
          deeper: "Prav ta lastnost — da nič ni trajno — je za začetek prednost, ne pomanjkljivost. Ničesar ne " +
                  "moreš pokvariti, nikomur ne moreš razkriti podatkov in vse lahko kadarkoli izbrišeš. " +
                  "Preden karkoli postaviš višje po tej lestvici, naj na tej stopnji deluje brezhibno.",
          refs: [
            { t: "Python — http.server", url: "https://docs.python.org/3/library/http.server.html" }
          ],
          notes: "Povej, da je to natanko tisto, kar teče zdaj na tvojem računalniku.",
          links: ["5.4", "7.2"]
        },

        {
          id: "7.2", core: true, t: "Druga stopnja: pisarna", tag: "LAN hosting",
          s: [
            "Če strežnik posluša na vseh omrežnih karticah, ga vidijo vsi na isti wifi mreži.",
            "Še vedno ne stane nič in še vedno ni treba ničesar nameščati na tuje naprave.",
            "Za predstavitev sodelavcem ali za orodje, ki ga uporablja ena ekipa, je to pogosto dovolj."
          ],
          cmds: [
            ["Cena", "nič"],
            ["Dovoljenja", "nobenih — razen če IT blokira porte"],
            ["Kdo vidi", "vsi na isti mreži"],
            ["Ko ugasneš računalnik", "nedosegljivo"],
            ["Tipična raba", "orodje za ekipo, demo na sestanku"]
          ],
          deeper: "Omejitev, ki v podjetjih največkrat zagode, ni tehnična, ampak organizacijska: gostujoče " +
                  "wifi omrežje je pogosto ločeno od službenega, požarni zid pa lahko blokira vse razen " +
                  "brskanja. Če naslov deluje tebi in kolegu ne, najprej preveri, ali sta res na isti mreži.",
          refs: [
            { t: "Wikipedia — Private network", url: "https://en.wikipedia.org/wiki/Private_network" }
          ],
          notes: "Vprašaj, ali je kdo že poskusil kaj pokazati kolegu prek svojega naslova. Zgodbe so poučne.",
          links: ["5.5", "7.3"]
        },

        {
          id: "7.3", core: true, t: "Tretja stopnja: tunel", tag: "tunnel (trycloudflare, ngrok)",
          s: [
            "Tunel je program, ki iz tvojega računalnika vzpostavi povezavo navzven in ti podeli javni naslov.",
            "Ker povezavo vzpostaviš ti, požarnemu zidu ni treba ničesar odpirati — in prav zato deluje tudi v službi.",
            "Naslov je začasen: velja, dokler okno teče, in ob naslednjem zagonu je drugačen."
          ],
          code: {
            term: true,
            file: "zazeni-javno.bat",
            src: `D:\\projekt> python tools\\tunnel.py

  Odpiram javni tunel ...

  +--------------------------------------------+
  |  https://nekaj-nakljucnih-besed.trycloudflare.com  |
  +--------------------------------------------+

  Naslov deluje, dokler tece to okno.`,
            note: "Tako je nastal naslov, prek katerega morda prav zdaj berete to gradivo."
          },
          deeper: "Varnostna opomba, ki jo je treba izreči na glas: ta naslov je javen. Kdorkoli ga dobi, " +
                  "vidi vse, kar strežnik streže — brez gesla in brez prijave. Zato v mapo, ki jo streže tunel, " +
                  "nikoli ne postavi osebnih podatkov, ključev ali internih dokumentov. Za resno rabo obstajajo " +
                  "tuneli z računom, ki znajo zahtevati prijavo.",
          refs: [
            { t: "Cloudflare — TryCloudflare (začasni tuneli)", url: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/" }
          ],
          notes: "Poženi zazeni-javno.bat v živo in pusti publiko odpreti naslov na telefonih.",
          links: ["5.3", "7.8"]
        },

        {
          id: "7.4", core: false, t: "Četrta stopnja: najet strežnik", tag: "VPS",
          s: [
            "VPS je računalnik v tujem podatkovnem centru, ki ga najameš za nekaj evrov na mesec.",
            "Teče neprekinjeno, ima stalen javni naslov in nanj lahko namestiš karkoli.",
            "Cena te svobode je, da si zanj odgovoren sam: posodobitve, varnost, varnostne kopije."
          ],
          cmds: [
            ["Cena", "približno 5–20 € na mesec"],
            ["Dovoljenja", "potrebuješ kartico in nekoga, ki to odobri"],
            ["Kdo vidi", "ves internet"],
            ["Ko ugasneš računalnik", "deluje naprej"],
            ["Tipična raba", "prava aplikacija z bazo in uporabniki"]
          ],
          deeper: "Najpogostejša napaka na tej stopnji je, da se strežnik postavi in nato pozabi. Nevzdrževan " +
                  "strežnik z javnim naslovom postane v nekaj mesecih tarča; zato velja pravilo, da VPS najameš " +
                  "šele takrat, ko veš, kdo ga bo posodabljal. Za mnoge projekte je naslednja stopnja boljša izbira.",
          refs: [
            { t: "Wikipedia — Virtual private server", url: "https://en.wikipedia.org/wiki/Virtual_private_server" }
          ],
          notes: "Poudari 'kdo ga bo posodabljal'. To je vprašanje, ki ga nihče ne postavi pravočasno.",
          links: ["7.5", "7.8"]
        },

        {
          id: "7.5", core: true, t: "Peta stopnja: statično gostovanje", tag: "static hosting",
          s: [
            "Če je stran statična, je ni treba nikjer poganjati — dovolj je, da nekdo streže datoteke.",
            "Ponudniki kot GitHub Pages ali Netlify to počnejo brezplačno, s stalnim naslovom in potrdilom HTTPS.",
            "Za gradivo, predstavitev, dokumentacijo ali osebno stran je to skoraj vedno prava izbira."
          ],
          cmds: [
            ["Cena", "brezplačno za manjše strani"],
            ["Dovoljenja", "samo račun pri ponudniku"],
            ["Kdo vidi", "ves internet, s stalnim naslovom"],
            ["Ko ugasneš računalnik", "deluje naprej"],
            ["Omejitev", "ni baze in ni strežniške kode"]
          ],
          deeper: "To gradivo bi lahko prav tako gostoval na tak način: ker je statično, bi ga bilo treba samo " +
                  "naložiti in bi imelo stalen naslov brez tvojega računalnika. Odločili smo se za tunel, ker " +
                  "je za prototip enostavnejši in ne zahteva računa — a če boš gradivo delil pogosteje, " +
                  "je statično gostovanje naslednji smiselni korak.",
          refs: [
            { t: "GitHub Pages", url: "https://pages.github.com/" },
            { t: "Netlify — dokumentacija", url: "https://docs.netlify.com/" }
          ],
          notes: "Tu je priložnost povedati, kam naprej s tem gradivom.",
          links: ["6.8", "7.6"]
        },

        {
          id: "7.6", core: false, t: "Šesta stopnja: oblak", tag: "cloud (AWS, Azure)",
          s: [
            "Oblak ni en računalnik, ampak stotine storitev, ki jih sestaviš po potrebi in plačaš po porabi.",
            "Prednost je, da se sam prilagodi obremenitvi; slabost, da je zapleten in da računa ni lahko napovedati.",
            "Za orodje, ki ga uporablja ekipa, je skoraj vedno pretiran."
          ],
          cmds: [
            ["Cena", "po porabi — od centov do presenečenj"],
            ["Dovoljenja", "poslovni račun, pogosto tudi nabava"],
            ["Kdo vidi", "kar nastaviš"],
            ["Zahtevnost", "visoka — svoj poklic"],
            ["Tipična raba", "veliko uporabnikov, veliko podatkov, zahteve po razpoložljivosti"]
          ],
          deeper: "Pri delu z AI agentom je vredno vedeti, da bo ta pogosto predlagal oblačno rešitev, ker jo " +
                  "je videl največkrat. Če mu v `arhitektura.md` (Modul 9) zapišeš, da gre za orodje za deset " +
                  "ljudi brez zunanjega dostopa, bo predlagal nekaj precej preprostejšega — in to boš dejansko " +
                  "znal vzdrževati.",
          refs: [
            { t: "Wikipedia — Cloud computing", url: "https://en.wikipedia.org/wiki/Cloud_computing" }
          ],
          notes: "Kratko. Poanta je, da oblak ni cilj, ampak ena od možnosti.",
          links: ["7.4", "9.8"]
        },

        {
          id: "7.7", core: true, t: "Spletna tehnologija brez spleta", tag: "local web app, offline",
          s: [
            "HTML, CSS in JavaScript ne potrebujejo interneta — potrebujejo samo brskalnik.",
            "Mapa z datotekami je lahko popolnoma delujoča aplikacija, ki jo odpreš z dvoklikom.",
            "Na službenem računalniku, kjer ne smeš nameščati programov, je to pogosto edina pot do lastnega orodja.",
            "Gradivo, ki ga berete, je natanko tak primer: deluje tudi brez strežnika in brez omrežja."
          ],
          code: {
            term: true,
            file: "Dve poti do iste strani",
            src: `1) S streznikom:
   D:\\projekt> python tools\\server.py
   http://localhost:8080

2) Brez streznika:
   dvoklik na  D:\\projekt\\index.html
   file:///D:/projekt/index.html

Enaka stran. Brez namestitve, brez interneta.`,
            note: "Zato v tem gradivu ni niti ene povezave na zunanjo knjiznico."
          },
          deeper: "Meje te poti so tri: brez strežnika ni skupne baze (podatki ostanejo v brskalniku enega " +
                  "uporabnika), brskalnik iz varnostnih razlogov ne sme brati poljubnih datotek z diska, " +
                  "in nekatere zmožnosti so dovoljene samo prek `https`. Za osebni kalkulator, pregledovalnik, " +
                  "kontrolni seznam ali prav takšno gradivo pa je to povsem dovolj.",
          refs: [
            { t: "MDN — progresivne spletne aplikacije", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps" }
          ],
          notes: "Zapri strežnik in odpri index.html z dvoklikom. Najmočnejša demonstracija v modulu.",
          links: ["3.9", "6.1", "8.9"]
        },

        {
          id: "7.8", core: true, t: "Kaj smeš dati na javni naslov", tag: "what to expose",
          s: [
            "Ko nekaj dobi javni naslov, predpostavi, da bo to nekdo našel — tudi če naslova nisi nikomur dal.",
            "Iskalniki, samodejni pregledovalniki in radovedneži najdejo naslove hitreje, kot si misliš.",
            "Pravilo je preprosto: na javni naslov sodi samo tisto, kar bi mirno pustil na oglasni deski."
          ],
          cmds: [
            ["Gradivo, predstavitve", "brez težav"],
            ["Osebni podatki strank", "nikoli brez prijave"],
            ["Interni dokumenti", "nikoli"],
            ["Datoteke `.env`, ključi, gesla", "nikoli — tudi ne v mapi projekta"],
            ["Baza podatkov", "nikoli neposredno; samo prek strežnika s preverjanjem"],
            ["Testni podatki z realnimi imeni", "raje ne — uporabi izmišljene"]
          ],
          deeper: "Pri delu z AI agenti se doda še ena past: agent, ki gradi aplikacijo, rad na hitro naredi " +
                  "stran za pregled podatkov brez prijave, ker o njej nihče ni rekel drugače. Zato v " +
                  "`arhitektura.md` (Modul 9) izrecno zapiši, kdo sme videti kaj — sicer bo privzeta " +
                  "nastavitev *vsi*. In preden karkoli pošlješ v tunel, poglej, kaj je v mapi.",
          refs: [
            { t: "MDN — varnost na spletu", url: "https://developer.mozilla.org/en-US/docs/Web/Security" },
            { t: "Wikipedia — požarni zid", url: "https://en.wikipedia.org/wiki/Firewall_(computing)" }
          ],
          notes: "Ta slajd povej resno in počasi. V podjetju je to najpomembnejši slajd celotnega modula.",
          links: ["6.5", "7.3", "10.9"]
        }

      ]
    },

    {
      id: 8,
      t: "Jeziki in orodja",
      sub: "Zakaj obstaja toliko programskih jezikov, za kaj se vsak uporablja in kaj so knjižnice.",
      items: [

        {
          id: "8.1", core: true, t: "Zakaj obstaja toliko jezikov", tag: "programming languages",
          s: [
            "Vsi jeziki znajo isto — razlikujejo se po tem, kaj olajšajo in kaj otežijo.",
            "Eni so bližje stroju in zato hitri, drugi bližje človeku in zato hitro napisani.",
            "Izbira jezika je skoraj vedno odločitev o okolju, v katerem bo program tekel, ne o okusu."
          ],
          code: {
            file: "isti_program.txt",
            src: `# Python
print("Pozdravljeni")

// JavaScript
console.log("Pozdravljeni");

// C
printf("Pozdravljeni\\n");

-- SQL
SELECT 'Pozdravljeni';`,
            note: "Stirje jeziki, ena naloga. Razlike so v podrobnostih, ne v zamisli."
          },
          deeper: "Za netehničnega uporabnika je najbolj uporabna posledica ta: ko ti agent predlaga jezik, " +
                  "vprašaj *zakaj tega*. Dober odgovor se glasi *ker mora to teči v brskalniku* ali *ker je " +
                  "knjižnica za branje PDF najboljša v Pythonu*. Slab odgovor je *ker je priljubljen*.",
          refs: [
            { t: "Python — pogosta vprašanja", url: "https://docs.python.org/3/faq/general.html" }
          ],
          notes: "Preberi vse štiri vrstice na glas. Podobnost je bolj poučna od razlik.",
          links: ["8.2", "8.11"]
        },

        {
          id: "8.2", core: true, t: "Prevajani in interpretirani", tag: "compiled vs. interpreted",
          s: [
            "Prevajani jezik se pred zagonom v celoti prevede v strojno kodo — nastane samostojen program `.exe`.",
            "Interpretirani jezik se bere sproti, vrstico za vrstico, zato za zagon potrebuješ nameščeno okolje.",
            "Prevajani so hitrejši pri izvajanju, interpretirani pa pri pisanju in popravljanju."
          ],
          code: {
            term: true,
            file: "Dva načina zagona",
            src: `PREVAJANO (C):
  gcc program.c -o program.exe    <- prevedi (enkrat)
  program.exe                     <- pozeni (velikokrat)

INTERPRETIRANO (Python):
  python program.py               <- prevedi IN pozeni, vsakic sproti`,
            note: "Zato za Python potrebujes nameščen Python, za .exe pa nic."
          },
          deeper: "Ta razlika pojasni tudi, zakaj so zagonske datoteke tega gradiva `.bat` in ne `.exe`: " +
                  "`.bat` je navaden tekst, ki ga Windows prebere sproti, zato ga lahko odpreš in preveriš, " +
                  "kaj počne. Pri nepodpisani `.exe` datoteki tega ne moreš — in prav zato jih službeni " +
                  "računalniki pogosto blokirajo.",
          refs: [
            { t: "Wikipedia — Interpreter", url: "https://en.wikipedia.org/wiki/Interpreter_(computing)" }
          ],
          notes: "Poveži z .bat datotekami, ki jih je publika pravkar pognala.",
          links: ["1.11", "8.9"]
        },

        {
          id: "8.3", core: false, t: "C in C++", tag: "C / C++",
          s: [
            "Najbližja strojni ravni; uporabljata se tam, kjer šteje vsaka tisočinka sekunde.",
            "Operacijski sistemi, gonilniki, igre, krmilniki naprav — in temelji skoraj vseh drugih jezikov."
          ],
          code: {
            file: "primer.c",
            src: `#include <stdio.h>

int main(void) {
    int znesek = 100;
    printf("Z DDV: %.2f\\n", znesek * 1.22);
    return 0;
}`,
            note: "Tip spremenljivke (int) je treba napisati. Prevajalnik nic ne ugiba."
          },
          deeper: "Za neprogramerja je pomembno le to: če ti agent predlaga C ali C++, se vprašaj, ali res " +
                  "rešuješ problem hitrosti. V pisarniškem svetu je odgovor skoraj vedno ne — in Python " +
                  "bo dal isti rezultat v desetkrat manj vrsticah.",
          refs: [
            { t: "isocpp.org — o C++", url: "https://isocpp.org/" }
          ],
          notes: "Kratko. Ne zadržuj se.",
          links: ["8.2", "8.4"]
        },

        {
          id: "8.4", core: true, t: "Python", tag: "Python",
          s: [
            "Berljiv, zelo razširjen in odličen za obdelavo podatkov, avtomatizacijo in umetno inteligenco.",
            "Ima ogromno knjižnic za branje datotek, tabel, PDF-jev in spletnih storitev.",
            "Za netehničnega uporabnika je skoraj vedno prava prva izbira."
          ],
          code: {
            file: "primer.py",
            src: `import csv

with open("racuni.csv", encoding="utf-8") as f:
    skupaj = sum(int(v["znesek"]) for v in csv.DictReader(f))

print(f"Skupaj z DDV: {skupaj * 1.22:.2f}")`,
            out: `Skupaj z DDV: 579.50`,
            note: "Pet vrstic naredi to, kar bi v C zahtevalo petdeset."
          },
          deeper: "Python je tudi jezik, v katerem AI agenti pišejo najbolj zanesljivo, preprosto zato, ker " +
                  "ga je v učnih podatkih največ. Če nimaš posebnega razloga za kaj drugega, je Python tudi " +
                  "najboljša izbira za sodelovanje z agentom — in na tvojem računalniku je že nameščen.",
          refs: [
            { t: "Python — uradni vodič", url: "https://docs.python.org/3/tutorial/introduction.html" }
          ],
          notes: "Povej, da je vsa koda v tem gradivu Python prav zaradi tega razloga.",
          links: ["8.10", "9.1"]
        },

        {
          id: "8.5", core: true, t: "JavaScript in TypeScript", tag: "JavaScript / TypeScript",
          s: [
            "JavaScript je edini jezik, ki teče neposredno v brskalniku — zato je neizogiben za spletne strani.",
            "TypeScript je JavaScript z dodanimi tipi; napake se pokažejo že med pisanjem, ne šele pri uporabniku.",
            "Z okoljem Node.js lahko isti jezik teče tudi zunaj brskalnika, na strežniku."
          ],
          code: {
            file: "primer.ts",
            src: `function zDdv(cena: number, stopnja: number = 22): number {
    return cena * (1 + stopnja / 100);
}

console.log(zDdv(100));
console.log(zDdv("sto"));   // <- TypeScript javi napako ze tukaj`,
            note: "Zapis ': number' je vse, kar loci TypeScript od JavaScripta."
          },
          deeper: "Praktično pravilo: če izdelek živi v brskalniku, bo v njem JavaScript ali TypeScript, " +
                  "ne glede na to, kaj si želiš. Če pa gre za obdelavo podatkov, je Python običajno " +
                  "krajša pot. Mnogi projekti uporabljajo oboje — in to ni znak zmede, ampak normalno stanje.",
          refs: [
            { t: "MDN — JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
            { t: "TypeScript — dokumentacija", url: "https://www.typescriptlang.org/docs/" }
          ],
          notes: "Poveži nazaj na 6.4 — isti jezik, zdaj z imenom in kontekstom.",
          links: ["1.3", "6.4", "8.9"]
        },

        {
          id: "8.6", core: false, t: "Java in C#", tag: "Java / C#",
          s: [
            "Jezika velikih poslovnih sistemov: bančništvo, zavarovalništvo, ERP, javna uprava.",
            "Strožja sta in bolj zgovorna, kar se obrestuje, ko na isti kodi dela petdeset ljudi deset let."
          ],
          code: {
            file: "Primer.java",
            src: `public class Primer {
    public static void main(String[] args) {
        double znesek = 100;
        System.out.println("Z DDV: " + znesek * 1.22);
    }
}`,
            note: "Sest vrstic za isti izpis. Struktura je cena za velike ekipe."
          },
          deeper: "Če v tvojem podjetju obstaja interni sistem, je verjetnost velika, da je napisan v enem od " +
                  "teh dveh jezikov. Za lastno orodje ju skoraj zagotovo ne potrebuješ — sta pa razlog, " +
                  "zakaj bo integracija z internim sistemom vedno zahtevala razvijalca.",
          refs: [
            { t: "dev.java — uradna stran", url: "https://dev.java/" },
            { t: "Microsoft — C#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" }
          ],
          notes: "Kratko. Publiki je koristno le, da prepozna imeni.",
          links: ["8.1", "8.12"]
        },

        {
          id: "8.7", core: false, t: "SQL", tag: "SQL",
          s: [
            "SQL ni jezik za pisanje programov, ampak za spraševanje baz — in prav zato ga srečaš povsod.",
            "Naučiti se ga prebrati je najhitreje povrnjena investicija za netehničnega uporabnika."
          ],
          code: {
            file: "poizvedba.sql",
            src: `SELECT mesec, SUM(znesek) AS skupaj
FROM racuni
WHERE leto = 2026
GROUP BY mesec
ORDER BY mesec;`,
            note: "Podrobneje je SQL obdelan v Modulu 4."
          },
          deeper: "Posebnost SQL je, da opisuješ *rezultat*, ne postopka. Zato je tako kratek — in zato je " +
                  "tudi tako nevaren, kadar pozabiš pogoj: `DELETE FROM racuni` brez `WHERE` izbriše vse.",
          refs: [
            { t: "SQLite — jezik SQL", url: "https://www.sqlite.org/lang.html" }
          ],
          notes: "Omeni DELETE brez WHERE. Vsak razvijalec ima to zgodbo.",
          links: ["4.5"]
        },

        {
          id: "8.8", core: false, t: "Bash in PowerShell", tag: "Bash / PowerShell",
          s: [
            "To sta jezika ukazne vrstice: namenjena sta vodenju drugih programov, ne pisanju aplikacij.",
            "Z njima avtomatiziraš opravila, ki bi jih sicer klikal — kopiranje, preimenovanje, zaganjanje."
          ],
          code: {
            term: true,
            file: "PowerShell",
            src: `# preimenuj vse PDF-je v mapi po datumu spremembe
Get-ChildItem *.pdf | ForEach-Object {
    Rename-Item $_ ("racun_" + $_.LastWriteTime.ToString("yyyy-MM-dd") + ".pdf")
}`,
            note: "Windows uporablja PowerShell, Mac in Linux pa Bash. Zamisel je ista."
          },
          deeper: "Datoteke `.bat`, ki poganjajo to gradivo, so najpreprostejša oblika istega. Za neprogramerja " +
                  "je to pogosto najhitrejša zmaga z AI: prosiš agenta za skripto, ki uredi mapo z dvesto " +
                  "datotekami, in jo dobiš v desetih sekundah. Le prej si naredi kopijo mape.",
          refs: [
            { t: "Microsoft — PowerShell", url: "https://learn.microsoft.com/en-us/powershell/scripting/overview" },
            { t: "GNU — priročnik za Bash", url: "https://www.gnu.org/software/bash/manual/bash.html" }
          ],
          notes: "Opozorilo o kopiji mape povej vedno. Skripte, ki preimenujejo, ne znajo nazaj.",
          links: ["1.11", "8.2"]
        },

        {
          id: "8.9", core: true, t: "Izvajalno okolje in Node.js", tag: "runtime / Node.js",
          s: [
            "Jezik sam po sebi ne teče — potrebuje program, ki ga izvaja; temu pravimo izvajalno okolje [[runtime]].",
            "Za Python je to `python.exe`, za JavaScript v brskalniku je to brskalnik sam.",
            "Node.js je isto okolje za JavaScript, le da teče zunaj brskalnika — zato lahko bere datoteke in streže strani.",
            "Ko kdo reče *rabiš Node*, misli prav to: brez okolja jezika ni mogoče pognati."
          ],
          code: {
            term: true,
            file: "Kaj je nameščeno",
            src: `D:\\projekt> python --version
Python 3.13.5

D:\\projekt> node --version
'node' is not recognized as an internal or external command

-> Python je nameščen, Node.js ni.`,
            note: "Prav zato to gradivo ne potrebuje Node.js - vse tece v brskalniku in v Pythonu."
          },
          deeper: "To je tudi najpogostejši razlog, zakaj navodila z interneta *ne delujejo*: zahtevajo okolje, " +
                  "ki ga na tvojem računalniku ni. Na službenem računalniku namestitev pogosto ni dovoljena, " +
                  "zato je vredno agentu že na začetku povedati, kaj imaš na voljo — sicer bo predlagal " +
                  "rešitev, ki je ne boš mogel pognati.",
          refs: [
            { t: "Node.js — o projektu", url: "https://nodejs.org/en/about" }
          ],
          notes: "Pokaži oba ukaza v živo na svojem računalniku. Izpis je prepričljiv.",
          links: ["8.2", "8.10", "7.7"]
        },

        {
          id: "8.10", core: true, t: "Knjižnice", tag: "libraries (pip, npm)",
          s: [
            "Knjižnica je koda, ki jo je nekdo drug že napisal in jo lahko uporabiš namesto svoje.",
            "Za Python jih namestiš z ukazom `pip install`, za JavaScript z `npm install`.",
            "Branje PDF-jev, delo z Excelom, risanje grafov, pošiljanje pošte — za vse to knjižnice že obstajajo."
          ],
          code: {
            term: true,
            file: "Namestitev knjižnice",
            src: `D:\\projekt> pip install pypdf
Collecting pypdf
  Downloading pypdf-6.0.0-py3-none-any.whl
Successfully installed pypdf-6.0.0

D:\\projekt> python
>>> from pypdf import PdfReader        <- zdaj je na voljo`,
            note: "Namesto tisoc vrstic za branje PDF napises eno vrstico uvoza."
          },
          deeper: "Hkrati je to tudi vstopna točka za težave: vsaka knjižnica je tuja koda, ki teče na tvojem " +
                  "računalniku. Preden namestiš nekaj, česar ne poznaš, preveri, ali je ime pravilno " +
                  "zapisano — obstajajo knjižnice z namerno podobnimi imeni. Pri službenem računalniku je " +
                  "`pip install` pogosto tudi tisto, kar IT blokira.",
          refs: [
            { t: "PyPI — zbirka knjižnic za Python", url: "https://pypi.org/" },
            { t: "npm — o registru", url: "https://docs.npmjs.com/about-npm" }
          ],
          notes: "Opozori na tipkarske napake v imenih knjižnic. To je pravi način napada.",
          links: ["8.11", "8.12"]
        },

        {
          id: "8.11", core: true, t: "Knjižnica ali lastna koda", tag: "build or borrow",
          s: [
            "Uporabi knjižnico, kadar je problem splošen in dobro rešen: datumi, PDF, šifriranje, omrežje.",
            "Napiši sam, kadar je problem tvoj, majhen in specifičen — pravila tvojega podjetja niso v nobeni knjižnici.",
            "Nikoli ne piši sam šifriranja, obdelave datumov in preverjanja gesel; tam je *sam* skoraj vedno napačno."
          ],
          cmds: [
            ["Branje PDF, Excel, slik", "knjižnica — zanesljivo"],
            ["Datumi, časovni pasovi", "knjižnica — vedno"],
            ["Šifriranje, gesla", "knjižnica — nikoli sam"],
            ["Tvoja poslovna pravila", "lastna koda — nihče je ne pozna"],
            ["Nekaj deset vrstic logike", "lastna koda — manj odvisnosti"],
            ["Knjižnica za trivialno stvar", "raje ne — dodana odvisnost ni zastonj"]
          ],
          deeper: "Vsaka knjižnica je dolg: nekdo jo mora vzdrževati, posodabljati in nekega dne bo nehala " +
                  "delovati z novo različico jezika. Zato velja: velika knjižnica za velik problem je prihranek, " +
                  "majhna knjižnica za majhen problem pa je pogosto breme. Pri agentu to povej izrecno, " +
                  "sicer bo dodal odvisnost za vsako malenkost.",
          refs: [
            { t: "Python — nameščanje paketov", url: "https://packaging.python.org/en/latest/tutorials/installing-packages/" }
          ],
          notes: "Stavek 'nikoli ne piši svojega šifriranja' povej brez omahovanja.",
          links: ["8.10", "9.1"]
        },

        {
          id: "8.12", core: false, t: "Odvisnosti in različice", tag: "dependencies, versions",
          s: [
            "Program, ki uporablja pet knjižnic, je odvisen od petih tujih projektov in njihovih sprememb.",
            "Zato se različice zapišejo v datoteko — da bo program čez leto dni tekel enako kot danes.",
            "Oznaka `6.0.0` pomeni večja.manjša.popravek; prva števka se spremeni, ko nekaj ni več združljivo."
          ],
          code: {
            file: "requirements.txt",
            src: `pypdf==6.0.0
pytesseract==0.3.13
pillow==11.0.0`,
            note: "Ukaz 'pip install -r requirements.txt' namesti natanko te razlicice."
          },
          deeper: "Ločena okolja (`python -m venv .venv`) poskrbijo, da imata dva projekta na istem računalniku " +
                  "lahko različni različici iste knjižnice. Za netehničnega uporabnika je pomembno predvsem " +
                  "to, da ob težavi *včeraj je delalo* najprej pomisli na spremembo različice — in da " +
                  "datoteke `requirements.txt` ne briše.",
          refs: [
            { t: "Semantično označevanje različic", url: "https://semver.org/" },
            { t: "Python — virtualna okolja (venv)", url: "https://docs.python.org/3/library/venv.html" }
          ],
          notes: "Če zmanjkuje časa, preskoči — a omeni, da requirements.txt obstaja.",
          links: ["8.10", "9.2"]
        }

      ]
    },

    {
      id: 9,
      t: "Kako se dela dobra koda",
      sub: "Razgradnja problema, moduli, testi in datoteka, iz katere gradi AI agent.",
      items: [

        {
          id: "9.1", core: true, t: "Razgradnja problema", tag: "decomposition",
          s: [
            "Velikega problema ni mogoče rešiti; rešiti je mogoče le zaporedje majhnih.",
            "Razgradnja pomeni, da nalogo razbiješ na korake, ki jih znaš opisati vsakega posebej.",
            "Če koraka ne znaš opisati v enem stavku, še ni dovolj majhen.",
            "To je veščina, ki jo pri delu z AI potrebuješ bolj kot znanje kateregakoli jezika."
          ],
          code: {
            file: "razgradnja.txt",
            src: `NALOGA: "uredi mi racune"        <- preveliko, agent bo ugibal

RAZGRAJENO:
  1. preberi vse .pdf iz mape "prejeto"
  2. iz vsakega izlusci datum, stevilko in znesek
  3. ce izluscanje ne uspe, datoteko daj v mapo "rocno"
  4. zapisi vrstice v racuni.csv
  5. preimenuj datoteko v LLLL-MM-DD_stevilka.pdf
  6. izpisi, koliko jih je uspelo in koliko ne`,
            note: "Sest stavkov. Vsak se da preveriti posebej - in vsak je lahko svoja funkcija."
          },
          deeper: "Opazi tretjo točko: opisuje, kaj naj se zgodi, ko gre nekaj narobe. Prav ta točka loči " +
                  "navodilo, po katerem nastane uporabno orodje, od navodila, po katerem nastane program, " +
                  "ki se sesuje ob prvi nenavadni datoteki. Pri vsakem koraku se vprašaj: *kaj pa, če ne gre?*",
          refs: [
            { t: "Wikipedia — ločevanje odgovornosti", url: "https://en.wikipedia.org/wiki/Separation_of_concerns" }
          ],
          notes: "Preberi obe različici naloge na glas. Razlika je očitna in nepozabna.",
          links: ["1.6", "9.8", "11.5"]
        },

        {
          id: "9.2", core: true, t: "Main in moduli", tag: "main + modules",
          s: [
            "Koda se razdeli na module: vsaka datoteka opravlja eno vrsto dela.",
            "Glavna datoteka [[main]] samo vodi vrstni red — sama ne počne ničesar zahtevnega.",
            "Tako lahko en del popraviš ali zamenjaš, ne da bi se dotaknil ostalih."
          ],
          code: {
            file: "main.py",
            src: `from branje import preberi_pdf
from izlusci import izlusci_podatke
from zapisi import zapisi_csv

def main():
    for datoteka in preberi_pdf("prejeto"):
        podatki = izlusci_podatke(datoteka)
        zapisi_csv(podatki, "racuni.csv")

if __name__ == "__main__":
    main()`,
            note: "Devet vrstic pove, kaj program pocne. Podrobnosti so v treh drugih datotekah."
          },
          deeper: "Ta razdelitev je pri delu z AI agentom praktično nujna iz povsem drugega razloga: agent lahko " +
                  "popravi eno datoteko, ne da bi prebral in prepisal celoten program. Manj kode, ki jo mora " +
                  "obdelati naenkrat, pomeni manj tokenov, manj napak in manjšo verjetnost, da bo med " +
                  "popravljanjem pokvaril nekaj drugega.",
          refs: [
            { t: "Wikipedia — ločevanje odgovornosti", url: "https://en.wikipedia.org/wiki/Separation_of_concerns" }
          ],
          notes: "Poveži z Modulom 10: manjše datoteke = manj tokenov = cenejše in zanesljivejše.",
          links: ["1.9", "10.7", "9.8"]
        },

        {
          id: "9.3", core: false, t: "Poimenovanje", tag: "naming",
          s: [
            "Ime naj pove, kaj stvar je ali počne — ne, kako je narejena.",
            "Dobro ime prihrani komentar; slabo ime zahteva razlago vsakič znova."
          ],
          code: {
            file: "imena.py",
            src: `# slabo
def obd(d, x):
    return [i for i in d if i[1] > x]

# dobro
def racuni_nad_zneskom(racuni, prag):
    return [r for r in racuni if r.znesek > prag]`,
            note: "Druga razlicica ne potrebuje komentarja. Ime je komentar."
          },
          deeper: "Pri delu z agentom je poimenovanje presenetljivo močno orodje: agent iz imen sklepa o " +
                  "namenu. Če funkcijo poimenuješ `racuni_nad_zneskom`, bo napisal kodo, ki filtrira račune. " +
                  "Če jo poimenuješ `obd`, bo ugibal — in ugibal bo na podlagi tega, kar je videl v drugih " +
                  "projektih, ne v tvojem.",
          refs: [
            { t: "PEP 8 — slogovna navodila za Python", url: "https://peps.python.org/pep-0008/" }
          ],
          notes: "Kratko. Primer pove vse.",
          links: ["1.10", "9.2"]
        },

        {
          id: "9.4", core: true, t: "Kaj je test", tag: "test",
          s: [
            "Test je majhen program, ki požene tvojo kodo in preveri, ali je rezultat pričakovan.",
            "Napišeš ga enkrat, poganja pa se samodejno ob vsaki spremembi.",
            "Njegova vrednost ni v tem, da dokaže pravilnost danes, ampak da opozori, ko se jutri nekaj pokvari."
          ],
          code: {
            file: "test_ddv.py",
            src: `from ddv import z_ddv

def test_osnovni_primer():
    assert z_ddv(100) == 122.0

def test_nizja_stopnja():
    assert z_ddv(100, 9.5) == 109.5

def test_nic():
    assert z_ddv(0) == 0`,
            out: `3 passed in 0.01s`,
            note: "assert pomeni 'trdim, da'. Ce trditev ne drzi, test pade."
          },
          deeper: "Najkoristnejši testi niso tisti za običajne primere, ampak za robove: prazen seznam, " +
                  "negativno število, manjkajoče polje, zelo velika vrednost. Prav tam se skriva bug iz " +
                  "pojma 2.2 — in prav tam AI agent najpogosteje spregleda primer.",
          refs: [
            { t: "pytest — dokumentacija", url: "https://docs.pytest.org/en/stable/" },
            { t: "Python — unittest", url: "https://docs.python.org/3/library/unittest.html" }
          ],
          notes: "Pokaži, kako test pade: spremeni 122.0 v 121.0 in ga poženi pred publiko.",
          links: ["2.2", "9.5", "9.6"]
        },

        {
          id: "9.5", core: false, t: "Vrste testov", tag: "unit / integration / end-to-end",
          s: [
            "Testi enot preverjajo posamezno funkcijo; hitri so in jih je lahko veliko.",
            "Integracijski testi preverjajo, ali deli delujejo skupaj — na primer program in baza.",
            "Testi od konca do konca preverijo celotno pot uporabnika; so najpočasnejši in najbolj krhki."
          ],
          cmds: [
            ["Test enote", "ena funkcija · milisekunde · veliko jih je"],
            ["Integracijski test", "več delov skupaj · sekunde · nekaj deset"],
            ["Test od konca do konca", "cela aplikacija · minute · le za ključne poti"],
            ["Ročni test", "človek pred zaslonom · vedno potreben za videz"]
          ],
          deeper: "Klasično priporočilo je piramida: veliko hitrih testov enot spodaj, malo počasnih testov " +
                  "na vrhu. Razlog je preprost — če pade test enote, veš točno, katera funkcija je kriva; " +
                  "če pade test od konca do konca, veš le, da nekje na poti nekaj ne deluje.",
          refs: [
            { t: "Martin Fowler — testna piramida", url: "https://martinfowler.com/bliki/TestPyramid.html" },
            { t: "Wikipedia — avtomatizirano testiranje", url: "https://en.wikipedia.org/wiki/Test_automation" }
          ],
          notes: "Če zmanjkuje časa, pokaži samo tabelo.",
          links: ["9.4", "9.6"]
        },

        {
          id: "9.6", core: true, t: "Zakaj so testi pri AI še pomembnejši", tag: "tests with AI",
          s: [
            "Agent piše kodo hitreje, kot jo ti utegneš prebrati — testi so edini način, da mu sledi preverjanje.",
            "Ker je agent nedeterminističen (pojem 2.6), ne moreš predpostaviti, da je rešitev pravilna, ker je videti prepričljivo.",
            "Test je zahteva, zapisana tako, da se preveri sama — in prav zato je boljše navodilo kot prošnja v besedah.",
            "Najboljši vrstni red je: najprej testi, nato koda, nato preverjanje."
          ],
          code: {
            term: true,
            file: "Vrstni red dela z agentom",
            src: `1. Ti:      opisi zahtevo
2. Agent A: napise TESTE (in nic drugega)
3. Ti:      preberes teste - so to res tvoje zahteve?
4. Agent B: napise KODO, testov ne vidi
5. Racunalnik: pozene teste

   3 passed, 1 failed  ->  agent B popravlja, dokler ni zeleno`,
            note: "Agent B ne vidi testov, zato jim ne more pisati kode na kozo."
          },
          deeper: "Zakaj ločena agenta: če isti agent napiše teste in kodo, bo teste nezavedno prilagodil " +
                  "kodi, ki jo je pravkar napisal — in oboje bo ustrezalo isti napačni predpostavki. Ločitev " +
                  "je poceni in učinkovita: agent, ki testov ne vidi, mora napisati kodo, ki dejansko dela, " +
                  "ne pa kodo, ki izgleda kot rešitev. Podrobno v pojmu 11.7.",
          refs: [
            { t: "Claude Code — pregled", url: "https://docs.claude.com/en/docs/claude-code/overview" }
          ],
          notes: "To je najpomembnejši praktični prijem v celotnem gradivu. Ne hiti.",
          links: ["2.6", "10.18", "11.7"]
        },

        {
          id: "9.7", core: true, t: "Git in commit", tag: "Git, commit",
          s: [
            "Git si zapomni vsako stanje kode, ki ga potrdiš — in omogoči vrnitev na katerokoli od njih.",
            "Commit je posnetek s sporočilom: *kaj sem spremenil in zakaj*.",
            "Pri delu z agentom je to varnostna mreža: če ti pokvari kodo, se v eni vrstici vrneš na zadnje delujoče stanje."
          ],
          code: {
            term: true,
            file: "Osnovni git",
            src: `D:\\projekt> git init
D:\\projekt> git add .
D:\\projekt> git commit -m "Delujoce branje PDF racunov"

D:\\projekt> git log --oneline
a3f9c21 Delujoce branje PDF racunov

D:\\projekt> git restore .        <- razveljavi vse od zadnjega commita`,
            note: "Commit naredi PREDEN pustis agenta popravljati. Vedno."
          },
          cmds: [
            ["git init", "začni slediti spremembam v tej mapi"],
            ["git add .", "pripravi vse spremembe za commit"],
            ["git commit -m \"...\"", "shrani posnetek s sporočilom"],
            ["git log --oneline", "pokaži zgodovino"],
            ["git diff", "kaj se je spremenilo od zadnjega commita"],
            ["git restore .", "zavrzi vse neshranjene spremembe"]
          ],
          deeper: "Za netehničnega uporabnika je najpomembnejše eno samo pravilo: **commit pred vsako sejo z " +
                  "agentom**. Ko agent naredi nekaj čudnega — in bo — je razlika med `git restore .` in " +
                  "popoldnevom reševanja. Git ni potreben za majhne projekte zaradi sodelovanja, ampak zaradi " +
                  "te ene same možnosti vrnitve.",
          refs: [
            { t: "Git — dokumentacija", url: "https://git-scm.com/doc" }
          ],
          notes: "Povej 'commit pred vsako sejo z agentom' vsaj dvakrat. To je najdražji nasvet v modulu.",
          links: ["2.2", "11.6"]
        },

        {
          id: "9.8", core: true, t: "Datoteka arhitektura.md", tag: "architecture.md",
          s: [
            "To je dokument, v katerem opišeš, kaj gradiš, preden agent napiše prvo vrstico kode.",
            "Vsebuje cilj, vhode, izhode, omejitve, strukturo datotek in odločitve, ki so že sprejete.",
            "Agent ga prebere na začetku vsake seje, zato se ne vrača k vprašanjem, na katera si že odgovoril.",
            "Je najcenejši način, da preprečiš, da bi agent gradil nekaj, česar nisi naročil."
          ],
          code: {
            file: "arhitektura.md",
            src: `# Orodje za obdelavo prejetih racunov

## Cilj
Iz PDF racunov v mapi "prejeto" zgraditi CSV s podatki in
preimenovati datoteke po datumu in stevilki.

## Vhod
- PDF datoteke, ~200 na mesec, nekateri skenirani

## Izhod
- racuni.csv (datum, stevilka, znesek, dobavitelj, datoteka)
- neuspeli primeri v mapo "rocno"

## Omejitve
- Windows, Python 3.13, brez Node.js
- brez namescanja programov z administratorskimi pravicami
- podatki ne smejo zapustiti racunalnika

## Odlocitve
- knjiznica pypdf, OCR samo ce extract_text() vrne prazno
- brez baze, CSV zadosca`,
            note: "Ta datoteka je vredna vec kot ura pogovora z agentom."
          },
          deeper: "Razdelek *Omejitve* je tisti, ki ga ljudje najpogosteje izpustijo in ki največ prinese. " +
                  "Brez njega bo agent predlagal rešitev, ki zahteva Node.js, oblak ali administratorske " +
                  "pravice — vse troje na službenem računalniku pogosto ni mogoče. Ko povzetek pogovora " +
                  "prerašča v odločitve, jih zapiši sem; to je tudi tisto, kar ohrani smisel, ko ti zmanjka " +
                  "context window (Modul 10).",
          refs: [
            { t: "Claude Code — datoteka s spominom projekta", url: "https://docs.claude.com/en/docs/claude-code/memory" }
          ],
          notes: "To je vozlišče celotnega gradiva. Napovej, da bo v Modulu 11 recept, kako jo napisati.",
          links: ["9.1", "10.5", "11.5"]
        }

      ]
    },

    {
      id: 10,
      t: "AI, agenti in Claude",
      sub: "Tokeni, context window, agenti, skills, MCP — in kaj od tega dejansko vpliva na tvoje delo.",
      items: [

        {
          id: "10.1", core: true, t: "Kaj je jezikovni model", tag: "LLM",
          s: [
            "Jezikovni model napoveduje, kateri del besedila najverjetneje sledi temu, kar je že napisano.",
            "Ne išče po bazi in ne razume v človeškem pomenu — izračuna najverjetnejše nadaljevanje.",
            "Ker je napoved verjetnostna, je odgovor lahko odličen in prepričljivo napačen z enako lahkoto."
          ],
          code: {
            term: true,
            file: "Kako nastane odgovor",
            src: `Vhod:   "Glavno mesto Slovenije je"

Model izracuna verjetnosti naslednjega dela:
   " Ljubljana"   98.2 %
   " mesto"        0.7 %
   " znano"        0.4 %
   ...

Izbere najverjetnejsega, ga doda na konec in ponovi.`,
            note: "Odgovor nastaja del za delom, ne kot celota. Zato ga vidis, kako se izpisuje."
          },
          deeper: "Iz tega izhaja vse ostalo v tem modulu. Model nima spomina med pogovori, ne ve, kaj je res, " +
                  "in nima dostopa do tvojih datotek — razen če mu to izrecno daš. Vse, kar zna, je nadaljevati " +
                  "besedilo, ki ga vidi. Presenetljivo veliko koristnega dela se da narediti prav s to eno " +
                  "sposobnostjo, a le če razumeš njene meje.",
          refs: [
            { t: "Anthropic — pregled modelov", url: "https://docs.claude.com/en/docs/about-claude/models/overview" }
          ],
          notes: "Poveži z 2.6: to je vir nedeterminizma. Publika si mora zapomniti 'napoveduje, ne ve'.",
          links: ["2.6", "10.8"]
        },

        {
          id: "10.2", core: true, t: "Token", tag: "token",
          s: [
            "Model ne bere črk in ne besed, ampak tokene — koščke besedila, dolge povprečno tri do štiri znake.",
            "Pogoste angleške besede so pogosto en sam token, redkejše in slovenske besede pa se razbijejo na več.",
            "Zato ista vsebina v slovenščini porabi občutno več tokenov kot v angleščini — in s tem več denarja."
          ],
          code: {
            term: true,
            file: "Isti stavek, dva jezika",
            src: `EN: "The invoice was paid yesterday."
    [The][ invoice][ was][ paid][ yesterday][.]        ~6 tokenov

SL: "Racun je bil vceraj placan."
    [Rac][un][ je][ bil][ vc][eraj][ pla][can][.]      ~9 tokenov

Razmerje se pri daljsih besedilih ustali okoli 1.5x do 2x.`,
            note: "Priblizek: 1 token ~ 4 znake. Natancno stevilo zna povedati samo model sam."
          },
          deeper: "Praktična posledica je dvojna. Prvič, če delaš z zelo velikimi besedili in te skrbi cena, " +
                  "je angleščina cenejša — tudi če je vsebina slovenska, so navodila lahko angleška. " +
                  "Drugič, ocene *koliko strani gre v pogovor* so pri slovenščini bolj pesimistične, kot " +
                  "kažejo angleški primeri iz dokumentacije.",
          refs: [
            { t: "Anthropic — štetje tokenov", url: "https://docs.claude.com/en/docs/build-with-claude/token-counting" }
          ],
          notes: "Slovenščina je dražja od angleščine — to publiko vedno preseneti. Poudari.",
          links: ["10.3", "10.7"]
        },

        {
          id: "10.3", core: true, t: "Kaj stanejo tokeni", tag: "pricing",
          s: [
            "Plačaš dvoje: tokene, ki jih pošlješ (vhod), in tokene, ki jih model napiše (izhod).",
            "Izhod je približno petkrat dražji od vhoda, zato dolgi odgovori stanejo bistveno več kot dolga vprašanja.",
            "Pri naročnini tega ne plačuješ po tokenih, a iste številke določajo, kdaj dosežeš omejitev porabe."
          ],
          cmds: [
            ["Claude Opus 5", "$5 vhod / $25 izhod na milijon tokenov · 1M kontekst"],
            ["Claude Sonnet 5", "$2 vhod / $10 izhod · 1M kontekst"],
            ["Claude Haiku 4.5", "$1 vhod / $5 izhod · 200K kontekst"],
            ["Milijon tokenov", "približno 700.000 angleških besed"],
            ["Tipično vprašanje", "nekaj sto tokenov — torej stotinke centa"],
            ["Cela knjiga v pogovoru", "nekaj sto tisoč tokenov — evri, ne centi"]
          ],
          deeper: "Cene se spreminjajo, razmerja pa ostajajo: močnejši model je dražji, izhod je dražji od vhoda, " +
                  "in ponavljajoče se pošiljanje istega dolgega besedila je največji tihi strošek. Za to obstaja " +
                  "predpomnjenje [[prompt caching]], ki ponovno poslani del zaračuna bistveno ceneje. " +
                  "Številke v tabeli veljajo ob nastanku tega gradiva (september 2026) — preveri jih na uradni strani.",
          refs: [
            { t: "Anthropic — cenik", url: "https://docs.claude.com/en/docs/about-claude/pricing" },
            { t: "Anthropic — predpomnjenje vsebine", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-caching" }
          ],
          notes: "Povej datum veljavnosti cen na glas. Tabele v gradivu zastarajo.",
          links: ["10.2", "10.7"]
        },

        {
          id: "10.4", core: true, t: "Prompt in kontekst", tag: "prompt / context",
          s: [
            "Prompt je to, kar napišeš; kontekst je vse, kar model ob tem vidi.",
            "Kontekst vključuje celoten dosedanji pogovor, priložene datoteke in navodila, ki jih je dobil na začetku.",
            "Model ne ve ničesar, česar ni v kontekstu — zato je *saj sem ti prej povedal* smiselno le, če je tisto prej še vedno zraven."
          ],
          code: {
            term: true,
            file: "Kaj model dejansko prejme",
            src: `[sistemska navodila]     kdo si, kako odgovarjaj
[arhitektura.md]        1.200 tokenov
[prejsnjih 14 sporocil] 8.400 tokenov
[priloga racun.pdf]     3.100 tokenov
[tvoje vprasanje]          40 tokenov
                        -----------------
                        12.740 tokenov gre v model ob VSAKEM sporocilu`,
            note: "Zato drugo vprasanje v dolgem pogovoru stane vec kot prvo."
          },
          deeper: "To pojasni tudi vedenje, ki se zdi nelogično: če v pogovoru na sredini popraviš navodilo, " +
                  "model še vedno vidi tudi prvotno. Kar je zapisano, ostane zapisano. Zato je pri daljšem delu " +
                  "boljše kot dolg popravljen pogovor: kratek povzetek odločitev, shranjen v `arhitektura.md`, " +
                  "in nov pogovor.",
          refs: [
            { t: "Anthropic — kontekstno okno", url: "https://docs.claude.com/en/docs/build-with-claude/context-windows" }
          ],
          notes: "Izpis s seštevkom je bistvo slajda. Preberi ga po vrsticah.",
          links: ["5.7", "10.5", "9.8"]
        },

        {
          id: "10.5", core: true, t: "Context window", tag: "context window",
          s: [
            "Kontekstno okno je zgornja meja, koliko tokenov lahko model naenkrat vidi.",
            "Pri Claude Opus 5 in Sonnet 5 je to milijon tokenov, pri Haiku 4.5 dvesto tisoč.",
            "Ko se okno polni, se pogovor upočasni in podraži; ko je polno, je treba nekaj izpustiti.",
            "Milijon tokenov zveni ogromno — a velik projekt s kodo in dokumenti ga porabi hitreje, kot pričakuješ."
          ],
          code: {
            term: true,
            file: "Polnjenje okna",
            src: `[##########..............................]  25 %   udobno
[####################....................]  50 %   se vedno v redu
[################################........]  80 %   cas za povzetek
[########################################] 100 %   najstarejsi del pade ven`,
            note: "V Claude Code vidis odstotek porabljenega okna sproti."
          },
          deeper: "Zakaj se odgovori v zelo dolgih pogovorih poslabšajo: model mora upoštevati vedno več " +
                  "besedila, med katerim je veliko nepomembnega — starih poskusov, opuščenih idej, napak, " +
                  "ki so že popravljene. To ni okvara, ampak logična posledica. Rešitev ni boljši prompt, " +
                  "ampak čiščenje konteksta.",
          refs: [
            { t: "Anthropic — kontekstno okno", url: "https://docs.claude.com/en/docs/build-with-claude/context-windows" }
          ],
          notes: "Pokaži števec konteksta v Claude Code v živo, če ga imaš pri roki.",
          links: ["10.4", "10.6"]
        },

        {
          id: "10.6", core: true, t: "Povzemi in začni znova", tag: "summarise and continue",
          s: [
            "Ko se okno napolni okoli osemdeset odstotkov, agenta prosi za povzetek stanja.",
            "Povzetek naj vsebuje: kaj je cilj, kaj je že narejeno, katere odločitve so sprejete in kaj je naslednji korak.",
            "Nato odpri nov pogovor, prilepi povzetek in nadaljuj — z desetino porabe in boljšimi odgovori.",
            "To je najkoristnejša navada pri delu z AI in tista, ki jo ljudje najdlje odlašajo."
          ],
          code: {
            file: "povzetek-prompt.txt",
            src: `Pripravi povzetek te seje za nadaljevanje v novem pogovoru.
Vkljuci:
  1. cilj projekta v dveh stavkih
  2. kaj je ze narejeno in deluje
  3. sprejete odlocitve in zakaj (npr. zakaj CSV in ne baza)
  4. kaj je naslednji korak
  5. znane pasti in kaj NE poskusati znova

Napisi ga tako, da bo nekdo brez konteksta lahko nadaljeval.`,
            note: "Povzetek shrani v arhitektura.md - tako preziviv tudi zaprtje pogovora."
          },
          deeper: "Peta točka je tista, ki jo ljudje izpuščajo in ki največ prinese: seznam stvari, ki so bile " +
                  "že poskušene in niso delovale. Brez nje bo novi pogovor samozavestno predlagal isto slepo " +
                  "ulico. V Claude Code obstaja za to tudi skill `handoff`, ki povzetek pripravi po " +
                  "preverjenem vzorcu (Modul 11).",
          refs: [
            { t: "Claude Code — datoteka s spominom projekta", url: "https://docs.claude.com/en/docs/claude-code/memory" }
          ],
          notes: "Prompt za povzetek naj publika fotografira. Je neposredno uporaben.",
          links: ["9.8", "10.5", "11.2"]
        },

        {
          id: "10.7", core: true, t: "Kako porabiti manj tokenov", tag: "saving tokens",
          s: [
            "Poraba ni odvisna od tega, koliko napišeš, ampak koliko model vsakič prebere.",
            "Največji prihranki so v krajših pogovorih, manjših datotekah in natančnejših vprašanjih."
          ],
          cmds: [
            ["Nov pogovor za novo temo", "največji prihranek od vseh"],
            ["Povzetek pri 80 % okna", "desetkratno zmanjšanje konteksta"],
            ["Manjše datoteke (moduli)", "agent prebere 200 vrstic namesto 3.000"],
            ["Natančno vprašanje", "krajši odgovor, manj popravljanja"],
            ["Pošlji CSV, ne slike tabele", "manj tokenov in boljši rezultat"],
            ["Ne prilagaj cele mape", "priloži le datoteke, ki so res potrebne"],
            ["Šibkejši model za preprosta opravila", "Haiku za urejanje, Opus za razmislek"],
            ["Ne ponavljaj konteksta", "model vidi celoten pogovor, ne rabi ponovitve"]
          ],
          deeper: "Prva vrstica v tabeli je vredna vseh ostalih skupaj. Ljudje pustijo en pogovor teči cel " +
                  "teden in se čudijo porabi — pri tem pa vsako novo vprašanje potegne s seboj vse od " +
                  "ponedeljka. Pravilo: en pogovor, ena naloga. Ko je naloga končana, pogovor zapri.",
          refs: [
            { t: "Anthropic — predpomnjenje vsebine", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-caching" }
          ],
          notes: "Poudari 'en pogovor, ena naloga'. To je najbolj uporaben nasvet modula.",
          links: ["9.2", "10.5", "10.6"]
        },

        {
          id: "10.8", core: true, t: "Halucinacije", tag: "hallucination",
          s: [
            "Halucinacija je odgovor, ki zveni pravilno, a ni resničen — izmišljena številka, neobstoječa funkcija, napačna povezava.",
            "Ni laž in ni napaka v običajnem pomenu: model je izračunal najverjetnejše nadaljevanje, ki se je izkazalo za neresnično.",
            "Najpogostejša je tam, kjer model nima podatkov: pri natančnih številkah, imenih, datumih, povezavah in navedbah.",
            "Zato pravilo: vse, kar je preverljivo, preveri — in raje zahtevaj vir kot trditev."
          ],
          code: {
            term: true,
            file: "Kje najpogosteje zataji",
            src: `VISOKO TVEGANJE            NIZKO TVEGANJE
  natancne stevilke          razlaga pojma
  imena in datumi            preoblikovanje besedila
  povezave in citati         predlogi struktur
  imena funkcij knjiznic     koda, ki jo lahko pozenes
  pravni in davcni podatki   povzetek besedila, ki si ga dal`,
            note: "Desni stolpec: model dela s tem, kar mu das. Levi: model ugiba."
          },
          deeper: "Najboljša obramba ni boljši prompt, ampak preverljiv izhod. Koda se da pognati in testirati " +
                  "(Modul 9). Povzetek se da primerjati z izvirnikom. Številka iz zraka se ne da preveriti " +
                  "z ničimer. Zato velja pravilo iz pojma 2.6: naj AI napiše program, ki izračuna, ne pa " +
                  "da izračuna sam. Vse povezave v tem gradivu so bile na primer preverjene s programom, " +
                  "ne prepisane iz spomina.",
          refs: [
            { t: "Anthropic — pregled modelov", url: "https://docs.claude.com/en/docs/about-claude/models/overview" }
          ],
          notes: "Povej, da so bile povezave v gradivu preverjene s skripto. To je živ primer pravila.",
          links: ["2.6", "9.6", "10.1"]
        },

        {
          id: "10.9", core: true, t: "Kaj ne sme v AI", tag: "privacy",
          s: [
            "Vse, kar vpišeš v pogovor, zapusti tvoj računalnik in potuje do storitve.",
            "V poslovnem okolju je pomembno, kateri paket uporabljaš in kaj piše v pogodbi tvojega podjetja.",
            "Nekatere stvari ne sodijo v pogovor v nobenem primeru — ne zaradi nezaupanja, ampak ker to ni potrebno."
          ],
          cmds: [
            ["Gesla, API ključi, žetoni", "nikoli — tudi ne 'samo za test'"],
            ["Osebni podatki strank", "le če podjetje to izrecno dovoljuje"],
            ["Zdravstveni in finančni podatki", "praviloma ne"],
            ["Pogodbe in interni dokumenti", "po pravilih podjetja"],
            ["Koda brez skrivnosti", "običajno v redu"],
            ["Izmišljeni testni podatki", "vedno v redu — in pogosto dovolj"]
          ],
          deeper: "Praktičen prijem, ki reši večino primerov: pred pošiljanjem podatke anonimiziraj. " +
                  "Agent ne potrebuje pravih imen strank, da napiše program za obdelavo računov — potrebuje " +
                  "le pravo *obliko* podatkov. Zamenjaj imena, skrajšaj datoteko na deset vrstic in pošlji to. " +
                  "Rezultat bo enak, tveganje pa nič.",
          refs: [
            { t: "Anthropic — pomoč in pogosta vprašanja", url: "https://support.claude.com/" }
          ],
          notes: "V podjetju je to najpomembnejši slajd modula. Povej ga počasi in ne skrajšuj.",
          links: ["6.5", "7.8"]
        },

        {
          id: "10.10", core: true, t: "Kaj je agent", tag: "agent",
          s: [
            "Agent je jezikovni model, ki ima na voljo orodja in teče v zanki: razmisli, uporabi orodje, poglej rezultat, ponovi.",
            "Razlika med klepetom in agentom ni v modelu, ampak v tem, ali sme kaj narediti.",
            "Orodja so lahko branje datoteke, iskanje po spletu, zagon programa ali klic tuje storitve.",
            "Zanka se konča, ko agent oceni, da je naloga opravljena — ali ko ga ustaviš ti."
          ],
          code: {
            term: true,
            file: "Zanka agenta",
            src: `Ti:     "Preimenuj vse racune po datumu."

Agent:  razmisli -> "moram videti, kaj je v mapi"
        orodje   -> dir prejeto\\
        rezultat <- 214 datotek
        razmisli -> "preberem prvi PDF in poiscem datum"
        orodje   -> python preberi.py
        rezultat <- napaka: manjka knjiznica
        razmisli -> "namestim jo"
        orodje   -> pip install pypdf
        ...
        konec    -> "Preimenoval sem 209 datotek, 5 jih je v mapi rocno."`,
            note: "Vsak korak zanke je nov klic modela - in vsak stane tokene."
          },
          deeper: "Iz izpisa je razvidna tudi cena: agent, ki naredi trideset korakov, pošlje model tridesetkrat, " +
                  "vsakič z vsem, kar je do tedaj videl. Zato so pri agentih majhne datoteke, jasna navodila in " +
                  "omejen obseg naloge neposredno vidni v računu — in zato je `arhitektura.md` iz pojma 9.8 " +
                  "tako koristna.",
          refs: [
            { t: "Claude Code — pregled", url: "https://docs.claude.com/en/docs/claude-code/overview" }
          ],
          notes: "Preberi zanko na glas. Publika si mora predstavljati, da se to ponavlja.",
          links: ["9.8", "10.5", "10.19"]
        },

        {
          id: "10.11", core: true, t: "Claude: klepet", tag: "Claude chat",
          s: [
            "Klepet je pogovorno okno brez dostopa do tvojih datotek — razen tistih, ki jih sam priložiš.",
            "Namenjen je razmisleku, razlagi, pisanju in načrtovanju, ne izvajanju.",
            "Prav zato je najboljši prostor za prvi korak vsakega projekta: da idejo najprej razjasniš."
          ],
          cmds: [
            ["Za kaj je najboljši", "razmislek, razlaga, pisanje, načrt"],
            ["Kaj vidi", "samo pogovor in kar priložiš"],
            ["Kaj lahko spremeni", "nič na tvojem računalniku"],
            ["Tipična uporaba", "*razloži mi*, *razmisli z mano*, *napiši osnutek*"]
          ],
          deeper: "Napaka, ki jo naredi skoraj vsak na začetku, je, da gre takoj v orodje, ki piše kodo. " +
                  "Pol ure pogovora v navadnem klepetu, kjer razjasniš, kaj sploh hočeš, prihrani nekajkrat " +
                  "toliko dela kasneje. Recept za to je v pojmu 11.5.",
          refs: [
            { t: "Claude — pomoč in navodila", url: "https://support.claude.com/en/collections/4078531-claude-apps" }
          ],
          notes: "Tu napovej, da je prvi korak recepta prav navaden klepet.",
          links: ["11.1", "11.5"]
        },

        {
          id: "10.12", core: true, t: "Claude: Cowork", tag: "Claude Cowork",
          s: [
            "Cowork je agentsko okolje za delo, ki ni programiranje: dokumenti, preglednice, predstavitve, raziskave.",
            "Claude tam ne le svetuje, ampak sam opravi zaporedje korakov in vrne izdelek.",
            "Namenjen je ljudem, ki jih ne zanima koda, zanima pa jih rezultat."
          ],
          cmds: [
            ["Za kaj je najboljši", "daljše opravilo z izdelkom na koncu"],
            ["Kaj vidi", "datoteke, ki mu jih daš, in povezane storitve"],
            ["Kaj lahko spremeni", "ustvari in ureja datoteke v svojem prostoru"],
            ["Tipična uporaba", "*preglej teh 40 poročil in naredi povzetek*"]
          ],
          deeper: "Meja med Cowork in Code ni v težavnosti, ampak v vrsti izdelka: če je rezultat dokument, " +
                  "tabela ali analiza, je Cowork prava izbira; če je rezultat koda, ki se bo poganjala " +
                  "in vzdrževala, je Code. Ker se izdelki hitro razvijajo, preveri trenutne zmožnosti " +
                  "na uradni strani.",
          refs: [
            { t: "Claude — pomoč in navodila", url: "https://support.claude.com/en/collections/4078531-claude-apps" }
          ],
          notes: "Povej odkrito, da se ta izdelek hitro spreminja in naj preverijo aktualno stanje.",
          links: ["10.11", "10.13"]
        },

        {
          id: "10.13", core: true, t: "Claude: Code", tag: "Claude Code",
          s: [
            "Claude Code je agent, ki teče na tvojem računalniku in ima dostop do mape projekta.",
            "Bere in piše datoteke, poganja ukaze, preizkuša kodo in popravlja, kar ne deluje.",
            "Prav v njem je nastalo to gradivo — vključno z zagonskimi datotekami in tem besedilom."
          ],
          cmds: [
            ["Za kaj je najboljši", "graditi in vzdrževati kodo in orodja"],
            ["Kaj vidi", "mapo projekta, ki mu jo določiš"],
            ["Kaj lahko spremeni", "datoteke v tej mapi in ukaze, ki jih odobriš"],
            ["Varovalka", "vsak nevaren ukaz mora potrditi človek"],
            ["Tipična uporaba", "*zgradi orodje po arhitektura.md*"]
          ],
          deeper: "Ker ima dostop do datotek, je tu Git iz pojma 9.7 nepogrešljiv. Pravilo, ki ga ni vredno " +
                  "kršiti: commit pred vsako sejo. In drugo: agentu določi mapo projekta, ne celotnega diska — " +
                  "tako je obseg morebitne škode vnaprej omejen.",
          refs: [
            { t: "Claude Code — pregled", url: "https://docs.claude.com/en/docs/claude-code/overview" },
            { t: "Claude Code — predstavitev izdelka", url: "https://claude.com/product/claude-code" }
          ],
          notes: "Pokaži to gradivo kot dokaz. Publika rada vidi, da je nastalo tako, kot govoriš.",
          links: ["9.7", "10.10", "11.6"]
        },

        {
          id: "10.14", core: true, t: "Artifacts", tag: "artifacts",
          s: [
            "Artifact je samostojen izdelek, ki nastane med pogovorom in se prikaže ob njem: dokument, stran, aplikacija ali diagram.",
            "Ni le besedilo v pogovoru — je stvar, ki jo lahko odpreš, uporabljaš in deliš.",
            "Uporaben je takrat, ko rezultat ni odgovor, ampak nekaj, kar bo nekdo dejansko uporabljal."
          ],
          deeper: "Za netehničnega uporabnika je to najhitrejša pot od ideje do uporabne stvari: opišeš, " +
                  "kaj potrebuješ, in dobiš delujoč pripomoček, ne navodil, kako ga narediti. Ista " +
                  "tehnologija kot v Modulu 6 — HTML, CSS in JavaScript — le da je vmesni korak odpadel.",
          refs: [
            { t: "Claude — pomoč in navodila", url: "https://support.claude.com/en/collections/4078531-claude-apps" }
          ],
          notes: "Če imaš pri roki primer artifacta, ga pokaži. Beseda sama pove malo.",
          links: ["6.1", "7.7"]
        },

        {
          id: "10.15", core: true, t: "Connectors", tag: "connectors",
          s: [
            "Connector je povezava med Claudom in storitvijo, ki jo že uporabljaš — koledarjem, pošto, diskom, sistemom za naloge.",
            "Ko je vzpostavljena, Claude te podatke lahko bere in po potrebi tudi spreminja.",
            "Vsaka taka povezava razširi, kaj agent zmore — in hkrati, kaj lahko pokvari."
          ],
          deeper: "Pri povezavah velja isto pravilo kot pri javnih naslovih iz pojma 7.8: vklopi le tiste, " +
                  "ki jih res potrebuješ, in preveri, kaj vsaka dovoljuje. Razlika med *sme brati koledar* in " +
                  "*sme pošiljati vabila v tvojem imenu* je velika, čeprav sta obe povezavi videti enako. " +
                  "Tehnično connectorji stojijo na protokolu MCP iz pojma 10.17.",
          refs: [
            { t: "Anthropic — oddaljeni strežniki MCP", url: "https://docs.claude.com/en/docs/agents-and-tools/remote-mcp-servers" }
          ],
          notes: "Poudari razliko med branjem in pisanjem. To je vprašanje, ki ga publika sama ne postavi.",
          links: ["7.8", "10.17"]
        },

        {
          id: "10.16", core: true, t: "Skills", tag: "skills",
          s: [
            "Skill je zapisan postopek, ki ga agent prebere takrat, ko ga potrebuje — priročnik na polici, ne znanje na pamet.",
            "Je navadna mapa z datoteko `SKILL.md`, v kateri piše, kdaj se uporabi in kako se naloga opravi.",
            "Ker se naloži le ob pravem trenutku, ne obremenjuje konteksta, dokler ni potreben.",
            "Pomembnejše od tehnike je posledica: dober postopek zapišeš enkrat in ga imaš vsakič."
          ],
          code: {
            file: "SKILL.md",
            src: `---
name: mesecno-porocilo
description: Uporabi, kadar uporabnik zahteva mesecno porocilo
             o prejetih racunih.
---

# Mesecno porocilo

1. Preberi racuni.csv
2. Filtriraj na zahtevani mesec
3. Sestej po dobaviteljih, uredi padajoce
4. Izpisi tabelo in skupni znesek
5. Opozori na racune brez dobavitelja`,
            note: "Pet vrstic navodila nadomesti pet minut razlaganja - vsakic znova."
          },
          deeper: "Opis v glavi je najpomembnejši del: iz njega agent ugotovi, *kdaj* naj skill sploh uporabi. " +
                  "Slab opis pomeni, da skill obstaja, a se nikoli ne sproži. Skills so tudi najlažji način, " +
                  "da svoje delovne postopke deliš s sodelavci — mapo preprosto pošlješ naprej.",
          refs: [
            { t: "Anthropic — Agent Skills", url: "https://docs.claude.com/en/docs/agents-and-tools/agent-skills" },
            { t: "Claude Code — skills", url: "https://docs.claude.com/en/docs/claude-code/skills" }
          ],
          notes: "Napovej, da bodo v Modulu 11 spoznali tri konkretne skille.",
          links: ["10.17", "11.1", "11.4"]
        },

        {
          id: "10.17", core: true, t: "MCP — kako agent vidi svet", tag: "MCP",
          s: [
            "MCP je dogovorjen način, kako se agentu pove, katera orodja ima na voljo in kako jih pokliče.",
            "Vsako orodje se predstavi z imenom, opisom in obliko vhoda — agent ga nato kliče kot API iz Modula 6.",
            "Ker je dogovor enoten, isti strežnik MCP deluje z različnimi agenti in različnimi modeli.",
            "Preprosto povedano: MCP je vtičnica, v katero priklopiš svoje sisteme."
          ],
          code: {
            file: "orodje.json",
            src: `{
  "name": "poisci_racun",
  "description": "Poisce racun po stevilki in vrne znesek in datum.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "stevilka": { "type": "string" }
    },
    "required": ["stevilka"]
  }
}`,
            note: "Agent prebere OPIS in iz njega sklepa, kdaj naj orodje uporabi."
          },
          deeper: "Zdaj se sestavi cela veriga iz prejšnjih modulov: opis orodja je JSON (3.5), klic je zahteva " +
                  "z odgovorom (5.7, 6.6), rezultat se vrne kot JSON in se prilepi v kontekst (10.4). Zato je " +
                  "kakovost opisa tako pomembna — natanko tako kot dobro ime funkcije iz pojma 9.3. " +
                  "Orodje s slabim opisom agent bodisi spregleda bodisi uporabi narobe.",
          refs: [
            { t: "Model Context Protocol — uradna stran", url: "https://modelcontextprotocol.io/" },
            { t: "Anthropic — MCP", url: "https://docs.claude.com/en/docs/mcp" }
          ],
          notes: "Poveži nazaj na 3.5, 6.6 in 9.3. Tu se gradivo zares sklene.",
          links: ["3.5", "6.6", "9.3", "10.15"]
        },

        {
          id: "10.18", core: true, t: "Pod-agenti", tag: "sub-agents",
          s: [
            "Pod-agent je ločen agent s svojim kontekstom, ki ga glavni agent pokliče za zaokroženo opravilo.",
            "Prednost je dvojna: glavni kontekst ostane čist, pod-agent pa vidi samo to, kar res potrebuje.",
            "Prav ta omejenost je uporabna — pod-agent, ki ne vidi testov, jim ne more pisati kode na kožo."
          ],
          code: {
            term: true,
            file: "Delitev dela",
            src: `GLAVNI AGENT  (ve vse o projektu)
  |
  +-- pod-agent A: "napisi teste za funkcijo z_ddv"
  |      vidi: zahtevo + arhitektura.md
  |      NE vidi: obstojeco kodo
  |
  +-- pod-agent B: "implementiraj funkcijo z_ddv"
  |      vidi: zahtevo + arhitektura.md
  |      NE vidi: teste agenta A
  |
  +-- pozene teste -> 3 passed, 1 failed -> B popravlja`,
            note: "Loceni konteksti niso omejitev, ampak namen."
          },
          deeper: "Cena so dodatni tokeni: vsak pod-agent je svoj pogovor. Zato se prijem splača pri " +
                  "opravilih, kjer je natančnost pomembnejša od cene — pri pisanju testov, pri pregledu " +
                  "kode in pri raziskovanju, kjer bi glavni kontekst hitro zapolnili nepomembni podatki.",
          refs: [
            { t: "Claude Code — pod-agenti", url: "https://docs.claude.com/en/docs/claude-code/sub-agents" }
          ],
          notes: "To je tehnična podlaga za trik iz pojma 11.7. Napovej ga.",
          links: ["9.6", "10.5", "11.7"]
        },

        {
          id: "10.19", core: true, t: "Dobre prakse pri gradnji agentov", tag: "building agents well",
          s: [
            "Agent je toliko dober, kolikor natančno je opisana naloga in kolikor omejena so njegova orodja.",
            "Najpogostejši vzrok slabega rezultata ni model, ampak preohlapno navodilo in prevelik obseg."
          ],
          cmds: [
            ["Zapiši `arhitektura.md`", "brez nje agent ugiba namen"],
            ["Omeji mapo projekta", "manj dostopa, manj škode"],
            ["Ena naloga, en pogovor", "kontekst ostane čist"],
            ["Zahtevaj načrt pred izvedbo", "napako v načrtu je ceneje popraviti"],
            ["Testi pred implementacijo", "in ločen pod-agent zanje"],
            ["Commit pred vsako sejo", "varnostna mreža"],
            ["Preveri, kaj je naredil", "diff prebere človek, ne agent"],
            ["Zapiši, kaj ni delovalo", "sicer bo poskusil znova"]
          ],
          deeper: "Vse te prakse imajo skupen imenovalec: zmanjšajo negotovost. Model je nedeterminističen " +
                  "(2.6), zato ga ne moreš narediti zanesljivega — lahko pa zmanjšaš prostor, v katerem se " +
                  "lahko zmoti. Jasen cilj, majhen obseg, preverljiv izhod in možnost vrnitve nazaj so štirje " +
                  "vzvodi, ki jih imaš v rokah.",
          refs: [
            { t: "Claude Code — pregled", url: "https://docs.claude.com/en/docs/claude-code/overview" }
          ],
          notes: "To je povzetek celotnega gradiva v eni tabeli. Vzemi si čas.",
          links: ["9.6", "9.8", "11.6"]
        }

      ]
    },

    {
      id: 11,
      t: "Delovni tok od ideje do kode",
      sub: "Celoten recept: od stavka v klepetu do preverjene kode, korak za korakom.",
      items: [

        {
          id: "11.1", core: true, t: "Skill: grilling", tag: "grilling",
          s: [
            "Grilling je skill, ki obrne vloge: namesto da ti agent odgovarja, te začne spraševati.",
            "Vprašanja postavlja v krogih — vsak krog odpre le tista vprašanja, na katera je mogoče odgovoriti zdaj.",
            "Pri vsakem vprašanju ponudi svoje priporočilo, zato je odgovarjanje hitro tudi, kadar nimaš mnenja.",
            "Rezultat je, da ideja postane odločitev, preden nastane ena sama vrstica kode."
          ],
          code: {
            term: true,
            file: "Kako izgleda",
            src: `Ti:    "Rad bi orodje za obdelavo racunov."

Agent: Q1 - Vhod: so racuni PDF, skenirani ali oboje?
          -> Predlog: oboje, s samodejnim zaznavanjem.

       Q2 - Kaj naj se zgodi, ce izluscanje ne uspe?
          -> Predlog: datoteka gre v mapo "rocno" in se zabelezi.

       Q3 - Kje bodo podatki koncali: CSV ali baza?
          -> Predlog: CSV, ker je 200 racunov na mesec.`,
            note: "To gradivo je nastalo natanko tako - z 28 vprasanji v stirih krogih."
          },
          deeper: "Vrednost ni v vprašanjih samih, ampak v tem, da te prisilijo odgovoriti na stvari, ki bi jih " +
                  "sicer agent tiho ugibal. Vsako neodgovorjeno vprašanje je mesto, kjer bo nastalo nekaj, " +
                  "česar nisi hotel. Uporabi ga vedno, kadar je naloga večja od ene datoteke.",
          refs: [
            { t: "grilling — izvorna koda skilla", url: "https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling" }
          ],
          notes: "Pokaži prvi krog vprašanj iz tega projekta. Publika rada vidi resničen primer.",
          links: ["1.6", "9.1", "11.5"]
        },

        {
          id: "11.2", core: true, t: "Skill: handoff", tag: "handoff",
          s: [
            "Handoff pripravi predajo dela: povzetek stanja, ki ga lahko prevzame nov pogovor ali drug človek.",
            "Reši natanko težavo iz pojma 10.6 — kaj narediti, ko se kontekstno okno polni.",
            "Dober handoff vsebuje tudi, kaj je bilo že poskušeno in ni delovalo."
          ],
          code: {
            file: "predaja.md",
            src: `# Stanje projekta - 21. 9. 2026

## Cilj
Orodje za obdelavo prejetih racunov (glej arhitektura.md).

## Narejeno
- branje PDF, izluscanje datuma in zneska (deluje na 209/214)
- zapis v racuni.csv

## Odprto
- 5 skeniranih racunov potrebuje OCR

## NE poskusaj znova
- pdfminer: pocasnejsi in slabsi rezultat kot pypdf
- regex za znesek brez konteksta vrstice: prevec lazno pozitivnih`,
            note: "Zadnji razdelek je tisti, ki loci dobro predajo od seznama zelja."
          },
          deeper: "Isto datoteko uporabiš tudi, ko delo predaš sodelavcu ali ko se k projektu vrneš čez mesec " +
                  "dni. Pravzaprav je to isti dokument kot `arhitektura.md`, le da opisuje trenutno stanje " +
                  "namesto namena — mnogi ju zato držijo skupaj v eni datoteki z dvema razdelkoma.",
          refs: [
            { t: "handoff — izvorna koda skilla", url: "https://github.com/mattpocock/skills/tree/main/skills/productivity/handoff" }
          ],
          notes: "Poveži z 10.6 — to je ista rešitev, zapakirana v postopek.",
          links: ["9.8", "10.6"]
        },

        {
          id: "11.3", core: true, t: "Skill: improve", tag: "improve",
          s: [
            "Improve pregleda obstoječo kodo kot izkušen svetovalec in pripravi načrt izboljšav.",
            "Sam kode ne spreminja — njegov izdelek je načrt, dovolj natančen, da ga izvede drug agent.",
            "Prav ta ločitev je bistvo: razmislek opravi močan model, izvedbo pa lahko cenejši."
          ],
          code: {
            term: true,
            file: "Kaj naredi",
            src: `1. Prebere projekt: jezik, zgradbo, teste, navade
2. Poisce priloznosti: napake, varnost, hitrost, manjkajoci testi
3. Vsako ugotovitev PREVERI v kodi (ne zaupa svojemu prvemu vtisu)
4. Predstavi seznam, urejen po razmerju ucinek/trud
5. Ti izberes, kaj naj postane nacrt
6. Za vsako izbrano napise samostojen nacrt v mapo plans/`,
            note: "Nacrt je samostojen: izvajalec ga razume brez tega pogovora."
          },
          deeper: "Tretji korak je tisti, ki ga ljudje spregledajo in ki največ prinese: skill svoje ugotovitve " +
                  "preveri, preden jih predstavi, ker so prvi vtisi pogosto napačni. Isti prijem je vreden " +
                  "posnemanja tudi ročno — preden agentu verjameš, da je nekaj narobe, ga prosi, naj pokaže " +
                  "vrstico.",
          refs: [
            { t: "improve — izvorna koda skilla", url: "https://github.com/shadcn/improve" }
          ],
          notes: "Pokaži mapo plans/ tega projekta. Nastala je s tem skillom.",
          links: ["9.1", "10.16", "11.6"]
        },

        {
          id: "11.4", core: true, t: "Kje dobiš skills", tag: "skills.sh",
          s: [
            "Skills so navadne mape z datoteko `SKILL.md` — lahko jih napišeš sam ali prevzameš od drugih.",
            "Zbirka preverjenih skillov je dosegljiva na **skills.sh**.",
            "Preden skill uporabiš, ga preberi: to so navodila, ki jih bo agent izvedel na tvojem računalniku."
          ],
          cmds: [
            ["skills.sh", "zbirka skillov za brskanje in namestitev"],
            ["`SKILL.md`", "srce vsakega skilla — preberi ga pred uporabo"],
            ["Polje `description`", "odloča, kdaj se skill sproži"],
            ["Lasten skill", "najhitrejša pot: zapiši postopek, ki ga ponavljaš"],
            ["Deljenje", "mapo pošlješ sodelavcu, deluje takoj"]
          ],
          deeper: "Enako pravilo kot pri knjižnicah iz pojma 8.10: tuja navodila so tuja koda. Skill, ki ga " +
                  "ne razumeš, lahko agentu naroči karkoli — tudi brisanje ali pošiljanje podatkov. Pri " +
                  "znanih virih je tveganje majhno, a branje pred uporabo je navada, ki se splača.",
          refs: [
            { t: "skills.sh", url: "https://skills.sh/" },
            { t: "Anthropic — Agent Skills", url: "https://docs.claude.com/en/docs/agents-and-tools/agent-skills" }
          ],
          notes: "Povej, naj preberejo SKILL.md pred uporabo. Isto pravilo kot pri knjižnicah.",
          links: ["8.10", "10.16"]
        },

        {
          id: "11.5", core: true, t: "Recept 1: od ideje do arhitekture", tag: "recipe 1",
          s: [
            "Prvi del recepta se odvije v navadnem klepetu — brez kode, brez orodij, brez hitenja.",
            "Cilj je ena sama datoteka `arhitektura.md`, iz katere bo agent kasneje gradil.",
            "Šele ko ta datoteka obstaja, se splača odpreti orodje, ki piše kodo."
          ],
          cmds: [
            ["1. Opiši idejo", "v navadnem klepetu, s svojimi besedami"],
            ["2. Povej vhode", "kaj imaš: datoteke, tabele, dostopi"],
            ["3. Povej izhode", "kaj pričakuješ: datoteka, poročilo, orodje"],
            ["4. Zahtevaj grilling", "*grill me* — odgovarjaj po krogih"],
            ["5. Navedi omejitve", "Windows, brez namestitev, podatki ostanejo doma"],
            ["6. Zahtevaj `arhitektura.md`", "in jo preberi, preden greš naprej"],
            ["7. Shrani jo v mapo projekta", "tam jo bo agent našel"]
          ],
          deeper: "Šesta točka ni formalnost. Preberi datoteko kot naročnik, ne kot bralec: je v njej kaj, " +
                  "česar nisi rekel? Manjka kaj, kar si mislil, da je očitno? Vsak stavek, ki ga popraviš tu, " +
                  "je popravek, ki ga kasneje ne bo treba delati v kodi — in to je razlika med desetimi " +
                  "minutami in dvema dnevoma.",
          refs: [
            { t: "Claude Code — datoteka s spominom projekta", url: "https://docs.claude.com/en/docs/claude-code/memory" }
          ],
          notes: "Povej, da je to gradivo nastalo natanko po tem receptu, in pokaži plans/README.md.",
          links: ["9.8", "10.11", "11.1"]
        },

        {
          id: "11.6", core: true, t: "Recept 2: od arhitekture do kode", tag: "recipe 2",
          s: [
            "Drugi del se odvije v orodju, ki ima dostop do mape — na primer v Claude Code.",
            "Vrstni red je vedno isti: načrt, potrditev, testi, izvedba, preverba.",
            "Nikoli ne preskoči potrditve načrta; napaka v načrtu je stokrat cenejša od napake v kodi."
          ],
          cmds: [
            ["1. `git init` in prvi commit", "varnostna mreža, preden se karkoli začne"],
            ["2. Daj mu mapo projekta", "in `arhitektura.md` vanjo"],
            ["3. Če kaj ni jasno: grilling", "raje vprašanja zdaj kot ugibanje kasneje"],
            ["4. Če je jasno: improve", "naj pripravi načrt implementacije"],
            ["5. Preberi načrt", "in ga potrdi ali popravi"],
            ["6. Testi s pod-agentom", "ločen agent, ki ne bo pisal kode"],
            ["7. Implementacija", "drug agent, ki testov ne vidi"],
            ["8. Poženi teste", "in pusti agenta popravljati, dokler ni zeleno"],
            ["9. Preglej diff", "to je edini korak, ki ga opravi človek"],
            ["10. Commit", "in šele nato naslednja naloga"]
          ],
          deeper: "Deveta točka je tista, ki je ni mogoče prenesti na stroj. Ni treba, da razumeš vsako " +
                  "vrstico — dovolj je, da preveriš, ali je agent spremenil tisto, kar si pričakoval, in ali " +
                  "ni mimogrede spremenil še česa drugega. Prav zato so majhni koraki in pogosti commiti " +
                  "tako pomembni: diff, ki obsega tri datoteke, se da prebrati, diff s tridesetimi pa ne.",
          refs: [
            { t: "Claude Code — pregled", url: "https://docs.claude.com/en/docs/claude-code/overview" },
            { t: "Git — dokumentacija", url: "https://git-scm.com/doc" }
          ],
          notes: "Poudari korak 9. To je vloga, ki ostane človeku.",
          links: ["9.7", "10.13", "11.7"]
        },

        {
          id: "11.7", core: true, t: "Implementator ne vidi testov", tag: "blind implementer",
          s: [
            "Teste naj napiše en agent, kodo pa drug, ki testov ne vidi.",
            "Če isti agent napiše oboje, bo teste nezavedno prilagodil kodi, ki jo je pravkar napisal.",
            "Tako oboje ustreza isti napačni predpostavki in testi ne dokazujejo ničesar.",
            "Ločitev je poceni, izvedljiva v enem stavku navodila in opazno zmanjša število napak."
          ],
          code: {
            term: true,
            file: "Navodilo, ki to doseže",
            src: `Ti (glavnemu agentu):

  "Za funkcijo z_ddv najprej s pod-agentom napisi teste
   po arhitektura.md. Nato z LOCENIM pod-agentom, ki testov
   NE vidi, implementiraj funkcijo. Nato pozeni teste in
   pusti drugega pod-agenta popravljati, dokler vsi ne gredo skozi.
   Testov med popravljanjem ne spreminjaj."`,
            note: "Zadnji stavek je kljucen: sicer bo agent popravil test namesto kode."
          },
          deeper: "Zadnja vrstica ni pretirana previdnost. Ko test pade, je popravljanje testa najkrajša pot " +
                  "do zelene barve — in agent bo, če mu tega ne prepoveš, to pot ubral. Test, ki je bil " +
                  "prilagojen kodi, ni več zahteva, ampak opis tega, kar koda pač počne. " +
                  "Če se med delom izkaže, da je test res napačen, ga popravi ti, zavestno in z razlogom.",
          refs: [
            { t: "Claude Code — pod-agenti", url: "https://docs.claude.com/en/docs/claude-code/sub-agents" }
          ],
          notes: "To je zaključna poanta gradiva. Povej jo počasi in z odmorom.",
          links: ["9.6", "10.18", "11.6"]
        }

      ]
    },

    {
      id: 12,
      t: "Velika slika",
      sub: "Kako se vse našteto poveže in kam naprej.",
      items: [

        {
          id: "12.1", core: true, t: "Kako se vse poveže", tag: "the big picture",
          s: [
            "Vse gradivo stoji na štirih idejah, ki se ponavljajo v vsakem modulu.",
            "Prva: kar je tekst, je za računalnik in za AI uporabno; kar ni, je treba najprej pretvoriti.",
            "Druga: ena resnica na enem mestu — spremenljivka, ključ v bazi, `arhitektura.md`.",
            "Tretja: koda je predvidljiva, AI ni, zato mora biti izhod preverljiv.",
            "Četrta: velik problem se reši samo tako, da postane zaporedje majhnih."
          ],
          code: {
            term: true,
            file: "Ista ideja skozi module",
            src: `ENA RESNICA NA ENEM MESTU
  1.2  spremenljivka        ena skatla, ne sedemnajst
  4.4  kljuc v bazi         ime stranke zapisano enkrat
  6.3  barva v CSS          --accent na enem mestu
  9.8  arhitektura.md       odlocitve na enem mestu
 10.6  povzetek seje        stanje na enem mestu

TEKST JE UPORABEN, BINARNO NI
  3.2  tekst vs. binarno    temeljna delitev
  3.10 AI-prijazni formati  posledica
  3.11 OCR                  resitev, ko je prepozno`,
            note: "Ko opazis vzorec, si nehas zapomnjevati podrobnosti."
          },
          deeper: "Če boš čez pol leta pozabil vse podrobnosti — kaj počne `git restore`, katera vrata " +
                  "uporablja PostgreSQL, kako se piše `SELECT` — se ne bo zgodilo nič hudega. Vse to je " +
                  "mogoče poiskati ali vprašati agenta. Štiri ideje zgoraj pa so tiste, zaradi katerih boš " +
                  "znal postaviti pravo vprašanje, in prav to je razlika med uporabnikom in graditeljem.",
          refs: [
            { t: "Anthropic — Agent Skills", url: "https://docs.claude.com/en/docs/agents-and-tools/agent-skills" }
          ],
          notes: "Odpri mind map na vrhu strani in pokaži povezave med moduli.",
          links: ["1.2", "3.2", "2.6", "9.1"]
        },

        {
          id: "12.2", core: true, t: "Kam naprej", tag: "where to go next",
          s: [
            "Ne začni z velikim projektom, ampak z opravilom, ki te vsak teden jezi.",
            "Naj bo dovolj majhno, da se konča v enem popoldnevu, in dovolj tvoje, da veš, kdaj je prav.",
            "Prvi uspeh naj bo nekaj, kar boš dejansko uporabljal — takrat se vse iz tega gradiva usede samo od sebe."
          ],
          cmds: [
            ["Prvi projekt", "opravilo, ki ga ponavljaš vsak teden"],
            ["Prvo orodje", "navaden klepet — razjasni idejo"],
            ["Prva datoteka", "`arhitektura.md`, napisana z grillingom"],
            ["Prva navada", "commit pred vsako sejo z agentom"],
            ["Druga navada", "en pogovor, ena naloga"],
            ["Ko se zatakne", "preberi zadnjo vrstico napake in jo prilepi agentu"],
            ["Ko okno poči", "povzetek in nov pogovor"]
          ],
          deeper: "Najpogostejša napaka po takšni delavnici ni tehnična, ampak izbira prvega projekta: " +
                  "ljudje se lotijo nečesa velikega, ker je navdušenje sveže, in obtičijo. Majhno opravilo, " +
                  "ki ga dokončaš, nauči več kot velik projekt, ki ga opustiš — in ti da edino stvar, ki " +
                  "resnično prepriča sodelavce: delujoč primer.",
          refs: [
            { t: "skills.sh — zbirka skillov", url: "https://skills.sh/" },
            { t: "Claude Code — pregled", url: "https://docs.claude.com/en/docs/claude-code/overview" }
          ],
          notes: "Zaključi z vprašanjem: katero opravilo te je ta teden najbolj zajedlo? To je njihov prvi projekt.",
          links: ["11.5", "11.6"]
        }

      ]
    }

  ]
};
