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
  const generated=['assets/activity/stats.svg','assets/activity/calendar.svg','assets/animations/contribution.svg','assets/animations/contribution-dark.svg'];
  for(const match of readme.matchAll(/assets\/[a-z\d/.-]+\.(?:svg|webp)/gi)){
    if(!generated.includes(match[0]))assert.ok((await stat(match[0])).isFile(),match[0]);
  }
  let bytes=0;for(const path of await files('assets'))bytes+=(await stat(path)).size;
  assert.ok(bytes<2_000_000,`Profile assets too heavy: ${bytes}`);
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
