// Short, interaction-driven motion; nothing runs continuously.
export function moveRowMarker(grid,index){
 const marker=document.getElementById('row-marker'),row=grid.children[index];
 if(!marker||!row)return;
 const box=row.getBoundingClientRect(),parent=marker.parentElement.getBoundingClientRect();
 marker.style.height=`${Math.max(12,box.height*.62)}px`;
 marker.style.transform=`translateY(${box.top-parent.top+box.height*.19}px)`;
 marker.classList.add('positioned');
}
export function celebrateAnswer(row,reduced){
 if(reduced||!row)return;
 row.querySelectorAll('.letter').forEach((cell,i)=>{
  if(!cell.animate)return;
  cell.animate([{transform:'translateY(2px)',opacity:.55},{transform:'translateY(-3px)',opacity:1,offset:.45},{transform:'translateY(0)',opacity:1}],{duration:330,delay:i*20,easing:'cubic-bezier(.22,1,.36,1)'});
 });
 const key=row.querySelector('.key-cell');
 key?.animate?.([{boxShadow:'0 0 0 0 rgba(163,32,48,0)'},{boxShadow:'0 0 0 4px rgba(163,32,48,.18)',offset:.45},{boxShadow:'0 0 0 0 rgba(163,32,48,0)'}],{duration:620,delay:220,easing:'ease-out'});
}
export async function revealColumn(cells,{reduced=false,signal,lead=380}={}){
 if(signal?.aborted)return false;
 if(reduced)return true;
 const animations=[...cells].map((cell,i)=>cell.animate?.([
  {backgroundColor:'#a32030',color:'#fff',transform:'scale(1)'},
  {backgroundColor:'#f2d1da',color:'#7f1523',transform:'scale(1.08)',offset:.42},
  {backgroundColor:'#a32030',color:'#fff',transform:'scale(1)'}
 ],{duration:390,delay:lead+i*110,easing:'ease-in-out'})).filter(Boolean);
 const cancel=()=>animations.forEach(a=>a.cancel());signal?.addEventListener('abort',cancel,{once:true});
 try{await Promise.all(animations.map(a=>a.finished));return !signal?.aborted;}
 catch{return false;}
 finally{signal?.removeEventListener('abort',cancel);}
}
