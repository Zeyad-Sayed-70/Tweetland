import { useState, useTransition } from 'react';

export default function Lists() {
  const [query, setQuery] = useState('');
  const [lists, setLists] = useState<any>(names);
  const [isPending, startTransition] = useTransition();
  

  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
    
    startTransition(() => {
      let ul: number[] = [];
      for (let i = 0; i < value.length * 10000; i++) {
        ul.push(i);
      }
      setLists(ul)
    })
  };

  return (
    <div>
      <input onChange={changeHandler} value={query} type="text" />
      {/* {isPending && <div>Loading...</div>} */}
      {lists.map((val, i) => (
        <p>{val}</p>
      ))}
    </div>
  );
}

const names = ['zeyad', 'ahmed', 'mohamed', 'ali']