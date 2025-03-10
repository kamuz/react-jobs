const App = () => {

  const name = 'John';
  const styles = {color: 'red', fontSize: '24px'}

  return (
      <>
        <div for="name">App</div>
        <p style={styles}>Hello, { name }</p>
      </>
  );
};

export default App;