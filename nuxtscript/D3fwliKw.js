import{_ as u}from"./DQR-C10r.js";import{o as a,c,a as p,d as x,x as t,y as m,h as f,n as o,g as n}from"./cyCOdGck.js";function s(r,e){return a(),c("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[p("path",{"fill-rule":"evenodd",d:"M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z","clip-rule":"evenodd"})])}const _=x({__name:"Refresh",props:{size:{default:"10"},isWide:{type:Boolean,default:!1},click:{type:Function,default:()=>{window.location.reload()}}},setup(r){const e=r;return(h,l)=>{const i=u;return a(),t(i,null,{default:m(()=>[e.isWide?(a(),c("div",{key:0,class:o(`
                min-[320px]:w-[300px] sm:w-[300px] md:w-[444px] lg:w-[588px] xl:w-[732px]
                h-${e.size} text-gray-500 cursor-pointer
                mx-auto
                border-2 border-gray-500 rounded-xl
                hover:bg-gray-500 hover:text-gray-300
            `),onClick:l[0]||(l[0]=(...d)=>e.click&&e.click(...d))},[f(n(s),{class:o(`p-1 mx-auto w-full h-${e.size}`)},null,8,["class"])],2)):(a(),t(n(s),{key:1,class:o(`
                h-${e.size} w-${e.size} p-1 text-gray-500 cursor-pointer
                mx-auto
                border-2 border-gray-500 rounded-full
                hover:bg-gray-500 hover:text-gray-300
            `),onClick:e.click},null,8,["class","onClick"]))]),_:1})}}});export{_};
