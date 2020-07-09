function r(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r)){var e=[],a=!0,t=!1,o=void 0
try{for(var f,l=r[Symbol.iterator]();!(a=(f=l.next()).done)&&(e.push(f.value),!n||e.length!==n);a=!0);}catch(r){t=!0,o=r}finally{try{a||null==l.return||l.return()}finally{if(t)throw o}}return e}}(r,e)||n(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(r,n){if(r){if("string"==typeof r)return e(r,n)
var a=Object.prototype.toString.call(r).slice(8,-1)
return"Object"===a&&r.constructor&&(a=r.constructor.name),"Map"===a||"Set"===a?Array.from(r):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?e(r,n):void 0}}function e(r,n){(null==n||n>r.length)&&(n=r.length)
for(var e=0,a=new Array(n);e<n;e++)a[e]=r[e]
return a}function a(r,e){var a
if("undefined"==typeof Symbol||null==r[Symbol.iterator]){if(Array.isArray(r)||(a=n(r))||e&&r&&"number"==typeof r.length){a&&(r=a)
var t=0,o=function(){}
return{s:o,n:function(){return t>=r.length?{done:!0}:{done:!1,value:r[t++]}},e:function(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var f,l=!0,u=!1
return{s:function(){a=r[Symbol.iterator]()},n:function(){var r=a.next()
return l=r.done,r},e:function(r){u=!0,f=r},f:function(){try{l||null==a.return||a.return()}finally{if(u)throw f}}}}var t=function(r,n){if(r){var e,t=a(r)
try{for(t.s();!(e=t.n()).done;){var o=e.value
if(o[0]===n)return o[1]}}catch(r){t.e(r)}finally{t.f()}}},o=function(){return Object.create(null)},f=function(r,n){switch(r){default:var e,f=[],l=[],u=a(n)
try{for(u.s();!(e=u.n()).done;){var c=e.value
0===c[0]&&f.push(l=[]),l.push(c)}}catch(r){u.e(r)}finally{u.f()}return f
case"HEADER":var i,v=o(),s=[],y=a(n)
try{for(y.s();!(i=y.n()).done;){var d=i.value
9===d[0]?v[d[1]]=s=[]:s.push(d)}}catch(r){y.e(r)}finally{y.f()}return v
case"CLASSES":var h,p=o(),b=[],A=a(n)
try{for(A.s();!(h=A.n()).done;){var S=h.value
0===S[0]?b=[]:1===S[0]?p[S[1]]=b:b.push(S)}}catch(r){A.e(r)}finally{A.f()}return p
case"TABLES":var m,E=o(),C=[],g=[],D=a(n)
try{for(D.s();!(m=D.n()).done;){var O=m.value
0===O[0]?(g=[],"TABLE"===O[1]?C=[g]:"ENDTAB"!==O[1]&&C.push(g)):2===O[0]&&"TABLE"===t(g,0)&&(E[O[1]]=C),g.push(O)}}catch(r){D.e(r)}finally{D.f()}return E
case"BLOCKS":var T,w=o(),I=[],B=[],L=a(n)
try{for(L.s();!(T=L.n()).done;){var x=T.value
0===x[0]?(B=[],"BLOCK"===x[1]?I=[B]:I.push(B)):2===x[0]&&"BLOCK"===t(B,0)&&(w[x[1]]=I),B.push(x)}}catch(r){L.e(r)}finally{L.f()}return w
case"OBJECTS":var j,k=[],N=[],K=a(n)
try{for(K.s();!(j=K.n()).done;){var R=j.value
0===R[0]&&k.push(N=[]),N.push(R)}}catch(r){K.e(r)}finally{K.f()}return k
case"ACDSDATA":var H,$=[],G=[$],J=[G],M=a(n)
try{for(M.s();!(H=M.n()).done;){var _=H.value
0===_[0]?(J.push(G=[]),G.push($=[])):2===_[0]&&G.push($=[]),$.push(_)}}catch(r){M.e(r)}finally{M.f()}return J}}
function l(r){for(var n=r.split(/\r\n|\r|\n/),e=Math.floor(n.length/2),a=Array(e),t=0;t<e;t++)a[t]=[parseInt(n[t+t],10),n[t+t+1]]
return a}function u(r){for(var n=[],e=1;e<r.length;e++)if(0===r[e-1][0]&&"SECTION"===r[e-1][1]&&2===r[e][0]){for(var a=e;++e<r.length&&(0!==r[e][0]||"ENDSEC"!==r[e][1]););n.push({name:r[a][1],startIndex:a+1,endIndex:e})}return n}var c=function(r){var n,e=Object.create(null),t=l(r),o=a(u(t))
try{for(o.s();!(n=o.n()).done;){var c=n.value,i=c.name,v=c.startIndex,s=c.endIndex
e[i]=f(i,t.slice(v,s))}}catch(r){o.e(r)}finally{o.f()}return e},i={cp874:"dos-874",cp932:"ms932",cp936:"gbk",cp949:"windows-949",cp950:"csbig5",cp1361:"johab","mac-roman":"mac"},v={ja:"ms932"},s=function r(n,e){var o,s=null==e?void 0:e.encoding,y=new TextDecoder(s?(o=s.trim().toLowerCase().replace(/^dos|^ansi_/,"cp").replace(/^iso8859_/,"iso8859-"),i[o]||o):void 0).decode(n)
if(!s){var d,h,p=function(r,n){var e,t=l(r),o=a(u(t))
try{for(o.s();!(e=o.n()).done;){var c=e.value,i=c.name,v=c.startIndex,s=c.endIndex
if("HEADER"===i)return f(i,t.slice(v,s))}}catch(r){o.e(r)}finally{o.f()}}(y),b=t(null==p?void 0:p.$ACADVER,1)
if(!b||b<"AC1021")return r(n,{encoding:null!==(d=null!==(h=t(null==p?void 0:p.$DWGCODEPAGE,3))&&void 0!==h?h:v[navigator.language])&&void 0!==d?d:"cp1252"})}return c(y)},y=function(n,e){var t,o=a(e)
try{for(o.s();!(t=o.n()).done;){var f=r(t.value,2),l=f[0],u=f[1]
n+=l,n+="\n",n+=u,n+="\n"}}catch(r){o.e(r)}finally{o.f()}return n},d=function(n){var e=""
for(var t in n){e+="0\nSECTION\n2\n",e+=t,e+="\n"
var o=n[t]
switch(t){default:var f,l=a(o)
try{for(l.s();!(f=l.n()).done;){var u=f.value
e=y(e,u)}}catch(r){l.e(r)}finally{l.f()}break
case"HEADER":for(var c in o){e+="9\n",e+=c,e+="\n"
var i,v=a(o[c])
try{for(v.s();!(i=v.n()).done;){var s=r(i.value,2),d=s[0],h=s[1]
e+=d,e+="\n",e+=h,e+="\n"}}catch(r){v.e(r)}finally{v.f()}}break
case"CLASSES":for(var p in o){e+="0\nCLASS\n1\n",e+=p,e+="\n"
var b,A=a(o[p])
try{for(A.s();!(b=A.n()).done;){var S=r(b.value,2),m=S[0],E=S[1]
0!==m&&(e+=m,e+="\n",e+=E,e+="\n")}}catch(r){A.e(r)}finally{A.f()}}break
case"TABLES":for(var C in o){var g,D=a(o[C])
try{for(D.s();!(g=D.n()).done;){var O=g.value
e=y(e,O)}}catch(r){D.e(r)}finally{D.f()}e+="0\nENDTAB\n"}break
case"BLOCKS":for(var T in o){var w,I=a(o[T])
try{for(I.s();!(w=I.n()).done;){var B=w.value
e=y(e,B)}}catch(r){I.e(r)}finally{I.f()}}break
case"OBJECTS":var L,x=a(o)
try{for(x.s();!(L=x.n()).done;){var j,k=a(L.value)
try{for(k.s();!(j=k.n()).done;){var N=r(j.value,2),K=N[0],R=N[1]
e+=K,e+="\n",e+=R,e+="\n"}}catch(r){k.e(r)}finally{k.f()}}}catch(r){x.e(r)}finally{x.f()}break
case"ACDSDATA":var H,$=a(o)
try{for($.s();!(H=$.n()).done;){var G,J=a(H.value)
try{for(J.s();!(G=J.n()).done;){var M=G.value
e=y(e,M)}}catch(r){J.e(r)}finally{J.f()}}}catch(r){$.e(r)}finally{$.f()}}e+="0\nENDSEC\n"}return e+"0\nEOF\n"},h=function(r,n){var e=[]
if(r){var t,o=a(r)
try{for(o.s();!(t=o.n()).done;){var f=t.value
f[0]===n&&e.push(f[1])}}catch(r){o.e(r)}finally{o.f()}}return e}
export{d as createDxfFileString,t as getGroupCodeValue,h as getGroupCodeValues,s as parseDxfFileArrayBuffer,c as parseDxfFileString}
