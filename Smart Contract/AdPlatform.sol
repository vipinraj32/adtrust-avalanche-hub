// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AdPlatform {
    struct Advertisement {
        uint256 id;
        string companyName;
        string advertiserName;
        string email;
        string requirement;
        uint256 price;
        address advertiserWallet;
        uint256 timestamp;
    }

    uint256 private adCounter;
    mapping(uint256 => Advertisement) public ads;
    Advertisement[] private allAds;

    event AdCreated(
        uint256 id,
        string companyName,
        string advertiserName,
        string email,
        string requirement,
        uint256 price,
        address advertiserWallet,
        uint256 timestamp
    );

    // Advertiser creates ad
    function createAd(
        string memory _companyName,
        string memory _advertiserName,
        string memory _email,
        string memory _requirement,
        uint256 _price
    ) public {
        adCounter++;
        Advertisement memory newAd = Advertisement({
            id: adCounter,
            companyName: _companyName,
            advertiserName: _advertiserName,
            email: _email,
            requirement: _requirement,
            price: _price,
            advertiserWallet: msg.sender,
            timestamp: block.timestamp
        });

        ads[adCounter] = newAd;
        allAds.push(newAd);

        emit AdCreated(
            adCounter,
            _companyName,
            _advertiserName,
            _email,
            _requirement,
            _price,
            msg.sender,
            block.timestamp
        );
    }

    // Get ad by ID
    function getAd(uint256 _id) public view returns (Advertisement memory) {
        return ads[_id];
    }

    // Get all ads
    function getAllAds() public view returns (Advertisement[] memory) {
        return allAds;
    }
   
}
