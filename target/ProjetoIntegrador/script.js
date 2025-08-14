document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-tarefa');
  const tarefasLista = document.getElementById('tarefas-lista');

  // Função para criar linha na tabela
  function criarLinha(tarefa) {
    const tr = document.createElement('tr');

    // Checkbox
    const tdCheck = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.concluida;
    tdCheck.appendChild(checkbox);

    // Nome
    const tdNome = document.createElement('td');
    tdNome.textContent = tarefa.nome;

    // Email
    const tdEmail = document.createElement('td');
    tdEmail.textContent = tarefa.email;

    // Categoria
    const tdCategoria = document.createElement('td');
    const spanCategoria = document.createElement('span');
    spanCategoria.textContent = tarefa.categoria;
    spanCategoria.className = `categoria-${tarefa.categoria}`;
    tdCategoria.appendChild(spanCategoria);

    // Observações
    const tdObs = document.createElement('td');
    tdObs.textContent = tarefa.observacoes;

    // Ações
    const tdAcoes = document.createElement('td');
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = '🗑️ Excluir';
    btnExcluir.className = 'btn btn-sm btn-outline-secondary';
    btnExcluir.onclick = () => {
      if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        fetch(`tarefas?id=${tarefa.id}`, { method: 'DELETE' })
          .then(res => {
            if (res.ok) tr.remove();
          });
      }
    };
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdCheck);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdObs);
    tr.appendChild(tdAcoes);

    tarefasLista.appendChild(tr);
  }

  // Carregar tarefas do banco ao abrir a página
  fetch('tarefas')
    .then(res => res.json())
    .then(lista => {
      lista.forEach(tarefa => criarLinha(tarefa));
    });

  // Enviar nova tarefa para o banco
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const categoria = document.getElementById('categoria').value;
    const obs = document.getElementById('obs').value.trim();

    if (!nome || !email || !categoria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaTarefa = {
      nome: nome,
      email: email,
      categoria: categoria,
      observacoes: obs,
      concluida: false
    };

    fetch('tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTarefa)
    })
    .then(res => {
      if (res.ok) {
        // Atualiza lista
        location.reload();
      }
    });
  });
});
