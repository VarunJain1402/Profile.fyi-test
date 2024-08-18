# ShopNex - E-commerce Website

ShopNex is a responsive e-commerce platform built using React and Tailwind CSS. The app integrates Firebase for authentication, session management, and real-time database functionalities. It uses the FakeStoreAPI to provide a collection of products for users to browse, add to their cart, and manage purchases.

## Tech Stack

- **React**: For building the user interface.
- **Tailwind CSS**: For responsive and utility-first styling.
- **Firebase Firestore**: For real-time data storage and synchronization.
- **Firebase Authentication**: For secure user authentication and session management.
- **FakeStoreAPI**: To fetch product data.

## Features

- **User Authentication**: Secure login and registration using Firebase.
- **Real-time Cart Management**: Add, update, or remove products in the cart, with changes reflected instantly in the UI and database.
- **Discount Application**: Apply a 10% discount to the total cart value.
- **Dynamic Cart Button**: "Add to Cart" changes to "Remove from Cart" based on the product’s presence in the cart.
- **Responsive Design**: Seamless experience across all device sizes.

## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/VarunJain1402/Profile.fyi-test.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up Firebase:**

    - Create a Firebase project and add your app’s configuration to `src/firebase.js`.

4. **Start the development server:**

    ```bash
    npm start
    ```

## How It Works

- **Cart Management**: Products can be added or removed from the cart. Quantities can be updated directly in the cart, with real-time updates to the total price and item count.
- **Discounts**: Apply or remove a 10% discount, with the total updated both in the UI and Firestore.
