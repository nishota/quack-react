import React from 'react';
import './App.css';
import io from 'socket.io-client';
import { Timeline } from "./model/timeline";
import MediaCard from './Card';

interface Props {
}
interface State {
  connection: SocketIOClient.Socket,
  timelines: Timeline[],
  title: string
}

export default class App extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    const connection = io('http://localhost:4000', {
      query: 'quack-client',
      // path: "/"
    });
    this.state = { connection: connection, timelines: [], title:'' };
  }

  componentDidMount() {
    this.state.connection.on('tweet', (data: Timeline) => {
      const timelines = this.state.timelines;
      data.date = new Date(data.date);
      timelines.unshift(data) // 既存ログに追加
      if(timelines.length > 30){
        timelines.splice(30);
      }
      this.setState({ timelines: timelines });
    });
    this.state.connection.on('title', (title:string)=>{
      document.title = `Quack | ${title}`;
      this.setState({title:title});
    });
  }

  render() {
    const {title, timelines} = this.state;
    const _timelines = timelines.map(item => (
      <MediaCard key={item.id} timeline={item}></MediaCard>
    ));
    return (
      <div>
        <h1>Quack | {title}</h1>
        <div>{_timelines}</div>
      </div>
    );
  }
}
