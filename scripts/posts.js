// Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

// Verifica login
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");

let posts = [];

// Fetch posts da API
async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts = await res.json();
  displayPosts(posts);
}

// Exibe posts
function displayPosts(postsList) {
  postsContainer.innerHTML = "";
  postsList.forEach(post => {
    const card = document.createElement("div");
    card.classList.add("post-card");
    card.textContent = post.title;
    card.addEventListener("click", () => showModal(post));
    postsContainer.appendChild(card);
  });
}

// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function showModal(post) {
  modalTitle.textContent = post.title;
  modalBody.textContent = post.body;
  modal.style.display = "block";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; }

// Busca em tempo real
searchInput.addEventListener("input", (e) => {
  const filtered = posts.filter(post => post.title.toLowerCase().includes(e.target.value.toLowerCase()));
  displayPosts(filtered);
});

fetchPosts();
