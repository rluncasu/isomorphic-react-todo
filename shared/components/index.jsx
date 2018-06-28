import React, { PropTypes } from 'react';

export default class MainView extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className="row" id="main-view">
        <div className="col-md-6">
          <div className="box box-aqua">
            <div className="box-header ui-sortable-handle">
              <i className="ion ion-clipboard"></i>
              <h3 className="box-title">To Do List</h3>
            </div>
            <div className="box-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>

    );
  }
}
