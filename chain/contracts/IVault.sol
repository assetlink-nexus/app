// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

interface IVault{

    //?? will it work?
    function balanceOf(uint _shares) external view returns (uint);

    function deposit(uint _amount) external returns (uint);

    function withdraw(uint _shares) external returns (bool);

    // function borrow(uint _amount) external returns (bool);

    // function repay(uint _amount) external returns (bool);
}