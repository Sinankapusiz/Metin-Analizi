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

const metinBox2 = document.createElement("div");

function kelimeSay(gonderilenMetin) {
    kelimeDizisi = gonderilenMetin.trim().split(/\s+/).map(kelime => kelime.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ]+/g, '')).filter(kelime => kelime.length > 0);
    return kelimeDizisi.length;
};

function harfSay(gonderilenMetin, gonderilenHarf) {
    const metin = gonderilenMetin.toLowerCase();
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
    /*const regex = new RegExp(`${kelime}`, 'gi');
    if(kelime === ".")
    {
        const yeniMetin = metinBox2.innerHTML.replace(/\./g, `<span class="highlight">${kelime}</span>`);
        metinBox2.innerHTML = yeniMetin.replace(/\n/g, '<br>');
    }
        
    else
    {
        const yeniMetin = metinBox2.innerHTML.replace(regex, `<span class="highlight">${kelime}</span>`);
        metinBox2.innerHTML = yeniMetin.replace(/\n/g, '<br>');
    }*/
        const yeniMetin = metinBox2.innerHTML.replace(kelime, `<span class="highlight">${kelime}</span>`);
        metinBox2.innerHTML = yeniMetin.replace(/\n/g, '<br>');
}
analizBtn.addEventListener("click", () => {
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
                istenilenKelimeyiVurgula(btn.textContent[0]);
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
