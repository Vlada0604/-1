(function() {
container.innerHTML = `<div class="empty">Немає завдань для відображення.</div>`;
}
}
});


container.appendChild(li);
}
}


function escapeHtml(s) {
return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
}


// ініціалізація за типом сторінки
document.addEventListener('DOMContentLoaded', () => {
const page = document.body?.dataset?.page;


// підсвітка активної вкладки
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(a => {
const href = a.getAttribute('href');
if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) a.classList.add('active');
if (path === '' && href === './') a.classList.add('active');
});


if (page === 'home') {
// тільки завдання на сьогодні з dueDate === today
const today = todayStr();
renderList('#list', t => !t.completed && t.dueDate === today);
}


if (page === 'in-progress') {
// лише невиконані
renderList('#list', t => !t.completed);
}


if (page === 'done') {
renderList('#list', t => t.completed);
}


if (page === 'add') {
const form = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('due');


form.addEventListener('submit', (e) => {
e.preventDefault();
const title = titleInput.value.trim();
const due = dateInput.value || null; // YYYY-MM-DD або null
if (!title) {
alert('Введи назву завдання');
titleInput.focus();
return;
}
addTask(title, due);
form.reset();
// після додавання переходимо у "В процесі"
location.href = 'in-progress.html';
});
}
});
})();
