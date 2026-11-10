*English · [Deutsch](README.de.md)*

# 16 · Embed Web Components in React and Knockout

During a step-by-step migration, older and newer UIs live side by side for a while. A Web Component is the neutral boundary for this: it runs in a Knockout page just as well as in a React app. For that to work, it needs a clear contract: data in through properties, text through attributes, changes out through events.

## Task

1. Give `<cart-badge>` in `start/cart-badge.js` a property `items` with a getter and a setter. Arrays and objects belong in properties, not as JSON in attributes.
2. Observe the attribute `label` and show “Label: Anzahl” (label: count).
3. Make the button “Warenkorb leeren” (empty cart) report the event `cart-change` with `detail: { items: [] }`.
4. Make `connectStore(element, store)` connect the store to the element: set `items`, subscribe to changes, pass `cart-change` on to `store.setState`. When the element is removed (`disconnectedCallback`), everything is released again.

## How to embed the element

React 19 sets properties and registers custom events directly. The label “Warenkorb” means cart:

```jsx
<cart-badge label="Warenkorb" items={items} oncart-change={(event) => setItems(event.detail.items)} />
```

Knockout 3.5 only sets attributes with `attr`. For the property `items`, you need a small Custom Binding (here `cartItems`); the built-in binding `event` catches the event:

```html
<cart-badge label="Warenkorb" data-bind="cartItems: items, event: { 'cart-change': onCartChange }"></cart-badge>
```

More on this in the workshops on Knockout (strangler migration, shared store) and React.

## Check

```bash
npm run test:start -- exercises/16-components-integration
```
