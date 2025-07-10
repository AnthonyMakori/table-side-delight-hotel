import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../src/components/ui/tabs';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { menuData, categories } from '../../src/data/menuData';
import { MenuCard } from '../../src/components/MenuCard';
import { useCart } from '../../contexts/CartContext';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('starters');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const filteredItems = menuData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-food">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">Savory Bites</h1>
              <span className="ml-2 text-sm text-muted-foreground">Restaurant</span>
            </div>
            <Button
              onClick={() => navigate('/cart')}
              variant="default"
              className="relative"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients and passion for great taste.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/60 backdrop-blur-sm">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Menu Items Grid */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Menu;