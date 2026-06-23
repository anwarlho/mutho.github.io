// ==========================================================================
// JUDUL: 1. MANAJEMEN HARAKAT MATAN & TOGGLE SIDEBAR UTAMA
// ==========================================================================

const matan = document.getElementById("matan");
const tombol = document.getElementById("toggleHarakat");

const tanpaHarakat = `
(فصل) وللقراض أربعة شرائط أن يكون على ناض من الدراهم والدنانير وأن يأذن رب المال للعامل في التصرف مطلقا أو فيما لا ينقطع وجوده غالبا وأن يشترط له جزءا معلوما من الربح وأن لا يقدر بمدة ولا ضمان على العامل إلا بعدوان وإذا حصل ربح وخسران جبر الخسران بالربح.
`;

const denganHarakat = `
(فَصْلٌ): وَلِلْقِرَاضِ أَرْبَعَةُ شُرُوطٍ: أَنْ يَكُونَ عَلَى نَاضٍّ مِنَ الدَّرَاهِمِ وَالدَّنَانِيرِ، وَأَنْ يَأْذَنَ رَبُّ الْمَالِ لِلْعَامِلِ فِي التَّصَرُّفِ مُطْلَقًا أَوْ فِيمَا لَا يَنْقَطِعُ وُجُودُهُ غَالِبًا، وَأَنْ يَشْتَرِطَ لَهُ جُزْءًا مَعْلُومًا مِنَ الرِّبْحِ، وَأَنْ لَا يُقَدَّرَ بِمُدَّةٍ، وَلَا ضَمَانَ عَلَى الْعَامِلِ إِلَّا بِعُدْوَانٍ، وَإِذَا حَصَلَ رِبْحٌ وَخُسْرَانٌ جُبِرَ الْخُسْرَانُ بِالرِّبْحِ.`;

let tampilHarakat = false;

// Logika mengubah teks arab matan (Berharakat / Polosan)
if (tombol) {
  tombol.addEventListener("click", function () {

    tampilHarakat = !tampilHarakat;

    if (tampilHarakat) {
      matan.textContent = denganHarakat;
      this.classList.add("active");
    } else {
      matan.textContent = tanpaHarakat;
      this.classList.remove("active");
    }

    this.textContent = "حر";

  });
}
// Logika klik tombol Menu Hamburger (☰) untuk menyembunyikan Sidebar
const toggleSidebar = document.getElementById("toggleSidebar");
const wrapper = document.querySelector(".wrapper");

if (toggleSidebar) {
  toggleSidebar.addEventListener("click", () => {

  if(window.innerWidth <= 768){
    wrapper.classList.toggle("mobile-sidebar-open");
  }else{
    wrapper.classList.toggle("hide-sidebar");
  }

});
}


// ==========================================================================
// JUDUL: 2. KONTROL POP-UP KATA MELAYANG & LOGIKA PERPINDAHAN TAB MENU
// ==========================================================================

const panel = document.getElementById("commentaryPanel");
const closePanel = document.getElementById("closePanel");
const semuaKata = document.querySelectorAll(".kata");

// Seleksi elemen penampung teks di dalam pop-up
const popHarakat = document.getElementById("popHarakat");
const popJawa = document.getElementById("popJawa");
const popIrob = document.getElementById("popIrob");
const popTasrif = document.getElementById("popTasrif");
const popPembahasan = document.getElementById("popPembahasan");

