document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. MANAJEMEN HARAKAT MATAN & TOGGLE SIDEBAR UTAMA
  // ==========================================================================
  const matan = document.getElementById("matan");
  const tombol = document.getElementById("toggleHarakat");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const wrapper = document.querySelector(".wrapper");

  if (matan && tombol) {
    const tanpaHarakat = matan.innerText.trim();
    const denganHarakat = matan.getAttribute("data-harakat");
    let tampilHarakat = false;

    tombol.addEventListener("click", function () {
      tampilHarakat = !tampilHarakat;
      matan.innerText = tampilHarakat ? denganHarakat : tanpaHarakat;

      if (tampilHarakat) {
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    });
  }

  if (toggleSidebar && wrapper) {
    toggleSidebar.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        wrapper.classList.toggle("mobile-sidebar-open");
      } else {
        wrapper.classList.toggle("hide-sidebar");
      }
    });
  }

  // ==========================================================================
  // 2. KONTROL POP-UP KATA MELAYANG & LOGIKA PERPINDAHAN TAB MENU
  // ==========================================================================
  const panel = document.getElementById("commentaryPanel");
  const closePanel = document.getElementById("closePanel");
  const semuaKata = document.querySelectorAll(".kata");

  const popHarakat = document.getElementById("popHarakat");
  const popJawa = document.getElementById("popJawa");
  const popIrob = document.getElementById("popIrob");
  const popNahwu = document.getElementById("popNahwu"); // <-- BARU: mendaftarkan id popNahwu
  const popTasrif = document.getElementById("popTasrif");
  const popPembahasan = document.getElementById("popPembahasan");

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

  semuaKata.forEach((kata) => {
    kata.addEventListener("click", function (e) {
      e.stopPropagation();

      semuaKata.forEach((k) => k.classList.remove("active"));
      this.classList.add("active");

      // Mengambil data dari atribut HTML kata yang diklik
      const harakat = this.getAttribute("data-harakat") || "-";
      const jawa = this.getAttribute("data-jawa") || "-";
      const irob = this.getAttribute("data-irob") || "-";

      // DIBAWAH INI PERBAIKAN ERROR: Dari 'element.getAttribute' diubah menjadi 'this.getAttribute'
      const nahwuData = this.getAttribute("data-nahwu") || "-";

      const tasrif = this.getAttribute("data-tasrif") || "-";
      const pembahasan = this.getAttribute("data-pembahasan") || "-";

      // Memasukkan data ke dalam elemen pop-up
      if (popHarakat) popHarakat.textContent = harakat;
      if (popJawa) popJawa.innerHTML = `&lrm;${jawa}&lrm;`;
      if (popIrob) popIrob.textContent = irob;
      if (popNahwu) popNahwu.textContent = nahwuData; // <-- BARU: menampilkan data nahwu ke pop-up
      if (popTasrif) popTasrif.textContent = tasrif;
      if (popPembahasan) popPembahasan.textContent = pembahasan;

      resetToFirstTab();

      if (panel) {
        if (window.innerWidth <= 768) {
          panel.style.top = "";
          panel.style.left = "";
        } else {
          const rect = this.getBoundingClientRect();
          const containerRect = document
            .querySelector(".kitab")
            .getBoundingClientRect();
          panel.style.top = `${rect.bottom - containerRect.top + 10}px`;
          panel.style.left = `${rect.left - containerRect.left}px`;
        }
        panel.classList.add("show");
      }
    });
  });

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetTab = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      const activeContent = document.getElementById(targetTab);
      if (activeContent) activeContent.classList.add("active");
    });
  });

  if (closePanel) {
    closePanel.addEventListener("click", (e) => {
      e.stopPropagation();
      if (panel) panel.classList.remove("show");
      semuaKata.forEach((k) => k.classList.remove("active"));
      resetToFirstTab();
    });
  }

  document.addEventListener("click", function (event) {
    if (
      panel &&
      !panel.contains(event.target) &&
      !event.target.classList.contains("kata")
    ) {
      panel.classList.remove("show");
      semuaKata.forEach((k) => k.classList.remove("active"));
    }
  });
  // --- BARU: LOGIKA SEMBUNYIKAN / TAMPILKAN HEADER ---
  const toggleHeaderBtn = document.getElementById("toggleHeader");

  if (toggleHeaderBtn && wrapper) {
    toggleHeaderBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Mencegah bentrokan event click lain
      wrapper.classList.toggle("header-hidden");
      this.classList.toggle("active");
    });
  }
  // ==========================================================================
  // 3. FITUR TOGGLE VIEW (IROB DI ATAS KATA & HARAKAT UTAMA)
  // ==========================================================================
  const toggleIrobBtn = document.getElementById("toggleIrob");
  const toggleHarakatMainBtn = document.getElementById("toggleHarakatMain");
  const kitabContainer = document.querySelector(".kitab");

  if (toggleIrobBtn && kitabContainer) {
    toggleIrobBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      kitabContainer.classList.toggle("show-irob");
      this.classList.toggle("active");
    });
  }

  if (toggleHarakatMainBtn && kitabContainer) {
    toggleHarakatMainBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      kitabContainer.classList.toggle("show-harakat-main");
      this.classList.toggle("active");
    });
  }

  // Tombol tutup otomatis sidebar untuk tampilan Mobile
  document.addEventListener("click", function (e) {
    if (window.innerWidth > 768) return;

    const sidebar = document.querySelector(".sidebar");
    // Tambahkan pengecekan agar klik pada toggleHeader tidak ikut memicu penutupan paksa layout
    if (
      wrapper &&
      wrapper.classList.contains("mobile-sidebar-open") &&
      !sidebar.contains(e.target) &&
      e.target.id !== "toggleSidebar" &&
      e.target.id !== "toggleHeader"
    ) {
      wrapper.classList.remove("mobile-sidebar-open");
    }
  });
});

// ==========================================================================
// 4. LOGIKA OTOMATIS GANTI TULISAN MATAN HEADER SAAT DIGESER (SCROLL) + SINKRON HARAKAT
// ==========================================================================
const judulBab = document.querySelectorAll(".judul-bab");

if (matan && judulBab.length > 0) {
  const observerOptions = {
    root: null,
    rootMargin: "-10% 0px -70% 0px", // Memicu perubahan saat bab mendekati atas layar
    threshold: 0,
  };

  const babObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const babAktif = entry.target;

        // 1. Ambil data teks dari elemen h1 yang sedang aktif di layar
        const matanDenganHarakat = babAktif.getAttribute("data-matan-full");
        // Mengambil teks asli dari h1 (misal: "كتاب الغصب") sebagai teks tanpa harakat/sederhana
        const matanTanpaHarakat = babAktif.textContent.trim();

        // 2. Update atribut data-harakat pada header agar tombol 'حر' tahu teks apa yang harus diubah
        matan.setAttribute("data-harakat", matanDenganHarakat);

        // 3. SINKRONISASI: Cek variabel status 'isHarakatActive' dari kode bawaan Anda
        if (isHarakatActive) {
          // Jika tombol 'حر' sedang aktif (warna hijau), tampilkan yang berharakat lengkap
          matan.innerText = matanDenganHarakat;
        } else {
          // Jika tombol 'حر' sedang mati, tampilkan tulisan bab biasa tanpa harakat lengkap
          matan.innerText = matanTanpaHarakat;
        }
      }
    });
  }, observerOptions);

  judulBab.forEach((bab) => {
    babObserver.observe(bab);
  });
}
