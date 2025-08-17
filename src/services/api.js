const API_BASE_URL = 'https://shopperstop-nlqi.onrender.com';

export const fetchProducts = async () => {
  try {
    console.log('Fetching products from API...');
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};