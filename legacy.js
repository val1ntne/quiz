import {questions,correct,sectionIds,ui,fresh,restore,submit,stats} from './meaning-quiz.mjs';
import {content,sources} from './legacy-data.mjs';
const $=s=>document.querySelector(s),key='ww2-meaning-quiz-v1';
let language='vi',state=fresh();try{const l=localStorage.getItem('history-language');if(ui[l])language=l;state=restore(sessionStorage.getItem(key));}catch{}
const t=k=>ui[language][k],reduced=matchMedia('(prefers-reduced-motion: reduce)');
function save(){try{sessionStorage.setItem(key,JSON.stringify(state));}catch{}}
function motion(el){if(!reduced.matches&&el.animate){el.getAnimations().forEach(a=>a.cancel());el.animate([{opacity:.5,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:200,easing:'ease-out'});}}
function render(){
 document.documentElement.lang=language;document.title=t('title');$('meta[name="description"]').content=t('intro');
 document.querySelectorAll('[data-text]').forEach(el=>el.textContent=t(el.dataset.text));document.querySelectorAll('[data-label]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.label)));document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===language));
 const i=state.active,q=questions[language][i],a=state.answers[i],checked=a!==null,history=content[language].sections.find(s=>s.id===sectionIds[i]);
 $('#quiz').hidden=state.results;$('#result-panel').hidden=!state.results;$('#question-count').textContent=`${t('question')} ${String(i+1).padStart(2,'0')} / 06`;$('#question-topic').textContent=history.tag;$('#question-title').textContent=q.prompt;
 $('#options').replaceChildren();q.options.forEach((text,j)=>{
  const label=document.createElement('label');label.className='option';label.classList.toggle('selected',state.selected[i]===j);label.classList.toggle('correct',checked&&j===correct[i]);label.classList.toggle('incorrect',checked&&j===a&&a!==correct[i]);
  const radio=document.createElement('input');radio.type='radio';radio.name='answer';radio.value=j;radio.checked=state.selected[i]===j;radio.disabled=checked;
  const letter=document.createElement('span');letter.className='option-letter';letter.textContent='ABCD'[j];letter.setAttribute('aria-hidden','true');
  const copy=document.createElement('span');copy.className='option-text';copy.textContent=text;
  label.append(radio,letter,copy);if(checked&&(j===correct[i]||j===a)){const status=document.createElement('span');status.className='option-status';status.textContent=j===correct[i]?`✓ ${t('correctAnswer')}`:`× ${t('yourAnswer')}`;label.append(status);}$('#options').append(label);
 });
 $('#feedback').textContent=checked?(a===correct[i]?t('correct'):`${t('incorrect')} ${t('correctAnswer')}: ${'ABCD'[correct[i]]}.`):'';$('#feedback').className=checked?(a===correct[i]?'right':'wrong'):'';
 $('#explanation').hidden=!checked;$('#explanation>p').textContent=history.body+' '+history.note;$('#explanation .sources').replaceChildren();history.sources.forEach(id=>{const s=sources.find(s=>s.id===id),link=document.createElement('a');link.href=s.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=`${t('source')}: ${s.name} ↗`;$('#explanation .sources').append(link);});
 $('#check').disabled=checked||state.selected[i]===null;$('#check').textContent=t(checked?'checked':'check');$('#next').disabled=!checked;$('#previous').disabled=i===0;
 const totals=stats(state);$('#next').textContent=t(totals.answered===6?'results':'next');$('#answered-count').textContent=`${totals.answered} / 6`;$('#score').textContent=totals.score;$('.progress').setAttribute('aria-valuenow',totals.answered);$('.progress>span').style.width=`${totals.answered/6*100}%`;$('#show-results').disabled=totals.answered<6;
 $('#question-nav').replaceChildren();$('#result-list').replaceChildren();questions[language].forEach((question,j)=>{
  const answered=state.answers[j]!==null,right=state.answers[j]===correct[j],button=document.createElement('button');button.type='button';button.textContent=j+1;button.dataset.goto=j;button.className=answered?(right?'right':'wrong'):'';button.classList.toggle('active',j===i&&!state.results);button.setAttribute('aria-label',`${t('question')} ${j+1}: ${t(answered?(right?'correct':'incorrect'):'unanswered')}`);button.setAttribute('aria-pressed',j===i&&!state.results);$('#question-nav').append(button);
  const review=document.createElement('button');review.type='button';review.dataset.goto=j;review.className='review-row';const status=document.createElement('span');status.textContent=right?'✓':'×';status.className=right?'right':'wrong';status.setAttribute('aria-label',t(right?'correct':'incorrect'));const text=document.createElement('span');text.textContent=`${j+1}. ${question.prompt}`;review.append(status,text);$('#result-list').append(review);
 });$('#result-score').textContent=totals.score;save();
}
function go(index){state.active=index;state.results=false;render();motion($('#quiz-form'));$('#question-title').focus({preventScroll:true});}
function results(){if(stats(state).answered!==6)return;state.results=true;render();motion($('#result-panel'));$('#result-title').focus({preventScroll:true});}
$('#options').addEventListener('change',e=>{if(state.answers[state.active]!==null)return;state.selected[state.active]=Number(e.target.value);$('#options').querySelectorAll('label').forEach((el,i)=>el.classList.toggle('selected',i===state.selected[state.active]));$('#check').disabled=false;save();});
$('#quiz-form').addEventListener('submit',e=>{e.preventDefault();if(!submit(state)){if(state.selected[state.active]===null)$('#feedback').textContent=t('empty');return;}render();motion($('#explanation'));$('#next').focus({preventScroll:true});});
$('#next').addEventListener('click',()=>{if(stats(state).answered===6){results();return;}let n=(state.active+1)%6;while(state.answers[n]!==null)n=(n+1)%6;go(n);});
$('#previous').addEventListener('click',()=>go(Math.max(0,state.active-1)));$('#show-results').addEventListener('click',results);$('#review').addEventListener('click',()=>go(0));
document.addEventListener('click',e=>{const b=e.target.closest('[data-goto]');if(b)go(Number(b.dataset.goto));const l=e.target.closest('[data-lang]');if(l&&l.dataset.lang!==language){language=l.dataset.lang;try{localStorage.setItem('history-language',language);}catch{}render();}});
$('#reset').addEventListener('click',()=>$('#reset-dialog').showModal());['close-reset','cancel-reset'].forEach(id=>$('#'+id).addEventListener('click',()=>$('#reset-dialog').close()));$('#confirm-reset').addEventListener('click',()=>{state=fresh();$('#reset-dialog').close();go(0);$('#feedback').textContent=t('resetNotice');});
document.addEventListener('keydown',e=>{if(e.ctrlKey||e.altKey||e.metaKey||$('#reset-dialog').open||state.results||state.answers[state.active]!==null)return;if(/^[1-4]$/.test(e.key)){e.preventDefault();const radio=$(`#options input[value="${Number(e.key)-1}"]`);radio.checked=true;radio.dispatchEvent(new Event('change',{bubbles:true}));radio.focus();}else if(e.key==='Enter'&&(e.target.matches('input[type="radio"],body,#question-title'))){e.preventDefault();$('#quiz-form').requestSubmit();}});
reduced.addEventListener('change',()=>{if(reduced.matches)document.getAnimations().forEach(a=>a.cancel());});render();
