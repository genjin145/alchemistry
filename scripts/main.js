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
			// result_arr[j] = ingredient[i].name;
			result_arr[j] = ingredient[i];
			j++;
		}
	}
	/* Живой поиск */
	var text_card = "";
	for (var i = 0; i < result_arr.length; i++) {
		text_card += draw_card(i, result_arr);
	}
	main.innerHTML = text_card;
	for (var i = 0; i < effect.length; i++) {
		effect[i].addEventListener("click", push_effect);
	}
	/* Живой поиск */

	// if (search.value != "") {
	// 	search_result.classList.add("show");
	// } else {
	// 	search_result.classList.remove("show");
	// }

	// Установить максимальное кол-во выводимых элиментов
	if (result_arr.length > 12) {
		result_arr_size = 12;
	} else {
		result_arr_size = result_arr.length;
	}
	// Вывести графически 
	for (var i = 0, j = 0; i < result_arr_size; i++) {
		search_result.appendChild(document.createElement("li"));
		item_seacrh[i].textContent = result_arr[i].name;
		// Событие при клике на элимент списка
		item_seacrh[i].addEventListener("click", function() {
			search.value = this.textContent;
			create_cards(this.textContent, ingredient);
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
				create_cards(search_effect, ingredient);
			}
		}
	}
});
/**/

// Показать таблицу эффектов
// при вулюченной таблице поиск идет по ней
show_effects.addEventListener("click", function() {
	table_effects.classList.toggle("show");
	search.focus();
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

function draw_card(index, arr) {
	var text_card = 
`<table class="card">
	<tr>
		<td colspan="2">
			<img src="images/ingredients/${arr[index].image}">
		</td>
	</tr>
	<tr>
		<th colspan="2">${arr[index].name}</th>
	</tr>
	<tr>
		<td>Вес<span>${arr[index].weight}</span></td>
		<td>Цена<span>${arr[index].value}</span><img src="images/Gold.png"></td>
	</tr>
	<tr>
		<td class="effect">${arr[index].effect_1}</td>
		<td class="effect">${arr[index].effect_3}</td>
	</tr>
		<tr><td class="effect">${arr[index].effect_2}</td>
		<td class="effect">${arr[index].effect_4}</td>
	</tr>
</table>`;
	return text_card;
}

function push_effect() {
	create_cards(this.textContent, ingredient);
}

function create_cards(input_value, arr) {
	var result_searchs = [], // Результаты поиска
		arr_effects = get_effects(arr), // Массив эффектов
		search_in, // Искать в ингридиентах или в эффектах

		text_card = "";

	// Посмотрим значение в ингридиентах
	for (var i = 0; i < arr.length; i++) {
		if (input_value == arr[i].name) {
			search_in = "ingredient";
			break;
		}
	}
	// Посмотрим значение в эффектах
	for (var i = 0; i < arr.length; i++) {
		if (input_value == arr_effects[i]) {
			search_in = "effect";
			break;
		}
	}
	// Заполним массив с результатами
	if (search_in == "ingredient") {
		for (var i = 0, j = 0; i < arr.length; i++) {
			if (input_value == arr[i].name) {
				result_searchs[j] = arr[i];
				j++;
			}
		}
	} else if (search_in == "effect") {
		for (var i = 0, j = 0; i < arr.length; i++) {
			if (input_value == arr[i].effect_1 || input_value == arr[i].effect_2 || input_value == arr[i].effect_3 || input_value == arr[i].effect_4) {
				result_searchs[j] = arr[i];
				j++;
			}
		}
	} else {
		console.log("Ничего не нашлось!");
	}

	// Покажем карточки
	if (result_searchs.length > 0) {
		for (var i = 0; i < result_searchs.length; i++) {
			text_card += draw_card(i, result_searchs);
		}
		main.innerHTML = text_card;
		// Зададим события на эффекты
		for (var i = 0; i < effect.length; i++) {
			if (input_value == effect[i].textContent) {
				effect[i].classList.add("active");
			} else {
				effect[i].addEventListener("click", push_effect);
			}
		}
	}
	search.value = input_value;
	search.focus();
}

show_all.onclick = function() {
	var text_card = "";
	for (var i = 0; i < ingredient.length; i++) {
		text_card += draw_card(i, ingredient);
	}
	main.innerHTML = text_card;
	for (var i = 0; i < effect.length; i++) {
		effect[i].addEventListener("click", push_effect);
	}
}

for (var i = 0; i < li_effect.length; i++) {
	li_effect[i].addEventListener("click", function() {
		if (this.textContent) {
			create_cards(this.textContent, ingredient);
			table_effects.classList.remove("show");
		}
	})
}