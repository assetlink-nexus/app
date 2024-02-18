// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./IVault.sol";

contract Vault is OwnableUpgradeable, IVault {
    ERC20Upgradeable private token;

    uint public totalSupply;
    uint public totalDebt;
    mapping(address => uint) public _balanceOf;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    function initialize(address _coinAddress) public initializer {
        __Ownable_init();
        token = ERC20Upgradeable(_coinAddress);
     }
 
    // constructor(address _token) {
    //     token = ERC20Upgradeable(_token);
    // }

    //?? will it work?
    function balanceOf(uint _shares) external view returns (uint){
        uint amount = (_shares * token.balanceOf(address(this))) / totalSupply;

        return amount;
    }


    function _mint(address _to, uint _shares) private {
        totalSupply += _shares;
        _balanceOf[_to] += _shares;
    }

    function _burn(address _from, uint _shares) private {
        totalSupply -= _shares;
        _balanceOf[_from] -= _shares;
    }

    function deposit(uint _amount) external returns(uint) {
        /*
        a = amount
        B = balance of token before deposit
        T = total supply
        s = shares to mint

        (T + s) / T = (a + B) / B 

        s = aT / B
        */
        uint shares;
        if (totalSupply == 0) {
            shares = _amount;
        } else {
            shares = (_amount * totalSupply) / token.balanceOf(address(this));
        }

        _mint(msg.sender, shares);
        token.transferFrom(msg.sender, address(this), _amount);

        return shares;
    }

    function withdraw(uint _shares) external returns(bool) {
        /*
        a = amount
        B = balance of token before withdraw
        T = total supply
        s = shares to burn

        (T - s) / T = (B - a) / B 

        a = sB / T
        */
        uint amount = (_shares * token.balanceOf(address(this))) / totalSupply;
        _burn(msg.sender, _shares);
        token.transfer(msg.sender, amount);
        return true;
    }

    function borrow(uint _amount) external onlyOwner returns(bool) {
        //todo safecheck up to 60 %
        token.transfer(msg.sender, _amount);
    }

    function repay(uint _amount) external onlyOwner returns (bool){
        token.transferFrom(msg.sender, address(this), _amount);
    }
}