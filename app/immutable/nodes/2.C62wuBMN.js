import{s as De,f as ue,n as fe,o as xe,h as Pe,r as Te}from"../chunks/scheduler.DVjnP_wp.js";import{S as Ne,i as Le,e as d,s as P,b as M,y as ze,c as m,g as p,h as T,d as C,f as B,z as K,o as i,p as x,k as a,j as G,A as Ue,B as Z,C as _e,D as J,E as Ve,F as Ae,l as le,G as je}from"../chunks/index.mSr0B7jt.js";const Se=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function se(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}const Fe=""+new URL("../assets/letterboxd.C5LzH3o-.svg",import.meta.url).href,{document:ve}=Se;function ge(t,e,l){const s=t.slice();return s[17]=e[l],s}function be(t,e,l){const s=t.slice();return s[20]=e[l],s}function ye(t){let e,l,s,n,f="I want movie recommendations for",g,v,w,c,r="based on their",b,u,A,y,U,N,R="Diary",I,h,o,k,_,L="Reviews",Q,z,H="in the genre of",W,V,O,he="Any genre",ne,X,q,ae,oe,re,de,Y=se(t[7]),j=[];for(let E=0;E<Y.length;E+=1)j[E]=we(be(t,Y,E));return oe=Ue(t[12][0]),{c(){e=d("div"),l=d("form"),s=d("div"),n=d("span"),n.textContent=f,g=P(),v=d("input"),w=P(),c=d("span"),c.textContent=r,b=P(),u=d("div"),A=d("label"),y=d("input"),U=P(),N=d("span"),N.textContent=R,I=P(),h=d("label"),o=d("input"),k=P(),_=d("span"),_.textContent=L,Q=P(),z=d("span"),z.textContent=H,W=P(),V=d("select"),O=d("option"),O.textContent=he;for(let E=0;E<j.length;E+=1)j[E].c();ne=P(),X=d("div"),q=d("button"),ae=M("Go!"),this.h()},l(E){e=m(E,"DIV",{class:!0});var S=C(e);l=m(S,"FORM",{class:!0});var D=C(l);s=m(D,"DIV",{class:!0});var F=C(s);n=m(F,"SPAN",{class:!0,"data-svelte-h":!0}),K(n)!=="svelte-1hp6vja"&&(n.textContent=f),g=T(F),v=m(F,"INPUT",{type:!0,class:!0,placeholder:!0,style:!0}),w=T(F),c=m(F,"SPAN",{class:!0,"data-svelte-h":!0}),K(c)!=="svelte-19j1t6e"&&(c.textContent=r),b=T(F),u=m(F,"DIV",{class:!0});var $=C(u);A=m($,"LABEL",{class:!0});var ee=C(A);y=m(ee,"INPUT",{type:!0,class:!0,style:!0}),U=T(ee),N=m(ee,"SPAN",{"data-svelte-h":!0}),K(N)!=="svelte-1ioghqf"&&(N.textContent=R),ee.forEach(p),I=T($),h=m($,"LABEL",{class:!0});var te=C(h);o=m(te,"INPUT",{type:!0,class:!0,style:!0}),k=T(te),_=m(te,"SPAN",{"data-svelte-h":!0}),K(_)!=="svelte-1dywy6d"&&(_.textContent=L),te.forEach(p),$.forEach(p),Q=T(F),z=m(F,"SPAN",{class:!0,"data-svelte-h":!0}),K(z)!=="svelte-9l0nnq"&&(z.textContent=H),W=T(F),V=m(F,"SELECT",{class:!0,style:!0});var ce=C(V);O=m(ce,"OPTION",{class:!0,"data-svelte-h":!0}),K(O)!=="svelte-1lehjjt"&&(O.textContent=he);for(let ie=0;ie<j.length;ie+=1)j[ie].l(ce);ce.forEach(p),F.forEach(p),ne=T(D),X=m(D,"DIV",{class:!0});var me=C(X);q=m(me,"BUTTON",{type:!0,class:!0,style:!0});var pe=C(q);ae=B(pe,"Go!"),pe.forEach(p),me.forEach(p),D.forEach(p),S.forEach(p),this.h()},h(){i(n,"class","text-center"),i(v,"type","text"),i(v,"class","text-center inline-input w-full max-w-xs svelte-1tfgwzy"),v.required=!0,i(v,"placeholder","(some Letterboxd username)"),x(v,"--accent-color",t[6]),i(c,"class","text-center"),i(y,"type","radio"),y.__value="Diary",Z(y,y.__value),i(y,"class","custom-radio svelte-1tfgwzy"),x(y,"--accent-color",t[6]),i(A,"class","flex items-center space-x-2"),i(o,"type","radio"),o.__value="Reviews",Z(o,o.__value),i(o,"class","custom-radio svelte-1tfgwzy"),x(o,"--accent-color",t[6]),i(h,"class","flex items-center space-x-2"),i(u,"class","flex flex-row justify-center items-center space-x-6"),i(z,"class","text-center"),O.__value="",Z(O,O.__value),i(O,"class","svelte-1tfgwzy"),i(V,"class","custom-select w-full max-w-xs svelte-1tfgwzy"),x(V,"--accent-color",t[6]),t[1]===void 0&&Pe(()=>t[14].call(V)),i(s,"class","text-lg sm:text-xl text-gray-300 leading-relaxed flex flex-col items-center justify-center space-y-4"),i(q,"type","submit"),i(q,"class","btn-primary w-full max-w-xs svelte-1tfgwzy"),x(q,"--accent-color",t[6]),i(X,"class","flex justify-center"),i(l,"class","space-y-6 sm:space-y-8"),i(e,"class","w-full bg-[#1c2228] p-4 sm:p-8 rounded-lg shadow-lg"),oe.p(y,o)},m(E,S){G(E,e,S),a(e,l),a(l,s),a(s,n),a(s,g),a(s,v),Z(v,t[0]),a(s,w),a(s,c),a(s,b),a(s,u),a(u,A),a(A,y),y.checked=y.__value===t[2],a(A,U),a(A,N),a(u,I),a(u,h),a(h,o),o.checked=o.__value===t[2],a(h,k),a(h,_),a(s,Q),a(s,z),a(s,W),a(s,V),a(V,O);for(let D=0;D<j.length;D+=1)j[D]&&j[D].m(V,null);_e(V,t[1],!0),a(l,ne),a(l,X),a(X,q),a(q,ae),re||(de=[J(v,"input",t[10]),J(y,"change",t[11]),J(o,"change",t[13]),J(V,"change",t[14]),J(l,"submit",Ve(t[8]))],re=!0)},p(E,S){if(S&64&&x(v,"--accent-color",E[6]),S&1&&v.value!==E[0]&&Z(v,E[0]),S&64&&x(y,"--accent-color",E[6]),S&4&&(y.checked=y.__value===E[2]),S&64&&x(o,"--accent-color",E[6]),S&4&&(o.checked=o.__value===E[2]),S&128){Y=se(E[7]);let D;for(D=0;D<Y.length;D+=1){const F=be(E,Y,D);j[D]?j[D].p(F,S):(j[D]=we(F),j[D].c(),j[D].m(V,null))}for(;D<j.length;D+=1)j[D].d(1);j.length=Y.length}S&64&&x(V,"--accent-color",E[6]),S&130&&_e(V,E[1]),S&64&&x(q,"--accent-color",E[6])},d(E){E&&p(e),Ae(j,E),oe.r(),re=!1,Te(de)}}}function we(t){let e,l=t[20]+"",s;return{c(){e=d("option"),s=M(l),this.h()},l(n){e=m(n,"OPTION",{class:!0});var f=C(e);s=B(f,l),f.forEach(p),this.h()},h(){e.__value=t[20],Z(e,e.__value),i(e,"class","svelte-1tfgwzy")},m(n,f){G(n,e,f),a(e,s)},p:fe,d(n){n&&p(e)}}}function Ee(t){let e,l;return{c(){e=d("div"),l=d("div"),this.h()},l(s){e=m(s,"DIV",{class:!0});var n=C(e);l=m(n,"DIV",{class:!0,style:!0}),C(l).forEach(p),n.forEach(p),this.h()},h(){i(l,"class","loader svelte-1tfgwzy"),x(l,"--accent-color",t[6]),i(e,"class","flex justify-center items-center h-48 sm:h-64")},m(s,n){G(s,e,n),a(e,l)},p(s,n){n&64&&x(l,"--accent-color",s[6])},d(s){s&&p(e)}}}function Ce(t){let e,l,s,n,f,g,v,w;return{c(){e=d("div"),l=d("p"),s=M(t[5]),n=P(),f=d("button"),g=M("Try Again"),this.h()},l(c){e=m(c,"DIV",{class:!0});var r=C(e);l=m(r,"P",{class:!0});var b=C(l);s=B(b,t[5]),b.forEach(p),n=T(r),f=m(r,"BUTTON",{class:!0,style:!0});var u=C(f);g=B(u,"Try Again"),u.forEach(p),r.forEach(p),this.h()},h(){i(l,"class","text-red-500 mb-4"),i(f,"class","btn-secondary svelte-1tfgwzy"),x(f,"--accent-color",t[6]),i(e,"class","max-w-md mx-auto bg-[#1c2228] p-6 sm:p-8 rounded-lg shadow-lg text-center")},m(c,r){G(c,e,r),a(e,l),a(l,s),a(e,n),a(e,f),a(f,g),v||(w=J(f,"click",t[9]),v=!0)},p(c,r){r&32&&le(s,c[5]),r&64&&x(f,"--accent-color",c[6])},d(c){c&&p(e),v=!1,w()}}}function Ie(t){let e,l,s,n,f,g,v,w=se(t[3]),c=[];for(let r=0;r<w.length;r+=1)c[r]=ke(ge(t,w,r));return{c(){e=d("div");for(let r=0;r<c.length;r+=1)c[r].c();l=P(),s=d("div"),n=d("button"),f=M("Go again"),this.h()},l(r){e=m(r,"DIV",{class:!0});var b=C(e);for(let y=0;y<c.length;y+=1)c[y].l(b);b.forEach(p),l=T(r),s=m(r,"DIV",{class:!0});var u=C(s);n=m(u,"BUTTON",{class:!0,style:!0});var A=C(n);f=B(A,"Go again"),A.forEach(p),u.forEach(p),this.h()},h(){i(e,"class","grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12"),i(n,"class","btn-primary svelte-1tfgwzy"),x(n,"--accent-color",t[6]),i(s,"class","text-center mt-8 sm:mt-12")},m(r,b){G(r,e,b);for(let u=0;u<c.length;u+=1)c[u]&&c[u].m(e,null);G(r,l,b),G(r,s,b),a(s,n),a(n,f),g||(v=J(n,"click",t[9]),g=!0)},p(r,b){if(b&72){w=se(r[3]);let u;for(u=0;u<w.length;u+=1){const A=ge(r,w,u);c[u]?c[u].p(A,b):(c[u]=ke(A),c[u].c(),c[u].m(e,null))}for(;u<c.length;u+=1)c[u].d(1);c.length=w.length}b&64&&x(n,"--accent-color",r[6])},d(r){r&&(p(e),p(l),p(s)),Ae(c,r),g=!1,v()}}}function ke(t){let e,l,s,n,f,g,v,w=t[17].name+"",c,r,b=t[17].year+"",u,A,y,U,N=t[17].reason+"",R,I;return{c(){e=d("div"),l=d("img"),f=P(),g=d("div"),v=d("h3"),c=M(w),r=M(" ("),u=M(b),A=M(")"),y=P(),U=d("p"),R=M(N),I=P(),this.h()},l(h){e=m(h,"DIV",{class:!0,style:!0});var o=C(e);l=m(o,"IMG",{src:!0,alt:!0,class:!0}),f=T(o),g=m(o,"DIV",{class:!0});var k=C(g);v=m(k,"H3",{class:!0});var _=C(v);c=B(_,w),r=B(_," ("),u=B(_,b),A=B(_,")"),_.forEach(p),y=T(k),U=m(k,"P",{class:!0});var L=C(U);R=B(L,N),L.forEach(p),k.forEach(p),I=T(o),o.forEach(p),this.h()},h(){ue(l.src,s=t[17].tmdbPosterUrl)||i(l,"src",s),i(l,"alt",n=t[17].name),i(l,"class","w-full h-auto rounded-t-lg"),i(v,"class","text-base sm:text-lg font-semibold mb-2 group-hover:text-[var(--accent-color)] transition-colors"),i(U,"class","text-xs sm:text-sm text-gray-400"),i(g,"class","p-4 bg-[#1c2228] rounded-b-lg"),i(e,"class","movie-card group svelte-1tfgwzy"),x(e,"--accent-color",t[6])},m(h,o){G(h,e,o),a(e,l),a(e,f),a(e,g),a(g,v),a(v,c),a(v,r),a(v,u),a(v,A),a(g,y),a(g,U),a(U,R),a(e,I)},p(h,o){o&8&&!ue(l.src,s=h[17].tmdbPosterUrl)&&i(l,"src",s),o&8&&n!==(n=h[17].name)&&i(l,"alt",n),o&8&&w!==(w=h[17].name+"")&&le(c,w),o&8&&b!==(b=h[17].year+"")&&le(u,b),o&8&&N!==(N=h[17].reason+"")&&le(R,N),o&64&&x(e,"--accent-color",h[6])},d(h){h&&p(e)}}}function Re(t){let e,l,s,n,f,g,v,w,c,r,b,u,A="Recommender",y,U,N,R,I=!t[3].length&&!t[4]&&!t[5]&&ye(t),h=t[4]&&!t[5]&&Ee(t),o=t[5]&&Ce(t),k=t[3].length&&Ie(t);return{c(){e=d("link"),l=P(),s=d("main"),n=d("div"),f=d("div"),g=d("img"),w=P(),c=d("h1"),r=d("span"),b=M("Letterboxd"),u=d("span"),u.textContent=A,y=P(),I&&I.c(),U=P(),h&&h.c(),N=P(),o&&o.c(),R=P(),k&&k.c(),this.h()},l(_){const L=ze("svelte-pxunqc",ve.head);e=m(L,"LINK",{href:!0,rel:!0}),L.forEach(p),l=T(_),s=m(_,"MAIN",{class:!0});var Q=C(s);n=m(Q,"DIV",{class:!0});var z=C(n);f=m(z,"DIV",{class:!0});var H=C(f);g=m(H,"IMG",{src:!0,alt:!0,class:!0,style:!0}),w=T(H),c=m(H,"H1",{class:!0});var W=C(c);r=m(W,"SPAN",{style:!0,class:!0});var V=C(r);b=B(V,"Letterboxd"),V.forEach(p),u=m(W,"SPAN",{class:!0,"data-svelte-h":!0}),K(u)!=="svelte-1bl0mha"&&(u.textContent=A),W.forEach(p),H.forEach(p),y=T(z),I&&I.l(z),U=T(z),h&&h.l(z),N=T(z),o&&o.l(z),R=T(z),k&&k.l(z),z.forEach(p),Q.forEach(p),this.h()},h(){i(e,"href","https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"),i(e,"rel","stylesheet"),ue(g.src,v=Fe)||i(g,"src",v),i(g,"alt","Letterboxd Logo"),i(g,"class","w-12 h-12 mb-4"),x(g,"filter","drop-shadow(0 0 0.75rem "+t[6]+")"),x(r,"color",t[6]),i(r,"class","block xs:inline"),i(u,"class","block xs:inline"),i(c,"class","text-2xl sm:text-3xl md:text-4xl font-bold text-center"),i(f,"class","flex flex-col items-center mb-8"),i(n,"class","w-full max-w-4xl px-4 py-4 sm:py-12"),i(s,"class","min-h-screen bg-[#14181c] text-white font-inter flex justify-center items-start pt-0 sm:pt-0")},m(_,L){a(ve.head,e),G(_,l,L),G(_,s,L),a(s,n),a(n,f),a(f,g),a(f,w),a(f,c),a(c,r),a(r,b),a(c,u),a(n,y),I&&I.m(n,null),a(n,U),h&&h.m(n,null),a(n,N),o&&o.m(n,null),a(n,R),k&&k.m(n,null)},p(_,[L]){L&64&&x(g,"filter","drop-shadow(0 0 0.75rem "+_[6]+")"),L&64&&x(r,"color",_[6]),!_[3].length&&!_[4]&&!_[5]?I?I.p(_,L):(I=ye(_),I.c(),I.m(n,U)):I&&(I.d(1),I=null),_[4]&&!_[5]?h?h.p(_,L):(h=Ee(_),h.c(),h.m(n,N)):h&&(h.d(1),h=null),_[5]?o?o.p(_,L):(o=Ce(_),o.c(),o.m(n,R)):o&&(o.d(1),o=null),_[3].length?k?k.p(_,L):(k=Ie(_),k.c(),k.m(n,null)):k&&(k.d(1),k=null)},i:fe,o:fe,d(_){_&&(p(l),p(s)),p(e),I&&I.d(),h&&h.d(),o&&o.d(),k&&k.d()}}}function Me(t,e,l){let s="",n="",f="Diary",g=[],v=!1,w=null,c;const r=["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Mystery","Romance","Science Fiction","Thriller","War","Western"],b=["#00E054","#40BCF4","#FF8000"];let u;u="https://v2ibpvirn2.execute-api.us-west-2.amazonaws.com/Prod";async function A(){l(4,v=!0),l(5,w=null);try{const o=await fetch(`${u}/recommend?username=${encodeURIComponent(s)}&genre=${encodeURIComponent(n)}&source=${encodeURIComponent(f)}`);if(!o.ok)throw new Error("Failed to fetch recommendations.");l(3,g=await o.json())}catch(o){o instanceof Error?l(5,w=o.message):l(5,w="An unknown error occurred")}finally{l(4,v=!1)}}function y(){l(3,g=[]),l(5,w=null)}xe(()=>{document.body.classList.add("font-inter"),l(6,c=b[Math.floor(Math.random()*b.length)])});const U=[[]];function N(){s=this.value,l(0,s)}function R(){f=this.__value,l(2,f)}function I(){f=this.__value,l(2,f)}function h(){n=je(this),l(1,n),l(7,r)}return[s,n,f,g,v,w,c,r,A,y,N,R,U,I,h]}class Ge extends Ne{constructor(e){super(),Le(this,e,Me,Re,De,{})}}export{Ge as component};