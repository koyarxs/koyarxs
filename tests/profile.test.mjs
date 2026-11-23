import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { escapeXml, publicStats, activityCalendar } from '../scripts/update-activity.mjs';

async function files(directory){const result=[];for(const entry of await readdir(directory,{withFileTypes:true})){const path=join(directory,entry.name);result.push(...(entry.isDirectory()?await files(path):[path]));}return result;}
test('SVG assets do not execute code or load external resources',async()=>{
  for(const path of (await files('assets')).filter(path=>path.endsWith('.svg'))){
    const svg=await readFile(path,'utf8');
    assert.ok(svg.startsWith('<svg'),path);
    assert.doesNotMatch(svg,/<script|foreignObject|onload=|javascript:|(?:href|src)=["']https?:/i,path);
    assert.ok((await stat(path)).size<250_000,path);
  }
});
test('static assets load locally and remain within the profile budget',async()=>{
  const readme=await readFile('README.md','utf8');
  const paths = new Set([...readme.matchAll(/assets\/[a-z\d/.-]+\.(?:svg|webp)/gi)].map(([path]) => path));
  assert.ok(paths.size >= 18, 'Both banners and the stack icons must be local');
  let bytes = 0;
  for (const path of paths) {
    const asset = await stat(path);
    assert.ok(asset.isFile(), path);
    bytes += asset.size;
  }
  assert.ok(bytes < 2_000_000, 'Rendered profile assets too heavy: ' + bytes);
});
test('Developer World assets have accessible titles, viewBoxes and reduced motion',async()=>{
  const dirs=['banners','characters','illustrations','svg','icons'];
  const paths=(await Promise.all(dirs.map(dir=>files('assets/'+dir)))).flat();
  paths.push('assets/animations/world-terminal.svg','assets/animations/world-workflow.svg','assets/animations/world-workflow-mobile.svg');
  let bytes=0;
  for(const path of paths){
    const content=await readFile(path,'utf8');
    assert.match(content,/viewBox="0 0 \d+ \d+"/,path);
    assert.match(content,/<title id="title">[^<]+<\/title>/,path);
    assert.match(content,/<desc id="desc">[^<]+<\/desc>/,path);
    assert.match(content,/prefers-reduced-motion:reduce/,path);
    assert.doesNotMatch(content,/https?:\/\/(?!www.w3.org)/,path);
    bytes+=(await stat(path)).size;
  }
  assert.equal(paths.length,39);
  assert.ok(bytes<300_000,`Developer World budget exceeded: ${bytes}`);
});
test('README presents the November overview and scopes the activity metrics', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /^<p align="center">\s+<img src="\.\/assets\/overview\/cabecera\.webp"/);
  assert.match(readme, /# Overview-Yerko-Barrera-Noviembre-2026/);
  assert.match(readme, /Licenciado en Ingeniería/);
  assert.match(readme, /Cloudflare.*Netlify/);
  assert.match(readme, /no confirman fraude/);
  assert.match(readme, /evolución Full Stack planificada/);
  assert.match(readme, /Commits públicos \| Contribuciones visibles/);
  assert.match(readme, /23 de noviembre de 2026/);
  assert.match(readme, /<summary>Ver los meses con actividad registrada<\/summary>/);
  assert.match(readme, /<img src="\.\/assets\/overview\/cierre\.webp"[^>]+>\s*<\/p>\s*$/);
  assert.doesNotMatch(readme, /Senior Developer|certificado en AWS|experto en Kubernetes|\d+ años como developer/i);
});
test('the workflow is explicitly illustrative and supports reduced motion',async()=>{
  const svg=await readFile('assets/animations/developer-workflow.svg','utf8');
  assert.match(svg,/Illustrative session/);
  assert.match(svg,/12s linear infinite/);
  assert.match(svg,/prefers-reduced-motion/);
  assert.doesNotMatch(svg,/32 tests passed|SMTP_PASS|Bearer |PRIVATE KEY/);
});
test('public stats exclude private repositories and escape labels',()=>{
  const svg=publicStats({public_repos:1},[{private:false,language:'TypeScript',stargazers_count:2},{private:true,language:'Secret',stargazers_count:900}],'<img>');
  assert.doesNotMatch(svg,/900|Secret|<img>/);
  assert.match(svg,/&lt;img&gt;/);
  assert.throws(()=>publicStats({},[],''));
});
test('calendar only renders validated counts and escapes dates',()=>{
  const svg=activityCalendar({totalContributions:2,weeks:[{contributionDays:[{date:'<script>',contributionCount:2}]}]},'today');
  assert.match(svg,/&lt;script&gt;/);
  assert.throws(()=>activityCalendar({totalContributions:2,weeks:[{contributionDays:[{contributionCount:-1}]}]},''));
  assert.equal(escapeXml('A&B'),'A&amp;B');
});
