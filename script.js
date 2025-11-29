// script.js — tiny interactions


// Simple fade-in on page load
window.addEventListener('DOMContentLoaded', ()=>{
document.body.style.opacity = '0';
document.body.style.transition = 'opacity .45s ease';
requestAnimationFrame(()=>{ document.body.style.opacity = '1'; });


// Add subtle hover shadow to thumbnails (for devices that support hover)
const supportsHover = window.matchMedia('(hover: hover)').matches;
if(supportsHover){
document.querySelectorAll('.thumbnail').forEach(el=>{
el.addEventListener('mousemove', (e)=>{
const rX = (e.offsetX - el.offsetWidth/2)/10;
const rY = (e.offsetY - el.offsetHeight/2)/10;
el.style.transform = `rotateX(${ -rY }deg) rotateY(${ rX }deg) translateZ(0)`;
});
el.addEventListener('mouseleave', ()=> el.style.transform = '');
});
}
});

function qs(s){return document.querySelector(s)}
function qsa(s){return document.querySelectorAll(s)}


document.addEventListener('DOMContentLoaded', ()=>{
// Modal preview
const modal = qs('#modal');
const modalContent = qs('#modal-content img');
const closeBtn = qs('#modal-close');


qsa('.preview-btn').forEach(btn=>{
btn.addEventListener('click', (e)=>{
const id = btn.dataset.target || btn.getAttribute('data-target');
// choose image path dynamically — here we use assets/placeholder{id}.jpg
modalContent.src = `assets/placeholder${id}.jpg`;
modal.setAttribute('aria-hidden','false');
});
});
closeBtn.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.setAttribute('aria-hidden','true') });


// Filter & search
const filter = qs('#filter');
const search = qs('#search');
const cards = Array.from(qsa('.card'));


function applyFilters(){
const q = search.value.trim().toLowerCase();
const type = filter.value;
cards.forEach(card=>{
const title = (card.querySelector('h3')?.textContent||'').toLowerCase();
const isType = (type === 'all') ? true : card.dataset.type === type;
const matchesQ = q === '' ? true : title.includes(q);
card.style.display = (isType && matchesQ) ? '' : 'none';
});
}


filter.addEventListener('change', applyFilters);
search.addEventListener('input', applyFilters);
});