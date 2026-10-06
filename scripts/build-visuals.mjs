import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import sharp from 'sharp';
import * as icons from 'simple-icons';

const bg = '#101316', panel = '#181D23', line = '#303942', white = '#F0F3F6', muted = '#A4B0BB', blue = '#84BFFF', mint = '#83D4BE', amber = '#EAC184';
const esc = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'})[c]);
const text = (x,y,value,size=18,color=white,extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${esc(value)}</text>`;
const box = (x,y,w,h,fill=panel) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${line}"/>`;
const svg = (w,h,body,style='') => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><style>text{font-family:Arial,Helvetica,sans-serif;letter-spacing:0}.mono{font-family:Consolas,Menlo,monospace}${style}</style><rect width="${w}" height="${h}" rx="8" fill="${bg}"/>${body}</svg>`;
async function save(path,content) { await mkdir(dirname(path),{recursive:true}); await writeFile(path,content); }
async function webp(path,content) { await mkdir(dirname(path),{recursive:true}); await sharp(Buffer.from(content)).webp({quality:86,effort:6}).toFile(path); }

await save('assets/hero/profile-hero.svg', svg(980,210,
  `<path d="M36 35h42" stroke="${blue}" stroke-width="3"/>${text(94,41,'BUILD IN PUBLIC / DEVELOPER AT WORK',13,muted)}${text(490,104,'YERKO BARRERA',44,white,'text-anchor="middle" font-weight="700"')}${text(490,142,'FULL STACK DEVELOPER',20,blue,'text-anchor="middle"')}${text(490,174,'INGENIERO EN COMPUTACIÓN E INFORMÁTICA',14,muted,'text-anchor="middle"')}`));
await save('assets/hero/sign-off.svg', svg(980,92,text(490,54,'BUILD.   LEARN.   SHIP.   REPEAT.',24,white,'text-anchor="middle" font-weight="700"')));

function workflow(mobile=false,poster=false) {
  const w=mobile?600:980,h=mobile?490:510,p=mobile?26:38;
  let styles='@keyframes blink{0%,45%{opacity:1}55%,100%{opacity:0}}.cursor{animation:blink 1s steps(1) infinite}.scene{opacity:0}.final{opacity:1}';
  const windows=[[0,1.2],[1.2,4.1],[4.1,6.5],[6.5,8.3],[8.3,10],[10,12]];
  if(!poster) for(let i=0;i<windows.length;i++) {
    const [start,end]=windows[i],a=start/12*100,b=end/12*100;
    styles+=`@keyframes scene${i}{0%,100%{opacity:0}${a.toFixed(3)}%{opacity:0}${(a+.8).toFixed(3)}%,${(b-.8).toFixed(3)}%{opacity:1}${b.toFixed(3)}%{opacity:0}}.s${i}{animation:scene${i} 12s linear infinite;opacity:0}`;
  }
  const frame=`${text(p,35,'WORKSPACE / KOYARXS',13,muted)}${text(w-p,35,'CODE  /  TEST  /  BUILD  /  SHIP',mobile?10:12,blue,'text-anchor="end"')}<path d="M0 54h${w}" stroke="${line}"/>${text(p,h-18,'Illustrative session · no production data',11,muted)}${text(w-p,h-18,'12s / loop',11,muted,'text-anchor="end"')}`;
  let boot=`${text(p,117,'> initializing workspace...',mobile?22:24,blue,'class="mono"')}${text(p,158,'> loading projects...',20,muted,'class="mono"')}${text(p,197,'> loading development environment...',mobile?17:20,muted,'class="mono"')}${text(p,282,'YERKO BARRERA',mobile?36:42,white,'font-weight="700"')}${text(p,321,'Software Developer',21,mint)}${text(p,360,'_',24,blue,'class="cursor mono"')}`;
  const lines=mobile ? ['@Injectable()','class FraudRiskService {','  async analyzeTransaction(tx) {','    const risk = await evaluate(tx);','    return {','      transactionId: tx.id,','      risk','    };','  }','}'] : ['@Injectable()','export class FraudRiskService {','  async analyzeTransaction(','    transaction: Transaction','  ) {','    const risk = await','      this.riskEngine.evaluate(transaction);','','    return { transactionId: transaction.id, risk };','  }','}'];
  let code=`${text(p,91,'fraud-risk.service.ts',18,white,'class="mono"')}${text(p,119,'Illustrative service / risk classification',12,muted)}`;
  for(let i=0;i<lines.length;i++) {
    const start=11+i*1.6,end=start+1.5;
    styles+=`@keyframes type${i}{0%,${start}%{width:0}${end}%,100%{width:${w}px}}#clip${i} rect{animation:type${i} 12s steps(${Math.max(lines[i].length,1)}) infinite}`;
    code+=`<defs><clipPath id="clip${i}"><rect width="${w}" height="30" x="0" y="${143+i*24-22}"/></clipPath></defs><g clip-path="url(#clip${i})">${text(p,143+i*24,lines[i],mobile?18:18,i===0?mint:i===1?blue:white,'class="mono"')}</g>`;
  }
  code+=`<rect x="${p}" y="${mobile?389:413}" width="9" height="20" fill="${blue}" class="cursor"/>`;
  if(!mobile) code+=`${box(660,141,282,182)}${text(682,176,'SERVICE CONTRACT',12,muted)}${text(682,220,'transaction → rules',19,blue,'class="mono"')}${text(682,257,'classification → risk',17,mint,'class="mono"')}${text(682,297,'Validate. Analyze. Return.',13,muted)}`;
  let terminal=text(p,91,'TERMINAL / ILLUSTRATIVE SESSION',13,muted);
  const outputs=[['$ npm run test',blue],['Running test suites...',muted],['PASS  risk rules / transactions',mint],['PASS  auth / batch / risk engine',mint],['Test suites passed (demo).',white],['$ git status',blue],['working tree clean',muted],['$ git push origin main',blue],['Enumerating / writing objects...',muted],['Done.',mint]];
  outputs.forEach(([value,color],i)=>{
    const a=35+i*1.5,b=a+.5;
    styles+=`@keyframes out${i}{0%,${a}%{opacity:0}${b}%,100%{opacity:1}}.o${i}{animation:out${i} 12s linear infinite}`;
    terminal+=text(p,130+i*29,value,mobile?18:21,color,`class="mono o${i}"`);
  });
  let stack=text(p,96,'ONE PRODUCT. CONNECTED LAYERS.',mobile?21:26,white,'font-weight="700"');
  const stages=[['FRONTEND','React / Next.js / TypeScript',blue],['REST API + BACKEND','NestJS / Node.js',mint],['DATABASE','PostgreSQL / Prisma',amber],['INFRASTRUCTURE','Docker',blue]];
  stages.forEach(([name,tech,color],i)=> {
    const y=132+i*75;
    stack+=`<path d="M${p+9} ${y}v58" stroke="${color}" stroke-width="2"/>${text(p+30,y+19,name,14,color,'font-weight="700"')}${text(p+30,y+46,tech,mobile?19:23,white)}`;
  });
  styles+='@keyframes flow{to{stroke-dashoffset:-40}}.flow{stroke-dasharray:5 10;animation:flow 2s linear infinite}';
  stack+=`<path d="M${w-45} 150v258" stroke="${blue}" class="flow"/>`;
  let projects=text(p,99,'REAL PROJECTS / CURRENT WORK',mobile?22:27,white,'font-weight="700"');
  [['FRAUDSHIELD','Risk classification / academic MVP',blue],['FLYMASTER','Full Stack web platform / private',mint],['PAWLY','Currently building / early stage',amber]].forEach(([name,desc,color],i)=>{
    const y=147+i*97;
    projects+=`${text(p,y,name,mobile?26:32,color,'font-weight="700"')}${text(p,y+32,desc,mobile?17:20,muted)}`;
  });
  const final=`${text(w/2,174,'YERKO BARRERA',mobile?38:48,white,'text-anchor="middle" font-weight="700"')}${text(w/2,219,'Ingeniero en Computación e Informática',mobile?19:22,muted,'text-anchor="middle"')}${text(w/2,251,'Full Stack Developer',22,blue,'text-anchor="middle"')}${text(w/2,325,'BUILD. LEARN. SHIP. REPEAT.',mobile?23:29,white,'text-anchor="middle" font-weight="700"')}${text(w/2,367,'github.com/koyarxs',18,mint,'text-anchor="middle"')}`;
  styles+='@media(prefers-reduced-motion:reduce){*{animation:none!important}.scene{opacity:0!important}.final{opacity:1!important}}';
  const scenes=[boot,code,terminal,stack,projects,final].map((body,i)=>`<g class="scene s${i}${i===5?' final':''}">${body}</g>`).join('');
  return svg(w,h,frame+ (poster?`<g>${final}</g>`:scenes),styles);
}
await save('assets/animations/developer-workflow.svg',workflow());
await save('assets/animations/developer-workflow-mobile.svg',workflow(true));
await save('assets/animations/developer-workflow-poster.svg',workflow(false,true));

