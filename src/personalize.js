import { profile, projects } from './profile.js';
document.documentElement.classList.toggle('motion-off', new URLSearchParams(location.search).get('motion') === 'off');

const dialog = document.querySelector('#projectDialog');
const projectList = document.createElement('section');
projectList.className = 'profile-section';
projectList.setAttribute('aria-labelledby', 'projectListTitle');
projectList.innerHTML = '<p class="profile-kicker">Selected experience</p><h2 id="projectListTitle">The work behind the visuals</h2><div class="project-list"></div>';
document.querySelector('#contact').before(projectList);
projects.forEach((project, i) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `${String(i + 1).padStart(2, '0')} / ${project.title} ↗`;
  button.addEventListener('click', () => openProject(i));
  projectList.querySelector('.project-list').append(button);
});
function openProject(i) {
  const project = projects[i];
  dialog.querySelector('h2').textContent = project.title;
  dialog.querySelector('.project-client').textContent = project.client;
  dialog.querySelector('.project-description').textContent = project.description;
  dialog.showModal();
}
document.querySelector('#galleryDeck').addEventListener('click', (e) => {
  const card = e.target.closest('.g-card');
  if (!card) return;
  openProject(Number(card.dataset.i));
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

document.querySelectorAll('[data-nav]').forEach((a) => {
  const targets = { Home: '#home', Work: '#gallery', About: '#about', Experience: '#chrono', Contact: '#contact' };
  a.href = targets[a.textContent.trim()] || '#home';
});
document.querySelectorAll('[data-email]').forEach((a) => a.href = `mailto:${profile.email}`);
if (profile.portrait) {
  const photo = document.querySelector('#aboutPhoto');
  photo.src = profile.portrait;
  photo.hidden = false;
  photo.addEventListener('error', () => { photo.hidden = true; });
}

// A paused experience is available independently of the OS motion setting.
const motionLink = document.querySelector('#motionLink');
const url = new URL(location.href);
if (url.searchParams.get('motion') === 'off') {
  motionLink.textContent = 'Play motion'; url.searchParams.delete('motion');
} else { motionLink.textContent = 'Pause motion'; url.searchParams.set('motion', 'off'); }
motionLink.href = url.href;
