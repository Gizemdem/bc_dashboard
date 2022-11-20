// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract GBContract {
    // string public disappoveReason;
    bytes32[] private ConstructionElements;
    // bytes32[] public ElementsPaid;
    mapping( bytes32=>uint) private MCObjectPrices;
    address public owner;
    // bool public requestRaised = false;
    constructor(){
        owner=msg.sender;
    }
    modifier restricted(){
        if(msg.sender == owner) _;
    }

    struct ConstructionElement{
        string id;
        uint price;
    }
    function setConstructionElements(ConstructionElement[] memory props) public restricted {
        // disappoveReason="";
        for(uint i=0; i<props.length; i++){
            addObject(props[i]);
        }
    }    
    //function to add the BIM elements and their cost
    function addObject(ConstructionElement memory element) private {
        ConstructionElements.push(keccak256(abi.encodePacked(element.id)));
        MCObjectPrices[keccak256(abi.encodePacked(element.id))] = element.price;
    }
}