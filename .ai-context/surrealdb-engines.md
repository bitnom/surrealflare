---
sidebar_position: 1
sidebar_label: Overview
title: JavaScript | SDK | Engines | Overview
description: The SurrealDB SDK for JavaScript can run in memory using the Node.js engine or in a browser using the WebAssembly engine.
---

# Engines 

The SurrealDB JavaScript SDK supports two engines for running in embedded mode. 

- [Node.js](/docs/sdk/javascript/engines/node) : Run SurrealDB as an embedded database within a server-side environment, backed by either an in-memory engine or SurrealKV.

- [WebAssembly](/docs/sdk/javascript/engines/wasm) : Run SurrealDB as an embedded database within a browser environment it enables SurrealDB to be run in-memory, or to persist data by running on top of IndexedDB. 

Learn more about the [Node.js engine](/docs/sdk/javascript/engines/node) and the [WebAssembly engine](/docs/sdk/javascript/engines/wasm) in the following sections.

---

---
sidebar_position: 1
sidebar_label: Node.js
title: JavaScript | SDK | Engines | Node
description: The SurrealDB SDK for JavaScript using the Node.js engine.
---

# Node.js

This library is a plugin for the SurrealDB JavaScript SDK, which can be used to run SurrealDB as an embedded database within a Node.js server-side environment.

It enables SurrealDB to be run in-memory, or to persist data by running on top of SurrealKV. It allows for a consistent JavaScript and TypeScript API when using the surrealdb.js library by adding support for embedded storage engines (`memory`, `surrealkv`) alongside the remote connection protocols (`http`, `https`, `ws`, `wss`).

