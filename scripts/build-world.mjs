import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import * as icons from 'simple-icons';

const C = { bg:'#121B32', panel:'#202C49', ink:'#0B1224', white:'#F4F7FF', muted:'#BACAE4', blue:'#74A9FF', cyan:'#69DFEB', mint:'#82E2B5', yellow:'#FFE294', orange:'#FFB078', violet:'#B9A4FF', pink:'#F4A8CD' };
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'})[c]);
const t = (x,y,value,size=20,color=C.white,extra='') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" ${extra}>${esc(value)}</text>`;
const r = (x,y,w,h,fill=C.panel,rx=8,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const p = (d,color=C.cyan,width=3,extra='') => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const circle=(x,y,r,fill,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const group=(x,y,body,scale=1,cls='')=>`<g transform="translate(${x} ${y}) scale(${scale})"><g class="${cls}">${body}</g></g>`;
const CSS=`text{font-family:Arial,Helvetica,sans-serif;letter-spacing:0}.mono{font-family:Consolas,Menlo,monospace}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes blink{0%,40%,100%{opacity:1}60%,85%{opacity:.35}}
@keyframes travel{0%{stroke-dashoffset:80}100%{stroke-dashoffset:0}}
@keyframes steam{0%{opacity:0;transform:translateY(5px)}40%{opacity:.7}100%{opacity:0;transform:translateY(-10px)}}
@keyframes type{0%,12%{clip-path:inset(0 100% 0 0)}65%,100%{clip-path:inset(0 0 0 0)}}
@keyframes hand{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-4deg)}}
@keyframes bugwalk{0%,100%{transform:translateX(0)}50%{transform:translateX(16px)}}
.float{animation:float 6s ease-in-out infinite}.late{animation-delay:-3s}.led{animation:blink 5s ease-in-out infinite}
.flow{stroke-dasharray:7 18;animation:travel 8s linear infinite}.steam{animation:steam 5s ease-out infinite}
.typing{animation:type 14s steps(40) infinite}.hand{transform-origin:40px 0;animation:hand 1.8s ease-in-out infinite}
.bugwalk{animation:bugwalk 10s ease-in-out infinite}
@media(prefers-reduced-motion:reduce){*{animation:none!important}.typing{clip-path:none!important}.steam{opacity:.5!important}}`;
function svg(w,h,body,title,desc='Original cartoon illustration. Decorative animation, not live telemetry.') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc><style>${CSS}</style>${r(0,0,w,h,C.bg)}${body}</svg>`;
}
async function save(path,body){await mkdir(dirname(path),{recursive:true});await writeFile(path,body);}
const outline=`stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"`;
function developer(pose='code',color=C.blue) {
  const feet=pose==='sit'||pose==='game'||pose==='code'?`M-17 61l-16 28h30M15 62l25 26h18`:`M-12 64v32h-16M14 64v32h17`;
  let prop='';
  if(pose==='plan')prop=`${r(17,15,50,38,C.yellow)}${p('M26 24h29M26 34h16M26 43h27',C.ink,2)}`;
  if(pose==='test')prop=`${p('M25 5l24 28',C.yellow,8)}${circle(27,5,17,'none',`stroke="${C.yellow}" stroke-width="5"`)}${circle(27,5,10,C.cyan)}`;
  if(pose==='guard')prop=`<path d="M20 6l35 8v22q-8 18-35 27Q-1 48-1 28V14Z" fill="${C.mint}" ${outline}/>${p('M10 29l10 10 20-24',C.ink,4)}`;
  if(pose==='game')prop=`${r(7,16,50,24,C.ink,8)}${p('M17 22v12m-6-6h12',C.cyan,3)}${circle(43,24,3,C.pink)}${circle(49,30,3,C.yellow)}`;
  if(pose==='phone')prop=`${r(21,-1,26,44,C.ink,5)}${r(25,4,18,29,C.cyan,2)}${circle(34,38,2,C.white)}`;
  if(pose==='coffee')prop=`${r(26,11,26,28,C.yellow,5)}${p('M51 16q18 0 8 18h-7',C.yellow,5)}`;
  const arm=pose==='wave'?'M-20 10l-22-20-5-24M20 12l15 23':pose==='plan'?'M-20 10l-6 28 35 5M20 10l17 22':pose==='code'?'M-20 12l-10 22 32 1M20 12l15 22 25 0':'M-20 10l-8 22 26 4M20 10l16 20 14-4';
  return `${p(feet,C.ink,11)}<path d="M-20-2Q0-10 20-2l9 60q-27 15-57 0Z" fill="${color}" ${outline}/>${p('M-5 5v18M6 5v18',C.white,2)}${p(arm,'#E7AE8A',10,pose==='code'?'class="hand"':'')}${circle(0,-36,25,'#F1C29F',outline)}<path d="M-25-32q-7-36 28-33 27 1 22 31L12-46l-15 6-19-3Z" fill="${C.ink}"/>${circle(-8,-33,2.5,C.ink)}${circle(9,-33,2.5,C.ink)}${p('M-5-21q6 5 12-1',C.ink,2)}${prop}${pose==='music'?p('M-27-33v-7q0-32 27-32t27 32v7',C.violet,8)+r(-31,-40,9,20,C.violet,4)+r(23,-40,9,20,C.violet,4):''}`;
}
function robot() {return `${p('M-9 18l-7 9M9 18l7 9',C.ink,5)}${r(-20,-15,40,37,C.mint,8,outline)}${p('M0-15v-9',C.mint,3)}${circle(0,-26,4,C.yellow)}${r(-14,-8,28,14,C.ink,5)}${circle(-7,-1,3,C.cyan)}${circle(7,-1,3,C.cyan)}${p('M-5 12h10',C.ink,2)}`;}
function bug() {return `${p('M-10-7l-9-6M10-7l9-6M-12 1h-10M12 1h10M-10 9l-9 7M10 9l9 7',C.pink,3)}<ellipse rx="13" ry="17" fill="${C.pink}" ${outline}/>${p('M0-11v23',C.ink,2)}${circle(-5,-8,2,C.ink)}${circle(5,-8,2,C.ink)}`;}
function cloud() {return `<path d="M-36 15q-26-10-10-30 12-13 29-6 6-29 31-23 24 4 22 28 23-7 28 16 6 20-17 22Z" fill="${C.white}" ${outline}/>${circle(-9,-1,2,C.ink)}${circle(8,-1,2,C.ink)}${p('M-5 6q6 5 12 0',C.ink,2)}`;}
function drone() {return `${p('M-13 0l-36-18M13 0l36-18M-13 6l-36 18M13 6l36 18',C.muted,7)}${r(-20,-8,40,22,C.white,7,outline)}${circle(0,15,8,C.ink)}${circle(0,15,4,C.cyan)}${[-49,49].map(x=>[-20,24].map(y=>`<ellipse cx="${x}" cy="${y}" rx="21" ry="4" fill="${C.blue}"/>`).join('')).join('')}`;}
function database(x,y,color=C.cyan){return group(x,y,`<path d="M-36 0v63q36 24 72 0V0" fill="${color}" ${outline}/><ellipse rx="36" ry="12" fill="${C.white}" ${outline}/>${p('M-35 22q35 21 70 0M-35 43q35 21 70 0',C.ink,2)}`);}
function monitor(x,y,w=145,h=90){return `${r(x,y,w,h,C.ink,8,`stroke="${C.blue}" stroke-width="3"`)}${p(`M${x+w/2} ${y+h}v16m-22 0h44`,C.muted,5)}${p(`M${x+14} ${y+22}h${w*.4}M${x+14} ${y+35}h${w*.7}M${x+14} ${y+48}h${w*.3}`,C.cyan,3)}${p(`M${x+14} ${y+61}h${w*.56}`,C.violet,3,'class="typing"')}`;}
function server(x,y){return `${r(x,y,52,92,C.panel,6,`stroke="${C.blue}" stroke-width="2"`)}${[14,38,62].map(d=>r(x+6,y+d,40,16,C.ink,3)+circle(x+39,y+d+8,3,C.mint,'class="led"')).join('')}`;}
function platform(d,color=C.violet){return `<path d="${d}" fill="${color}" ${outline}/>`;}
function label(value,x=28,y=38,color=C.cyan){return t(x,y,value,24,color,'font-weight="700"');}
function stars(w,h){return [[.09,.1],[.68,.1],[.94,.24],[.8,.4],[.18,.48]].map(([x,y],i)=>circle(w*x,h*y,2,C.yellow,i%2?'class="led"':'')).join('');}

function room(mobile=false,ecosystem=false) {
  const w=mobile?600:980,h=mobile?620:610;
  const title=mobile?32:44;
  let body=stars(w,h)+t(32,43,ecosystem?"YERKO'S DEV ROOM":"YERKO'S DEVELOPER WORLD",14,C.cyan,'font-weight="700"');
  if(!ecosystem)body+=t(32,98,"Hi, I'm Yerko Barrera",title,C.white,'font-weight="700"')+t(32,138,'Software Engineer · Full Stack Developer',mobile?22:26,C.cyan)+t(32,176,'Building software, learning every day',20,C.muted)+t(32,202,'and turning ideas into code.',20,C.muted);
  else body+=t(32,92,'One room. Many things to discover.',mobile?28:36,C.white,'font-weight="700"')+t(32,129,'Current stack + an expanding learning roadmap',19,C.muted);
  const artY=mobile?250:235;
  let art=`${r(5,0,850,280,'#1B2846',8)}${r(655,17,157,148,C.ink,8,`stroke="${C.blue}" stroke-width="3"`)}${circle(765,51,18,C.yellow)}${p('M733 17v148M655 97h157',C.blue,3)}${circle(678,43,2,C.white,'class="led"')}${circle(791,118,2,C.white)}${group(693,74,cloud(),.35,'float late')}${monitor(177,25,174,102)}${monitor(363,7,205,124)}${monitor(580,66,87,62)}${r(153,164,526,18,C.yellow,5)}${p('M169 183v108M658 183v108',C.blue,8)}${r(378,150,115,8,C.blue,2)}${group(449,148,developer('code'),.95)}${r(502,154,27,25,C.orange,4)}${p('M529 159q20 0 10 16h-10',C.orange,3)}${p('M508 145q-10-10 0-20m10 20q-10-10 0-20',C.white,2,'class="steam"')}${server(73,172)}${group(719,248,robot(),.9,'float')}${group(614,208,bug(),.45,'bugwalk')}${r(741,253,41,21,C.orange,3)}${p('M761 251q-29-25-16-37 21 8 16 37m0-10q28-20 29-3-9 16-29 13',C.mint,7)}${r(198,223,54,26,C.ink,8)}${p('M210 230v12m-6-6h12',C.cyan,3)}${circle(235,233,3,C.pink)}${t(355,267,'TODO: sleep',12,C.muted,'class="mono"')}`;
  if(ecosystem)art+=`${group(53,86,cloud(),.55,'float')}${group(722,188,drone(),.55,'float late')}${database(139,100,C.mint)}${t(43,45,'Cloud / exploring',15,C.cyan)}${t(68,146,'Data',15,C.white)}${t(700,229,'Drones',15,C.white)}${t(179,154,'React / Next',15,C.white)}${t(551,154,'Node / Nest',15,C.white)}${t(71,283,'Docker / CI',14,C.white)}`;
  if(mobile){
    art=`${r(20,0,560,286,'#1B2846',8)}${r(445,15,120,126,C.ink,8,`stroke="${C.blue}" stroke-width="3"`)}${circle(533,49,16,C.yellow)}${p('M502 15v126M445 82h120',C.blue,3)}${group(471,65,cloud(),.3,'float late')}${monitor(79,47,129,87)}${monitor(224,22,179,112)}${monitor(421,112,71,50)}${r(60,183,473,16,C.yellow,5)}${p('M76 200v86M515 200v86',C.blue,7)}${r(244,174,91,8,C.blue,2)}${r(350,175,15,7,C.violet,4)}${r(273,179,60,79,'#415982',14)}${group(307,171,developer('code'),.94)}${r(374,171,25,25,C.orange,4)}${p('M399 177q16 0 7 14h-7',C.orange,3)}${p('M380 165q-8-10 0-20m9 20q-8-10 0-20',C.white,2,'class="steam"')}${server(28,174)}${group(479,260,robot(),.75,'float')}${group(440,218,bug(),.43,'bugwalk')}${r(540,260,30,21,C.orange,3)}${p('M555 258q-23-20-13-30 17 7 13 30m0-9q23-15 24-1-8 12-24 10',C.mint,5)}${r(103,231,50,24,C.ink,8)}${p('M115 238v11m-5-5h10',C.cyan,3)}${circle(137,240,3,C.pink)}${t(247,283,'TODO: sleep',11,C.muted,'class="mono"')}`;
    if(ecosystem)art+=t(79,153,'React / Next',13,C.white)+t(265,153,'Node / Nest',13,C.white)+t(423,181,'QA',13,C.ink)+t(83,279,'Docker / CI',12,C.white);
  } else {
    art+=r(492,151,15,7,C.violet,4);
  }
  body+=mobile?group(0,artY,art):group(58,artY,art);
  if(ecosystem)body+=t(32,h-72,'Git · Jira · testing · security',mobile?17:19,C.mint)+t(32,h-49,'Roadmap: cloud · Kubernetes · React Native',mobile?16:19,C.yellow);
  else body+=t(32,h-37,'Original character. Real projects. Still leveling up.',mobile?18:21,C.muted);
  return svg(w,h,body,ecosystem?"Yerko's Dev Room":"Yerko's Developer World",'An original developer character writes code in a night-time room with monitors, a plant, a robot, a hidden bug and a window.');
}
await save('assets/banners/hero-developer-room.svg',room());
await save('assets/banners/hero-developer-room-mobile.svg',room(true));
await save('assets/illustrations/developer-room.svg',room(false,true));
await save('assets/illustrations/developer-room-mobile.svg',room(true,true));
await save('assets/characters/yerko-developer.svg',svg(240,230,group(120,110,developer('wave'),1.2),'Yerko / original developer character'));
await save('assets/characters/byte-robot.svg',svg(160,160,group(80,79,robot(),1.8,'float'),'Byte / delivery robot'));
await save('assets/characters/glitch-bug.svg',svg(160,160,group(72,80,bug(),1.8,'bugwalk'),'Glitch / unexpected bug'));

const worlds=[
  ['frontend-island','FRONTEND ISLAND','Active stack',C.cyan],
  ['backend-factory','BACKEND FACTORY','Active stack',C.mint],
  ['database-cave','DATABASE CAVE','Active + deepening',C.yellow],
  ['mobile-lab','MOBILE LAB','Future quest',C.pink],
  ['testing-lab','BUG HUNTER LAB','Active + learning',C.mint],
  ['devops-harbor','DEVOPS HARBOR','Active + learning',C.orange],
  ['cloud-city','CLOUD CITY','Exploring & learning',C.blue],
  ['security-fortress','SECURITY FORTRESS','Practice + learning',C.cyan],
  ['architecture-city','ARCHITECTURE CITY','Leveling up',C.yellow],
  ['git-forest','GIT FOREST','Active workflow',C.mint],
  ['quest-board','QUEST BOARD','Planning practice',C.violet],
  ['developer-toolbox','DEVELOPER TOOLBOX','Everyday tools',C.orange]
];
function landscape(key) {
  switch(key){
  case 'frontend-island': return `${platform('M66 246l259-50 205 51-214 76Z',C.mint)}${platform('M66 246l250 77 214-76-90 71-130 33-141-45Z','#627AB3')}${group(220,204,developer('plan'),.82)}${monitor(293,94,147,92)}${group(98,105,r(0,0,82,57,C.white)+r(9,9,63,11,C.blue,3)+r(9,29,26,19,C.violet,3)+r(42,29,30,19,C.mint,3),1,'float')}${group(457,152,r(0,0,65,45,C.white)+r(8,9,49,7,C.cyan,2)+r(8,25,32,10,C.orange,2),1,'float late')}${p('M260 207q55-60 100-20',C.yellow,3,'class="flow"')}`;
  case 'backend-factory': return `${r(45,127,510,143,'#2B3F54',8)}${platform('M45 127l60-45 61 45 60-45 61 45 60-45 60 45 60-45 68 45',C.mint)}${r(45,253,510,30,C.ink)}${p('M60 266h480',C.cyan,4,'class="flow"')}${[84,216,350,476].map((x,i)=>r(x,175,68,53,C.blue)+t(x+34,206,['REQ','API','DATA','RES'][i],16,C.ink,'text-anchor="middle" font-weight="700"')).join('')}${group(294,232,developer('code'),.65)}${group(516,301,robot(),.75,'float')}${p('M127 100V68h26v32M439 100V54h24v46',C.orange,10)}`;
  case 'database-cave': return `${platform('M31 290l30-142 61-64 69 19 56-28 79 11 42-19 102 55 83 168Z','#364267')}${platform('M99 289l22-123 98-43 137 2 120 66 24 98Z',C.ink)}${database(205,161,C.cyan)}${database(373,173,C.violet)}${group(289,233,developer('plan',C.orange),.62)}${group(121,263,robot(),.62,'float')}${r(87,282,40,18,C.yellow,3)}${circle(457,118,8,C.yellow,'class="led"')}${t(172,273,'SQL',18,C.white)}${t(358,279,'ORM',18,C.white)}`;
  case 'mobile-lab': return `${r(310,70,139,253,C.ink,20,`stroke="${C.pink}" stroke-width="4"`)}${r(320,90,119,206,'#344566',12)}${r(331,118,97,48,C.cyan)}${r(331,181,43,51,C.violet)}${r(384,181,43,51,C.mint)}${r(331,248,97,25,C.orange)}${circle(379,309,5,C.pink)}${group(177,231,developer('phone',C.pink),.9)}${group(451,110,r(0,0,89,42,C.white)+circle(14,21,5,C.mint)+p('M27 16h48M27 26h31',C.ink,2),1,'float')}${p('M103 299h188',C.blue,3)}`;
  case 'testing-lab': return `${r(58,227,489,13,C.white,3)}${p('M79 240v61M525 240v61',C.blue,7)}${group(163,180,developer('test',C.mint),.88)}${r(294,128,185,73,C.ink,8,`stroke="${C.mint}" stroke-width="3"`)}${t(386,171,'TEST PASSED',20,C.mint,'text-anchor="middle" font-weight="700"')}${p('M369 201v25',C.muted,5)}${group(447,271,bug(),1,'bugwalk')}${group(250,284,robot(),.65)}${p('M328 212v-36m-10 0h20M310 212q26 25 49 0',C.cyan,4)}${circle(333,210,7,C.yellow,'class="led"')}`;
  case 'devops-harbor': return `${platform('M30 248h540v75H30Z','#253B5A')}${p('M40 275q35-20 70 0t70 0t70 0t70 0t70 0t70 0t70 0',C.blue,3)}${platform('M140 237h329l-46 52H181Z',C.blue)}${r(181,185,98,51,C.mint)}${r(287,185,99,51,C.orange)}${r(236,125,101,51,C.violet)}${p('M243 132v36M256 132v36M301 192v36M316 192v36M196 192v36M211 192v36',C.ink,2)}${p('M84 248V84h405M86 84l75 38M388 84v83',C.yellow,5)}${group(91,185,developer('plan',C.orange),.62)}${group(483,222,robot(),.7,'float')}${t(285,157,'CI / CD',18,C.ink,'text-anchor="middle" font-weight="700"')}`;
  case 'cloud-city': return `${group(300,257,cloud(),3.3,'float')}${r(164,98,55,128,C.blue)}${r(237,60,77,166,C.violet)}${r(335,107,81,118,C.cyan)}${[175,249,347].map(x=>[125,149,173].map(y=>r(x,y,15,12,C.yellow,2,'class="led"')).join('')).join('')}${group(111,237,developer('plan',C.yellow),.72)}${group(480,110,cloud(),.7,'float late')}${p('M147 170q105-65 274-1',C.white,3,'class="flow"')}${t(278,90,'?',36,C.white,'text-anchor="middle" font-weight="700"')}`;
  case 'security-fortress': return `${platform('M103 290V139h25v-28h30v28h25v-28h30v28h166v-28h30v28h25v-28h30v28h32v151Z','#3D5976')}${r(258,203,85,87,C.ink,36)}${group(292,185,developer('guard',C.cyan),.8)}${server(149,178)}${database(425,206,C.mint)}${p('M114 110q182-96 364 0',C.mint,4)}${group(63,278,bug(),.7,'bugwalk')}${t(259,303,'AUTH',17,C.white)}${circle(383,133,6,C.yellow,'class="led"')}`;
  case 'architecture-city': return `${platform('M37 283l246-67 272 69-244 64Z','#41536D')}${r(83,164,82,118,C.blue)}${r(220,103,92,160,C.mint)}${r(377,164,85,120,C.violet)}${p('M165 202h55M312 202h65',C.yellow,8)}${p('M479 277V64h-173M480 64l-72 64M350 64v80',C.orange,5)}${group(324,268,developer('plan',C.yellow),.75)}${[103,239,399].map(x=>r(x,185,29,38,C.ink,3)).join('')}${t(112,153,'UI',18,C.white)}${t(244,91,'API',18,C.white)}${t(388,152,'DATA',18,C.white)}`;
  case 'git-forest': return `${p('M73 293h456M119 293q39-124 146-124t94-66M255 293q48-70 199-70',C.mint,6)}${[104,218,330,444].map((x,i)=>circle(x,293,10,C.cyan)+p(`M${x} 100v130`,C.orange,6)+platform(`M${x-44} 188l44-86 44 86Z`,i%2?C.mint:'#569E8A')).join('')}${group(174,232,developer('coffee',C.mint),.62)}${circle(265,169,11,C.yellow,'class="led"')}${circle(379,227,10,C.pink)}${p('M73 293h456',C.white,3,'class="flow"')}${t(477,283,'main',19,C.white)}${t(316,84,'feature/*',18,C.cyan)}`;
  case 'quest-board': return `${r(49,84,502,193,'#344463',8,`stroke="${C.yellow}" stroke-width="4"`)}${[66,162,258,354,450].map((x,i)=>t(x+39,109,['BACKLOG','TO DO','BUILD','REVIEW','DONE'][i],12,C.white,'text-anchor="middle"')+r(x,124,79,129,C.ink,4)+r(x+8,137,63,31,[C.blue,C.pink,C.yellow,C.violet,C.mint][i],3)+p(`M${x+19} 148h39M${x+19} 157h23`,C.ink,2)).join('')}${group(278,274,developer('plan',C.violet),.7)}${group(518,310,robot(),.7,'float')}${p('M100 184h407',C.mint,3,'class="flow"')}`;
  case 'developer-toolbox': return `${platform('M92 219h414l-29 93H119Z',C.orange)}${p('M219 220v-46h160v46',C.yellow,8)}${monitor(82,115,100,67)}${r(397,120,62,80,C.mint,6)}${p('M419 135v44M410 149h26',C.ink,4)}${group(298,161,developer('plan',C.orange),.66)}${circle(463,205,23,C.blue)}${p('M452 205h22M463 194v22',C.ink,4)}${group(164,265,robot(),.75)}${t(262,290,'TOOLS',20,C.ink,'font-weight="700"')}`;
  default: throw Error('Unknown world');
  }
}
for(const [key,name,status,accent] of worlds){
  await save(`assets/illustrations/${key}.svg`,svg(600,360,label(name,28,38,accent)+t(28,66,status,16,C.muted)+landscape(key),name));
}
function universe(mobile=false){
  const w=mobile?600:980,cols=mobile?2:3,cell=mobile?272:300,h=mobile?956:684;
  let body=label('MY TECH UNIVERSE')+t(28,67,'Choose a world. Follow the learning path.',18,C.muted);
  worlds.forEach(([key,name,status,color],i)=>{
    const x=28+(i%cols)*cell,y=99+Math.floor(i/cols)*140;
    body+=r(x,y,cell-20,120,C.panel,8,`stroke="${color}" stroke-opacity=".45"`)+circle(x+29,y+30,12,color)+t(x+53,y+36,name,16,C.white,'font-weight="700"')+t(x+19,y+94,status,15,C.muted);
    const mini=key==='mobile-lab'?r(0,-15,20,36,C.pink,4):key==='cloud-city'?cloud():key==='git-forest'?p('M0 15v-30m0 12 18-14M0 3l-18-10',C.mint,4):key==='security-fortress'?developer('guard'):key==='database-cave'?database(0,-18):key==='devops-harbor'?r(-24,-17,50,35,C.orange):key==='testing-lab'?bug():robot();
    body+=group(x+cell-65,y+69,mini,key==='security-fortress'?.3:key==='cloud-city'?.5:.6,'');
  });
  return svg(w,h,body,'Map of twelve technology worlds');
}
await save('assets/svg/tech-universe-map.svg',universe());
await save('assets/svg/tech-universe-map-mobile.svg',universe(true));
await save('assets/svg/player-profile.svg',svg(600,494,
  label('PLAYER PROFILE')+group(486,178,developer('wave'),1.05)+group(484,319,robot(),.85,'float')+
  [['PLAYER','Yerko Barrera'],['CLASS','Software Engineer'],['SPECIALIZATION','Full Stack Development'],['BACKGROUND','IT Support'],['MAIN QUEST','Build. Learn. Improve.'],['CURRENT STATUS','Building & Learning']].map(([a,b],i)=>t(28,83+i*57,a,12,C.muted)+t(28,106+i*57,b,22,C.white,'font-weight="700"')).join('')+
  circle(42,434,5,C.mint,'class="led"')+t(57,439,'ONLINE / playful status, not presence',14,C.muted)+t(28,475,'Side quests: gaming · music · personal projects',17,C.yellow), 'Player profile / professional identity'));

const commands=[['whoami','Yerko Barrera'],['education','Computer & Informatics Engineer'],['role','Software Engineer / Full Stack Developer'],['current_mission','Build. Learn. Improve.'],['location','Chile'],['status','Ready to code']];
const terminalCSS=commands.map((_,i)=>`@keyframes terminal${i}{0%,${i*10}%{opacity:0;clip-path:inset(0 100% 0 0)}${i*10+1}%{opacity:1}${i*10+8}%,100%{opacity:1;clip-path:inset(0 0 0 0)}}.terminal${i}{animation:terminal${i} 24s steps(42) infinite}@media(prefers-reduced-motion:reduce){.terminal${i}{opacity:1!important;clip-path:none!important}}`).join('');
await save('assets/animations/world-terminal.svg',svg(600,476,
  `<style>${terminalCSS}</style>`+label('yerko@dev:~',28,35)+commands.map(([a,b],i)=>`<g class="terminal${i}">${t(25,77+i*65,'$ '+a,18,C.mint,'class="mono"')}${t(25,102+i*65,b,19,C.white,'class="mono"')}</g>`).join('')+t(25,455,'_',23,C.cyan,'class="mono led"'), 'Terminal / fictional presentation, not a running shell'));

const skills=[['Frontend','ACTIVE',C.mint],['Backend','ACTIVE',C.mint],['Database','ACTIVE',C.mint],['Testing','LEVELING UP',C.yellow],['Architecture','LEVELING UP',C.yellow],['DevOps','LEVELING UP',C.yellow],['Cybersecurity','LEVELING UP',C.yellow],['Cloud','FUTURE QUEST',C.violet],['Mobile','FUTURE QUEST',C.violet]];
function skillTree(mobile=false){
  const w=mobile?600:980,cols=mobile?2:3,h=mobile?715:480,dx=mobile?274:307;
  let b=label('SKILL TREE')+t(28,70,'Software engineering / always growing',21,C.white)+p(`M${w/2} 82v29`,C.blue,4);
  skills.forEach(([name,status,color],i)=>{
    const x=28+i%cols*dx,y=121+Math.floor(i/cols)*112;
    b+=p(`M${x+21} ${y}v73`,color,3)+circle(x+21,y+12,8,color)+t(x+42,y+28,name,21,C.white,'font-weight="700"')+t(x+42,y+59,status,14,color);
  });
  return svg(w,h,b,'Skill tree / qualitative learning roadmap');
}
await save('assets/svg/skill-tree.svg',skillTree());
await save('assets/svg/skill-tree-mobile.svg',skillTree(true));
await save('assets/svg/current-quest.svg',svg(600,290,label('CURRENT QUEST')+t(28,88,'Become a stronger Software Engineer',25,C.white,'font-weight="700"')+t(28,126,'Full Stack → architecture → quality',21,C.cyan)+t(28,162,'DevOps · security · cloud · mobile',21,C.muted)+p('M28 204h544',C.panel,8)+p('M28 204h544',C.mint,4,'class="flow"')+t(28,253,'Learning journey / not a proficiency score',18,C.yellow),'Learning quest / no percentages'));

function mission(name,type){
  let art;
  if(type==='risk')art=`${group(162,236,developer('guard'),.83)}${monitor(278,116,210,124)}${p('M225 226h271',C.yellow,3,'class="flow"')}${r(278,253,62,28,C.mint,3)}${r(352,253,62,28,C.yellow,3)}${r(426,253,62,28,C.pink,3)}${t(384,275,'RISK / not confirmed fraud',13,C.ink,'text-anchor="middle"')}`;
  else if(type==='drone')art=`${group(393,142,drone(),1.2,'float')}${monitor(84,149,151,100)}${group(279,232,developer('phone'),.8)}${database(490,250,C.mint)}${p('M243 205h66M369 243h95',C.cyan,3,'class="flow"')}${server(353,225)}`;
  else art=`${group(342,225,developer('plan',C.violet),.95)}${monitor(75,113,150,95)}${group(489,248,robot(),.82,'float')}${[123,164,205].map(x=>circle(x,270,9,C.pink)).join('')}${circle(164,301,20,C.pink)}${t(32,327,'Frontend started / Full Stack planned',18,C.muted)}`;
  return svg(600,360,label(name)+t(28,67,type==='risk'?'MISSION: DETECT RISK / academic MVP':type==='drone'?'MISSION: CONNECT AIR & WEB / building':'MISSION: PET WELLBEING / early stage',14,C.muted)+art,`${name} / conceptual project mission`);
}
await save('assets/illustrations/mission-fraudshield.svg',mission('FRAUDSHIELD','risk'));
await save('assets/illustrations/mission-flymaster.svg',mission('FLYMASTER','drone'));
await save('assets/illustrations/mission-pawly.svg',mission('PAWLY','pets'));
await save('assets/illustrations/code-garden.svg',svg(600,200,label('CODE GARDEN')+t(28,71,'Every contribution is a little growth.',20,C.muted)+p('M30 169h540',C.mint,3)+[67,139,211,386,470,531].map((x,i)=>p(`M${x} 169v-${24+i%3*15}`,C.mint,4)+platform(`M${x} ${145-i%3*15}q-27-34-31-10t31 17q29-32 31-8t-31 1`,C.mint)).join('')+group(294,140,robot(),.7,'float'), 'Garden decoration / actual contribution graph is separate'));
await save('assets/illustrations/boss-battle.svg',svg(600,350,label('BOSS BATTLES')+t(28,69,'Every bug is just another boss fight.',20,C.muted)+group(163,228,developer('test'),1)+group(442,220,bug(),2,'bugwalk')+p('M234 210h124',C.cyan,4,'class="flow"')+t(272,194,'TESTS',18,C.mint)+t(261,237,'LOGS',18,C.yellow)+t(237,277,'DEBUGGER',18,C.blue)+t(28,328,'Unexpected bugs · dependency conflicts · merge conflicts',16,C.muted),'Bug boss battle / debugging practice'));
function life(pose,title,line){return svg(600,370,label(title)+t(28,69,line,18,C.muted)+monitor(315,101,177,112)+r(60,236,479,12,C.violet,3)+group(210,225,developer(pose,C.violet),.94)+(pose==='music'?t(487,94,'♪',35,C.pink)+t(121,126,'♫',28,C.yellow):pose==='game'?r(475,261,10,10,C.cyan,0)+r(489,251,10,10,C.yellow,0)+r(503,271,10,10,C.pink,0):group(510,288,robot(),.55,'float'))+t(30,347,'Recharge is part of the process.',17,C.muted),title);}
await save('assets/illustrations/gaming-room.svg',life('game','GAMING / RESPAWN','Gaming sometimes — even developers need to respawn.'));
await save('assets/illustrations/music-chill.svg',life('music','MUSIC & CHILL','Music, chill & recharge.'));
await save('assets/illustrations/coding-for-fun.svg',life('code','CODING FOR FUN','What if this idea could actually work?'));
await save('assets/svg/developer-energy.svg',svg(600,343,label('DEVELOPER ENERGY')+[['Coffee',7],['Coding',10],['Gaming',6],['Music',8],['Debugging',9],['Touch grass',4]].map(([name,value],i)=>t(28,88+i*35,name,18,C.white)+Array.from({length:10},(_,j)=>r(188+j*35,72+i*35,28,18,j<value?[C.orange,C.cyan,C.violet,C.pink,C.yellow,C.mint][i]:C.panel,3)).join('')).join('')+t(28,325,'Scientifically inaccurate. Purely for fun.',17,C.muted),'Fictional energy bars / humor, not personal metrics'));
const workflowSteps=['Idea','Planning / Jira','Feature branch','Development','Testing','Pull request','Code review','CI/CD','Deployment'];
function workflow(mobile=false){const w=mobile?600:980,cols=mobile?2:3,h=mobile?641:443,dx=mobile?275:310;let b=label('HOW I BUILD SOFTWARE')+t(28,68,'A practice to keep improving, not a claim of perfect process.',mobile?16:19,C.muted);workflowSteps.forEach((name,i)=>{const x=28+(i%cols)*dx,y=103+Math.floor(i/cols)*103;b+=circle(x+22,y+22,17,[C.cyan,C.mint,C.yellow][i%3])+p(`M${x+15} ${y+22}l6 6 10-12`,C.ink,3)+t(x+48,y+30,name,20,C.white)+p(`M${x+23} ${y+48}v33`,C.blue,3,'class="flow"');});return svg(w,h,b,'Development workflow / illustrative process');}
await save('assets/animations/world-workflow.svg',workflow());
await save('assets/animations/world-workflow-mobile.svg',workflow(true));

const badgeGroups=[['Frontend',[['HTML','siHtml5'],['CSS','siCss'],['JavaScript','siJavascript'],['TypeScript','siTypescript'],['React','siReact'],['Next.js','siNextdotjs'],['Tailwind','siTailwindcss']]],['Backend',[['Node.js','siNodedotjs'],['NestJS','siNestjs'],['Express','siExpress'],['PHP','siPhp'],['Laravel','siLaravel']]],['Database',[['PostgreSQL','siPostgresql'],['Prisma','siPrisma'],['MySQL','siMysql']]],['DevOps',[['Docker','siDocker'],['Actions','siGithubactions'],['Git','siGit']]],['Testing / tools',[['Jest','siJest'],['Postman','siPostman'],['Jira','siJira']]]];
let badgeBody=label('STACK / USED IN PROJECTS'),by=88;
for(const [name,items] of badgeGroups){badgeBody+=t(28,by,name,18,C.muted);by+=17;items.forEach(([name,key],i)=>{const x=28+i%3*183,y=by+Math.floor(i/3)*49;const icon=icons[key];if(!icon)throw Error('Missing official icon '+key);badgeBody+=r(x,y,172,38,C.panel,6)+group(x+9,y+7,`<path d="${icon.path}" fill="${C.cyan}"/>`)+t(x+42,y+25,name,16,C.white);});by+=Math.ceil(items.length/3)*49+29;}
await save('assets/icons/stack-badges.svg',svg(600,by+3,badgeBody,'Compact stack / technologies used in projects'));
await save('assets/banners/next-commit.svg',svg(600,363,label('THANKS FOR VISITING!',28,39,C.yellow)+t(28,81,'Always learning. Always building.',24,C.white)+group(467,193,developer('wave'),.85)+t(28,141,'$ git status',18,C.mint,'class="mono"')+t(28,175,'On branch life',18,C.white,'class="mono"')+t(28,209,'Your journey is up to date.',17,C.muted,'class="mono"')+t(28,252,'$ git commit -m "keep learning"',16,C.cyan,'class="mono"')+t(28,286,'Ready for the next challenge.',18,C.white)+t(28,336,'See you in the next commit.',21,C.yellow),'Thanks for visiting / fictional terminal sign-off'));
console.log('Developer World assets generated. Original vectors, no external image dependencies.');
