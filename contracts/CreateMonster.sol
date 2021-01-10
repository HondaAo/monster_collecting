pragma solidity >=0.4.21 <0.7.0;

contract CreateMonster {
    event newMonster(uint32 monsterId, string monsterName, uint level);
    event monsterLevelUp(uint level);
    uint32 public monsterCount;
    uint levelUpCost = 0.005 ether;
    mapping(uint => Monster) public monsters;
    struct Monster{
        uint monsterId;
        string monsterName;
        uint number;
        uint level;
        bool isOwned;
        uint winCount;
    }
    mapping (uint => address) public monsterToOwner;
    mapping (address => uint) ownerMonsterCount;

    function _getNumber(string memory _monsterName) public view returns (uint) {
        return uint(keccak256(abi.encodePacked(_monsterName)));
    }

    function MyMonster(address _owner) external view returns (uint[] memory){
        uint[] memory result = new uint[](monsterCount);
        uint counter = 0;
        for(uint i=1; i < monsterCount + 1; i++){
            if(monsterToOwner[i] == _owner){
                result[i] = counter;
                counter++;
            }
        }
        return result;
    }

    function _CreateMonster(string memory _monsterName) public {
        require(ownerMonsterCount[msg.sender] < 4,"You can not create any more.");
        monsterCount++;
        uint _number = _getNumber(_monsterName);
        monsters[monsterCount] = Monster(monsterCount, _monsterName, _number, 1, true, 0);
        monsterToOwner[monsterCount] = msg.sender;
        ownerMonsterCount[msg.sender]++;
        emit newMonster(monsterCount, _monsterName, 1);
    }

    function LevelUp(uint _id) external payable{
        monsters[_id].level++;
        emit monsterLevelUp(monsters[_id].level);
    }
}