import Modal from "../../components/UI/Modal/Modal";
import { Component } from "react";

const controleDeErros = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			initialized: false,
			error: null,
		};
		componentDidMount() {
			this.reqInterceptor = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(res => res, (err) => {
				this.setState({ error: err });
			});
			this.setState({ initialized: true });
		}

		componentWillUnmount(){
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmed = () => {
			this.setState({ error: null });
		};

		render() {
			const {initialized} = this.state;
			if (!initialized) return null;
			return (
				<>
					<Modal show={this.state.error} modalClosed={this.errorConfirmed}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			);
		}
	};
};

export default controleDeErros;