const phrases=['Building scalable applications','Designing APIs','Connecting frontend & backend','Learning every day','Shipping real projects'];
let typingStyles='',typingBody='';
phrases.forEach((phrase,i)=>{
  const a=i*20,b=a+20;
  typingStyles+=`@keyframes phrase${i}{0%,100%{opacity:0}${a+.1}%,${b-1}%{opacity:1}${b}%{opacity:0}}@keyframes reveal${i}{0%,${a}%{width:0}${a+10}%,${b-3}%{width:560px}${b}%,100%{width:0}}.p${i}{animation:phrase${i} 20s linear infinite}#r${i}{animation:reveal${i} 20s steps(${phrase.length}) infinite}`;
  typingBody+=`<defs><clipPath id="t${i}"><rect id="r${i}" width="560" height="56"/></clipPath></defs><g class="phrase p${i}" clip-path="url(#t${i})">${text(28,35,phrase+'_',19,blue,'class="mono"')}</g>`;
});
typingStyles+=' .phrase{opacity:0}@media(prefers-reduced-motion:reduce){*{animation:none!important}.phrase{opacity:0!important}.p0{opacity:1!important}#r0{width:560px!important}}';
await save('assets/animations/typing.svg',svg(560,56,typingBody,typingStyles));
const cursorCSS='@keyframes blink{50%{opacity:0}}.cursor{animation:blink 1.2s steps(1) infinite}@media(prefers-reduced-motion:reduce){*{animation:none!important}}';
await save('assets/animations/terminal-intro.svg',svg(640,340,
  ['yerko@dev:~$ whoami','> Full Stack Developer','','yerko@dev:~$ current-projects','> FraudShield / FlyMaster / Pawly','','yerko@dev:~$ status','> Building...'].map((v,i)=>text(30,42+i*34,v,20,i%3===0?blue:white,'class="mono"')).join('')+text(30,313,'_',24,mint,'class="cursor mono"'),cursorCSS));
