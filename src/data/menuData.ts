import { MenuItem } from '@/contexts/CartContext';

// Import all images
import calamariImage from '@/assets/foods/calamari.jpg';
import aranciniImage from '@/assets/foods/arancini.jpg';
import wingsImage from '@/assets/foods/wings.jpg';
import bruschettaImage from '@/assets/foods/bruschetta.jpg';
import salmonImage from '@/assets/foods/salmon.jpg';
import steakImage from '@/assets/foods/steak.jpg';
import risottoImage from '@/assets/foods/risotto.jpg';
import burgerImage from '@/assets/foods/burger.jpg';
import padthaiImage from '@/assets/foods/padthai.jpg';
import lavaCakeImage from '@/assets/foods/lava-cake.jpg';
import tiramisuImage from '@/assets/foods/tiramisu.jpg';
import cheesecakeImage from '@/assets/foods/cheesecake.jpg';
import fruitTartImage from '@/assets/foods/fruit-tart.jpg';
import craftBeerImage from '@/assets/foods/craft-beer.jpg';
import wineImage from '@/assets/foods/wine.jpg';
import smoothieImage from '@/assets/foods/smoothie.jpg';
import coffeeImage from '@/assets/foods/coffee.jpg';

export const menuData: MenuItem[] = [
  // Starters
  {
    id: 'starter-1',
    name: 'Crispy Calamari Rings',
    description: 'Fresh squid rings with a golden crispy coating, served with zesty marinara sauce',
    price: 12.99,
    image: calamariImage,
    category: 'starters',
    dietary: ['spicy']
  },
  {
    id: 'starter-2',
    name: 'Truffle Arancini',
    description: 'Creamy risotto balls stuffed with parmesan and truffle oil, pan-fried to perfection',
    price: 14.99,
    image: aranciniImage,
    category: 'starters',
    dietary: ['vegetarian']
  },
  {
    id: 'starter-3',
    name: 'Buffalo Chicken Wings',
    description: 'Spicy buffalo wings with celery sticks and blue cheese dipping sauce',
    price: 11.99,
    image: wingsImage,
    category: 'starters',
    dietary: ['spicy']
  },
  {
    id: 'starter-4',
    name: 'Mediterranean Bruschetta',
    description: 'Toasted sourdough topped with fresh tomatoes, basil, and mozzarella',
    price: 9.99,
    image: bruschettaImage,
    category: 'starters',
    dietary: ['vegetarian']
  },

  // Mains
  {
    id: 'main-1',
    name: 'Grilled Salmon Fillet',
    description: 'Fresh Atlantic salmon with herb butter, served with roasted vegetables and quinoa',
    price: 26.99,
    image: salmonImage,
    category: 'mains',
    dietary: ['healthy']
  },
  {
    id: 'main-2',
    name: 'Ribeye Steak',
    description: 'Premium 12oz ribeye steak cooked to perfection with garlic mashed potatoes',
    price: 32.99,
    image: steakImage,
    category: 'mains'
  },
  {
    id: 'main-3',
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms, parmesan, and fresh herbs',
    price: 22.99,
    image: risottoImage,
    category: 'mains',
    dietary: ['vegetarian']
  },
  {
    id: 'main-4',
    name: 'BBQ Pulled Pork Burger',
    description: 'Slow-cooked pulled pork with BBQ sauce, coleslaw, and crispy onions',
    price: 18.99,
    image: burgerImage,
    category: 'mains'
  },
  {
    id: 'main-5',
    name: 'Pad Thai Noodles',
    description: 'Traditional Thai stir-fried noodles with shrimp, peanuts, and lime',
    price: 19.99,
    image: padthaiImage,
    category: 'mains',
    dietary: ['spicy']
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 8.99,
    image: lavaCakeImage,
    category: 'desserts',
    dietary: ['vegetarian']
  },
  {
    id: 'dessert-2',
    name: 'Classic Tiramisu',
    description: 'Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 7.99,
    image: tiramisuImage,
    category: 'desserts',
    dietary: ['vegetarian']
  },
  {
    id: 'dessert-3',
    name: 'New York Cheesecake',
    description: 'Rich and creamy cheesecake with graham cracker crust and berry compote',
    price: 9.99,
    image: cheesecakeImage,
    category: 'desserts',
    dietary: ['vegetarian']
  },
  {
    id: 'dessert-4',
    name: 'Seasonal Fruit Tart',
    description: 'Fresh seasonal fruits on vanilla custard with crispy pastry shell',
    price: 8.99,
    image: fruitTartImage,
    category: 'desserts',
    dietary: ['vegetarian', 'healthy']
  },

  // Drinks
  {
    id: 'drink-1',
    name: 'Craft Beer Selection',
    description: 'Rotating selection of local craft beers on tap',
    price: 6.99,
    image: craftBeerImage,
    category: 'drinks'
  },
  {
    id: 'drink-2',
    name: 'House Wine',
    description: 'Premium selection of red and white wines by the glass',
    price: 8.99,
    image: wineImage,
    category: 'drinks'
  },
  {
    id: 'drink-3',
    name: 'Fresh Smoothie Bowl',
    description: 'Blended acai berries with granola, fresh fruits, and honey',
    price: 9.99,
    image: smoothieImage,
    category: 'drinks',
    dietary: ['vegan', 'healthy']
  },
  {
    id: 'drink-4',
    name: 'Artisan Coffee',
    description: 'Single-origin coffee beans roasted in-house, served hot or iced',
    price: 4.99,
    image: coffeeImage,
    category: 'drinks',
    dietary: ['vegan']
  }
];

export const categories = [
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Mains', icon: '🍖' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🍷' }
] as const;