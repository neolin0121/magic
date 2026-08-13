const DB=[
{id:'quickCircle',name:'迅擊圓盾',shape:'圓盾',color:'紅色',type:'fixed',stats:{quick:100,damage:0,strong:0},bonuses:{quick:0,damage:0,strong:0}},
{id:'strongCircle',name:'強襲圓盾',shape:'圓盾',color:'紅色',type:'fixed',stats:{quick:0,damage:0,strong:100},bonuses:{quick:0,damage:0,strong:0}},
{id:'damageCircle',name:'馭傷圓盾',shape:'圓盾',color:'紅色',type:'fixed',stats:{quick:0,damage:100,strong:0},bonuses:{quick:0,damage:0,strong:0}},
{id:'punisherTriangle',name:'懲罰者三角',shape:'三角',color:'紅色',type:'fixed',stats:{quick:65,damage:0,strong:65},bonuses:{quick:0,damage:0,strong:0}},
{id:'arbiterTriangle',name:'仲裁者三角',shape:'三角',color:'紅色',type:'fixed',stats:{quick:0,damage:65,strong:65},bonuses:{quick:0,damage:0,strong:0}},
{id:'roarerTriangle',name:'咆哮者三角',shape:'三角',color:'紅色',type:'fixed',stats:{quick:65,damage:65,strong:0},bonuses:{quick:0,damage:0,strong:0}},
{id:'quickPrism',name:'迅擊稜鏡',shape:'稜鏡',color:'紅色',type:'percent',stats:{quick:0,damage:0,strong:0},bonuses:{quick:60,damage:0,strong:0}},
{id:'strongPrism',name:'強襲稜鏡',shape:'稜鏡',color:'紅色',type:'percent',stats:{quick:0,damage:0,strong:0},bonuses:{quick:0,damage:0,strong:60}},
{id:'damagePrism',name:'馭傷稜鏡',shape:'稜鏡',color:'紅色',type:'percent',stats:{quick:0,damage:0,strong:0},bonuses:{quick:0,damage:60,strong:0}},
{id:'bannerTower',name:'掌旗官塔盾',shape:'塔盾',color:'紅色',type:'percent',stats:{quick:0,damage:0,strong:0},bonuses:{quick:40,damage:0,strong:40}},
{id:'strategistTower',name:'戰略家塔盾',shape:'塔盾',color:'紅色',type:'percent',stats:{quick:0,damage:0,strong:0},bonuses:{quick:40,damage:40,strong:0}},
{id:'commanderTower',name:'指揮官塔盾',shape:'塔盾',color:'紅色',type:'percent',stats:{quick:0,damage:0,strong:0},bonuses:{quick:0,damage:40,strong:40}}
];
const POTENTIALS={
none:{name:'無',desc:'尚未選擇潛能。',unit:'',fixed:[0,0],percent:[0,0]},
quickMastery:{name:'迅擊精通',desc:'直接增加迅擊數值。',metric:'quick',kind:'mastery',unit:'',fixed:[25,130],percent:[25,130]},
damageMastery:{name:'馭傷精通',desc:'直接增加馭傷數值。',metric:'damage',kind:'mastery',unit:'',fixed:[25,130],percent:[25,130]},
strongMastery:{name:'強襲精通',desc:'直接增加強襲數值。',metric:'strong',kind:'mastery',unit:'',fixed:[25,130],percent:[25,130]},
quickAmplify:{name:'迅擊增幅',desc:'迅擊數值提高 x%。',metric:'quick',kind:'amplify',unit:'%',fixed:[2.4,12],percent:[2.4,12]},
damageAmplify:{name:'馭傷增幅',desc:'馭傷數值提高 x%。',metric:'damage',kind:'amplify',unit:'%',fixed:[2.4,12],percent:[2.4,12]},
strongAmplify:{name:'強襲增幅',desc:'強襲數值提高 x%。',metric:'strong',kind:'amplify',unit:'%',fixed:[2.4,12],percent:[2.4,12]},
refinement:{name:'魔石淬煉',desc:'本魔石的基礎屬性提高 x%。',kind:'baseBoost',unit:'%',fixed:[64,320],percent:[5,24]},
redEnergy:{name:'赤曜聚能',desc:'每裝備 1 顆紅色魔石，本魔石基礎屬性提高 x%，最高為基礎屬性提高 5 × x%。',kind:'redEnergy',unit:'%',fixed:[16,88],percent:[1.2,6.6]},
shapeForm:{name:'萬象塑形',desc:'每裝備 1 種不同形狀的魔石，本魔石基礎屬性提高 x%。',kind:'shapeForm',unit:'%',fixed:[16,80],percent:[1,6]},
sameShape:{name:'同印契合',desc:'每裝備 1 個與自身形狀相同的魔石，本魔石基礎屬性提高 x%。',kind:'sameShape',unit:'%',fixed:[32,160],percent:[2,12]},
resonance:{name:'潛能共鳴',desc:'所有已裝備魔石的潛能效果提高 x%（潛能共鳴以及同源潛能除外）。',kind:'resonance',unit:'%',fixed:[4,20],percent:[4,20]},
sameOrigin:{name:'同源潛能',desc:'已裝備的魔石中，每有 1 個其他相同潛能，該魔石的潛能效果提高 x%（潛能共鳴以及同源潛能除外）。',kind:'sameOrigin',unit:'%',fixed:[2,10],percent:[2,10]}
};
const METRICS={quick:{label:'迅擊'},damage:{label:'馭傷'},strong:{label:'強襲'}};
const KEY='neo_gem_builder_v1';
const clone=o=>JSON.parse(JSON.stringify(o));
const uuid=()=>crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random();
const defaults={metric:'quick',baseValues:{quick:324.7,damage:0,strong:0},quickDamageRatio:30,equipped:[
{stoneId:'quickPrism',potential:'redEnergy',value:6.2},
{stoneId:'roarerTriangle',potential:'redEnergy',value:78.1},
{stoneId:'quickCircle',potential:'shapeForm',value:69.4},
{stoneId:'bannerTower',potential:'shapeForm',value:4.6},
{stoneId:'strategistTower',potential:'resonance',value:16}],inventory:[],compare:null};
function seedInventory(){
 const items=defaults.equipped.map(x=>({id:uuid(),...x,favorite:true}));
 items.push({id:uuid(),stoneId:'commanderTower',potential:'resonance',value:10.7,favorite:false});
 return items;
}
function load(){try{const r=localStorage.getItem(KEY);if(!r){const s=clone(defaults);s.inventory=seedInventory();return s}return {...clone(defaults),...JSON.parse(r)}}catch{const s=clone(defaults);s.inventory=seedInventory();return s}}
let state=load(),optimizerSelection=null,editingInventoryId=null;
const $=q=>document.querySelector(q),$$=q=>[...document.querySelectorAll(q)];
const fmt=(n,d=3)=>Number(n||0).toLocaleString('zh-TW',{minimumFractionDigits:d,maximumFractionDigits:d});
const getStone=id=>DB.find(x=>x.id===id);
const getRange=(s,k)=>(s.type==='fixed'?POTENTIALS[k].fixed:POTENTIALS[k].percent);
const persist=()=>localStorage.setItem(KEY,JSON.stringify(state));
const stoneOptions=(empty=true)=>(empty?'<option value="">未裝備</option>':'')+DB.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
function stoneOptionsForSlot(slotIndex){
  const currentId=state.equipped[slotIndex]?.stoneId||'';
  const used=new Set(state.equipped.map((x,i)=>i===slotIndex?'':x?.stoneId).filter(Boolean));
  return '<option value="">未裝備</option>'+DB.map(s=>{
    const disabled=used.has(s.id);
    return `<option value="${s.id}" ${disabled?'disabled':''}>${s.name}${disabled?'（已裝備）':''}</option>`;
  }).join('');
}
const potentialOptions=()=>Object.entries(POTENTIALS).map(([k,p])=>`<option value="${k}">${p.name}</option>`).join('');
function calc(build,metric,base){
 const eq=build.filter(x=>x&&x.stoneId&&getStone(x.stoneId));
 const redCount=eq.filter(x=>getStone(x.stoneId).color==='紅色').length;
 const shapeCount=new Set(eq.map(x=>getStone(x.stoneId).shape)).size;
 const resonance=eq.filter(x=>x.potential==='resonance').reduce((a,x)=>a+Number(x.value||0),0);
 const sameOrigin=eq.filter(x=>x.potential==='sameOrigin').reduce((a,x)=>a+Number(x.value||0),0);
 const counts={};eq.forEach(x=>counts[x.potential]=(counts[x.potential]||0)+1);
 let fixed=0,bonus=0,mastery=0,amplify=0;const details=[];
 for(const item of eq){const stone=getStone(item.stoneId),p=POTENTIALS[item.potential]||POTENTIALS.none,raw=Number(item.value||0);let eff=raw;
   if(!['none','resonance','sameOrigin'].includes(item.potential)){const others=Math.max(0,(counts[item.potential]||0)-1);eff=raw*(1+resonance/100)*(1+sameOrigin/100*others)}
   let boost=0;if(p.kind==='baseBoost')boost=eff;
if(p.kind==='redEnergy')boost=eff*redCount;
if(p.kind==='shapeForm')boost=eff*shapeCount;
if(p.kind==='sameShape'){
  const sameShapeCount=eq.filter(y=>getStone(y.stoneId).shape===stone.shape).length;
  boost=eff*sameShapeCount;
}
   const ef=(stone.stats[metric]||0)*(1+boost/100),eb=(stone.bonuses[metric]||0)*(1+boost/100);fixed+=ef;bonus+=eb;if(p.kind==='mastery'&&p.metric===metric)mastery+=eff;if(p.kind==='amplify'&&p.metric===metric)amplify+=eff;
   details.push({stoneName:stone.name,potentialName:p.name,raw,eff,boost,ef,eb,unit:p.unit});
 }
 const bm=1+bonus/100,am=1+amplify/100,stoneOnly=(fixed+mastery)*bm*am,panelRaw=(Number(base||0)+fixed+mastery)*bm*am;
 return {panel:Math.round(panelRaw),panelRaw,stoneOnly,fixed,bonus,mastery,amplify,baseContribution:Number(base||0)*bm*am,redCount,shapeCount,resonance,sameOrigin,details};
}
function renderBuild(){
 const metric=state.metric;$('#baseStatInput').value=state.baseValues[metric]||0;$('#baseStatHint').textContent='目前計算：'+METRICS[metric].label;$$('.seg').forEach(b=>b.classList.toggle('active',b.dataset.metric===metric));
 $('#equippedSlots').innerHTML=Array.from({length:5},(_,i)=>{const item=state.equipped[i]||{stoneId:'',potential:'none',value:0},stone=item.stoneId?getStone(item.stoneId):null,p=POTENTIALS[item.potential]||POTENTIALS.none,r=stone?getRange(stone,item.potential):[0,0];return `<article class="slot-card ${stone?'active':''}"><div class="slot-index">${i+1}</div><div class="field"><label>魔石</label><select class="slot-stone" data-i="${i}">${stoneOptionsForSlot(i)}</select><div class="stone-desc">${stone?stone.name+'・'+stone.shape+'・紅色':'未裝備'}</div></div><div class="field"><label>潛能</label><select class="slot-pot" data-i="${i}" ${stone?'':'disabled'}>${potentialOptions()}</select><div class="range">${stone?`範圍 ${r[0]}${p.unit}～${r[1]}${p.unit}`:'—'}</div></div><div class="field slot-value-field"><label>數值</label><input class="slot-val" data-i="${i}" type="number" step="0.1" value="${item.value||0}" ${stone?'':'disabled'}><div class="range">輸入實際顯示數值</div></div><button class="btn slot-max" data-i="${i}" ${stone?'':'disabled'}>填最大</button><div class="slot-preview potential-desc" id="preview${i}">
  <div class="stone-base-desc">
    <b>基礎屬性：</b>
    <span>${stone ? [
      ...Object.entries(stone.stats).filter(([_,v])=>v).map(([k,v])=>`${METRICS[k].label} +${v}`),
      ...Object.entries(stone.bonuses).filter(([_,v])=>v).map(([k,v])=>`${METRICS[k].label}加成 +${v}%`)
    ].join('、') : '—'}</span>
  </div>
  <div class="potential-function-desc"><b>${p.name}：</b><span>${p.desc||'尚未選擇潛能。'}</span></div>
</div></article>`}).join('');
 state.equipped.forEach((x,i)=>{const a=$(`.slot-stone[data-i="${i}"]`),b=$(`.slot-pot[data-i="${i}"]`);if(a)a.value=x.stoneId||'';if(b)b.value=x.potential||'none'});bindBuild();updateBuild();
}
function bindBuild(){
 $$('.slot-stone').forEach(e=>e.onchange=ev=>{
  const i=+ev.target.dataset.i,id=ev.target.value;
  if(id && state.equipped.some((x,idx)=>idx!==i && x?.stoneId===id)){
    alert('同種魔石不能重複裝備。');
    renderBuild();
    return;
  }
  state.equipped[i]=id?{stoneId:id,potential:'none',value:0}:{stoneId:'',potential:'none',value:0};
  persist();renderBuild();
});
 $$('.slot-pot').forEach(e=>e.onchange=ev=>{const i=+ev.target.dataset.i,item=state.equipped[i],stone=getStone(item.stoneId);item.potential=ev.target.value;item.value=getRange(stone,item.potential)[0];persist();renderBuild()});
 $$('.slot-val').forEach(e=>e.oninput=ev=>{state.equipped[+ev.target.dataset.i].value=Number(ev.target.value||0);persist();updateBuild()});
 $$('.slot-max').forEach(e=>e.onclick=ev=>{const i=+ev.target.dataset.i,item=state.equipped[i];item.value=getRange(getStone(item.stoneId),item.potential)[1];persist();renderBuild()});
}
function updateBuild(){
 const m=state.metric,b=state.baseValues[m]||0,r=calc(state.equipped,m,b),label=METRICS[m].label;$('#panelStat').textContent=r.panel.toLocaleString('zh-TW');$('#panelExact').textContent=`精確值 ${fmt(r.panelRaw)}，面板四捨五入`;$('#stoneOnlyStat').textContent=fmt(r.stoneOnly,1);
 if(m==='quick'){const ratio=state.quickDamageRatio||30;$('#damageBonus').textContent=fmt(r.panel/ratio,1)+'%';$('#damageHint').textContent=`迅擊每 ${ratio} 點 = 基礎/核心技能傷害 +1%`}else{$('#damageBonus').textContent='—';$('#damageHint').textContent='尚未建立此屬性的傷害換算公式'}
 $('#equippedCount').textContent=state.equipped.filter(x=>x&&x.stoneId).length;$('#redCount').textContent=r.redCount;$('#shapeCount').textContent=r.shapeCount;$('#resonanceTotal').textContent=fmt(r.resonance,1)+'%';$('#sameOriginTotal').textContent=fmt(r.sameOrigin,1)+'%';$('#sumFixed').textContent=fmt(r.fixed);$('#sumMastery').textContent=fmt(r.mastery);$('#sumBonus').textContent=fmt(r.bonus)+'%';$('#sumAmplify').textContent=fmt(r.amplify)+'%';$('#baseContribution').textContent=fmt(r.baseContribution);$('#stoneSummary').textContent=fmt(r.stoneOnly);$('#formulaText').textContent=`${label}面板＝（角色基礎${label}＋有效固定${label}＋${label}精通）×（1＋${label}加成）×（1＋${label}增幅）`;
 $('#detailTable').innerHTML=r.details.length?r.details.map((d,i)=>`<tr><td>${i+1}</td><td>${d.stoneName}</td><td>${d.potentialName}</td><td>${fmt(d.raw)}${d.unit}</td><td>${fmt(d.eff)}${d.unit}</td><td>${fmt(d.boost)}%</td><td>${fmt(d.ef)}</td><td>${fmt(d.eb)}%</td></tr>`).join(''):'<tr><td colspan="8">尚未裝備魔石</td></tr>';
 if(state.compare&&state.compare.metric===m){const dq=r.panel-state.compare.panel;$('#compareEmpty').classList.add('hidden');$('#compareContent').classList.remove('hidden');$('#compareDelta').textContent=(dq>=0?'+':'')+dq;$('#compareDelta').className=dq>=0?'positive':'negative';if(m==='quick'){const dd=dq/(state.quickDamageRatio||30);$('#compareDamageDelta').textContent=(dd>=0?'+':'')+fmt(dd,2)+'%';$('#compareDamageDelta').className=dd>=0?'positive':'negative'}else{$('#compareDamageDelta').textContent='—';$('#compareDamageDelta').className=''}$('#compareText').textContent=`基準：${state.compare.panel} ${label}`}else{$('#compareEmpty').classList.remove('hidden');$('#compareContent').classList.add('hidden')}
 persist();
}
function renderInventory(){
 $('#inventoryList').innerHTML=state.inventory.length?state.inventory.map(x=>{const s=getStone(x.stoneId),p=POTENTIALS[x.potential];return `<article class="inv-card ${x.favorite?'favorite':''}"><div class="inv-title"><strong>${s.name}</strong>${x.favorite?'<span class="badge">裝備中</span>':''}</div><div class="inv-meta">${s.shape}・${s.color}<br>潛能：${p.name} ${x.value}${p.unit}</div><div class="inv-actions"><button class="btn editInv" data-id="${x.id}">編輯</button><button class="btn delInv" data-id="${x.id}">刪除</button></div></article>`}).join(''):'<div class="empty">目前沒有魔石。</div>';
 $$('.editInv').forEach(b=>b.onclick=()=>openDialog(b.dataset.id));$$('.delInv').forEach(b=>b.onclick=()=>{state.inventory=state.inventory.filter(x=>x.id!==b.dataset.id);persist();renderInventory()});
}
function renderDB(){
 $('#databaseGrid').innerHTML=DB.map(s=>{const fixed=Object.entries(s.stats).filter(x=>x[1]).map(([k,v])=>METRICS[k].label+'+'+v),bonus=Object.entries(s.bonuses).filter(x=>x[1]).map(([k,v])=>METRICS[k].label+'加成+'+v+'%');return `<article class="db-card"><div class="db-title"><strong>${s.name}</strong><span class="badge">${s.shape}</span></div><div class="db-meta">顏色：${s.color}<br>基礎：${[...fixed,...bonus].join('、')||'—'}<br>類型：${s.type==='fixed'?'固定值':'百分比'}</div></article>`}).join('');
}
function openDialog(id=null){editingInventoryId=id;const x=id?state.inventory.find(y=>y.id===id):null;$('#dialogTitle').textContent=x?'編輯魔石':'新增魔石';$('#invStoneType').innerHTML=stoneOptions(false);$('#invPotential').innerHTML=potentialOptions();$('#invStoneType').value=x?.stoneId||DB[0].id;$('#invPotential').value=x?.potential||'none';$('#invPotentialValue').value=x?.value||0;$('#invFavorite').checked=!!x?.favorite;$('#inventoryDialog').showModal()}
function saveDialog(){const data={stoneId:$('#invStoneType').value,potential:$('#invPotential').value,value:Number($('#invPotentialValue').value||0),favorite:$('#invFavorite').checked};if(editingInventoryId)Object.assign(state.inventory.find(x=>x.id===editingInventoryId),data);else state.inventory.push({id:uuid(),...data});persist();renderInventory()}
function combos(arr,k){const out=[];function rec(start,c){if(c.length===k){out.push(c.slice());return}for(let i=start;i<arr.length;i++){c.push(arr[i]);rec(i+1,c);c.pop()}}rec(0,[]);return out}
function optimizerStoneReason(item,combo,metric,base,fullResult){
  const stone=getStone(item.stoneId);
  const p=POTENTIALS[item.potential]||POTENTIALS.none;

  const directFixed=stone.stats[metric]||0;
  const directBonus=stone.bonuses[metric]||0;
  const directPotential=(p.metric===metric && (p.kind==='mastery'||p.kind==='amplify'));

  const reduced=combo
    .filter(x=>x.id!==item.id)
    .map(x=>({stoneId:x.stoneId,potential:x.potential,value:x.value}));
  const reducedResult=calc(reduced,metric,base);
  const marginal=fullResult.panelRaw-reducedResult.panelRaw;

  let reason='';
  if(directFixed||directBonus||directPotential){
    const parts=[];
    if(directFixed)parts.push(`${METRICS[metric].label}+${directFixed}`);
    if(directBonus)parts.push(`${METRICS[metric].label}加成+${directBonus}%`);
    if(directPotential)parts.push(`${p.name}`);
    reason=`直接貢獻：${parts.join('、')}`;
  }else if(marginal>0.0001){
    reason=`連動支援：本身沒有直接${METRICS[metric].label}，但會透過紅色魔石數、形狀或其他潛能連動提高整套結果`;
  }else{
    reason=`補足第 5 顆／組合條件；本身對${METRICS[metric].label}直接影響很低`;
  }

  return {reason,marginal};
}

