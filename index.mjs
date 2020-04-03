function r(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r)){var e=[],a=!0,t=!1,o=void 0
try{for(var l,f=r[Symbol.iterator]();!(a=(l=f.next()).done)&&(e.push(l.value),!n||e.length!==n);a=!0);}catch(r){t=!0,o=r}finally{try{a||null==f.return||f.return()}finally{if(t)throw o}}return e}}(r,e)||n(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(r,n){if(r){if("string"==typeof r)return e(r,n)
var a=Object.prototype.toString.call(r).slice(8,-1)
return"Object"===a&&r.constructor&&(a=r.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?e(r,n):void 0}}function e(r,n){(null==n||n>r.length)&&(n=r.length)
for(var e=0,a=new Array(n);e<n;e++)a[e]=r[e]
return a}function a(r){if("undefined"==typeof Symbol||null==r[Symbol.iterator]){if(Array.isArray(r)||(r=n(r))){var e=0,a=function(){}
return{s:a,n:function(){return e>=r.length?{done:!0}:{done:!1,value:r[e++]}},e:function(r){throw r},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var t,o,l=!0,f=!1
return{s:function(){t=r[Symbol.iterator]()},n:function(){var r=t.next()
return l=r.done,r},e:function(r){f=!0,o=r},f:function(){try{l||null==t.return||t.return()}finally{if(f)throw o}}}}var t=function(r,n){if(r){var e,t=a(r)
try{for(t.s();!(e=t.n()).done;){var o=e.value
if(o[0]===n)return o[1]}}catch(r){t.e(r)}finally{t.f()}}},o=function(){return Object.create(null)},l=function(r,n){switch(r){default:var e,l=[],f=[],i=a(n)
try{for(i.s();!(e=i.n()).done;){var u=e.value
0===u[0]&&l.push(f=[]),f.push(u)}}catch(r){i.e(r)}finally{i.f()}return l
case"HEADER":var c,v=o(),s=[],y=a(n)
try{for(y.s();!(c=y.n()).done;){var d=c.value
9===d[0]?v[d[1]]=s=[]:s.push(d)}}catch(r){y.e(r)}finally{y.f()}return v
case"CLASSES":var h,p=o(),A=[],b=a(n)
try{for(b.s();!(h=b.n()).done;){var S=h.value
0===S[0]?A=[]:1===S[0]?p[S[1]]=A:A.push(S)}}catch(r){b.e(r)}finally{b.f()}return p
case"TABLES":var E,m=o(),C=[],g=[],O=a(n)
try{for(O.s();!(E=O.n()).done;){var T=E.value
0===T[0]?(g=[],"TABLE"===T[1]?C=[g]:"ENDTAB"!==T[1]&&C.push(g)):2===T[0]&&"TABLE"===t(g,0)&&(m[T[1]]=C),g.push(T)}}catch(r){O.e(r)}finally{O.f()}return m
case"BLOCKS":var w,D=o(),I=[],B=[],L=a(n)
try{for(L.s();!(w=L.n()).done;){var x=w.value
0===x[0]?(B=[],"BLOCK"===x[1]?I=[B]:I.push(B)):2===x[0]&&"BLOCK"===t(B,0)&&(D[x[1]]=I),B.push(x)}}catch(r){L.e(r)}finally{L.f()}return D
case"OBJECTS":var j,k=[],N=[],R=a(n)
try{for(R.s();!(j=R.n()).done;){var K=j.value
0===K[0]&&k.push(N=[]),N.push(K)}}catch(r){R.e(r)}finally{R.f()}return k
case"ACDSDATA":var H,$=[],F=[$],G=[F],J=a(n)
try{for(J.s();!(H=J.n()).done;){var M=H.value
0===M[0]?(G.push(F=[]),F.push($=[])):2===M[0]&&F.push($=[]),$.push(M)}}catch(r){J.e(r)}finally{J.f()}return G}}
function f(r){for(var n=r.split(/\r\n|\r|\n/),e=Math.floor(n.length/2),a=Array(e),t=0;t<e;t++)a[t]=[parseInt(n[t+t],10),n[t+t+1]]
return a}function i(r){for(var n=[],e=1;e<r.length;e++)if(0===r[e-1][0]&&"SECTION"===r[e-1][1]&&2===r[e][0]){for(var a=e;++e<r.length&&(0!==r[e][0]||"ENDSEC"!==r[e][1]););n.push({name:r[a][1],startIndex:a+1,endIndex:e})}return n}var u=function(r){var n,e=Object.create(null),t=f(r),o=a(i(t))
try{for(o.s();!(n=o.n()).done;){var u=n.value,c=u.name,v=u.startIndex,s=u.endIndex
e[c]=l(c,t.slice(v,s))}}catch(r){o.e(r)}finally{o.f()}return e},c={cp874:"dos-874",cp932:"ms932",cp936:"gbk",cp949:"windows-949",cp950:"csbig5",cp1361:"johab","mac-roman":"mac"},v={ja:"ms932"},s=function r(n,e,o){var s,y=null==o?void 0:o.encoding,d=new FileReader
d.onload=function(){var c=this.result
if(!y){var s,d,h,p=function(r,n){var e,t=f(r),o=a(i(t))
try{for(o.s();!(e=o.n()).done;){var u=e.value,c=u.name,v=u.startIndex,s=u.endIndex
if("HEADER"===c)return l(c,t.slice(v,s))}}catch(r){o.e(r)}finally{o.f()}}(c),A=t(null==p?void 0:p.$ACADVER,1)
if(!A||A<"AC1021")return void r(n,e,{encoding:null!==(s=null!==(d=null!==(h=t(null==p?void 0:p.$DWGCODEPAGE,3))&&void 0!==h?h:null==o?void 0:o.defaultEncoding)&&void 0!==d?d:v[navigator.language])&&void 0!==s?s:"cp1252"})}e(void 0,u(c))},d.onerror=function(){e(this.error||void 0,void 0)},d.readAsText(n,y&&(s=y.trim().toLowerCase().replace(/^dos|^ansi_/,"cp").replace(/^iso8859_/,"iso8859-"),c[s]||s))},y=function(n,e){var t,o=a(e)
try{for(o.s();!(t=o.n()).done;){var l=r(t.value,2),f=l[0],i=l[1]
n+=f,n+="\n",n+=i,n+="\n"}}catch(r){o.e(r)}finally{o.f()}return n},d=function(n){var e=""
for(var t in n){e+="0\nSECTION\n2\n",e+=t,e+="\n"
var o=n[t]
switch(t){default:var l,f=a(o)
try{for(f.s();!(l=f.n()).done;){var i=l.value
e=y(e,i)}}catch(r){f.e(r)}finally{f.f()}break
case"HEADER":for(var u in o){e+="9\n",e+=u,e+="\n"
var c,v=a(o[u])
try{for(v.s();!(c=v.n()).done;){var s=r(c.value,2),d=s[0],h=s[1]
e+=d,e+="\n",e+=h,e+="\n"}}catch(r){v.e(r)}finally{v.f()}}break
case"CLASSES":for(var p in o){e+="0\nCLASS\n1\n",e+=p,e+="\n"
var A,b=a(o[p])
try{for(b.s();!(A=b.n()).done;){var S=r(A.value,2),E=S[0],m=S[1]
0!==E&&(e+=E,e+="\n",e+=m,e+="\n")}}catch(r){b.e(r)}finally{b.f()}}break
case"TABLES":for(var C in o){var g,O=a(o[C])
try{for(O.s();!(g=O.n()).done;){var T=g.value
e=y(e,T)}}catch(r){O.e(r)}finally{O.f()}e+="0\nENDTAB\n"}break
case"BLOCKS":for(var w in o){var D,I=a(o[w])
try{for(I.s();!(D=I.n()).done;){var B=D.value
e=y(e,B)}}catch(r){I.e(r)}finally{I.f()}}break
case"OBJECTS":var L,x=a(o)
try{for(x.s();!(L=x.n()).done;){var j,k=a(L.value)
try{for(k.s();!(j=k.n()).done;){var N=r(j.value,2),R=N[0],K=N[1]
e+=R,e+="\n",e+=K,e+="\n"}}catch(r){k.e(r)}finally{k.f()}}}catch(r){x.e(r)}finally{x.f()}break
case"ACDSDATA":var H,$=a(o)
try{for($.s();!(H=$.n()).done;){var F,G=a(H.value)
try{for(G.s();!(F=G.n()).done;){var J=F.value
e=y(e,J)}}catch(r){G.e(r)}finally{G.f()}}}catch(r){$.e(r)}finally{$.f()}}e+="0\nENDSEC\n"}return e+"0\nEOF\n"},h=function(r,n){var e=[]
if(r){var t,o=a(r)
try{for(o.s();!(t=o.n()).done;){var l=t.value
l[0]===n&&e.push(l[1])}}catch(r){o.e(r)}finally{o.f()}}return e}
export{d as createDxfFileString,t as getGroupCodeValue,h as getGroupCodeValues,s as parseDxfFileBlob,u as parseDxfFileString}
