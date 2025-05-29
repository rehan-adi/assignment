# Backend Documentation

## Overview

This backend implementation provides authentication and product management functionality with the following key features:

## Authentication System

### Mutations
- **Signup**: User registration endpoint
- **Signin**: User login endpoint

## 🛍️ `getProducts` Query

The `getProducts` query allows you to retrieve product data with filtering, searching, and sorting options.

---

### 🔍 Features

#### 🔎 **Search Functionality**
- Filter products by title

#### 🗂️ **Category Filtering**
- Filter products by a specific category

#### ↕️ **Sorting Options**
- Sort by any product field using the `sortBy` parameter
- Support for both:
  - Ascending order (`"asc"`)
  - Descending order (`"desc"`)

---

### 🧪 Example Usage

```graphql
query {
  getProducts(filter: {
    search: "Laptop",
    category: "electronics",
    sortBy: "price",
    sortOrder: "asc"
  }) {
    data {
      id
      title
      category
      price
    }
  }
}
```

### Security Features
- **In-memory database**: All signin and signup data is stored in memory
- **JWT Authentication**: Using `jsonwebtoken` for secure authentication tokens
- **Password Security**: Using `bcrypt` for password hashing

## Product Management

### Data Flow
1. **External API Integration**: Products data is fetched from an external API
2. **ProductDB Storage**: Fetched products are stored in an in-memory ProductDB

## Getting Started

###  Setup

```bash
# Install dependencies
pnpm i

# Build the project
pnpm build

# Start the server
pnpm start
```

### Automatic Data Population

When you run `pnpm start`, the server will automatically:
- Start the backend service
- Call a function that fetches all products data from the external API
- Store the fetched products in the ProductDB (in-memory database)
