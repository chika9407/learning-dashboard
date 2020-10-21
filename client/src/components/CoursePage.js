import React, { Component } from "react";

export default class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  getTasks() {
    const { id } = this.props.match.params;

    fetch(`/courses/${id}`)
      .then((res) => res.json())
      .then((data) => this.setState({ tasks: data }))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getTasks();
  }

  render() {
    console.log(this.props.match);
    return <div>{this.props.match.params.id}</div>;
  }
}
