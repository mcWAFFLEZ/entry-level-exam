import React from 'react';
import './App.scss';
import { APIData, createApiClient, Ticket, } from './api';
import TicketList from './components/Ticket-list';

export type AppState = {
	tickets?: Ticket[],
	search: string,
	currentPage: number,
	hiddenTicketsId: string[], //lifted up the state for hiddenTickets
	APIData: APIData,
	pinnedTickets: string[]
}
const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		tickets: [],
		search: '',
		currentPage: 1,
		hiddenTicketsId: [],
		APIData: { pageUpperBound: 1 }, //used for a feature to show the pages
		pinnedTickets: []
	}

	searchDebounce: any = null;

	async componentDidMount() {
		this.setState({
			APIData: await api.search(this.state.search, this.state.currentPage),
		}, () => { this.setState({ tickets: this.state.APIData.results }) });
	}

	appendTicketId = (ticketId: string) => {
		this.setState({
			hiddenTicketsId: this.state.hiddenTicketsId.concat([ticketId])
		})
	}

	restoreTickets = () => {
		this.setState({
			hiddenTicketsId: []
		})
	}

	renderTickets = (tickets: Ticket[]) => {
		return (
			<TicketList pinnedTickets={this.state.pinnedTickets} tickets={tickets} appendTicketId={this.appendTicketId}
				hiddenTicketsId={this.state.hiddenTicketsId} />
		);
	}

	onSearch = (val: string) => {
		clearTimeout(this.searchDebounce);
		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val,
			}, () => this.updateAPIData().then(() =>this.setPageToStart()))
		}, 300);
	}

	updateAPIData = async () => {
		this.setState({
			APIData: await api.search(this.state.search, this.state.currentPage)
		}, () => this.setState({ tickets: this.state.APIData.results }))
	}

	setPageToStart = () => {
		this.setState({
			currentPage: 1
		})
	}

	nextPage = () => {
		if (this.state.APIData.pageUpperBound > this.state.currentPage) {
			this.setState({
				currentPage: this.state.currentPage + 1
			}, () => this.onPageChange())
		}
	}

	prevPage = () => {
		if (this.state.currentPage > 1) {
			this.setState({
				currentPage: this.state.currentPage - 1
			}, () => this.onPageChange())
		}
	}

	onPageChange = async () => {
		this.setState({
			tickets: (await api.search(this.state.search, this.state.currentPage)).results
		})
	}

	render() {
		const { tickets } = this.state;

		return (<main>
			<h1>Tickets List</h1>
			<header>
				<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)} />
			</header>

			{tickets ? <span className='results'>Showing {tickets.length} results</span> : null}

			{this.state.hiddenTicketsId.length > 0 &&
				<span className='restore'>({this.state.hiddenTicketsId.length} hidden tickets -
				<span onClick={this.restoreTickets}>restore</span>)</span>
			}
			{this.state.APIData.pageUpperBound !== 0 && <span>
				<span onClick={this.prevPage} className='next-prev'>previous</span>
				<span onClick={this.nextPage} className='next-prev'>next</span>
				<span className='pages'>({this.state.currentPage} out of {this.state.APIData.pageUpperBound})</span>
			</span>}
			{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}


		</main>)
	}
}

export default App;