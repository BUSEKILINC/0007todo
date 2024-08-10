document.addEventListener('DOMContentLoaded', (event) => {
    const addBtn = document.getElementById('addBtn');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    // Sayfa yüklendiğinde görevleri localStorage'dan yükle
    loadTodos();

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
        todoSpan.className = 'todo-text';
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
            const editInput = listItem.querySelector('input');
            if (editInput) {
                todoSpan.innerText = editInput.value;
                listItem.removeChild(editInput);
                todoSpan.style.display = 'inline';
                editBtn.style.display = 'inline-block';
                saveBtn.style.display = 'none';
                deleteBtn.style.display = 'inline-block';
                completeBtn.style.display = 'inline-block'; // Tamamlandı butonunu tekrar göster

                // Güncellenmiş veriyi localStorage'a kaydet
                saveTodos();
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.innerText = 'Sil';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Silmek istediğinizden emin misiniz?')) {
                listItem.remove();
                saveTodos(); // Güncellenmiş veriyi localStorage'a kaydet
            }
        });

        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-secondary btn-sm';
        completeBtn.innerText = 'Tamamlandı';
        completeBtn.addEventListener('click', () => {
            todoSpan.style.textDecoration = 'line-through';
            alert('Görev tamamlandı.');
            saveTodos(); // Güncellenmiş veriyi localStorage'a kaydet
        });

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(saveBtn);
        btnGroup.appendChild(deleteBtn);
        btnGroup.appendChild(completeBtn);

        listItem.appendChild(todoSpan);
        listItem.appendChild(btnGroup);

        todoList.appendChild(listItem);

        todoInput.value = '';
        saveTodos(); // Yeni eklenen veriyi localStorage'a kaydet
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(item => {
            const text = item.querySelector('.todo-text').innerText;
            const isCompleted = item.querySelector('.todo-text').style.textDecoration === 'line-through';
            todos.push({ text, isCompleted });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

            const todoSpan = document.createElement('span');
            todoSpan.className = 'todo-text';
            todoSpan.innerText = todo.text;
            if (todo.isCompleted) {
                todoSpan.style.textDecoration = 'line-through';
            }

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
                const editInput = listItem.querySelector('input');
                if (editInput) {
                    todoSpan.innerText = editInput.value;
                    listItem.removeChild(editInput);
                    todoSpan.style.display = 'inline';
                    editBtn.style.display = 'inline-block';
                    saveBtn.style.display = 'none';
                    deleteBtn.style.display = 'inline-block';
                    completeBtn.style.display = 'inline-block'; // Tamamlandı butonunu tekrar göster

                    // Güncellenmiş veriyi localStorage'a kaydet
                    saveTodos();
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.innerText = 'Sil';
            deleteBtn.addEventListener('click', () => {
                if (confirm('Silmek istediğinizden emin misiniz?')) {
                    listItem.remove();
                    saveTodos(); // Güncellenmiş veriyi localStorage'a kaydet
                }
            });

            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-secondary btn-sm';
            completeBtn.innerText = 'Tamamlandı';
            completeBtn.addEventListener('click', () => {
                todoSpan.style.textDecoration = 'line-through';
                alert('Görev tamamlandı.');
                saveTodos(); // Güncellenmiş veriyi localStorage'a kaydet
            });

            btnGroup.appendChild(editBtn);
            btnGroup.appendChild(saveBtn);
            btnGroup.appendChild(deleteBtn);
            btnGroup.appendChild(completeBtn);

            listItem.appendChild(todoSpan);
            listItem.appendChild(btnGroup);

            todoList.appendChild(listItem);
        });
    }
});
