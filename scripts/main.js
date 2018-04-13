var main =document.getElementsByTagName("main")[0],
    input = document.getElementsByTagName("input")[0],
    table_effects = document.getElementsByClassName("table_effects")[0],
	li_effect = table_effects.getElementsByTagName("li"),
	effect = main.getElementsByClassName("effect");

var effects = [],
	text = "",
	index = 0,
	search_effect = search.value;

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

input.onclick = function() {
	table_effects.classList.toggle("show");
}

document.getElementsByTagName("body")[0].onclick = function() {
	table_effects.classList.remove("show");
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


