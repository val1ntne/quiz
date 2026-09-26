import {moveRowMarker,celebrateAnswer,revealColumn} from './motion.mjs';
import {puzzles,normalize,newGame,solve,nextUnsolved,unlockedKeyword} from './puzzle.mjs';
import {messages} from './i18n.mjs';
const $=s=>document.querySelector(s);
const photoSource='https://www.archives.gov/research/still-pictures/highlights/uss-arizona-burning';
let language='vi';
try{const saved=localStorage.getItem('history-language');if(saved==='vi'||saved==='en')language=saved;}catch{}
const games={vi:newGame(),en:newGame()};
const current=()=>games[language],puzzle=()=>puzzles[language],t=k=>messages[language][k];
const input=$('#answer'),grid=$('#crossword'),nav=$('#question-nav'),feedback=$('#feedback');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let revealController;
function cancelReveal(){revealController?.abort();revealController=null;}
const num=n=>String(n).padStart(2,'0');
function motion(el,frames,options={}){if(!el||reduced.matches||!el.animate)return;el.getAnimations().forEach(a=>a.cancel());return el.animate(frames,{duration:210,easing:'cubic-bezier(.22,1,.36,1)',...options});}
function openDialog(dialog){if(dialog.open)return;cancelReveal();dialog.showModal();motion(dialog,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}]);if(dialog.id==='complete-dialog')dialog.querySelectorAll('.result-letters span').forEach((el,i)=>motion(el,[{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{delay:80+i*65,duration:400,fill:'backwards'}));}
function makeBoard(){
 const g=current(),p=puzzle();grid.replaceChildren();nav.replaceChildren();grid.style.setProperty('--columns',p.columns);
 p.questions.forEach((q,i)=>{
  const row=document.createElement('button');row.type='button';row.className='cross-row';row.dataset.index=i;
  row.classList.toggle('active',g.active===i);row.classList.toggle('solved',g.solved[i]);row.setAttribute('aria-pressed',g.active===i);
  row.setAttribute('aria-label',`${t('across')} ${i+1}, ${q.normalized.length} ${t('letters')}${g.solved[i]?`, ${t('solved')}: ${q.answer}`:''}`);
  const n=document.createElement('span');n.className='row-number';n.textContent=num(i+1);n.setAttribute('aria-hidden','true');row.append(n);
  const value=g.solved[i]?q.normalized:normalize(g.drafts[i]);
  for(let col=0;col<p.columns;col++){const cell=document.createElement('span'),offset=col-q.start;cell.setAttribute('aria-hidden','true');if(offset>=0&&offset<q.normalized.length){cell.className='letter'+(col===p.keyColumn?' key-cell':'');cell.textContent=value[offset]||'';}else cell.className='blank-cell';row.append(cell);}
  row.addEventListener('click',()=>select(i,true));
  row.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const next=(i+(e.key==='ArrowDown'?1:6))%7;select(next,false);grid.children[next].focus();}});grid.append(row);
  const button=document.createElement('button');button.type='button';button.textContent=num(i+1);button.classList.toggle('active',g.active===i);button.classList.toggle('solved',g.solved[i]);button.setAttribute('aria-pressed',g.active===i);button.setAttribute('aria-label',`${t('across')} ${i+1}${g.solved[i]?`, ${t('solved')}`:''}`);button.addEventListener('click',()=>select(i,true));nav.append(button);
 });
 moveRowMarker(grid,g.active);
}
function clearFeedback(){feedback.textContent='';feedback.className='';$('.answer-wrap').classList.remove('invalid');input.removeAttribute('aria-invalid');}
function countInput(){$('#input-count').textContent=`${normalize(input.value).length}/${puzzle().questions[current().active].normalized.length}`;}
function renderQuestion(){
 const g=current(),q=puzzle().questions[g.active],done=g.solved[g.active];
 $('#question-position').textContent=`${num(g.active+1)} — 07`;$('#question-number').textContent=`${t('across')} ${num(g.active+1)}`;$('#letter-count').textContent=`${q.normalized.length} ${t('letters')}`;$('#question-tag').textContent=q.tag;$('#question-date').textContent=q.date;$('#question-title').textContent=q.clue;
 input.value=g.drafts[g.active];input.readOnly=done;input.placeholder=t('placeholder');input.setAttribute('aria-label',`${t('answerLabel')} — ${t('across')} ${g.active+1}`);
 $('#submit-answer').disabled=done;$('#submit-answer span').textContent=t(done?'correctButton':'check');$('#submit-answer use').setAttribute('href',done?'#check':'#arrow');
 $('#hint-button').disabled=done;$('#hint-button').setAttribute('aria-expanded',g.hints[g.active]);$('#hint').hidden=!g.hints[g.active];$('#hint').textContent=q.hint;
 const explanation=$('#explanation');explanation.hidden=!done;$('#archive-text').textContent=q.explanation;$('#archive-date').textContent=q.date;if(q.date.includes('.'))$('#archive-date').dateTime=q.date.split('.').reverse().join('-');else $('#archive-date').removeAttribute('datetime');$('#archive-number').textContent=num(g.active+1);const a=$('#history-source');a.href=q.source;a.querySelector('span').textContent=t('sourceLink');a.setAttribute('aria-label',`${t('sourceLink')}: ${q.sourceName} (${t('opens')})`);
 renderPhoto(q,done);
 $('#next-question span').textContent=t(g.solved.every(Boolean)?'viewResult':'next');
 const all=q.date==='1939–1945';$('.timeline').classList.toggle('whole-war',all);$('.timeline').style.setProperty('--position',`${(q.year-1939)/6*100}%`);$('#timeline-date').textContent=all?t('wholeWar'):String(q.year);
 $('.timeline').setAttribute('aria-label',`${t('date')}: ${all?t('wholeWar'):q.date}`);
 clearFeedback();if(done){feedback.textContent=`${t('correct')} — ${q.answer}.`;feedback.className='correct';}countInput();
}
async function startReveal(lead=380){
 cancelReveal();const g=current(),p=puzzle(),lang=language;
 if(!unlockedKeyword(g,p))return;
 if(g.revealed){openDialog($('#complete-dialog'));return;}
 const bounds=grid.getBoundingClientRect();
 if(bounds.top<0||bounds.bottom>window.innerHeight){grid.scrollIntoView({block:'center',behavior:reduced.matches?'auto':'smooth'});lead=reduced.matches?0:Math.max(lead,600);}
 const controller=new AbortController();revealController=controller;
 const finished=await revealColumn(grid.querySelectorAll('.key-cell'),{reduced:reduced.matches,signal:controller.signal,lead});
 if(!finished||controller.signal.aborted||language!==lang||current()!==g)return;
 revealController=null;g.revealed=true;renderProgress();
 if(!$('dialog[open]'))openDialog($('#complete-dialog'));
}
function renderPhoto(q,done){
 const figure=$('#archive-photo'),photo=figure.querySelector('img');
 const show=done&&q.date==='07.12.1941';figure.hidden=!show;
 if(!show)return;
 photo.src='assets/pearl-harbor.webp';photo.alt=t('photoAlt');
 $('#photo-caption').textContent=t('photoCaption');
 $('#photo-credit').textContent=t('photoCredit');
 $('#photo-credit').href=photoSource;
}
function renderProgress(){
 const g=current(),p=puzzle(),count=g.solved.filter(Boolean).length,complete=!!unlockedKeyword(g,p)&&!!g.revealed;$('#progress-text').textContent=`${num(count)} / 07`;$('#progress-percent').textContent=`${Math.round(count/7*100)}%`;$('.progress-track').setAttribute('aria-valuenow',count);$('.progress-track').querySelectorAll('span').forEach((segment,i)=>segment.classList.toggle('filled',i<count));
 $('#keyword-box').classList.toggle('unlocked',complete);$('#keyword-box use').setAttribute('href',complete?'#check':'#lock');$('#keyword-note').textContent=complete?t('unlocked'):(count===7?t('readyToReveal'):`${7-count} ${t('remaining')}`);
 const preview=$('#keyword-preview');preview.replaceChildren();preview.setAttribute('aria-label',complete?p.keyword:t('locked'));
 for(let i=0;i<7;i++){const el=document.createElement('span');el.textContent=complete?normalize(p.keyword)[i]:'·';el.setAttribute('aria-hidden','true');preview.append(el);}
 $('#complete-title').textContent=p.keyword;$('.result-letters').replaceChildren(...[...normalize(p.keyword)].map(letter=>{const el=document.createElement('span');el.textContent=letter;return el;}));
}
function render(){makeBoard();renderQuestion();renderProgress();}
function select(i,focus){cancelReveal();const changed=current().active!==i;current().active=i;render();if(changed)motion($('.question-content'),[{opacity:.4,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}]);if(focus)(current().solved[i]?$('#question-title'):input).focus({preventScroll:true});}
function translate(){document.documentElement.lang=language;document.title=t('title');$('meta[name="description"]').content=t('description');document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));document.querySelectorAll('[data-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.aria)));document.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',el.dataset.lang===language));render();renderSources();}
function renderSources(){const list=$('#sources-list');list.replaceChildren();const groups=new Map();puzzle().questions.forEach((q,i)=>{if(!groups.has(q.source))groups.set(q.source,{...q,numbers:[]});groups.get(q.source).numbers.push(i+1);});groups.forEach(q=>{const li=document.createElement('li'),a=document.createElement('a'),small=document.createElement('small');a.href=q.source;a.target='_blank';a.rel='noopener noreferrer';a.textContent=q.sourceName+' ↗';small.textContent=`${t('sourceFor')} ${q.numbers.join(', ')}`;li.append(a,small);list.append(li);});const photoItem=document.createElement('li'),photoLink=document.createElement('a');photoLink.href=photoSource;photoLink.target='_blank';photoLink.rel='noopener noreferrer';photoLink.textContent=t('photoCredit')+' ↗';photoItem.append(photoLink);list.append(photoItem);}
input.addEventListener('input',()=>{current().drafts[current().active]=input.value;clearFeedback();countInput();makeBoard();});
$('#answer-form').addEventListener('submit',e=>{
 e.preventDefault();const g=current(),p=puzzle(),i=g.active;if(g.solved[i])return;
 if(solve(g,p,i,input.value)){
  render();celebrateAnswer(grid.children[i],reduced.matches);
  motion($('#explanation'),[{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:300});
  if(unlockedKeyword(g,p))startReveal();else $('#next-question').focus({preventScroll:true});
 }else{
  const length=normalize(input.value).length,expected=p.questions[i].normalized.length;
  feedback.textContent=!length?t('empty'):length!==expected?(language==='vi'?`Cần ${expected} chữ cái; bạn đã nhập ${length}. ${t('wrong')}`:`This answer needs ${expected} letters; you entered ${length}. ${t('wrong')}`):t('wrong');
  input.setAttribute('aria-invalid','true');$('.answer-wrap').classList.add('invalid');motion($('.answer-wrap'),[{transform:'translateX(0)'},{transform:'translateX(-3px)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}],{duration:220});input.focus({preventScroll:true});
 }
});
$('#hint-button').addEventListener('click',()=>{const g=current();g.hints[g.active]=!g.hints[g.active];$('#hint').hidden=!g.hints[g.active];$('#hint-button').setAttribute('aria-expanded',g.hints[g.active]);if(g.hints[g.active])motion($('#hint'),[{opacity:0,transform:'translateY(-4px)'},{opacity:1,transform:'translateY(0)'}]);});
$('#next-question').addEventListener('click',()=>{const next=nextUnsolved(current());if(next===-1)startReveal(0);else select(next,true);});
$('#reset-button').addEventListener('click',()=>{const g=current();if(g.drafts.some(Boolean)||g.hints.some(Boolean))openDialog($('#reset-dialog'));else select(0,true);});
$('#confirm-reset').addEventListener('click',()=>{cancelReveal();games[language]=newGame();$('#reset-dialog').close();render();input.focus({preventScroll:true});});
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{if(language===button.dataset.lang)return;cancelReveal();language=button.dataset.lang;try{localStorage.setItem('history-language',language);}catch{}translate();motion($('.intro-copy'),[{opacity:.5},{opacity:1}],{duration:200});}));
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openDialog(document.getElementById(button.dataset.open))));
document.querySelectorAll('.close-dialog').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}));
reduced.addEventListener('change',()=>{if(reduced.matches){const pending=!!revealController;cancelReveal();document.getAnimations().forEach(a=>a.cancel());if(pending&&current().solved.every(Boolean))startReveal(0);}});
if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>moveRowMarker(grid,current().active)).observe(grid);
window.addEventListener('resize',()=>moveRowMarker(grid,current().active),{passive:true});
document.fonts?.ready.then(()=>moveRowMarker(grid,current().active));
translate();
