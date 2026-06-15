// ==========================================================================
// JUDUL: 1. MANAJEMEN HARAKAT MATAN & TOGGLE SIDEBAR UTAMA
// ==========================================================================

const matan = document.getElementById("matan");
const tombol = document.getElementById("toggleHarakat");

const tanpaHarakat = `
(فصل) ومن غصب مالا لأحد لزمه رده وأرش نقصه وأجرة مثله فإن تلف ضمنه
بمثله إن كان له مثل أو بقيمته إن لم يكن له بقيمته إن لم يكن له مثل أكثر ما كانت من يوم
الغصب إلى يوم التلف.
`;

const denganHarakat = `
(فَصْلٌ) وَمَنْ غَصَبَ مَالًا لِأَحَدٍ لَزِمَهُ رَدُّهُ وَأَرْشُ نَقْصِهِ وَأُجْرَةُ مِثْلِهِ، فَإِنْ تَلِفَ ضَمِنَهُ بِمِثْلِهِ إِنْ كَانَ لَهُ مِثْلٌ، أَوْ بِقِيمَتِهِ إِنْ لَمْ يَكُنْ لَهُ مِثْلٌ أَكْثَرَ مَا كَانَتْ مِنْ يَوْمِ الْغَصْبِ إِلَى يَوْمِ التَّلَفِ.
`;

let tampilHarakat = false;

// Logika mengubah teks arab matan (Berharakat / Polosan)
if (tombol) {
  tombol.addEventListener("click", function () {
    if (tampilHarakat) {
      matan.textContent = tanpaHarakat;
      tombol.textContent = "Tampilkan Harakat";
    } else {
      matan.textContent = denganHarakat;
      tombol.textContent = "Sembunyikan Harakat";
    }
    tampilHarakat = !tampilHarakat;
  });
}

// Logika klik tombol Menu Hamburger (☰) untuk menyembunyikan Sidebar
const toggleSidebar = document.getElementById("toggleSidebar");
const wrapper = document.querySelector(".wrapper");

if (toggleSidebar) {
  toggleSidebar.addEventListener("click", () => {
    wrapper.classList.toggle("hide-sidebar");
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
    const pembahasan = this.getAttribute("data-pembahasan") || "Tidak ada pembahasan khusus untuk kata ini.";

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
  const rect = this.getBoundingClientRect();
  const containerRect = document.querySelector(".kitab").getBoundingClientRect();
  
  // Menghitung selisih jarak kata terhadap container .kitab yang menjadi parent relative-nya
  panel.style.top = `${rect.bottom - containerRect.top + 10}px`;
  panel.style.left = `${rect.left - containerRect.left}px`;

  // Munculkan pop-up ke layar halaman
  panel.classList.add("show");
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