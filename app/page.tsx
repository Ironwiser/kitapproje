'use client';

import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import X from 'lucide-react/dist/esm/icons/x.mjs';
import { useEffect, useState } from 'react';

type Book = { no:string; year:string; title:string; kind:string; color:string; ink:string; image?:string; excerpt:string; description:string };
const books: Book[] = [
  { no:'01', year:'2024', title:'Sade', kind:'Roman', color:'#a9d8e8', ink:'#263b48', image:'/sade-cover.png', excerpt:'Kalbimizi maskeleyip aklın soğuk sularına mı bıraktık?', description:'Sakin kırların, açık gökyüzünün ve insanın kendi iç sesine dönüşünün dünyası. Kitabın detay metni daha sonra gerçek arka kapak yazısıyla güncellenebilir.' },
  { no:'02', year:'2023', title:'İstanbul’an Ara Hattı', kind:'Roman', color:'#a71926', ink:'#f1e8dc', image:'/istanbulan-ara-hatti-cover.png', excerpt:'Şehrin iki yakası arasında bazen tek bir ses yeter.', description:'İstanbul’un sert ritmi, kırılgan ilişkiler ve beklenmedik karşılaşmalar üzerine karanlık, çarpıcı bir roman dünyası.' },
  { no:'03', year:'2022', title:'Yeni Kitap', kind:'Yakında', color:'#d8ff36', ink:'#18201c', excerpt:'Her yeni kitap, henüz açılmamış bir kapıdır.', description:'Yeni kitap duyurusu için ayrılmış örnek alan. Başlık, kapak ve açıklama daha sonra kolayca güncellenebilir.' },
];

export default function Home(){
  const [selected,setSelected]=useState<Book|null>(null);
  const [open,setOpen]=useState(false);
  const showBook=(book:Book)=>{setSelected(book);requestAnimationFrame(()=>setOpen(true))};
  const closeBook=()=>{setOpen(false);window.setTimeout(()=>setSelected(null),700)};
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>e.key==='Escape'&&selected&&closeBook();window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[selected]);

  return <main className="home">
    <nav className="nav shell" aria-label="Ana menü"><span className="brand">MELAHAT KANOĞLU</span><a href="mailto:merhaba@melahatkanoglu.com">İletişim</a></nav>
    <div className="home-grid shell">
      <section className="home-intro">
        <p className="eyebrow">YAZAR · İSTANBUL</p>
        <h1>Melahat<br/><i>Kanoğlu</i></h1>
        <p className="home-lead">İnsanların sustuklarıyla, şehirlerin unuttukları arasında dolaşan romanlar ve hikâyeler.</p>
        <p className="home-bio">Hafıza, ev, göç ve aidiyet duygusunu sade ama katmanlı bir dille anlatıyor.</p>
      </section>
      <section className="home-books" aria-labelledby="books-title">
        <div className="home-books-head"><p id="books-title" className="eyebrow">KİTAPLAR</p><span>Bir kitap seçin</span></div>
        <div className="home-cards">
          {books.map(book=><button className="home-book-card" style={{'--book':book.color,'--book-ink':book.ink} as React.CSSProperties} key={book.no} onClick={()=>showBook(book)}>
            {book.image&&<img src={book.image} alt="" aria-hidden="true"/>}
            <span className="book-meta">{book.kind} · {book.year}</span><span className="book-no">{book.no}</span>
            <strong>{book.title}</strong><span className="open-label">Aç <ArrowUpRight size={16}/></span>
          </button>)}
        </div>
      </section>
    </div>
    <div className="home-foot shell"><span>© 2026</span><span>Kelimeler, hatırlamanın başka bir yolu.</span></div>

    {selected&&<div className={`book-overlay ${open?'is-open':''}`} role="dialog" aria-modal="true" aria-label={selected.title} style={{'--detail':selected.color,'--detail-ink':selected.ink} as React.CSSProperties}>
      <button className="close-detail" onClick={closeBook} aria-label="Kitap detayını kapat"><X size={22}/><span>Kapat</span></button>
      <div className="leaf leaf-left"><div className="cover-art">{selected.image?<img src={selected.image} alt={`${selected.title} kitap kapağı`}/>:<><span>{selected.kind}</span><strong>{selected.title}</strong><small>Melahat Kanoğlu</small></>}</div></div>
      <div className="leaf leaf-right"><div className="detail-copy"><p className="eyebrow">{selected.no} / {selected.year}</p><h2>{selected.title}</h2><blockquote>“{selected.excerpt}”</blockquote><p>{selected.description}</p><button className="back-link" onClick={closeBook}>Ana sayfaya dön <ArrowUpRight size={17}/></button></div></div>
    </div>}
  </main>;
}

