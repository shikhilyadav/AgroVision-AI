const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');
if (menuButton) menuButton.addEventListener('click', () => { mainNav.classList.toggle('open'); menuButton.textContent = mainNav.classList.contains('open') ? '×' : '☰'; });
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => mainNav?.classList.remove('open')));
const input = document.getElementById('cropInput');
const uploadButton = document.getElementById('uploadButton');
const preview = document.getElementById('uploadPreview');
if (uploadButton && input) uploadButton.addEventListener('click', () => input.click());
if (input) input.addEventListener('change', () => { const file = input.files[0]; if (!file) return; preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`; preview.classList.add('has-image'); preview.innerHTML = '<button class="change-photo" type="button">Change photo</button>'; preview.querySelector('button').addEventListener('click', () => input.click()); uploadButton.textContent = '⌁ Choose another photo'; });
