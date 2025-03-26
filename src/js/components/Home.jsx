import React, { useState, useEffect } from "react";

const Home = () => {
	// grocery list
	// that is going to contain a list of groceries 
	// recieved from the user input
	const [groceries, setGroceries] = useState([]);
	const [userInput, setUserInput] = useState("");

	//right now we can add a groceries
	// view those groceries in a list on our page
	// we can delete that grocery item off the list
	// updates should be
	// make the the todos load from the ones saved in the api-
		//i mean this with the intention of when the screen loads
	// post to the api when we add a todo
	// change delete to update item to is_done: false so I can style it as crossed out
	// we can then add a true delete after that

	// () => {}
	useEffect(() => {
		//I cannot create,get,update,or delete a todo without a user
		getUser()
		// we want to create our user
		// but before we do that we should see if it already exist.
	}, []) //empty dependancy arrays run onload

	const addToList = async (e) => {
		e.preventDefault();
		let response = await fetch("https://playground.4geeks.com/todo/todos/valerieclaire98", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ 
				label: userInput,
				is_done: false
			})
		})
		let data = await response.json()
		setUserInput("")
		getUser()
		//now we want to repopulate the groceries array with the api todo array

		// without spread operator [[apples", "bananas", "corn"], 'dressing']
		// with spread operator ["apples", "bananas", "corn", "dressing"]
	};

	const crossOffList = async(grocery) => {
		// use the grocery info to make the put request to change the is_done value
		// we need the todo id to pass into the url 
		// we need to update the grocery object to have is done toggled
		let id = grocery.id
		let response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
		    method: "PUT",
		    headers: { "Content-type": "application/json" },
		    body: JSON.stringify({ 
		        label: grocery.label,
		        is_done: !grocery.is_done
		    })
		})
		let data = await response.json()
		getUser()
	};

	const removeGrocery = async (id) => {
		let response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
			method: "DELETE",
			headers: { "Content-type": "application/json" }
		})
		let data = await response.json()
		getUser()
	};

	const getUser = async() => {
		let response = await fetch('https://playground.4geeks.com/todo/users/valerieclaire98')
		let data = await response.json()
		if(typeof data.name != 'undefined') {
			setGroceries(data.todos)
		}
		else if(typeof data.detail != 'undefined') {
			let response = await fetch('https://playground.4geeks.com/todo/users/valerieclaire98', {
				method: "POST",
    			headers: { "Content-type": "application/json" },
			})
			let data = await response.json()
		}
	}
	
	return (
		<div className="text-center mt-5 h-100">
            <input
				type="text"
				onChange={(e) => setUserInput(e.target.value)}
				value={userInput}
			/>
			<button onClick={(e) => addToList(e)}>Add To List</button>

			{/* we have an array of groceries and we want to display as a list on our page */}
			<ul>
								{/* item, index */}
				{groceries?.map((grocery, index) => {		
					if(grocery.bought != true) {
						return (
							<li key={index} className={grocery.is_done == true ? 'text-decoration-line-through' : ""}>
								{grocery.label} 
								<input type="checkbox" onChange={()=>crossOffList(grocery)} checked={grocery.is_done == true ? "checked" : ""}/>
								<span onClick={() => removeGrocery(grocery.id)}> ❌ </span>
							</li>
						)
					}			
				})}
			</ul>
		</div>
	);
};

export default Home;