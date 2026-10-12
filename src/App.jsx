import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, X, MessageCircle, MapPin, Truck, Sparkles } from 'lucide-react';
import { CATEGORIES, formatPrice, PRODUCTS, STORE } from './data/store.js';
import ChatWidget from './components/ChatWidget.jsx';

const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };

function ProductCard({ product, onAdd, onOpen }) {
  return <motion.article variants={fadeUp} className="product-card" layout>
    <button className="product-image" onClick={() => onOpen(product)} aria-label={`Voir ${product.name}`}>
      <img src={product.image} alt={product.name} loading="lazy" />
      {product.label && <span className="product-label">{product.label}</span>}
      <span className="quick-add" aria-hidden="true"><Plus size={18} /></span>
    </button>
    <div className="product-meta"><span>{product.category}</span><span>{product.id}</span></div>
    <button className="product-title" onClick={() => onOpen(product)}>{product.name}</button>
    <div className="product-bottom"><strong>{formatPrice(product.price)}</strong><button className="add-link" onClick={() => onAdd(product)}>Ajouter <ArrowUpRight size={15}/></button></div>
  </motion.article>;
}

function App() {
  const [category, setCategory] = useState('Tout voir');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState('');

  const filteredProducts = useMemo(() => PRODUCTS.filter(p =>
    (category === 'Tout voir' || p.category === category) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);
  const cartCount = cart.reduce((n, item) => n + item.quantity, 0);
  const cartTotal = cart.reduce((n, item) => n + item.product.price * item.quantity, 0);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2400); };
  const addToCart = (product) => {
    setCart(current => {
      const existing = current.find(item => item.product.id === product.id);
      return existing ? current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }];
    });
    notify(`${product.name} ajouté au panier`);
  };
  const changeQuantity = (id, delta) => setCart(current => current.map(item => item.product.id === id ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));
  const startOrder = () => {
    const lines = cart.map(item => `- ${item.product.name} (${item.product.id}) x ${item.quantity} : ${formatPrice(item.product.price * item.quantity)}`).join('\n');
    const message = [
      `Bonjour ${STORE.name},`,
      '',
      'Je souhaite confirmer la commande suivante :',
      '',
      'MA SELECTION',
      lines,
      '',
      `Total des articles : ${formatPrice(cartTotal)}`,
      '',
      'Mode de reception : livraison ou retrait en boutique',
      `Localite : ${STORE.city}`,
      '',
      'Merci de confirmer la disponibilite, les frais de livraison et le montant final.'
    ].join('\n');
    if (!STORE.whatsappNumber) { notify('Ajoutez le numéro WhatsApp de la boutique dans src/data/store.js'); return; }
    window.open(`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  const directWhatsApp = () => {
    if (!STORE.whatsappNumber) { notify('Le numéro WhatsApp sera configuré avant la mise en ligne'); return; }
    window.open(`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent('Bonjour Marie Glam, je souhaite avoir des informations sur vos produits.')}`, '_blank', 'noopener,noreferrer');
  };
  const scrollTo = (id) => { setMobileMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <>
    <div className="announcement"><span>MARIE GLAM · SAINT-LOUIS</span><span>Livraison & retrait en boutique</span><ArrowUpRight size={13}/></div>
    <header className="header">
      <button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(v => !v)} aria-label="Ouvrir le menu">{mobileMenu ? <X/> : <Menu/>}</button>
      <a className="wordmark" href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top'); }}>MARIE<span>GLAM</span><i>®</i></a>
      <nav className="desktop-nav"><button onClick={() => scrollTo('collections')}>Collections</button><button onClick={() => scrollTo('shop')}>La boutique</button><button onClick={() => scrollTo('about')}>Notre univers</button></nav>
      <div className="header-actions"><button className="icon-button search-button" onClick={() => setSearchOpen(v => !v)} aria-label="Rechercher"><Search size={19}/></button><button className="bag-button" onClick={() => setCartOpen(true)}>Panier <span>{cartCount.toString().padStart(2, '0')}</span><ShoppingBag size={17}/></button></div>
      <AnimatePresence>{mobileMenu && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><button onClick={() => scrollTo('collections')}>Collections <ArrowUpRight size={16}/></button><button onClick={() => scrollTo('shop')}>La boutique <ArrowUpRight size={16}/></button><button onClick={() => scrollTo('about')}>Notre univers <ArrowUpRight size={16}/></button></motion.nav>}</AnimatePresence>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-image"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2200&q=90" alt="Intérieur chaleureux aux matières naturelles" fetchPriority="high"/><div className="hero-shade"/></div>
        <div className="hero-topline"><span>OBJETS · MAISON · ART DE VIVRE</span><span>COLLECTION 001 — SAINT-LOUIS</span></div>
        <div className="hero-copy"><p className="eyebrow light"><span className="eyebrow-line"/>L'ART DE VIVRE CHEZ SOI</p><h1>Votre maison.<br/><em>Votre signature.</em></h1><p className="hero-subtitle">Des objets choisis pour transformer les petits détails en grandes sensations.</p><button className="light-cta" onClick={() => scrollTo('shop')}>Explorer la sélection <ArrowDown size={17}/></button></div>
        <div className="hero-bottom"><span>01 / UNE SÉLECTION QUI A DU SENS</span><span className="hero-scroll">DÉFILER POUR DÉCOUVRIR <ArrowDown size={13}/></span><span>16° 01′ N — 16° 30′ W</span></div>
        <span className="hero-index">MG—001</span>
      </section>

      <div className="ticker" aria-label="Univers Marie Glam"><div className="ticker-track">{Array.from({length: 4}, (_, i) => <span key={i}>LES DÉTAILS FONT LA DIFFÉRENCE <b>·</b> L'ART DE SE SENTIR CHEZ SOI <b>·</b></span>)}</div></div>

      <section className="intro-section" id="collections">
        <div className="section-kicker"><span>01 — NOS UNIVERS</span><span>UNE MAISON QUI VOUS RESSEMBLE</span></div>
        <div className="intro-heading"><h2>Le beau se cache<br/>dans <em>les détails.</em></h2><p>Décoration, accessoires et essentiels du quotidien. Une sélection éclectique, pensée pour donner du caractère à chaque espace.</p></div>
        <div className="category-grid">
          <button className="category-tile category-large" onClick={() => { setCategory('Décoration'); scrollTo('shop'); }}><img src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1300&q=85" alt="Objets décoratifs" loading="lazy"/><span className="category-shade"/><span className="category-index">CAT. 01</span><span className="category-name">Décoration <ArrowUpRight size={19}/></span><span className="category-count">OBJETS & AMBIANCE</span></button>
          <button className="category-tile" onClick={() => { setCategory('Cuisine & rangement'); scrollTo('shop'); }}><img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85" alt="Cuisine et rangement" loading="lazy"/><span className="category-shade"/><span className="category-index">CAT. 02</span><span className="category-name">Cuisine & rangement <ArrowUpRight size={19}/></span><span className="category-count">PRATIQUE, AU QUOTIDIEN</span></button>
          <button className="category-tile" onClick={() => { setCategory('Accessoires maison'); scrollTo('shop'); }}><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" alt="Accessoires pour la maison" loading="lazy"/><span className="category-shade"/><span className="category-index">CAT. 03</span><span className="category-name">Accessoires maison <ArrowUpRight size={19}/></span><span className="category-count">LES PETITS PLUS</span></button>
        </div>
      </section>

      <section className="more-universes" aria-labelledby="more-universes-title">
        <div className="section-kicker"><span>01B — ET BIEN PLUS</span><span>UN SEUL UNIVERS, PLUSIEURS ENVIES</span></div>
        <div className="more-universes-heading"><div><p className="eyebrow"><span className="eyebrow-line"/>AU-DELÀ DE LA MAISON</p><h2>Vos autres <em>coups de cœur.</em></h2></div><p>Marie Glam rassemble aussi les accessoires, les bijoux et les petites trouvailles qui font plaisir. Tout n'est pas au premier plan, mais chaque univers reste à portée de main.</p></div>
        <div className="secondary-category-grid">
          <button className="secondary-category-tile" onClick={() => { setCategory('Bijoux'); scrollTo('shop'); }}><img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85" alt="Bijoux et boucles d'oreilles" loading="lazy"/><span className="secondary-category-index">CAT. 04</span><span className="secondary-category-name">Bijoux <ArrowUpRight size={17}/></span></button>
          <button className="secondary-category-tile" onClick={() => { setCategory('Sacs & maroquinerie'); scrollTo('shop'); }}><img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85" alt="Sacs et maroquinerie" loading="lazy"/><span className="secondary-category-index">CAT. 05</span><span className="secondary-category-name">Sacs <ArrowUpRight size={17}/></span></button>
          <button className="secondary-category-tile" onClick={() => { setCategory('Mode & accessoires'); scrollTo('shop'); }}><img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85" alt="Accessoires de mode" loading="lazy"/><span className="secondary-category-index">CAT. 06</span><span className="secondary-category-name">Mode & accessoires <ArrowUpRight size={17}/></span></button>
          <button className="secondary-category-tile" onClick={() => { setCategory('Beauté & bien-être'); scrollTo('shop'); }}><img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85" alt="Beauté et bien-être" loading="lazy"/><span className="secondary-category-index">CAT. 07</span><span className="secondary-category-name">Beauté <ArrowUpRight size={17}/></span></button>
          <button className="secondary-category-tile" onClick={() => { setCategory('Idées cadeaux'); scrollTo('shop'); }}><img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85" alt="Idées cadeaux" loading="lazy"/><span className="secondary-category-index">CAT. 08</span><span className="secondary-category-name">Idées cadeaux <ArrowUpRight size={17}/></span></button>
        </div>
        <div className="more-universes-footer"><span>UNE BOUTIQUE, PLUSIEURS UNIVERS.</span><button onClick={() => { setCategory('Tout voir'); scrollTo('shop'); }}>Voir tout le catalogue <ArrowUpRight size={15}/></button></div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-kicker"><span>02 — LA SÉLECTION</span><span>DES TROUVAILLES POUR TOUS LES JOURS</span></div>
        <div className="shop-heading"><div><p className="eyebrow"><span className="eyebrow-line"/>À DÉCOUVRIR</p><h2>Les pièces <em>du moment.</em></h2></div><p className="shop-note">Des essentiels pour la maison et des détails qui changent tout.</p></div>
        {searchOpen && <div className="search-field"><Search size={18}/><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un produit, une catégorie…"/><button onClick={() => { setQuery(''); setSearchOpen(false); }} aria-label="Fermer la recherche"><X size={17}/></button></div>}
        <div className="shop-toolbar"><div className="filters" role="group" aria-label="Filtrer les produits">{CATEGORIES.map(item => <button key={item} className={category === item ? 'filter active' : 'filter'} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="product-count"><SlidersHorizontal size={14}/> {filteredProducts.length.toString().padStart(2, '0')} ARTICLES</span></div>
        <motion.div className="product-grid" layout><AnimatePresence mode="popLayout">{filteredProducts.map(product => <ProductCard key={product.id} product={product} onAdd={addToCart} onOpen={setSelectedProduct}/>)}</AnimatePresence></motion.div>
        {filteredProducts.length === 0 && <div className="empty-state"><Search size={25}/><p>Aucun produit ne correspond à votre recherche.</p><button onClick={() => { setQuery(''); setCategory('Tout voir'); }}>Réinitialiser les filtres</button></div>}
        <div className="shop-footer"><span>UNE SÉLECTION EN MOUVEMENT</span><button onClick={() => { setCategory('Tout voir'); setQuery(''); }}>Voir toute la sélection <ArrowRight size={16}/></button></div>
      </section>

      <section className="manifesto" id="about"><div className="manifesto-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=90" alt="Un intérieur soigneusement composé" loading="lazy"/><span className="image-caption">UN ESPACE QUI VOUS RESSEMBLE — SAINT-LOUIS</span></div><div className="manifesto-copy"><p className="eyebrow light"><span className="eyebrow-line"/>L'UNIVERS MARIE GLAM</p><h2>Plus qu'un objet.<br/>Une <em>atmosphère.</em></h2><p>Nous croyons que la personnalité d'un intérieur se construit avec les objets que l'on choisit, les matières que l'on aime et les détails qui nous ressemblent.</p><p>Explorez notre sélection en ligne, puis choisissez la livraison ou le retrait directement en boutique.</p><button className="outline-cta" onClick={() => scrollTo('shop')}>Trouver votre pièce <ArrowUpRight size={17}/></button><span className="manifesto-mark">MG.</span></div></section>

      <section className="service-strip"><div className="section-kicker"><span>03 — SIMPLE, COMME IL SE DOIT</span><span>VOTRE COMMANDE, VOTRE RYTHME</span></div><div className="service-grid"><div className="service-item"><Truck size={22}/><span className="service-number">01</span><h3>Livraison à Saint-Louis</h3><p>Les frais et délais sont confirmés avant validation de la commande.</p></div><div className="service-item"><MapPin size={22}/><span className="service-number">02</span><h3>Retrait en boutique</h3><p>Commandez à distance et récupérez votre achat après confirmation.</p></div><div className="service-item"><MessageCircle size={22}/><span className="service-number">03</span><h3>Un échange direct</h3><p>Une question sur un article ? Contactez la boutique avant de commander.</p></div></div></section>

      <section className="closing-cta"><p className="eyebrow light"><span className="eyebrow-line"/>MARIE GLAM — SAINT-LOUIS</p><h2>Le prochain détail<br/>qui change <em>tout.</em></h2><button className="light-cta" onClick={() => scrollTo('shop')}>Découvrir la sélection <ArrowUpRight size={17}/></button><span className="closing-stamp">CHOISI AVEC GOÛT.<br/>PENSÉ POUR CHEZ VOUS.</span></section>
    </main>

    <footer className="footer"><div className="footer-top"><a className="wordmark footer-wordmark" href="#top" onClick={e => {e.preventDefault(); scrollTo('top');}}>MARIE<span>GLAM</span><i>®</i></a><p>Les détails font<br/>la différence.</p><button className="back-top" onClick={() => scrollTo('top')}>RETOUR EN HAUT <ArrowUpRight size={15}/></button></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MARIE GLAM</span><span>SAINT-LOUIS, SÉNÉGAL</span><button onClick={directWhatsApp}>CONTACTER LA BOUTIQUE <ArrowUpRight size={14}/></button><span>FAIT AVEC INTENTION.</span></div></footer>
    <AnimatePresence>{cartOpen && <><motion.button className="drawer-backdrop" aria-label="Fermer le panier" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/><motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 280 }}><div className="drawer-head"><div><span className="drawer-kicker">VOTRE SÉLECTION</span><h2>Le panier <em>({cartCount})</em></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fermer"><X/></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={34}/><h3>Votre panier est vide.</h3><p>Quelques belles trouvailles vous attendent.</p><button className="dark-cta" onClick={() => {setCartOpen(false); scrollTo('shop');}}>Explorer la boutique <ArrowRight size={16}/></button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.product.id}><img src={item.product.image} alt={item.product.name}/><div className="cart-item-info"><span>{item.product.category}</span><h3>{item.product.name}</h3><strong>{formatPrice(item.product.price)}</strong><div className="quantity-control"><button onClick={() => changeQuantity(item.product.id, -1)} aria-label="Retirer une unité"><Minus size={13}/></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.product.id, 1)} aria-label="Ajouter une unité"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => setCart(current => current.filter(i => i.product.id !== item.product.id))} aria-label="Supprimer l'article"><X size={15}/></button></div>)}</div><div className="cart-summary"><div className="subtotal"><span>Sous-total</span><strong>{formatPrice(cartTotal)}</strong></div><p>Livraison ou retrait en boutique à confirmer avec la boutique.</p><button className="dark-cta full-cta" onClick={startOrder}>Finaliser sur WhatsApp <ArrowUpRight size={17}/></button><span className="secure-note"><Check size={13}/> La commande sera confirmée par la boutique.</span></div></>}</motion.aside></>}</AnimatePresence>

    <AnimatePresence>{selectedProduct && <><motion.button className="modal-backdrop" onClick={() => setSelectedProduct(null)} aria-label="Fermer le produit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/><motion.div className="product-modal" role="dialog" aria-modal="true" aria-label={selectedProduct.name} initial={{ opacity: 0, y: 22, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }}><button className="modal-close icon-button" onClick={() => setSelectedProduct(null)} aria-label="Fermer"><X/></button><div className="modal-image"><img src={selectedProduct.image} alt={selectedProduct.name}/></div><div className="modal-info"><span className="drawer-kicker">{selectedProduct.id} / {selectedProduct.category}</span><h2>{selectedProduct.name}</h2><strong className="modal-price">{formatPrice(selectedProduct.price)}</strong><p>{selectedProduct.description}</p><div className="availability"><span className="availability-dot"/> Disponibilité à confirmer auprès de la boutique</div><button className="dark-cta full-cta" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setCartOpen(true); }}>Ajouter au panier <Plus size={16}/></button><button className="modal-whatsapp" onClick={directWhatsApp}><MessageCircle size={16}/> Une question sur ce produit ?</button><p className="mockup-disclaimer">Visuel de démonstration — à remplacer par la photo réelle du produit avant publication.</p></div></motion.div></>}</AnimatePresence>

    <ChatWidget />

    <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><Sparkles size={16}/>{toast}</motion.div>}</AnimatePresence>
  </>;
}

export default App;
