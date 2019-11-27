"use strict";

// Делаем текущую ячейку глобальной
var current_cell = {
    row: -1,
    coll: -1
}

var answer = null;

var counter = 0;
var attempts = 5;

function get_random_int(minimum, maximum) {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function check_column(grid, column, number) {
    return [
        grid[0][column],
        grid[1][column],
        grid[2][column],
        grid[3][column],
        grid[4][column],
        grid[5][column],
        grid[6][column],
        grid[7][column],
        grid[8][column]
    ].indexOf(number) == -1
}

function check_grid(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function copy_arr(arr) {
    var copy_arr = new Array(arr.length);

    for (var i = 0; i < arr.length; i++) {
        copy_arr[i] = arr[i].slice();
    }

    return copy_arr;
}

function shuffle(arr) {
    var temp = 0;
    var j = 0;
    for(var i = 0; i < arr.length; i++) {
        j = Math.floor(Math.random() * i);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// Рандомим состояние поля
function generate_field(grid) {
    var number_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    var cur_row = 0;
    var cur_col = 0;

    for (var i = 0; i < 81 ; i++) {
        cur_row = Math.floor(i / 9);
        cur_col = i % 9;

        if (grid[cur_row][cur_col] == 0) {
            shuffle(number_list);

            number_list.forEach(function(number) {
                if (grid[cur_row].indexOf(number) == -1) {
                    if (check_column(grid, cur_col, number)) {
                        var square = [];
                        if (cur_row < 3) {
                            if (cur_col < 3) {
                                square = [
                                    grid[0].slice(0, 3),
                                    grid[1].slice(0, 3),
                                    grid[2].slice(0, 3)
                                ]
                            } else if (cur_col < 6) {
                                square = [
                                    grid[0].slice(3, 6),
                                    grid[1].slice(3, 6),
                                    grid[2].slice(3, 6)
                                ]
                            } else {
                                square = [
                                    grid[0].slice(6, 9),
                                    grid[1].slice(6, 9),
                                    grid[2].slice(6, 9)
                                ]
                            }
                        } else if (cur_row < 6) {
                            if (cur_col < 3) {
                                square = [
                                    grid[3].slice(0, 3),
                                    grid[4].slice(0, 3),
                                    grid[5].slice(0, 3)
                                ]
                            } else if (cur_col < 6) {
                                square = [
                                    grid[3].slice(3, 6),
                                    grid[4].slice(3, 6),
                                    grid[5].slice(3, 6)
                                ]
                            } else {
                                square = [
                                    grid[3].slice(6, 9),
                                    grid[4].slice(6, 9),
                                    grid[5].slice(6, 9)
                                ]
                            }
                        } else {
                            if (cur_col < 3) {
                                square = [
                                    grid[6].slice(0, 3),
                                    grid[7].slice(0, 3),
                                    grid[8].slice(0, 3)
                                ]
                            } else if (cur_col < 6) {
                                square = [
                                    grid[6].slice(3, 6),
                                    grid[7].slice(3, 6),
                                    grid[8].slice(3, 6)
                                ]
                            } else {
                                square = [
                                    grid[6].slice(6, 9),
                                    grid[7].slice(6, 9),
                                    grid[8].slice(6, 9)
                                ]
                            }
                        }

                        if (square[0].concat(square[1]).concat(square[2]).indexOf(number) == -1) {
                            grid[cur_row][cur_col] = number;

                            if (check_grid(grid)) {
                                return true;
                            } else {
                                if (generate_field(grid)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            });

            if (check_grid(grid)) {
                return true;
            }

            break;
        }
    }

    grid[cur_row][cur_col] = 0;
    return false;
}

function solve_grid(grid) {
    var cur_row = 0;
    var cur_col = 0;

    for (var i = 0; i < 81 ; i++) {
        cur_row = Math.floor(i / 9);
        cur_col = i % 9;

        if (grid[cur_row][cur_col] == 0) {
            for (var number = 1; number < 10; number++) {
                if (grid[cur_row].indexOf(number) == -1) {
                    if (check_column(grid, cur_col, number)) {
                        var square = [];
                        if (cur_row < 3) {
                            if (cur_col < 3) {
                                square = [
                                    grid[0].slice(0, 3),
                                    grid[1].slice(0, 3),
                                    grid[2].slice(0, 3)
                                ]
                            } else if (cur_col < 6) {
                                square = [
                                    grid[0].slice(3, 6),
                                    grid[1].slice(3, 6),
                                    grid[2].slice(3, 6)
                                ]
                            } else {
                                square = [
                                    grid[0].slice(6, 9),
                                    grid[1].slice(6, 9),
                                    grid[2].slice(6, 9)
                                ]
                            }
                        } else if (cur_row < 6) {
                            if (cur_col < 3) {
                                square = [
                                    grid[3].slice(0, 3),
                                    grid[4].slice(0, 3),
                                    grid[5].slice(0, 3)
                                ]
                            } else if (cur_col < 6) {
                                square = [
                                    grid[3].slice(3, 6),
                                    grid[4].slice(3, 6),
                                    grid[5].slice(3, 6)
                                ]
                            } else {
                                square = [
                                    grid[3].slice(6, 9),
                                    grid[4].slice(6, 9),
                                    grid[5].slice(6, 9)
                                ]
                            }
                        } else {
                            if (cur_col < 3) {
                                square = [
                                    grid[6].slice(0, 3),
                                    grid[7].slice(0, 3),
                                    grid[8].slice(0, 3)
                                ]
                            } else if (cur_col < 6) {
                                square = [
                                    grid[6].slice(3, 6),
                                    grid[7].slice(3, 6),
                                    grid[8].slice(3, 6)
                                ]
                            } else {
                                square = [
                                    grid[6].slice(6, 9),
                                    grid[7].slice(6, 9),
                                    grid[8].slice(6, 9)
                                ]
                            }
                        }

                        if (square[0].concat(square[1]).concat(square[2]).indexOf(number) == -1) {
                            grid[cur_row][cur_col] = number;

                            if (check_grid(grid)) {
                                counter++;
                                break;
                            } else {
                                if (solve_grid(grid)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }

            break;
        }
    }

    grid[cur_row][cur_col] = 0;
    return false;
}

function choose_cell() {
    if (current_cell.row != -1) {
        var old_cell = document.getElementById("field").rows[current_cell.row].cells[current_cell.coll];
        old_cell.className = old_cell.className.slice(0, old_cell.className.indexOf(" chosen"));
    }

    current_cell.row = this.id.split("_")[0];
    current_cell.coll = this.id.split("_")[1];
    this.className += " chosen";
}

function check_game_over() {
    var table = document.getElementById("field");

    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            if (parseInt(table.rows[i].cells[j].innerHTML) != answer[i][j]) {
                return false;
            }
        }
    }

    alert("Игра закончена!!!");
    alert("Для новой игры обновите страницу");
    return true;
}

function process_number() {
    if (current_cell.row != -1) {
        var number = parseInt(String.fromCharCode(event.charCode));
        if (number > 0) {
            document.getElementById("field").rows[current_cell.row].cells[current_cell.coll].innerHTML = number;
        }
    }

    if (check_game_over()) {
        process_number = function() {
            alert("Игра закончена! Обновите страницу!");
            return;
        }
    }
}

// Начинаем игру по нажатию кнопки
function start_game() {
    // Выключаем кнопку
    document.getElementById("start").disabled = true;

    var grid = new Array(9);

    for (var i = 0; i < 9; i++) {
        grid[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    // Генерируем очередное поле
    generate_field(grid);

    answer = copy_arr(grid);

    var table = document.getElementById("field");

    while (attempts > 0) {
        var cur_row = get_random_int(0, 8);
        var cur_col = get_random_int(0, 8);

        while (grid[cur_row][cur_col] == 0) {
            cur_row = get_random_int(0, 8);
            cur_col = get_random_int(0, 8);
        }

        var backup = grid[cur_row][cur_col];

        grid[cur_row][cur_col] = 0;

        var copy = copy_arr(grid);
        counter = 0;
        solve_grid(copy);

        if (counter != 1) {
            grid[cur_row][cur_col] = backup;
            attempts--;
        }
    }

    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            table.rows[i].cells[j].id = i + '_' + j;
            if (grid[i][j] != 0) {
                table.rows[i].cells[j].innerHTML = grid[i][j];
                table.rows[i].cells[j].className += " bolder";
            } else {
                table.rows[i].cells[j].addEventListener('click', choose_cell, false);
                table.rows[i].cells[j].innerHTML = "";
            }
        }
    }
}

// TODO Уровни сложности
// TODO Слово Sudoku на разных языках
// TODO Отрефакторить код
// TODO Подсвечивать неправильные ячейки
// TODO Выбор темы
// TODO Адаптивное выравнивание
