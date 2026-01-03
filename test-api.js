console.log('Testing API endpoints...');

// Test product API
fetch('/api/products')
  .then(response => {
    if (response.ok) {
      console.log('✓ Products API is accessible');
      return response.json();
    } else {
      console.log('✗ Products API error:', response.status);
    }
  })
  .then(data => {
    if (data) {
      console.log('✓ Retrieved', data.length, 'products');
    }
  })
  .catch(error => {
    console.log('✗ Products API fetch error:', error);
  });

// Test cart API
const testSessionId = 'test-session-' + Date.now();
fetch('/api/cart/' + testSessionId)
  .then(response => {
    if (response.ok) {
      console.log('✓ Cart API is accessible');
      return response.json();
    } else {
      console.log('✗ Cart API error:', response.status);
    }
  })
  .catch(error => {
    console.log('✗ Cart API fetch error:', error);
  });

console.log('API connectivity test initiated');

