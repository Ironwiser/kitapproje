'use client';
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down.mjs';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import Camera from 'lucide-react/dist/esm/icons/camera.mjs';
import Mail from 'lucide-react/dist/esm/icons/mail.mjs';
import { useEffect } from 'react';
const books = [{year:'2024',title:'Kıyıda Kalanlar',kind:'Roman',no:'01'},{year:'2021',title:'Sessiz Evlerin Atlası',kind:'Öykü',no:'02'},{year:'2018',title:'Bir Yazın Hafızası',kind:'Deneme',no:'03'}];
export default function Home(){
  useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('is-visible')),{threshold:.28});document.querySelectorAll('.split-card').forEach(item=>observer.observe(item));return()=>observer.disconnect()},[]);
  return <main>
    <nav className="nav shell" aria-label="Ana menü"><a className="brand" href="#top">AYŞE KARA</a><div className="nav-links"><a href="#hakkinda">Hakkında</a><a href="#kitaplar">Kitaplar</a><a href="#iletisim">İletişim</a></div></nav>
    <header id="top" className="hero shell"><p className="eyebrow">YAZAR · İSTANBUL</p><h1>Kelimeler,<br/><em>hatırlamanın</em><br/>başka bir yolu.</h1><div className="hero-bottom"><p>İnsanların sustuklarıyla, şehirlerin unuttukları arasında dolaşan romanlar ve öyküler.</p><a className="scroll-cue" href="#hakkinda" aria-label="Aşağı kaydır"><ArrowDown size={18}/></a></div><span className="index">01</span></header>
    <section id="hakkinda" className="split-card shell" aria-labelledby="about-title"><div className="split-panel panel-left about-left"><p className="eyebrow">PORTRE / 01</p><h2 id="about-title">Hikâyenin<br/>peşinde.</h2></div><div className="split-panel panel-right about-right"><p className="lead">“Yazmak, bildiğim dünyaya başka bir yerden bakma cesareti.”</p><div className="rule"/><p>Ayşe Kara, gündelik hayatın görünmez çatlaklarına bakan roman ve öyküler yazıyor. Metinlerinde hafıza, ev, göç ve aidiyet duygusu sade ama katmanlı bir dille buluşuyor.</p><p>İlk kitabından bu yana okuru, cevaptan çok iyi bir sorunun dönüştürücü gücüne davet ediyor.</p><a className="text-link" href="#kitaplar">Kitaplara göz at <ArrowUpRight size={16}/></a></div></section>
    <section id="kitaplar" className="books-section shell"><div className="section-heading"><p className="eyebrow">SEÇİLMİŞ ESERLER</p><h2>Kitaplar</h2></div><div className="book-list">{books.map(book=><article className="split-card book" key={book.title}><div className="split-panel panel-left book-left"><span>{book.no}</span><p>{book.kind}</p></div><div className="split-panel panel-right book-right"><p>{book.year}</p><h3>{book.title}</h3><ArrowUpRight size={24}/></div></article>)}</div></section>
    <section className="quote shell split-card"><div className="split-panel panel-left quote-left"><span>“</span></div><div className="split-panel panel-right quote-right"><blockquote>Bazen insanın evi, dönmek istediği yer değil; içinde kalmayı başardığı cümledir.</blockquote><p>— Kıyıda Kalanlar</p></div></section>
    <footer id="iletisim" className="footer shell"><p className="eyebrow">BİRLİKTE ÇALIŞMAK İÇİN</p><a className="contact" href="mailto:merhaba@aysekara.com">merhaba@aysekara.com <ArrowUpRight/></a><div className="footer-bottom"><p>© 2026 Ayşe Kara</p><div><a href="#top">Yukarı</a><a href="#"><Camera size={18} aria-label="Instagram"/></a><a href="mailto:merhaba@aysekara.com"><Mail size={18} aria-label="E-posta"/></a></div></div></footer>
  </main>;
}
