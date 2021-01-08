const { assert } = require('chai')

const CreateMonster = artifacts.require("CreateMonster")

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Create Monster', async() => {

    let monster

    before(async () => {
        monster = await CreateMonster.deployed()
    })
    
      describe('deployment', async () => {
        it('deploys successfully', async () => {
          const address = await monster.address
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
            assert.equal(monsterCount, 1)
            const event = result.logs[0].args
            assert.equal(event.monsterName, 'monster1')
            assert.equal(event.level.toNumber(),1)
        })

        it('lists monsters', async() => {
            const _monster = await monster.monsters(monsterCount)
        })

        it('level up', async() => {
            resultLevelUp = await monster.LevelUp(monsterCount)
            const event = resultLevelUp.logs[0].args
            console.log(event.level.toNumber())
        })
    })
})
