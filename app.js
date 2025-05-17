// 选择元素
const titleInput = document.getElementById('diary-title');
const contentInput = document.getElementById('diary-content');
const saveBtn = document.getElementById('save-btn');
const diaryList = document.getElementById('diary-list');
const userNameInput = document.getElementById('user-name');
const saveNameBtn = document.getElementById('save-name-btn');
const greetSpan = document.getElementById('greet');
const themeSelect = document.getElementById('theme-color');
const body = document.body;
const avatarUpload = document.getElementById('avatar-upload');
const avatarImg = document.getElementById('avatar-img');
const setPasswordInput = document.getElementById('set-password');
const savePasswordBtn = document.getElementById('save-password-btn');
const showDiaryBtn = document.getElementById('show-diary-btn');
const passwordModal = document.getElementById('password-modal');
const closeModal = document.getElementById('close-modal');
const inputPassword = document.getElementById('input-password');
const checkPasswordBtn = document.getElementById('check-password-btn');
const passwordError = document.getElementById('password-error');
const weatherSelect = document.getElementById('weather-select');
const weatherImgUpload = document.getElementById('weather-img-upload');
const weatherImg = document.getElementById('weather-img');
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

// 读取本地日记
function getDiaries() {
    return JSON.parse(localStorage.getItem('diaries') || '[]');
}

// 保存本地日记
function setDiaries(diaries) {
    localStorage.setItem('diaries', JSON.stringify(diaries));
}

// 读取姓名
function getUserName() {
    return localStorage.getItem('userName') || '';
}

// 保存姓名
function setUserName(name) {
    localStorage.setItem('userName', name);
}

// 读取主题色
function getTheme() {
    return localStorage.getItem('themeColor') || 'white';
}

// 保存主题色
function setTheme(theme) {
    localStorage.setItem('themeColor', theme);
}

// 头像
function getAvatar() {
    return localStorage.getItem('avatarImg') || '';
}
function setAvatar(dataUrl) {
    localStorage.setItem('avatarImg', dataUrl);
}

// 密码
function getPassword() {
    return localStorage.getItem('diaryPassword') || '';
}
function setPassword(pwd) {
    localStorage.setItem('diaryPassword', pwd);
}

// 天气
function getWeather() {
    return localStorage.getItem('weather') || '晴';
}
function setWeather(val) {
    localStorage.setItem('weather', val);
}
function getWeatherImg() {
    return localStorage.getItem('weatherImg') || '';
}
function setWeatherImg(dataUrl) {
    localStorage.setItem('weatherImg', dataUrl);
}

// 待办事项
function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}
function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 渲染日记列表
function renderDiaries() {
    const diaries = getDiaries();
    diaryList.innerHTML = '';
    diaries.slice().reverse().forEach((diary, idx) => {
        const li = document.createElement('li');
        li.className = 'diary-item';
        li.innerHTML = `
            <div class="diary-title">${diary.title || '无标题'}</div>
            <div class="diary-author">作者：${diary.author || '匿名'}</div>
            <div class="diary-date">${diary.date}</div>
            <div class="diary-content">${diary.content.replace(/\n/g, '<br>')}</div>
            <button class="delete-btn" data-idx="${diaries.length - 1 - idx}">删除</button>
        `;
        diaryList.appendChild(li);
    });
}

// 保存日记
saveBtn.onclick = function() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const author = getUserName() || '匿名';
    if (!content) {
        alert('内容不能为空！');
        return;
    }
    const diaries = getDiaries();
    diaries.push({
        title,
        content,
        author,
        date: new Date().toLocaleString('zh-CN')
    });
    setDiaries(diaries);
    titleInput.value = '';
    contentInput.value = '';
    renderDiaries();
};

// 删除日记

diaryList.onclick = function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const idx = Number(e.target.getAttribute('data-idx'));
        const diaries = getDiaries();
        diaries.splice(idx, 1);
        setDiaries(diaries);
        renderDiaries();
    }
};

// 保存姓名
saveNameBtn.onclick = function() {
    const name = userNameInput.value.trim();
    if (!name) {
        alert('姓名不能为空！');
        return;
    }
    setUserName(name);
    showGreet();
};

