import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (Wrappedcomponent, axios) => {
  return class Error extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      };

     this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

     this.resInterceptor = axios.interceptors.response.use(
        response => response,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

   // componentWillUnmount(){
   //   axios.interceptors.request.eject(this.reqInterceptor);
   //   axios.interceptors.response.eject(this.resInterceptor);
  //  }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Wrappedcomponent {...this.props}></Wrappedcomponent>
        </React.Fragment>
      );
    }
  };
};
export default withErrorHandler;
