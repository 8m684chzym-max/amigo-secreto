export function draw(people, exclusions = [], random = Math.random) {
  const ids = people.map(p => p.id);
  if (ids.length < 3 || ids.length > 30 || new Set(ids).size !== ids.length) throw new Error('Adiciona entre 3 e 30 participantes distintos.');
  const blocked = new Set(exclusions.flatMap(([a,b]) => [`${a}:${b}`, `${b}:${a}`]));
  const allowed = id => ids.filter(other => other !== id && !blocked.has(`${id}:${other}`));
  const result = {}, used = new Set();
  function search(remaining) {
    if (!remaining.length) return true;
    const options = remaining.map(id => ({id, candidates: allowed(id).filter(x => !used.has(x))})).sort((a,b) => a.candidates.length-b.candidates.length);
    const {id,candidates} = options[0];
    for (let i=candidates.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [candidates[i],candidates[j]]=[candidates[j],candidates[i]]; }
    for (const recipient of candidates) {
      result[id]=recipient; used.add(recipient);
      if (search(remaining.filter(x=>x!==id))) return true;
      used.delete(recipient); delete result[id];
    }
    return false;
  }
  if (!search(ids)) throw new Error('Não existe um sorteio possível. Remove algumas exclusões e tenta novamente.');
  return result;
}
export function encodeGift(data) {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  return btoa(Array.from(bytes,b=>String.fromCharCode(b)).join('')).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
}
export function decodeGift(token) {
  if (token.length > 20000) throw new Error('Link inválido.');
  const data=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(atob(token.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0))));
  if (data.v!==1 || !['group','giver','recipient','wishlist','date','budget'].every(k=>typeof data[k]==='string')) throw new Error('Link inválido.');
  return data;
}
