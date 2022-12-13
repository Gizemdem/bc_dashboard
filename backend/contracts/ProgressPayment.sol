// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract ProgressPayment {
    // string public disappoveReason;
    bytes32[] private ConstructionElements;
    bytes32[] private ElementsPaid;

    mapping(bytes32 => uint256) private MCObjectPrices;
    address payable public owner;
    address payable Contractor;

    // bool public requestRaised = false;
    constructor() public payable {
        owner = payable(msg.sender);
    }

    receive() external payable {}

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
        address contractor,
        string[] memory ids,
        uint256[] memory prices
    ) public restricted {
        Contractor = payable(contractor);
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

    function payElements(string[] memory ids) public payable {
        uint256 cost = 0;
        for (uint256 i = 0; i < ids.length; i++) {
            // check if its already paid
            if (!isPaid(ids[i])) {
                // Accumulate cost
                cost += checkPriceById(ids[i]);
                ElementsPaid.push(keccak256(abi.encodePacked(ids[i])));
            }
        }
        Contractor.transfer(cost);
    }

    function isPaid(string memory elementId) private view returns (bool) {
        bytes32 encoded = keccak256(abi.encodePacked(elementId));
        for (uint256 i = 0; i < ElementsPaid.length; i++) {
            if (encoded == ElementsPaid[i]) {
                return true;
            }
        }

        return false;
    }
}
