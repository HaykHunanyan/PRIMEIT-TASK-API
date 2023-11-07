'use strict';

const password = '$2a$10$fvWcP5DGirhwiYF8B0Wiw.W2llOgJmOEoqq7mUK8MKv/Ifupqkj5e';
const usersData = [
  {
    firstName: 'Admin',
    lastName: 'Admin',
    isVerified: 'True',
    role: 'admin',
    email: 'admin@gmail.com',
  },
].map((data) => ({
  ...data,
  password,
  createdAt: new Date(),
  updatedAt: new Date(),
  verifyExpires: new Date(),
}));
module.exports = {
  up: async (queryInterface) => {
    try {
      await queryInterface.bulkInsert('users', usersData, {
        returning: true,
      });
    } catch (err) {
      console.log(err);
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
