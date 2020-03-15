import React from 'react';
import classes from './Todo.module.css';
import Axios from 'axios';
class Todo extends React.Component {

    // constructor(){
    //     super();
    //     local1 = localStorage.getItem(username);
    // local2 = localStorage.getItem(focus);
    // if(local1 === null) {
    //     localStorage.setItem(username,"");
    // }
    // this.state = {
    //     greeting: "Good Evening",
    //     name: "",
    //     focus: "",
    //     display1: "block",
    //     display2: "none",
    //     focusInputField: "block",
    //     showFocus: "none",
    //     checkField: "none",
        
    // }
    // }

    state = {
        greeting: "",
        name: "",
        focus: "",
        display1: "block",
        display2: "none",
        focusInputField: "block",
        showFocus: "none",
        checkField: "none",
        todo: "none",
        todoInputField: "none",
        showTodo: "none",
        todoItem: "",
        new: "false",
        todolist: [],
        currentItem:{
            todoText: "",
            key: "",
        }

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
        console.log(e.target.focus.value);
        this.setState({focus: e.target.focus.value});
        localStorage.setItem("focus", e.target.focus.value);
        this.setState({focusInputField: "none"});
        this.setState({showFocus: "block"});
    }

    onLabelClick = (e) => {
        e.preventDefault();
        console.log(e.target);
        this.setState({checkField: "line-through"});
        // localStorage.setItem(checkField, "line-through");
    }

    onDeleteIconClick = (e) => {
        console.log(e.target);
    }

    onTodoClick = () => {
        this.setState({todo: "block"});
    }

    onButtonClick = () => {
        this.setState({todoInputField: "block"});
        this.setState({todo: "none"});
    }

    handleInput = (e) => {
        this.setState({
            currentItem:{
            todoText: e.target.value,
            key:Date.now()
            }
        });
    }

    onTodoSubmitClick = (e) => {
        e.preventDefault();
        console.log("onTodoSubmitClick => " + e.target.todoTextField.value);
        this.setState({value: ""})
        this.setState({new: "true"});
        this.setState({showTodo: "block"});

        const newItem = this.state.currentItem;
        console.log("new Item =" + newItem);

        if(newItem.text !== "") {
            const items = [...this.state.todolist,items];
            this.setState({
                todolist: items,
                currentItem:{
                    text: '',
                    key: ''
                }
            })
        }

        // if(e.target.todoTextField.value !==""){
        //     const items = [...this.state.todoItem,e.target.todoTextField.value];
        //     this.setState({todolist: {text:items,key: Date.now()}});
        //     // console.log(this.state.todoItem);
        //     // this.setState({todoItem: items});
        //     console.log(this.state.todolist);
        // }
        // localStorage.setItem("todoTextField", e.target.todoTextField.value);
    }

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
        Axios.get('https://api.openweathermap.org/data/2.5/weather?lat=12.961454&lon=77.7106338&APPID=34140d96c2ad22d503d80004ffc14544')
        .then(res => {
            const response = res.data;
            this.setState({weather: response});
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return(
            <div><div style={{backgroundImage:"url(" + this.state.src + ")"}} className={classes.main} >
                <div className={classes.content}>
                    <h1 className={classes.time}>{this.state.time}</h1>
                    <div style={{display:this.state.display1}} className={classes.firstTime}>
                        <h1 className={classes.text}>What do you like to be called?</h1>
                        <form onSubmit={this.onNameInputClick}>
                            <input type="text" className={classes.inputField1} name="username"></input>
                        </form>
                    </div>
                    <div style={{display:this.state.display2}} className={classes.notFirstTime}>
                        <h1 className={classes.greeting}>{this.state.greeting}, {this.state.name}</h1>
                        <h1 className={classes.text}>What's your main focus today?</h1>
                        <form style={{display:this.state.focusInputField}} onSubmit={this.onFocusInputClick}>
                            <input type="text" className={classes.inputField2} name="focus"></input>
                        </form>
                        <div style={{display:this.state.showFocus}}>
                            <div className={classes.wrapper}>
                            <div>
                                <label onSubmit={this.onLabelClick} className={classes.label}>
                                    <input type="checkbox" name="checkbox"/>
                                    <p style={{textDecoration:this.state.checkField}} className={classes.para}>{this.state.focus}</p>
                                </label>
                            </div>
                            <div>
                                <i onClick={this.onDeleteIconClick} style={{cursor:"pointer"}} className="far fa-trash-alt delete-icon" aria-hidden="true"></i>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={this.onTodoClick} className={classes.todo}><h1>TODOs</h1></div>
                <div style={{display: this.state.todo}} className={classes.todoWrapper}>
                    <p>Add a todo to get started</p>
                    <button onClick={this.onButtonClick} className={classes.btn}>Add now</button>
                </div>
                <div style={{display: this.state.todoInputField}} className={classes.todoWrapper}>

                    <div style={{display:this.state.showTodo}}>
                            <div className={classes.wrapper}>
                            <div>
                                <label className={classes.todoLabel}>
                                    <input type="checkbox" name="todoCheckbox"/>
                                    <p style={{textDecoration:this.state.checkField}} className={classes.para}>{this.state.todoItem}</p>
                                </label>
                            </div>
                            <div>
                                <i onClick={this.onDeleteIconClick} style={{cursor:"pointer"}} className="far fa-trash-alt delete-icon" aria-hidden="true"></i>
                            </div>
                            </div>
                    </div>

                    <form onSubmit={this.onTodoSubmitClick} className={classes.form}>
                        <input onChange={this.handleInput} className={classes.inputField3} type="text" placeholder="Add New" name="todoTextField" value={this.state.currentItem.todoText} />
                    </form>

                </div>
                <div className={classes.weather}>
                    <h1>Weather</h1>
                    <img className={classes.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbesuHGwFYyLEQRu1xAmfwNEMnyj2tCc317IY15ww1MIxH_Ding&s"></img>
                    <p>{}</p>
                    {/* <p>{this.state.weather.sys},{this.state.sys.country}</p> */}
                </div>
            </div></div>
        );
    }
}
export default Todo;