function runOptimizer(){
  const metric=$('#optimizerMetric').value,
        base=Number($('#optimizerBase').value||0),
        inv=state.inventory;

  if(!inv.length){
    $('#optimizerEmpty').textContent='請先新增魔石。';
    return;
  }

  let best=null;
  const EPS=1e-9;

  for(let k=1;k<=Math.min(5,inv.length);k++){
    for(const c of combos(inv,k)){
      const ids=c.map(x=>x.stoneId);
      if(new Set(ids).size!==ids.length)continue;

      const build=c.map(x=>({stoneId:x.stoneId,potential:x.potential,value:x.value}));
      const r=calc(build,metric,base);

      // 同分時優先選擇對目標屬性有直接基礎值/加成/精通/增幅的組合，僅作 tie-break，不改變真正最高面板判定。
      const relevance=c.reduce((score,x)=>{
        const s=getStone(x.stoneId),p=POTENTIALS[x.potential]||POTENTIALS.none;
        return score+(s.stats[metric]||0)+(s.bonuses[metric]||0)+(p.metric===metric?Number(x.value||0):0);
      },0);

      if(!best || r.panelRaw>best.r.panelRaw+EPS ||
         (Math.abs(r.panelRaw-best.r.panelRaw)<=EPS && relevance>best.relevance)){
        best={c,build,r,metric,base,relevance};
      }
    }
  }

  if(!best){
    $('#optimizerEmpty').textContent='沒有合法組合。';
    return;
  }

  optimizerSelection=best;
  $('#optimizerEmpty').classList.add('hidden');
  $('#optimizerResult').classList.remove('hidden');
  $('#optimizerBestValue').textContent=best.r.panel.toLocaleString('zh-TW');

  const explained=best.c.map(x=>{
    const info=optimizerStoneReason(x,best.c,metric,base,best.r);
    return {...x,...info};
  }).sort((a,b)=>b.marginal-a.marginal);

  $('#optimizerStones').innerHTML=explained.map(x=>{
    const stone=getStone(x.stoneId),p=POTENTIALS[x.potential];
    const delta=Math.round(x.marginal*1000)/1000;
    return `<div class="optimizer-card optimizer-explain-card">
      <div class="optimizer-card-head">
        <strong>${stone.name}</strong>
        <span class="optimizer-marginal">整套貢獻 +${fmt(delta,1)}</span>
      </div>
      <div class="inv-meta">潛能：${p.name} ${x.value}${p.unit}</div>
      <div class="optimizer-reason">${x.reason}</div>
    </div>`;
  }).join('');

  const supportCount=explained.filter(x=>{
    const s=getStone(x.stoneId),p=POTENTIALS[x.potential]||POTENTIALS.none;
    return !(s.stats[metric]||0) && !(s.bonuses[metric]||0) && !(p.metric===metric&&(p.kind==='mastery'||p.kind==='amplify'));
  }).length;

  let note=document.querySelector('#optimizerExplainNote');
  if(!note){
    note=document.createElement('div');
    note.id='optimizerExplainNote';
    note.className='optimizer-explain-note';
    $('#optimizerStones').before(note);
  }
  note.innerHTML=supportCount
    ? `本次最佳組合包含 <b>${supportCount}</b> 顆「連動支援型」魔石。它們可能沒有直接${METRICS[metric].label}，但加入後會讓其他魔石的赤曜聚能、形狀條件或潛能連動變強，因此整套面板更高。`
    : `本次最佳組合全部都有直接${METRICS[metric].label}貢獻。`;
}
function applyOptimizer(){if(!optimizerSelection)return;state.metric=optimizerSelection.metric;state.baseValues[state.metric]=optimizerSelection.base;state.equipped=optimizerSelection.build.slice();while(state.equipped.length<5)state.equipped.push({stoneId:'',potential:'none',value:0});persist();switchTab('build');renderBuild()}
function switchTab(n){
  $$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===n));
  $$('.tab-page').forEach(p=>p.classList.remove('active'));
  $('#tab-'+n).classList.add('active');
  if(n==='inventory')renderInventory();
  if(n==='database')renderDB();
  if(n==='singlecompare' && $('#cmpStone')) renderSingleCompareInputs();
}
function exportData(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='neo-gem-data.json';a.click();URL.revokeObjectURL(a.href)}
async function importData(file){const parsed=JSON.parse(await file.text());state={...clone(defaults),...parsed};persist();renderBuild();renderInventory();renderDB()}
$$('.tab').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));$$('.seg').forEach(b=>b.onclick=()=>{state.metric=b.dataset.metric;persist();renderBuild()});$('#baseStatInput').oninput=e=>{state.baseValues[state.metric]=Number(e.target.value||0);persist();updateBuild()};$('#loadCurrentBtn').onclick=()=>{state.metric='quick';state.baseValues.quick=324.7;state.equipped=clone(defaults.equipped);persist();renderBuild()};$('#saveCompareBtn').onclick=()=>{state.compare={metric:state.metric,panel:calc(state.equipped,state.metric,state.baseValues[state.metric]).panel};persist();updateBuild()};$('#resetBtn').onclick=()=>{
  const preservedInventory=clone(state.inventory||[]);
  const s=clone(defaults);
  s.inventory=preservedInventory;
  s.compare=null;
  state=s;
  persist();
  renderBuild();
  renderInventory();
};$('#addInventoryBtn').onclick=()=>openDialog();$('#saveInventoryItemBtn').onclick=e=>{e.preventDefault();saveDialog();$('#inventoryDialog').close()};$('#runOptimizerBtn').onclick=runOptimizer;$('#applyOptimizerBtn').onclick=applyOptimizer;$('#quickDamageRatio').value=state.quickDamageRatio||30;$('#quickDamageRatio').oninput=e=>{state.quickDamageRatio=Number(e.target.value||30);persist();updateBuild()};$('#exportBtn').onclick=exportData;$('#importInput').onchange=e=>{if(e.target.files[0])importData(e.target.files[0])};$('#clearStorageBtn').onclick=()=>{if(confirm('確定清除本機存檔？')){localStorage.removeItem(KEY);location.reload()}};$('#invStoneType').innerHTML=stoneOptions(false);$('#invPotential').innerHTML=potentialOptions();renderBuild();renderInventory();renderDB();

