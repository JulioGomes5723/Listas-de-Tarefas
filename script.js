// Array onde todas as tarefas serão armazenadas
let tarefas = [];

// CARREGAR TAREFAS SALVAS AO ABRIR O SITE
const tarefasSalvas = localStorage.getItem("tarefas");

if (tarefasSalvas) {
  tarefas = JSON.parse(tarefasSalvas);
}

// Função para salvar as tarefas no navegador
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função responsável por adicionar uma nova tarefa
function adicionarTarefa() {
  const inputTarefa = document.getElementById("inputTarefa");
  const tarefa = inputTarefa.value.trim();

  if (tarefa == "") {
    document.getElementById("mensagem").textContent =
      "Digite um texto para adicionar na lista!";
    document.getElementById("mensagem").style.color = "#ff0011";
  } else {
    document.getElementById("mensagem").textContent =
      "Tarefa adicionada com sucesso!";
    document.getElementById("mensagem").style.color = "#038717";

    tarefas.push(tarefa);

    renderizarTarefas();
    salvarTarefas();
  }

  inputTarefa.value = "";
}

// Função responsável por mostrar as tarefas na tela
function renderizarTarefas() {
  const listaTarefas = document.getElementById("listaTarefas");
  listaTarefas.innerHTML = "";

  for (let i = 0; i < tarefas.length; i++) {
    let novaTarefa = document.createElement("li");
    novaTarefa.textContent = tarefas[i];

    let botaoRemover = document.createElement("button");
    botaoRemover.className = "remover";
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => removerTarefa(i);

    let botaoEditar = document.createElement("button");
    botaoEditar.className = "editar";
    botaoEditar.textContent = "Editar";
    botaoEditar.onclick = () => editarTarefa(i);

    novaTarefa.appendChild(botaoRemover);
    novaTarefa.appendChild(botaoEditar);

    listaTarefas.appendChild(novaTarefa);
  }
}

// Função responsável por remover uma tarefa
function removerTarefa(i) {
  tarefas.splice(i, 1);
  renderizarTarefas();
  salvarTarefas();
}

// Função responsável por editar uma tarefa
function editarTarefa(i) {
  let tarefaEditada = prompt("Edite a tarefa:", tarefas[i]);

  if (tarefaEditada !== null && tarefaEditada.trim() !== "") {
    tarefas[i] = tarefaEditada.trim();
    renderizarTarefas();
    salvarTarefas();
  }
}

// Função que apaga todas as tarefas
function limparListas() {
  if (confirm("Tem certeza que deseja apagar todas as tarefas?")) {
    tarefas.length = 0;
    renderizarTarefas();
    salvarTarefas();

    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Todas as tarefas foram apagadas!";
    mensagem.style.color = "#0f22d2";
  }
}
