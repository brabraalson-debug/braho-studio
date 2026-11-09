const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const projects=[['Identity in motion','An exploration of bold typography and a flexible identity system.','art-one','braho®','Ideas made<br>visible.'],['Form & Field','An editorial concept exploring the relationship between typography, form and space.','art-two','FORM<br>& FIELD','A different perspective.'],['The everyday collection','An art direction concept built around quiet forms and everyday objects.','art-three','less,<br>but better.','Objects / Culture / Design'],['Next chapter','A digital design concept with bold type and an open, expressive visual language.','art-four','NEXT<br>CHAPTER↗','New ideas. Open possibilities.']];
let featured=0;const spotlight=document.querySelector('.spotlight-image');
function cycle(direction){featured=(featured+direction+projects.length)%projects.length;const p=projects[featured];spotlight.className='spotlight-image art '+p[2];spotlight.querySelector('b').innerHTML=p[3];spotlight.querySelector('em').innerHTML=p[4];document.querySelector('#spotlight-title').replaceChildren(document.createTextNode(p[0]+' '),Object.assign(document.createElement('span'),{textContent:'↗'}));}
document.querySelector('#previous').addEventListener('click',()=>cycle(-1));document.querySelector('#next').addEventListener('click',()=>cycle(1));
const dialog=document.querySelector('dialog');document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const p=projects[Number(button.dataset.project)];document.querySelector('#dialog-title').textContent=p[0];document.querySelector('#dialog-copy').textContent=p[1];dialog.showModal();}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());document.querySelector('.dialog-done').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('details').forEach(other=>{if(other!==detail)other.open=false;});}));
// Set this to your public business email to enable the project enquiry button.
const contactEmail='';
document.querySelector('#contact-button').addEventListener('click',()=>{if(contactEmail){location.href='mailto:'+contactEmail+'?subject=Project%20enquiry%20%E2%80%94%20Braho%20Studio';}else{document.querySelector('#contact-status').textContent='Project enquiries will open here soon. Braho Studio contact details are being updated.';}});
document.querySelector('#year').textContent=new Date().getFullYear();