function showHelpPage(name){$$(".help-tab").forEach(b=>b.classList.toggle("active",b.dataset.help===name));$$(".help-section").forEach(s=>s.classList.toggle("active",s.dataset.helpPage===name));const c=$(".help-content");if(c)c.scrollTop=0}
$("#helpBtn").onclick=()=>{showHelpPage("quickstart");$("#helpDialog").showModal()};
$("#helpCloseBtn").onclick=()=>$("#helpDialog").close();
$$(".help-tab").forEach(b=>b.onclick=()=>showHelpPage(b.dataset.help));


// ===== 從截圖新增魔石（瀏覽器端 OCR） =====
let scanObjectUrl = null;

function normalizeOCRText(text){
  return String(text||'')
    .replace(/[\s\u3000]+/g,'')
    .replace(/[＋﹢]/g,'+')
    .replace(/[％﹪]/g,'%')
    .replace(/[：﹕]/g,':')
    .replace(/[，、]/g,',')
    .replace(/[０-９]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0))
    .replace(/[．。]/g,'.');
}

function similarity(a,b){
  a=normalizeOCRText(a); b=normalizeOCRText(b);
  if(!a||!b) return 0;
  if(a.includes(b)||b.includes(a)) return 1;
  let hits=0;
  for(const ch of b){ if(a.includes(ch)) hits++; }
  return hits/Math.max(a.length,b.length);
}

