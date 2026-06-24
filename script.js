document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. MANAJEMEN HARAKAT MATAN & SIDEBAR UTAMA
  // ==========================================================================
  const matan = document.getElementById("matan");
  const tombol = document.getElementById("toggleHarakat");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const wrapper = document.querySelector(".wrapper");

  // SEJAK AWAL: Teks matan diset gundul (tampilHarakat = false)
  let tampilHarakat = false; 

  if (matan && tombol) {
    tombol.addEventListener("click", function () {
      tampilHarakat = !tampilHarakat;

      // Ambil elemen bab yang sedang aktif di-scroll saat ini
      const babAktif = document.querySelector(".judul-bab.aktif-scroll");

      if (babAktif) {
        if (tampilHarakat) {
          // Ganti ke teks penuh harakat
          matan.innerText = babAktif.getAttribute("data-matan-full");
          this.classList.add("active");
        } else {
          // Kembalikan ke teks gundul kosongan
          matan.innerText = babAktif.getAttribute("data-matan-gundul");
          this.classList.remove("active");
        }
      }
    });
  }

  // Pengendali Sidebar
  if (toggleSidebar && wrapper) {
    toggleSidebar.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        wrapper.classList.toggle("mobile-sidebar-open");
      } else {
        wrapper.classList.toggle("show-sidebar-desktop");
      }
    });
  }

  // ==========================================================================
  // 2. INTERAKSI KLIK KATA (POPUP INTERAKTIF ALA QURAN.COM)
  // ==========================================================================
  const kataElements = document.querySelectorAll(".kata");
  const popup = document.getElementById("applePopup");
  const closePanel = document.getElementById("closePanel");

  const popHarakat = document.getElementById("popHarakat");
  const popJawa = document.getElementById("popJawa");
  const popNuahu = document.getElementById("popNahwu");
  const popTasrif = document.getElementById("popTasrif");
  const popPembahasan = document.getElementById("popPembahasan");

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  kataElements.forEach((kata) => {
    kata.addEventListener("click", (e) => {
      e.stopPropagation();

      kataElements.forEach((k) => k.classList.remove("active"));
      kata.classList.add("active");

      // Isi Data dari Atribut HTML kata ke Popup
      popHarakat.innerText = kata.getAttribute("data-harakat") || "-";
      popJawa.innerText = kata.getAttribute("data-jawa") || "-";
      if (popNuahu) popNuahu.innerText = kata.getAttribute("data-nahwu") || "-";
      popTasrif.innerText = kata.getAttribute("data-sharaf") || "-";
      popPembahasan.innerText = kata.getAttribute("data-pembahasan") || "-";

      // Mengatur Posisi Popup Dinamis (Khusus Desktop)
      if (window.innerWidth > 768) {
        const rect = kata.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        let popupTop = rect.bottom + scrollTop + 8;
        let popupLeft = rect.left + scrollLeft - 150;

        if (popupLeft < 20) popupLeft = 20;
        if (popupLeft + 380 > window.innerWidth) {
          popupLeft = window.innerWidth - 400;
        }

        popup.style.top = `${popupTop}px`;
        popup.style.left = `${popupLeft}px`;
      }

      popup.classList.add("show");
    });
  });

  if (closePanel) {
    closePanel.addEventListener("click", () => {
      popup.classList.remove("show");
      kataElements.forEach((k) => k.classList.remove("active"));
    });
  }

  document.addEventListener("click", (e) => {
    if (popup && !popup.contains(e.target)) {
      popup.classList.remove("show");
      kataElements.forEach((k) => k.classList.remove("active"));
    }
  });

  // Sistem Navigasi Tab PopUp
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      const targetTab = document.getElementById(`tab-${tabId}`);
      if (targetTab) targetTab.classList.add("active");
    });
  });

  // ==========================================================================
  // 3. GLOBAL INTERACTIVE CONTROLS (I'ROB & HARAKAT MAIN)
  // ==========================================================================
  const toggleIrob = document.getElementById("toggleIrob");
  const toggleHarakatMain = document.getElementById("toggleHarakatMain");
  const kitabContainer = document.querySelector(".kitab");

  if (toggleIrob && kitabContainer) {
    toggleIrob.addEventListener("click", () => {
      kitabContainer.classList.toggle("show-irob");
      toggleIrob.classList.toggle("active");
    });
  }

  if (toggleHarakatMain && kitabContainer) {
    toggleHarakatMain.addEventListener("click", () => {
      kitabContainer.classList.toggle("show-harakat-main");
      toggleHarakatMain.classList.toggle("active");
    });
  }

  // ==========================================================================
  // 4. MANAGEMENT HIDDEN HEADER (TOMBOL ه UNTUK TUTUP/MUNCULKAN HEADER)
  // ==========================================================================
  const toggleHeaderBtn = document.getElementById("toggleHeader");
  if (toggleHeaderBtn) {
    toggleHeaderBtn.addEventListener("click", () => {
      document.body.classList.toggle("header-hidden");
      toggleHeaderBtn.classList.toggle("active");
    });
  }

  // ==========================================================================
  // 5. OBSERVER DETEKSI BAB AKTIF (SAAT HALAMAN DI-SCROLL)
  // ==========================================================================
  const judulBab = document.querySelectorAll(".judul-bab");

  if (matan && judulBab.length > 0) {
    // Set aktif-scroll pada bab pertama sejak awal halaman dimuat
    judulBab[0].classList.add("aktif-scroll");

    // Set teks awal header mengikuti matan gundul bab pertama agar tidak kosong
    matan.innerText = judulBab[0].getAttribute("data-matan-gundul");

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const babObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const babAktif = entry.target;

          // Tandai bab mana yang sedang aktif di layar
          judulBab.forEach((b) => b.classList.remove("aktif-scroll"));
          babAktif.classList.add("aktif-scroll");

          // Ambil data matan dari bab yang aktif
          const teksBerharakat = babAktif.getAttribute("data-matan-full");
          const teksGundul = babAktif.getAttribute("data-matan-gundul");

          // Tampilkan teks berdasarkan status tombol 'حر' saat ini
          if (tampilHarakat) {
            matan.innerText = teksBerharakat;
          } else {
            matan.innerText = teksGundul;
          }
        }
      });
    }, observerOptions);

    judulBab.forEach((bab) => {
      babObserver.observe(bab);
    });
  }
});