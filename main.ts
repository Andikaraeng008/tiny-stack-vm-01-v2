import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

function F(P, I) {
  const A = new Int32Array(256), S = new Int32Array(256), C = new Int32Array(64);
  let s = 0, c = 0, p = 0, n = 0, i = 0, e = -1;
  const O = [];

  while (e < 0) {
    if (n >= 1e6) { e = 10; break; }
    if (p < 0 || p >= P.length) { e = 9; break; }
    const o = P[p];
    let l;
    if (o === 1) l = 1;
    else if (o === 2) l = 4;
    else if (o >= 48 && o <= 51) l = 2;
    else if (o === 0 || (o >= 3 && o <= 7) || (o >= 16 && o <= 34) || o === 52 || o === 64 || o === 65 || (o >= 80 && o <= 83)) l = 0;
    else { e = 5; break; }
    if (p + 1 + l > P.length) { e = 9; break; }
    const q = p + 1 + l;
    switch (o) {
      case 0: e = 0; break;
      case 1: if (s >= 256) { e = 3; break; } S[s++] = (P[p + 1] << 24) >> 24; p = q; n++; break;
      case 2: if (s >= 256) { e = 3; break; } S[s++] = P[p + 1] | (P[p + 2] << 8) | (P[p + 3] << 16) | (P[p + 4] << 24); p = q; n++; break;
      case 3: if (s < 1) { e = 2; break; } s--; p = q; n++; break;
      case 4: if (s < 1) { e = 2; break; } if (s >= 256) { e = 3; break; } S[s] = S[s - 1]; s++; p = q; n++; break;
      case 5: { if (s < 2) { e = 2; break; } const t = S[s - 1]; S[s - 1] = S[s - 2]; S[s - 2] = t; p = q; n++; break; }
      case 6: if (s < 2) { e = 2; break; } if (s >= 256) { e = 3; break; } S[s] = S[s - 2]; s++; p = q; n++; break;
      case 7: { if (s < 3) { e = 2; break; } const a = S[s - 3], b = S[s - 2], d = S[s - 1]; S[s - 3] = b; S[s - 2] = d; S[s - 1] = a; p = q; n++; break; }
      case 16: case 17: case 18: case 19: case 20: case 21: case 22: case 24: case 25: case 26: case 28: case 29: case 30: case 32: case 33: case 34: {
        if (s < 2) { e = 2; break; }
        const b = S[--s], a = S[--s];
        let r = 0;
        if (o === 16) r = (a + b) | 0;
        else if (o === 17) r = (a - b) | 0;
        else if (o === 18) r = Math.imul(a, b);
        else if (o === 19) { if (b === 0) { e = 4; break; } r = Math.trunc(a / b) | 0; }
        else if (o === 20) { if (b === 0) { e = 4; break; } r = (a % b) | 0; }
        else if (o === 21) { if (b === 0) { e = 4; break; } r = Math.trunc((a >>> 0) / (b >>> 0)) | 0; }
        else if (o === 22) { if (b === 0) { e = 4; break; } r = ((a >>> 0) % (b >>> 0)) | 0; }
        else if (o === 24) r = a & b;
        else if (o === 25) r = a | b;
        else if (o === 26) r = a ^ b;
        else if (o === 28) r = a << (b & 31);
        else if (o === 29) r = a >> (b & 31);
        else if (o === 30) r = (a >>> (b & 31)) | 0;
        else if (o === 32) r = a === b ? 1 : 0;
        else if (o === 33) r = a < b ? 1 : 0;
        else r = (a >>> 0) < (b >>> 0) ? 1 : 0;
        S[s++] = r; p = q; n++;
        break;
      }
      case 23: if (s < 1) { e = 2; break; } S[s - 1] = (-S[s - 1]) | 0; p = q; n++; break;
      case 27: if (s < 1) { e = 2; break; } S[s - 1] = ~S[s - 1]; p = q; n++; break;
      case 48: { const f = ((P[p + 1] | (P[p + 2] << 8)) << 16) >> 16; p = q + f; n++; break; }
      case 49: case 50: {
        if (s < 1) { e = 2; break; }
        const v = S[--s], f = ((P[p + 1] | (P[p + 2] << 8)) << 16) >> 16;
        p = (o === 49 ? v === 0 : v !== 0) ? q + f : q; n++;
        break;
      }
      case 51: if (c >= 64) { e = 7; break; } C[c++] = q; p = P[p + 1] | (P[p + 2] << 8); n++; break;
      case 52: if (c === 0) { e = 8; break; } p = C[--c]; n++; break;
      case 64: {
        if (s < 1) { e = 2; break; }
        const a = S[--s];
        if (a < 0 || a > 255) { e = 6; break; }
        S[s++] = A[a]; p = q; n++;
        break;
      }
      case 65: {
        if (s < 2) { e = 2; break; }
        const a = S[--s], v = S[--s];
        if (a < 0 || a > 255) { e = 6; break; }
        A[a] = v; p = q; n++;
        break;
      }
      case 80: {
        if (s < 1) { e = 2; break; }
        const v = S[--s], t = String(v);
        if (O.length + t.length > 65536) { e = 11; break; }
        for (let k = 0; k < t.length; k++) O.push(t.charCodeAt(k));
        p = q; n++;
        break;
      }
      case 81: {
        if (s < 1) { e = 2; break; }
        const v = S[--s];
        if (O.length + 1 > 65536) { e = 11; break; }
        O.push(v & 255); p = q; n++;
        break;
      }
      case 82: if (s >= 256) { e = 3; break; } S[s++] = i < I.length ? I[i++] : -1; p = q; n++; break;
      case 83: if (s < 1) { e = 2; break; } e = S[--s] & 255; break;
    }
  }
  return { out: Buffer.from(O), exit: e };
}

for (let n = 1; n <= 40; n++) {
  const id = "i" + String(n).padStart(3, "0");
  let prog = Buffer.alloc(0);
  let input = Buffer.alloc(0);
  try { prog = readFileSync("/input/" + id + "/program.bin"); } catch {}
  try { input = readFileSync("/input/" + id + "/input.bin"); } catch {}
  const r = F(prog, input);
  mkdirSync("/output/" + id, { recursive: true });
  writeFileSync("/output/" + id + "/stdout.bin", r.out);
  writeFileSync("/output/" + id + "/exit.txt", String(r.exit) + "\n");
}