function findBestStoneFromOCR(raw){
  const n=normalizeOCRText(raw);
  let best=null;
  for(const s of DB){
    const name=normalizeOCRText(s.name);
    if(n.includes(name)) return {id:s.id,score:1,name:s.name};
    const score=similarity(n,name);
    if(!best||score>best.score) best={id:s.id,score,name:s.name};
  }
  return best;
}

function findBestPotentialFromOCR(raw){
  const n=normalizeOCRText(raw);
  let best=null;
  for(const [key,p] of Object.entries(POTENTIALS)){
    if(key==='none') continue;
    const name=normalizeOCRText(p.name);
    if(n.includes(name)) return {key,score:1,name:p.name};
    const score=similarity(n,name);
    if(!best||score>best.score) best={key,score,name:p.name};
  }
  return best;
}

function extractPotentialValue(raw,potentialName){
  const text=normalizeOCRText(raw);
  const p=normalizeOCRText(potentialName||'');
  let tail=text;
  const idx=p?text.indexOf(p):-1;
  if(idx>=0) tail=text.slice(idx+p.length,idx+p.length+40);
  const direct=tail.match(/\+?(-?\d+(?:\.\d+)?)%?/);
  if(direct) return Number(direct[1]);
  const all=[...text.matchAll(/\+?(-?\d+(?:\.\d+)?)%/g)].map(m=>Number(m[1]));
  return all.length?all[all.length-1]:0;
}

