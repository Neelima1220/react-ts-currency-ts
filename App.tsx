import * as React from 'react';
import './style.css';

export default function App() {
  const url = 'https://api.exchangerate.host/latest?base=';
  const [baseCur, setBaseCur] = React.useState('EUR');
  const [convCur, setConvCur] = React.useState('INR');
  const [curr, setCurr] = React.useState();
  const [val, setVal] = React.useState();
  const [res, setRes] = React.useState();

  const fetchData = async () => {
    const result = await (await fetch(url + baseCur)).json();
    setCurr(result.rates);
  };
  // console.log(baseCur, 'curr');

  React.useEffect(() => {
    fetchData();
  }, []);

  console.log(Number(val), curr && curr[baseCur], baseCur, 'curr[convCur]');

  React.useEffect(() => {
    if (curr) {
      setRes(Number(val) * curr[convCur]);
    }
  }, [val, baseCur, convCur]);

  React.useEffect(() => {
    if (curr) {
      setRes(Number(val) * (curr[convCur] / curr[baseCur]));
    }
  }, [baseCur, convCur]);

  const handleBaseChange = (e) => {
    setBaseCur(e.target.value);
  };
  const handleConvChange = (e) => {
    setConvCur(e.target.value);
  };
  const handleChange = (e) => {
    setVal(e.target.value);
    // setRes();
  };

  const handleSwap = React.useCallback(() => {
    setConvCur(baseCur);
    setBaseCur(convCur);
  }, [baseCur, convCur]);
  return (
    <div>
      convert <input value={val} onChange={handleChange} /> from
      <select value={baseCur} onChange={handleBaseChange}>
        {curr &&
          Object.keys(curr).length > 0 &&
          Object.keys(curr).map((item) => {
            return <option value={item}>{item}</option>;
          })}
      </select>{' '}
      to{' '}
      <select value={convCur} onChange={handleConvChange}>
        {curr &&
          Object.keys(curr).length > 0 &&
          Object.keys(curr).map((item) => {
            return <option value={item}>{item}</option>;
          })}
      </select>
      <button onClick={handleSwap}>swap currency</button>
      <p>{res || 0}</p>
    </div>
  );
}
