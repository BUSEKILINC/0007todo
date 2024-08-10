document.addEventListener('DOMContentLoaded', (event) => {
    const addBtn = document.getElementById('addBtn');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    addBtn.addEventListener('click', addTodo);

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            alert('Lütfen görev giriniz.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const todoSpan = document.createElement('span');
        todoSpan.className = 'todo-text'; // Stil için sınıf ekleyin
        todoSpan.innerText = todoText;

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-warning btn-sm';
        editBtn.innerText = 'Düzenle';
        editBtn.addEventListener('click', () => {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.className = 'form-control';
            editInput.value = todoSpan.innerText;
            listItem.insertBefore(editInput, btnGroup);
            todoSpan.style.display = 'none';
            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline-block';
            deleteBtn.style.display = 'inline-block';
            completeBtn.style.display = 'none'; // Tamamlandı butonunu gizle
        });

        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn btn-success btn-sm';
        saveBtn.innerText = 'Kaydet';
        saveBtn.style.display = 'none';
        saveBtn.addEventListener('click', () => {
            todoSpan.innerText = editInput.value;
            listItem.removeChild(editInput);
            todoSpan.style.display = 'inline';
            editBtn.style.display = 'inline-block';
            saveBtn.style.display = 'none';
            deleteBtn.style.display = 'inline-block';
            completeBtn.style.display = 'inline-block'; // Tamamlandı butonunu tekrar göster
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.innerText = 'Sil';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Silmek istediğinizden emin misiniz?')) {
                listItem.remove();
            }
        });

        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-secondary btn-sm';
        completeBtn.innerText = 'Tamamlandı';
        completeBtn.addEventListener('click', () => {
            todoSpan.style.textDecoration = 'line-through';
            alert('Görev tamamlandı.');
        });

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(saveBtn);
        btnGroup.appendChild(deleteBtn);
        btnGroup.appendChild(completeBtn);

        listItem.appendChild(todoSpan);
        listItem.appendChild(btnGroup);

        todoList.appendChild(listItem);

        todoInput.value = '';
    }
});
