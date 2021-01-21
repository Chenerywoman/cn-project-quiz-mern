import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Selection = (props) => {
    
    const {
        updateCategory, 
        updateDifficulty,
        updateCategoryName,
        updateCategoryAndName,
        categories
    } = props;

    const formHandler = async (event) => {
        event.preventDefault();
        console.log("form handled");
    };
    

    useEffect(() => {
    
      updateCategory("9");
      updateCategoryName("General Knowledge");
      updateDifficulty("easy");

    },[updateCategory, updateCategoryName, updateDifficulty]);


console.log(categories)
    return (
        <div class="page" id="selection" >
            <h1 id="select-head" >Select Your Quiz</h1>

            <form onSubmit={formHandler}>
                <div>
                    <label>Category: </label>
                    <select required name="category" onChange={(e) => updateCategoryAndName(e.target.value)}>
                        {categories.map((category, ind) => {
                            return <option key={ind} value={category.id}>{category.name}</option>
                        })}
                    </select> <br />
                    <label>Difficulty: </label>
                    <select required name="difficulty" onChange={(e) => updateDifficulty(e.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select> <br />
                </div>
                <Link to = "/quiz" ><button id="generation" type="submit" >Generate Quiz</button></Link>
            </form>
        </div>
    )
}

export default Selection
