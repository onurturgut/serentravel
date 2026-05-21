const tourImage = (file: string) => `/images/tours/${file}`;

export type Tour = {
  slug: string;
  title: string;
  category: string;
  short: string;
  description: string;
  image: string;
  duration: string;
  type: string;
  booking: string;
  included: string[];
  stops?: string[];
  notes?: string[];
  gallery: string[];
};

export const tours: Tour[] = [
  {
    slug: "oludeniz-yamac-parasutu",
    title: "Ölüdeniz Yamaç Paraşütü",
    category: "Adrenalin",
    short:
      "Babadağ'dan Ölüdeniz semalarına uzanan profesyonel tandem uçuş deneyimi.",
    description:
      "Hayatiniz boyunca unutamayacaginiz bir deneyime hazir olun. Babadag'dan yamac parasutu, Fethiye Oludeniz semalarinda essiz manzara ve ozgurlugu bir araya getirir. SEREN Travel, profesyonel pilotlar ve guvenlik prosedurleriyle konforlu bir ucus organizasyonu sunar.",
    image: tourImage("oludeniz-yamac-parasutu.jpg"),
    duration: "Ucus 30-40 dk | Toplam 1,5-2 saat",
    type: "Tandem ucus",
    booking: "Seanslar: 08:30, 11:00, 13:00, 15:00, 17:00",
    included: [
      "Profesyonel tandem pilotu",
      "Babadag cikis transferi",
      "Tum ekipman kullanimi",
      "Ucus oncesi brifing",
      "Yasal izinler ve guvenlik prosedurleri",
      "GoPro fotograf ve video",
    ],
    stops: [
      "Kalkis: Babadag 1700 m, 1800 m, 1900 m veya 1965 m",
      "Inis: Oludeniz Sahili, ofis onu",
    ],
    gallery: [
      tourImage("oludeniz-yamac-parasutu.jpg"),
      tourImage("oludeniz-yamac-parasutu-2.jpg"),
    ],
  },
  {
    slug: "oludeniz-6-adalar-tekne-turu",
    title: "Ölüdeniz Tekne Turu 6 Adalar",
    category: "Tekne Turu",
    short:
      "Kelebekler Vadisi dahil Oludeniz'in en populer koylarinda tam gun deniz keyfi.",
    description:
      "Fethiye tatilinizde mutlaka deneyimlemeniz gereken Oludeniz Tekne Turu; turkuaz sular, essiz koylar ve unutulmaz manzaralar esliginde harika bir gun sunar. Dinlenmek ve eglenmek isteyen aileler, ciftler ve arkadas gruplari icin ideal bir rotadir.",
    image: tourImage("kopuk-partili-korsan-tekne.jpg"),
    duration: "Tam gun",
    type: "Grup tekne turu",
    booking: "WhatsApp ile bilgi",
    included: ["Ogle yemegi", "Rehberlik", "Transfer"],
    stops: [
      "Kelebekler Vadisi",
      "Soguk Su Koyu",
      "St. Nicholas (Gemiler) Adasi",
      "Mavi Magara",
      "Akvaryum Koyu",
      "Deve Plaji",
    ],
    gallery: [
      tourImage("kopuk-partili-korsan-tekne.jpg"),
      tourImage("kopuk-partili-korsan-tekne-2.jpg"),
      tourImage("fethiye-12-adalar-tekne-turu.jpg"),
    ],
  },
  {
    slug: "fethiye-jeep-safari",
    title: "Fethiye Jeep Safari Turu",
    category: "Macera",
    short:
      "Tlos, Yakapark, Gizlikent Selalesi ve Saklikent Kanyonu ile dolu eglenceli gun.",
    description:
      "Fethiye'de en cok tercih edilen aktivitelerden Jeep Safari Turu; dogayi, macerayi ve eglenceyi bir araya getirir. Profesyonel rehber esliginde su savaslari, fotograf molalari, camur banyosu ve bolgenin ozel noktalarini kesfedeceginiz hareketli bir program sunulur.",
    image: tourImage("fethiye-jeep-safari.png"),
    duration: "Tam gun",
    type: "Grup safari",
    booking: "Otel transferli",
    included: [
      "Rehberlik hizmeti",
      "Ulasim",
      "Acik bufe ogle yemegi",
      "Sigorta",
    ],
    stops: [
      "Tlos Antik Kenti",
      "Yakapark",
      "Gizlikent Selalesi",
      "Saklikent Kanyonu",
      "Camur banyosu",
    ],
    notes: ["Rafting, zipline ve benzeri aktiviteler ekstra ucretlidir."],
    gallery: [
      tourImage("fethiye-jeep-safari.png"),
      tourImage("fethiye-jeep-safari-2.jpg"),
    ],
  },
  {
    slug: "fethiye-atv-safari",
    title: "Fethiye ATV Safari Turu",
    category: "Off Road",
    short:
      "Otomatik vites ATV araclarla orman yollarinda guvenli ve adrenalin dolu safari.",
    description:
      "Fethiye ATV Safari Turu, hic motor tecrubeniz olmasa bile katilabileceginiz guvenli bir off-road deneyimi sunar. Profesyonel ekip tarafindan verilen brifing ve test surusunun ardindan camurlu yollar, tozlu patikalar ve orman parkurlarinda keyifli bir rota baslar.",
    image: tourImage("fethiye-atv-safari.jpg"),
    duration: "Yaklasik 1,5 saat",
    type: "ATV safari",
    booking: "Istasyon alaninda karsilama",
    included: [
      "Guvenlik brifingi",
      "Test surusu",
      "Kask kullanimi",
      "Profesyonel ekip",
    ],
    stops: [
      "Toprak test parkuru",
      "Camurlu yollar",
      "Tozlu patikalar",
      "Orman ici parkurlar",
    ],
    gallery: [
      tourImage("fethiye-atv-safari.jpg"),
      tourImage("fethiye-atv-safari-2.jpg"),
    ],
  },
  {
    slug: "dalyan-tekne-turu",
    title: "Dalyan Tekne Turu",
    category: "Doga Turu",
    short:
      "Camur banyosu, Dalyan kanallari, kaya mezarlari ve Iztuzu Plaji ile ozel doga rotasi.",
    description:
      "Fethiye'den hareket eden Dalyan Tekne Turu; dogayi, tarihi ve denizi ayni gunde yasatir. Caretta caretta kaplumbagalariyla unlu Iztuzu Plaji, dogal camur banyolari ve Dalyan'in essiz kanallari bu turun one cikan duraklaridir.",
    image: tourImage("dalyan-tekne-turu.jpg"),
    duration: "Tam gun",
    type: "Tekne ve doga turu",
    booking: "Otel transferli",
    included: [
      "Rehberlik hizmeti",
      "Ulasim",
      "Camur banyosu giris ucreti",
      "Acik bufe ogle yemegi",
    ],
    stops: [
      "Camur banyosu",
      "Dalyan kanallari",
      "Kaya mezarlari",
      "Iztuzu Plaji",
    ],
    gallery: [
      tourImage("dalyan-tekne-turu.jpg"),
      tourImage("dalyan-tekne-turu-2.jpg"),
      tourImage("dalyan-tekne-turu-3.jpg"),
      tourImage("dalyan-tekne-turu-4.webp"),
    ],
  },
  {
    slug: "oludeniz-tuplu-dalis",
    title: "Ölüdeniz Tüplü Dalış Turu",
    category: "Dalis",
    short:
      "Mavi Magara, Akvaryum Koyu ve Ataturk Burnu cevresinde berrak sularda dalis.",
    description:
      "Oludeniz, Turkiye'nin en berrak dalis noktalarindan biridir. Daha once dalis yapmamis misafirler de kisa egitimle katilabilir. Profesyonel ekip esliginde kontrollu ve guvenli bir sekilde su altinin buyuleyici dunyasini kesfedersiniz.",
    image: tourImage("oludeniz-tuplu-dalis.jpg"),
    duration: "Program saatine gore",
    type: "Tuplu dalis",
    booking: "Kontenjan icin WhatsApp",
    included: [
      "Kisa egitim",
      "Profesyonel egitmen",
      "Dalis ekipmanlari",
      "Guvenlik takibi",
    ],
    stops: ["Mavi Magara", "Akvaryum Koyu", "Ataturk Burnu"],
    gallery: [
      tourImage("oludeniz-tuplu-dalis.jpg"),
      tourImage("oludeniz-tuplu-dalis-2.jpg"),
    ],
  },
  {
    slug: "fethiye-tuplu-dalis",
    title: "Fethiye Tüplü Dalış Turu",
    category: "Dalis",
    short:
      "Fethiye Limani cikisli teknede iki farkli dalis noktasi ve profesyonel egitim.",
    description:
      "SEREN Travel guvencesiyle ister ilk kez dalis yapin ister deneyimli olun, Fethiye ve Oludeniz'in turkuaz sularinda guvenli ve keyifli bir gun sizi bekliyor. Dalis oncesi egitim verilir, tum ekipmanlar hijyen ve guvenlik standartlarina uygun hazirlanir.",
    image: tourImage("fethiye-tuplu-dalis.jpg"),
    duration: "Tam gun",
    type: "2 farkli dalis noktasi",
    booking: "Otel transferli",
    included: [
      "Profesyonel ve lisansli egitmenler",
      "Gidis-donus transfer",
      "Ogle yemegi",
      "Ilk kez dalacaklara ozel egitim",
    ],
    stops: ["Fethiye Limani", "Fethiye Akvaryum Koyu", "Cevre dalis noktalari"],
    notes: ["Fotograf ve video cekimi ekstra ucretli olabilir."],
    gallery: [
      tourImage("fethiye-tuplu-dalis.jpg"),
      tourImage("fethiye-tuplu-dalis-2.jpg"),
    ],
  },
  {
    slug: "fethiye-12-adalar-tekne-turu",
    title: "Fethiye 12 Adalar Tekne Turu",
    category: "Tekne Turu",
    short:
      "Fethiye Korfezi'nin sakin koylari ve berrak adalari arasinda huzurlu tekne gunu.",
    description:
      "Fethiye 12 Adalar Tekne Turu, kalabaliktan uzak rahat ve huzurlu bir gun arayanlar icin idealdir. Fethiye Limani'ndan hareket eden tekne, gun boyunca korfezin en guzel koylarinda yuzme molalari verir.",
    image: tourImage("fethiye-12-adalar-tekne-turu.jpg"),
    duration: "Tam gun",
    type: "Grup tekne turu",
    booking: "Otel transferli",
    included: ["Transfer", "Acik bufe ogle yemegi", "Yuzme molalari"],
    stops: [
      "Yassica Adalari",
      "Tersane Adasi",
      "Akvaryum Koyu",
      "Fethiye Korfezi",
    ],
    gallery: [
      tourImage("fethiye-12-adalar-tekne-turu.jpg"),
      tourImage("fethiye-12-adalar-tekne-turu-2.jpg"),
      tourImage("fethiye-12-adalar-tekne-turu-3.jpg"),
      tourImage("fethiye-12-adalar-tekne-turu-4.jpg"),
      tourImage("fethiye-12-adalar-tekne-turu-5.jpg"),
    ],
  },
  {
    slug: "dalaman-rafting",
    title: "Dalaman Rafting Turu",
    category: "Adrenalin",
    short:
      "Dalaman Cayi'nda 12-16 km parkur, orta zorluk seviyesi ve yuksek heyecan.",
    description:
      "Dalaman Rafting Turu, doga ve adrenalini bir arada yasamak isteyenler icin essiz bir deneyim sunar. Profesyonel rehberler tarafindan guvenlik egitimi verilir, kask, can yelegi ve kurek ekipmanlari teslim edilir.",
    image: tourImage("dalaman-rafting.jpg"),
    duration: "Tam gun",
    type: "3-4 seviye rafting",
    booking: "Temel fiziksel yeterlilik onerilir",
    included: [
      "Transfer",
      "Guvenlik egitimi",
      "Rafting ekipmanlari",
      "Acik bufe ogle yemegi",
    ],
    stops: ["Dalaman Cayi", "12-16 km rafting parkuru", "Mola alani"],
    notes: ["Fotograf ve video cekimleri ekstra ucretlidir."],
    gallery: [
      tourImage("dalaman-rafting.jpg"),
      tourImage("dalaman-rafting-2.jpg"),
      tourImage("dalaman-rafting-3.jpg"),
    ],
  },
  {
    slug: "fethiye-at-turu",
    title: "Fethiye At Turu",
    category: "Doga",
    short:
      "Hisaronu bolgesinde orman yollari ve manzaralar esliginde rehberli at turu.",
    description:
      "Fethiye'nin dogal guzellikleri arasinda yapilan at turlari, dogayla ic ice keyifli bir surus deneyimi sunar. Deneyim gerekmez; tum katilimcilar tur oncesi kisa egitim alir ve profesyonel rehber esliginde tura katilir.",
    image: tourImage("fethiye-at-turu.jpg"),
    duration: "Program saatine gore",
    type: "Rehberli at turu",
    booking: "Deneyim gerekmez",
    included: [
      "Kisa egitim",
      "Profesyonel rehberlik",
      "Egitimli atlar",
      "Guvenli rota",
    ],
    stops: ["Hisaronu", "Orman yollari", "Tarihi alanlar", "Manzara noktalari"],
    gallery: [
      tourImage("fethiye-at-turu.jpg"),
      tourImage("fethiye-at-turu-2.webp"),
      tourImage("fethiye-at-turu-3.jpg"),
    ],
  },
  {
    slug: "fethiye-aquapark",
    title: "Fethiye Aquapark Turu",
    category: "Aile",
    short:
      "Cocuklar, aileler ve arkadas gruplari icin transferli su parki eglencesi.",
    description:
      "Fethiye aquapark turu; su kaydiraklari, dalga havuzu, cocuk oyun alanlari ve dinlenme bolumleriyle yazin en serin aktivitelerinden biridir. Oludeniz, Hisaronu, Ovacik ve Fethiye bolgelerinden transfer hizmetiyle gununuz kolayca planlanir.",
    image: tourImage("fethiye-aquapark.jpg"),
    duration: "Tam gun",
    type: "Su parki",
    booking: "Erken bilgi almaniz onerilir",
    included: [
      "Gidis-donus transfer",
      "Aquapark kullanimi",
      "Profesyonel organizasyon",
    ],
    stops: [
      "Su kaydiraklari",
      "Dalga havuzu",
      "Cocuk oyun alanlari",
      "Dinlenme alanlari",
    ],
    gallery: [
      tourImage("fethiye-aquapark.jpg"),
      tourImage("fethiye-aquapark-2.png"),
      tourImage("fethiye-aquapark-3.jpg"),
      tourImage("fethiye-aquapark-4.jpg"),
    ],
  },
  {
    slug: "saklikent-tlos-yakapark",
    title: "Saklıkent - Tlos - Yakapark",
    category: "Kultur & Doga",
    short:
      "Kokartli rehberle Tlos Antik Kenti, Yakapark, Gizlikent ve Saklikent programi.",
    description:
      "Bu gunluk turda klimali araclar ve kokartli rehber esliginde Likya'nin onemli noktalarini gezersiniz. Tlos Antik Kenti'nde tarih anlatimi, Yakapark'ta dogayla ic ice mola ve Saklikent Vadisi'nde serbest zaman programin ana parcalaridir.",
    image: tourImage("saklikent-tlos-yakapark.jpg"),
    duration: "Tam gun",
    type: "Otobus turu",
    booking: "Otel transferli",
    included: ["Rehberlik hizmeti", "Ulasim", "Acik bufe ogle yemegi"],
    stops: [
      "Tlos Antik Kenti",
      "Yakapark",
      "Gizlikent Selalesi",
      "Saklikent Vadisi",
    ],
    notes: ["Saklikent suyu guclu ve soguk akabilir; uygun ayakkabi onerilir."],
    gallery: [
      tourImage("saklikent-tlos-yakapark.jpg"),
      tourImage("saklikent-tlos-yakapark-2.jpg"),
      tourImage("saklikent-tlos-yakapark-3.jpg"),
    ],
  },
  {
    slug: "pamukkale-hierapolis",
    title: "Pamukkale - Hierapolis",
    category: "Kultur",
    short:
      "Pamukkale travertenleri, Hierapolis Antik Kenti ve Kleopatra Havuzu ziyareti.",
    description:
      "Pamukkale ve Hierapolis, ulkemizin mutlaka gorulmesi gereken en ozel bolgelerindendir. Fethiye'den erken saatlerde hareket eden turda lisansli rehber gun boyu eslik eder; travertenler, UNESCO korumasindaki Hierapolis ve Kleopatra Havuzu ziyaret edilir.",
    image: tourImage("pamukkale-hierapolis.webp"),
    duration: "Uzun tam gun",
    type: "Kultur turu",
    booking: "Uygunluk icin WhatsApp",
    included: [
      "Rehberlik hizmeti",
      "Ulasim",
      "Kahvalti",
      "Acik bufe ogle yemegi",
    ],
    stops: [
      "Pamukkale travertenleri",
      "Hierapolis",
      "Antik tiyatro",
      "Apollon Tapinagi",
      "Kleopatra Havuzu",
    ],
    gallery: [
      tourImage("pamukkale-hierapolis.webp"),
      tourImage("pamukkale-hierapolis-2.jpg"),
      tourImage("pamukkale-hierapolis-3.jpg"),
    ],
  },
  {
    slug: "ozel-surat-teknesi",
    title: "Özel Sürat Teknesi Kiralama",
    category: "Ozel Tur",
    short:
      "Size ozel kaptanla Oludeniz koylari ve adalari arasinda esnek rota secenekleri.",
    description:
      "Kiralayacaginiz surat teknesiyle deniz uzerinde size ozel bir gun gecirebilir, bolgenin muhtesem koylarini ve adalarini kesfedebilirsiniz. Size tahsis edilen kaptan bolgeye hakimdir ve rota planlamasinda destek olur.",
    image: tourImage("fethiye-12-adalar-tekne-turu-2.jpg"),
    duration: "Rota secimine gore",
    type: "Ozel tekne",
    booking: "3 farkli rota secenegi",
    included: ["Ozel kaptan", "Rota danismanligi", "Size ozel tekne kullanimi"],
    stops: [
      "Rota 1: Kelebekler Vadisi, Mavi Magara",
      "Rota 2: St. Nicholas Adasi, Soguk Su, Deve Plaji, Akvaryum",
      "Rota 3: Ekstra ucretle tam tur",
    ],
    gallery: [
      tourImage("fethiye-12-adalar-tekne-turu-2.jpg"),
      tourImage("fethiye-12-adalar-tekne-turu-3.jpg"),
      tourImage("fethiye-12-adalar-tekne-turu-4.jpg"),
    ],
  },
  {
    slug: "gun-batimi-tekne-turu",
    title: "Gün Batımı Tekne Turu",
    category: "Aksam Turu",
    short:
      "Oludeniz'de Deve Plaji yuzme molasi ve St. Nicholas Adasi aciklarinda gun batimi.",
    description:
      "Oludeniz'in en guzel saatlerinde, denizin ortasinda essiz gun batimi manzarasi esliginde sakin ve keyifli bir aksam deneyimi sunar. Tur boyunca yuzme molasi verilir, gun batimi izlenir ve aksam yemegiyle keyif tamamlanir.",
    image: tourImage("gun-batimi-tekne-turu.jpg"),
    duration: "18:00 - 22:00 civari",
    type: "Aksam tekne turu",
    booking: "Aksam yemegi dahil",
    included: ["Tekne turu", "Aksam yemegi", "Yuzme molasi"],
    stops: ["Deve Plaji", "St. Nicholas Adasi aciklari", "Gun batimi noktasi"],
    gallery: [
      tourImage("gun-batimi-tekne-turu.jpg"),
      tourImage("gun-batimi-tekne-turu-2.webp"),
    ],
  },
  {
    slug: "rodos-turu",
    title: "Rodos Turu",
    category: "Yurt Disi",
    short:
      "Fethiye'den feribotla Rodos'a gunubirlik kesif ve serbest gezi firsati.",
    description:
      "Rodos; tarihi alanlari, plajlari, manzaralari, kafeleri, restoranlari ve sovalyeler doneminden izler tasiyan sokaklariyla gunubirlik kesif icin ideal bir Yunan adasidir. Fethiye'den sabah feribotla hareket edilir ve ayni gun donus yapilir.",
    image: tourImage("rodos-turu.webp"),
    duration: "09:00 gidis | 16:00 donus",
    type: "Gunubirlik feribot turu",
    booking: "Schengen vizesi gereklidir",
    included: ["Transfer", "Gidis-donus feribot seyahati", "Seyahat sigortasi"],
    stops: [
      "Rodos Eski Sehir",
      "Plajlar",
      "Kafe ve restoran bolgeleri",
      "Hediyelik esya sokaklari",
    ],
    gallery: [
      tourImage("rodos-turu.webp"),
      tourImage("rodos-turu-2.jpg"),
      tourImage("rodos-turu-3.png"),
    ],
  },
  {
    slug: "kopuk-partili-korsan-tekne",
    title: "Köpük Partili Korsan Tekne Turu",
    category: "Eglence",
    short:
      "Oludeniz 6 adalar rotasinda muzik, kopuk partisi, ogle yemegi ve transfer dahil.",
    description:
      "Oludeniz Kelebekler Vadisi rotasinda muzik, eglence ve kopuk partisiyle dolu hareketli bir gun yasarsiniz. Maviliklerin tadini cikarmak ve Fethiye'de unutulmaz bir gun gecirmek isteyenler icin enerjisi yuksek bir tekne turudur.",
    image: tourImage("kopuk-partili-korsan-tekne.jpg"),
    duration: "Tam gun",
    type: "Korsan tekne",
    booking: "Transfer dahil",
    included: [
      "Ogle yemegi",
      "Transfer",
      "Teknede muzik ve eglence",
      "Kopuk partisi",
    ],
    stops: [
      "Kelebekler Vadisi",
      "Soguk Su Koyu",
      "St. Nicholas (Gemiler) Adasi",
      "Mavi Magara",
      "Akvaryum Koyu",
      "Deve Plaji",
    ],
    gallery: [
      tourImage("kopuk-partili-korsan-tekne.jpg"),
      tourImage("kopuk-partili-korsan-tekne-2.jpg"),
      tourImage("kopuk-partili-korsan-tekne-3.png"),
      tourImage("kopuk-partili-korsan-tekne-4.webp"),
    ],
  },
];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
