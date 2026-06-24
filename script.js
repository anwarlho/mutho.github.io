document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. MANAJEMEN HARAKAT MATAN & TOGGLE SIDEBAR UTAMA
  // ==========================================================================
  const matan = document.getElementById("matan");
  const tombol = document.getElementById("toggleHarakat");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const wrapper = document.querySelector(".wrapper");

  let tampilHarakat = false;

  if (matan && tombol) {
    tombol.addEventListener("click", function () {
      tampilHarakat = !tampilHarakat;

      // Ambil elemen bab yang sedang aktif di-scroll saat ini
      const babAktif = document.querySelector(".judul-bab.aktif-scroll");

      if (babAktif) {
        if (tampilHarakat) {
          // Ambil matan full harakat dari bab aktif
          matan.innerText = babAktif.getAttribute("data-matan-full");
          this.classList.add("active");
        } else {
          // Ambil matan gundul dari bab aktif (BUKAN h1 textContent-nya lagi)
          matan.innerText = babAktif.getAttribute("data-matan-gundul");
          this.classList.remove("active");
        }
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
  const popNahwu = document.getElementById("popNahwu");
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

      const harakat = this.getAttribute("data-harakat") || "-";
      const jawa = this.getAttribute("data-jawa") || "-";
      const irob = this.getAttribute("data-irob") || "-";
      const nahwuData = this.getAttribute("data-nahwu") || "-";
      const tasrif = this.getAttribute("data-tasrif") || "-";
      const pembahasan = this.getAttribute("data-pembahasan") || "-";

      if (popHarakat) popHarakat.textContent = harakat;
      if (popJawa) popJawa.innerHTML = `&lrm;${jawa}&lrm;`;
      if (popIrob) popIrob.textContent = irob;
      if (popNahwu) popNahwu.textContent = nahwuData;
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

  // --- LOGIKA SEMBUNYIKAN / TAMPILKAN HEADER ---
  const toggleHeaderBtn = document.getElementById("toggleHeader");

  if (toggleHeaderBtn && wrapper) {
    toggleHeaderBtn.addEventListener("click", function (e) {
      e.stopPropagation();
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

  // ==========================================================================
  // 4. LOGIKA OTOMATIS GANTI TULISAN MATAN HEADER SAAT DIGESER (SCROLL)
  // ==========================================================================
  const judulBab = document.querySelectorAll(".judul-bab");

  if (matan && judulBab.length > 0) {
    // Set aktif-scroll pada bab pertama sejak awal halaman dimuat
    judulBab[0].classList.add("aktif-scroll");

    // Set teks awal header mengikuti matan gundul bab pertama
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

          // Tampilkan ke header id="matan" berdasarkan status tombol 'حر'
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
