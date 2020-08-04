
	let books=[];
	async function fetchBooks(url) {
		return await axios.get(url);
	}

 fetchBooks("http://localhost:3000/api/book/maths").then( (response)=> {
	if (response.status === 200) {
		books = books.concat(response.data.response);
		console.log(books);
		books.map((book, index)=>{
			let el = document.createElement('li');
			el.innerHTML = book.title;
			if(index === 0){
				let id=book.id
				el.setAttribute('class', 'book selected');
				fetchBooks(`http://localhost:3000/api/book/maths/section/${id}`).then((response) => {
					if (response.status === 200) {
						let table = document.getElementsByClassName('table-content');
						const tdata =response.data.response[id].map(book=>{
						return`<tr>
								<td>${book.id}</td>	<td>${book.title}</td> 	<td>${book.type}</td><td>${book.status}</td>
							</tr>`	
						})	
						table[0].innerHTML = tdata;
						table[0].removeChild(table[0].childNodes[1]);
						console.log(response.data.response);
					} else {
						throw new Error("some thing went wrong");
					}
				})
			}else{
				el.setAttribute('class', 'book');
			}
			el.setAttribute('data', book.id);
			el.addEventListener("click", getSecondLevelData)
			document.getElementById('book-list').appendChild(el);
		})
	} else {
		throw new Error("some thing went wrong");
	}
});

function getSecondLevelData(evt){
	console.log(evt);
	event.preventDefault();
	let id = +evt.target.getAttribute("data"); 
	let el =document.getElementsByClassName("selected")[0];
	el.setAttribute('class', 'book');
	evt.target.setAttribute('class', 'selected book');
	fetchBooks(`http://localhost:3000/api/book/maths/section/${id}`).then((response)=>{
		if (response.status === 200) {
			let table = document.getElementsByClassName('table-content');
			const tdata = response.data.response[id].map(book => {
				return `<tr><td>${book.id}</td>	<td>${book.title}</td> 	<td>${book.type}</td><td>${book.status}</td></tr>`
			})
			table[0].innerHTML = tdata;
			table[0].removeChild(table[0].childNodes[1]);
			console.log(response.data.response)
		}else{
			throw new Error("some thing went wrong");
		}
	})
}










