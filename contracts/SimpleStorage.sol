// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public storedData;

    // Конструктор, инициализирует storedData значением по умолчанию 0
    constructor() {
        storedData = 0;
    }

    // Функция для установки значения storedData
    function set(uint256 x) public {
        storedData = x;
    }

    // Функция для получения значения storedData
    function get() public view returns (uint256) {
        return storedData;
    }
}