await save('assets/animations/currently-building.svg',svg(980,224,
  `${text(36,41,'$ current_work',20,blue,'class="mono"')}${text(36,98,'FlyMaster',24,white,'font-weight="700"')}${text(36,128,'Full Stack platform / preparing deployment',15,muted)}${text(530,98,'Pawly',24,white,'font-weight="700"')}${text(530,128,'Early stage / planning the next iteration',15,muted)}<defs><clipPath id="progressA"><rect x="36" y="153" width="412" height="4"/></clipPath><clipPath id="progressB"><rect x="530" y="153" width="412" height="4"/></clipPath></defs><path d="M36 155h412M530 155h412" stroke="${line}" stroke-width="4"/><g clip-path="url(#progressA)"><rect class="moving" x="36" y="153" width="110" height="4" fill="${mint}"/></g><g clip-path="url(#progressB)"><rect class="moving delayed" x="530" y="153" width="110" height="4" fill="${amber}"/></g>${text(36,195,'Work in progress / no completion percentages',12,muted)}`,
  '@keyframes progress{from{transform:translateX(-120px)}to{transform:translateX(430px)}}.moving{animation:progress 6s linear infinite}.delayed{animation-delay:-3s}@media(prefers-reduced-motion:reduce){*{animation:none!important}}'));

