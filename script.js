const alfabe = "abcçdefgğhıijklmnoöprsştuüvyzxw";
const rakam = "0123456789";
const sembol = ".,;:!+-×÷=≈√∞$€₺£¥←→↑↓↔©®™★♥♠♣";
let kelimeDizisi = [];
let secilenElement = null;
let analizDurumu = false;

const metin = document.getElementById('metinBox');
const analizBtn = document.getElementById('analizBtn');
const yeniAnalizBtn = document.getElementById('yeni-analizBtn');
const alfabeTable = document.getElementById('alfabe-table');
const rakamTable = document.getElementById('rakam-table');
const sembolTable = document.getElementById('sembol-table');
const ozetTable = document.getElementById('ozet-table');
const favoriKelimeler = document.getElementById('favori-kelimeler');
const container = document.querySelector(".metin-girisi-panel");
const sonuc = document.querySelector(".sonuc");
const kelimelerE = document.querySelector(".kelimeler");

const metinBox2 = document.createElement("div");

function kelimeSay(gonderilenMetin) {
    kelimeDizisi = gonderilenMetin.trim().split(/\s+/).map(kelime => kelime.replace(/[^a-zA-ZğüşöçıiĞÜŞÖÇIİ]+/g, '')).filter(kelime => kelime.length > 0);
    return kelimeDizisi.length;
};

function harfSay(gonderilenMetin, gonderilenHarf) {
    //const metin = gonderilenMetin.toLowerCase();
    const metin = gonderilenMetin;
    const harfDizi = metin.split("").filter(harf => harf === gonderilenHarf);
    return harfDizi.length;
};

function rakamSay(gonderilenMetin, gonderilenRakam) {
    const rakamDizi = gonderilenMetin.split("").filter(rakam => rakam === gonderilenRakam);
    return rakamDizi.length;
};

function sembolSay(gonderilenMetin, gonderilenSembol) {
    const sembolDizi = gonderilenMetin.split("").filter(sembol => sembol === gonderilenSembol);
    return sembolDizi.length;
};

function boslukSay(gonderilenMetin) {
    return gonderilenMetin.split(" ").length - 1;
};

function favoriKelimeleriTespitEt(metinDizisi) {
    let favoriKelimeDizisi = [];
    for (let i = 0; i < metinDizisi.length; i++) {
        let favoriKelimeSayaci = 0;

        for (let j = 0; j < metinDizisi.length; j++) {
            if (metinDizisi[i] === metinDizisi[j])
                favoriKelimeSayaci++;
        }
        if (favoriKelimeSayaci > 2 && !favoriKelimeDizisi.includes(metinDizisi[i])) {
            favoriKelimeDizisi.push(metinDizisi[i]);
            favoriKelimeDizisi.push(favoriKelimeSayaci);
        }
    }
    return favoriKelimeDizisi;
};

function favoriKelimeleriDivEkle() {
    let favoriKelimeDizisi = favoriKelimeleriTespitEt(kelimeDizisi);
    for (let i = 0; i < favoriKelimeDizisi.length; i += 2) {
        favoriKelimeler.innerHTML += `<span class="favori-kelime">${favoriKelimeDizisi[i]} (${favoriKelimeDizisi[i + 1]})</span>`;
    }
}

function metniAnalizEt(metin) {

    // Kelime Sayısı
    ozetTable.rows[0].cells[1].innerHTML = kelimeSay(metin);

    //Harf Sayısı
    let i = 0;
    let toplamHarfSayisi = 0;
    for (let k = 0; k < alfabeTable.rows.length; k++) {
        for (let j = 1; j < alfabeTable.rows[k].cells.length; j += 2) {
            const harf = alfabe[i];
            i++;
            toplamHarfSayisi += harfSay(metin, harf);
            alfabeTable.rows[k].cells[j].innerHTML = harfSay(metin, harf);
        }
    }
    ozetTable.rows[0].cells[3].innerHTML = toplamHarfSayisi;

    //Rakam Sayısı
    i = 0;
    let toplamRakamSayisi = 0;
    for (let k = 0; k < rakamTable.rows.length; k++) {
        for (let j = 1; j < rakamTable.rows[k].cells.length; j += 2) {
            const rakamG = rakam[i];
            i++;
            toplamRakamSayisi += rakamSay(metin, rakamG);
            rakamTable.rows[k].cells[j].innerHTML = rakamSay(metin, rakamG);
        }
    }
    ozetTable.rows[0].cells[5].innerHTML = toplamRakamSayisi;

    //Sembol Sayısı
    i = 0;
    let toplamSembolSayisi = 0;
    for (let k = 0; k < sembolTable.rows.length; k++) {
        for (let j = 1; j < sembolTable.rows[k].cells.length; j += 2) {
            const sembolG = sembol[i];
            i++;
            toplamSembolSayisi += sembolSay(metin, sembolG);
            sembolTable.rows[k].cells[j].innerHTML = sembolSay(metin, sembolG);
        }
    }
    ozetTable.rows[0].cells[7].innerHTML = toplamSembolSayisi;

    // Boşluk Sayısı
    ozetTable.rows[0].cells[9].innerHTML = boslukSay(metin);

    favoriKelimeleriDivEkle();

    favoriKelimeleriVurgula();
    harfleriVurgula();
    rakamlariVurgula();
    sembolleriVurgula();
};

