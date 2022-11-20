const Migrations = artifacts.require("Migrations");
const GBContract = artifacts.require("GBContract");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(GBContract);
};