(async()=>{const $=id=>document.getElementById(id);
const C=await (await fetch('copy.json')).json();
for(const k of['title','tagline','intro','footer'])$(k).textContent=C[k];$('api').textContent=C.api_line;document.title=C.title;
$('next-h').textContent=C.labels.next;
if(C.notice&&new Date()<new Date(C.notice_until)){$('notice').textContent=C.notice;$('notice').hidden=false}
const f=(iso,o)=>new Date(iso).toLocaleString('en-US',Object.assign({timeZone:'America/New_York'},o));
const day=i=>f(i,{weekday:'short',month:'short',day:'numeric'}),tm=i=>f(i,{hour:'numeric',minute:'2-digit'});
let d;try{d=await (await fetch('v1/schedule.json')).json()}catch(e){d={items:[]}}
const items=d.items||[];if(d.live_now){$('live').textContent=C.labels.live;$('live').hidden=false}
if(!items.length){$('empty').textContent=C.empty;$('empty').hidden=false}
for(const i of items){const li=document.createElement('li');
const L=document.createElement('span');L.className='who';L.textContent=C.labels.streamer[i.streamer]||i.streamer;
const T=document.createElement('span');T.textContent=`${day(i.start)} · ${tm(i.start)}–${tm(i.end)} ET`;
const S=document.createElement('span');S.className='st '+i.status;S.textContent=i.status==='scheduled'?'':(C.labels[i.status]||i.status);
li.append(L,T,S);let msg='';
if(i.status==='moved'&&i.new_start)msg=C.moved_tpl.replace('{old_day}',day(i.start)).replace('{old_time_et}',tm(i.start)).replace('{new_day}',day(i.new_start)).replace('{new_time_et}',tm(i.new_start));
if(i.status==='cancelled')msg=C.cancelled_tpl.replace('{day}',day(i.start)).replace('{time_et}',tm(i.start));
if(msg||i.note){const p=document.createElement('span');p.className='chg';p.textContent=[msg,i.note].filter(Boolean).join(' ');li.append(p)}
$('list').append(li)}})();
