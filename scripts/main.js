var text = "";


for (var i = 0; i < ingredient.length; i++) {
	text += '<img src="images/ingredients/' + ingredient[i].image + '" width="150">';
	text += "<p>" + ingredient[i].id + " " + ingredient[i].name + "</p>";
}

test.innerHTML = text;