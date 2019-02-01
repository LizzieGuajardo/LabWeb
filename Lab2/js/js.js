/*Returns number of elements in to do list*/
function countListElements()
{
	var index = document.getElementsByName('todo');
	return index.length;
}

tf = document.getElementById("newitem");
tf.addEventListener('keyup',function(e){
	if(e.keyCode == 13)
	{
		addElementToList();
	}
})

/*When add button is clicked, reads text fields and adds it to the top of the list*/
function addElementToList() {
	var newlist = document.createElement("li");
	var newinput = document.createElement("input");
	newinput.type = "checkbox";
	newinput.name = "todo";
	newinput.value = countListElements()+1;
	newinput.setAttribute("onClick", "checkElement(this)");
	var newspan = document.createElement("span");
	newspan.textContent = document.getElementById('newitem').value;

	newlist.appendChild(newinput);
	newlist.appendChild(newspan);
	var ulElement = document.getElementById("list") 
	ulElement.insertBefore(newlist, ulElement.children[0]);
	document.getElementById('newitem').value = "";
}

function checkElement(element)
{
	/* 0 if element is not checked, 1 if it is checked*/
	var bChecked = element.parentElement.getElementsByTagName("SPAN")[0].classList.length;	
	
	if (bChecked == 0)
	{
		element.parentElement.getElementsByTagName("SPAN")[0].classList.add("done")
		var copyOfelementLI= element.parentElement;
		element.parentElement.remove();
		document.getElementById("list").appendChild(copyOfelementLI);

	}
	else
	{
		element.parentElement.getElementsByTagName("SPAN")[0].classList.remove("done")
		var copyOfelementLI= element.parentElement;
		element.parentElement.remove();

		var ulElement = document.getElementById("list") 
		ulElement.insertBefore(copyOfelementLI, ulElement.children[0]);
	}
}