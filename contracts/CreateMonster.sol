pragma solidity >=0.4.21 <0.7.0;

contract CreateMonster {
    event newMonster(uint32 monsterId, string monsterName, uint level);
    event monsterLevelUp(uint level);
    uint cost = 0.01 ether;
    uint levelUpCost = 0.005 ether;
    uint32 public monsterCount;
    mapping(uint => Monster) public monsters;
    struct Monster{
        uint monsterId;
        string monsterName;
        uint number;
        uint level;
        bool isOwned;
    }
    mapping (uint => address) public monsterToOwner;
    mapping (address => uint) ownerMonsterCount;

    function _getNumber(string memory _monsterName) private view returns (uint) {
        return uint(keccak256(abi.encodePacked(_monsterName)));
    }

    function _CreateMonster(string memory _monsterName) public {
        require(ownerMonsterCount[msg.sender] < 4,"You can not create any more.");
        monsterCount++;
        uint _number = _getNumber(_monsterName);
        monsters[monsterCount] = Monster(monsterCount, _monsterName, _number, 1, true);
        monsterToOwner[monsterCount] = msg.sender;
        ownerMonsterCount[msg.sender]++;
        emit newMonster(monsterCount, _monsterName, 1);
    }

    function RegisterMonster(string memory _monsterName) private {
        monsterCount++;
        uint _number = _getNumber(_monsterName);
        monsters[monsterCount] = Monster(monsterCount, _monsterName, _number, 1, false);
        emit newMonster(monsterCount, _monsterName, 1);
    }

    function LevelUp(uint _id) public payable{
        monsters[_id].level++;
        emit monsterLevelUp(monsters[_id].level);
    }

    function BuyMonster(uint _id) public payable {
        require(msg.value == cost);
        monsterToOwner[_id] = msg.sender;
        ownerMonsterCount[msg.sender]++;
    }
}