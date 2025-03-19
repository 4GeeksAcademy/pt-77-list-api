import React, {useState} from "react";

const Home = () => {
	// grocery list
	// that is going to contain a list of groceries 
	// recieved from the user input
	const [groceries, setGroceries] = useState([]);
	const [userInput, setUserInput] = useState("");
	
	// item = dressing
	const addToList = (e) => {
		e.preventDefault();
		let grocery = {value: userInput, bought: false}
		
		setGroceries([...groceries, grocery]);
		// without spread operator [[apples", "bananas", "corn"], 'dressing']
		// with spread operator ["apples", "bananas", "corn", "dressing"]
		setUserInput("")
	}

	const updateBoughtItem = (index) => {
		let groceryList = groceries
		let thisGrocery = groceryList[index];
		thisGrocery.bought = true;
		setGroceries(groceryList);
	}

	const removeGrocery = (i) => {
		const newArray = groceries.filter((grocery, index) => index !== i);
		setGroceries(newArray);
	  };

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
						return (<li key={index}>{grocery.value} <span onClick={() => removeGrocery(index)}> ❌ </span></li>)
					}			
				})}
			</ul>
		</div>
	);
};

export default Home;