'use client';

import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import { useEffect, useRef, useState } from 'react';

type Book={no:string;year:string;title:string;kind:string;color:string;ink:string;rightColor:string;rightInk:string;image?:string;detailImage?:string;frontImage?:string;excerpt:string;description:string};
const books:Book[]=[
 {no:'01',year:'2024',title:'Sade',kind:'Roman',color:'#a9d8e8',ink:'#263b48',rightColor:'#a9d8e8',rightInk:'#263b48',image:'/sade-cover.png',detailImage:'/sade-flower-field.png',frontImage:'/sadefront.jpg',excerpt:'Kalbimizi maskeleyip aklın soğuk sularına mı bıraktık?',description:'Sakin kırların, açık gökyüzünün ve insanın kendi iç sesine dönüşünün dünyası. Sade; insanın gürültüden uzaklaşıp kendine, doğaya ve hatırladıklarına yeniden bakışını anlatıyor.'},
 {no:'02',year:'2023',title:'İstanbul–Ankara Hattı',kind:'Roman',color:'#ddc7aa',ink:'#262124',rightColor:'#981d2b',rightInk:'#f5e9dc',image:'/istanbulan-ara-hatti-cover.png',detailImage:'/istanbul-ankara-shadow-scene.png',frontImage:'/istankarakitapfront.jpg',excerpt:'İki şehir arasında bazen tek bir ses yeter.',description:'İstanbul ile Ankara arasındaki sert ritim, kırılgan ilişkiler ve beklenmedik karşılaşmalar üzerine karanlık, çarpıcı bir roman dünyası.'},
 {no:'03',year:'2022',title:'Mekanik Dünya',kind:'Roman',color:'#030b10',ink:'#d8edf2',rightColor:'#071923',rightInk:'#d8edf2',image:'/mekanikdunyafront.jpg',detailImage:'/mekanik-dunya-space.png',frontImage:'/mekanikdunyafront.jpg',excerpt:'Dünyayı sıfırla ve yeniden inşa et.',description:'Karanlığın, teknolojinin ve yeniden kurulan bir dünyanın sınırlarında ilerleyen; insan ile mekanik düzen arasındaki gerilimi sorgulayan bir roman.'},
];

export default function Home(){
 const [selected,setSelected]=useState<Book|null>(null);
 const [open,setOpen]=useState(false);
 const [incoming,setIncoming]=useState<Book|null>(null);
 const [incomingOpen,setIncomingOpen]=useState(false);
 const [contactOpen,setContactOpen]=useState(false);
 const transitionRef=useRef(0);
 const contactRef=useRef<HTMLButtonElement|null>(null);
 const showBook=(book:Book)=>{
  if(selected?.no===book.no||incoming)return;
  const token=++transitionRef.current;
  if(!selected){setSelected(book);requestAnimationFrame(()=>setOpen(true));return}
  setIncoming(book);
  setIncomingOpen(false);
  requestAnimationFrame(()=>requestAnimationFrame(()=>setIncomingOpen(true)));
  window.setTimeout(()=>{if(transitionRef.current!==token)return;setSelected(book);setOpen(true);setIncoming(null);setIncomingOpen(false)},850);
 };
 const closeBook=()=>{
  ++transitionRef.current;
  setIncomingOpen(false);
  setIncoming(null);
  setOpen(false);
  window.setTimeout(()=>setSelected(null),760);
 };
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>e.key==='Escape'&&selected&&closeBook();window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[selected]);
 useEffect(()=>{const onPointer=(e:PointerEvent)=>{if(contactOpen&&!contactRef.current?.contains(e.target as Node))setContactOpen(false)};const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setContactOpen(false);contactRef.current?.blur()}};window.addEventListener('pointerdown',onPointer);window.addEventListener('keydown',onKey);return()=>{window.removeEventListener('pointerdown',onPointer);window.removeEventListener('keydown',onKey)}},[contactOpen]);

 const lightNav=selected?.no==='01'||selected?.no==='03';
 const navHover=selected?.no==='01'?'#a9d8e8':selected?.no==='03'?'#56d9ef':selected?.no==='02'?'#981d2b':'#59645e';
 return <main className="home layered-home" data-theme={selected?.no??'home'} style={{'--nav-left':lightNav?'#f7f3e8':selected?.ink??'#18201c','--nav-right':lightNav?'#f7f3e8':selected?.rightInk??'#18201c','--nav-hover':navHover} as React.CSSProperties}>
  <nav className="nav shell layered-nav" aria-label="Ana menü">
   <button className="brand brand-button" onClick={closeBook} aria-label="Ana sayfaya dön"><span className="brand-monogram">MK</span><span className="brand-lockup"><b>Melahat Kanoğlu</b><small>Yazar</small></span></button>
   <button ref={contactRef} type="button" className={`contact-link ${contactOpen?'is-open':''}`} data-email="ornek@ornek.com" aria-label="E-posta adresini göster" aria-expanded={contactOpen} onClick={()=>setContactOpen(value=>!value)}>İletişim</button>
  </nav>

  <section className="layered-intro shell">
   <p className="eyebrow">YAZAR</p>
   <h1><span>Melahat</span><i>Kanoğlu</i></h1>
   <p className="home-lead">İnsanların sustuklarıyla, şehirlerin unuttukları arasında dolaşan romanlar ve hikâyeler.</p>
   <p className="home-bio">Hafıza, ev, göç ve aidiyet duygusunu sade ama katmanlı bir dille anlatıyor.</p>
  </section>

  {[selected,incoming].map((book,index)=>book&&<section key={`${book.no}-${index}`} className={`book-overlay background-overlay ${index===0?(open?'is-open':''):(incomingOpen?'is-open incoming-overlay':'incoming-overlay')}`} aria-live="polite" style={{'--detail-left':book.color,'--detail-left-ink':book.ink,'--detail-right':book.rightColor,'--detail-right-ink':book.rightInk} as React.CSSProperties}>
   <div className="leaf leaf-left"><div className={`background-image ${book.detailImage?'silhouette-art':''}`}>{book.detailImage?<><img className="panel-art" src={book.detailImage} alt={`${book.title} tema arka planı`}/>{book.frontImage&&<img className="detail-book-cover" src={book.frontImage} alt={`${book.title} ön kapağı`}/>}</>:book.image?<img src={book.image} alt={`${book.title} kitap kapağı`}/>:<div className="placeholder-cover"><span>{book.kind}</span><strong>{book.title}</strong><small>Melahat Kanoğlu</small></div>}</div></div>
   <div className="leaf leaf-right"><div className="background-copy"><p className="eyebrow">{book.no} / {book.year}</p><h2>{book.title}</h2><blockquote>“{book.excerpt}”</blockquote><p>{book.description}</p></div></div>
  </section>)}

  <section className="floating-books" aria-label="Kitaplar">
   <div className="floating-cards">
    {books.map(book=><button className={`floating-card ${selected?.no===book.no?'is-selected':''}`} style={{'--book':book.color,'--book-ink':book.ink} as React.CSSProperties} key={book.no} onClick={()=>showBook(book)}>
     {(book.no==='03'?'/mekanik-card-nebula.png':book.detailImage)&&<img src={book.no==='03'?'/mekanik-card-nebula.png':book.detailImage} alt="" aria-hidden="true"/>}
     <span className="book-meta">{book.kind} · {book.year}</span>
     <strong>{book.title}</strong><span className="open-label">Aç <ArrowUpRight size={15}/></span>
    </button>)}
   </div>
  </section>

  <div className="home-foot shell"><span>© 2026</span><span>Kelimeler, hatırlamanın başka bir yolu.</span></div>
 </main>;
}
