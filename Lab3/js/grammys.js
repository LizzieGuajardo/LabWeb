var myField

$.ajax({
	url: "data/grammys.json",
	type: "GET",
	dataType: "json",
	success: function(data){
		let new_html= " ";
		//myField guarda la info del Field seleccionado
		myField = data.fields;
		for (var i = 0; i < data.fields.length; i++) {
			new_html += `<option value="${data.fields[i].field_id}">
				${data.fields[i].field}
			</option>`
		}
		$("#category_types").append(new_html);
	},
	error: function(error_msg){
		console.log(error_msg)
	}
});

function loadNominees(myNominees, myWinner_id)
{
	var new_html = "";
	for (var i = 0; i < myNominees.length; i++) 
	{
		//Si el nominado coincide con el id del ganador, appendear candion nominada con el atributo "winner" y el texto de "WINNER"
		if(myWinner_id == i)
		{
			new_html += `<li class="winner">${myNominees[i].nominee} ${`<span class="winner_msg">WINNER!</span>`}</li>`	
		}
		//Si no es el nomiado, appendear solo la info del nominado
		else
		{
			new_html += `<li>${myNominees[i].nominee}</li>`
		}
		//Appendear artista
		new_html += `<p>${myNominees[i].artist}</p>`
		//Appendear info 
		new_html += `<p>${myNominees[i].info}</p>`
	}
	return new_html;
}

function loadCategories(myCategories)
{
	var new_html = "";
	for (var i = 0; i < myCategories.length; i++) 
	{
		//Por cada categoria dentro del field, appende el nombre
		//Por cada categoria manda a imprimir los nominados en la función myCategories y manda el id del nominado ganador
		new_html += `<h3>${myCategories[i].category_name}
					</h3> 
					<ul>${loadNominees(myCategories[i].nominees, myCategories[i].winner_id)}</ul>
					<hr>
					`
	}
	return new_html;
}

function loadField(myField)
{
	var new_html = "";
	//Agregar nombre del Field
	new_html += `<h2 class="FieldName">
					${myField.field}
				</h2>`;
	
	//Si hay una descripción, appendearla 
	if(myField.description != null)
	{
		new_html += `<p class="description">
						${myField.description}
					</p>`
	}

	//Manda a imprimir todas las categorías 
	new_html+= loadCategories(myField.categories);

	//Vacia la nominees_section para que se recargue
	$("#nominees_section").empty();
	//Appendea el new_html a la sección del html correspondiente
	$("#nominees_section").append(new_html);
	
}

$("#category_types").on('change', function(event)
{
	let id = $(this).val();
	for (var i = 0; i < myField.length; i++) 
	{
		//Busca el id correspnodiente al id del field guardado (myField)
		//lo manda a cargar como parámetro
		if(myField[i].field_id == id)
		{
			loadField(myField[i]);
		}
	}
})

$("#category_types").change()