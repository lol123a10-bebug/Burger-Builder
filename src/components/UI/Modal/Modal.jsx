import React, { Fragment, Component } from "react";
import Backdrop from "../Backdrop/Backdrop";
import styles from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.show || this.props.show) {
      return (
        nextProps.show !== this.props.show ||
        nextProps.children !== this.props.children
      );
    }
    return false;
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
