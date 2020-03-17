import React from 'react';
import classes from './Todo.module.css';
import Axios from 'axios';
import { GoogleComponent } from 'react-google-location' ;

const API_KEY = "38ff4ea18457ae0260984285879273dc";

class Todo extends React.Component {

        state = {
            greeting: "",
            name: localStorage.getItem('username'),
            focus: localStorage.getItem('focus'),
            display1: "block",
            display2: "block",
            focusInputField: "block",
            showFocus: "block",
            checkField: "none",
            todo: "block",
            todoInputField: "none",
            showTodo: "none",
            todoItem: "",
            new: "false",
            todoList: JSON.parse(localStorage.getItem("todolist")),
            showTodos: false,
            isTempInCelcius: true,
            isTextDecActive: false,
        }

    onNameInputClick = (e) => {
        e.preventDefault();
        console.log("Name" + e.target.username.value);
        console.log("date" + Date.now());
        this.setState({name: e.target.username.value});
        localStorage.setItem("username", e.target.username.value);
        this.setState({display1: "none"});
        this.setState({display2: "block"});
    }

    onFocusInputClick = (e) => {
        e.preventDefault();
        this.setState({focus: e.target.focus.value});
        localStorage.setItem("focus", e.target.focus.value);
        this.setState({focusInputField: "none"});
        this.setState({showFocus: "block"});
        e.target.focus.value = "";
    }
    focusLabelClick = (e) => {
        e.preventDefault();
        if(this.state.isTextDecActive === false)
        this.setState({focusPara:"line-through",isTextDecActive:true});
        else
        this.setState({focusPara:"none",isTextDecActive:false});
    }
    onDeleteFocus = () => {
        this.setState({focusInputField:"block",showFocus:"none"});
        localStorage.removeItem('focus');
        this.setState({focus:null});
    }

    onLabelClick = (e) => {
        e.preventDefault();
        console.log(e.target);
        this.setState({checkField: "line-through"});
        // localStorage.setItem(checkField, "line-through");
    }

    onDeleteIconClick = (e) => {
        const pos = e.target.getAttribute('id');
        this.state.todoList.splice(pos,1);
        localStorage.setItem("todolist",JSON.stringify(this.state.todoList));
    }

    onTodoClick = () => {
        if(this.state.todoList === null || this.state.todoList.length < 1){
            this.setState({todoInputField: "none",todo: "block"});
            this.setState({todoList:[]});
        }
        else {
            this.setState({todoInputField: "block",todo: "none"});
        }

        if(this.state.showTodos === false)
        this.setState({showTodos:true});
        else
        this.setState({showTodos:false});
    }

    onButtonClick = () => {
        this.setState({todoInputField: "block"});
        this.setState({todo: "none"});
    }

    onTodoSubmitClick = (e) => {
        e.preventDefault();
        this.setState({value: ""})
        this.setState({new: "true"});
        this.setState({showTodo: "block"});
        const todoItemsList = this.state.todoList;
        if(e.target.todoTextField.value !== ""){
            const items = [...todoItemsList,e.target.todoTextField.value];
            localStorage.setItem("todolist",JSON.stringify(items));
            this.setState({todoList:items});
        }
        e.target.todoTextField.value = "";
    }

    // getWeather = async () => {
    //     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${API_KEY}&units=metric`);
    //     const data = await api_call.json();
    //     console.log(data);
    // }

