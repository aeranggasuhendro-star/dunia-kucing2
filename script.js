// 1. Fungsi untuk mengambil parameter dari URL
function getParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 2. Fungsi untuk memuat konten halaman secara dinamis
function loadPage(page) {
    const contentDiv = document.getElementById("content");

    fetch(page + ".html")
        .then(response => {
            if (!response.ok) throw new Error("Halaman tidak ditemukan");
            return response.text();
        })
        .then(data => {
            contentDiv.innerHTML = data;
        })
        .catch(() => {
            contentDiv.innerHTML = "<h2>Halaman tidak ditemukan</h2>";
        });
}

// 3. Fungsi untuk menandai menu yang sedang aktif
function setActiveMenu(page) {
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "index.html?p=" + page) {
            link.classList.add("active");
        }
    });
}

// 4. FUNGSI BARU: Menangani perubahan halaman
function handleRouting() {
    let page = getParameter("p") || "home"; // Default ke home jika kosong
    loadPage(page);
    setActiveMenu(page);
}

// Jalankan saat pertama kali website dibuka
window.onload = handleRouting;

// PENTING: Jalankan handleRouting setiap kali URL berubah (saat tombol dipencet)
window.addEventListener("popstate", handleRouting);

// Tambahan agar link di dalam navigasi langsung memicu update tanpa reload manual
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function() {
        // Beri sedikit jeda agar browser sempat mengubah URL sebelum JavaScript membaca parameter baru
        setTimeout(handleRouting, 10);
    });
});