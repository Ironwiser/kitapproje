'use client';

import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import { useEffect, useRef, useState } from 'react';

type Book={no:string;year:string;title:string;kind:string;color:string;ink:string;rightColor:string;rightInk:string;image?:string;detailImage?:string;frontImage?:string;giftImage?:string;giftLabel?:string;excerpt:string;description:string};
const books:Book[]=[
 {no:'01',year:'2024',title:'Sade',kind:'Roman',color:'#a9d8e8',ink:'#263b48',rightColor:'#a9d8e8',rightInk:'#263b48',image:'/sade-front-cut.png',detailImage:'/sade-flower-field.png',frontImage:'/sade-front-cut.png',excerpt:'Sade, yağmurun sesiyle uyanmıştı.',description:'Gece başlayan yağmurun altında Sade, yalnızlıkla ve yıllardır başkaları tarafından yaşanmış hayalleriyle yüzleşir. Yağmuru ve rüzgârla uçuşan yaprakları izlerken kendi hayallerini yeniden hatırlar.'},
 {no:'02',year:'2023',title:'İstanbul–Ankara Hattı',kind:'Roman',color:'#ddc7aa',ink:'#262124',rightColor:'#981d2b',rightInk:'#f5e9dc',image:'/istanbul-ankara-front-cut.png',detailImage:'/istanbul-ankara-shadow-scene.png',frontImage:'/istanbul-ankara-front-cut.png',excerpt:'Bir gün bunların hesabı sorulacaktı.',description:'Yüzyıllar boyunca kadınlar üzerinde kurulan egemenlik ve şiddet karşısında, eline geçirdiği gücü acımasız bir intikama dönüştüren bir kadının hikâyesi.'},
 {no:'03',year:'2022',title:'Mekanik Dünya',kind:'Roman',color:'#030b10',ink:'#d8edf2',rightColor:'#071923',rightInk:'#d8edf2',image:'/mekanik-dunya-front-cut.png',detailImage:'/mekanik-dunya-space.png',frontImage:'/mekanik-dunya-front-cut.png',excerpt:'Dünyayı sıfırla ve yeniden inşa et.',description:'Natez, sevginin ve duyguların hiçbir bilgi ya da zenginlikle yer değiştiremeyeceğini düşünür. Güneşin doğduğu, çiçeklerin yetiştiği, tat ve kokuların; aşk ve sevginin yaşandığı yeni bir yaşam formu kurmak ister.'},
 {no:'04',year:'Yeni',title:'Mira Minella',kind:'Çocuk Romanı',color:'#28255c',ink:'#f7d478',rightColor:'#302762',rightInk:'#fff0be',image:'/mira-minella-front-cut.png',detailImage:'/mira-minella-theme-screen.png',frontImage:'/mira-minella-front-cut.png',giftImage:'/mira-keychain-front.jpeg',giftLabel:'Hediye anahtarlık ile birlikte',excerpt:'Mira, kaderinin çağrısına cevap verebilecek mi?',description:'Mira, ninesinin köyünde konuşan bir papağan, canlanan biblolar ve cadılarla karşılaşır. Mert’i eski hâline döndürmeye çalışırken kendi gerçek kimliğini keşfeder; cesaret, iyilik ve dostlukla örülü fantastik bir maceraya atılır.'},
 {no:'05',year:'Yeni',title:'Klonlar Berlin’de',kind:'Roman',color:'#23436f',ink:'#eef6ff',rightColor:'#182b4d',rightInk:'#e9f2ff',image:'/klonlar-berlinde-front-cut.png',detailImage:'/klonlar-berlinde-theme-screen.png',frontImage:'/klonlar-berlinde-front-cut.png',excerpt:'Almanya’nın havadan görüntüsü muhteşemdi.',description:'Soğuk, karlı bir ocak gününde Almanya bembeyaz karlarla kaplıdır. Berlin hattında başlayan hikâye; buz, sınırlar ve karanlık bir kış atmosferi içinde ilerler.'},
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
   <p className="eyebrow intro-eyebrow"><span>YAZAR</span><span>ROMAN · HİKÂYE · ÇOCUK EDEBİYATI</span></p>
   <h1><span>Melahat</span><i>Kanoğlu</i></h1>
   <p className="home-lead">Kadınların, çocukların ve hayal kurmaktan vazgeçmeyenlerin hikâyelerini yazıyor.</p>
   <p className="home-bio"><span>YAZARLIK EVRENİ</span>Her kitabında cesarete, aidiyete ve yeniden başlama ihtimaline yer açıyor.</p>
  </section>
  <aside className="author-portrait-stage" aria-label="Melahat Kanoğlu portresi">
   <div className="author-portrait-stage__field" aria-hidden="true"/>
   <p className="author-portrait-stage__index">05 KİTAP · ROMAN · HİKÂYE</p>
   <p className="author-portrait-stage__note">Kelimelerin<br/>izinde.</p>
   <img className="home-author-portrait" src="/melahat-kanoglu-portrait.png" alt="Yazar Melahat Kanoğlu"/>
  </aside>

  {[selected,incoming].map((book,index)=>book&&<section key={`${book.no}-${index}`} className={`book-overlay background-overlay ${index===0?(open?'is-open':''):(incomingOpen?'is-open incoming-overlay':'incoming-overlay')}`} aria-live="polite" style={{'--detail-left':book.color,'--detail-left-ink':book.ink,'--detail-right':book.rightColor,'--detail-right-ink':book.rightInk} as React.CSSProperties}>
   <div className="leaf leaf-left"><div className={`background-image ${book.detailImage?'silhouette-art':''} ${book.no==='04'||book.no==='05'?'original-theme-art':''}`}>{book.detailImage?<><img className="panel-art" src={book.detailImage} alt={`${book.title} tema arka planı`}/>{book.frontImage&&<img className="detail-book-cover" src={book.frontImage} alt={`${book.title} ön kapağı`}/>}</>:book.image?<img src={book.image} alt={`${book.title} kitap kapağı`}/>:<div className="placeholder-cover"><span>{book.kind}</span><strong>{book.title}</strong><small>Melahat Kanoğlu</small></div>}</div></div>
   <div className="leaf leaf-right"><div className="background-copy"><p className="eyebrow">{book.no} / {book.year}</p><h2>{book.title}</h2><blockquote>“{book.excerpt}”</blockquote><p>{book.description}</p>{book.giftImage&&<aside className="book-gift"><img src={book.giftImage} alt="Mira Minella hediye anahtarlığı"/><span>{book.giftLabel}</span></aside>}</div></div>
  </section>)}

  <section className="floating-books" aria-label="Kitaplar">
   <div className="floating-cards">
    {books.map(book=><button className={`floating-card ${selected?.no===book.no?'is-selected':''}`} style={{'--book':book.color,'--book-ink':book.ink} as React.CSSProperties} key={book.no} onClick={()=>showBook(book)}>
     {(book.no==='03'?'/mekanik-card-nebula.png':book.detailImage??book.frontImage??book.image)&&<img src={book.no==='03'?'/mekanik-card-nebula.png':book.detailImage??book.frontImage??book.image} alt="" aria-hidden="true"/>}
     <span className="book-meta">{book.kind} · {book.year}</span>
     <strong>{book.title}</strong><span className="open-label">Aç <ArrowUpRight size={15}/></span>
    </button>)}
   </div>
  </section>

  <div className="home-foot shell"><span>© 2026</span><span>Kelimeler, hatırlamanın başka bir yolu.</span></div>
 </main>;
}
