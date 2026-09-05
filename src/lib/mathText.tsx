import { useMemo } from 'react';

// Minimal, dependency-free renderer for a LaTeX-lite subset (no KaTeX/MathJax).
// Supports: $...$ / $$...$$ delimiters, \frac, \sqrt, \binom, ^{}/_{}, common
// symbols/greek letters, and \text{}. Anything unrecognized degrades gracefully
// to plain (escaped) text so content never breaks rendering.

const SYMBOLS: Record<string, string> = {
  times: '&times;', cdot: '&sdot;', div: '&divide;', pm: '&plusmn;', mp: '&#8723;',
  leq: '&le;', le: '&le;', geq: '&ge;', ge: '&ge;', neq: '&ne;', ne: '&ne;',
  approx: '&asymp;', equiv: '&equiv;', sim: '&sim;', propto: '&prop;',
  infty: '&infin;', pi: '&pi;', theta: '&theta;', alpha: '&alpha;', beta: '&beta;',
  gamma: '&gamma;', Gamma: '&Gamma;', delta: '&delta;', Delta: '&Delta;',
  epsilon: '&epsilon;', varepsilon: '&epsilon;', zeta: '&zeta;', eta: '&eta;',
  lambda: '&lambda;', mu: '&mu;', nu: '&nu;', xi: '&xi;', rho: '&rho;',
  sigma: '&sigma;', Sigma: '&Sigma;', tau: '&tau;', phi: '&phi;', varphi: '&phi;',
  chi: '&chi;', psi: '&psi;', omega: '&omega;', Omega: '&Omega;',
  ldots: '&hellip;', cdots: '&hellip;', dots: '&hellip;',
  rightarrow: '&rarr;', to: '&rarr;', Rightarrow: '&rArr;', leftarrow: '&larr;',
  leftrightarrow: '&harr;', circ: '&deg;', angle: '&ang;', triangle: '&#9651;',
  sum: '&sum;', prod: '&prod;', int: '&int;', cap: '&cap;', cup: '&cup;',
  in: '&isin;', notin: '&notin;', subset: '&sub;', subseteq: '&sube;',
  emptyset: '&empty;', forall: '&forall;', exists: '&exist;', partial: '&part;',
  nabla: '&nabla;', star: '&lowast;', ast: '&lowast;', wedge: '&and;',
  vee: '&or;', neg: '&not;', perp: '&perp;', parallel: '&#8741;',
  degree: '&deg;', prime: '&prime;',
};

function escapeText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Finds the matching closing brace for the `{` at index i and returns [inner, indexAfterClose].
function parseGroup(s: string, i: number): [string, number] {
  let depth = 0;
  const start = i;
  do {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') depth--;
    i++;
  } while (depth > 0 && i < s.length);
  return [s.slice(start + 1, Math.max(start + 1, i - 1)), i];
}

