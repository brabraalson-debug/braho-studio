const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const projects=[{"title": "AURA", "category": "Performance streetwear concept", "description": "Selected name; proposed sector. Sweeping geometry, bold typography and acid accents create a direction built around speed.", "images": [{"src": "assets/identity/aura-0.webp", "alt": "AURA \u2014 Signature", "width": 990, "height": 510}, {"src": "assets/identity/aura-1.webp", "alt": "AURA \u2014 Palette & typography", "width": 1191, "height": 536}, {"src": "assets/identity/aura-2.webp", "alt": "AURA \u2014 Campaign study", "width": 715, "height": 460}, {"src": "assets/identity/aura-3.webp", "alt": "AURA \u2014 Packaging study", "width": 715, "height": 460}, {"src": "assets/identity/aura-sweep.webp", "alt": "AURA \u2014 Graphic language", "width": 824, "height": 300, "caption": "Sweep lines, cropped trajectories and hard-edged framing.", "note": "Patterns stay away from small text and the logo."}], "artDirection": "aura", "labels": ["Signature", "Palette & typography", "Campaign study", "Packaging study", "Graphic language"]}, {"title": "AVEN", "category": "Outdoor identity concept", "description": "Working name and proposed sector. Forest tones, open typography and contour graphics form a calm outdoor identity.", "images": [{"src": "assets/identity/aven-0.webp", "alt": "AVEN \u2014 Signature", "width": 990, "height": 510}, {"src": "assets/identity/aven-1.webp", "alt": "AVEN \u2014 Palette & typography", "width": 1191, "height": 536}, {"src": "assets/identity/aven-2.webp", "alt": "AVEN \u2014 Campaign study", "width": 715, "height": 460}, {"src": "assets/identity/aven-3.webp", "alt": "AVEN \u2014 Packaging study", "width": 715, "height": 460}, {"src": "assets/identity/aven-4.webp", "alt": "AVEN \u2014 Graphic language", "width": 735, "height": 470}], "artDirection": "aven", "labels": ["Signature", "Palette & typography", "Campaign study", "Packaging study", "Graphic language"]}, {"title": "SXC", "category": "Experimental label concept", "description": "Existing name; proposed sector. A celestial mark, ultraviolet palette and orbital lines explore a cultural design direction. Application studies retain the alternate wordmark shown in the source review.", "images": [{"src": "assets/identity/sxc-signature.svg", "alt": "SXC \u2014 corrected outlined signature", "width": 595, "height": 557}, {"src": "assets/identity/sxc-1.webp", "alt": "SXC \u2014 Palette & typography", "width": 1191, "height": 536}, {"src": "assets/identity/sxc-2.webp", "alt": "SXC \u2014 Campaign study", "width": 715, "height": 460}, {"src": "assets/identity/sxc-3.webp", "alt": "SXC \u2014 Packaging study", "width": 715, "height": 460}, {"src": "assets/identity/sxc-4.webp", "alt": "SXC \u2014 Graphic language", "width": 735, "height": 470}], "artDirection": "sxc", "labels": ["Signature", "Palette & typography", "Campaign study", "Packaging study", "Graphic language"]}, {"title": "NEURO//DIVINITY", "category": "Cover artwork / Packaging", "description": "A collection of cover artwork, CD packaging and printed layouts. Monochrome textures and vivid green accents connect the pieces into a consistent visual language.", "images": [{"src": "assets/work/neuro-divinity-01.webp", "alt": "NEURO//DIVINITY \u2014 NEURO COVERART", "width": 1800, "height": 1658}, {"src": "assets/work/neuro-divinity-02.webp", "alt": "NEURO//DIVINITY \u2014 2PAGE", "width": 1800, "height": 962}, {"src": "assets/work/neuro-divinity-04.webp", "alt": "NEURO//DIVINITY \u2014 CD BOOK", "width": 1800, "height": 928}, {"src": "assets/work/neuro-divinity-05.webp", "alt": "NEURO//DIVINITY \u2014 CDCD", "width": 1020, "height": 1000}, {"src": "assets/work/neuro-divinity-09.webp", "alt": "NEURO//DIVINITY \u2014 track list", "width": 1800, "height": 1271}], "artDirection": "neuro"}, {"title": "The Last Prophecy", "category": "Poster design / Typography", "description": "A poster series combining intricate lettering, distressed textures and contrasting colour treatments. Explore the variations below.", "images": [{"src": "assets/work/the-last-prophecy-04.webp", "alt": "The Last Prophecy \u2014 THE LAST PROPHECY colorless", "width": 1295, "height": 1800}, {"src": "assets/work/the-last-prophecy-03.webp", "alt": "The Last Prophecy \u2014 THE LAST PROPHECY Pink&Green", "width": 1295, "height": 1800}, {"src": "assets/work/the-last-prophecy-05.webp", "alt": "The Last Prophecy \u2014 THE LAST PROPHECY longTEXT", "width": 1295, "height": 1800}, {"src": "assets/work/the-last-prophecy-01.webp", "alt": "The Last Prophecy \u2014 THE LAST PROPHECY Dark&Red", "width": 1350, "height": 1800}], "artDirection": "prophecy"}];
let featured=0;
const spotlight=document.querySelector('.spotlight-image');
function cycle(direction){
 featured=(featured+direction+projects.length)%projects.length;
 const p=projects[featured], im=p.images[0], img=spotlight.querySelector('img');
 img.src=im.src;img.alt=im.alt;img.width=im.width;img.height=im.height;
 document.querySelector('#spotlight-title').replaceChildren(document.createTextNode(p.title+' '),Object.assign(document.createElement('span'),{textContent:'↗'}));
}
document.querySelector('#previous').addEventListener('click',()=>cycle(-1));
document.querySelector('#next').addEventListener('click',()=>cycle(1));
const dialog=document.querySelector('dialog');
let activeProject=0,activeImage=0;
function renderGallery(){
 const p=projects[activeProject],im=p.images[activeImage],gallery=document.querySelector('#dialog-gallery');
 dialog.dataset.artDirection=p.artDirection||(activeProject===0?'neuro':'prophecy');
 const stage=document.createElement('div');stage.className='gallery-stage';
 const picture=document.createElement('img');Object.assign(picture,{src:im.src,alt:im.alt,width:im.width,height:im.height});stage.append(picture);
 if(im.caption){stage.classList.add('gallery-explainer');const copy=document.createElement('div'),text=document.createElement('p'),note=document.createElement('p');copy.className='gallery-art-copy';text.textContent=im.caption;note.textContent=im.note;note.className='gallery-art-note';copy.append(text,note);stage.append(copy);}
 if(p.labels){const caption=document.createElement('p');caption.className='gallery-section-label';caption.textContent=p.labels[activeImage];stage.append(caption);}
 const controls=document.createElement('div');controls.className='gallery-controls';
 const prev=document.createElement('button'),next=document.createElement('button'),count=document.createElement('p');
 prev.className='gallery-prev';next.className='gallery-next';prev.setAttribute('aria-label','Previous image');next.setAttribute('aria-label','Next image');prev.innerHTML='<span class="gallery-arrow" aria-hidden="true">←</span><span>Previous</span>';next.innerHTML='<span>Next</span><span class="gallery-arrow" aria-hidden="true">→</span>';count.setAttribute('role','status');count.textContent=String(activeImage+1).padStart(2,'0')+' / '+String(p.images.length).padStart(2,'0');
 prev.addEventListener('click',()=>changeImage(-1));next.addEventListener('click',()=>changeImage(1));controls.append(prev,count,next);
 const thumbs=document.createElement('div');thumbs.className='gallery-thumbs';thumbs.setAttribute('aria-label','Choose an image');
 p.images.forEach((item,index)=>{const button=document.createElement('button'),img=document.createElement('img');button.setAttribute('aria-label',p.labels?'Show '+p.labels[index]:'Show image '+(index+1));button.setAttribute('aria-pressed',String(index===activeImage));Object.assign(img,{src:item.src,alt:'',loading:'lazy'});button.append(img);button.addEventListener('click',()=>{activeImage=index;renderGallery();document.querySelectorAll('.gallery-thumbs button')[index].focus({preventScroll:true});});thumbs.append(button);});
 gallery.replaceChildren(stage,controls,thumbs);
}
function changeImage(direction){
 const focused=document.activeElement?.closest('.gallery-controls button')?.className;
 activeImage=(activeImage+direction+projects[activeProject].images.length)%projects[activeProject].images.length;renderGallery();
 if(focused==='gallery-prev')document.querySelector('.gallery-controls button').focus({preventScroll:true});
 if(focused==='gallery-next')document.querySelector('.gallery-controls button:last-child').focus({preventScroll:true});
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 activeProject=Number(button.dataset.project);activeImage=Number(button.dataset.image||0);
 const p=projects[activeProject];document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-copy').textContent=p.description;
 renderGallery();dialog.showModal();dialog.scrollTop=0;
}));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();changeImage(event.key==='ArrowRight'?1:-1);}});
dialog.addEventListener('close',()=>{document.body.classList.remove('project-open');});
new MutationObserver(()=>document.body.classList.toggle('project-open',dialog.open)).observe(dialog,{attributes:true,attributeFilter:['open']});
document.querySelector('.close').addEventListener('click',()=>dialog.close());document.querySelector('.dialog-done').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('details').forEach(other=>{if(other!==detail)other.open=false;});}));
// Set this to your public business email to enable the project enquiry button.
const contactEmail='';
document.querySelector('#contact-button').addEventListener('click',()=>{if(contactEmail){location.href='mailto:'+contactEmail+'?subject=Project%20enquiry%20%E2%80%94%20Braho%20Studio';}else{document.querySelector('#contact-status').textContent='Project enquiries will open here soon. Braho Studio contact details are being updated.';}});
document.querySelector('#year').textContent=new Date().getFullYear();

