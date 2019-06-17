import React from "react";

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(err: any, info: any) {
    this.setState({ hasError: true });
  }

  render() {
    // tratar erro aqui
    if (this.state.hasError) return <h1>error</h1>;
    return this.props.children;
  }
}
