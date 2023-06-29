import StreamDisplay from '../components/streaming';

export default function Home() {
  return (
    <div>
      <h1>Streaming Data Display</h1>
      <StreamDisplay url="http://localhost:4000/llama_chat" botName="faculty" question="どのような人材を目指していますか" />
    </div>
  );
}