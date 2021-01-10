pragma solidity >=0.4.21 <0.7.0;

import "./RegisterMonster.sol";

contract BuyMonster is RegisterMonster {
    address payable public owner;

    function _BuyMonster(uint _id, uint _amount) public payable{
        monsterToOwner[_id] = msg.sender;
        ownerMonsterCount[0x65FfED37Eb64B33C3ac09ff181405dfa3e96205e]--;
        ownerMonsterCount[msg.sender]++;
    }

    function SellMonster(uint _id, uint _amount) public payable{
        monsterToOwner[_id] = 0x0000000000000000000000000000000000000000;
        msg.sender.transfer(_amount);
        ownerMonsterCount[msg.sender]--;
    }
}