function scanSetStatus(text,progress=null){
  $('#scanStatus').textContent=text;
  if(progress!==null){
    const pct=Math.max(0,Math.min(100,Math.round(progress*100)));
    $('#scanProgress').textContent=pct+'%';
    $('#scanProgressBar').style.width=pct+'%';
  }
}

function scanMessage(text,isError=false){
  const el=$('#scanMessage');
  if(!text){el.classList.add('hidden');return;}
  el.textContent=text;
  el.classList.remove('hidden');
  el.classList.toggle('error',!!isError);
}

function resetScanDialog(full=true){
  $('#scanConfirmBtn').disabled=true;
  $('#scanRawText').value='';
  $('#scanPotentialValue').value='';
  $('#scanFavorite').checked=false;
  scanSetStatus('等待辨識',0);
  scanMessage('');
  if(full){
    $('#scanWorkspace').classList.add('hidden');
    $('#scanFileInput').value='';
    if(scanObjectUrl){URL.revokeObjectURL(scanObjectUrl);scanObjectUrl=null;}
    $('#scanPreview').removeAttribute('src');
  }
}

function openScanDialog(){
  resetScanDialog(true);
  $('#scanStoneType').innerHTML=stoneOptions(false);
  $('#scanPotential').innerHTML=potentialOptions();
  $('#scanDialog').showModal();
}

