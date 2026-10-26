import {test} from 'node:test';
import assert from 'node:assert/strict';
import {draw,encodeGift,decodeGift} from '../core.js';
const people=n=>Array.from({length:n},(_,i)=>({id:String(i)}));
test('100 sorteios por dimensão respeitam unicidade, exclusões simétricas e autoatribuição',()=>{for(let n=4;n<=30;n++)for(let run=0;run<100;run++){const result=draw(people(n),[['0','1']]);assert.equal(new Set(Object.values(result)).size,n);for(const [a,b] of Object.entries(result))assert.notEqual(a,b);assert.notEqual(result['0'],'1');assert.notEqual(result['1'],'0');}});
test('sorteio impossível e grupos inválidos',()=>{assert.throws(()=>draw(people(2)));assert.throws(()=>draw(people(31)));assert.throws(()=>draw(people(3),[['0','1'],['0','2']]));});
test('backtracking resolve todas as combinações de exclusões de quatro participantes',()=>{const pairs=[['0','1'],['0','2'],['0','3'],['1','2'],['1','3'],['2','3']];function permutations(a){return a.length?a.flatMap((x,i)=>permutations(a.filter((_,j)=>i!==j)).map(p=>[x,...p])):[[]];}for(let mask=0;mask<64;mask++){const exclusions=pairs.filter((_,i)=>mask&(1<<i));const valid=permutations(['0','1','2','3']).some(p=>p.every((b,i)=>String(i)!==b&&!exclusions.some(([x,y])=>(x===String(i)&&y===b)||(y===String(i)&&x===b))));if(valid)assert.ok(draw(people(4),exclusions,()=>0));else assert.throws(()=>draw(people(4),exclusions));}});
test('link contém apenas um presente e preserva Unicode',()=>{const gift={v:1,group:'Natal 🎄',giver:'João',recipient:'Inês',wishlist:'Chá & livros 📚',date:'2026-12-24',budget:'25'};assert.deepEqual(decodeGift(encodeGift(gift)),gift);assert.throws(()=>decodeGift('invalid'));assert.throws(()=>decodeGift(encodeGift({v:2})) );});

test('os quatro casais nunca oferecem entre si em 1000 sorteios',()=>{const pairs=[['0','1'],['2','3'],['4','5'],['6','7']];for(let i=0;i<1000;i++){const result=draw(people(8),pairs);for(const [a,b] of pairs){assert.notEqual(result[a],b);assert.notEqual(result[b],a);}}});
