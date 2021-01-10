pragma solidity >=0.4.21 <0.7.0;

import "./CreateMonster.sol";

contract RegisterMonster is CreateMonster {
    function _RegisterMonster(string memory _monsterName) public {
          monsterCount++;
          uint _number = _getNumber(_monsterName);
          monsters[monsterCount] = Monster(monsterCount, _monsterName, _number, 1, false, 0);
          monsterToOwner[monsterCount] = 0x65FfED37Eb64B33C3ac09ff181405dfa3e96205e;
          ownerMonsterCount[0x65FfED37Eb64B33C3ac09ff181405dfa3e96205e]++;
          emit newMonster(monsterCount, _monsterName, 1);
    }

}