// Ease horizontal logo travel toward document scroll position in either direction.
const logoTrack=document.querySelector('.logo-track');
const logoMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let logoFrame=0,logoPosition=window.scrollY*.35;
function drawLogos(){
 logoFrame=0;
 if(logoMotion.matches){logoTrack.style.transform='none';return;}
 const target=window.scrollY*.35;
 logoPosition+=(target-logoPosition)*.09;
 const width=logoTrack.querySelector('.logo-set').getBoundingClientRect().width;
 if(width)logoTrack.style.transform='translate3d('+(-(logoPosition%width))+'px,0,0)';
 if(Math.abs(target-logoPosition)>.1)logoFrame=requestAnimationFrame(drawLogos);
}
function scheduleLogos(){if(!logoFrame)logoFrame=requestAnimationFrame(drawLogos);}
window.addEventListener('scroll',scheduleLogos,{passive:true});
window.addEventListener('resize',scheduleLogos);
logoMotion.addEventListener('change',scheduleLogos);
scheduleLogos();

// Reveal editorial text once on entry; respect reduced-motion preferences.
const textMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window && !textMotion.matches){
 const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});
 },{threshold:0,rootMargin:'0px 0px -24px 0px'});
 document.querySelectorAll('.hero .intro>p,.hero h1,.section .eyebrow,.section h2,.about-copy>p,.section-head>.muted,.process-grid h3,.contact-bottom>p').forEach((el,index)=>{
  el.style.setProperty('--reveal-delay',(index%3)*90+'ms');
  el.classList.add('text-reveal');revealObserver.observe(el);
 });
 textMotion.addEventListener('change',()=>{
  if(textMotion.matches){revealObserver.disconnect();document.querySelectorAll('.text-reveal').forEach(el=>el.classList.add('is-visible'));}
 });
}

// Stagger project entrances once, leaving controls stable after entry.
if('IntersectionObserver' in window && !textMotion.matches){
 const projectObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');projectObserver.unobserve(entry.target);}});
 },{threshold:0,rootMargin:'0px 0px -24px 0px'});
 document.querySelectorAll('.project').forEach((card,index)=>{
  card.style.setProperty('--project-delay',(index%2)*140+'ms');
  card.classList.add('project-reveal');projectObserver.observe(card);
  card.addEventListener('focus',()=>{card.classList.add('is-visible');projectObserver.unobserve(card);});
 });
 textMotion.addEventListener('change',()=>{
  if(textMotion.matches){projectObserver.disconnect();document.querySelectorAll('.project-reveal').forEach(card=>card.classList.add('is-visible'));}
 });
}
