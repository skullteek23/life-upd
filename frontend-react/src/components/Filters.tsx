import { FILTERS } from '../models/filters';
import DateButton from './buttons/DateButton';
import ResetButton from './buttons/ResetButton';

function Filters(props: { data: (e: string) => void }) {
  const applyFilter = (value: string) => {
    const filterValue = FILTERS.find((f) => f.label === value)?.value || '';
    props.data(filterValue);
  };

  return (
    <div className="filter date-filter" id="filter">
      <ResetButton action={applyFilter.bind(null, '')}></ResetButton>
      {FILTERS.map((f) => (
        <DateButton key={f.value} label={f.label} action={applyFilter.bind(null, f.label)} />
      ))}
    </div>
  );
}

export default Filters;
