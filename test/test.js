const { assert } = require('chai')
const BuyMonster = artifacts.require("BuyMonster")
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Create Monster', async() => {
    let address;
    let monster;

    before(async () => {
        monster = await BuyMonster.deployed()
    })
    
      describe('deployment', async () => {
        it('deploys successfully', async () => {
          address = await monster.address
          console.log(address)
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        })
      })

    describe('monsters', async() => {
        let result, monsterCount;

        before(async() => {
            result = await monster._CreateMonster('monster1')
            monsterCount = await monster.monsterCount()
        })

        it('create a monster', async() => {
            assert.equal(monsterCount.toNumber(), 4)
            const event = result.logs[0].args
            assert.equal(event.monsterName, 'monster1')
            assert.equal(event.level.toNumber(),1)
        })

        it('lists monsters', async() => {
            const _monster = await monster.monsters(monsterCount)
        })

        it('my monster', async() => {
            result = await monster.MyMonster(address)
            console.log(result)
        })
    })
})
