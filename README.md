# React WhatsApp

A project to experiment with..
- Firebase Firestore data synchronisation
- Firebase RTDB user presence
- NoSQL data modelling
- Tailwind JIT compiler

## Technologies

- React
- Firebase authentication, database, hosting
- Tailwind
- Context state management

## Live Demo

- https://react-whats-app.web.app/

- To sign in, please use the credentials pre-populated in the sign in form

## Screenshots

- (link)

## Todo

- Refactoring
  - markup and style - extract components
  - abstract database queries into service layer
- Cloud functions
  - trigger denormalised/duplication data updates
  - trigger chat msg status updates (sent, delivered, read)
- Performance
  - Sliding window data fetching for chat msgs
- UI
  - Transitions and loading animations
- Testing