function istenilenKelimeyiVurgula(kelime) {
    metinBox2.innerHTML = metin.value;
    const regex = new RegExp(`${kelime}`, 'gi');
    if (kelime === ".") {
        const yeniMetin = metinBox2.innerHTML.replace(/\./g, `<span class="highlight">${kelime}</span>`);
        metinBox2.innerHTML = yeniMetin.replace(/\n/g, '<br>');
    }
    else if (kelime === "i") {
        const regex = new RegExp("[İi]", 'gu');
        let yeniMetin = metinBox2.innerHTML.replace(regex, `<span class="highlight">${kelime}</span>`);
        metinBox2.innerHTML = yeniMetin.replace(/\n/g, '<br>');
        console.log("İşlem yapıldı.");
    }
    else if (kelime === "ı") {
        const regex = new RegExp("[Iı]", 'gu');
        const yeniMetin = metinBox2.innerHTML.replace(regex, `<span class="highlight">${kelime}</span>`);
        metinBox2.innerHTML = yeniMetin.replace(/\n/g, '<br>');
    }

    else {
        const yeniMetin = metinBox2.innerHTML.replace(regex, `<span class="highlight">${kelime}</span>`);
        metinBox2.innerHTML = yeniMetin.replace(/\n/g, '<br>');
    }
}
analizBtn.addEventListener("click", () => {
    if (metin.value) {
        analizDurumu = true;
        metniAnalizEt(metin.value);
        console.log("Analiz Bitti");

        analizBtn.style.display = "none";
        yeniAnalizBtn.style.display = "block";
        metin.style.display = "none";
        metinBox2.classList.add("metinBox");
        metinBox2.innerHTML = metin.value;
        container.appendChild(metinBox2);
        metinBox2.style.display = "block";
        if (secilenElement !== null) {
            secilenElement.classList.remove("secilmis-element");
            secilenElement = null;
        }

        sonuc.style.display = "block";
        document.body.style.setProperty("height", "auto");
        arkaPlandakiKelimeleriSil();
        for (let i = 0; i < 10; i++)
            kelimeOlustur(kelimeDizisi, ((100 * document.body.clientHeight) / (kelimelerE.clientHeight)) - 2);

        kelimelerE.style.setProperty("height", (((100 * document.body.clientHeight) / (kelimelerE.clientHeight))).toString() + "%");
    }
    else {
        metin.placeholder = "BU ALANA METİN GİRMEZSEN, NEYİ ANALİZ EDEBİLİRİM? \nLÜTFEN METNİ BU ALANA GİRİNİZ!";
    }



});
yeniAnalizBtn.addEventListener("click", () => {
    yeniAnalizBtn.style.display = "none";
    analizBtn.style.display = "block";
    metin.style.display = "block";
    metinBox2.style.display = "none";
    metin.value = "";
    metinBox2.innerHTML = "";
    const sncHucre = document.querySelectorAll(".sncH");
    sncHucre.forEach(hucre => {
        hucre.textContent = "0";
    })
    if (secilenElement !== null) {
        secilenElement.classList.remove("secilmis-element");
        secilenElement = null;
    }
    favoriKelimeler.innerHTML = "";
    analizDurumu = false;
});