async function preprocessImageForOCR(file){
  const bitmap=await createImageBitmap(file);
  const maxW=1800;
  const scale=Math.min(2.0,maxW/bitmap.width);
  const w=Math.max(1,Math.round(bitmap.width*scale));
  const h=Math.max(1,Math.round(bitmap.height*scale));
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  ctx.drawImage(bitmap,0,0,w,h);
  const img=ctx.getImageData(0,0,w,h),d=img.data;
  for(let i=0;i<d.length;i+=4){
    const gray=0.299*d[i]+0.587*d[i+1]+0.114*d[i+2];
    const v=gray>185?255:gray<75?0:Math.max(0,Math.min(255,(gray-128)*1.35+128));
    d[i]=d[i+1]=d[i+2]=v;
  }
  ctx.putImageData(img,0,0);
  return canvas;
}

async function recognizeGemImage(file){
  if(!window.Tesseract){
    throw new Error('OCR 元件載入失敗，請確認網路連線後重新整理。');
  }
  scanSetStatus('圖片處理中…',0.03);
  const canvas=await preprocessImageForOCR(file);
  scanSetStatus('載入 OCR 模型…',0.06);
  const result=await Tesseract.recognize(canvas,'chi_tra+eng',{
    logger:m=>{
      if(m.status==='recognizing text') scanSetStatus('辨識文字中…',m.progress||0);
      else if(m.status) scanSetStatus('OCR：'+m.status,m.progress||0);
    }
  });
  return result?.data?.text||'';
}

async function handleScanFile(file){
  if(!file) return;
  resetScanDialog(false);
  $('#scanWorkspace').classList.remove('hidden');
  if(scanObjectUrl) URL.revokeObjectURL(scanObjectUrl);
  scanObjectUrl=URL.createObjectURL(file);
  $('#scanPreview').src=scanObjectUrl;
  try{
    const raw=await recognizeGemImage(file);
    $('#scanRawText').value=raw;
    const stone=findBestStoneFromOCR(raw);
    const pot=findBestPotentialFromOCR(raw);
    if(stone) $('#scanStoneType').value=stone.id;
    if(pot) $('#scanPotential').value=pot.key;
    const value=extractPotentialValue(raw,pot?.name||'');
    $('#scanPotentialValue').value=Number.isFinite(value)?value:'';
    $('#scanConfirmBtn').disabled=false;
    scanSetStatus('辨識完成',1);
    const confidence=[];
    if(stone?.score<1) confidence.push('魔石名稱可能需要確認');
    if(pot?.score<1) confidence.push('潛能名稱可能需要確認');
    if(!value) confidence.push('潛能數值可能需要手動輸入');
    scanMessage(confidence.length?'辨識完成，但'+confidence.join('、')+'。請確認後再新增。':'辨識完成，請確認資料後按「確認新增」。');
  }catch(err){
    console.error(err);
    scanSetStatus('辨識失敗',0);
    scanMessage(err?.message||'辨識失敗，請改用手動新增或換一張較清楚的截圖。',true);
    $('#scanConfirmBtn').disabled=false;
  }
}

