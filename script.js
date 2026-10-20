const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],
h=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const seedStr=$('#seed').textContent,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');if(t.dataset.count)count(t);io.unobserve(t)}),{threshold:.15});
function count(el){const m=el.textContent.match(/^(\d+)(.*)$/);if(!m||reduce)return;const n=+m[1],len=m[1].length,t0=performance.now();
(function f(t){const p=Math.min((t-t0)/1300,1),v=Math.round(n*(1-Math.pow(1-p,3)));el.textContent=String(v).padStart(len,'0')+m[2];if(p<1)requestAnimationFrame(f)})(t0)}
let P=[],flt='All',lim=9,fresh=true;
function pcard(p,i){const b=p.title.split(' – ')[0],g=P.indexOf(p),
im=p.image?`<img src="${h(p.image)}" alt="${h(p.title)}" loading="lazy">`:`<div class="mk l${i%3}" style="--c:${h(p.color||'#0e7c66')}"><div class="mb"><i></i><i></i><i></i></div><div class="mn"><b>${h(b)}</b><span></span><span></span><span></span></div><div class="mh"><u></u><u></u><em></em></div><div class="mc"><s></s><s></s><s></s></div></div>`;
return `<div class="pj reveal${fresh?'':' in'}" style="--i:${i%3}" role="button" tabindex="0" data-i="${g}" aria-label="Open ${h(p.title)}"><div class="im">${im}${p.demo?'<span class="demo">Concept</span>':''}<span class="view">View project <i class="fa-solid fa-arrow-right"></i></span></div><div class="b"><small>${h(p.tag)}</small><h4>${h(p.title)}</h4></div></div>`}
function site(p,g){const b=p.title.split(' – ')[0],kind=p.title.split(' – ')[1]||p.tag,f=p.features&&p.features.length?p.features:['Quality','Speed','Support'];
return `<div class="sp l${g%3}" style="--c:${h(p.color||'#0e7c66')}"><div class="sn"><b>${h(b)}</b><span>Home</span><span>About</span><span>Services</span><span>Contact</span><em>Get started</em></div>
<div class="sh"><div class="st"><small>${h(kind)}</small><h5>${h(p.headline||p.title)}</h5><p>${h(p.sub||'')}</p><i class="sb">Get started</i></div><div class="sv"><span>${h(b[0])}</span></div></div>
<div class="sfs">${f.map(x=>`<div><i class="fa-solid fa-circle-check"></i><b>${h(x)}</b><p>Designed for a smooth, modern experience.</p></div>`).join('')}</div>
<div class="ssp"><div><span>01</span>Explore</div><div><span>02</span>Connect</div><div><span>03</span>Enjoy</div></div>
<div class="scta"><h5>Ready to get started?</h5><i class="sb">Contact us</i></div><div class="sft">© ${h(b)}</div></div>`}
function openP(g){const p=P[g];if(!p)return;const cta=$('#pmCta');
$('#pmTag').textContent=p.tag+(p.demo?' · Concept design':'');$('#pmTitle').textContent=p.title;
$('#pmBody').innerHTML=p.image?`<img class="pmi" src="${h(p.image)}" alt="${h(p.title)}">`:site(p,g);
$('#pmNote').textContent=p.demo?'A concept design created to show my style and approach, not a delivered client project.':'Want results like this for your business?';
if(p.link){cta.textContent='Visit live site';cta.href=p.link;cta.target='_blank';cta.rel='noopener'}else{cta.textContent='Request a similar website';cta.href='#contact';cta.removeAttribute('target')}
$('#pmBody').scrollTop=0;document.documentElement.classList.add('lock');$('#pm').showModal()}
function renderProjects(){const tags=['All',...new Set(P.map(p=>p.tag))],list=P.filter(p=>flt==='All'||p.tag===flt);
$('#filters').innerHTML=tags.map(t=>`<button class="${t===flt?'on':''}" data-t="${h(t)}">${h(t)}</button>`).join('');
$('#projectList').innerHTML=list.slice(0,lim).map(pcard).join('');$('#more').hidden=list.length<=lim;fresh=false;
$$('.reveal:not(.in)').forEach(e=>io.observe(e))}
function render(d){
document.title=d.name+' | '+d.role;
$('#logo').textContent=$('#flogo').textContent=$('#name').textContent=d.name;$('#role').textContent=d.role;$('#intro').textContent=d.intro;
$('#heroImg').setAttribute('href',d.hero_image);$('#aboutImg').src=d.about_image;
$('#chipNum').textContent=d.stats&&d.stats[0]?d.stats[0].number:'';
$('#aboutTitle').textContent=d.about_title;$('#aboutText').textContent=d.about_text;
$('#hAbout').textContent=d.about_text.length>170?d.about_text.slice(0,167).replace(/\s+\S*$/,'')+'…':d.about_text;
const bar=s=>`<div class="bar"><span style="width:${+s.level||0}%"></span></div>`;
$('#hSkills').innerHTML=(d.skills||[]).slice(0,4).map(s=>`<div class="mi"><div><span>${h(s.name)}</span><span>${h(s.level)}%</span></div>${bar(s)}</div>`).join('');
$('#hProjects').innerHTML=(d.projects||[]).slice(0,3).map(p=>`<div class="hp"><div class="th">${p.image?`<img src="${h(p.image)}" alt="">`:''}</div><div><b>${h(p.title)}</b><small>${h(p.tag)}</small></div></div>`).join('');
$('#stats').innerHTML=(d.stats||[]).map((s,i)=>`<div class="reveal" style="--i:${i}"><b data-count="1">${h(s.number)}</b>${h(s.label)}</div>`).join('');
$('#serviceList').innerHTML=(d.services||[]).map((s,i)=>`<div class="card reveal" style="--i:${i%3}"><span class="ic"><i class="${h(s.icon)}"></i></span><h4>${h(s.title)}</h4><p>${h(s.text)}</p></div>`).join('');
$('#skillList').innerHTML=(d.skills||[]).map(s=>`<div class="sk reveal"><div><span>${h(s.name)}</span><span>${h(s.level)}%</span></div>${bar(s)}</div>`).join('');
P=d.projects||[];fresh=true;renderProjects();
$('#reviewList').innerHTML=(d.reviews||[]).map((r,i)=>`<div class="card rv reveal" style="--i:${i}"><p>“${h(r.text)}”</p><b>${h(r.name)}</b></div>`).join('');
const p=String(d.phone).replace(/\D/g,''),w=p.startsWith('88')?p:'88'+p;
$('#mail').textContent=$('#fmail').textContent=d.email;$('#mail').href=$('#fmail').href='mailto:'+d.email;
$('#tel').textContent=$('#ftel').textContent=d.phone;$('#tel').href=$('#ftel').href='tel:+'+w;$('#wa').href='https://wa.me/'+w;
$('#fServices').innerHTML=(d.services||[]).map(s=>`<li>${h(s.title)}</li>`).join('');
$('#soc').innerHTML=$('#heroSoc').innerHTML=[[d.facebook,'fa-brands fa-facebook-f','Facebook'],[d.linkedin,'fa-brands fa-linkedin-in','LinkedIn'],['https://wa.me/'+w,'fa-brands fa-whatsapp','WhatsApp'],['mailto:'+d.email,'fa-solid fa-envelope','Email']].filter(x=>x[0]).map(x=>`<a href="${h(x[0])}" target="_blank" rel="noopener" aria-label="${x[2]}"><i class="${x[1]}"></i></a>`).join('');
$('#foot').textContent='© '+new Date().getFullYear()+' '+d.name+'. All rights reserved.';
$$('.reveal:not(.in),.bar:not(.in)').forEach(e=>io.observe(e));
}
render(JSON.parse(seedStr));
fetch('content/site.json',{cache:'no-store'}).then(r=>r.json()).then(j=>{if(JSON.stringify(j)!==JSON.stringify(JSON.parse(seedStr)))render(j)}).catch(()=>{});
const hd=$('#hd'),links=$$('#nav a');
addEventListener('scroll',()=>hd.classList.toggle('sc',scrollY>10),{passive:true});
$('#burger').onclick=()=>{const o=hd.classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)};
links.forEach(a=>a.addEventListener('click',()=>{hd.classList.remove('open');$('#burger').setAttribute('aria-expanded',false)}));
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
links.forEach(a=>{const s=$(a.getAttribute('href'));if(s)spy.observe(s)});
if(window.netlifyIdentity){netlifyIdentity.on('init',u=>{if(!u)netlifyIdentity.on('login',()=>{location.href='/admin/'})})}
$('#filters').onclick=e=>{const b=e.target.closest('button');if(b){flt=b.dataset.t;lim=9;renderProjects()}};$('#more').onclick=()=>{lim+=9;renderProjects()};
const pm=$('#pm');$('#projectList').addEventListener('click',e=>{const c=e.target.closest('.pj');if(c)openP(+c.dataset.i)});
$('#projectList').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('pj')){e.preventDefault();openP(+e.target.dataset.i)}});
$('#pmX').onclick=()=>pm.close();pm.addEventListener('click',e=>{if(e.target===pm)pm.close()});pm.addEventListener('close',()=>document.documentElement.classList.remove('lock'));
$('#pmCta').addEventListener('click',()=>{if(!$('#pmCta').target)pm.close()});
