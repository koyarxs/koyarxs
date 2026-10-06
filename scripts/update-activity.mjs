import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const escapeXml = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'})[c]);
const text=(x,y,value,size=16,color='#F0F3F6',extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${escapeXml(value)}</text>`;
const wrap=(h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="980" height="${h}" viewBox="0 0 980 ${h}"><style>text{font-family:Arial,Helvetica,sans-serif;letter-spacing:0}</style><rect width="980" height="${h}" rx="8" fill="#101316"/>${body}</svg>`;
export function publicStats(user,repos,date) {
  if(!Number.isInteger(user.public_repos)||!Array.isArray(repos))throw Error('Invalid GitHub data');
  const publicRepos=repos.filter(repo=>repo.private===false);
  const languages=new Set(publicRepos.map(repo=>repo.language).filter(Boolean)).size;
  const stars=publicRepos.reduce((sum,repo)=>sum+repo.stargazers_count,0);
  if(!Number.isFinite(stars))throw Error('Invalid star counts');
  let body=text(32,35,'PUBLIC PROFILE / SNAPSHOT',12,'#A4B0BB')+text(948,35,date,12,'#A4B0BB','text-anchor="end"');
  [[publicRepos.length,'Repositorios públicos'],[languages,'Lenguajes en repos públicos'],[stars,'Stars en repos públicos']].forEach(([value,label],i)=>{
    const x=32+i*315;
    body+=text(x,98,value,38,'#84BFFF','font-weight="700"')+text(x,132,label,15,'#A4B0BB');
  });
  return wrap(161,body);
}
export function activityCalendar(calendar,date) {
  if(!Array.isArray(calendar?.weeks)||!Number.isInteger(calendar.totalContributions))throw Error('Invalid calendar data');
  let body=text(32,35,'CONTRIBUTION ACTIVITY / VISIBLE TO WORKFLOW',12,'#A4B0BB')+text(32,68,`${calendar.totalContributions} contribuciones · últimos 12 meses`,21)+text(948,35,date,12,'#A4B0BB','text-anchor="end"');
  const palette=['#232A32','#274665','#37678F','#5799C7','#91CDFF'];
  calendar.weeks.forEach((week,x)=>week.contributionDays.forEach((day,y)=>{
    if(!Number.isInteger(day.contributionCount)||day.contributionCount<0)throw Error('Invalid contribution count');
    const index=day.contributionCount===0?0:Math.min(4,1+Math.floor(Math.log2(day.contributionCount)));
    body+=`<rect x="${32+x*17}" y="${98+y*17}" width="13" height="13" rx="2" fill="${palette[index]}"><title>${escapeXml(day.date)}: ${day.contributionCount}</title></rect>`;
  }));
  return wrap(257,body+text(32,237,'Datos de GitHub / sin repositorios ni detalles privados',12,'#A4B0BB'));
}
export async function updateActivity() {
  const owner=process.env.GITHUB_REPOSITORY_OWNER||'koyarxs';
  if(owner!=='koyarxs')throw Error('This generator is restricted to koyarxs');
  const token=process.env.GITHUB_TOKEN;
  if(!token)throw Error('GITHUB_TOKEN is required; never store it in the repository');
  const headers={Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2026-03-10','User-Agent':'koyarxs-public-profile'};
  async function request(path,options={}) {
    const response=await fetch(`https://api.github.com${path}`,{headers,...options,signal:AbortSignal.timeout(30000)});
    if(!response.ok)throw Error(`GitHub request failed (${response.status})`);
    return response.json();
  }
  const user=await request(`/users/${owner}`);
  const repos=[];
  for(let page=1;page<=20;page++){
    const batch=await request(`/users/${owner}/repos?type=owner&per_page=100&page=${page}`);
    if(!Array.isArray(batch))throw Error('Invalid repositories response');
    repos.push(...batch.filter(repo=>repo.private===false));
    if(batch.length<100)break;
    if(page===20)throw Error('Repository pagination exceeded supported range');
  }
  const query='query($login: String!) { user(login:$login) { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } } } } }';
  const result=await request('/graphql',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({query,variables:{login:owner}})});
  if(result.errors||!result.data?.user)throw Error('GitHub calendar query failed');
  const date=new Intl.DateTimeFormat('es-CL',{timeZone:'America/Santiago',dateStyle:'medium'}).format(new Date());
  const stats=publicStats(user,repos,date),calendar=activityCalendar(result.data.user.contributionsCollection.contributionCalendar,date);
  await mkdir('assets/activity',{recursive:true});
  await writeFile('assets/activity/stats.svg',stats);
  await writeFile('assets/activity/calendar.svg',calendar);
  console.log('Public stats and visible contribution calendar updated from GitHub.');
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1])){
  updateActivity().catch(()=>{console.error('Activity update failed; previous snapshot retained.');process.exitCode=1;});
}