function renderMath(src: string): string {
  let out = '';
  let i = 0;
  const n = src.length;

  while (i < n) {
    const ch = src[i];

    if (ch === '\\') {
      let j = i + 1;
      let cmd = '';
      while (j < n && /[a-zA-Z]/.test(src[j])) { cmd += src[j]; j++; }

      if (cmd === '') {
        // Escaped punctuation, e.g. \% or \$, or a stray backslash.
        out += escapeText(src[j] ?? '');
        i = j + 1;
        continue;
      }
      i = j;

      if (cmd === 'frac' || cmd === 'binom') {
        let k = i;
        while (src[k] === ' ') k++;
        if (src[k] === '{') {
          const [arg1, after1] = parseGroup(src, k);
          let m = after1;
          while (src[m] === ' ') m++;
          if (src[m] === '{') {
            const [arg2, after2] = parseGroup(src, m);
            i = after2;
            const top = renderMath(arg1);
            const bottom = renderMath(arg2);
            out += cmd === 'frac'
              ? `<span class="ba-frac"><span class="ba-num">${top}</span><span class="ba-den">${bottom}</span></span>`
              : `<span class="ba-binom">(<span class="ba-frac ba-binom-inner"><span class="ba-num">${top}</span><span class="ba-den">${bottom}</span></span>)</span>`;
            continue;
          }
        }
        out += escapeText(cmd);
        continue;
      }

      if (cmd === 'sqrt') {
        let indexHtml = '';
        if (src[i] === '[') {
          const closeIdx = src.indexOf(']', i);
          if (closeIdx !== -1) {
            indexHtml = renderMath(src.slice(i + 1, closeIdx));
            i = closeIdx + 1;
          }
        }
        let radicand: string;
        if (src[i] === '{') {
          const [arg, after] = parseGroup(src, i);
          i = after;
          radicand = renderMath(arg);
        } else {
          radicand = escapeText(src[i] ?? '');
          i++;
        }
        out += `<span class="ba-sqrt">${indexHtml ? `<sup class="ba-sqrt-index">${indexHtml}</sup>` : ''}&radic;<span class="ba-sqrt-content">${radicand}</span></span>`;
        continue;
      }

      if (cmd === 'text' || cmd === 'mathrm' || cmd === 'operatorname') {
        if (src[i] === '{') {
          const [arg, after] = parseGroup(src, i);
          i = after;
          out += `<span class="ba-text">${escapeText(arg)}</span>`;
          continue;
        }
      }

      if (cmd === 'left' || cmd === 'right') {
        continue; // sizing hints only — the following delimiter renders as plain text
      }

      if (cmd === 'overline' || cmd === 'bar' || cmd === 'vec' || cmd === 'hat') {
        if (src[i] === '{') {
          const [arg, after] = parseGroup(src, i);
          i = after;
          out += `<span class="ba-overline">${renderMath(arg)}</span>`;
          continue;
        }
      }

      if (cmd in SYMBOLS) {
        out += SYMBOLS[cmd];
        continue;
      }

      // Unknown command: unwrap its argument (if any) rather than breaking layout.
      if (src[i] === '{') {
        const [arg, after] = parseGroup(src, i);
        i = after;
        out += renderMath(arg);
        continue;
      }
      out += escapeText(cmd);
      continue;
    }

    if (ch === '^' || ch === '_') {
      const tag = ch === '^' ? 'sup' : 'sub';
      i++;
      if (src[i] === '{') {
        const [arg, after] = parseGroup(src, i);
        i = after;
        out += `<${tag}>${renderMath(arg)}</${tag}>`;
      } else if (src[i] === '\\') {
        let j = i + 1;
        let cmd = '';
        while (j < n && /[a-zA-Z]/.test(src[j])) { cmd += src[j]; j++; }
        out += `<${tag}>${SYMBOLS[cmd] ?? escapeText(cmd)}</${tag}>`;
        i = j;
      } else {
        out += `<${tag}>${escapeText(src[i] ?? '')}</${tag}>`;
        i++;
      }
      continue;
    }

    if (ch === '{' || ch === '}') { i++; continue; } // stray grouping braces

    out += escapeText(ch);
    i++;
  }

  return out;
}

function renderMixedText(text: string): string {
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let out = '';
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) out += escapeText(text.slice(lastIndex, match.index));
    const displayMode = match[1] !== undefined;
    const inner = match[1] ?? match[2] ?? '';
    const rendered = renderMath(inner);
    out += displayMode
      ? `<span class="ba-math-display">${rendered}</span>`
      : `<span class="ba-math">${rendered}</span>`;
    lastIndex = regex.lastIndex;
  }
  out += escapeText(text.slice(lastIndex));
  return out.replace(/\n/g, '<br />');
}

interface MathTextProps {
  text: string;
  className?: string;
}

// Renders a string containing LaTeX-lite math delimited by $...$ / $$...$$.
export function MathText({ text, className }: MathTextProps): JSX.Element {
  const html = useMemo(() => renderMixedText(text), [text]);
  // Safe by construction: plain-text segments are HTML-escaped and math markup
  // is generated only from the fixed templates above, never from raw input.
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
