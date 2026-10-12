import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, ArrowUpRight } from 'lucide-react';
import { PRODUCTS, STORE, formatPrice } from '../data/store.js';

const suggestions = [
  'Quels produits conseillez-vous ?',
  'Comment commander ?',
  'Livrez-vous à Saint-Louis ?',
];

function answerQuestion(text) {
  const q = text.toLocaleLowerCase('fr-FR');
  if (/bonjour|bonsoir|salut|hello/.test(q)) {
    return 'Bienvenue chez Marie Glam. Que recherchez-vous : un article pour la maison, un accessoire ou une idee cadeau ?';
  }
  if (/livraison|livrez|livrer|retrait|boutique|saint.?louis/.test(q)) {
    return `Nous proposons la livraison et le retrait en boutique a ${STORE.city}. ${STORE.deliveryNote} Les frais et delais sont a confirmer avec la boutique.`;
  }
  if (/commander|commande|acheter|achat|panier/.test(q)) {
    return 'Choisissez un produit et ajoutez-le au panier, puis utilisez le bouton de commande WhatsApp. La boutique confirmera la disponibilite et le mode de reception.';
  }
  if (/prix|combien|cout|tarif|fcfa/.test(q)) {
    return 'Les prix sont affiches sur chaque fiche produit en FCFA. Indiquez-moi le nom de l’article qui vous interesse et je vous aiderai a le retrouver.';
  }
  if (/disponible|stock|disponibilite/.test(q)) {
    return 'La disponibilite doit etre confirmee par la boutique. Vous pouvez continuer sur WhatsApp pour obtenir une confirmation avant de commander.';
  }
  const words = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[^a-z0-9]+/).filter(w => w.length > 3);
  const matches = PRODUCTS.filter(p => {
    const haystack = `${p.name} ${p.category} ${p.description}`.toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return words.some(word => haystack.includes(word));
  }).slice(0, 3);
  if (matches.length) {
    return 'Voici les articles qui semblent correspondre :\n' + matches.map(p => `- ${p.name} : ${formatPrice(p.price)}`).join('\n') + '\nLa disponibilite est a confirmer aupres de la boutique.';
  }
  return 'Je peux vous aider a explorer le catalogue, retrouver un produit ou expliquer comment commander. Pour une question specifique, notre equipe peut vous repondre sur WhatsApp.';
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bienvenue chez Marie Glam. Comment puis-je vous aider a trouver ce qu’il vous faut ?' },
  ]);

  function sendMessage(value = input) {
    const text = value.trim();
    if (!text) return;
    setMessages(prev => [...prev, { from: 'user', text }, { from: 'bot', text: answerQuestion(text) }]);
    setInput('');
  }

  function openWhatsApp() {
    const questions = messages.filter(m => m.from === 'user').map(m => m.text).join('\n');
    const message = [
      `Bonjour ${STORE.name},`,
      'Je viens de votre site et souhaite obtenir des informations.',
      questions ? '' : null,
      questions ? `Ma demande :\n${questions}` : null,
      '',
      `Localite : ${STORE.city}`,
    ].filter(v => v !== null).join('\n');
    window.open(`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return <div className="mg-chat">
    {open && <section className="mg-chat-panel" aria-label="Assistant Marie Glam">
      <header className="mg-chat-header">
        <span className="mg-chat-avatar"><Sparkles size={17} /></span>
        <div><strong>Marie Glam</strong><small>Assistant boutique</small></div>
        <button onClick={() => setOpen(false)} aria-label="Fermer le chat"><X size={18} /></button>
      </header>
      <div className="mg-chat-messages" aria-live="polite">
        {messages.map((m, i) => <div key={i} className={`mg-chat-message ${m.from}`}>{m.text}</div>)}
        {messages.length === 1 && <div className="mg-chat-suggestions">{suggestions.map(s => <button key={s} onClick={() => sendMessage(s)}>{s}</button>)}</div>}
      </div>
      <form className="mg-chat-form" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ecrivez votre message..." aria-label="Votre message" />
        <button type="submit" aria-label="Envoyer"><Send size={16} /></button>
      </form>
      <button className="mg-chat-whatsapp" onClick={openWhatsApp}>Continuer sur WhatsApp <ArrowUpRight size={15} /></button>
    </section>}
    <button className="mg-chat-launcher" onClick={() => setOpen(v => !v)} aria-label={open ? 'Fermer le chat' : 'Parler a Marie Glam'}>
      {open ? <X size={20} /> : <MessageCircle size={20} />}
      {!open && <span>Besoin d’aide ?</span>}
    </button>
  </div>;
}
