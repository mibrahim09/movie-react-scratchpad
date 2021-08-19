import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 7 },
      { id: 2, value: 4 },
      { id: 3, value: 1 },
      { id: 4, value: 2 },
    ],
  };

  handleDelete = (counterId) => {
    const newCounters = this.state.counters.filter((e) => e.id !== counterId);
    this.setState({ counters: newCounters });
  };

  handleIncrement = (counter) => {
    const newCounters = [...this.state.counters];
    const index = newCounters.indexOf(counter);
    newCounters[index].value += 1;

    this.setState({ counters: newCounters });
  };

  handleDecrement = (counter) => {
    const newCounters = [...this.state.counters];
    const index = newCounters.indexOf(counter);
    newCounters[index].value -= 1;

    this.setState({ counters: newCounters });
  };

  handleReset = () => {
    const newCounters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });

    this.setState({ counters: newCounters });
  };

  render() {
    return (
      <div className="container-sm">
        <button
          className="btn btn-primary m-2"
          onClick={() => {
            this.handleReset();
          }}
        >
          Reset
        </button>
        {this.state.counters.map((counter) => (
          <Counter
            key={counter.id}
            value={counter.value}
            onIncrement={() => this.handleIncrement(counter)}
            onDecrement={() => this.handleDecrement(counter)}
            onDelete={() => this.handleDelete(counter.id)}
          >
            <h5>Counter #{counter.id}</h5>
          </Counter>
        ))}
      </div>
    );
  }
}
export default Counters;
