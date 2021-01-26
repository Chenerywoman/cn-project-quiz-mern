import React, {useEffect, useState, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const Selection = (props) => {

    const history = useHistory();
    
    const {
        updateCategory, 
        updateDifficulty,
        updateCategoryName,
        updateCategoryAndName,
        categories
    } = props;

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback (async () => {
        setIsLoading(true);
        const response = await axios.get('/selection');
        console.log(response.data.message)
        if(response.data.message !== "User Found") {
            console.log("redirecting")
            history.push('/login');
        };
        setIsLoading(false);
    },[history]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formHandler = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        console.log("form handled");
        setIsLoading(false);
    };
    

    useEffect(() => {
    
      updateCategory("9");
      updateCategoryName("General Knowledge");
      updateDifficulty("easy");

    },[updateCategory, updateCategoryName, updateDifficulty]);


console.log(categories)
    return (
        <div className="page" id="selection" >
            <h1 id="select-head" >Select Your Quiz</h1>

            {isLoading ? <p>...loading</p> : 
            <form onSubmit={formHandler}>
                <div id="selector">
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
            }
        </div>
    )
}

export default Selection
