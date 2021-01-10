pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "./BuyMonster.sol";

contract Battle is BuyMonster {
    uint randNonce = 0;
    uint attackVictoryProbability = 70;
    uint attackVictoryProbability2 = 40;
    event BattleResult(Monster winner, Monster loser);

    function randMod(uint _modulus) internal returns(uint) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
    }

    function _Battle(uint myMonsterId, uint rivalId, uint myPower, uint rivalGaurd) public {
        uint rand = randMod(100);
        if(myPower >= rivalGaurd && attackVictoryProbability >= rand){
            monsters[myMonsterId].winCount++;
            monsters[myMonsterId].level += 5;
            emit BattleResult(monsters[myMonsterId], monsters[rivalId]);
        }else if(myPower >= rivalGaurd && attackVictoryProbability <= rand){
            emit BattleResult(monsters[rivalId], monsters[myMonsterId]);
        }else if(myPower <= rivalGaurd && attackVictoryProbability2 >= rand){
            monsters[myMonsterId].winCount++;
            monsters[myMonsterId].level += 5;
            emit BattleResult(monsters[myMonsterId], monsters[rivalId]);
        }else{
            emit BattleResult(monsters[rivalId], monsters[myMonsterId]);
        }
    }
}