var main =document.getElementsByTagName("main")[0],
    input = document.getElementsByTagName("input")[0],
    item_seacrh = search_result.getElementsByTagName("li"),
    table_effects = document.getElementsByClassName("table_effects")[0],
	li_effect = table_effects.getElementsByTagName("li"),
	effect = main.getElementsByClassName("effect"),

	index_item = 0,
	result_arr_size = 0, // Длинна массива
	result_arr = []; // Массив из результатов поиска

var effects = [],
	text = "",
	index = 0,
	search_effect = search.value;

/* Поиск в инпуте */
search.oninput = function() {
	search_result.innerHTML = "";
	result_arr = [],
	index_item = 0;
	// Поиск
	for (var i = 0, j = 0; i < ingredient.length; i++) {
		if(ingredient[i].name.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
			result_arr[j] = ingredient[i].name;
			j++;
		}
	}

	if (search.value != "") {
		search_result.classList.add("show");
	} else {
		search_result.classList.remove("show");
	}

	result_arr.sort();
	// Установить максимальное кол-во выводимых элиментов
	if (result_arr.length > 12) {
		result_arr_size = 12;
	} else {
		result_arr_size = result_arr.length;
	}
	// Вывести графически 
	for (var i = 0, j = 0; i < result_arr_size; i++) {
		search_result.appendChild(document.createElement("li"));
		item_seacrh[i].textContent = result_arr[i];
		// Событие при клике на элимент списка
		item_seacrh[i].addEventListener("click", function() {
			search.value = this.textContent;
			search.focus();
			search_result.classList.remove("show");
		});
	}
	if (result_arr.length > 0) {
		item_seacrh[index_item].classList.add("active");
	}
}

search.addEventListener("keydown", function(e) {
	// Кнопка вниз
	if (e.keyCode == 40) {
		if (index_item > result_arr_size - 2) {
			index_item = 0;
		} else {
			index_item++;	
		}
		this.value = item_seacrh[index_item].textContent;
		if (result_arr.length > 1) {
			for (var i = 0; i < result_arr_size; i++) {
				item_seacrh[i].classList.remove("active");
			}
			item_seacrh[index_item].classList.add("active");
		}
	}
	// Кнопка вверх
	if (e.keyCode == 38) {
		if (index_item < 1) {
			index_item = result_arr_size - 1;
		} else {
			index_item--;	
		}
		this.value = item_seacrh[index_item].textContent;
		if (result_arr.length > 1) {
			for (var i = 0; i < result_arr_size; i++) {
				item_seacrh[i].classList.remove("active");
			}
			item_seacrh[index_item].classList.add("active");
		}

	}
	// Интер
	if (e.keyCode == 13) {
		if (index_item == 0) {
			this.value = item_seacrh[index_item].textContent;
		}
		search_result.classList.remove("show");

		search_effect = search.value;
		main.innerHTML = "";
		index = 0;
		for (var i = 0; i < ingredient.length; i++) {
			if (ingredient[i].name == search_effect) {
				create_card(i);
			}
		}
	}
});
/**/

// Показать таблицу эффектов
// при вулюченной таблице поиск идет по ней
show_effects.addEventListener("click", function() {
	this.classList.toggle("show_effects_active");
	table_effects.classList.toggle("show");
});


function get_effects(arr) {
	var obj = {};

	for (var i = 0; i < arr.length; i++) {
		var str = arr[i].effect_1;
		obj[str] = true;
		str = arr[i].effect_2;
		obj[str] = true;
		str = arr[i].effect_3;
		obj[str] = true;
		str = arr[i].effect_4;
		obj[str] = true;
	}

	// Возвращает массив оригинальных эффектов
	return String(Object.keys(obj)).split(",").sort();
}

function create_card(i) {
	main.innerHTML += '<table class="card"><tr><td colspan="2"><img></td></tr><tr><th colspan="2"></th></tr><tr><td>Вес<span></span></td><td>Цена<span></span><img src="images/Gold.png"></td></tr><tr><td class="effect"></td><td class="effect"></td></tr><tr><td class="effect"></td><td class="effect"></td></tr></table>';
	var table = document.getElementsByTagName("table")[index],
		name = table.getElementsByTagName("th")[0],
		image = table.getElementsByTagName("img")[0],
		weight = table.getElementsByTagName("span")[0],
		value = table.getElementsByTagName("span")[1],
		effect_1 = table.getElementsByTagName("td")[3],
		effect_2 = table.getElementsByTagName("td")[4],
		effect_3 = table.getElementsByTagName("td")[5],
		effect_4 = table.getElementsByTagName("td")[6];

	name.textContent = ingredient[i].name;
	console.log(index);
	console.log(ingredient[i].name);
	image.src = "images/ingredients/" + ingredient[i].image;
	value.textContent = ingredient[i].value;
	weight.textContent = ingredient[i].weight;
	effect_1.textContent = ingredient[i].effect_1;
	effect_2.textContent = ingredient[i].effect_2;
	effect_3.textContent = ingredient[i].effect_3;
	effect_4.textContent = ingredient[i].effect_4;
	index++;
}

for (var i = 0; i < li_effect.length; i++) {
	li_effect[i].addEventListener("click", function() {
		if (this.textContent) {
			input.value = this.textContent;
            table_effects.classList.toggle("show");
            search_effect = search.value;
            main.innerHTML = "";
            index = 0;
            for (var i = 0; i < ingredient.length; i++) {
                if (ingredient[i].effect_1 == search_effect || ingredient[i].effect_2 == search_effect || ingredient[i].effect_3 == search_effect || ingredient[i].effect_4 == search_effect) {
                    create_card(i);
                }
            }
            for (var i = 0; i < effect.length; i++) {
            	if (search_effect == effect[i].textContent) {
            		effect[i].classList.add("active");
            	}
            }
		}
	})
}

show_all.onclick = function() {
	main.innerHTML = "";
	index = 0;
	for (var i = 0; i < ingredient.length; i++) {
		create_card(i);
	}
}

show.onclick = function() {
	search_effect = search.value;
	main.innerHTML = "";
	index = 0;
	for (var i = 0; i < ingredient.length; i++) {
		if (ingredient[i].effect_1 == search_effect || ingredient[i].effect_2 == search_effect || ingredient[i].effect_3 == search_effect || ingredient[i].effect_4 == search_effect) {
			create_card(i);
		}
	}
}
// main.innerHTML = "";
// for (var j = 0; j < ingredient.length; j++) {
// 	create_card(j);
// }


