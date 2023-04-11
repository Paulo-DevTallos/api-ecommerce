db.createUser({
  roles: [
    {
      role: 'readWrtie',
      db: 'ecommerce',
    },
  ],
});