function confirmScannedInventory(){
  const stoneId=$('#scanStoneType').value;
  const potential=$('#scanPotential').value;
  const value=Number($('#scanPotentialValue').value||0);
  if(!stoneId){scanMessage('請選擇魔石種類。',true);return;}
  if(potential==='none'){scanMessage('請確認或選擇潛能。',true);return;}
  state.inventory.push({id:uuid(),stoneId,potential,value,favorite:$('#scanFavorite').checked});
  persist();renderInventory();
  $('#scanDialog').close();
  switchTab('inventory');
}

if($('#scanInventoryBtn')) $('#scanInventoryBtn').onclick=openScanDialog;
if($('#scanCloseBtn')) $('#scanCloseBtn').onclick=()=>$('#scanDialog').close();
if($('#scanAgainBtn')) $('#scanAgainBtn').onclick=()=>{resetScanDialog(true);$('#scanFileInput').click();};
if($('#scanFileInput')) $('#scanFileInput').onchange=e=>handleScanFile(e.target.files?.[0]);
if($('#scanConfirmBtn')) $('#scanConfirmBtn').onclick=confirmScannedInventory;
if($('#scanDialog')) $('#scanDialog').addEventListener('close',()=>resetScanDialog(true));


// ===== 單顆魔石比對 =====
function renderSingleCompareInputs(){
  const stoneEl=$('#cmpStone'),potEl=$('#cmpPotential');
  if(!stoneEl||!potEl) return;
  stoneEl.innerHTML=stoneOptions(false);
  potEl.innerHTML=potentialOptions();
  if(!stoneEl.value) stoneEl.value=DB[0].id;
  if(!potEl.value) potEl.value='none';
  updateSingleCompareInputInfo();
}

function updateSingleCompareInputInfo(){
  const stone=getStone($('#cmpStone')?.value);
  const potKey=$('#cmpPotential')?.value||'none';
  const p=POTENTIALS[potKey]||POTENTIALS.none;
  if(!stone) return;
  const r=getRange(stone,potKey);
  if($('#cmpPotentialRange')) $('#cmpPotentialRange').textContent=`範圍 ${r[0]}${p.unit}～${r[1]}${p.unit}`;
  if($('#cmpCandidateDesc')){
    const fixedParts=Object.entries(stone.stats).filter(([_,v])=>v).map(([k,v])=>`${METRICS[k].label}+${v}`);
    const bonusParts=Object.entries(stone.bonuses).filter(([_,v])=>v).map(([k,v])=>`${METRICS[k].label}加成+${v}%`);
    $('#cmpCandidateDesc').innerHTML=
      `<b>${stone.name}</b>｜${stone.shape}・${stone.color}<br>`+
      `基礎屬性：${[...fixedParts,...bonusParts].join('、')||'—'}<br>`+
      `潛能：${p.name}｜${p.desc||'—'}`;
  }
}

function getSingleCompareCandidate(){
  const stoneId=$('#cmpStone')?.value;
  const potential=$('#cmpPotential')?.value||'none';
  const value=Number($('#cmpValue')?.value||0);
  if(!stoneId) return null;
  return {stoneId,potential,value};
}

function isLegalReplacement(candidate,replaceIndex){
  return !state.equipped.some((x,i)=>i!==replaceIndex && x?.stoneId===candidate.stoneId);
}

