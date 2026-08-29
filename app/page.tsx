'use client';

import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import { useEffect, useState } from 'react';

type Book={no:string;year:string;title:string;kind:string;color:string;ink:string;image?:string;excerpt:string;description:string};
const books:Book[]=[
 {no:'01',year:'2024',title:'Sade',kind:'Roman',color:'#a9d8e8',ink:'#263b48',image:'/sade-cover.png',excerpt:'Kalbimizi maskeleyip aklın soğuk sularına mı bıraktık?',description:'Sakin kırların, açık gökyüzünün ve insanın kendi iç sesine dönüşünün dünyası. Sade; insanın gürültüden uzaklaşıp kendine, doğaya ve hatırladıklarına yeniden bakışını anlatıyor.'},
 {no:'02',year:'2023',title:'İstanbul’an Ara Hattı',kind:'Roman',color:'#a71926',ink:'#f1e8dc',image:'/istanbulan-ara-hatti-cover.png',excerpt:'Şehrin iki yakası arasında bazen tek bir ses yeter.',description:'İstanbul’un sert ritmi, kırılgan ilişkiler ve beklenmedik karşılaşmalar üzerine karanlık, çarpıcı bir roman dünyası.'},
 {no:'03',year:'2022',title:'Yeni Kitap',kind:'Yakında',color:'#d8ff36',ink:'#18201c',excerpt:'Her yeni kitap, henüz açılmamış bir kapıdır.',description:'Yeni kitap duyurusu için ayrılmış örnek alan. Başlık, görsel ve açıklama daha sonra kolayca güncellenebilir.'},
];

export default function Home(){
 const [selected,setSelected]=useState<Book|null>(null);
 const [open,setOpen]=useState(false);
 const showBook=(book:Book)=>{setSelected(book);requestAnimationFrame(()=>setOpen(true))};
 const closeBook=()=>{setOpen(false);window.setTimeout(()=>setSelected(null),760)};
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>e.key==='Escape'&&selected&&closeBook();window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[selected]);

 return <main className="home layered-home">
  <nav className="nav shell layered-nav" aria-label="Ana menü">
   <button className="brand brand-button" onClick={closeBook} aria-label="Ana sayfaya dön">MELAHAT KANOĞLU</button>
   <a href="mailto:merhaba@melahatkanoglu.com">İletişim</a>
  </nav>

  <section className="layered-intro shell">
   <p className="eyebrow">YAZAR · İSTANBUL</p>
   <h1>Melahat<br/><i>Kanoğlu</i></h1>
   <p className="home-lead">İnsanların sustuklarıyla, şehirlerin unuttukları arasında dolaşan romanlar ve hikâyeler.</p>
   <p className="home-bio">Hafıza, ev, göç ve aidiyet duygusunu sade ama katmanlı bir dille anlatıyor.</p>
  </section>

  {selected&&<section className={`book-overlay background-overlay ${open?'is-open':''}`} aria-live="polite" style={{'--detail':selected.color,'--detail-ink':selected.ink} as React.CSSProperties}>
   <div className="leaf leaf-left"><div className="background-image">{selected.image?<img src={selected.image} alt={`${selected.title} kitap kapağı`}/>:<div className="placeholder-cover"><span>{selected.kind}</span><strong>{selected.title}</strong><small>Melahat Kanoğlu</small></div>}</div></div>
   <div className="leaf leaf-right"><div className="background-copy"><p className="eyebrow">{selected.no} / {selected.year}</p><h2>{selected.title}</h2><blockquote>“{selected.excerpt}”</blockquote><p>{selected.description}</p></div></div>
  </section>}

  <section className="floating-books" aria-labelledby="books-title">
   <div className="floating-books-head"><p id="books-title" className="eyebrow">KİTAPLAR</p><span>Bir kitap seçin</span></div>
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

