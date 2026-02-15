# AutomationExercise Test Plan

## Overview

**Application:** automationexercise.com  
**Type:** E-commerce Practice Website for QA Automation  
**Purpose:** A comprehensive platform for QA engineers to practice UI automation testing with realistic e-commerce workflows.  
**Framework:** Playwright with TypeScript

---

## Application Architecture

### Main Navigation Pages

- **Home Page** (`/`) - Featured products, categories, brands, recommended items
- **Products Page** (`/products`) - All products with search and filtering
- **Product Details Page** (`/product_details/{id}`) - Individual product info with reviews
- **Cart Page** (`/view_cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order placement workflow
- **Login/Signup** (`/login`) - User authentication
- **Contact Us** (`/contact_us`) - Contact form
- **Test Cases** (`/test_cases`) - List of all test scenarios
- **API Testing** (`/api_list`) - API documentation

### Key UI Elements

- Top Navigation: Logo, Home, Products, Cart, Signup/Login, Test Cases, API, Videos, Contact
- Left Sidebar: Categories (Women, Men, Kids), Brands with counts
- Footer: Subscription section, Copyright

---

## Test Suites & Cases

### Suite 1: User Authentication & Account Management

#### Test Case 1: Register a New User

**Objective:** Verify complete user registration flow with account creation and auto-login

**Steps:**

1. Navigate to https://automationexercise.com/
2. Verify home page loads with "AutomationExercise" heading
3. Click "Signup / Login" button in navigation
4. Verify "New User Signup!" section is visible
5. Enter valid name (e.g., "Test User")
6. Enter unique email address (e.g., test_timestamp@example.com)
7. Click "Signup" button
8. Verify "Enter Account Information" page is displayed
9. Select title (Mr./Mrs.)
10. Enter password (minimum 8 characters)
11. Select date of birth (Day, Month, Year from dropdowns)
12. Check "Sign up for our newsletter!" checkbox
13. Check "Receive special offers from our partners!" checkbox
14. Fill in personal details:
    - First name: "Test"
    - Last name: "User"
    - Company: "Test Company"
15. Fill in address details:
    - Address: "123 Test Street"
    - Address 2: "Apartment 1"
    - Country: Select from dropdown
    - State: "Test State"
    - City: "Test City"
    - Zipcode: "12345"
16. Enter Mobile Number: "1234567890"
17. Click "Create Account" button
18. Verify "Account Created!" message is displayed
19. Click "Continue" button
20. Verify "Logged in as Test User" message in navigation

**Expected Results:**

- ✓ Account is successfully created in system
- ✓ User is automatically logged in after registration
- ✓ Home page displays with logged-in state
- ✓ Navigation shows username

**Automation File:** `tests/specs/register-user.spec.ts`

---

#### Test Case 2: Login with Correct Email and Password

**Objective:** Verify successful login with valid credentials

**Steps:**

1. Navigate to https://automationexercise.com/
2. Click "Signup / Login" button
3. Verify "Login to your account" section is visible
4. Enter registered email address in email field
5. Enter correct password in password field
6. Click "Login" button
7. Wait for page redirect
8. Verify "Logged in as {username}" message in navigation bar

**Expected Results:**

- ✓ Login succeeds without errors
- ✓ User is redirected to home page
- ✓ Username is displayed in navigation
- ✓ Session is created

**Automation File:** `tests/specs/tc2-login-correct.spec.ts`

---

#### Test Case 3: Login with Incorrect Email and Password

**Objective:** Verify login fails with invalid credentials and shows error

**Steps:**

1. Navigate to https://automationexercise.com/
2. Click "Signup / Login" button
3. Enter invalid/non-existent email address
4. Enter incorrect password
5. Click "Login" button
6. Verify error message is displayed

**Expected Results:**

- ✓ Login fails gracefully
- ✓ Error message is shown to user
- ✓ User remains on login page
- ✓ No session is created

**Automation File:** `tests/specs/tc3-login-incorrect.spec.ts`

---

#### Test Case 4: Logout User

**Objective:** Verify user logout removes session and login indication

**Steps:**

1. Navigate to https://automationexercise.com/
2. Click "Signup / Login" button
3. Login with valid credentials (use Test Case 2 steps)
4. Verify "Logged in as {username}" is displayed
5. Locate and click "Logout" link in navigation
6. Verify user is logged out
7. Verify "Logged in as" message is removed from navigation
8. User is redirected to home page

**Expected Results:**

- ✓ Logout is successful
- ✓ Login indicator is removed from UI
- ✓ User is redirected to home page
- ✓ Session is destroyed

**Automation File:** `tests/specs/tc4-logout-user.spec.ts`

---

#### Test Case 5: Register User with Existing Email

**Objective:** Verify system prevents duplicate email registration

**Steps:**

1. Navigate to https://automationexercise.com/
2. Click "Signup / Login" button
3. Enter an email address that is already registered in system
4. Enter a name
5. Click "Signup" button
6. Verify error message indicating email already exists

**Expected Results:**

- ✓ Registration is rejected
- ✓ Error message clearly states email is already registered
- ✓ User is not redirected to account information page
- ✓ No duplicate account is created

**Automation File:** `tests/specs/tc5-register-existing-email.spec.ts`

**Test Data Scenario:**

- Use email from Test Case 1 registration (already in system)

---

### Suite 2: Contact Form

#### Test Case 6: Submit Contact Us Form

**Objective:** Verify contact form submission and validation

**Steps:**

1. Navigate to https://automationexercise.com/
2. Click "Contact us" link in navigation
3. Verify "Contact Us" page is loaded
4. Verify form title "Get In Touch" is visible
5. Fill in "Name" field: "Test Contact"
6. Fill in "Email" field: "test.contact@example.com"
7. Fill in "Subject" field: "Test Subject"
8. Fill in "Your Message Here" textarea: "This is a test message for contact form validation"
9. (Optional) Click "Choose File" button and upload a test file
10. Click "Submit" button
11. Verify success message is displayed
12. Verify form is cleared or page redirects

**Expected Results:**

- ✓ Contact form is displayed with all fields
- ✓ All fields accept input without validation errors
- ✓ Form submission is successful
- ✓ Success confirmation message is shown
- ✓ Email validation is performed

**Automation File:** `tests/specs/tc6-contact-us-form.spec.ts`

**Form Fields:**

- Name: Text input (required)
- Email: Email input (required)
- Subject: Text input (required)
- Message: Textarea (required)
- File: File chooser (optional)

---

### Suite 3: Product Browsing & Search

#### Test Case 7: Verify Test Cases Page

**Objective:** Verify all test scenarios are documented and accessible

**Steps:**

1. Navigate to https://automationexercise.com/
2. Click "Test Cases" link in navigation
3. Verify "Test Cases" page is loaded with heading
4. Verify heading text reads "Test Cases"
5. Verify all 26 test cases are listed on the page:
   - Test Case 1-26 should be visible
6. Click on any test case link (e.g., Test Case 1 link)
7. Verify test case details are displayed/expanded
8. Verify test steps are shown for the selected case

**Expected Results:**

- ✓ Test Cases page loads successfully
- ✓ All 26 test cases are visible in listing
- ✓ Test cases can be expanded/collapsed
- ✓ Test case details and steps are displayed
- ✓ Navigation is functional

**Automation File:** `tests/specs/tc7-test-cases-page.spec.ts`

---

#### Test Case 8: Verify All Products and Product Details

**Objective:** Verify product listing and detailed product information pages

**Steps:**

1. Navigate to https://automationexercise.com/
2. Click "Products" link in navigation
3. Verify products page loads with heading "All Products"
4. Verify products are displayed in grid layout
5. For each product listing, verify:
   - Product image is displayed
   - Product name is visible
   - Product price is shown (in format Rs. XXX)
6. Click "View Product" link on any product
7. Verify product details page opens
8. Verify product details include:
   - Product name
   - Product price
   - Product availability status
   - Star rating (if available)
   - Product description
   - Review section with existing reviews
   - Write review option

**Expected Results:**

- ✓ Products page displays all products correctly
- ✓ Product information is complete and accurate
- ✓ Product details page loads successfully
- ✓ All product details are displayed
- ✓ Navigation back to products works

**Automation File:** `tests/specs/tc8-product-details.spec.ts`

---

#### Test Case 9: Search Product

**Objective:** Verify product search functionality and result accuracy

**Steps:**

1. Navigate to https://automationexercise.com/products
2. Locate search field at top of products page
3. Enter search term (e.g., "Dress")
4. Click search button or press Enter key
5. Verify search results page loads
6. Verify only products matching search term are displayed
7. Verify each result contains:
   - Product image
   - Product name
   - Product price
8. Verify no unrelated products are shown
9. Verify search term highlighting in results (if applicable)

**Expected Results:**

- ✓ Search functionality works correctly
- ✓ Search results are accurate and relevant
- ✓ Only matching products are displayed
- ✓ Results display correctly formatted product info
- ✓ Search can be cleared to see all products again

**Automation File:** `tests/specs/tc9-search-product.spec.ts`

**Search Test Data:**

- Search Terms: "Dress", "Top", "Tshirt", "Jeans", "Saree"

---

### Suite 4: Shopping Cart & Subscription

#### Test Case 10: Verify Subscription in Home Page

**Objective:** Verify email subscription functionality on home page

**Steps:**

1. Navigate to https://automationexercise.com/
2. Scroll to bottom of home page
3. Verify "Subscription" section is visible
4. Verify "Your email address" input field is present
5. Verify subscription button is present
6. Enter valid email address in subscription field
7. Click subscription button
8. Verify success message is displayed (e.g., "You have been successfully subscribed!")
9. Verify email field is cleared or form resets

**Expected Results:**

- ✓ Subscription section is visible on home page
- ✓ Email input accepts valid email format
- ✓ Subscription is successful
- ✓ Success confirmation message is shown
- ✓ Email validation prevents invalid entries

**Automation File:** `tests/specs/tc10-subscription-home.spec.ts`

---

#### Test Case 11: Verify Subscription in Cart Page

**Objective:** Verify email subscription functionality on cart page

**Steps:**

1. Navigate to https://automationexercise.com/view_cart
2. Verify cart page loads (can be empty or with items)
3. Scroll to bottom of cart page
4. Verify "Subscription" section is visible
5. Verify "Your email address" input field is present
6. Verify subscription button is present
7. Enter valid email address in subscription field
8. Click subscription button
9. Verify success message is displayed
10. Verify form resets after submission

**Expected Results:**

- ✓ Subscription section is visible on cart page
- ✓ Email input accepts valid email format
- ✓ Subscription is successful
- ✓ Success confirmation message is shown

**Automation File:** `tests/specs/tc11-subscription-cart.spec.ts`

---

#### Test Case 12: Add Products in Cart

**Objective:** Verify products can be added to cart from various locations

**Steps:**

1. Navigate to https://automationexercise.com/
2. Method A - From Home Page:
   - Click "Add to cart" button on any featured product
   - Verify product is added
3. Method B - From Products Page:
   - Click "Products" link
   - Click "Add to cart" on selected product
4. Method C - From Product Details:
   - Click "View Product"
   - Select quantity (optional)
   - Click "Add to cart"
5. Navigate to Cart page by clicking "Cart" link
6. Verify cart displays all added products
7. Verify each product shows:
   - Product name
   - Product price
   - Quantity
   - Total (price × quantity)
8. Verify cart total is calculated correctly

**Expected Results:**

- ✓ Products are successfully added to cart from multiple locations
- ✓ Cart updates immediately after adding product
- ✓ Cart displays all products with correct details
- ✓ Cart calculations are accurate

**Automation File:** `tests/specs/tc12-add-to-cart.spec.ts`

---

#### Test Case 13: Verify Product Quantity in Cart

**Objective:** Verify product quantity can be modified and totals recalculate

**Steps:**

1. Add a product to cart (using Test Case 12 steps)
2. Navigate to cart page
3. Verify initial quantity is 1
4. Click quantity increment button (+ button) or modify quantity field
5. Verify quantity is updated to 2
6. Verify product total price is recalculated (price × new quantity)
7. Verify cart total is updated
8. Decrease quantity back to 1
9. Verify all totals are recalculated correctly

**Expected Results:**

- ✓ Product quantity can be modified in cart
- ✓ Quantity changes are reflected immediately
- ✓ Product total price is recalculated accurately
- ✓ Cart grand total is updated correctly

**Automation File:** `tests/specs/tc13-cart-quantity.spec.ts`

---

### Suite 5: Checkout & Order Placement

#### Test Case 14: Place Order - Register While Checkout

**Objective:** Verify new user can register and place order during checkout

**Steps:**

1. Navigate to home page
2. Add multiple products to cart (minimum 1-2 products)
3. Go to cart page
4. Verify cart displays products correctly
5. Click "Proceed to Checkout" button
6. Verify checkout page loads
7. If not logged in, verify option to "Register and Checkout"
8. Click "Register" option
9. Fill in registration details (Name, Email)
10. Complete registration
11. Verify account information page appears
12. Fill in:
    - Title
    - Name
    - Email
    - Password
    - Date of birth
    - Checkboxes for offers
    - Address details
13. Complete registration
14. Verify you are directed to checkout with address pre-filled
15. Verify delivery address is shown
16. Verify order summary with all products
17. Select payment method
18. Enter payment details (test credit card)
19. Click "Place Order" button
20. Verify order confirmation page is displayed
21. Verify order number and confirmation details

**Expected Results:**

- ✓ Registration is successful during checkout
- ✓ Address is pre-filled from registration
- ✓ Order summary is accurate
- ✓ Order is successfully placed
- ✓ Confirmation page displays order details
- ✓ Order number is generated

**Automation File:** `tests/specs/tc14-checkout-register.spec.ts`

---

#### Test Case 15: Place Order - Register Before Checkout

**Objective:** Verify registered user can proceed through checkout

**Steps:**

1. Register a new user account (use Test Case 1 or prior registration)
2. Login with registered credentials
3. Verify "Logged in as {username}" in navigation
4. Add products to cart
5. Go to cart page
6. Click "Proceed to Checkout" button
7. Verify checkout page loads
8. Verify delivery address is pre-filled from registration data:
   - Name
   - Email
   - Address
   - City
   - State
   - Zipcode
9. Verify all address fields match registration data
10. Modify address if needed (optional)
11. Verify order summary with products
12. Select payment method
13. Enter payment details
14. Click "Place Order" button
15. Verify order confirmation page is displayed

**Expected Results:**

- ✓ Pre-filled address is accurate
- ✓ Checkout process is smooth
- ✓ Order is successfully placed
- ✓ Confirmation page displays order details

**Automation File:** `tests/specs/tc15-checkout-preregistered.spec.ts`

---

#### Test Case 16: Place Order - Login Before Checkout

**Objective:** Verify existing user can login at checkout

**Steps:**

1. Navigate to home page (as guest, not logged in)
2. Add products to cart
3. Go to cart page
4. Click "Proceed to Checkout" button
5. Verify checkout page loads with login option
6. Click "Login" to proceed as existing customer
7. Enter email and password of registered account
8. Click "Login" button
9. Verify checkout continues with user logged in
10. Verify delivery address is pre-filled
11. Verify order summary
12. Select payment method
13. Enter payment details
14. Click "Place Order" button
15. Verify order confirmation page

**Expected Results:**

- ✓ Login is successful during checkout
- ✓ Address is pre-filled for logged-in user
- ✓ Checkout continues smoothly
- ✓ Order is successfully placed

**Automation File:** `tests/specs/tc16-checkout-login.spec.ts`

---

#### Test Case 24: Download Invoice After Purchase Order

**Objective:** Verify invoice can be downloaded after order completion

**Steps:**

1. Complete any order (use Test Case 14, 15, or 16)
2. Verify order confirmation page is displayed
3. Locate "Download Invoice" button on confirmation page
4. Click "Download Invoice" button
5. Verify file download starts
6. Verify invoice PDF is created
7. Open downloaded invoice
8. Verify invoice contains:
   - Order number
   - Order date
   - Customer details
   - Delivery address
   - Product list with quantities
   - Individual product prices
   - Subtotal
   - Shipping cost (if applicable)
   - Tax (if applicable)
   - Grand total
   - Payment method
9. Verify invoice is readable and properly formatted
10. Verify invoice can be printed

**Expected Results:**

- ✓ Invoice download button is available after order
- ✓ Invoice PDF is downloaded successfully
- ✓ Invoice contains all required information
- ✓ Invoice is properly formatted and readable

**Automation File:** `tests/specs/tc24-download-invoice.spec.ts`

---

### Suite 6: Product Features & Filtering

#### Test Case 17: Remove Products From Cart

**Objective:** Verify products can be removed from cart

**Steps:**

1. Add multiple products to cart (3-4 products)
2. Go to cart page
3. Verify all products are displayed in cart
4. Verify cart subtotal is calculated
5. Select a product to remove
6. Click "Remove" button for that product
7. Verify product is removed from cart immediately
8. Verify cart subtotal is recalculated without removed product
9. Verify cart total is updated
10. Repeat removal for another product to verify functionality
11. Remove all products from cart
12. Verify "Your cart is empty" message is displayed

**Expected Results:**

- ✓ Products can be removed from cart
- ✓ Cart updates immediately after removal
- ✓ Cart totals are recalculated accurately
- ✓ Empty cart state is handled gracefully

**Automation File:** `tests/specs/tc17-remove-from-cart.spec.ts`

---

#### Test Case 18: View Category Products

**Objective:** Verify product filtering by category

**Steps:**

1. Navigate to https://automationexercise.com/
2. Locate "Category" section in left sidebar
3. Verify categories are listed:
   - Women
   - Men
   - Kids
4. Click on "Women" category
5. Verify products page updates to show only Women's products
6. Verify page title/heading indicates Women's category
7. Verify all displayed products belong to Women's category
8. Click on "Men" category
9. Verify products update to show only Men's products
10. Click on "Kids" category
11. Verify products update to show only Kids' products
12. Verify subcategories work (if available)

**Expected Results:**

- ✓ Category filter is visible and clickable
- ✓ Products are correctly filtered by category
- ✓ All displayed products match selected category
- ✓ Category changes update product listing immediately

**Automation File:** `tests/specs/tc18-view-categories.spec.ts`

---

#### Test Case 19: View & Cart Brand Products

**Objective:** Verify product filtering by brand and cart functionality

**Steps:**

1. Navigate to https://automationexercise.com/products
2. Locate "Brands" section in left sidebar
3. Verify brands are listed with product counts:
   - Polo (6)
   - H&M (5)
   - Madame (5)
   - Mast & Harbour (3)
   - Babyhug (4)
   - Allen Solly Junior (3)
   - Kookie Kids (3)
   - Biba (5)
4. Click on "Polo" brand
5. Verify products page updates to show only Polo brand products
6. Verify number of products displayed matches count (6)
7. Click on another brand (e.g., "H&M")
8. Verify products update to H&M brand (5 products)
9. Select a product and click "Add to cart"
10. Verify product is added to cart
11. Go to cart page
12. Verify product from brand page is in cart

**Expected Results:**

- ✓ Brand filter is visible with accurate product counts
- ✓ Products are correctly filtered by brand
- ✓ Product count matches displayed count
- ✓ Products can be added to cart from brand page
- ✓ Cart reflects added products correctly

**Automation File:** `tests/specs/tc19-view-brands.spec.ts`

---

#### Test Case 20: Search Products and Verify Cart After Login

**Objective:** Verify cart persists across login

**Steps:**

1. Navigate to https://automationexercise.com/products
2. Search for a product (e.g., "Top")
3. Verify search results are displayed
4. Add searched product to cart
5. (Optional) Add another product to cart
6. Go to cart page
7. Verify cart contains searched product(s)
8. Note cart total
9. Click "Proceed to Checkout"
10. Login with valid credentials (or register)
11. Verify cart still contains the same products
12. Verify cart total is unchanged
13. Verify product count matches what was added

**Expected Results:**

- ✓ Search results are accurate and relevant
- ✓ Products can be added to cart from search
- ✓ Cart persists after user login
- ✓ No products are lost during login
- ✓ Cart totals remain accurate

**Automation File:** `tests/specs/tc20-search-and-login.spec.ts`

---

#### Test Case 21: Add Review on Product

**Objective:** Verify product review functionality

**Steps:**

1. Navigate to products page or home page
2. Click "View Product" on any product
3. Verify product details page loads
4. Scroll down to reviews section
5. Locate review form with fields:
   - Name (textbox)
   - Email (email input)
   - Rating (star rating or radio buttons)
   - Review (textarea)
6. Fill in review details:
   - Name: "Test Reviewer"
   - Email: "reviewer@example.com"
   - Rating: Select 5 stars (or highest rating)
   - Review: "Excellent product, highly recommended!"
7. Click "Submit Review" button
8. Verify review is submitted successfully
9. Verify success message is displayed
10. Scroll to see if review appears in reviews list

**Expected Results:**

- ✓ Product review section is visible
- ✓ Review form accepts all input
- ✓ Review is submitted successfully
- ✓ Confirmation message is shown
- ✓ Submitted review appears on product page (after refresh if needed)

**Automation File:** `tests/specs/tc21-add-review.spec.ts`

---

#### Test Case 22: Add to Cart from Recommended Items

**Objective:** Verify recommended items section and cart functionality

**Steps:**

1. Navigate to https://automationexercise.com/
2. Scroll to "Recommended Items" section
3. Verify recommended items are displayed in carousel
4. Verify each item shows:
   - Product image
   - Product price
   - "Add to cart" button
5. Click "Add to cart" on a recommended item
6. Verify product is added to cart
7. Navigate to cart page
8. Verify recommended item is in cart
9. Verify item details are correct (name, price)

**Expected Results:**

- ✓ Recommended items section is visible
- ✓ Recommended items are displayed correctly
- ✓ Add to cart works from recommended section
- ✓ Items appear in cart with correct details

**Automation File:** `tests/specs/tc22-recommended-items.spec.ts`

---

### Suite 7: Address & UI Features

#### Test Case 23: Verify Address Details in Checkout Page

**Objective:** Verify address pre-filling during checkout

**Steps:**

1. Register user with complete address (use Test Case 1)
2. Login with registered account
3. Add products to cart
4. Go to cart page
5. Click "Proceed to Checkout"
6. Verify checkout page loads
7. Verify "BILLING ADDRESS" section displays:
   - First name (should show registration first name)
   - Last name (should show registration last name)
   - Email (should show registration email)
   - Address (should show registration address)
   - Country (should show registration country)
   - State (should show registration state)
   - City (should show registration city)
   - Zipcode (should show registration zipcode)
   - Mobile Number (should show registration mobile)
8. Verify all fields match registration data exactly
9. Verify fields can be edited if needed
10. Verify "SHIPPING ADDRESS" section (if different from billing)

**Expected Results:**

- ✓ Address fields are pre-filled with registration data
- ✓ All address details are accurate
- ✓ Address can be modified by user
- ✓ Shipping address matches or differs from billing as applicable

**Automation File:** `tests/specs/tc23-checkout-address.spec.ts`

---

#### Test Case 25: Verify Scroll Up Using Arrow Button

**Objective:** Verify scroll-up button functionality

**Steps:**

1. Navigate to https://automationexercise.com/
2. Scroll down to bottom of page
3. Verify scroll-up arrow button appears at bottom right
4. Note current scroll position (at bottom)
5. Click on scroll-up arrow button
6. Verify page scrolls to top smoothly
7. Verify navigation bar/logo is visible at top
8. Scroll down again
9. Verify arrow button appears again
10. Click arrow button again to verify consistent functionality

**Expected Results:**

- ✓ Scroll-up arrow button appears at bottom of page
- ✓ Clicking button scrolls page to top
- ✓ Scroll animation is smooth
- ✓ Top navigation becomes visible
- ✓ Button works consistently

**Automation File:** `tests/specs/tc25-scroll-arrow.spec.ts`

---

#### Test Case 26: Verify Scroll Up Without Arrow Button

**Objective:** Verify manual scroll functionality and sticky navigation

**Steps:**

1. Navigate to https://automationexercise.com/
2. Verify navigation bar is visible at top
3. Scroll down to bottom of page using mouse wheel or keyboard
4. Verify navigation bar remains visible/accessible
5. Verify header elements are still accessible
6. Scroll back up manually using mouse wheel
7. Verify page scrolls to top smoothly
8. Verify navigation bar is fully visible
9. Verify all navigation links are accessible
10. Verify logo is visible

**Expected Results:**

- ✓ Page scrolls smoothly without arrow button
- ✓ Navigation remains accessible during scroll
- ✓ Top navigation is sticky or becomes visible
- ✓ Smooth scroll animation works
- ✓ All navigation elements are functional

**Automation File:** `tests/specs/tc26-scroll-manual.spec.ts`

---

## Test Data Requirements

### User Registration Data
