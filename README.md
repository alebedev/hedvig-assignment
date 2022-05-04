## Overview

This is a home assignment for Hedvig

Overall philosophy: simplest thing that would work

## Usage

```bash
# Installation
yarn install

# Open in browser
yarn start

# Tests
yarn test

# Build and verify
yarn build
```

### Architecture

App is based on create-react-app, written in Typescript, with Redux (via redux-toolkit)

## Design choices

### create-react-app

Optimal for small projects, no need to spend time for setup

### redux-toolkit

Most ergonomic way to use Redux today - immer for data, way less boilerplate than older conventions

### redux-thunk

Came with template. Not enough async parts to justify redux-saga

### @mui/core as UI toolkit

Most popular choice for React and familiar to me from past experience

## Tradeoffs and limitations

Time-saving compromises

- Only tested in Chrome
- Default eslint config
- No i18n
- No accessibility
- No error boundaries, programmer error in any component will crash the whole app
- Hardcoded sizes / margins
- Only integration tests.  No complex logic to justify unit tests, no e2e tests to save time
- No routing.  Could be useful in real life to link to specific peril via anchor

## Alternatives

What could've been used

- Remix / Next.js for complete SSR + client side solution
- recoil for state - less boilerplate and better performance than redux, but less mature right now
- CSS modules for styles - prevents name clashes in CSS