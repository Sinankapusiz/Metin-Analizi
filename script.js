const alfabe = "abcçdefgğhıijklmnoöprsştuüvyzxw";
const rakam = "0123456789";
const sembol = ".,;:!+-×÷=≈√∞$€₺£¥←→↑↓↔©®™★♥♠♣";


const metin = document.getElementById('metinBox');
const analizBtn = document.getElementById('analizBtn');
const alfabeTable = document.getElementById('alfabe-table');
const rakamTable = document.getElementById('rakam-table');
const sembolTable = document.getElementById('sembol-table');
const ozetTable = document.getElementById('ozet-table');

function kelimeSay(gonderilenMetin) {
    return gonderilenMetin.trim().split(" ").length - 1;
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

};


analizBtn.addEventListener("click", () => {
    metniAnalizEt(metin.value);
    console.log("Analiz Bitti");
});