pragma solidity ^0.4.11;

contract NoWorthCoin {
    
    address public _owner;
    
    uint8 public _totalSupply = 250;
    uint8 public _currentAvailable = 250;  
    
    mapping(address => uint8) public _wallet;
    
    constructor() public{
        _owner = msg.sender;
        _wallet[_owner] = 10;
        _currentAvailable = _currentAvailable - 10;
    }
    
    //Send 0.0001 Ether
    function mintToken() public payable{
        
        require(_currentAvailable >=10 );
        require(msg.value == 100000000000000 );
        _wallet[msg.sender] += 10;
        _currentAvailable -= 10;
        
            
    }
    
    function sendToken(address _to, uint8 _tokenCount) public returns(bool){
        
        require(_wallet[msg.sender] >= _tokenCount);
        require(_tokenCount > 0);
        
        _wallet[_to] += _tokenCount; 
        _wallet[msg.sender] -= _tokenCount;
        
        return true;
    }
    
    
    
    
}