function runSingleCompare(){
  const candidate=getSingleCompareCandidate();
  if(!candidate) return;
  const metric=state.metric;
  const base=state.baseValues[metric]||0;
  const current=calc(state.equipped,metric,base);
  const rows=[];
  let best=null;

  for(let i=0;i<5;i++){
    const currentItem=state.equipped[i]||{stoneId:'',potential:'none',value:0};
    const currentStone=currentItem.stoneId?getStone(currentItem.stoneId):null;
    const legal=isLegalReplacement(candidate,i);

    if(!legal){
      rows.push({
        index:i,currentName:currentStone?.name||'空槽',legal:false,
        panel:null,delta:null,damageDelta:null
      });
      continue;
    }

    const build=clone(state.equipped);
    while(build.length<5) build.push({stoneId:'',potential:'none',value:0});
    build[i]=clone(candidate);
    const result=calc(build,metric,base);
    const delta=result.panel-current.panel;
    const damageDelta=metric==='quick'?delta/(state.quickDamageRatio||30):null;
    const row={
      index:i,currentName:currentStone?.name||'空槽',legal:true,
      panel:result.panel,delta,damageDelta,result,build
    };
    rows.push(row);
    if(!best || result.panelRaw>best.result.panelRaw) best=row;
  }

  $('#singleCompareEmpty').classList.add('hidden');
  $('#singleCompareResult').classList.remove('hidden');
  $('#cmpCurrentPanel').textContent=current.panel.toLocaleString('zh-TW');
  $('#cmpMetricLabel').textContent=`目前計算：${METRICS[metric].label}`;

  if(!best){
    $('#cmpBestPanel').textContent='—';
    $('#cmpBestReplace').textContent='無合法替換方式';
    $('#cmpDeltaPanel').textContent='—';
    $('#cmpDeltaDamage').textContent='—';
    $('#cmpRecommendation').className='compare-recommendation bad';
    $('#cmpRecommendation').textContent='這顆魔石會與目前已裝備的同種魔石重複，且沒有合法替換位置。';
  }else{
    const candidateStone=getStone(candidate.stoneId);
    const oldStone=state.equipped[best.index]?.stoneId?getStone(state.equipped[best.index].stoneId):null;
    $('#cmpBestPanel').textContent=best.panel.toLocaleString('zh-TW');
    $('#cmpBestReplace').textContent=`替換第 ${best.index+1} 格：${oldStone?.name||'空槽'}`;
    $('#cmpDeltaPanel').textContent=(best.delta>=0?'+':'')+best.delta;
    $('#cmpDeltaPanel').className=best.delta>=0?'positive':'negative';

    if(metric==='quick'){
      $('#cmpDeltaDamage').textContent=(best.damageDelta>=0?'+':'')+fmt(best.damageDelta,2)+'%';
      $('#cmpDeltaDamage').className=best.damageDelta>=0?'positive':'negative';
      $('#cmpDamageNote').textContent=`迅擊每 ${state.quickDamageRatio||30} 點 = 技能傷害 +1%`;
    }else{
      $('#cmpDeltaDamage').textContent='—';
      $('#cmpDeltaDamage').className='';
      $('#cmpDamageNote').textContent='此屬性尚無傷害換算公式';
    }

    const rec=$('#cmpRecommendation');
    rec.className='compare-recommendation '+(best.delta>0?'good':best.delta<0?'bad':'');
    if(best.delta>0){
      rec.innerHTML=`✅ <b>${candidateStone.name}</b> 最佳做法是替換第 <b>${best.index+1}</b> 格的 <b>${oldStone?.name||'空槽'}</b>。<br>面板 ${METRICS[metric].label} <b class="positive">+${best.delta}</b>${metric==='quick'?`，約等於技能傷害 <b class="positive">+${fmt(best.damageDelta,2)}%</b>`:''}。`;
    }else if(best.delta===0){
      rec.innerHTML=`➖ <b>${candidateStone.name}</b> 的最佳替換結果與目前配裝相同，面板沒有變化。`;
    }else{
      rec.innerHTML=`❌ <b>${candidateStone.name}</b> 即使採用最佳替換方式，面板仍會 <b class="negative">${best.delta}</b>。目前不建議替換。`;
    }
  }

  $('#cmpResultTable').innerHTML=rows.map(r=>{
    const legal=r.legal;
    const dd=r.damageDelta===null?'—':((r.damageDelta>=0?'+':'')+fmt(r.damageDelta,2)+'%');
    const delta=r.delta===null?'—':((r.delta>=0?'+':'')+r.delta);
    return `<tr>
      <td>第 ${r.index+1} 格</td>
      <td>${r.currentName}</td>
      <td class="${legal?'legal-yes':'legal-no'}">${legal?'可替換':'同種魔石重複'}</td>
      <td>${legal?r.panel.toLocaleString('zh-TW'):'—'}</td>
      <td class="${legal?(r.delta>=0?'positive':'negative'):''}">${delta}</td>
      <td class="${legal&&r.damageDelta!==null?(r.damageDelta>=0?'positive':'negative'):''}">${dd}</td>
    </tr>`;
  }).join('');
}

async function handleCompareImage(file){
  if(!file) return;
  const status=$('#cmpOcrStatus');
  try{
    status.textContent='圖片處理中…';
    if(!window.Tesseract) throw new Error('OCR 元件載入失敗，請確認網路連線。');

    const canvas=await preprocessImageForOCR(file);
    status.textContent='OCR 辨識中…';

    const result=await Tesseract.recognize(canvas,'chi_tra+eng',{
      logger:m=>{
        if(m.status==='recognizing text'){
          status.textContent=`OCR 辨識中… ${Math.round((m.progress||0)*100)}%`;
        }
      }
    });
    const raw=result?.data?.text||'';
    const stone=findBestStoneFromOCR(raw);
    const pot=findBestPotentialFromOCR(raw);
    if(stone) $('#cmpStone').value=stone.id;
    if(pot) $('#cmpPotential').value=pot.key;
    const value=extractPotentialValue(raw,pot?.name||'');
    if(Number.isFinite(value)) $('#cmpValue').value=value;
    updateSingleCompareInputInfo();
    status.textContent='辨識完成，請確認資料後按「開始比對」。';
  }catch(err){
    console.error(err);
    status.textContent='辨識失敗，請改用手動輸入。';
  }finally{
    $('#cmpImageInput').value='';
  }
}

function addComparedStoneToInventory(){
  const c=getSingleCompareCandidate();
  if(!c) return;
  state.inventory.push({id:uuid(),...c,favorite:false});
  persist();
  renderInventory();
  alert('已加入「我的魔石」。');
}

if($('#cmpStone')){
  renderSingleCompareInputs();
  $('#cmpStone').onchange=()=>{updateSingleCompareInputInfo();};
  $('#cmpPotential').onchange=()=>{
    const stone=getStone($('#cmpStone').value);
    const key=$('#cmpPotential').value;
    $('#cmpValue').value=getRange(stone,key)[0];
    updateSingleCompareInputInfo();
  };
  $('#runSingleCompareBtn').onclick=runSingleCompare;
  $('#addComparedToInventoryBtn').onclick=addComparedStoneToInventory;
  $('#cmpImageInput').onchange=e=>handleCompareImage(e.target.files?.[0]);
}