function favoriKelimeleriVurgula() {
    const allSpanFvr = document.querySelectorAll(".favori-kelime");
    allSpanFvr.forEach(btn => {
        btn.addEventListener("click", () => {
            const btnMetin = btn.textContent.split(" ");
            istenilenKelimeyiVurgula(btnMetin[0]);
            secimiDegistir(btn);
        })
    })
}
function harfleriVurgula() {
    const allHarf = document.querySelectorAll(".harf");

    allHarf.forEach(btn => {
        btn.onclick = function () {
            if (analizDurumu === true) {
                istenilenKelimeyiVurgula(btn.textContent[1]);
                secimiDegistir(btn);
            }
        };
    })
};
function rakamlariVurgula() {
    const allrakam = document.querySelectorAll(".rakam");

    allrakam.forEach(btn => {
        btn.onclick = function () {
            if (analizDurumu === true) {
                istenilenKelimeyiVurgula(btn.textContent[0]);
                secimiDegistir(btn);
            }
        };
    })
};
function sembolleriVurgula() {
    const allsembol = document.querySelectorAll(".sembol");

    allsembol.forEach(btn => {
        btn.onclick = function () {
            if (analizDurumu === true) {
                istenilenKelimeyiVurgula(btn.textContent[0]);
                secimiDegistir(btn);
            }
        };
    })
};

function secimiDegistir(degisenElement) {
    degisenElement.classList.add("secilmis-element");
    if (secilenElement !== null) {
        secilenElement.classList.remove("secilmis-element");
    }
    secilenElement = degisenElement;
};

function arkaPlandakiKelimeleriSil() {
    const kelimeler = document.querySelectorAll(".kelime");
    kelimeler.forEach(kelime => {
        kelime.remove();
    });
}

// Arka Plan Kelime Animasyonu Kodları
const kelimeler = ["Programlama", "JavaScript", "React", "CSS", "HTML", "Node.js", "Web Geliştirme", "Frontend", "Backend",
    "API", "Vue.js", "Git", "Veritabanı", "Yazılım Mühendisliği", "Algoritmalar", "Veritabanı Yönetim Sistemleri",
    "TypeScript", "Java", "Python", "DevOps", "Docker", "Kubernetes", "CI/CD", "Yapay Zeka", "Makine Öğrenimi",
    "Deep Learning", "TensorFlow", "Scikit-Learn", "Veritabanı Tasarımı", "NoSQL", "SQL", "MongoDB", "PostgreSQL",
    "MySQL", "Redis", "Firebase", "GraphQL", "RESTful API", "Lambda", "Cloud Computing", "AWS", "Azure", "GCP",
    "Jenkins", "PHP", "Ruby", "Swift", "Kotlin", "Flutter", "Android", "iOS", "Mobile Development", "UX/UI",
    "Prototip", "Wireframe", "Figma", "Adobe XD", "Responsive Design", "Agile", "Scrum", "Kanban", "TDD", "BDD",
    "Selenium", "Jest", "Mocha", "Chai", "Express.js", "Angular", "Ember.js", "Django", "Flask", "Spring Boot",
    "ASP.NET", "C#", "C++", "Go", "Rust", "Functional Programming", "Object-Oriented Programming", "Design Patterns",
    "MVC", "MVVM", "ORM", "Microservices", "Serverless", "Event-Driven Architecture", "Continuous Integration",
    "Continuous Deployment", "Version Control", "GitHub", "GitLab", "Bitbucket", "Bitwise Operations", "Cloud Storage",
    "Edge Computing", "Quantum Computing", "Blockchain", "Smart Contracts", "Cryptocurrency", "Docker Compose",
    "WebAssembly", "PWA", "Progressive Web App", "Service Workers", "SEO", "Web Performance", "Web Accessibility",
    "Cross-Browser Compatibility", "Debugging", "Profiling", "Code Review", "Refactoring", "Pair Programming",
    "Unit Testing", "Integration Testing", "End-to-End Testing", "Mocking", "CI Pipeline", "DevOps Culture",
];

function rastgeleSayi(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function kelimeOlustur(kelimeler, height) {
    kelimeler.forEach(kelime => {
        let span = document.createElement("span");
        span.classList.add("kelime");
        span.textContent = kelime;
        span.style.left = `${rastgeleSayi(0, 98)}%`;
        span.style.top = `${rastgeleSayi(0, height)}%`;
        span.style.animationDuration = `${rastgeleSayi(3, 6)}s`;
        kelimelerE.appendChild(span);
    });
}

kelimeOlustur(kelimeler, 98);
