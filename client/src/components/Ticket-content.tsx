import React, { Component } from "react";

//this component represents the content of the ticket
//it has a feature hide and show if content is too large
interface TicketContentProps {
    content: string,
}

interface TickerContentState{
    isTruncated: boolean
}

class TicketContent extends Component<TicketContentProps, TickerContentState>{

    constructor(props: TicketContentProps){
        super(props)

        this.state = {
            isTruncated: true
        }
    }

    onClick =() =>{
        this.setState({
            isTruncated: !this.state.isTruncated
        })
    }

    render() {
        return (<div>
            {this.state.isTruncated?<div className='content'>{this.props.content.slice(0,380)}</div>:<div className='content'>{this.props.content}</div>}
            {this.props.content.length > 380 && <span onClick={this.onClick} className='showbtn'>{this.state.isTruncated? 'See More':'See less'}</span>}
        </div>);
    }
}

export default TicketContent;