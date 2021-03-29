import React, { Component } from "react";
import { Ticket } from '../api'
import Tags from "./Tags";
import TicketContent from './Ticket-content'

//this component represents the tick itself rendered by TicketList
//it has a feature to tag certain tickets by the client
interface TicketComponentProps {
    ticket: Ticket
    appendTicketId: Function
    pinnedTickets: []
}

interface TicketComponentState {
    mouseOnTicket: boolean,
    isPinned: boolean,
    pinLogo: string
}

class TicketComponent extends Component<TicketComponentProps, TicketComponentState>{

    constructor(props: TicketComponentProps) {
        super(props);

        this.state = {
            mouseOnTicket: false,
            isPinned: false,
            pinLogo: require('../assets/pin_black.png')
        }
    }

    onTicket = () => {
        this.setState({ mouseOnTicket: true })
    }

    offTicket = () => {
        this.setState({ mouseOnTicket: false })
    }

    hideClick = (id: string) => {
        this.props.appendTicketId(id)
    }

    pin = () => {
        if (!this.state.isPinned) {
            this.setState({
                isPinned: !this.state.isPinned
            }, () => this.setState({ pinLogo: require('../assets/pin_yellow.png') }))
        } else{
            this.setState({
                isPinned: false
            }, () => this.setState({pinLogo: require('../assets/pin_black.png')}))
        }
    }

    render() {

        return (
            <li className='ticket'>
                <div onMouseOver={this.onTicket} onMouseLeave={this.offTicket}>
                    <div>
                        {this.state.mouseOnTicket === true &&
                            <span style={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                float: 'right',
                                outline: 'none',
                                color: '#20455e',
                                cursor: 'pointer',
                                fontSize: '12px',
                            }}
                                onClick={() => { this.hideClick(this.props.ticket.id) }}>Hide</span>}
                    </div>
                    {/* if mouse on ticket or ticket is tagged show pin logo */}
                    <span>{(this.state.mouseOnTicket || this.state.isPinned) && <img alt='alternate' onClick={this.pin} className='pin-logo' src={this.state.pinLogo}></img>}</span>
                    <h5 className='title'>{this.props.ticket.title}</h5>
                    <TicketContent content={this.props.ticket.content} />
                    <footer>
                        <span className='meta-data'>By {this.props.ticket.userEmail} |
                        {new Date(this.props.ticket.creationTime).toLocaleString()}
                            <Tags tags={this.props.ticket.labels} />
                        </span>
                    </footer>
                </div>
            </li>)
    }
}

export default TicketComponent;