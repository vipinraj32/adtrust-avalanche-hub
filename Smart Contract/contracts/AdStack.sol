// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AdStake {
    struct Campaign {
        address advertiser;
        address influencer;
        uint256 amount;
        uint256 deadline;
        bool paid;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    event CampaignCreated(uint256 campaignId, address advertiser, uint256 amount, uint256 deadline);
    event PaymentReleased(uint256 campaignId, address influencer, uint256 amount);

    function createCampaign(address _influencer, uint256 _deadline) external payable {
        require(msg.value > 0, "Stake required");

        campaignCount++;
        campaigns[campaignCount] = Campaign({
            advertiser: msg.sender,
            influencer: _influencer,
            amount: msg.value,
            deadline: _deadline,
            paid: false
        });

        emit CampaignCreated(campaignCount, msg.sender, msg.value, _deadline);
    }

    function releasePayment(uint256 _campaignId) external {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign still active");
        require(!campaign.paid, "Already paid");

        campaign.paid = true;
        payable(campaign.influencer).transfer(campaign.amount);

        emit PaymentReleased(_campaignId, campaign.influencer, campaign.amount);
    }

    function refund(uint256 _campaignId) external {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign still active");
        require(!campaign.paid, "Already paid");
        require(msg.sender == campaign.advertiser, "Not advertiser");

        campaign.paid = true;
        payable(campaign.advertiser).transfer(campaign.amount);
    }
}
