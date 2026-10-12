// Configuration centrale de la boutique. Remplacer les valeurs de démonstration avant publication.
export const STORE = {
  name: 'Marie Glam',
  city: 'Saint-Louis, Sénégal',
  whatsappNumber: '221775496756', // Format international sans + ni espaces
  currency: 'FCFA',
  deliveryNote: 'Livraison à Saint-Louis ou retrait en boutique après confirmation.',
};

// Catalogue de démonstration : prix, disponibilité et visuels à valider avec la cliente.
// Chaque produit possède un id stable pour remplacer les mockups sans modifier la boutique.
export const PRODUCTS = [
  { id: 'MG-001', name: 'Vase sculptural', category: 'Décoration', price: 12500, label: 'Sélection', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1000&q=85', description: 'Une silhouette sculpturale pour donner du caractère à une console ou une étagère.', available: true },
  { id: 'MG-002', name: 'Lampe d’ambiance', category: 'Décoration', price: 18500, label: 'Coup de cœur', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85', description: 'Une lumière douce pour créer une atmosphère chaleureuse.', available: true },
  { id: 'MG-003', name: 'Plateau décoratif', category: 'Accessoires maison', price: 9500, label: '', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85', description: 'Un plateau polyvalent pour organiser et mettre en scène les petits objets du quotidien.', available: true },
  { id: 'MG-004', name: 'Rangement essentiel', category: 'Cuisine & rangement', price: 7500, label: 'Pratique', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85', description: 'Une solution simple pour garder les essentiels bien organisés.', available: true },
  { id: 'MG-005', name: 'Vase minimal', category: 'Décoration', price: 8500, label: '', image: 'https://images.unsplash.com/photo-1612196808214-b7e1d6145a8c?auto=format&fit=crop&w=1000&q=85', description: 'Une pièce discrète qui trouve facilement sa place dans différents intérieurs.', available: true },
  { id: 'MG-006', name: 'Objet d’intérieur', category: 'Accessoires maison', price: 6500, label: 'Nouveau', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85', description: 'Une touche finale pour personnaliser votre espace.', available: true },
  { id: 'MG-007', name: 'Art de la table', category: 'Cuisine & rangement', price: 14500, label: '', image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1000&q=85', description: 'Des détails choisis pour rendre les moments à table plus beaux.', available: true },
  { id: 'MG-008', name: 'Détail signature', category: 'Décoration', price: 11000, label: '', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85', description: 'Un accent décoratif pensé pour compléter votre univers.', available: true },
  { id: 'MG-009', name: 'Boucles sculpturales', category: 'Bijoux', price: 6500, label: 'Nouvel univers', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85', description: 'Un détail affirmé pour compléter une tenue, à valider avec le catalogue réel.', available: true },
  { id: 'MG-010', name: 'Sac du quotidien', category: 'Sacs & maroquinerie', price: 18000, label: '', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85', description: 'Un sac polyvalent pour accompagner les essentiels du quotidien.', available: true },
  { id: 'MG-011', name: 'Lunettes de soleil', category: 'Mode & accessoires', price: 8500, label: '', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85', description: 'Un accessoire de style à choisir selon les modèles réellement disponibles.', available: true },
  { id: 'MG-012', name: 'Essentiel beauté', category: 'Beauté & bien-être', price: 7500, label: '', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85', description: 'Un produit de beauté à présenter avec ses caractéristiques et sa composition vérifiées.', available: true },
  { id: 'MG-013', name: 'Idée cadeau', category: 'Idées cadeaux', price: 10000, label: 'À offrir', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85', description: 'Une idée à offrir, à confirmer selon les produits et les emballages disponibles.', available: true },
];

export const CATEGORIES = ['Tout voir', 'Décoration', 'Cuisine & rangement', 'Accessoires maison', 'Bijoux', 'Sacs & maroquinerie', 'Mode & accessoires', 'Beauté & bien-être', 'Idées cadeaux'];

export const formatPrice = (price) => `${new Intl.NumberFormat('fr-FR').format(price)} ${STORE.currency}`;
