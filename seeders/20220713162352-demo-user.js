'use strict';

var bcrypt = require("bcrypt")

const NUMBER_OF_ITEMS = 10

module.exports = {
  async up (queryInterface, Sequelize) {

    let users = []
    let certificates = []

    users.push(
      {
        name: "test",
        email: "test@mail.com",
        password: bcrypt.hashSync('qwerty', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );
  
    for (let i = 0; i < NUMBER_OF_ITEMS - 1; i++) {
      users.push(
        {
          name: `test_user${i}`,
          email: "test@mail.com",
          password: bcrypt.hashSync('qwerty', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    }
    
    await queryInterface.bulkInsert('Users', users);

    
    const usersArr = await queryInterface.sequelize.query(
      `SELECT id from Users Limit 5;`
    );

    for (let i = 0; i < 50; i++) {
      certificates.push(
        {
          country: `USA`,
          status: "available",
          //  owner: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    }
    
    usersArr[0].forEach(element => {
      console.log("element = ", element)

      for (let j = 0; j < 10; j++) {
        certificates.push(
          {
            country: `USA`,
            status: "owned",
            owner: element.id,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        );
      }
    });

    queryInterface.bulkInsert('CarbonCertificates', certificates);
    return
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', null, {});
    queryInterface.bulkDelete('CarbonCertificates', null, {});
    return
  }
};
