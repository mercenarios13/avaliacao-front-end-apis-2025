const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "posts.html";
    } else {
      errorMessage.textContent = data.message || "Erro ao autenticar!";
    }
  } catch (error) {
    errorMessage.textContent = "Erro de rede, tente novamente!";
  }
});
// scripts/login.js
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Armazena o token no localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('username', data.username);

            // Redireciona para a página de posts
            window.location.href = '../pages/posts.html';
        } else {
            // Mostra a mensagem de erro
            errorMessage.textContent = data.message || 'Usuário ou senha inválidos';
        }
    } catch (err) {
        errorMessage.textContent = 'Erro na conexão com o servidor';
        console.error(err);
    }
});
