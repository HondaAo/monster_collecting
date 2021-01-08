var CreateMonster = artifacts.require("./CreateMonster.sol");

module.exports = function(deployer) {
  deployer.deploy(CreateMonster);
};
