// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract ProgressPayment {
    // string public disappoveReason;
    bytes32[] private ConstructionElements;
    // bytes32[] public ElementsPaid;
    mapping(bytes32 => uint256) private MCObjectPrices;
    address public owner;

    // bool public requestRaised = false;
    constructor() {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }
    // Represents a BIM Element
    struct ConstructionElement {
        string id;
        uint256 price;
    }

    /// Receives a list of ConstructionElement and saves it into the memory of the Smart Contract.
    ///
    /// Function is restricted to owner of the contract
    function setConstructionElements(
        string[] memory ids,
        uint256[] memory prices
    ) public restricted {
        for (uint256 i = 0; i < ids.length; i++) {
            ConstructionElement memory element = ConstructionElement(
                ids[i],
                prices[i]
            );
            addObject(element);
        }
    }

    //function to add the BIM elements and their cost
    function addObject(ConstructionElement memory element) private {
        ConstructionElements.push(keccak256(abi.encodePacked(element.id)));
        MCObjectPrices[keccak256(abi.encodePacked(element.id))] = element.price;
    }

    function checkPriceById(string memory id) public view returns (uint256) {
        bytes32 encoded = keccak256(abi.encodePacked(id));
        uint256 price = MCObjectPrices[encoded];
        return price;
    }
}
