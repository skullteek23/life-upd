import { FILTERS } from '../models/filters';
import DateButton from './buttons/DateButton';
import ResetButton from './buttons/ResetButton';

function Filters() {
  return (
    <div className="filter date-filter" id="filter">
      <ResetButton></ResetButton>
      {FILTERS.map((f) => (
        <DateButton key={f.value} label={f.label} />
      ))}
    </div>
  );
}

export default Filters;