const groups=[['FRONTEND',[['React','siReact'],['Next.js','siNextdotjs'],['TypeScript','siTypescript'],['Tailwind','siTailwindcss']]],['BACKEND',[['NestJS','siNestjs'],['Node.js','siNodedotjs'],['PHP','siPhp'],['Laravel','siLaravel']]],['DATABASE',[['PostgreSQL','siPostgresql'],['Prisma','siPrisma'],['MySQL','siMysql']]],['DEVOPS',[['Docker','siDocker'],['Actions','siGithubactions'],['Git','siGit']]],['TOOLS',[['Jest','siJest'],['Postman','siPostman'],['Jira','siJira']]]];
function techStack(mobile) {
  const w=mobile?600:980,row=mobile?115:85;
  let body='';
  groups.forEach(([label,items],i)=>{
    const y=i*row;
    body+=text(28,y+32,label,13,muted,'font-weight="700"');
    items.forEach(([name,key],j)=>{
      const icon=icons[key];if(!icon)throw Error('Missing icon: '+key);
      const x=mobile?28+j*140:210+j*180,iy=mobile?y+63:y+25;
      const color=['siNextdotjs','siPrisma'].includes(key)?white:'#'+icon.hex;
      body+=`<g transform="translate(${x} ${iy})"><path d="${icon.path}" fill="${color}"/></g>${text(x+33,iy+18,name,mobile?16:18,white)}`;
    });
    if(i<groups.length-1)body+=`<path d="M28 ${y+row-2}h${w-56}" stroke="${line}"/>`;
  });
  return svg(w,row*5+8,body);
}
await save('assets/stack/tech-stack.svg',techStack(false));
await save('assets/stack/tech-stack-mobile.svg',techStack(true));

function project(name,subtitle,status,nodes,accent) {
  let body=`${text(36,39,'PROJECT / ARCHITECTURE PREVIEW',12,muted)}${text(36,87,name,36,white,'font-weight="700"')}${text(36,120,subtitle,17,muted)}${text(942,42,status,12,accent,'text-anchor="end"')}`;
  nodes.forEach(([label,detail],i)=>{
    const x=36+i*235;
    body+=`${box(x,155,207,91)}<path d="M${x+18} 179h27" stroke="${accent}" stroke-width="2"/>${text(x+18,204,label,18,white,'font-weight="700"')}${text(x+18,229,detail,13,muted)}`;
    if(i<3)body+=`<path d="M${x+211} 200h20m-5-4 5 4-5 4" stroke="${accent}" fill="none"/>`;
  });
  return svg(980,276,body);
}
await webp('assets/projects/fraudshield.webp',project('FRAUDSHIELD','Risk Classification Platform','ACADEMIC MVP / v1.0.0',[['CSV','Simulated transactions'],['RISK RULES','Rules R1–R5'],['CLASSIFICATION','Low / Medium / High'],['TRACEABILITY','Dashboard / audit']],blue));
await webp('assets/projects/flymaster.webp',project('FLYMASTER','Full Stack Web Platform','PRIVATE / IN DEVELOPMENT',[['INTERFACE','Next.js / React / 3D'],['REST API','NestJS / validation'],['PERSISTENCE','PostgreSQL / Prisma'],['NOTIFICATION','SMTP / branded email']],mint));
await webp('assets/projects/pawly.webp',project('PAWLY','Pet Wellbeing Platform','EARLY STAGE / PROPOSED ARCHITECTURE',[['FRONTEND','Next.js / initial setup'],['BACKEND','NestJS / planned'],['DATA','PostgreSQL / planned'],['WORKFLOW','Scrum / Jira']],amber));
await webp('assets/video/profile-showreel-thumbnail.webp',svg(980,330,
  `${box(590,36,350,249)}${text(614,71,'WORKSPACE / DEMO',12,muted)}${text(614,118,'async build() {',19,blue,'class="mono"')}${text(614,155,'  await test();',19,mint,'class="mono"')}${text(614,192,'  return ship();',19,white,'class="mono"')}${text(614,229,'}',19,blue,'class="mono"')}${text(36,77,'CODE → TEST → BUILD → SHIP',14,mint)}${text(36,139,'WATCH MY',40,white,'font-weight="700"')}${text(36,191,'DEV SHOWREEL',40,white,'font-weight="700"')}${text(36,238,'Yerko Barrera / Full Stack Developer',17,muted)}${text(36,278,'SHOWREEL IN PREPARATION',12,amber)}`));
console.log('SVG animations, responsive variants and optimized WebP previews generated.');
