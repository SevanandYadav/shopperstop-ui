import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Payment from './components/Payment';
import OrderSuccess from './components/OrderSuccess';
import { fetchProducts } from './services/api';

const productImages = {
  1: '/electronics/laptop.png',
  2: '/electronics/mouse.png', 
  3: '/electronics/keyboard.png',
  4: '/electronics/laptop.png',
  5: '/electronics/headphone.png'
};

const productCategories = {
  1: 'computers',
  2: 'accessories', 
  3: 'accessories',
  4: 'electronics',
  5: 'audio'
};

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('products'); // products, cart, payment, success
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log('Raw API data:', data);
        
        if (!data || data.length === 0) {
          console.warn('No products received from API');
          setLoading(false);
          return;
        }
        
        const productsWithImages = data.map(product => ({
          ...product,
          image: productImages[product.id] || '/electronics/laptop.png',
          category: productCategories[product.id] || 'electronics'
        }));
        
        console.log('Products with images:', productsWithImages);
        console.log('Setting products state...');
        setProducts(productsWithImages);
        setFilteredProducts(productsWithImages);
        setLoading(false);
        console.log('Products state updated');
      } catch (error) {
        console.error('Failed to load products:', error);
        // Fallback data for testing
        const fallbackProducts = [
          { id: 1, name: 'Laptop', price: 999.99, image: '/electronics/laptop.png', category: 'computers' },
          { id: 2, name: 'Mouse', price: 25.5, image: '/electronics/mouse.png', category: 'accessories' },
          { id: 3, name: 'Keyboard', price: 75.0, image: '/electronics/keyboard.png', category: 'accessories' },
          { id: 4, name: 'Monitor', price: 299.99, image: '/electronics/laptop.png', category: 'electronics' },
          { id: 5, name: 'Headphones', price: 149.99, image: '/electronics/headphone.png', category: 'audio' }
        ];
        console.log('Using fallback products');
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    if (selectedProduct) setSelectedProduct(null);
  };

  const handleProceedToBuy = (amount) => {
    setTotalAmount(amount);
    setCurrentView('payment');
  };

  const handlePaymentComplete = () => {
    setCart([]);
    setCurrentView('success');
  };

  const handleContinueShopping = () => {
    setCurrentView('products');
    setSelectedProduct(null);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCategoryChange = (categoryId) => {
    console.log('Category changed to:', categoryId);
    console.log('All products:', products);
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      console.log('Showing all products:', products);
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === categoryId);
      console.log('Filtered products for', categoryId, ':', filtered);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return <div className="App"><p>Loading products...</p></div>;
  }

  if (products.length === 0) {
    return <div className="App"><p>No products found</p></div>;
  }

  return (
    <div className="App">
      <Header 
        cartCount={getTotalItems()} 
        onCartClick={() => setCurrentView('cart')} 
      />
      
      <CategoryBar 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      ) : currentView === 'cart' ? (
        <Cart 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onContinueShopping={handleContinueShopping}
          onProceedToBuy={handleProceedToBuy}
        />
      ) : currentView === 'payment' ? (
        <Payment 
          cart={cart}
          totalAmount={totalAmount}
          onPaymentComplete={handlePaymentComplete}
          onBack={() => setCurrentView('cart')}
        />
      ) : currentView === 'success' ? (
        <OrderSuccess 
          onContinueShopping={handleContinueShopping}
        />
      ) : (
        <ProductGrid 
          products={filteredProducts}
          onProductClick={setSelectedProduct}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}

export default App;