document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. MANAJEMEN HARAKAT MATAN & SIDEBAR UTAMA
  // ==========================================================================
  const matan = document.getElementById("matan");
  const tombol = document.getElementById("toggleHarakat");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const wrapper = document.querySelector(".wrapper");

  let tampilHarakat = false; 

  if (matan && tombol) {
    tombol.addEventListener("click", function () {
      tampilHarakat = !tampilHarakat;
      const babAktif = document.querySelector(".judul-bab.aktif-scroll");

      if (babAktif) {
        if (tampilHarakat) {
          matan.innerText = babAktif.getAttribute("data-matan-full");
          this.classList.add("active");
        } else {
          matan.innerText = babAktif.getAttribute("data-matan-gundul");
          this.classList.remove("active");
        }
      }
    });
  }

  // Pengendali Sidebar HP & Desktop
  if (toggleSidebar && wrapper) {
    toggleSidebar.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 768) {
        wrapper.classList.toggle("mobile-sidebar-open");
      } else {
        wrapper.classList.toggle("show-sidebar-desktop");
      }
    });
  }

  // Klik di luar untuk menutup sidebar mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && wrapper && wrapper.classList.contains("mobile-sidebar-open")) {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar && !sidebar.contains(e.target) && e.target !== toggleSidebar) {
        wrapper.classList.remove("mobile-sidebar-open");
      }
    }
  });


  // ==========================================================================
  // 2. INTERAKSI KLIK KATA (POPUP INTERAKTIF ELEGAN) - SUDAH DIPERBAIKI
  // ==========================================================================
  const kataElements = document.querySelectorAll(".kata");
  const popup = document.getElementById("commentaryPanel"); // PERBAIKAN: Menggunakan ID yang benar sesuai HTML
  const closePanel = document.getElementById("closePanel");

  const popHarakat = document.getElementById("popHarakat");
  const popJawa = document.getElementById("popJawa");
  const popNahwu = document.getElementById("popNahwu");
  const popTasrif = document.getElementById("popTasrif");
  const popPembahasan = document.getElementById("popPembahasan");

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  kataElements.forEach((kata) => {
    kata.addEventListener("click", (e) => {
      e.stopPropagation();

      kataElements.forEach((k) => k.classList.remove("active"));
      kata.classList.add("active");

      // PERBAIKAN: Memasukkan Lafadz Kata yang diklik ke judul popup atas (id="popkata" di HTML)
      const popKataHtml = document.getElementById("popkata");
      if (popKataHtml) {
        popKataHtml.innerText = kata.innerText;
      }

      // PERBAIKAN: Menyesuaikan pengambilan atribut yang benar dari HTML (.kata)
      if (popHarakat) popHarakat.innerText = kata.getAttribute("data-harakat") || "-";
      if (popJawa) popJawa.innerText = kata.getAttribute("data-jawa") || "-";
      if (popNahwu) popNahwu.innerText = kata.getAttribute("data-irob") || "-"; // Menggunakan data-irob
      if (popTasrif) popTasrif.innerText = kata.getAttribute("data-tasrif") || "-"; // Menggunakan data-tasrif
      if (popPembahasan) popPembahasan.innerText = kata.getAttribute("data-pembahasan") || "-";

      // Pengaturan Posisi Popup Dinamis (Khusus Desktop)
      if (window.innerWidth > 768 && popup) {
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

      // Tampilkan Popup dengan menambahkan class 'show'
      if (popup) {
        popup.classList.add("show");
      }
    });
  });

  // Event handler untuk menutup popup melalui tombol 'close'
  if (closePanel && popup) {
    closePanel.addEventListener("click", () => {
      popup.classList.remove("show");
      kataElements.forEach((k) => k.classList.remove("active"));
    });
  }

  // Klik di luar popup untuk menutup
  document.addEventListener("click", (e) => {
    if (popup && popup.classList.contains("show")) {
      if (!popup.contains(e.target)) {
        popup.classList.remove("show");
        kataElements.forEach((k) => k.classList.remove("active"));
      }
    }
  });


  // ==========================================================================
  // 3. SISTEM NAVIGASI TAB DI DALAM POPUP
  // ==========================================================================
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });


  // ==========================================================================
  // 4. KONTROL SENSE / VISIBILITAS HEADER UTAMA
  // ==========================================================================
  const toggleHeaderBtn = document.getElementById("toggleHeader");
  if (toggleHeaderBtn) {
    toggleHeaderBtn.addEventListener("click", () => {
      document.body.classList.toggle("header-hidden");
      toggleHeaderBtn.classList.toggle("active");
    });
  }


  // ==========================================================================
  // 5. OBSERVER DETEKSI BAB AKTIF (BILA DI-SCROLL)
  // ==========================================================================
  const judulBab = document.querySelectorAll(".judul-bab");

  if (matan && judulBab.length > 0) {
    judulBab[0].classList.add("aktif-scroll");
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

          judulBab.forEach((b) => b.classList.remove("aktif-scroll"));
          babAktif.classList.add("aktif-scroll");

          if (tampilHarakat) {
            matan.innerText = babAktif.getAttribute("data-matan-full");
          } else {
            matan.innerText = babAktif.getAttribute("data-matan-gundul");
          }
        }
      });
    }, observerOptions);

    judulBab.forEach((bab) => {
      babObserver.observe(bab);
    });
  }
});