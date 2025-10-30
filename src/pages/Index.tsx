import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Cart from '@/components/Cart';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      name: 'Беспроводные наушники',
      price: 4990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Электроника',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Смарт-часы',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      category: 'Электроника',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Кожаный рюкзак',
      price: 6990,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      category: 'Аксессуары',
      rating: 4.3,
    },
    {
      id: 4,
      name: 'Солнцезащитные очки',
      price: 2990,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      category: 'Аксессуары',
      rating: 4.6,
    },
    {
      id: 5,
      name: 'Портативная колонка',
      price: 3490,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      category: 'Электроника',
      rating: 4.4,
    },
    {
      id: 6,
      name: 'Спортивная бутылка',
      price: 890,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
      category: 'Спорт',
      rating: 4.7,
    },
  ];

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <Badge className="mb-4 text-sm">Новая коллекция</Badge>
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Стиль и качество
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Найдите идеальные товары для вашего образа жизни
          </p>
          <Button size="lg" className="gap-2">
            Смотреть каталог
            <Icon name="ArrowRight" size={18} />
          </Button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Популярные товары</h2>
              <p className="text-muted-foreground">
                Выбор покупателей этой недели
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Поиск товаров..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Truck" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Быстрая доставка</h3>
                <p className="text-sm text-muted-foreground">
                  Доставим ваш заказ от 1 дня
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Гарантия качества</h3>
                <p className="text-sm text-muted-foreground">
                  Проверяем каждый товар перед отправкой
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="RotateCcw" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Легкий возврат</h3>
                <p className="text-sm text-muted-foreground">
                  30 дней на возврат без объяснений
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Магазин</h3>
              <p className="text-sm text-muted-foreground">
                Качественные товары для вашей жизни
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Электроника</li>
                <li>Аксессуары</li>
                <li>Спорт</li>
                <li>Дом</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Помощь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Доставка</li>
                <li>Возврат</li>
                <li>Оплата</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (999) 123-45-67</li>
                <li>shop@example.com</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Магазин. Все права защищены.
          </div>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Index;
