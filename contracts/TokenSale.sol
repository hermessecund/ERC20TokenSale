// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "./utils/Ownable.sol";
import "./extensions/ERC20Capped.sol";

contract TokenSale is ERC20Capped, Ownable {
    uint256 private _ethToTokenRate = 1000;

    constructor() ERC20("TokenSale", "TS") ERC20Capped(1000000e18) {}

    function withdrawToOwner() public onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    function mint() public payable {
        _mint(msg.sender, msg.value * _ethToTokenRate);
    }
}
