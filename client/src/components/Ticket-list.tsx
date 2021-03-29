import React, { Component } from "react";
import { Ticket } from '../api';
import TicketComponent from "./Ticket-component";

//this component maps the tickets that are no hidden from client
interface TicketListProps {
    tickets: Ticket[]
    appendTicketId: Function
    hiddenTicketsId: string[]
    pinnedTickets: string[]
}

class TicketList extends Component<TicketListProps>{

    render() {
        return (<ul className='tickets'>
            {this.props.tickets.map((tic) => (
                !this.props.hiddenTicketsId.includes(tic.id) &&
                <TicketComponent pinnedTickets={this.props.pinnedTickets} key={tic.id} ticket={tic} appendTicketId={this.props.appendTicketId} />
            ))}
        </ul>);
    }
}

export default TicketList;