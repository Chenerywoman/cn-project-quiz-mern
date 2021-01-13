import React, {useState} from 'react';
import '../App.css';

const Register = () => {
    const [category, setCategory] = useState();
    const [difficulty, setDifficulty] = useState("");

    const formHandler = async (event) => {
        event.preventDefault();

        console.log(category);
        console.log(difficulty);
    };

    return (
        <div>
            <h1>Select Your Quiz</h1>

            <form onSubmit={formHandler}>

                <label>Category: </label>
                <select required name="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="9">General Knowledge</option>
                    <option value="10">Books</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="13">Musicals and Theatres</option>
                    <option value="14">Television</option>
                    <option value="15">Video Games</option>
                    <option value="16">Board Games</option>
                    <option value="17">Science and Nature</option>
                    <option value="18">Computers</option>
                    <option value="19">Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Comics</option>
                    <option value="30">Gadgets</option>
                    <option value="31">Japanese Anime and Manga</option>
                    <option value="32">Cartoon and Animations</option>

                </select> <br />
                <label>Difficulty: </label>
                <select required name="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select> <br />

                

                <button type="submit" >Generate Quiz</button>
            </form>
        </div>
    )
}

export default Register
