import React,{Component} from 'react';
import { nodeURL } from '../../config';
import axios from 'axios';

class Logout extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout = () => {
        console.log("Logout")
        localStorage.clear();
        axios.post(nodeURL + `/logout`)
            .then(response => {
                localStorage.clear();
                this.props.history.push('/');
            })
    }

    
    render(){
        return (
            <div>
                Logout
            </div>
        )
    }
}
export default Logout;