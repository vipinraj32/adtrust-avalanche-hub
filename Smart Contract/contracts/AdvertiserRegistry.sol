// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AdvertiserRegistry {
    struct Advertiser {
        address wallet;
        uint256 stakedAmount;
        bool registered;
    }

    mapping(address => Advertiser) public advertisers;
    uint256 public constant MIN_STAKE = 250 ether;

    event AdvertiserRegistered(address indexed advertiser, uint256 amount);

    function register() external payable {
        require(msg.value >= MIN_STAKE, "Must stake at least 250 AVAX");
        require(!advertisers[msg.sender].registered, "Already registered");

        advertisers[msg.sender] = Advertiser({
            wallet: msg.sender,
            stakedAmount: msg.value,
            registered: true
        });

        emit AdvertiserRegistered(msg.sender, msg.value);
    }

    function getAdvertiser(address _wallet) external view returns (Advertiser memory) {
        return advertisers[_wallet];
    }

    // ADD THIS FUNCTION:
function minStake() public pure returns (uint256) {
    return MIN_STAKE;
}
}