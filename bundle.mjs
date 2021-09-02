function r(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"]
if(null!=e){var a,t,o=[],l=!0,f=!1
try{for(e=e.call(r);!(l=(a=e.next()).done)&&(o.push(a.value),!n||o.length!==n);l=!0);}catch(r){f=!0,t=r}finally{try{l||null==e.return||e.return()}finally{if(f)throw t}}return o}}(r,e)||n(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(r,n){if(r){if("string"==typeof r)return e(r,n)
var a=Object.prototype.toString.call(r).slice(8,-1)
return"Object"===a&&r.constructor&&(a=r.constructor.name),"Map"===a||"Set"===a?Array.from(r):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?e(r,n):void 0}}function e(r,n){(null==n||n>r.length)&&(n=r.length)
for(var e=0,a=new Array(n);e<n;e++)a[e]=r[e]
return a}function a(r,e){var a="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"]
if(!a){if(Array.isArray(r)||(a=n(r))||e&&r&&"number"==typeof r.length){a&&(r=a)
var t=0,o=function(){}
return{s:o,n:function(){return t>=r.length?{done:!0}:{done:!1,value:r[t++]}},e:function(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,f=!0,u=!1
return{s:function(){a=a.call(r)},n:function(){var r=a.next()
return f=r.done,r},e:function(r){u=!0,l=r},f:function(){try{f||null==a.return||a.return()}finally{if(u)throw l}}}}var t=function(r,n){if(r){var e,t=a(r)
try{for(t.s();!(e=t.n()).done;){var o=e.value
if(o[0]===n)return o[1]}}catch(r){t.e(r)}finally{t.f()}}},o=function(){return Object.create(null)},l=function(r,n){switch(r){default:var e,l=[],f=[],u=a(n)
try{for(u.s();!(e=u.n()).done;){var c=e.value
0===c[0]&&l.push(f=[]),f.push(c)}}catch(r){u.e(r)}finally{u.f()}return l
case"HEADER":var i,v=o(),s=[],y=a(n)
try{for(y.s();!(i=y.n()).done;){var d=i.value
9===d[0]?v[d[1]]=s=[]:s.push(d)}}catch(r){y.e(r)}finally{y.f()}return v
case"CLASSES":var h,p=o(),A=[],b=a(n)
try{for(b.s();!(h=b.n()).done;){var E=h.value
0===E[0]?A=[]:1===E[0]?p[E[1]]=A:A.push(E)}}catch(r){b.e(r)}finally{b.f()}return p
case"TABLES":var S,m=o(),C=[],g=[],D=a(n)
try{for(D.s();!(S=D.n()).done;){var T=S.value
0===T[0]?(g=[],"TABLE"===T[1]?C=[g]:"ENDTAB"!==T[1]&&C.push(g)):2===T[0]&&"TABLE"===t(g,0)&&(m[T[1]]=C),g.push(T)}}catch(r){D.e(r)}finally{D.f()}return m
case"BLOCKS":var w,I=o(),O=[],B=[],L=a(n)
try{for(L.s();!(w=L.n()).done;){var x=w.value
0===x[0]?(B=[],"BLOCK"===x[1]?O=[B]:O.push(B)):2===x[0]&&"BLOCK"===t(B,0)&&(I[x[1]]=O),B.push(x)}}catch(r){L.e(r)}finally{L.f()}return I
case"OBJECTS":var j,k=[],N=[],K=a(n)
try{for(K.s();!(j=K.n()).done;){var R=j.value
0===R[0]&&k.push(N=[]),N.push(R)}}catch(r){K.e(r)}finally{K.f()}return k
case"ACDSDATA":var H,$=[],G=[$],J=[G],M=a(n)
try{for(M.s();!(H=M.n()).done;){var _=H.value
0===_[0]?(J.push(G=[]),G.push($=[])):2===_[0]&&G.push($=[]),$.push(_)}}catch(r){M.e(r)}finally{M.f()}return J}}
function f(r){for(var n=r.split(/\r\n|\r|\n/),e=Math.floor(n.length/2),a=Array(e),t=0;t<e;t++)a[t]=[parseInt(n[t+t],10),n[t+t+1]]
return a}function u(r){for(var n=[],e=1;e<r.length;e++)if(0===r[e-1][0]&&"SECTION"===r[e-1][1]&&2===r[e][0]){for(var a=e;++e<r.length&&(0!==r[e][0]||"ENDSEC"!==r[e][1]););n.push({name:r[a][1],startIndex:a+1,endIndex:e})}return n}var c=function(r){var n,e=Object.create(null),t=f(r),o=a(u(t))
try{for(o.s();!(n=o.n()).done;){var c=n.value,i=c.name,v=c.startIndex,s=c.endIndex
e[i]=l(i,t.slice(v,s))}}catch(r){o.e(r)}finally{o.f()}return e},i={cp874:"dos-874",cp932:"ms932",cp936:"gbk",cp949:"windows-949",cp950:"csbig5",cp1361:"johab","mac-roman":"mac"},v={ja:"ms932"},s=function r(n,e){var o,s=null==e?void 0:e.encoding,y=new TextDecoder(s?(o=s.trim().toLowerCase().replace(/^dos|^ansi_/,"cp").replace(/^iso8859_/,"iso8859-"),i[o]||o):void 0).decode(n)
if(!s){var d,h,p=function(r,n){var e,t=f(r),o=a(u(t))
try{for(o.s();!(e=o.n()).done;){var c=e.value,i=c.name,v=c.startIndex,s=c.endIndex
if("HEADER"===i)return l(i,t.slice(v,s))}}catch(r){o.e(r)}finally{o.f()}}(y),A=t(null==p?void 0:p.$ACADVER,1)
if(!A||A<"AC1021")return r(n,{encoding:null!==(d=null!==(h=t(null==p?void 0:p.$DWGCODEPAGE,3))&&void 0!==h?h:v[navigator.language])&&void 0!==d?d:"cp1252"})}return c(y)},y=function(n,e){var t,o=a(e)
try{for(o.s();!(t=o.n()).done;){var l=r(t.value,2),f=l[0],u=l[1]
n+=f,n+="\n",n+=u,n+="\n"}}catch(r){o.e(r)}finally{o.f()}return n},d=function(n){var e=""
for(var t in n){e+="0\nSECTION\n2\n",e+=t,e+="\n"
var o=n[t]
switch(t){default:var l,f=a(o)
try{for(f.s();!(l=f.n()).done;){var u=l.value
e=y(e,u)}}catch(r){f.e(r)}finally{f.f()}break
case"HEADER":for(var c in o){e+="9\n",e+=c,e+="\n"
var i,v=a(o[c])
try{for(v.s();!(i=v.n()).done;){var s=r(i.value,2),d=s[0],h=s[1]
e+=d,e+="\n",e+=h,e+="\n"}}catch(r){v.e(r)}finally{v.f()}}break
case"CLASSES":for(var p in o){e+="0\nCLASS\n1\n",e+=p,e+="\n"
var A,b=a(o[p])
try{for(b.s();!(A=b.n()).done;){var E=r(A.value,2),S=E[0],m=E[1]
0!==S&&(e+=S,e+="\n",e+=m,e+="\n")}}catch(r){b.e(r)}finally{b.f()}}break
case"TABLES":for(var C in o){var g,D=a(o[C])
try{for(D.s();!(g=D.n()).done;){var T=g.value
e=y(e,T)}}catch(r){D.e(r)}finally{D.f()}e+="0\nENDTAB\n"}break
case"BLOCKS":for(var w in o){var I,O=a(o[w])
try{for(O.s();!(I=O.n()).done;){var B=I.value
e=y(e,B)}}catch(r){O.e(r)}finally{O.f()}}break
case"OBJECTS":var L,x=a(o)
try{for(x.s();!(L=x.n()).done;){var j,k=a(L.value)
try{for(k.s();!(j=k.n()).done;){var N=r(j.value,2),K=N[0],R=N[1]
e+=K,e+="\n",e+=R,e+="\n"}}catch(r){k.e(r)}finally{k.f()}}}catch(r){x.e(r)}finally{x.f()}break
case"ACDSDATA":var H,$=a(o)
try{for($.s();!(H=$.n()).done;){var G,J=a(H.value)
try{for(J.s();!(G=J.n()).done;){var M=G.value
e=y(e,M)}}catch(r){J.e(r)}finally{J.f()}}}catch(r){$.e(r)}finally{$.f()}}e+="0\nENDSEC\n"}return e+"0\nEOF\n"},h=function(r,n){var e=[]
if(r){var t,o=a(r)
try{for(o.s();!(t=o.n()).done;){var l=t.value
l[0]===n&&e.push(l[1])}}catch(r){o.e(r)}finally{o.f()}}return e}
export{d as createDxfFileString,t as getGroupCodeValue,h as getGroupCodeValues,s as parseDxfFileArrayBuffer,c as parseDxfFileString}
