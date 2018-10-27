pragma solidity ^0.4.11;

contract NoWorthCoin {
    
    address public _owner;
    
    uint8 public _totalSupply = 250;
    uint8 public _currentAvailable = 250;  
    
    mapping(address => uint8) public _wallet;
    
    function NoWorthCoin() public {
        _owner = msg.sender;
        _wallet[_owner] = 10;
        _currentAvailable = _currentAvailable - 10;
    }
    
    //Send 0.0001 Ether
    function mintToken() public payable returns(uint8){
        
        require(_currentAvailable >=10 );
        require(msg.value == 100000000000000 );
        _wallet[msg.sender] += 10;
        _currentAvailable -= 10;
        
        return _wallet[msg.sender];    
    }
    
    function sendToken(address _to, uint8 _tokenCount) public returns(uint8){
        
        require(_wallet[msg.sender] >= _tokenCount);
        require(_tokenCount > 0);
        
        _wallet[_to] += _tokenCount; 
        _wallet[msg.sender] -= _tokenCount;
        
        return _wallet[msg.sender];
    }
    
    
    
    
}