// 显示问候
function showGreet() {
    const name = getUserName();
    if (name) {
        greetSpan.textContent = `你好，${name}！`;
    } else {
        greetSpan.textContent = '';
    }
}

// 主题色切换
function applyTheme(theme) {
    body.classList.remove('theme-white', 'theme-black', 'theme-blue', 'theme-pink');
    body.classList.add('theme-' + theme);
}

themeSelect.onchange = function() {
    const theme = themeSelect.value;
    setTheme(theme);
    applyTheme(theme);
};

// 头像上传
avatarUpload.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        avatarImg.src = evt.target.result;
        avatarImg.style.display = 'block';
        setAvatar(evt.target.result);
    };
    reader.readAsDataURL(file);
};

// 渲染头像
function renderAvatar() {
    const avatar = getAvatar();
    if (avatar) {
        avatarImg.src = avatar;
        avatarImg.style.display = 'block';
    } else {
        avatarImg.src = '';
        avatarImg.style.display = 'none';
    }
}

// 密码设置
savePasswordBtn.onclick = function() {
    const pwd = setPasswordInput.value.trim();
    if (!pwd) {
        alert('密码不能为空！');
        return;
    }
    setPassword(pwd);
    alert('密码已设置！');
    setPasswordInput.value = '';
};

// 查看日记按钮
showDiaryBtn.onclick = function() {
    passwordModal.style.display = 'flex';
    inputPassword.value = '';
    passwordError.textContent = '';
};

// 关闭弹窗
closeModal.onclick = function() {
    passwordModal.style.display = 'none';
};

// 检查密码
checkPasswordBtn.onclick = function() {
    const pwd = inputPassword.value;
    if (pwd === getPassword()) {
        diaryList.style.display = 'block';
        passwordModal.style.display = 'none';
    } else {
        passwordError.textContent = '密码错误！';
    }
};

// 渲染天气
weatherSelect.onchange = function() {
    setWeather(weatherSelect.value);
};
weatherImgUpload.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        weatherImg.src = evt.target.result;
        weatherImg.style.display = 'inline-block';
        setWeatherImg(evt.target.result);
    };
    reader.readAsDataURL(file);
};
function renderWeather() {
    weatherSelect.value = getWeather();
    const img = getWeatherImg();
    if (img) {
        weatherImg.src = img;
        weatherImg.style.display = 'inline-block';
    } else {
        weatherImg.src = '';
        weatherImg.style.display = 'none';
    }
}

// 渲染待办事项
function renderTodos() {
    const todos = getTodos();
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" data-idx="${idx}" ${todo.done ? 'checked' : ''}>
            <span class="todo-text${todo.done ? ' todo-completed' : ''}">${todo.text}</span>
            <button class="todo-delete-btn" data-idx="${idx}">删除</button>
        `;
        todoList.appendChild(li);
    });
}

// 添加待办事项
addTodoBtn.onclick = function() {
    const text = todoInput.value.trim();
    if (!text) return;
    const todos = getTodos();
    todos.push({ text, done: false });
    setTodos(todos);
    todoInput.value = '';
    renderTodos();
};

// 删除待办事项
todoList.onclick = function(e) {
    const idx = e.target.getAttribute('data-idx');
    if (e.target.classList.contains('todo-delete-btn')) {
        const todos = getTodos();
        todos.splice(idx, 1);
        setTodos(todos);
        renderTodos();
    } else if (e.target.classList.contains('todo-checkbox')) {
        const todos = getTodos();
        todos[idx].done = e.target.checked;
        setTodos(todos);
        renderTodos();
    }
};

// 初始化
function init() {
    // 姓名
    const name = getUserName();
    userNameInput.value = name;
    showGreet();
    // 主题色
    const theme = getTheme();
    themeSelect.value = theme;
    applyTheme(theme);
    // 头像
    renderAvatar();
    // 日记
    renderDiaries();
    diaryList.style.display = 'none';
    // 天气
    renderWeather();
    // 待办事项
    renderTodos();
}

init(); 