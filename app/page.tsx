'use client';

import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import { useEffect, useRef, useState } from 'react';

type Book={no:string;year:string;title:string;kind:string;color:string;ink:string;rightColor:string;rightInk:string;image?:string;detailImage?:string;excerpt:string;description:string};
const books:Book[]=[
 {no:'01',year:'2024',title:'Sade',kind:'Roman',color:'#a9d8e8',ink:'#263b48',rightColor:'#657d3f',rightInk:'#f5f0df',image:'/sade-cover.png',excerpt:'Kalbimizi maskeleyip aklın soğuk sularına mı bıraktık?',description:'Sakin kırların, açık gökyüzünün ve insanın kendi iç sesine dönüşünün dünyası. Sade; insanın gürültüden uzaklaşıp kendine, doğaya ve hatırladıklarına yeniden bakışını anlatıyor.'},
 {no:'02',year:'2023',title:'İstanbul–Ankara Hattı',kind:'Roman',color:'#e7ded2',ink:'#262124',rightColor:'#981d2b',rightInk:'#f5e9dc',image:'/istanbulan-ara-hatti-cover.png',detailImage:'/istanbul-ankara-special-ops-silhouettes.png',excerpt:'İki şehir arasında bazen tek bir ses yeter.',description:'İstanbul ile Ankara arasındaki sert ritim, kırılgan ilişkiler ve beklenmedik karşılaşmalar üzerine karanlık, çarpıcı bir roman dünyası.'},
 {no:'03',year:'2022',title:'Yeni Kitap',kind:'Yakında',color:'#d8ff36',ink:'#18201c',rightColor:'#18201c',rightInk:'#d8ff36',excerpt:'Her yeni kitap, henüz açılmamış bir kapıdır.',description:'Yeni kitap duyurusu için ayrılmış örnek alan. Başlık, görsel ve açıklama daha sonra kolayca güncellenebilir.'},
];

export default function Home(){
 const [selected,setSelected]=useState<Book|null>(null);
 const [open,setOpen]=useState(false);
 const [incoming,setIncoming]=useState<Book|null>(null);
 const [incomingOpen,setIncomingOpen]=useState(false);
 const transitionRef=useRef(0);
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

 return <main className="home layered-home">
  <nav className="nav shell layered-nav" aria-label="Ana menü">
   <button className="brand brand-button" onClick={closeBook} aria-label="Ana sayfaya dön"><span className="brand-monogram">MK</span><span className="brand-lockup"><b>Melahat Kanoğlu</b><small>Yazar · İstanbul</small></span></button>
   <a href="mailto:merhaba@melahatkanoglu.com">İletişim</a>
  </nav>

  <section className="layered-intro shell">
   <p className="eyebrow">YAZAR · İSTANBUL</p>
   <h1><span>Melahat</span><i>Kanoğlu</i></h1>
   <p className="home-lead">İnsanların sustuklarıyla, şehirlerin unuttukları arasında dolaşan romanlar ve hikâyeler.</p>
   <p className="home-bio">Hafıza, ev, göç ve aidiyet duygusunu sade ama katmanlı bir dille anlatıyor.</p>
  </section>

  {[selected,incoming].map((book,index)=>book&&<section key={`${book.no}-${index}`} className={`book-overlay background-overlay ${index===0?(open?'is-open':''):(incomingOpen?'is-open incoming-overlay':'incoming-overlay')}`} aria-live="polite" style={{'--detail-left':book.color,'--detail-left-ink':book.ink,'--detail-right':book.rightColor,'--detail-right-ink':book.rightInk} as React.CSSProperties}>
   <div className="leaf leaf-left"><div className={`background-image ${book.detailImage?'silhouette-art':''}`}>{book.detailImage?<img src={book.detailImage} alt="Üç modern special-ops kadın silüeti"/>:book.image?<img src={book.image} alt={`${book.title} kitap kapağı`}/>:<div className="placeholder-cover"><span>{book.kind}</span><strong>{book.title}</strong><small>Melahat Kanoğlu</small></div>}</div></div>
   <div className="leaf leaf-right"><div className="background-copy"><p className="eyebrow">{book.no} / {book.year}</p><h2>{book.title}</h2><blockquote>“{book.excerpt}”</blockquote><p>{book.description}</p></div></div>
  </section>)}

  <section className="floating-books" aria-label="Kitaplar">
   <div className="floating-cards">
    {books.map(book=><button className={`floating-card ${selected?.no===book.no?'is-selected':''}`} style={{'--book':book.color,'--book-ink':book.ink} as React.CSSProperties} key={book.no} onClick={()=>showBook(book)}>
     {book.image&&<img src={book.image} alt="" aria-hidden="true"/>}
     <span className="book-meta">{book.kind} · {book.year}</span><span className="book-no">{book.no}</span>
     <strong>{book.title}</strong><span className="open-label">Aç <ArrowUpRight size={15}/></span>
    </button>)}
   </div>
  </section>

  <div className="home-foot shell"><span>© 2026</span><span>Kelimeler, hatırlamanın başka bir yolu.</span></div>
 </main>;
}
