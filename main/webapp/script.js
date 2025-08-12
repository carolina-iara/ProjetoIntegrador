document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-tarefa');
  const tarefasLista = document.getElementById('tarefas-lista');

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

    const tr = document.createElement('tr');

    // Checkbox
    const tdCheck = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    tdCheck.appendChild(checkbox);

    // Nome
    const tdNome = document.createElement('td');
    tdNome.textContent = nome;

    // Email
    const tdEmail = document.createElement('td');
    tdEmail.textContent = email;

    // Categoria
    const tdCategoria = document.createElement('td');
    const spanCategoria = document.createElement('span');
    spanCategoria.textContent = categoria;
    spanCategoria.className = `categoria-${categoria}`;
    tdCategoria.appendChild(spanCategoria);

    // Observações
    const tdObs = document.createElement('td');
    tdObs.textContent = obs;

    // Ações
    const tdAcoes = document.createElement('td');
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = '🗑️ Excluir';
    btnExcluir.className = 'btn btn-sm btn-outline-secondary'; 
    btnExcluir.onclick = () => {
      if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tr.remove();
      }
    };
    tdAcoes.appendChild(btnExcluir);

    // Adiciona tudo na linha da tabela
    tr.appendChild(tdCheck);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdObs);
    tr.appendChild(tdAcoes);

    tarefasLista.appendChild(tr);
    form.reset();
  });
});
