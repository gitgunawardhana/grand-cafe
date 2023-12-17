// __tests__/cartController.test.js
import request from 'supertest';
import app from '../index'; // Replace with the actual path to your Express app file
import Cart from '../models/Cart'; // Import the Cart model or adjust the import based on your project structure

describe('addToCart Controller Test', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await Cart.deleteMany();
  });

  it('should add an item to the cart', async () => {
    // Define the request payload
    const requestPayload = {
      id: 'product123',
      name: 'Product Name',
      u_id: 'user123',
      price: 19.99,
      image: 'product-image.jpg',
      quantity: 2,
      category: 'Electronics', // Add category if required by your schema
    };

    // Send a POST request to the addToCart endpoint with the payload
    const response = await request(app)
      .post('/api/add_cart/cart')
      .send(requestPayload);

    // Assert the response status and message
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Item added to cart');

    // Check if the item is actually added to the database
    const cartItem = await Cart.findOne({ id: 'product123', u_id: 'user123' });
    expect(cartItem).not.toBeNull();
    expect(cartItem.id).toBe(requestPayload.id);
    expect(cartItem.name).toBe(requestPayload.name);
    // Add more assertions based on your Cart model fields
  });

  it('should handle duplicate items in the cart', async () => {
    // Add an item to the cart first
    const initialCartItem = {
      id: 'product123',
      name: 'Product Name',
      u_id: 'user123',
      price: 19.99,
      image: 'product-image.jpg',
      quantity: 2,
      category: 'Electronics',
    };
    await Cart.create(initialCartItem);

    // Attempt to add the same item again
    const response = await request(app)
      .post('/api/add_cart/cart')
      .send(initialCartItem);

    // Assert the response status and message
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Item already in cart. You can update the quantity from the cart.');
  });

});


// describe('getCart Controller Test', () => {
//   beforeEach(async () => {
//     // Clear the database before each test
//     await Cart.deleteMany();
//   });

//   it('should get the cart for a specific user', async () => {
//     // Add some sample data to the cart for testing
//     const sampleCartItem = {
//       id: 'product123',
//       name: 'Product Name',
//       u_id: 'user123',
//       price: 19.99,
//       image: 'product-image.jpg',
//       quantity: 2,
//       category: 'Electronics',
//     };
//     await Cart.create(sampleCartItem);

//     // Make a GET request to the getCart endpoint with the user ID in the URL
//     const response = await request(app).get('/api/get_cart/user123');

//     // Assert the response status and message
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Success');

//     // Assert the data returned matches the added sample cart item
//     expect(response.body.data).toHaveLength(1); // Assuming you expect one item in the cart
//     const cartItem = response.body.data[0];
//     expect(cartItem.id).toBe(sampleCartItem.id);
//     expect(cartItem.name).toBe(sampleCartItem.name);
//     // Add more assertions based on your Cart model fields
//   });

//   it('should handle when the user has no items in the cart', async () => {
//     // Make a GET request to the getCart endpoint for a user with no items in the cart
//     const response = await request(app).get('/api/get_cart/user456');

//     // Assert the response status and message
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Success');

//     // Assert that the data returned is an empty array
//     expect(response.body.data).toHaveLength(0);
//   });

//   it('should handle internal server error', async () => {
//     // Mock an error in the Cart.find method to simulate an internal server error
//     jest.spyOn(Cart, 'find').mockRejectedValue(new Error('Some database error'));

//     // Make a GET request to the getCart endpoint
//     const response = await request(app).get('/api/get_cart/user789');

//     // Assert the response status and check the error message
//     expect(response.status).toBe(500);
//     expect(response.body.error).toBe('Internal server error');

//     // Restore the original implementation of Cart.find after the test
//     Cart.find.mockRestore();
//   });
// });