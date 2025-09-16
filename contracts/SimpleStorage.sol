// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleStorage is ERC20 {
    uint256 public storedData;

    constructor() ERC20("SimpleStorageToken", "SST") {
        storedData = 0;
        _mint(msg.sender, 1000000 * 10**18); // Выпускаем токены для создателя контракта
    }

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount); // Позволяет выпускать новые токены (только для деплоера контракта)
    }

    // Функция для перевода токенов с баланса контракта на указанный адрес
    function transferTo(address recipient, uint256 amount) public {
        // Используем внутреннюю функцию _transfer для перевода
        // Первый аргумент - адрес контракта (откуда переводим)
        // Второй аргумент - адрес получателя
        // Третий аргумент - количество токенов
        _transfer(address(this), recipient, amount);
    }
}