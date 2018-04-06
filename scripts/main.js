var main =document.getElementsByTagName("main")[0];

var text = "",
	index = 0,
	search_effect = search.value;

function create_card(i) {
	main.innerHTML += '<table class="card"><tr><td colspan="2"><img></td></tr><tr><th colspan="2"></th></tr><tr><td>Вес<span></span></td><td>Цена<span></span></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>';
	var table = document.getElementsByTagName("table")[index],
		name = table.getElementsByTagName("th")[0],
		image = table.getElementsByTagName("img")[0],
		effect_1 = table.getElementsByTagName("td")[3],
		effect_2 = table.getElementsByTagName("td")[4],
		effect_3 = table.getElementsByTagName("td")[5],
		effect_4 = table.getElementsByTagName("td")[6];

	name.textContent = ingredient[i].name;
	console.log(index);
	console.log(ingredient[i].name);
	image.src = "images/ingredients/" + ingredient[i].image;
	effect_1.textContent = ingredient[i].effect_1;
	effect_2.textContent = ingredient[i].effect_2;
	effect_3.textContent = ingredient[i].effect_3;
	effect_4.textContent = ingredient[i].effect_4;
	index++;
}

show_all.onclick = function() {
	for (var i = 0; i < ingredient.length; i++) {
		text += '<img src="images/ingredients/' + ingredient[i].image + '" width="150">';
		text += "<p>" + ingredient[i].id + " " + ingredient[i].name + "</p>";
	}
	test.innerHTML = text;
}

show.onclick = function() {
	search_effect = search.value;
	main.innerHTML = "";
	index = 0;
	for (var i = 0; i < ingredient.length; i++) {
		if (ingredient[i].effect_1 == search_effect || ingredient[i].effect_2 == search_effect || ingredient[i].effect_3 == search_effect || ingredient[i].effect_4 == search_effect) {
			// text += '<img src="images/ingredients/' + ingredient[i].image + '" width="150">';
			// text += "<p>" + ingredient[i].id + " " + ingredient[i].name + "</p>";
			create_card(i);
		}
	}
}
// main.innerHTML = "";
// for (var j = 0; j < ingredient.length; j++) {
// 	create_card(j);
// }

// create_card(0);
// create_card(8);


