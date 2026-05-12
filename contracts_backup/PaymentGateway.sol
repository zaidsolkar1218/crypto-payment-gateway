// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PaymentGateway {

    // Merchant / contract deployer
    address public owner;

    // Constructor sets contract creator
    constructor() {
        owner = msg.sender;
    }

    // Payment structure
    struct Payment {
        address sender;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    // Store all payments
    Payment[] public payments;

    // Event emitted when payment is received
    event PaymentReceived(
        address indexed sender,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    // Main payment function
    function pay(string memory _message) public payable {

        // Ensure payment is greater than zero
        require(msg.value > 0, "Amount must be greater than 0");

        // Store payment details
        payments.push(
            Payment(
                msg.sender,
                msg.value,
                _message,
                block.timestamp
            )
        );

        // Emit blockchain event
        emit PaymentReceived(
            msg.sender,
            msg.value,
            _message,
            block.timestamp
        );
    }

    // View all payments
    function getPayments() public view returns (Payment[] memory) {
        return payments;
    }

    // Total payment count
    function getTotalPayments() public view returns (uint256) {
        return payments.length;
    }
}