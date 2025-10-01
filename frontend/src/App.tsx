import type { Component } from 'solid-js'
import { Topbar } from './components/NavBar'

const App: Component = (props: any) => {
  return (
    <>
      <Topbar />
      <main>
        {props.children}
      </main>
    </>
  );
};

export default App;
