// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract GBContract {
    string public disappoveReason;
    bytes32[] public Objects;
    bytes32[] public ObjectPaid;
    mapping( bytes32=>unit) public MCObjectPrices;
    bool public requestRaised = false;

    constructor() public{
        disappoveReason="";
        addObject("0_hOL88mb9qRxG3TrLuNhs", 500*PerChange); 
        addObject("0_hOL88mb9qRxG3TrLuNgB", 500*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNhq",	500*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNhm",	500*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNrU",	600*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNrf",	600*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNrq",	600*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNhz",	150*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNh_",	150*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNh$",	150*PerChange);
        addObject("0_hOL88mb9qRxG3TrLuNqi",	100*PerChange);
    }    
    //function to add the BIM elements and their cost
    function addObject(bytes memory p_item, uint p_price) public {
        items.push(keccak256(p_item));
        MCObjectPrices[keccak256(p_item)] = p_priceMC;
    }
    //Request of payment
    function raiseRequest() public returns(bool){
        requestRaised= true;
        disappoveReason="";
        return true;
    }
    function getRequestRaised() public view returns (bool){
        return(requestRaised);
    }
    //gets the information of elements been constructed to in construction to calculate the progress payment
    function getItem() public view returns(bytes32[] memory){
       return (items); 
    }
    function getItemPrice(bytes32 _item) public view returns(uint) {
        for(uint j =0; j<itemsPaid.length; j++){
            if(itemsPaid[j] == _item){
                return(0);
            }
        }
        return (MCObjectPrices[_item]);
    }

    // enables the emplpoyer approval
    function approveRequest(
        uint256 p_amountMC;
        address payable p_AddressMC;
        bytes32[] memory p_itemsToApprove;
    )

    // payment from employer to contract
    public payable returns(bool){
        p_AddressMC.transfer(p_amountMC);

        for(uint256 j=0; j<p_itemsToApprove.length; j++){
            itemsPaid.push(p_itemsToApprove[j]);
        }
        requestRaised= false;
        return(true);
    }
}