    gettingTime = setInterval(() => {
        var hours = new Date().getHours();
        var hour = new Date().getHours();
        var minutes = new Date().getMinutes();
        var seconds = new Date().getSeconds();

        if(hour >= 4 && hour < 12)
        this.setState({greeting: "Good Morning",src:"https://wallpapercave.com/wp/wp1891035.jpg"});

        else if(hour >= 12 && hour < 17)
        this.setState({greeting: "Good Afternoon",src:"https://cdn.pixabay.com/photo/2016/06/03/21/47/lake-1434534_1280.jpg"});

        else if(hour >= 17 && hour < 20)
        this.setState({greeting: "Good Evening",src:"https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"});

        else 
            this.setState({greeting: "Good Night",src:"https://images2.alphacoders.com/712/thumb-1920-712462.jpg"});


        if(hours < 10){
            hours = "0" + hours;
        }
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        if(seconds < 10){
            seconds= "0" + seconds;
        }
        this.setState({time:hours +":" + minutes + ":" + seconds});

    }, 1000);

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.setState({latitude:latitude});
                this.setState({longitude:longitude});
                Axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
                .then(res => {
                const response = res.data;
                this.setState({weather: response,city: response.name,country:response.sys.country,icon:response.weather[0].icon,temperature:response.main.temp,description:response.weather[0].description});
                console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
            },(error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                      alert("User denied the request for Geolocation.");
                      break;
                    case error.POSITION_UNAVAILABLE:
                      alert("Location information is unavailable.");
                      break;
                    case error.TIMEOUT:
                      alert("The request to get user location timed out.");
                      break;
                    case error.UNKNOWN_ERROR:
                      alert("An unknown error occurred.");
                      break;
                  }
              });
          } else {
           alert("Geolocation is not supported by this browser.");
          }
    }

    onTempClick = () => {
        if(this.state.isTempInCelcius === true) {
            const celsius = this.state.temperature;
            const fahrenheit = ((celsius * (9/5)) + 32).toFixed(2);
            this.setState({temperature: fahrenheit,isTempInCelcius:false});
        }
        else {
            const fahrenheit = this.state.temperature;
            const celsius = ((fahrenheit - 32) * (5/9)).toFixed(2);
            this.setState({temperature: celsius,isTempInCelcius:true});
        }
    }

    render() {
        return(
            <div><div style={{backgroundImage:"url(" + this.state.src + ")"}} className={classes.main} >
                <div className={classes.content}>
                    <h1 className={classes.time}>{this.state.time}</h1>
                    {
                        this.state.name === null ? <div style={{display:this.state.display1}} className={classes.firstTime}>
                                                            <h1 className={classes.text}>What do you like to be called?</h1>
                                                            <form onSubmit={this.onNameInputClick}>
                                                                <input type="text" className={classes.inputField1} name="username"></input>
                                                            </form>
                                                        </div>
                                                        : <div style={{display:this.state.display2}} className={classes.notFirstTime}>
                                                            <h1 className={classes.greeting}>{this.state.greeting}, {this.state.name}</h1>
                                                            <h1 className={classes.text}>What's your main focus today?</h1>
                                                        {this.state.focus === null || this.state.focus === undefined ? <form style={{display:this.state.focusInputField}} onSubmit={this.onFocusInputClick}>
                                                                                        <input type="text" className={classes.inputField2} name="focus" ></input>
                                                                                     </form>
                                                        : <div style={{display:this.state.showFocus}}>
                                                                <div className={classes.wrapper}>
                                                                    <label onSubmit={this.onLabelClick} onClick={this.focusLabelClick} className={classes.label}>
                                                                        <input type="checkbox" name="checkbox"/>
                                                                        <p style={{textDecoration:this.state.focusPara}} className={classes.para}>{this.state.focus}</p>
                                                                    </label>
                                                                    <i onClick={this.onDeleteFocus} style={{cursor:"pointer"}} className="far fa-trash-alt delete-icon" aria-hidden="true"></i>
                                                                </div>
                                                          </div>
                                                        }
                                                        </div>
                    }
                </div>
                <div onClick={this.onTodoClick} className={classes.todo}><h1>TODOs</h1></div>

                {
                    this.state.showTodos ? <div><div style={{display: this.state.todo}} className={classes.todoWrapper}>
                    <p>Add a todo to get started</p>
                    <button onClick={this.onButtonClick} className={classes.btn}>Add now</button>
                </div>

                <div style={{display: this.state.todoInputField}} className={classes.todoWrapper}>
                {
                    this.state.todoList.map((item,pos) => {
                        return (
                            <div key={pos} style={{display:"flex",alignItems:"center",color:"white"}}>
                                <label data-key={pos} className={classes.todoLabel}>
                                    <input type="checkbox" name="todoCheckbox"/>
                                        <p style={{textDecoration:this.state.checkField}} className={classes.para}>{item}</p>
                                </label>
                                <i id={pos} onClick={this.onDeleteIconClick} style={{cursor:"pointer"}} className="far fa-trash-alt delete-icon" aria-hidden="true"></i>
                            </div>
                        )
                    })
                }
                    <form onSubmit={this.onTodoSubmitClick} className={classes.form}>
                        <input onKeyUp={this.onEnter} className={classes.inputField3} type="text" placeholder="Add New" name="todoTextField"/>
                    </form>

                </div></div> : null
                }

                <div className={classes.weatherWrapper}>
                    <div>
                        <img className={classes.img} src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="icon" />
                        {
                        this.state.isTempInCelcius ? <p onClick={this.onTempClick} style={{marginTop: "-25px"}}>{this.state.temperature}°C</p>
                        : <p onClick={this.onTempClick} style={{marginTop: "-25px"}}>{this.state.temperature}°F</p>
                        }
                        <p>{this.state.description}</p>
                        <p>{this.state.city},{this.state.country}</p>
                    </div>
                </div>

            </div></div>
        );
    }
}
export default Todo;