The WebAssembly engine is available on NPM as [`@surrealdb/node`](https://npmjs.com/package/@surrealdb/node) and is required to be used as a plugin within the [JavaScript SDK](https://npmjs.com/package/surrealdb).

> [!IMPORTANT]
> This library works with ES modules (`import`), not CommonJS (`require`).

## Installation

Before installing the Node.js engine, you need to install the JavaScript SDK using the instructions in the [installation](/docs/sdk/javascript/installation) documentation. 

After installing the SDK, install the Node.js engine using the following command:

import Tabs from "@components/Tabs/Tabs.astro";
import TabItem from "@components/Tabs/TabItem.astro";

<Tabs groupId="installation">
  <TabItem value="npm" label="npm" default>
    ```bash
    npm install --save @surrealdb/node
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    yarn add @surrealdb/node
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```bash
    pnpm install @surrealdb/node
    ```
  </TabItem>
</Tabs>

## Configuration

To use the Node.js engine, you need to import the `surrealdbNodeEngines` function from the `@surrealdb/node` package, and pass it as an option to the `Surreal` constructor.

```js
import { Surreal } from 'surrealdb';
import { surrealdbNodeEngines } from '@surrealdb/node';
```

After importing the `surrealdbNodeEngines` function, you can pass it as an option to the `Surreal` constructor. 

```js
const db = new Surreal({
    engines: surrealdbNodeEngines(),
});
```

## Connecting 

Using the [`.connect()`](/docs/sdk/javascript/methods/connect) method, you can connect to a SurrealDB instance. The connection string specifies whether to connect to the Wasm engine, in memory or persisted with the `mem://` or `surrealkv://` prefixes respectively.

## Example

```js
import { Surreal } from 'surrealdb';
import { surrealdbNodeEngines } from '@surrealdb/node';

// Enable the WebAssembly engines
const db = new Surreal({
    engines: surrealdbNodeEngines(),
});

// Now we can start SurrealDB as an in-memory database
await db.connect("mem://");
// Or we can start a persisted SurrealKV database
await db.connect("surrealkv://demo");

// Now use the JavaScript SDK as normal.

// Close the database connection
await db.close();
```

> [!NOTE]
> You must close the connection to the database with the `.close()` method to prevent console warnings.

## Next steps

After setting up the Wasm engine, you can continue with the rest of the [SDK documentation](/docs/sdk/javascript/core). You can refer to the [methods](/docs/sdk/javascript/methods) documentation for more information on using SurrealDB with the Wasm engine also see the [data types](/docs/sdk/javascript/data-types) documentation for more information on how to use the data types supported by SurrealDB.

## Sources

- [`@surrealdb/node` on NPM](https://npmjs.com/package/@surrealdb/node)
- [GitHub repository](https://github.com/surrealdb/surrealdb.node)

---

---
sidebar_position: 2
sidebar_label: WebAssembly
title: JavaScript | SDK | Engines | WebAssembly
description: The SurrealDB SDK for JavaScript using the WebAssembly engine.
---

# WebAssembly (Wasm)

This library is a plugin for the SurrealDB JavaScript SDK, which can be used to run SurrealDB as an embedded database within a frontend or client-side web browser environment.

It enables SurrealDB to be run in-memory, or to persist data by running on top of IndexedDB. It allows for a consistent JavaScript and TypeScript API when using the surrealdb.js library by adding support for embedded storage engines (`memory`, `indxdb`) alongside the remote connection protocols (`http`, `https`, `ws`, `wss`).

The WebAssembly engine is available on NPM as [`@surrealdb/wasm`](https://npmjs.com/package/@surrealdb/wasm) and is required to be used as a plugin within the [JavaScript SDK](https://npmjs.com/package/surrealdb).

> [!IMPORTANT]
> This library works with ES modules (`import`), not CommonJS (`require`).

## Installation

Before installing the WebAssembly engine, you need to install the JavaScript SDK using the instructions in the [installation](/docs/sdk/javascript/installation) documentation. 

After installing the SDK, install the Wasm engine using the following command:

import Tabs from "@components/Tabs/Tabs.astro";
import TabItem from "@components/Tabs/TabItem.astro";

<Tabs groupId="installation">
  <TabItem value="npm" label="npm" default>
    ```bash
    npm install --save @surrealdb/wasm
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    yarn add @surrealdb/wasm
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```bash
    pnpm install @surrealdb/wasm
    ```
  </TabItem>
</Tabs>

## Configuration

To use the Wasm engine, you need to import the `surrealdbWasmEngines` function from the `@surrealdb/wasm` package, and pass it as an option to the `Surreal` constructor.

```js
import { Surreal } from 'surrealdb';
import { surrealdbWasmEngines } from '@surrealdb/wasm';
```

After importing the `surrealdbWasmEngines` function, you can pass it as an option to the `Surreal` constructor. 

```js
const db = new Surreal({
    engines: surrealdbWasmEngines(),
});
```

If you are using a bundler like Vite, Webpack, or Parcel, you can import the `surrealdbWasmEngines` function directly. For example, using Vite, place the following in your `vite.config.js` file:

```js title="vite.config.js"
optimizeDeps: {
    exclude: ["@surrealdb/wasm"],
    esbuildOptions: {
        target: "esnext",
    },
},
esbuild: {
    supported: {
        "top-level-await": true
    },
}
```

## Connecting 

Using the [`.connect()`](/docs/sdk/javascript/methods/connect) method, you can connect to a SurrealDB instance. The connection string specifies whether to connect to the Wasm engine, in memory or persisted with the `mem://` or `indxdb://` prefixes respectively.

## Example

```js title="index.js"
import { Surreal } from 'surrealdb';
import { surrealdbWasmEngines } from '@surrealdb/wasm';

// Enable the WebAssembly engines
const db = new Surreal({
    engines: surrealdbWasmEngines(),
});

// Now we can start SurrealDB as an in-memory database

await db.connect("mem://");

// Or we can start a persisted IndexedDB database

await db.connect("indxdb://demo");

// Now use the JavaScript SDK as normal.
```

## Next steps

After setting up the Wasm engine, you can continue with the rest of the [SDK documentation](/docs/sdk/javascript/core). You can refer to the [methods](/docs/sdk/javascript/methods) documentation for more information on using SurrealDB with the Wasm engine also see the [data types](/docs/sdk/javascript/data-types) documentation for more information on how to use the data types supported by SurrealDB.

## Sources

- [`@surrealdb/wasm` on NPM](https://npmjs.com/package/@surrealdb/wasm)
- [GitHub repository](https://github.com/surrealdb/surrealdb.wasm)
