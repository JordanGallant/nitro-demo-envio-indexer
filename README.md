# Nitro Envio indexer

*Please refer to the [documentation website](https://docs.envio.dev) for a thorough guide on all [Envio](https://envio.dev) indexer features*

## Run

```bash
pnpm envio dev
```

## Pre-requisites

- [Node.js (use v18 or newer)](https://nodejs.org/en/download/current)
- [pnpm (use v8 or newer)](https://pnpm.io/installation)
- [Docker desktop](https://www.docker.com/products/docker-desktop/)

## Example queries

Visit http://localhost:8080 to see the GraphQL Playground, local password is `testing`.

### Swaps

```graphql
query MyQuery {
   NitroPair_Swap {
    amountIn
    amountOut
    id
    fees
    isXtoY
    recipient
    sender
  }
}
```

### Swaps for specific recipient

```graphql
query MyQuery {
  NitroPair_Swap(where: {recipient: {_eq: "0x71D6aCbAb3637B5Ea23C266aCBC3DD4341F93DD2"}}) {
    amountIn
    amountOut
    id
    fees
    isXtoY
    recipient
    sender
  }
}
```

### Global stats

```graphql
query MyQuery {
  GlobalStats(where: {id: {_eq: "global"}}) {
    id
    nitroAllocationOwner
    nitroDebtManagerOwner
    nitroFactoryOwner
    nitroPointOracle
    nitroPointOwner
  }
}
```
