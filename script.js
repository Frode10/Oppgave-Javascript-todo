     // Hent eksisterende todos fra localStorage
     const todos = JSON.parse(localStorage.getItem('todos')) || [];
     const completedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];

     // Funksjon for å legge til en ny todo
     function addTodo() {
         const todoInput = document.getElementById('todoInput');
         const todoTheme = document.getElementById('todoTheme');
         const todoDeadline = document.getElementById('todoDeadline');

         const todoText = todoInput.value.trim();
         const themeText = todoTheme.value.trim();
         const deadlineText = todoDeadline.value;

         if (todoText !== "" && themeText !== "" && deadlineText !== "") {
             const newTodo = { 
                 text: todoText, 
                 theme: themeText, 
                 deadline: deadlineText 
             };
             todos.push(newTodo);
             localStorage.setItem('todos', JSON.stringify(todos));

             todoInput.value = ''; 
             todoTheme.value = ''; 
             todoDeadline.value = ''; 

             renderTodos();
         }
     }

     // Funksjon for å markere todo som fullført
     function markAsDone(index) {
         const completedTodo = { 
             text: todos[index].text, 
             theme: todos[index].theme, 
             deadline: todos[index].deadline, 
             dateCompleted: new Date().toLocaleDateString() 
         };
         completedTodos.push(completedTodo);
         todos.splice(index, 1);

         localStorage.setItem('todos', JSON.stringify(todos));
         localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
         renderTodos();
     }

     // Funksjon for å slette en fullført todo
     function deleteTodo(index) {
         completedTodos.splice(index, 1);
         localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
         renderTodos();
     }

     // Funksjon for å vise todo-listen
     function renderTodos() {
         const todoList = document.getElementById('todoList');
         const completedList = document.getElementById('completedList');
         todoList.innerHTML = '';
         completedList.innerHTML = '';

         todos.forEach((todo, index) => {
             const todoItem = document.createElement('li');
             todoItem.classList.add('todo-item');
             todoItem.innerHTML = `
                 <strong>${todo.text}</strong>
                 <small>Tema: ${todo.theme}</small>
                 <small>Frist: ${todo.deadline}</small>
                 <button class="btn-done" onclick="markAsDone(${index})">Utført</button>
             `;
             todoList.appendChild(todoItem);
         });

         completedTodos.forEach((todo, index) => {
             const completedItem = document.createElement('li');
             completedItem.classList.add('completed-item');
             completedItem.innerHTML = `
                 <strong>${todo.text}</strong>
                 <small>Tema: ${todo.theme}</small>
                 <small>Frist: ${todo.deadline}</small>
                 <small>Fullført: ${todo.dateCompleted}</small>
                 <button class="btn-delete" onclick="deleteTodo(${index})">Slett</button>
             `;
             completedList.appendChild(completedItem);
         });
     }

     // Initial render av todo-liste
     renderTodos();