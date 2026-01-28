export interface TarotCardContent {
    keywords: string[];
    intros: string[];
    cores: string[];
    outros: string[];
    affirmations: string[];
    suggestions: string[];
}

export const TAROT_CONTENT: Record<string, TarotCardContent> = {
    "The Fool": {
        keywords: ["Yeni Başlangıç", "Macera", "Spontanlık", "Masumiyet", "Potansiyel"],
        intros: [
            "Evrenin sana şu anki mesajı çok net: Önünde bembeyaz bir sayfa açılıyor.",
            "Kartlar, hayatındaki bir döngünün tamamlandığını ve yepyeni bir maceranın eşiğinde olduğunu fısıldıyor.",
            "Deli kartı, mantığın ötesine geçip kalbinin götürdüğü yere gitmen için bir çağrı niteliğinde.",
            "Şu anda belirsizlik hakim olabilir, ancak bu belirsizlik sonsuz potansiyel taşıyor.",
            "Kozmik enerjiler seni çocuksu bir merakla dünyaya bakmaya davet ediyor."
        ],
        cores: [
            "İçindeki korkuları bir kenara bırakıp bilinmeze adım atmanın tam zamanı. Mantıklı planlar yapmak yerine içgüdülerine güvenmelisin.",
            "Sanki uçurumun kenarındasın ama düşmeyecek, uçacaksın. Risk almak şu an senin için en büyük ödülleri getirecek eylem.",
            "Eski yüklerini, önyargılarını ve 'yapamam' dediğin her şeyi geride bırak. Ruhun hafifledikçe yolun netleşecek.",
            "Hayat sana sürpriz bir fırsat sunuyor. Bu fırsatı değerlendirirken 'ne derler' diye düşünme, sadece kendi heyecanına odaklan.",
            "Plansızlık bazen en iyi plandır. Akışa teslim olduğunda, evren seni gitmen gereken yere en zahmetsiz şekilde taşıyacak."
        ],
        outros: [
            "Yolculuğun keyfini çıkar, varış noktası şu an önemli değil.",
            "Cesur ol, çünkü şans şu an cesurlardan yana.",
            "Bu yeni dönemde kendine güven ve ilk adımı atmaktan korkma.",
            "Gözlerini kapat ve ruhunun seni özgürlüğe götürmesine izin ver.",
            "Unutma, her büyük hikaye küçük ve cesur bir adımla başlar."
        ],
        affirmations: [
            "Yeni başlangıçlara korkusuzca açığım.",
            "Evrenin beni desteklediğini biliyor ve güveniyorum.",
            "Hayatın sürprizlerini neşeyle kucaklıyorum.",
            "Özgürüm, hafifim ve kendi yolumdayım.",
            "Bilinmeze adım atmak benim için güvenli."
        ],
        suggestions: [
            "Bugün daha önce hiç yapmadığın küçük, spontane bir şey yap.",
            "Kendini kısıtladığın bir kuralı esnet veya yık.",
            "Doğada kısa bir yürüyüşe çık ve rotanı planlama.",
            "Seni heyecanlandıran ama korkutan o adımı atmak için niyet et.",
            "Çocuksu bir neşeyle sevdiğin bir şarkıda dans et."
        ]
    },
    "The Magician": {
        keywords: ["Yetenek", "Manifestasyon", "İrade", "Güç", "Eylem"],
        intros: [
            "Büyücü kartı, sahip olduğun gücün farkına varman için karşında belirdi.",
            "Şu an ellerinde sandığından çok daha büyük bir yaratım gücü var.",
            "Evren, niyetlerini gerçeğe dönüştürmen için sana tüm kaynakları sunuyor.",
            "Hayatının mimarı olduğunu hatırlaman gereken güçlü bir andasın.",
            "Gökyüzü ve yeryüzü arasındaki köprü sensin; enerjiyi maddeye dönüştürme zamanı."
        ],
        cores: [
            "Düşüncelerini, sözlerini ve eylemlerini hizaladığında başaramayacağın hiçbir şey yok. Yeteneklerine güven.",
            "Masadaki tüm elementler senin emrinde. Sadece ne istediğine karar ver ve odaklanmış bir iradeyle harekete geç.",
            "Bu dönemde 'nasıl olacak' diye düşünme, sadece 'olduğunu' bil. Zihinsel netliğin, gerçekliğinin temelini atıyor.",
            "Yaratıcılığın zirvede. İçindeki o parlak fikri artık somut bir projeye veya adıma dönüştürme vakti geldi.",
            "Kendi gerçekliğini yaratma gücüne sahipsin. Dış koşullar ne olursa olsun, senin içsel iraden her şeyi değiştirebilir."
        ],
        outros: [
            "Sihir parmaklarının ucunda, onu kullan.",
            "Potansiyelini eyleme dök ve mucizeleri izle.",
            "Sen bu hayatın başrolüsün, senaryoyu istediğin gibi yaz.",
            "Odaklan, inan ve gerçekleştir.",
            "Güç senin içinde, sadece onu serbest bırakman gerekiyor."
        ],
        affirmations: [
            "Hayallerimi gerçeğe dönüştürme gücüne sahibim.",
            "İradem çelik gibi sağlam ve odağım net.",
            "Evrenin yaratıcı enerjisi benim üzerimden akıyor.",
            "İhtiyacım olan tüm kaynaklar şu an elimde.",
            "Ben hayatımın güçlü bir yaratıcısıyım."
        ],
        suggestions: [
            "Gerçekleştirmek istediğin hedefini kağıda net bir şekilde yaz.",
            "Bugün yeteneklerini sergileyebileceğin bir fırsat yarat.",
            "Ertelediğin o projeye başlamak için ilk adımı hemen at.",
            "Kendine olan güvenini artıracak bir olumlama çalışması yap.",
            "Çalışma alanını düzenle ve enerjini odakla."
        ]
    },
    "The High Priestess": {
        keywords: ["Sezgi", "Gizem", "Bilinçaltı", "Rüyalar", "Bilgelik"],
        intros: [
            "Azize, sessizliğin içindeki derin bilgeliği duyman için seni perde arkasına davet ediyor.",
            "Şu an mantığın değil, sezgilerinin rehberliğine güvenmen gereken bir dönemdesin.",
            "Görünenin ötesinde, derinlerde saklı bir gerçek var ve ruhun bunu zaten biliyor.",
            "Ayın gizemli ışığı altında, iç sesin sana önemli sırlar fısıldamak istiyor.",
            "Dış dünyadaki gürültüyü kıs ve kendi iç dünyandaki o kadim sese kulak ver."
        ],
        cores: [
            "Cevapları dışarıda arama, onlar zaten senin içinde. Rüyalarına ve ani gelen hislerine dikkat et.",
            "Bazen hiçbir şey yapmamak, en büyük eylemdir. Bekle, gözlemle ve doğru zamanın gelmesini (sezgilerinle) hisset.",
            "Bilinçaltın şu an çok aktif. Bastırdığın duygular veya görmezden geldiğin gerçekler yüzeye çıkabilir, onları kucakla.",
            "Gizemli bir çekim gücün var. İnsanları veya olayları zorlamak yerine, onların sana doğru akmasına izin ver.",
            "Mantığın çözemediği düğümleri, kalbinin sezgisel bilgeliği çözecek. İçindeki o dişil, alıcı enerjiye güven."
        ],
        outros: [
            "Sır perdesi aralanıyor, sadece bakmayı bil.",
            "İçindeki bilge kadının sesine güven.",
            "Sessizlikte saklı olan cevapları bulacaksın.",
            "Ruhunun derinliklerine inmekten korkma.",
            "Sezgilerin senin en güçlü pusulandır."
        ],
        affirmations: [
            "İç sesime ve sezgilerime derinden güveniyorum.",
            "Bilinmeyenle barışığım ve evrenin akışına teslimim.",
            "Cevapların bana doğru zamanda geleceğini biliyorum.",
            "Rüyalarımın bilgeliğine açığım.",
            "İç dünyam zengin, derin ve huzurlu."
        ],
        suggestions: [
            "Rüyalarını not edeceðin bir rüya günlüğü tutmaya başla.",
            "Bugün meditasyon yaparak zihnini sustur.",
            "Karar verirken mantığını değil, karnındaki hissi dinle.",
            "Dolunay veya ay döngüleri ile ilgili bir ritüel yap.",
            "Gizemli veya spiritüel bir konuda okuma yap."
        ]
    },
    "The Empress": {
        keywords: ["Bolluk", "Doğurganlık", "Güzellik", "Doğa", "Yaratım"],
        intros: [
            "İmparatoriçe, hayatına bereket ve güzellik getirmek için kapını çalıyor.",
            "Şu an dişil enerjinin, yaratıcılığın ve doğurganlığın zirvesindesin.",
            "Doğanın cömertliği seninle. Tohum ektiğin her şeyin yeşerip büyüyeceği bir zamandasın.",
            "Kendini şımartman, beslemen ve büyütmen gereken bir dönem başlıyor.",
            "Bu kart, hayatın tadını çıkarman ve duyularını harekete geçirmen için bir davet."
        ],
        cores: [
            "Bolluk bilincini kucakla. Sadece maddi değil, sevgi, fikir ve ilham konusunda da bereketi hayatına çekiyorsun.",
            "Yaratıcı projelerin için harika bir zaman. İçindeki sanatçıyı veya anneyi (projelerine annelik eden yönünü) serbest bırak.",
            "Doğayla temas et. Topraklanmak ve doğanın ritmine uyum sağlamak, enerjini katbekat artıracak.",
            "Kendine şefkat göster. Bedenine iyi bak, güzel şeyler ye, güzel kokular sür. Sen bir tapınaksın.",
            "Etrafındaki güzellikleri fark et ve çoğalt. Sevgi verdiğin her şey büyüyecek ve sana, çoğalarak geri dönecek."
        ],
        outros: [
            "Hayat sana cömert davranıyor, tadını çıkar.",
            "Güzellik ve bereket senin doğal hakkın.",
            "Yaratıcılığının çiçek açmasına izin ver.",
            "Sevgiyle beslediğin her şey meyve verecek.",
            "Kendini sev, çünkü sen bolluğun kaynağısın."
        ],
        affirmations: [
            "Hayatımın her alanında bolluğu ve bereketi kabul ediyorum.",
            "Yaratıcılığım sınırsız ve özgürce akıyor.",
            "Bedenimi ve ruhumu sevgiyle besliyorum.",
            "Doğanın iyileştirici gücüyle birim.",
            "Güzelliği görüyor ve yaratıyorum."
        ],
        suggestions: [
            "Kendine çiçek al veya bir bitki ek.",
            "Doğada uzun bir yürüyüş yap ve toprağa dokun.",
            "Yaratıcı bir hobiyle (resim, yazı, yemek) ilgilen.",
            "Bugün kendine lüks bir bakım veya keyif anı ayır.",
            "Bolluk bilinci üzerine bir meditasyon yap."
        ]
    },
    // ... (Diğer kartlar için de benzer yapı devam edecek, aşağıda örneklemeye devam ediyorum)
    "The Emperor": {
        keywords: ["Otorite", "Yapı", "Liderlik", "Disiplin", "Baba Figürü"],
        intros: [
            "İmparator kartı, hayatına düzen ve yapı getirmen gerektiğini işaret ediyor.",
            "Şu an kararlı, mantıklı ve otoriter bir duruş sergileme zamanı.",
            "Hedeflerine ulaşmak için disiplin ve strateji en büyük müttefikin olacak.",
            "Liderlik vasıflarını ortaya koyman gereken bir durumla karşılaşabilirsin.",
            "Kaosun içinden bir düzen yaratma gücüne sahipsin."
        ],
        cores: [
            "Duygusal tepkiler yerine mantıklı ve stratejik kararlar almalısın. Sınırlarını net bir şekilde çiz.",
            "Projelerini sağlam temeller üzerine inşa et. Geçici çözümler değil, kalıcı ve yapısal adımlar atman gerekiyor.",
            "Kendi hayatının patronu ol. Gücünü eline al ve başkalarının seni yönetmesine izin verme.",
            "Baba figürüyle ilgili konular gündeme gelebilir veya içindeki eril koruyucu enerjiyi aktive etmen gerekebilir.",
            "Disiplin özgürlüktür. Kendine koyduğun kurallar seni hedefine daha hızlı ulaştıracak."
        ],
        outros: [
            "Güçlü dur, kontrol sende.",
            "Mantığın sesi sana en doğru yolu gösterecek.",
            "İnşa ettiğin yapı sağlam ve kalıcı olacak.",
            "Liderliğini sevgiyle ama kararlılıkla yap.",
            "Düzen, başarının anahtarıdır."
        ],
        affirmations: [
            "Hayatımın kontrolü ve sorumluluğu bende.",
            "Sınırlarımı net ve sağlıklı bir şekilde çizerim.",
            "Hedeflerime disiplin ve kararlılıkla ilerliyorum.",
            "Kendi imparatorluğumu güvenle inşa ediyorum.",
            "Liderlik gücümü bilgelikle kullanıyorum."
        ],
        suggestions: [
            "Günlük veya haftalık planını net bir şekilde yap.",
            "Hayır demen gereken bir duruma net bir 'Hayır' de.",
            "Finansal veya kariyer hedeflerini gözden geçir ve somut adımlar belirle.",
            "Otorite figürü olarak gördüğün biriyle (veya babanla) ilişkini şifalandır.",
            "Fiziksel gücünü hissedeceğin bir egzersiz yap."
        ]
    },
    "The Hierophant": {
        keywords: ["Gelenek", "Öğrenme", "Maneviyat", "Rehberlik", "İnanç"],
        intros: [
            "Aziz kartı, kadim bilgelik ve geleneksel yolların önemini hatırlatıyor.",
            "Bir rehberden, öğretmenden veya kurumdan destek alman gereken bir dönem olabilir.",
            "Ruhsal gelişimine odaklanman ve inançlarını sorgulaman için bir çağrı var.",
            "Toplumsal değerler ve ait olduğun gruplarla olan ilişkin ön planda.",
            "Bilgiyi öğrenmek ve onu başkalarına aktarmak senin misyonun olabilir."
        ],
        cores: [
            "Macera aramak yerine denenmiş ve güvenilir yolları tercih etmek şu an daha doğru olabilir.",
            "Bir kursa başlamak, bir mentordan fikir almak veya manevi bir topluluğa katılmak sana iyi gelecek.",
            "Kendi inanç sistemini oluştururken köklerinden ve geleneklerinden de güç al.",
            "Başkalarına rehberlik etme potansiyelin yüksek. Bildiklerini paylaşmaktan çekinme.",
            "Kurallara uymak bazen kısıtlayıcı değil, güven verici olabilir. Yapının içindeki huzuru bul."
        ],
        outros: [
            "Bilgelik paylaştıkça çoğalır.",
            "Doğru yol, kalbinin inandığı yoldur.",
            "Öğrenmeye ve öğretmeye açık ol.",
            "Geleneklerin gücünü arkana al.",
            "Maneviyatın sana ışık tutsun."
        ],
        affirmations: [
            "Evrensel bilgeliğe ve rehberliğe açığım.",
            "Öğreniyor, büyüyor ve bilgimi paylaşıyorum.",
            "İnançlarım bana güç ve huzur veriyor.",
            "Doğru yoldayım ve destekleniyorum.",
            "Geleneksel değerlere saygı duyuyorum."
        ],
        suggestions: [
            "İlgi duyduğun bir konuda araştırma yap veya bir kitaba başla.",
            "Saygı duyduğun birinden tavsiye iste.",
            "Manevi bir ritüel veya dua ile gününe başla.",
            "Bir grup çalışmasına veya topluluk etkinliğine katıl.",
            "Kendi inançlarını ve değerlerini yazarak netleştir."
        ]
    },
    "The Lovers": {
        keywords: ["Aşk", "Uyum", "Seçim", "Değerler", "Birlik"],
        intros: [
            "Aşıklar kartı, hayatına sevgi, uyum ve önemli bir seçimi getiriyor.",
            "Kalbinin sesini dinlemen gereken, tutkulu ve yoğun bir dönemdesin.",
            "İkili ilişkilerde dengeyi bulmak ve bağlarını güçlendirmek için harika bir zaman.",
            "Bir yol ayrımındasın ve yapacağın seçim kalbinle hizalı olmalı.",
            "Kendini ve diğerlerini olduğu gibi sevme sanatını öğreniyorsun."
        ],
        cores: [
            "Sadece romantik değil, hayatındaki tüm ilişkilerde uyumu ve birliği ara. Zıtlıkların birleşimi sana güç verecek.",
            "Bir karar verirken sadece mantığını değil, değerlerini ve neyin sana 'doğru' hissettirdiğini de hesaba kat.",
            "Kendinle olan ilişkin nasılsa, başkalarıyla olan ilişkin de öyledir. Önce kendine aşık ol.",
            "Tutku seni harekete geçiren yakıttır. Seni heyecanlandıran şeyi seç.",
            "Birleşmek, bütünleşmek ve 'biz' olabilmek bu dönemin ana teması. Egoyu bir kenara bırak."
        ],
        outros: [
            "Sevgi her kapıyı açan anahtardır.",
            "Kalbinin rehberliğinde yaptığın seçim doğru seçimdir.",
            "Uyum ve denge hayatına akıyor.",
            "Sen sevgisin ve sevgiyi hak ediyorsun.",
            "Birliğin gücünü hisset."
        ],
        affirmations: [
            "Hayatıma sevgiyi ve uyumu çekiyorum.",
            "Kalbimle uyumlu, doğru seçimler yapıyorum.",
            "İlişkilerim sevgi, saygı ve güven dolu.",
            "Kendimi olduğum gibi seviyor ve kabul ediyorum.",
            "Tutkularımın peşinden gitmeye cesaretim var."
        ],
        suggestions: [
            "Sevdiğin birine (veya kendine) sürpriz bir jest yap.",
            "İlişkindeki iletişim dilini gözden geçir ve sevgiyle konuş.",
            "Kararsız kaldığın bir konuda kalbinin ne dediğini dinle.",
            "Ayna karşısında kendine 'Seni seviyorum' de.",
            "İkilemleri değil, birleştirici çözümleri odak noktana al."
        ]
    },
    "The Chariot": {
        keywords: ["Zafer", "İlerleme", "Kontrol", "İrade", "Kararlılık"],
        intros: [
            "Savaş Arabası, zaferin senin olduğunu ve hızla ilerlemen gerektiğini müjdeliyor.",
            "Kontrolü eline alma ve hedefe doğru kararlılıkla gitme zamanı.",
            "Zıtlıkları bir arada tutarak ve odaklanarak büyük bir başarı elde edebilirsin.",
            "Yolculuk başladı, dizginleri sıkı tut ve rotandan sapma.",
            "Engel tanımayan bir enerjiyle dolusun, bu gücü akıllıca kullan."
        ],
        cores: [
            "Başarı tesadüf değildir, odaklanmış iradenin sonucudur. Gözünü hedeften ayırma.",
            "Duygularınla mantığını, kalbinle aklını aynı yöne koşan atlar gibi senkronize etmelisin.",
            "Engeller çıkabilir ama sen onları aşacak güce ve hıza sahipsin. Pes etme, üstüne git.",
            "Harekete geçmek için bekleme. Şu an momentum senden yana, bu rüzgarı arkana al.",
            "Zafer senin, ancak egonu kontrol altında tutmalı ve alçakgönüllü olmalısın."
        ],
        outros: [
            "İleri git, durma. Zafer seni bekliyor.",
            "Dizginler senin elinde, yönünü sen belirle.",
            "Kararlılığın sana başarıyı getirecek.",
            "Engeller sadece seni güçlendirmek için orada.",
            "Yolun açık, hızın daim olsun."
        ],
        affirmations: [
            "Hedeflerime odaklanıyor ve kararlılıkla ilerliyorum.",
            "Hayatımın kontrolü tamamen bende.",
            "Her türlü engeli aşacak güce sahibim.",
            "Başarı benim doğal hakkım ve ona doğru gidiyorum.",
            "Zıtlıkları dengeliyor ve yönetiyorum."
        ],
        suggestions: [
            "Ertlediğin bir yola çık veya seyahat planı yap.",
            "Hedefine giden yoldaki en büyük engeli belirle ve onu aşmak için bir plan yap.",
            "Bugün rekabetçi bir aktiviteye katıl veya spor yap.",
            "Araba kullanıyorsan, direksiyon başındayken kontrolü hisset.",
            "Kendini motive edecek güçlü bir müzik listesi hazırla."
        ]
    },
    "Strength": {
        keywords: ["Cesaret", "Şefkat", "İçsel Güç", "Sabır", "Ehlileştirme"],
        intros: [
            "Güç kartı, kaba kuvvetin değil, şefkatli ve sabırlı gücün zaferini simgeler.",
            "İçindeki aslanla barışman ve onu sevgiyle yönetmen gereken bir dönemdesin.",
            "Zorlukların üstesinden gelmek için ihtiyacın olan cesaret zaten kalbinde mevcut.",
            "Yumuşaklık, sertlikten daha güçlüdür. Nezaketle her kapıyı açabilirsin.",
            "Ruhsal dayanıklılığının test edildiği ve onaylandığı bir zamandasın."
        ],
        cores: [
            "Korkularının üzerine sevgiyle git. Onlarla savaşmak yerine onları anlayıp dönüştürürsen özgürleşirsin.",
            "Sabır en büyük erdemdir. Ani tepkiler vermek yerine derinden bir nefes al ve içindeki dinginliği koru.",
            "Kendine güven. Başkalarını kontrol etmeye çalışma, sadece kendi iç dünyanı yönet.",
            "Şifacı bir gücün var. Hem kendini hem de çevreni sevginin gücüyle iyileştirebilirsin.",
            "Zor bir durum karşısında sakin kalabilmek, gerçek gücün göstergesidir. Fırtınanın ortasındaki sessiz merkez ol."
        ],
        outros: [
            "Sevgi en büyük güçtür.",
            "İçindeki cesur yüreğe güven.",
            "Nezaketle dünyayı değiştirebilirsin.",
            "Sabrın sonu selamet ve zaferdir.",
            "Sen sandığından çok daha güçlüsün."
        ],
        affirmations: [
            "İçimdeki gücü sevgi ve şefkatle yönetiyorum.",
            "Korkularımı cesarete dönüştürüyorum.",
            "Sabırlıyım, sakinim ve dengedeyim.",
            "Nezaketim benim en büyük silahımdır.",
            "Her zorluğun üstesinden gelebilecek yüreğe sahibim."
        ],
        suggestions: [
            "Seni korkutan bir şeyin üzerine git (küçük bir adım olsa bile).",
            "Sinirlendiğin bir anda durup derin nefes al ve yumuşak tepki ver.",
            "Kendine şefkat gösterdiğin bir gün geçir.",
            "Hayvanlarla vakit geçir veya onlara yardım et.",
            "Meditasyon yaparak içsel merkezini güçlendir."
        ]
    },
    "The Hermit": {
        keywords: ["İçedönüş", "Yalnızlık", "Rehberlik", "Bilgelik", "Arama"],
        intros: [
            "Ermiş, dış dünyadan biraz uzaklaşıp kendi içine dönmen için fenerini yakıyor.",
            "Cevapları kalabalıkta değil, yalnızlığın sessizliğinde bulacağın bir zaman.",
            "Kendi yolunu aydınlatmak için bir süreliğine inzivaya çekilmen gerekebilir.",
            "Ruhsal bir arayış içindesin ve bu yolculukta en iyi rehber yine sensin.",
            "Bilgelik, deneyimlerin sessizce sindirilmesiyle gelir."
        ],
        cores: [
            "Başkalarının ne dediğini değil, iç sesinin ne fısıldadığını dinle. Kendi gerçeğini bul.",
            "Yalnızlık korkulacak bir şey değil, kendini bulmak için bir fırsattır. Bu dönemi verimli kullan.",
            "Geçmiş deneyimlerini gözden geçir ve onlardan ders çıkar. Bilgelik böyle kazanılır.",
            "Acelen yok. Adımlarını yavaşlat, düşünerek ve hissederek yürü.",
            "Senin ışığın başkalarına da yol gösterecek, ama önce kendi önünü görmelisin."
        ],
        outros: [
            "Kendi ışığın sana yeter.",
            "Sessizlikte hakikati bulacaksın.",
            "Yolun açık, rehberin kalbin olsun.",
            "Bilgelik sabırla gelir.",
            "İçine dön ve hazineni keşfet."
        ],
        affirmations: [
            "Kendi iç sesime ve rehberliğime güveniyorum.",
            "Yalnızlığımda huzur ve bilgelik buluyorum.",
            "Cevaplar içimde mevcut, onlara ulaşıyorum.",
            "Kendi yolumu kendi ışığımla aydınlatıyorum.",
            "Sakinlik ve dinginlik içindeyim."
        ],
        suggestions: [
            "Tek başına sessiz bir yürüyüşe çık.",
            "Sosyal medyadan veya telefonundan bir süre uzaklaş.",
            "Meditasyon veya günlük tutma pratiği yap.",
            "Uzun zamandır düşündüğün o sorunun cevabını içinde ara.",
            "Sessiz bir ortamda kitap oku veya sadece düşün."
        ]
    },
    "Wheel of Fortune": {
        keywords: ["Şans", "Değişim", "Kader", "Döngüler", "Dönüm Noktası"],
        intros: [
            "Kader Çarkı dönüyor ve hayatında büyük bir değişim rüzgarı esiyor.",
            "Şans senden yana! Evren sürpriz bir fırsatı önüne çıkarmak üzere.",
            "Hayatın inişli çıkışlı doğasını kabul et ve değişime direnme, akışa uy.",
            "Bir dönüm noktasındasın. Artık hiçbir şey eskisi gibi olmayacak (iyi anlamda).",
            "Karmik döngüler tamamlanıyor, yeni ve taze bir sayfa açılıyor."
        ],
        cores: [
            "Kontrol edemediğin güçler devrede. Direksiyonu biraz da evrene bırak ve yolculuğun tadını çıkar.",
            "Bugün şanslı günündesin. Beklenmedik tesadüflere ve karşılaşmalara dikkat et.",
            "Her şey değişir, bu evrenin tek kuralıdır. Bu değişimi kucakla, seni daha iyi bir yere taşıyacak.",
            "Dibe vurduğunu düşünüyorsan sevin, çünkü çark yukarı dönmeye başlıyor.",
            "Geçmişte ektiklerini biçme zamanı. Pozitif enerjin sana pozitif olaylar olarak geri dönüyor."
        ],
        outros: [
            "Çark senin lehine dönüyor.",
            "Değişim kaçınılmaz, güzellikleri kucakla.",
            "Şans kapını çalıyor, açmaya hazır ol.",
            "Akışa güven, her şey olması gerektiği gibi.",
            "Yeni döngün kutlu olsun."
        ],
        affirmations: [
            "Hayatımdaki değişimleri sevgiyle kabul ediyorum.",
            "Şanslıyım ve evrenin desteğini hissediyorum.",
            "Her şey benim en yüksek hayrıma gelişiyor.",
            "Döngülerin bilgeliğine güveniyorum.",
            "Sürprizlere ve mucizelere açığım."
        ],
        suggestions: [
            "Bugün şans oyunu oyna veya bir çekilişe katıl (sembolik olarak).",
            "Değiştirmek istediğin bir alışkanlığın için adım at.",
            "Akışa bırakman gereken bir konuyu belirle ve kontrolü sal.",
            "Tesadüf gibi görünen olaylardaki mesajları oku.",
            "Değişime 'evet' de."
        ]
    },
    "Justice": {
        keywords: ["Adalet", "Denge", "Gerçek", "Karma", "Sorumluluk"],
        intros: [
            "Adalet kartı, hayatına denge ve hakkaniyetin geleceğini müjdeliyor.",
            "Ne ektiysen onu biçeceğin, karmik hesaplaşmaların olduğu bir dönem.",
            "Gerçekler ortaya çıkıyor. Dürüstlük en büyük koruyucun olacak.",
            "Karar verirken tarafsız, mantıklı ve adil olman gerekiyor.",
            "Hukuki veya resmi bir konuda beklediğin sonuç senin lehine gelişebilir."
        ],
        cores: [
            "Hayatındaki dengesizlikleri gözden geçir. Neye çok, neye az veriyorsun? Teraziyi dengeleme vakti.",
            "Sorumluluk almaktan kaçma. Kendi eylemlerinin sonuçlarını kabul ettiğinde özgürleşirsin.",
            "Dürüst ol, kendine bile. Gerçekten kaçamazsın, onunla yüzleş ve rahatla.",
            "Bir haksızlığa uğradıysan, evrenin adalet mekanizmasının çalıştığını bil. İlahi adalet yerini bulacak.",
            "Net ve objektif bir zihinle karar ver. Duyguların seni yanıltmasına izin verme."
        ],
        outros: [
            "Adalet yerini bulacak, gönlün ferah olsun.",
            "Denge hayatının anahtarıdır.",
            "Gerçek seni özgür kılacak.",
            "Karma işliyor, iyilikten şaşma.",
            "Dürüstlük en sağlam temeldir."
        ],
        affirmations: [
            "Hayatımda denge ve uyumu yaratıyorum.",
            "Eylemlerimin sorumluluğunu alıyorum.",
            "Evrensel adalete güveniyorum.",
            "Her zaman dürüst ve adil davranıyorum.",
            "Hakkım olan bana kolaylıkla geliyor."
        ],
        suggestions: [
            "Hayatındaki artı ve eksilerin listesini yapıp denge kur.",
            "Ertelediğin bir özür varsa dile veya birini affet.",
            "Resmi işlerini veya kağıt işlerini düzenle.",
            "Olaylara tarafsız bir gözlemci gibi bakmaya çalış.",
            "Dürüst bir konuşma yap."
        ]
    },
    "The Hanged Man": {
        keywords: ["Teslimiyet", "Bekleme", "Yeni Bakış", "Fedakarlık", "Durgunluk"],
        intros: [
            "Asılan Adam, olaylara farklı bir açıdan bakman için seni baş aşağı durmaya davet ediyor.",
            "İlerlemek için bazen durmak gerekir. Şu an eylem değil, teslimiyet zamanı.",
            "Kontrolü bırakmak, sandığından daha büyük bir özgürlük getirebilir.",
            "Bir süreliğine işler askıya alınmış gibi görünebilir, bu bir mola, son değil.",
            "Gönüllü bir fedakarlık veya vazgeçiş, sana daha büyük bir kazanç olarak dönecek."
        ],
        cores: [
            "Zorlayarak kapıları açamazsın. Geri çekil ve kilidin kendiliğinden açılmasını bekle.",
            "Bakış açını değiştirirsen dünyan değişir. Olayı bir de karşı tarafın gözünden gör.",
            "Egonu bir kenara bırak. Bazen kazanmak için savaşmayı bırakmak gerekir.",
            "Bu durgunluk dönemi ruhsal büyümen için gerekli. Acele etme, sürecin tadını çıkar.",
            "Aydınlanma, en beklemediğin anda, sen çabalamayı bıraktığında gelecek."
        ],
        outros: [
            "Teslim ol ve hafifle.",
            "Bakış açını değiştir, mucizeyi gör.",
            "Beklemek de bir eylemdir.",
            "Akışa güven, her şey zamanında olur.",
            "Bazen durmak, ilerlemekten daha hızlıdır."
        ],
        affirmations: [
            "Evrenin zamanlamasına güveniyor ve teslim oluyorum.",
            "Olaylara farklı açılardan bakmayı seçiyorum.",
            "Kontrolü bırakmanın huzurunu yaşıyorum.",
            "Bu bekleme süreci benim hayrıma işliyor.",
            "Ruhsal büyümeye ve aydınlanmaya açığım."
        ],
        suggestions: [
            "Bugün kontrol etmeye çalıştığın bir şeyi serbest bırak.",
            "Yoga veya meditasyon yap (özellikle ters duruşlar).",
            "Bir soruna tamamen zıt bir açıdan çözüm ara.",
            "Sabırlı olmayı gerektiren bir aktivite yap.",
            "Kendine 'Bunu yapmasam ne olur?' diye sor."
        ]
    },
    "Death": {
        keywords: ["Bitiş", "Dönüşüm", "Yenilenme", "Değişim", "Vedalar"],
        intros: [
            "Ölüm kartı fiziksel bir son değil, büyük ve köklü bir dönüşümün habercisidir.",
            "Eski kabuğunu atma vakti geldi. Tırtılın kelebeğe dönüşmesi gibi bir süreçtesin.",
            "Bir kapı kapanıyor, çünkü senin için çok daha muhteşem bir kapı açılmak üzere.",
            "Hayatından çıkması gereken ne varsa (alışkanlık, insan, durum), gitmesine izin ver.",
            "Yeniden doğuş için önce eskinin ölmesi gerekir. Bu doğal döngüden korkma."
        ],
        cores: [
            "Tutunmayı bırak. Miadı dolmuş şeyleri hayatında tutmak sadece sana yük olur.",
            "Değişim bazen sancılı olabilir ama sonuç muazzam olacak. Sürece güven.",
            "Güneş her batışın ardından yeniden doğar. Bu bitiş, taze bir başlangıcın tohumudur.",
            "Kendinin yeni bir versiyonuna yükseliyorsun. Eski sen geride kalıyor.",
            "Temizlik zamanı. Ruhunu, zihnini ve çevreni arındır."
        ],
        outros: [
            "Bitişler yeni başlangıçlardır.",
            "Dönüşüme direnme, onunla dans et.",
            "Yenileniyorsun, parlıyorsun.",
            "Eskiye veda et, yeniye 'merhaba' de.",
            "Küllerinden yeniden doğuyorsun."
        ],
        affirmations: [
            "Değişimi ve dönüşümü sevgiyle kucaklıyorum.",
            "Eski beni geride bırakıyor, yenileniyorum.",
            "Biten her şeye teşekkür ediyor ve serbest bırakıyorum.",
            "Hayatın doğal döngülerine güveniyorum.",
            "Yepyeni bir başlangıca hazırım."
        ],
        suggestions: [
            "Evin veya odanda büyük bir temizlik yap, kullanmadıklarını at.",
            "İstemediğin bir alışkanlığı bugün sonlandır.",
            "Hayatından çıkan veya çıkması gereken birine veda mektubu yaz (göndermesen de olur).",
            "Dönüşüm temalı bir film izle veya kitap oku.",
            "Saçında veya tarzında bir değişiklik yap."
        ]
    },
    "Temperance": {
        keywords: ["Denge", "Sabır", "Uyum", "Şifa", "Sentez"],
        intros: [
            "Denge kartı, hayatına huzur, şifa ve ölçülülük getiriyor.",
            "Zıtlıkları birleştirme ve orta yolu bulma zamanı. Aşırılıklardan kaçın.",
            "Ruhsal rehberlerin seninle. İçsel simyayı gerçekleştiriyorsun.",
            "Sabırla ve sakince ilerlemek, seni hedefine en sağlıklı şekilde ulaştıracak.",
            "Hayatının farklı alanlarını uyum içinde bir araya getiriyorsun."
        ],
        cores: [
            "Acele etme. Her şey doğru zamanda ve doğru oranda gerçekleşecek. Akışta kal.",
            "Duygusal ve zihinsel dengeni koru. Ne çok coşkulu ne çok depresif, merkezde kal.",
            "Şifalanma sürecindesin. Kendine iyi bak ve iyileşmene zaman tanı.",
            "Farklı fikirleri veya seçenekleri harmanla. Yeni ve daha iyi bir şey ortaya çıkacak.",
            "Su gibi ol; yumuşak, uyumlu ama bir o kadar da güçlü ve yolunu bulan."
        ],
        outros: [
            "Denge senin süper gücün.",
            "Şifa ve huzur seninle.",
            "Orta yol, en güvenli yoldur.",
            "Sabrın meyvesi tatlıdır.",
            "Uyum içinde akıyorsun."
        ],
        affirmations: [
            "Hayatımda mükemmel bir denge ve uyum içindeyim.",
            "Sabırlıyım ve sürece güveniyorum.",
            "Ruhum, bedenim ve zihnim şifalanıyor.",
            "Aşırılıklardan uzak, huzurlu bir yaşamı seçiyorum.",
            "Doğru zamanda doğru yerdeyim."
        ],
        suggestions: [
            "Su ile ilgili bir aktivite yap (yüzmek, uzun bir duş, su içmek).",
            "İki farklı yemeği karıştırıp yeni bir tat dene (metaforik olarak da).",
            "Meditasyon yaparak içsel dengeni bul.",
            "Aşırı yaptığın bir şeyi (yeme, çalışma, uyuma) dengele.",
            "Sabır gerektiren bir işle uğraş."
        ]
    },
    "The Devil": {
        keywords: ["Bağımlılık", "Tutku", "Maddiyat", "Esaret", "Gölge"],
        intros: [
            "Şeytan kartı, seni kısıtlayan zincirlerin aslında kendi elinde olduğunu hatırlatıyor.",
            "Maddi dünyaya, tutkulara veya bağımlılıklara aşırı takılıp kalmış olabilirsin.",
            "Kendi gölge yanlarınla yüzleşme vakti. Korkularının seni yönetmesine izin verme.",
            "Görünmeyen bağlar seni tutuyor olabilir. Özgürleşmek için farkındalık şart.",
            "Arzu ve tutku güçlüdür ama seni köleleştirmesine izin vermemelisin."
        ],
        cores: [
            "Seni neyin tutsak ettiğini bul: Bir ilişki mi, bir alışkanlık mı, yoksa kendi düşüncelerin mi?",
            "Zincirlerin gevşek, istesen çıkabilirsin. Kurban rolünü oynamayı bırak ve gücünü eline al.",
            "Maddi hırslara kapılıp manevi değerlerini unutma. Dengeyi şaşma.",
            "Karanlık yanlarını kabul et ama onlara teslim olma. Onları dönüştür.",
            "Cinsellik, güç veya para... Bunlar araçtır, amaç olursa seni yutar. Dikkatli ol."
        ],
        outros: [
            "Zincirlerini kır, özgürsün.",
            "Gölgeni tanı, ışığını bul.",
            "Bağımlılıklarından arın, gücünü kazan.",
            "Korku sadece bir illüzyondur.",
            "Kendi hayatının efendisi sensin."
        ],
        affirmations: [
            "Beni kısıtlayan her şeyden özgürleşiyorum.",
            "Kendi gücümü ve irademi elime alıyorum.",
            "Korkularımın üzerindeyim, cesurum.",
            "Gölge yanlarımı sevgiyle dönüştürüyorum.",
            "Bağımsız ve özgür bir ruhum."
        ],
        suggestions: [
            "Seni rahatsız eden bir bağımlılığınla (telefon, şeker, vb.) yüzleş.",
            "Korktuğun bir şeyin listesini yap ve rasyonel olup olmadığını sorgula.",
            "Kendini bağladığın bir sözleşmeyi veya durumu gözden geçir.",
            "Fiziksel detoks yap.",
            "Gölge çalışması (shadow work) hakkında oku."
        ]
    },
    "The Tower": {
        keywords: ["Yıkım", "Uyanış", "Ani Değişim", "Kaos", "Özgürleşme"],
        intros: [
            "Yıkılan Kule, sarsılmaz sandığın temellerin sarsılabileceğini gösteriyor.",
            "Ani ve beklenmedik bir değişim kapıda. Bu bir kriz gibi görünse de aslında bir kurtuluş.",
            "Yalanlar üzerine kurulu ne varsa yıkılacak, sadece gerçekler ayakta kalacak.",
            "Evren seni uyandırmak için sert bir sarsıntı gönderiyor. Direnme, bırak yıkılsın.",
            "Eski yapılar çöküyor ki yerine daha sağlam ve sağlıklı olanlar inşa edilebilsin."
        ],
        cores: [
            "Kaostan korkma. Bazen düzenin gelmesi için önce kaos gerekir. Fırtına sonrası hava tertemiz olacak.",
            "Sahte güven alanlarından çıkmaya zorlanıyorsun. Bu senin iyiliğin için.",
            "Bir aydınlanma şimşeği çakacak ve her şeyi net göreceksin. Gözlerin açılıyor.",
            "Yıkılan sadece ego veya illüzyondur. Özün zarar görmez. Enkazın altından güçlenerek çıkacaksın.",
            "Bu olay seni özgürleştirecek. Artık seni tutan o dar kuleden çıkıyorsun."
        ],
        outros: [
            "Yıkım, yeniden inşanın habercisidir.",
            "Gerçekler seni özgür kılacak.",
            "Korkma, enkazın altından hazine çıkacak.",
            "Ani değişimler büyük fırsatlar getirir.",
            "Sarsıl, uyan ve özgürleş."
        ],
        affirmations: [
            "Değişimi, ne kadar sarsıcı olsa da kabul ediyorum.",
            "Yıkılan her şeyin yerine daha iyisi gelecek.",
            "Güvende olduğumu ve korunduğumu biliyorum.",
            "Eski kalıplarımdan özgürleşiyorum.",
            "Bu kaosun içindeki düzeni görüyorum."
        ],
        suggestions: [
            "Hayatında radikal bir değişiklik yap.",
            "Seni kısıtlayan bir inancı veya düşünceyi yık.",
            "Kaotik bir ortamda sakin kalma pratiği yap.",
            "Evdeki gereksiz eşyaları atarak fiziksel bir 'yıkım' ve temizlik yap.",
            "Sürprizlere hazırlıklı ol ve esnek kal."
        ]
    },
    "The Star": {
        keywords: ["Umut", "İlham", "Huzur", "Yenilenme", "Şifa"],
        intros: [
            "Yıldız kartı, fırtınadan sonra gelen o derin huzuru ve berraklığı getiriyor.",
            "Umutların yeşeriyor. Evren sana göz kırpıyor, dileklerin duyuluyor.",
            "İçsel bir şifa ve yenilenme dönemindesin. Yaraların sarılıyor.",
            "Karanlığın içindeki ışıksın. İlhamınla parlıyor ve yolunu buluyorsun.",
            "Kozmik sularla yıkanma ve arınma vakti. Ruhun ferahlıyor."
        ],
        cores: [
            "Geleceğe güvenle bak. En zor zamanlar geride kaldı, şimdi parlama zamanı.",
            "Kendine inan. Sen de gökteki yıldızlar gibi eşsiz ve değerlisin.",
            "İlham perileri yanında. Yaratıcı projelerin için harika bir akış var.",
            "Sakinleş, nefes al ve anın tadını çıkar. Huzur dışarıda değil, senin içinde.",
            "Cömert ol. Sevgini, ışığını ve yeteneklerini dünyayla paylaş."
        ],
        outros: [
            "Umut senin pusulandır.",
            "Parlamaya devam et, ışığın dünyayı aydınlatıyor.",
            "Dileklerin gerçekleşmek üzere.",
            "Huzur ve şifa seninle.",
            "Sen bir yıldızsın, bunu unutma."
        ],
        affirmations: [
            "Geleceğe umut ve güvenle bakıyorum.",
            "Şifalanıyor, yenileniyor ve parlıyorum.",
            "Evrenin sonsuz desteğine açığım.",
            "İçimdeki huzur her geçen gün derinleşiyor.",
            "Hayallerimin gerçekleşeceğine inanıyorum."
        ],
        suggestions: [
            "Gece gökyüzünü izle ve bir dilek tut.",
            "Seni umutlandıran hayallerini yaz veya çiz.",
            "Su kenarında vakit geçir veya rahatlatıcı bir banyo yap.",
            "Başkalarına ilham verecek bir şey paylaş.",
            "Kendine şefkatli ve nazik davran."
        ]
    },
    "The Moon": {
        keywords: ["İllüzyon", "Korku", "Bilinçaltı", "Sezgi", "Belirsizlik"],
        intros: [
            "Ay kartı, gecenin gizemli ve puslu dünyasına adım attığını gösteriyor.",
            "Her şey göründüğü gibi olmayabilir. Gölgelere ve yanılsamalara dikkat et.",
            "Bilinçaltın çok aktif, rüyaların sana mesajlar gönderiyor.",
            "Belirsizlik içinde yüzüyorsun, yolunu bulmak için mantığını değil sezgilerini kullan.",
            "Korkularınla yüzleşme zamanı. Karanlıkta saklanan şeyler gün yüzüne çıkıyor."
        ],
        cores: [
            "Sisli bir yolda yürümek gibidir bu dönem. Acele etme, önünü görmeden adım atma.",
            "İçindeki kurt uluyor. Vahşi doğanı ve bastırılmış duygularını dinle.",
            "Korku sadece zihninin bir oyunudur. Üzerine gidersen duman olup dağılır.",
            "Aldanmaya müsait bir zamandasın. Duyduklarına hemen inanma, iç yüzünü araştır.",
            "Yaratıcılığın gizemli sularından beslen. Sanat ve hayal gücü senin ilacın."
        ],
        outros: [
            "Karanlıktan korkma, yıldızlar orada parlar.",
            "Sezgilerin sisin içindeki fenerindir.",
            "Rüyaların rehberliğine güven.",
            "Gerçekler yakında aydınlanacak.",
            "Bilinçaltının derinliklerini keşfet."
        ],
        affirmations: [
            "Korkularımın ötesine geçiyorum.",
            "Sezgilerim bana en doğru yolu gösteriyor.",
            "Bilinmezlikle barışığım ve güvendeyim.",
            "Rüyalarımın mesajlarını anlıyorum.",
            "Gerçeği illüzyondan ayırt edebiliyorum."
        ],
        suggestions: [
            "Korktuğun şeyleri yaz ve onları yak (sembolik olarak).",
            "Rüyalarını analiz et veya bir rüya tabiri kitabına bak.",
            "Gece yürüyüşü yap (güvenli bir yerde).",
            "Belirsiz bir durum karşısında sabırla bekle.",
            "Yaratıcı ve hayal gücü gerektiren bir işle uğraş."
        ]
    },
    "The Sun": {
        keywords: ["Mutluluk", "Başarı", "Canlılık", "Aydınlanma", "Neşe"],
        intros: [
            "Güneş doğuyor! Hayatının en parlak, en neşeli dönemlerinden birine giriyorsun.",
            "Karanlıklar dağılıyor, her şey netleşiyor ve ısınıyor.",
            "Başarı, mutluluk ve canlılık seninle. Tadını çıkar!",
            "İçindeki çocuk sevinçle dans ediyor. Saf neşe enerjisi akıyor.",
            "Evren sana kocaman bir 'EVET' diyor. Enerjin tavan yapıyor."
        ],
        cores: [
            "Kendini göster, sahne senin. Işığını saklama, tüm dünyayı aydınlat.",
            "Her şey yolunda. Endişeleri bırak ve anın tadını çıkar.",
            "Başarıların takdir görecek. Ektiğin tohumlar muhteşem çiçekler açıyor.",
            "Pozitif düşünce gücünle her şeyi mıknatıs gibi kendine çekiyorsun.",
            "Canlılık ve sağlık seninle. Kendini enerjik ve güçlü hissedeceksin."
        ],
        outros: [
            "Parlamaya devam et, sen Güneş'sin.",
            "Mutluluk senin doğal halin.",
            "Her şey harika gidiyor, keyfini sür.",
            "Başarın daim, ışığın bol olsun.",
            "Gülümse, hayat sana gülümsüyor."
        ],
        affirmations: [
            "Hayatın tüm güzelliklerini hak ediyorum.",
            "Işığım ve enerjimle etrafımı aydınlatıyorum.",
            "Başarılıyım, mutluyum ve doluyum.",
            "Her yeni güne neşeyle uyanıyorum.",
            "Ben parlayan bir güneşim."
        ],
        suggestions: [
            "Güneşe çık ve D vitamini al.",
            "Seni çok mutlu eden bir aktivite yap.",
            "Başarılarını kutla, kendine bir ödül ver.",
            "Çocuklarla vakit geçir veya içindeki çocuğu şımart.",
            "Sarı veya turuncu renkli giysiler giy."
        ]
    },
    "Judgement": {
        keywords: ["Uyanış", "Çağrı", "Yeniden Doğuş", "Hesaplaşma", "Karar"],
        intros: [
            "Mahkeme kartı, bir uyanış borusunun çaldığını ve yeni bir hayata çağrıldığını söylüyor.",
            "Geçmişle hesaplaşma ve yüklerinden arınıp yükselme vakti.",
            "Hayatının amacı ve yönü konusunda derin bir farkındalık yaşıyorsun.",
            "İkinci bir şans kapıda. Geçmişi affet ve geleceğe temiz bir sayfayla başla.",
            "Kozmik bir değerlendirme sürecinden geçiyorsun, sonuç senin lehine olacak."
        ],
        cores: [
            "Eski benliğini geride bırak. Tıpkı bir anka kuşu gibi küllerinden doğuyorsun.",
            "Duyduğun o içsel çağrıya kulak ver. Seni gerçek potansiyeline götürüyor.",
            "Kendini ve başkalarını affet. Affetmek, seni özgürleştirecek ve yükseltecek kanatlardır.",
            "Büyük bir karar aşamasındasın. Geçmişin tecrübesiyle, geleceğin umudunu birleştir.",
            "Artık uykudan uyanma vakti. Gözlerini aç ve hayatını gerçekten yaşamaya başla."
        ],
        outros: [
            "Uyanışın kutlu olsun.",
            "Geçmiş geride kaldı, gelecek senin.",
            "Çağrıya cevap ver, yüksel.",
            "Özgürleş ve kanatlan.",
            "Yeni hayatın seni bekliyor."
        ],
        affirmations: [
            "Geçmişi sevgiyle affediyor ve serbest bırakıyorum.",
            "İçsel çağrımı duyuyor ve takip ediyorum.",
            "Yeniden doğuş sürecine güveniyorum.",
            "Hayatımın amacını gerçekleştiriyorum.",
            "Özgürüm, hafifim ve yükseliyorum."
        ],
        suggestions: [
            "Geçmişte yaptığın bir hatayı kendine affet.",
            "Uzun zamandır ertelediğin o 'büyük çağrı' için bir adım at.",
            "Eski fotoğraflara bak ve ne kadar değiştiğini gör.",
            "Sabah erken kalk ve gün doğumunu izle (uyanış sembolü).",
            "Kendi hayatının muhasebesini yap."
        ]
    },
    "The World": {
        keywords: ["Tamamlanma", "Bütünlük", "Başarı", "Yolculuk", "Zafer"],
        intros: [
            "Dünya kartı, bir döngünün muhteşem bir zaferle tamamlandığını müjdeliyor.",
            "Bütünlük ve mükemmellik hissi seninle. Yapbozun son parçası yerine oturdu.",
            "Dünya ayaklarının altında. Sınırlar kalkıyor, ufuklar genişliyor.",
            "Büyük bir başarıya imza attın veya atmak üzeresin. Kutlama zamanı.",
            "Kozmik dansa katıldın, evrenle bir ve bütün olduğunu hissediyorsun."
        ],
        cores: [
            "Başladığın işi bitirdin. Şimdi meyvelerini toplama ve başarının tadını çıkarma vakti.",
            "Yolculuk bitti ama her son yeni bir başlangıçtır. Bir üst seviyeye geçiyorsun.",
            "Kendini tam ve yetkin hisset. Dışarıdan bir şeye ihtiyacın yok, her şey içinde.",
            "Seyahat, taşınma veya uluslararası konular gündeme gelebilir. Dünyaya açıl.",
            "Hayatının her alanında (ruh, beden, zihin) uyumu yakaladın. Merkezindesin."
        ],
        outros: [
            "Dünya senin oyun alanın.",
            "Tamamlandın, bütünlendin, başardın.",
            "Zaferin tadını çıkar.",
            "Döngü kapandı, yenisi daha da güzel olacak.",
            "Sen evrenin mükemmel bir parçasısın."
        ],
        affirmations: [
            "Başladığım her şeyi başarıyla tamamlıyorum.",
            "Ben tam ve bütünüm.",
            "Dünyanın sunduğu tüm güzelliklere açığım.",
            "Hayatımın başyapıtını yaratıyorum.",
            "Evrenle mükemmel bir uyum içindeyim."
        ],
        suggestions: [
            "Tamamladığın bir proje veya dönem için kendine kutlama yap.",
            "Dünya haritasına bak ve gitmek istediğin bir yer seç.",
            "Yarım bıraktığın bir işi bugün bitir.",
            "Farklı bir kültürden bir müzik dinle veya yemek ye.",
            "Kendine 'Ben başardım' de."
        ]
    }
};

/**
 * Randomly selects items from an array.
 */
function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a unique reading for a tarot card.
 */
export function generateReading(cardName: string, userSign?: string) {
    const content = TAROT_CONTENT[cardName] || TAROT_CONTENT["The Fool"]; // Fallback

    const intro = getRandomItem(content.intros);
    const core1 = getRandomItem(content.cores);
    const core2 = getRandomItem(content.cores.filter(c => c !== core1)); // Farklı olsun
    const outro = getRandomItem(content.outros);
    const affirmation = getRandomItem(content.affirmations);
    const suggestion = getRandomItem(content.suggestions);

    // Sign customization (Simple placeholder injection if needed, 
    // currently the text is generic enough to fit all but rich enough to feel personal)

    const interpretation = `${intro} ${core1} ${core2} ${outro}`;

    return {
        interpretation,
        affirmation,
        suggestion
    };
}