// Fungsi Pembantu: Mengembalikan posisi menu tab ke pilihan ke-1 ("Arti")
function resetToFirstTab() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  
  tabButtons.forEach((btn, index) => {
    if (index === 0) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  tabContents.forEach((content, index) => {
    if (index === 0) content.classList.add("active");
    else content.classList.remove("active");
  });
}

// Jalankan logika ketika salah satu KATA ARAB di-klik oleh pengguna
semuaKata.forEach((kata) => {
  kata.addEventListener("click", function (e) {
    e.stopPropagation(); // Mencegah klik ter-reset otomatis oleh dokumen luar

    // Beri tanda highlight latar belakang pada kata yang sedang diklik
    semuaKata.forEach((k) => k.classList.remove("active"));
    this.classList.add("active");

    // Ambil kiriman data dari atribut data-* kode HTML kata tersebut
    const harakat = this.getAttribute("data-harakat") || "-";
    const jawa = this.getAttribute("data-jawa") || "-";
    const irob = this.getAttribute("data-irob") || "-";
    const tasrif = this.getAttribute("data-tasrif") || "-";
    const pembahasan = this.getAttribute("data-pembahasan") || "-";

    // Masukkan data teks tersebut ke dalam elemen pop-up target
    if (popHarakat) popHarakat.textContent = harakat;
  if (popJawa) {
  // Ditambahkan kode penanda kiri-ke-kanan (\u200E) di depan dan di belakang teks
  popJawa.innerHTML = `&lrm;${jawa}&lrm;`;
}
    if (popIrob) popIrob.textContent = irob;
    if (popTasrif) popTasrif.textContent = tasrif;
    if (popPembahasan) popPembahasan.textContent = pembahasan;

    // Bersihkan posisi tab kembali ke tab pertama ("Arti") setiap kali berganti kata
    resetToFirstTab();

    // FIX POSISI: Menaruh kotak tepat 10px melayang di bawah kata yang diklik
  if (panel) {
  if (panel) {

  if (window.innerWidth <= 768) {

    // MOBILE
    panel.style.top = "";
    panel.style.left = "";

  } else {

    // DESKTOP
    const rect = this.getBoundingClientRect();
    const containerRect = document
      .querySelector(".kitab")
      .getBoundingClientRect();

    panel.style.top =
      `${rect.bottom - containerRect.top + 10}px`;

    panel.style.left =
      `${rect.left - containerRect.left}px`;
  }

  panel.classList.add("show");
}


}
  });
});

// Menjalankan fungsi perpindahan tab ketika judul tab (Arti/I'rob/Pembahasan) di-klik
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Amankan klik dari penutupan otomatis pop-up
      const targetTab = button.getAttribute("data-tab");

      // Bersihkan seluruh status aktif tab
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Aktifkan tab pilihan yang baru saja di-klik
      button.classList.add("active");
      const activeContent = document.getElementById(targetTab);
      if (activeContent) activeContent.classList.add("active");
    });
  });
});

// Menutup pop-up saat tombol tanda silang (✕) di klik
if (closePanel) {
  closePanel.addEventListener("click", (e) => {
    e.stopPropagation();
    if (panel) panel.classList.remove("show");
    semuaKata.forEach((k) => k.classList.remove("active"));
    resetToFirstTab();
  });
}

// Menutup pop-up secara otomatis jika pengguna mengklik area kosong di luar pop-up
document.addEventListener("click", function (event) {
  if (panel && !panel.contains(event.target) && !event.target.classList.contains("kata")) {
    panel.classList.remove("show");
    semuaKata.forEach((k) => k.classList.remove("active"));
  }
});


// ==========================================================================
// JUDUL: 3. FITUR TOGGLE VIEW (IROB DI ATAS KATA & HARAKAT UTAMA)
// ==========================================================================

// Menampilkan / Menyembunyikan huruf i'rob kecil melayang di atas kata arab
document.addEventListener("DOMContentLoaded", function () {
  const toggleIrobBtn = document.getElementById("toggleIrob");
  const kitabContainer = document.querySelector(".kitab");

  if (toggleIrobBtn && kitabContainer) {
    toggleIrobBtn.addEventListener("click", function (e) {
      e.stopPropagation(); 
      kitabContainer.classList.toggle("show-irob");
      this.classList.toggle("active");
    });
  }
});

// Mengaktifkan toggle harakat utama di area container kitab
document.addEventListener("DOMContentLoaded", function () {
  const toggleHarakatMainBtn = document.getElementById("toggleHarakatMain");
  const kitabContainer = document.querySelector(".kitab");

  if (toggleHarakatMainBtn && kitabContainer) {
    toggleHarakatMainBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      kitabContainer.classList.toggle("show-harakat-main");
      this.classList.toggle("active");
    });
  }
});

// tombol tutup otomatis sidebar
document.addEventListener("click", function(e){

  if(window.innerWidth > 768) return;

  const sidebar = document.querySelector(".sidebar");

  if(
    wrapper.classList.contains("mobile-sidebar-open") &&
    !sidebar.contains(e.target) &&
    e.target.id !== "toggleSidebar"
  ){
    wrapper.classList.remove("mobile-sidebar-open");
  }

});

// sidebar footer
